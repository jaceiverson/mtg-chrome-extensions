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