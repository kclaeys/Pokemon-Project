do () ->
    Menu = "Views": {}, "Models": {}, "Functions": {}

    ###################################################################### VIEWS
    Menu.Views.MenuView = Backbone.Marionette.LayoutView.extend
        class: "Menu.Views.MenuView"
        template: "#menu-template"
        initialize: (options) ->
            @.loadGameButtonView = new Menu.Views.StartButtonView
                buttonText: "Load Game"
            @.newGameButtonView = new Menu.Views.StartButtonView
                buttonText: "New Game"
            return
        regions:
            loadGameButtonRegion: "#load-game-button"
            newGameButtonRegion: "#new-game-button"
        ui:
            "loadGameButton": "#load-game-button > button"
            "newGameButton": "#new-game-button > button"
        events:
            "click @ui.loadGameButton": "loadGame"
            "click @ui.newGameButton": "startGame"
        onRender: () ->
            Game.viewUnwrap @
            return
        onShow: () ->
            @.loadGameButtonRegion.show @.loadGameButtonView
            @.newGameButtonRegion.show @.newGameButtonView
            return
        doSomething: (event) ->
            console.debug "something"
            return
        loadGame: (event) ->
            console.debug "loading the game", event
            return
        startGame: (event) ->
            if !Game.Screen.Views.wrapperView
                Game.Screen.Functions.initializeLayout()
            else Game.lightsOff()
            return


    Menu.Views.StartButtonView = Backbone.Marionette.ItemView.extend
        class: "Menu.Views.StartButtonView"
        template: "#start-button-template"
        initialize: (options) ->
            @.buttonText = options.buttonText
            return
        onRender: () ->
            Game.viewUnwrap @
            return
        onShow: () ->
            @.$el.append @.buttonText
            return

    ##################################################################### MODELS

    ################################################################## FUNCTIONS
    Menu.Functions.initializeLayout = () ->
        Menu.menuView ||= new Menu.Views.MenuView()
        unless Game.menuRegion.hasView()
            Game.menuRegion.show Game.Menu.menuView
        return

    Game.Menu = Menu
    return
