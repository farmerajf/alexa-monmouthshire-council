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
            var soon = getSoon(response.daysAway);
            
            var responses = [
                "The next waste collection is the " + response.collectionType + " " + soon + " on " + response.textDate + ".",
                "Sure, the next collection is the " + response.collectionType + " " + soon + " on " + response.textDate + ".",
                "OKay, " + soon + " on " + response.textDate + " there is a collection for the " + response.collectionType
            ];
            this.emit(':tell', escape(chooser.choose(responses)));
        });
	}
};

function convertWasteType(value) {
    switch (value) {
        case 'recycling':
            return "Red & purple recycling bags";
        case "black bag":
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