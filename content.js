// This function will hide YouTube Shorts section on the homepage and block /shorts links.
function blockYouTubeShorts() {
  // Block Shorts links within ytd-video-renderer elements
  const videoRenderers = document.querySelectorAll("ytd-video-renderer");

  videoRenderers.forEach((videoRenderer) => {
    // Find any <a> elements with "/shorts/" in the href inside the videoRenderer
    const shortsLink = videoRenderer.querySelector('a[href*="/shorts/"]');

    if (shortsLink) {
      // If a Shorts link is found, remove the entire videoRenderer
      videoRenderer.remove();
    }
  });
  // Block Shorts section on the homepage.
  const shortsSections = document.querySelectorAll(
    "ytm-shorts-lockup-view-model-v2",
    "ytd-rich-section-renderer"
  );
  shortsSections.forEach((section) => {
    section.remove();
  });
}

// Run the function after the page loads.
window.onload = function () {
  blockYouTubeShorts();

  // Monitor changes (like when scrolling or dynamically loading content).
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // Check if new nodes are added, and call the block function only when necessary.
      if (mutation.addedNodes.length > 0) {
        blockYouTubeShorts();
      }
    });
  });

  // Start observing changes in the body (childList and subtree for dynamic content).
  observer.observe(document.body, {childList: true, subtree: true});
};
