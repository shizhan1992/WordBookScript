$(document).ready(function () {
    $("#ready_add").click(function () {
        var option_url = chrome.extension.getURL('wizard.html');
        chrome.tabs.create({url: option_url, selected: true});
    });
})