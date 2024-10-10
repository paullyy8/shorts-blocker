// Listen for changes to the toggle button
document.getElementById('toggle').addEventListener('change', function() {
  const isEnabled = this.checked;

  // Store the toggle state in Chrome storage
  chrome.storage.sync.set({ shortsBlocked: isEnabled }, function() {
      console.log(`YouTube Shorts Blocked: ${isEnabled}`);
  });

  // Send a message to the content script to update the Shorts block status
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { shortsBlocked: isEnabled });
  });
});

// On popup load, check if shorts are currently blocked and set the toggle state
chrome.storage.sync.get('shortsBlocked', function(data) {
  document.getElementById('toggle').checked = data.shortsBlocked || false;
});
