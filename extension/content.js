console.log("Content script starting to load...");

let mySidebarElement = null;

function createSidebar() {
    if (mySidebarElement) {
        return;
    }
    mySidebarElement = document.createElement('iframe');
    mySidebarElement.id = 'myChromeExtensionSidebar';
    mySidebarElement.src = chrome.runtime.getURL('sidebar.html');
    mySidebarElement.style.position = 'fixed';
    mySidebarElement.style.top = '0';
    mySidebarElement.style.right = '-300px';
    mySidebarElement.style.width = '300px';
    mySidebarElement.style.height = '100%';
    mySidebarElement.style.border = 'none';
    mySidebarElement.style.transition = 'right 0.3s ease-in-out';
    mySidebarElement.style.zIndex = '9999';

    document.body.appendChild(mySidebarElement);
    
    // 在侧边栏加载完成后，触发加载保存的状态
    mySidebarElement.onload = function () {
        mySidebarElement.contentWindow.postMessage({ action: "loadSavedStates" }, "*");
    };
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
        console.log("Closing sidebar.....");
        // 移除侧边栏
        const sidebarElement = document.getElementById('myChromeExtensionSidebar');
        if (sidebarElement) {
            sidebarElement.remove();
        }
        mySidebarElement = null; // 重置 mySidebarElement 变量
        sendResponse({ success: true });
    }
});

console.log("Content script loaded successfully");
