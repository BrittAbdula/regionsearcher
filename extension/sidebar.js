// 假设我们已经从r.json加载了数据
let regionsData;

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
  
  // 加载保存的选中状态
  loadSelectedStates();

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
      });

      regionsContainer.appendChild(regionCard);
    });
  });

  searchInput.addEventListener('keydown', (e) => {
    console.log('Key pressed:', e.key); // 调试语句
    if (e.key === 'Enter') {
      e.preventDefault(); // 阻止默认的表单提交行为
      console.log('Enter key pressed, calling performSearch()'); // 调试语句
      performSearch();
    }
  });

  window.addEventListener('message', function(event) {
    if (event.data.action === "loadSavedStates") {
      loadSelectedStates();
    }
  }, false);

  // 搜索按钮点击事件
  searchButton.addEventListener('click', performSearch);
  // 准备要打开的 URL 数组
  const urlsToOpen = [];

  // 执行搜索
  function performSearch() {
    const query = encodeURIComponent(searchInput.value);
    const selectedRegions = Array.from(document.querySelectorAll('.region-card input:checked'))
      .map(checkbox => checkbox.value);

    const allRegions = regionsData.flatMap(geoRegion => geoRegion.regions);

    selectedRegions.forEach((regionId) => {
      const region = allRegions.find((r) => r.id === regionId);
      if (region) {
        const tdl = region.tld;
        const gl = region.country;
        const hl = region.lang;
        const v = `&gl=${gl}&hl=${hl}`;
        const searchUrl = tdl ? `https://www.google.${tdl}/search?q=${query}${v}` : `https://www.google.com/search?q=${query}${v}`;
        // window.open(searchUrl, "_blank");
        urlsToOpen.push(searchUrl);
      }
    });
    // 创建新的浏览器窗口并打开多个标签页
    if (urlsToOpen.length > 0) {
      chrome.windows.create({ url: urlsToOpen[0] }, (newWindow) => {
        // 打开第一个 URL 后，在同一个窗口中打开其余的 URL
        for (let i = 1; i < urlsToOpen.length; i++) {
          chrome.tabs.create({ windowId: newWindow.id, url: urlsToOpen[i] });
        }
      });
    }
  }
});

// 保存选中的状态
function saveSelectedStates() {
  const selectedStates = {};
  document.querySelectorAll('.region-card input[type="checkbox"]').forEach(checkbox => {
    selectedStates[checkbox.id] = checkbox.checked;
  });
  chrome.storage.local.set({ selectedRegions: selectedStates }, function() {
    console.log('Selected states saved');
  });
}

// 加载保存的选中状态
function loadSelectedStates() {
  chrome.storage.local.get(['selectedRegions'], function(result) {
    const selectedStates = result.selectedRegions || {};
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