document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('shortsToggle');
  
    // Retrieve the current state from Chrome storage
    chrome.storage.sync.get(['shortsBlocked'], function (result) {
      toggle.checked = result.shortsBlocked;
    });
  
    toggle.addEventListener('change', function () {
      const isBlocked = toggle.checked;
  
      // Store the toggle state in Chrome storage
      chrome.storage.sync.set({ shortsBlocked: isBlocked }, function () {
        if (isBlocked) {
          chrome.scripting.executeScript({
            target: { allFrames: true },
            function: blockShorts
          });
        } else {
          chrome.scripting.executeScript({
            target: { allFrames: true },
            function: unblockShorts
          });
        }
      });
    });
  });
  
  function blockShorts() {
    // Logic to block YouTube Shorts goes here
    const shortsSelectors = [
      'ytd-grid-video-renderer:has(#video-title:has-text("#shorts"))',
      'ytd-grid-video-renderer:has([overlay-style="SHORTS"])',
      'ytd-reel-shelf-renderer:has(.ytd-reel-shelf-renderer:has-text("Shorts"))'
    ];
    shortsSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });
  }
  
  function unblockShorts() {
    // Logic to unblock/revert the changes (for simplicity, you may refresh the page)
    location.reload();
  }
  