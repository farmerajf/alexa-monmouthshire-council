var nodeRestClient = require('node-rest-client').Client;
var client = new nodeRestClient();

function getWasteCollectionsPromise() {
    return new Promise((resolve, reject) => {
        client.get("https://5w7z6f1kae.execute-api.eu-west-1.amazonaws.com/dev/getWasteCollections", function (data, response) {
            resolve(data);
        });
    });
};

var getNextWasteCollectionPromise = (wasteType) => {
    return new Promise((resolve, reject) => {
        getWasteCollectionsPromise().then((data) => { 
            console.log(data.collections);
            var filteredWasteType = data.collections.filter((collection) => {return collection.collectionType === wasteType;})[0];
            resolve(filteredWasteType); 
        })
    });   
}

module.exports = {
    getNextWasteCollectionPromise: getNextWasteCollectionPromise
}