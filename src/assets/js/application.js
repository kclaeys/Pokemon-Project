var Game;

Game = (function() {
  var GameApp;
  GameApp = Backbone.Marionette.Application.extend({
    "class": "GameApp",
    initialize: function(options) {},
    regions: {
      "menuRegion": "#menu-region",
      "screenWrapperRegion": "#screen-wrapper-region"
    },
    onStart: function() {
      console.log("GameApp has started!");
      Game.Menu.Functions.initializeLayout();
    },
    "lightsAreOn": true
  });
  return new GameApp();
})();
