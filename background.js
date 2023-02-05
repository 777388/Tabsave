// background.js
chrome.browserAction.onClicked.addListener(function(tab) {
    var allTabs = [];
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        tabs.forEach(function(tab) {
            allTabs.push(tab.url);
        });
        console.log("All tabs: " + allTabs.join(", "));
        
        // Create and display the text input and button
        var input = document.createElement("input");
        input.type = "text";
        input.id = "fileName";
        input.value = "open-tabs.txt";
        document.body.appendChild(input);
        
        var button = document.createElement("button");
        button.innerHTML = "Save";
        button.addEventListener("click", function() {
            // Save the tabs to a file
            var fileName = document.getElementById("fileName").value;
            var blob = new Blob([allTabs.join("\n")], {type: "text/plain"});
            var link = document.createElement("a");
            link.download = fileName;
            link.href = window.URL.createObjectURL(blob);
            link.click();
        });
        document.body.appendChild(button);
    });
});