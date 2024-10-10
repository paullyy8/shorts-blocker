chrome.storage.sync.get(['shortsBlocked'], function (result) {
    if (result.shortsBlocked) {
      blockShorts();
    }
  });
  
  function blockShorts() {
    const shortsSelectors = [
      'ytd-grid-video-renderer:has(#video-title:has-text("#shorts"))',
      'ytd-grid-video-renderer:has([overlay-style="SHORTS"])',
      'ytd-reel-shelf-renderer:has(.ytd-reel-shelf-renderer:has-text("Shorts"))'
    ];
    shortsSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });
  }
  