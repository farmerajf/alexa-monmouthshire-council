var apiClient = require('../services/monmouthshireCouncilApiClient.js');
var chooser = require('../services/responseChooser.js');
var escape = require('escape-html');

module.exports = {
    'WasteCollectionIntent': function() {
        var requestedWasteType = this.event.request.intent.slots.wasteType.value;
        console.log("RequestedWasteType: " + requestedWasteType);
        var convertedWasteType = convertWasteType(requestedWasteType);

        apiClient.getNextWasteCollectionPromise(convertedWasteType).then((response) => {
            console.log(convertedWasteType);
            if (response === undefined) {
                this.emit(':tell', "Oops, I'm not sure which type of collection you mean");
            } else {
                var soon = getSoon(response.daysAway);
                
                var responses = [
                    "The next waste collection of the " + response.collectionType + " is " + soon + " on " + response.textDate + ".",
                    "Sure, the next collection of the " + response.collectionType + " is " + soon + " on " + response.textDate + ".",
                    "OKay, " + soon + " on " + response.textDate + " there is a collection for the " + response.collectionType
                ];
                this.emit(':tell', escape(chooser.choose(responses)));
            }
        });
	}
};

function convertWasteType(value) {
    if (value.includes("recycling")) {
        return "Red & purple recycling bags"; 
    }
    if (value.includes("black") || value.includes("general")) {
        return "Household rubbish bag";
    }
}

function getSoon(value) {
    if (value > 0) {
        if (value < 1) {
            return "tomorrow";
        }
    }

    return "";
}