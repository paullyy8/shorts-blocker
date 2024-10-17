document.addEventListener("DOMContentLoaded", function () {
  // Listen for changes to the toggle button
  document.getElementById("toggle").addEventListener("change", (e) => {
    const isEnabled = e.target.checked;

    // Store the toggle state in Chrome storage
    chrome.storage.sync.set({shortsBlocked: isEnabled}, () => {
      if (chrome.runtime.lastError) {
        console.log(`Error setting shortsBlocked: ${chrome.runtime.lastError}`);
      } else {
        console.log(`YouTube Shorts Blocked: ${isEnabled}`);
      }
    });

    // Send a message to the content script to update the Shorts block status
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {shortsBlocked: isEnabled});
    });
  });

  // On popup load, check if shorts are currently blocked and set the toggle state
  chrome.storage.sync.get("shortsBlocked", function (data) {
    if (chrome.runtime.lastError) {
      console.error(`Error getting shortsBlocked: ${chrome.runtime.lastError}`);
    } else {
      document.getElementById("toggle").checked = data.shortsBlocked || false;
    }
  });
});
