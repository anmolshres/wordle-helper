const enableOrDisableExt = (tab) => {
  const isWordle = tab.url.startsWith(
    'https://www.powerlanguage.co.uk/wordle/'
  );
  isWordle ? chrome.action.enable(tab.tabId) : chrome.action.disable(tab.tabId);
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.onActivated.addListener(async (info) => {
    const tab = await chrome.tabs.get(info.tabId);
    enableOrDisableExt(tab);
  });

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
    const tab = await chrome.tabs.get(tabId);
    if (tab.active) {
      enableOrDisableExt(tab);
    }
  });
});
