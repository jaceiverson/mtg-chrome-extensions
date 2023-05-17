document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the stored checkbox states from Chrome storage
    chrome.storage.local.get(['cardTypeCheckboxes', 'cardColorCheckboxes'], function (result) {
        var cardTypeCheckboxes = document.getElementsByName('cardType');
        var cardColorCheckboxes = document.getElementsByName('cardColor');

        // Restore the checkbox states if they are available in the storage
        if (result.cardTypeCheckboxes) {
            for (var i = 0; i < cardTypeCheckboxes.length; i++) {
                cardTypeCheckboxes[i].checked = result.cardTypeCheckboxes.includes(cardTypeCheckboxes[i].value);
            }
        }
        if (result.cardColorCheckboxes) {
            for (var i = 0; i < cardColorCheckboxes.length; i++) {
                cardColorCheckboxes[i].checked = result.cardColorCheckboxes.includes(cardColorCheckboxes[i].value);
            }
        }
    });

    // Function to handle checkbox change event
    function handleCheckboxChange() {
        var cardTypeCheckboxes = document.getElementsByName('cardType');
        var cardColorCheckboxes = document.getElementsByName('cardColor');

        // Get the selected checkbox values for Card Type category
        var selectedCardTypeCheckboxes = Array.from(cardTypeCheckboxes)
            .filter(function (checkbox) {
                return checkbox.checked;
            })
            .map(function (checkbox) {
                return checkbox.value;
            });

        // Get the selected checkbox values for Card Color category
        var selectedCardColorCheckboxes = Array.from(cardColorCheckboxes)
            .filter(function (checkbox) {
                return checkbox.checked;
            })
            .map(function (checkbox) {
                return checkbox.value;
            });

        // Store the selected checkbox values in Chrome storage
        chrome.storage.local.set({
            cardTypeCheckboxes: selectedCardTypeCheckboxes,
            cardColorCheckboxes: selectedCardColorCheckboxes
        });
    }

    // Attach the handleCheckboxChange function to checkbox change events
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', handleCheckboxChange);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // ...

    // Function to handle Clear All button click event
    function handleClearButtonClick() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });

        // Store the updated checkbox states in Chrome storage
        chrome.storage.local.set({
            cardTypeCheckboxes: [],
            cardColorCheckboxes: []
        });
    }

    // Attach the handleClearButtonClick function to Clear All button click event
    var clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', handleClearButtonClick);
});


document.addEventListener("DOMContentLoaded", function () {
    var generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click", function () {
        var selectedTypes = [];
        var selectedColors = [];

        var chkInstants = document.getElementById("instantCheckbox");
        if (chkInstants.checked) {
            selectedTypes.push("instant");
        }

        var chkSorceries = document.getElementById("sorceryCheckbox");
        if (chkSorceries.checked) {
            selectedTypes.push("sorcery");
        }

        var chkEnchantments = document.getElementById("enchantmentCheckbox");
        if (chkEnchantments.checked) {
            selectedTypes.push("enchantment");
        }

        var chkArtifacts = document.getElementById("artifactCheckbox");
        if (chkArtifacts.checked) {
            selectedTypes.push("artifact");
        }

        var chkCreature = document.getElementById("creatureCheckbox");
        if (chkCreature.checked) {
            selectedTypes.push("creature");
        }

        var chkBlue = document.getElementById("blueCheckbox");
        if (chkBlue.checked) {
            selectedColors.push("blue");
        }

        var chkBlack = document.getElementById("blackCheckbox");
        if (chkBlack.checked) {
            selectedColors.push("black");
        }

        var chkGreen = document.getElementById("greenCheckbox");
        if (chkGreen.checked) {
            selectedColors.push("green");
        }

        var chkRed = document.getElementById("redCheckbox");
        if (chkRed.checked) {
            selectedColors.push("red");
        }

        var chkWhite = document.getElementById("whiteCheckbox");
        if (chkWhite.checked) {
            selectedColors.push("white");
        }

        // Get the selected type filter type AND / OR
        let typeFilter = document.getElementsByName("typeFilter");
        let typeFilterSelection = typeFilter[0].checked ? 'and' : 'or';
        // Get the selected color filter type AND / OR
        let colorFilter = document.getElementsByName("colorFilter");
        let colorFilterSelection = colorFilter[0].checked ? 'and' : 'or';
        // See if we want to filter for commander only
        let chkCommander = document.getElementById("chkCommander");
        let commanderString = chkCommander.checked ? 'is:commander' : '';

        let typeString = selectedTypes.length > 0 ? "(type:" + selectedTypes.join(" " + typeFilterSelection + " type:") + ") " : "";
        let colorString = selectedColors.length > 0 ? "(color:" + selectedColors.join(" " + colorFilterSelection + " color:") + ") " : "";
        let query = typeString + colorString + commanderString;
        // Log the query results
        console.log(query);

        // Perform API request and open new tab with the retrieved URL
        let apiUrl = "https://api.scryfall.com/cards/random?q=" + query;
        //alert(apiUrl);
        // Append selected categories to the API query

        fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var scryfallUri = data.scryfall_uri;
                if (scryfallUri) {
                    chrome.tabs.create({ url: scryfallUri });
                }
                else {
                    alert(data.details);
                }
            })
            .catch(function (error) {
                console.error("Error occurred while fetching data:", error);
            });
    });
});