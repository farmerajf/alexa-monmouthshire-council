const alexaSdk = require('alexa-sdk');

module.exports.handler = function (event, context) {
	var alexa = alexaSdk.handler(event, context);
	alexa.registerHandlers(
		require('./handlers/wasteCollectionHandler.js'),
		require('./handlers/generalHandler.js')
		);
	alexa.execute();
};