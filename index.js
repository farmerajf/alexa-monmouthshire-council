const alexaSdk = require('alexa-sdk');

module.exports.handler = function (event, context) {
	var alexa = alexaSdk.handler(event, context);
	alexa.registerHandlers(
		require('./handlers/wasteCollectionHandler.js')
		);
	alexa.execute();
};