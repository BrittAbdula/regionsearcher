console.log('Content script loaded');

function highlightDomains(domain) {
  const links = document.getElementsByTagName('a');
  let count = 0;
  
  for (let link of links) {
    if (link.href) {
      try {
        const url = new URL(link.href);
        if (url.hostname.includes(domain)) {
          link.style.backgroundColor = 'yellow';
          count++;
        }
      } catch (e) {
        console.error('Error parsing URL:', e);
      }
    }
  }
  
  return count; // 返回高亮的链接数量
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  if (request.action === "highlightDomain") {
    console.log('Highlighting domain:', request.domain);
    try {
      const count = highlightDomains(request.domain);
      sendResponse({success: true, count: count});
    } catch (error) {
      console.error('Error highlighting domain:', error);
      sendResponse({success: false, error: error.message});
    }
  } else {
    // 对于不认识的消息，也要发送响应
    sendResponse({success: false, error: 'Unknown action'});
  }
  // 不要在这里返回 true，因为我们已经同步发送了响应
});

console.log('Content script loaded and listener set up');

// 在页面加载完成后执行高亮
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const domain = urlParams.get('highlight_domain');
  if (domain) {
    highlightDomains(domain);
  }
});