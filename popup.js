document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("toggle");
    const statusMessage = document.getElementById("status-message");

    // Helper function to set Chrome storage
    function setStorage(key, value) {
        chrome.storage.sync.set({ [key]: value });
    }

    // Helper function to get Chrome storage
    function getStorage(key, callback) {
        chrome.storage.sync.get(key, callback);
    }

    // Update status message based on the toggle state
    function updateStatusMessage(isEnabled) {
        if (isEnabled) {
            statusMessage.textContent = "Blocking Shorts on YouTube.";
            statusMessage.style.color = '#4CAF50'; // Green
        } else {
            statusMessage.textContent = "Shorts are enabled on YouTube.";
            statusMessage.style.color = '#FF5C8D'; // Red
        }
    }

    // Listen for toggle changes
    toggle.addEventListener("change", (e) => {
        const isEnabled = e.target.checked;

        // Save the state of the toggle in Chrome storage
        setStorage('shortsBlocked', isEnabled);

        // Update the status message
        updateStatusMessage(isEnabled);

        // Alert the user to refresh the page to apply changes
        alert("Please refresh the YouTube page to apply changes!");
    });

    // On popup load, set the toggle state based on stored value
    getStorage('shortsBlocked', function (data) {
        const isEnabled = data.shortsBlocked || false;
        toggle.checked = isEnabled;
        updateStatusMessage(isEnabled);
    });
});