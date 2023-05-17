chrome.action.onClicked.addListener(function () {
    fetch("https://api.scryfall.com/cards/random?q=is%3Acommander")
        .then((response) => response.json())
        .then((data) => {
            const scryfallUri = data.scryfall_uri;
            if (scryfallUri) {
                chrome.tabs.create({ url: scryfallUri });
            }
        })
        .catch((error) => {
            console.error("Error occurred while fetching data:", error);
        });
});
