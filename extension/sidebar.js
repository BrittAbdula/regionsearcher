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

    // Show the spinner
    const spinner = document.querySelector('#search-button .button-spinner');
    const searchButtonText = document.querySelector('#search-button .button-text');

    // Show the spinner and hide the button text
    if (spinner && searchButtonText) {
      spinner.style.display = 'block';
      searchButtonText.style.display = 'none';
    }

    try {
      if (translateCheckbox.checked) {
        // 如果需要翻译，调用翻译API
        const translations = await translateKeywords(query, selectedRegions);
        await performSearch(translations);
      } else {
        // 如果不需要翻译，直接搜索
        const searchData = selectedRegions.map(id => ({ id, query }));
        await performSearch(searchData);
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('An error occurred during the search. Please try again.');
    } finally {
      // Hide the spinner and show the button text
      if (spinner && searchButtonText) {
        spinner.style.display = 'none';
        searchButtonText.style.display = 'block';
      }
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
  async function performSearch(searchData) {
    const allRegions = regionsData.flatMap(geoRegion => geoRegion.regions);
    const urlsToOpen = searchData.map(({ id, query }) => {
      const region = allRegions.find((r) => r.id === id);
      if (region) {
        const tdl = region.tld;
        const gl = region.country;
        const hl = region.lang;
        const v = `&gl=${gl}&hl=${hl}`;
        const searchUrl = tdl ? `https://www.google.${tdl}/search?q=${query}${v}` : `https://www.google.com/search?q=${query}${v}`;
        return { url: searchUrl, query: query };
      }
      return null;
    }).filter(Boolean);
  
    if (urlsToOpen.length > 0) {
      // 创建一个新窗口，并同时打开所有标签页
      const newWindow = await createWindowWithTabs(urlsToOpen.map(item => item.url));
      console.log('New window created with all tabs');
  
      // 并行处理所有标签页
      await Promise.all(newWindow.tabs.map((tab, index) => 
        injectScriptAndHighlight(tab.id, urlsToOpen[index].query)
      ));
  
      console.log('All tabs processed');
    }
  }
  
  function createWindowWithTabs(urls) {
    return new Promise((resolve) => {
      chrome.windows.create({ url: urls }, resolve);
    });
  }
  
  async function injectScriptAndHighlight(tabId, query) {
    const maxRetries = 5;
    for (let i = 0; i < maxRetries; i++) {
      try {
        await waitForTabLoad(tabId);
        await injectScript(tabId);
        await new Promise(resolve => setTimeout(resolve, 500));
        await sendHighlightMessage(tabId, query);
        return;
      } catch (error) {
        console.error(`Attempt ${i + 1} failed for tab ${tabId}:`, error);
        if (i === maxRetries - 1) {
          console.error(`Max retries reached for tab ${tabId}. Failed to inject script or highlight.`);
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
  }
  
  function waitForTabLoad(tabId) {
    return new Promise((resolve) => {
      chrome.tabs.get(tabId, (tab) => {
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
  }
  
  function injectScript(tabId) {
    return chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['contentScript.js']
    });
  }
  
  function sendHighlightMessage(tabId, query) {
    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, { action: "highlightDomain", domain: query }, function (response) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else if (response && response.success) {
          console.log(`Highlighted ${response.count} links containing the domain ${query} in tab ${tabId}`);
          resolve();
        } else {
          reject(`Failed to highlight domain in tab ${tabId}: ` + (response ? response.error : 'Unknown error'));
        }
      });
    });
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