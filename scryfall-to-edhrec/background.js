chrome.action.onClicked.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = new URL(tabs[0].url);
        if (url.hostname === "scryfall.com") {
            const pathname = new URL(url).pathname;
            const cardName = pathname.split('/').slice(-1)[0];
            const edhrecUrl = "https://edhrec.com/cards/" + cardName;
            chrome.tabs.create({ url: edhrecUrl });

        }
    });
});
