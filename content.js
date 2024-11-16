// Function to hide YouTube Shorts section and block /shorts links
function blockYouTubeShorts() {
  const videoRenderers = document.querySelectorAll("ytd-video-renderer");

  videoRenderers.forEach((videoRenderer) => {
      const shortsLink = videoRenderer.querySelector('a[href*="/shorts/"]');
      if (shortsLink) {
          videoRenderer.remove();  // Remove the video if it's a Shorts link
      }
  });

  const shortsSections = document.querySelectorAll("ytm-shorts-lockup-view-model-v2, ytd-rich-section-renderer");
  shortsSections.forEach((section) => {
      section.remove();  // Remove any Shorts sections
  });
}

// Immediately block YouTube Shorts when the page is loaded
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
  observer.observe(document.body, { childList: true, subtree: true });
};