// Function to remove YouTube Shorts
function removeYouTubeShorts() {
  // Wait for the page to finish loading
  window.addEventListener("load", () => {
      // Find the anchor tag with the title "Shorts"
      const anchor = document.querySelector('a[title="Shorts"]');

      // If the anchor's parent exists, remove it from the page
      if (anchor && anchor.parentElement) {
          anchor.parentElement.remove();
          console.info("YouTube Shorts section removed.");
      } else if (anchor) {
          anchor.remove();
          console.info("YouTube Shorts anchor removed.");
      }
  });
}

// Initial call to remove YouTube Shorts
removeYouTubeShorts();

// MutationObserver to reapply the removal function on DOM changes
const observer = new MutationObserver(removeYouTubeShorts);
observer.observe(document.body, { childList: true, subtree: true });
