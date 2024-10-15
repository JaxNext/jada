const essaysUrl = "https://juejin.cn/creator/content/article/essays";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.startsWith(essaysUrl)) {
    chrome.tabs.sendMessage(tabId, { action: "pageLoaded", url: tab.url });
  }
});