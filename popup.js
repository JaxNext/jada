document.addEventListener('DOMContentLoaded', function() {
    const enableSwitch = document.getElementById('enableSwitch');
    const statusText = document.getElementById('statusText');
    const analyzeButton = document.getElementById('analyzeButton');

    // Load the switch state from storage
    chrome.storage.local.get(['enabled'], function(result) {
        enableSwitch.checked = result.enabled !== false;
        updateStatusText(enableSwitch.checked);
    });

    enableSwitch.addEventListener('change', function() {
        const isEnabled = this.checked;
        // Save the switch state to storage
        chrome.storage.local.set({enabled: isEnabled}, function() {
            updateStatusText(isEnabled);
            // Send message to content script to update its state
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {action: "updateState", enabled: isEnabled});
            });
        });
    });

    analyzeButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "manualAnalyze"});
        });
    });

    function updateStatusText(isEnabled) {
        statusText.textContent = isEnabled ? "Jada 已启用" : "Jada 已关闭";
    }
});
