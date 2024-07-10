console.log('Content script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  if (request.action === "highlightKeywords") {
    console.log('Highlighting keywords:', request.query);
    highlightKeywords(request.query);
    sendResponse({success: true});
  }
  return true;  // 表示将异步发送响应
});

function highlightKeywords(query) {
    const keywords = query.split(' ');
    const regex = new RegExp(keywords.join('|'), 'gi');
  
    function highlightTextNode(node) {
      const text = node.textContent;
      const matches = text.match(regex);
      if (!matches) return;
  
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
  
      matches.forEach(match => {
        const index = text.indexOf(match, lastIndex);
        if (index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex, index)));
        }
        const span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
        span.textContent = match;
        fragment.appendChild(span);
        lastIndex = index + match.length;
      });
  
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      }
  
      node.parentNode.replaceChild(fragment, node);
    }
  
    function walkTreeAndHighlight(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        highlightTextNode(node);
      } else if (node.nodeType === Node.ELEMENT_NODE && 
                 node.nodeName !== 'SCRIPT' && 
                 node.nodeName !== 'STYLE' &&
                 node.nodeName !== 'SPAN' && // 避免处理已高亮的节点
                 !node.classList.contains('highlighted')) { // 额外的检查
        Array.from(node.childNodes).forEach(walkTreeAndHighlight);
      }
    }
  
    walkTreeAndHighlight(document.body);
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received:', request);
    if (request.action === "highlightKeywords") {
      console.log('Highlighting keywords:', request.query);
      try {
        highlightKeywords(request.query);
        sendResponse({success: true});
      } catch (error) {
        console.error('Error highlighting keywords:', error);
        sendResponse({success: false, error: error.message});
      }
    }
    return true;  // 表示将异步发送响应
  });
  
  console.log('Content script loaded and listener set up');
  
  // 在页面加载完成后执行高亮
  document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      highlightKeywords(query);
    }
  });