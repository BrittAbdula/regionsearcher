// 假设我们已经从r.json加载了数据
let regionsData;
let selectedRegionsOrder = []; // 新增：用于存储选中区域的顺序

// 模拟从r.json加载数据的函数
async function loadRegionsData() {
  const response = await fetch(chrome.runtime.getURL('r.json'));
  regionsData = await response.json();
}

// 初始化页面
document.addEventListener('DOMContentLoaded', async () => {
  await loadRegionsData();

  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const regionsContainer = document.getElementById('regions-container');
  const closeButton = document.getElementById('close-button');
  const translateCheckbox = document.getElementById('translate-checkbox');

  // 发送关闭消息并添加调试信息
  closeButton.addEventListener('click', function () {
    saveSelectedStates();  // 保存选中状态
    chrome.runtime.sendMessage({ action: "closeSidebar" }, function (response) {
      if (chrome.runtime.lastError) {
        console.error("Error sending closeSidebar message:", chrome.runtime.lastError);
      } else {
        console.log("closeSidebar message sent successfully:", response);
      }
    });
  });

  // 使用事件委托来处理所有区域卡片的点击
  regionsContainer.addEventListener('click', (e) => {
    const regionCard = e.target.closest('.region-card');
    if (regionCard) {
      const checkbox = regionCard.querySelector('input[type="checkbox"]');
      if (checkbox && e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        saveSelectedStates();  // 保存选中状态
      }
    }
  });

  regionsData.forEach(geoRegion => {
    const geoRegionHeader = document.createElement('h2');
    geoRegionHeader.textContent = geoRegion.Geographic_region;
    regionsContainer.appendChild(geoRegionHeader);

    geoRegion.regions.forEach(region => {
      const regionCard = document.createElement('div');
      regionCard.className = 'region-card';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      // checkbox.id = region.id;
      checkbox.id = `region-${region.id}`; // 添加唯一的 id
      checkbox.value = region.id;

      const img = document.createElement('img');
      img.src = region.img_src;
      img.alt = region.name;

      // 使用div代替label
      const textDiv = document.createElement('div');
      textDiv.textContent = `${region.name} (${region.language})`;
      textDiv.className = 'region-text';

      regionCard.appendChild(checkbox);
      regionCard.appendChild(img);
      regionCard.appendChild(textDiv);

      // 为checkbox添加change事件监听器
      checkbox.addEventListener('change', (e) => {
        regionCard.classList.toggle('selected', e.target.checked);
        updateSelectedRegionsOrder(region.id, e.target.checked); // 新增：更新选中顺序
      });

      regionsContainer.appendChild(regionCard);
    });
  });

  // 加载保存的选中状态
  loadSelectedStates();

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 阻止默认的表单提交行为
      handleSearch();
    }
  });

  window.addEventListener('message', function (event) {
    if (event.data.action === "loadSavedStates") {
      loadSelectedStates();
    }
  }, false);

  // 搜索按钮点击事件
  searchButton.addEventListener('click', handleSearch);

  // 处理搜索
  async function handleSearch() {
    const query = searchInput.value;
    const selectedRegions = selectedRegionsOrder; // 使用有序的选中区域列表

    if (translateCheckbox.checked) {
      // 如果需要翻译，调用翻译API
      try {
        const translations = await translateKeywords(query, selectedRegions);
        performSearch(translations);
      } catch (error) {
        console.error('Translation error:', error);
        alert('An error occurred during translation. Please try again.');
      }
    } else {
      // 如果不需要翻译，直接搜索
      const searchData = selectedRegions.map(id => ({ id, query }));
      performSearch(searchData);
    }
  }

  // 翻译关键词
  async function translateKeywords(query, selectedRegions) {
    const allRegions = regionsData.flatMap(geoRegion => geoRegion.regions);
    const selectedRegionObjects = selectedRegions.map(id => allRegions.find(r => r.id === id));

    try {
      const response = await fetch('https://regionsearcher.com/api/tk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchInput: query, regions: selectedRegionObjects }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // 假设 API 返回的格式是 { translations: [{ id, query }] }
      return data.translations;
    } catch (error) {
      console.error('Error calling translation API:', error);
      throw error;
    }
  }

  // 执行搜索
  function performSearch(searchData) {
    // 准备要打开的 URL 数组
    const urlsToOpen = [];
    const allRegions = regionsData.flatMap(geoRegion => geoRegion.regions);

    searchData.forEach(({ id, query }) => {
      const region = allRegions.find((r) => r.id === id);
      if (region) {
        const tdl = region.tld;
        const gl = region.country;
        const hl = region.lang;
        const v = `&gl=${gl}&hl=${hl}`;
        const searchUrl = tdl ? `https://www.google.${tdl}/search?q=${query}${v}` : `https://www.google.com/search?q=${query}${v}`;
        // window.open(searchUrl, "_blank");
        //urlsToOpen.push(searchUrl);
        urlsToOpen.push({ url: searchUrl, query: query });
      }
    });

    if (urlsToOpen.length > 0) {
      chrome.windows.create({ url: urlsToOpen[0].url }, async (newWindow) => {
        console.log('New window created');
    
        // 等待第一个标签页加载完成并注入脚本
        await injectScriptAndHighlight(newWindow.tabs[0].id, urlsToOpen[0].query);
    
        // 为其余标签页创建、等待加载完成、注入脚本并高亮关键词
        for (let i = 1; i < urlsToOpen.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 300));
          const newTab = await new Promise(resolve => {
            chrome.tabs.create({ windowId: newWindow.id, url: urlsToOpen[i].url }, resolve);
          });
          await injectScriptAndHighlight(newTab.id, urlsToOpen[i].query);
        }
      });
    }
    
    async function injectScriptAndHighlight(tabId, query) {
      const maxRetries = 5;
      for (let i = 0; i < maxRetries; i++) {
        try {
          // 等待页面加载完成
          await new Promise(resolve => {
            chrome.tabs.get(tabId, tab => {
              if (tab.status === 'complete') {
                resolve();
              } else {
                chrome.tabs.onUpdated.addListener(function listener(updatedTabId, info) {
                  if (info.status === 'complete' && updatedTabId === tabId) {
                    chrome.tabs.onUpdated.removeListener(listener);
                    resolve();
                  }
                });
              }
            });
          });
    
          // 注入脚本
          await chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['contentScript.js']
          });
    
          // 等待一段时间确保脚本已加载
          await new Promise(resolve => setTimeout(resolve, 500));
    
          // 发送消息
          await chrome.tabs.sendMessage(tabId, {action: "highlightDomain", domain: query}, function(response) {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
              return;
            }
            if (response && response.success) {
              console.log(`Highlighted ${response.count} links containing the domain ${query}`);
            } else {
              console.error('Failed to highlight domain:', response ? response.error : 'Unknown error');
            }
          });
          return;
        } catch (error) {
          console.error(`Attempt ${i + 1} failed:`, error);
          if (i === maxRetries - 1) {
            console.error('Max retries reached. Failed to inject script or highlight.');
          } else {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒后重试
          }
        }
      }
    }
  }
});

// 新增：更新选中区域的顺序
function updateSelectedRegionsOrder(regionId, isChecked) {
  if (isChecked) {
    // 如果被选中且不在列表中，添加到列表末尾
    if (!selectedRegionsOrder.includes(regionId)) {
      selectedRegionsOrder.push(regionId);
    }
  } else {
    // 如果取消选中，从列表中移除
    const index = selectedRegionsOrder.indexOf(regionId);
    if (index > -1) {
      selectedRegionsOrder.splice(index, 1);
    }
  }
}

// 保存选中的状态
function saveSelectedStates() {
  const selectedStates = {};
  document.querySelectorAll('.region-card input[type="checkbox"]').forEach(checkbox => {
    selectedStates[checkbox.id] = checkbox.checked;
  });
  chrome.storage.local.set({ 
    selectedRegions: selectedStates,
    selectedRegionsOrder: selectedRegionsOrder // 新增：保存选中顺序
  }, function () {
    console.log('Selected states and order saved');
  });
}

// 加载保存的选中状态
function loadSelectedStates() {
  chrome.storage.local.get(['selectedRegions', 'selectedRegionsOrder'], function (result) {
    const selectedStates = result.selectedRegions || {};
    selectedRegionsOrder = result.selectedRegionsOrder || []; // 新增：加载选中顺序

    document.querySelectorAll('.region-card input[type="checkbox"]').forEach(checkbox => {
      if (selectedStates.hasOwnProperty(checkbox.id)) {
        checkbox.checked = selectedStates[checkbox.id];
        const regionCard = checkbox.closest('.region-card');
        if (regionCard) {
          regionCard.classList.toggle('selected', checkbox.checked);
        }
      }
    });
  });
}