console.log("Background script loading...");

function injectContentScript(tabId) {
  return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, {action: "ping"}, function(response) {
          if (chrome.runtime.lastError) {
              // 脚本还没有被注入，现在注入它
              chrome.scripting.executeScript(
                  {
                      target: { tabId: tabId },
                      files: ['content.js'],
                  },
                  (results) => {
                      if (chrome.runtime.lastError) {
                          console.error('Failed to inject content script:', chrome.runtime.lastError);
                          reject(chrome.runtime.lastError);
                      } else {
                          console.log('Content script injected successfully', results);
                          resolve();
                      }
                  }
              );
          } else {
              // 脚本已经存在
              console.log("Content script already exists");
              resolve();
          }
      });
  });
}

chrome.action.onClicked.addListener(async (tab) => {
  console.log("Extension icon clicked");
  
  try {
    await injectContentScript(tab.id);
    
    // 等待一小段时间确保 content script 已经完全加载
    await new Promise(resolve => setTimeout(resolve, 100));
    
    chrome.tabs.sendMessage(tab.id, { action: "toggleSidebar" }, function(response) {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError);
      } else {
        console.log("Toggle sidebar message sent successfully");
      }
    });
  } catch (error) {
    console.error("Failed to inject or communicate with content script:", error);
  }
});

console.log("Background script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "contentScriptLoaded") {
    console.log("Content script loaded in tab:", sender.tab.id);
    sendResponse({received: true});
  } else if (request.action === "closeSidebar") {
    console.log("Closing sidebar from background");
    chrome.tabs.sendMessage(sender.tab.id, { action: "closeSidebar" });
    sendResponse({ success: true });
  }
});

