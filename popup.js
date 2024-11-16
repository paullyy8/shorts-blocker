document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("toggle");
    const statusMessage = document.getElementById("status-message");

    // Helper to set the storage
    function setStorage(key, value, callback) {
        const obj = {};
        obj[key] = value;
        chrome.storage.sync.set(obj, callback);
    }

    // Helper to get the storage
    function getStorage(key, callback) {
        chrome.storage.sync.get(key, callback);
    }

    // Function to update the status message based on the toggle state
    function updateStatusMessage(isEnabled) {
        if (isEnabled) {
            statusMessage.textContent = "Blocking Shorts on YouTube.";
            statusMessage.style.color = '#4CAF50';
        } else {
            statusMessage.textContent = "Shorts are enabled on YouTube.";
            statusMessage.style.color = '#FF5C8D';
        }
    }

    // Listen for changes to the toggle button
    toggle.addEventListener("change", (e) => {
        const isEnabled = e.target.checked;

        // Store the toggle state in Chrome storage
        setStorage('shortsBlocked', isEnabled, () => {
            if (chrome.runtime.lastError) {
                console.log(`Error setting shortsBlocked: ${chrome.runtime.lastError}`);
            } else {
                console.log(`YouTube Shorts Blocked: ${isEnabled}`);
            }

            // Update the status message
            updateStatusMessage(isEnabled);
        });

        // Send a message to the content script to update the Shorts block status
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { shortsBlocked: isEnabled });
        });
    });

    // On popup load, check if shorts are currently blocked and set the toggle state
    getStorage('shortsBlocked', function (data) {
        const isEnabled = data.shortsBlocked || false;
        toggle.checked = isEnabled;
        updateStatusMessage(isEnabled);
    });
});