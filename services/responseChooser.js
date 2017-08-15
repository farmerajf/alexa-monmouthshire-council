module.exports = {
    choose: (choices) => {
        var choice = Math.floor((Math.random() * choices.length))
        return choices[choice];
    }
};