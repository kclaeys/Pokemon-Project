Game = do () ->
    GameApp = Backbone.Marionette.Application.extend
        "class": "GameApp"
        initialize: (options) ->
            return
        regions:
            "menuRegion": "#menu-region"
            "screenWrapperRegion": "#screen-wrapper-region"
        onStart: () ->
            console.log "GameApp has started!"
            Game.Menu.Functions.initializeLayout()
            return
        "lightsAreOn": true
    return new GameApp()
