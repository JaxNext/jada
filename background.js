chrome.action.onClicked.addListener((tab) => {
  if (tab.url.startsWith("https://juejin.cn/creator/content/article/essays")) {
    chrome.tabs.sendMessage(tab.id, { action: "analyzeArticle" });
  }
});
