console.log("Content script starting to load...");

let mySidebarElement = null;

function createSidebar() {
    // 检查是否已存在旧的侧边栏，如果存在则移除
    const existingSidebar = document.getElementById('myChromeExtensionSidebar');
    if (existingSidebar) {
        existingSidebar.remove();
    }

    mySidebarElement = document.createElement('iframe');
    mySidebarElement.id = 'myChromeExtensionSidebar';
    mySidebarElement.src = chrome.runtime.getURL('sidebar.html');
    mySidebarElement.style.cssText = `
    position: fixed;
    top: 0;
    right: -300px;
    width: 300px;
    height: 100%;
    border: none;
    transition: right 0.3s ease-in-out;
    z-index: 9999;
  `;

    document.body.appendChild(mySidebarElement);
}

function toggleSidebar() {
    console.log("Toggling sidebar");
    if (!mySidebarElement) {
        createSidebar();
    }

    if (mySidebarElement.style.right === '0px') {
        mySidebarElement.style.right = '-300px';
    } else {
        mySidebarElement.style.right = '0px';
    }
    console.log("Sidebar toggled");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in content script:", request);
    if (request.action === "toggleSidebar") {
        toggleSidebar();
        sendResponse({ success: true });
    } else if (request.action === "ping") {
        sendResponse({ status: "alive" });
    } else if (request.action === "closeSidebar") {
        // 移除侧边栏
        const sidebarElement = document.getElementById('myChromeExtensionSidebar');
        if (sidebarElement) {
            sidebarElement.remove();
        }
        mySidebarElement = null; // 重置 mySidebarElement 变量
    }
});

console.log("Content script loaded successfully");

// 发送一个消息到 background script 表示已经加载
chrome.runtime.sendMessage({ action: "contentScriptLoaded" }, function (response) {
    if (chrome.runtime.lastError) {
        console.error("Error sending contentScriptLoaded message:", chrome.runtime.lastError);
    } else {
        console.log("contentScriptLoaded message sent successfully");
    }
});