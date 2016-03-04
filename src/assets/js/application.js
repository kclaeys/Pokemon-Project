GameApp = Backbone.Marionette.Application.extend({
    "class": "GameApp",
    initialize: function (options) {

    },
    regions: {
        "menuRegion": "#menu-region",
        "screenWrapperRegion": "#screen-wrapper-region"
    },
    onStart: function () {
        console.log("GameApp has started!");
        Game.Menu.Functions.initializeLayout();
    }
});

var Game = new GameApp();
