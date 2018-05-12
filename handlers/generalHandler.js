module.exports = {
    'Unhandled': function() {
        this.emit(':tell', "Oops, sorry, I'm not sure what you mean");
    }
}