chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ shortsBlocked: false });
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get(['shortsBlocked'], function (result) {
      const isBlocked = result.shortsBlocked;
      chrome.storage.sync.set({ shortsBlocked: !isBlocked });
      if (isBlocked) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: unblockShorts
        });
      } else {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: blockShorts
        });
      }
    });
  });
  