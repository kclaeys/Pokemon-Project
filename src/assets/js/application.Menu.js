(function() {
  var Menu;
  Menu = {
    "Views": {},
    "Models": {},
    "Functions": {}
  };
  Menu.Views.MenuView = Backbone.Marionette.LayoutView.extend({
    "class": "Menu.Views.MenuView",
    template: "#menu-template",
    initialize: function(options) {
      this.loadGameButtonView = new Menu.Views.StartButtonView({
        buttonText: "Load Game"
      });
      this.newGameButtonView = new Menu.Views.StartButtonView({
        buttonText: "New Game"
      });
    },
    regions: {
      loadGameButtonRegion: "#load-game-button",
      newGameButtonRegion: "#new-game-button"
    },
    ui: {
      "loadGameButton": "#load-game-button > button",
      "newGameButton": "#new-game-button > button"
    },
    events: {
      "click @ui.loadGameButton": "loadGame",
      "click @ui.newGameButton": "startGame"
    },
    onRender: function() {
      Game.viewUnwrap(this);
    },
    onShow: function() {
      this.loadGameButtonRegion.show(this.loadGameButtonView);
      this.newGameButtonRegion.show(this.newGameButtonView);
    },
    doSomething: function(event) {
      console.debug("something");
    },
    loadGame: function(event) {
      console.debug("loading the game", event);
    },
    startGame: function(event) {
      if (!Game.Screen.Views.wrapperView) {
        Game.Screen.Functions.initializeLayout();
      } else {
        Game.lightsOff();
      }
    }
  });
  Menu.Views.StartButtonView = Backbone.Marionette.ItemView.extend({
    "class": "Menu.Views.StartButtonView",
    template: "#start-button-template",
    initialize: function(options) {
      this.buttonText = options.buttonText;
    },
    onRender: function() {
      Game.viewUnwrap(this);
    },
    onShow: function() {
      this.$el.append(this.buttonText);
    }
  });
  Menu.Functions.initializeLayout = function() {
    Menu.menuView || (Menu.menuView = new Menu.Views.MenuView());
    if (!Game.menuRegion.hasView()) {
      Game.menuRegion.show(Game.Menu.menuView);
    }
  };
  Game.Menu = Menu;
})();
