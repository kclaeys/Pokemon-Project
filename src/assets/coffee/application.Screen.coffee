do () ->
    Screen = "Views": {}, "Models": {}, "Functions": {}

    ###################################################################### VIEWS
    Screen.Views.WrapperView = Backbone.Marionette.LayoutView.extend
        class: "Screen.Views.WrapperView"
        template: "#screen-wrapper-template"
        initialize: (options) ->
            mainModel = new Screen.Models.CollectionModel()
            @.screenModel = mainModel.screenModel
            @.screenModel.wrapperView = @
            @.mainView = mainModel.view
            return
        regions:
            "screenRegion": "#screen-region"
        onRender: () ->
            Game.viewUnwrap @
            return
        onShow: () ->
            @.$el.css "outline": "2px solid black"
            Game.lightsOff()
            @.screenRegion.show @.mainView
            @.$el.focus()
            return

    Screen.Views.CollectionView = Backbone.Marionette.CollectionView.extend
        class: "Screen.Views.CollectionView"
        childView: Screen.Views.CellView
        initialize: (options) ->
            @.screenModel = options.screenModel
            @.characterPlacement = x: 5, y: 3
            $("body").keydown _.bind @.keydownHandler, @
            @.throttledUCP = _.throttle @.updateCharacterPlacement, 150
            return
        events:
            "keydown body": "keydownHandler"
        onShow: () ->
            @.setCharacterInitial()
            return
        keydownHandler: (event) ->
            unless Game.lightsAreOn
                switch event.which
                    when 27 # ESCAPE
                        unless Game.lightsAreOn then Game.lightsOn() else Game.lightsOff()
                    when 37 # LEFT
                        if @.characterPlacement.x > 0 then @.throttledUCP -1, 0
                    when 38 # UP
                        if @.characterPlacement.y < CELLSPERSIDE then @.throttledUCP 0, -1
                    when 39 # RIGHT
                        if @.characterPlacement.y > 0 then @.throttledUCP 1, 0
                    when 40 # DOWN
                        if @.characterPlacement.x < CELLSPERSIDE then @.throttledUCP 0, 1
            return
        setCharacterInitial: () ->
            @.throttledUCP 0, 0
        updateCharacterPlacement: (x, y) ->
            newIndex = (@.characterPlacement.x + x) + CELLSPERSIDE * (@.characterPlacement.y + y)
            $newCell = this.$el.children().eq newIndex
            if $newCell.is(".terrain-R, .terrain-O, .terrain-B, .terrain-W")
                return # don't allow player to walk onto rock, building, out of bounds, or water (temporary)
            else if $newCell.is(".terrain-D") and not (x is 0 and y is 0)
                newPlacement = Game.Areas[Game.currentArea[0]].DoorMap[Game.currentArea[1]][newIndex]
                @.screenModel.updateArea newPlacement
            else # else it's a walkable terrain or the other side of a door
                @.updateCharacterCell x, y, $newCell
            return
        updateCharacterCell: (x, y, $newCell) ->
            @.characterPlacement.x += x
            @.characterPlacement.y += y
            @.screenModel.set "characterPlacement", @.characterPlacement
            this.$el.find ".hasCharacter"
                    .removeClass "hasCharacter"
            $newCell.addClass "hasCharacter"
            return

    Screen.Views.CellView = Backbone.Marionette.ItemView.extend
        class: "Screen.Views.CellView"
        template: "#screen-cell-view-template"
        initialize: (options) ->
            @.model = options.model
            _.extend @, @.model.attributes
            return
        onRender: () ->
            Game.viewUnwrap @
            @.$el.addClass String.format "cellPos{0}-{1} terrain-{2}", @.x, @.y, @.cellTerrain
            return
        onShow: () ->
            return

    ##################################################################### MODELS
    Screen.Models.CellModel = Backbone.Model.extend
        class: "Screen.Models.CellModel"
        initialize: (options) ->
            _.extend @.attributes, options
            return

    Screen.Models.CollectionModel = Backbone.Collection.extend
        class: "Screen.Models.CollectionModel"
        model: Screen.Models.CellModel
        initialize: (options) ->
            @.createCollection()
            @.screenModel = new Screen.Models.ScreenModel
                collectionModel: @
                collectionView: @.view
            @.view = new Screen.Views.CollectionView
                collection: @
                childView: Screen.Views.CellView
                screenModel: @.screenModel
            @.screenModel.collectionView = @.view
            return
        createCollection: () ->
            unless Game.CreatedAreas[Game.currentArea[0]] and Game.CreatedAreas[Game.currentArea[0]][Game.currentArea[1]]
                if @.length
                    @.reset()
                terrainMap = Game.Areas[Game.currentArea[0]][Game.currentArea[1]]
                for i in [0...CELLSPERSIDE] by 1
                    for j in [0...CELLSPERSIDE] by 1
                        cellOptions = x: j, y: i, cellTerrain: terrainMap[i][j*2]
                        @.add [cellOptions]
                Game.CreatedAreas[Game.currentArea[0]] ?= {}
                Game.CreatedAreas[Game.currentArea[0]][Game.currentArea[1]] = {}
                $.extend true, Game.CreatedAreas[Game.currentArea[0]][Game.currentArea[1]], [@.models]
            else
                console.debug "area already exists, don't need to render"
                @.reset()
                @.add Game.CreatedAreas[Game.currentArea[0]][Game.currentArea[1]][0]
            return

    Screen.Models.ScreenModel = Backbone.Model.extend
        class: "Screen.Models.ScreenModel"
        initialize: (options) ->
            _.extend @, options
            return
        updateArea: (newPlacement) -> # newPlacement = ["AreaName", "AreaSubname", Index]
            Game.currentArea = [newPlacement[0], newPlacement[1]]
            @.collectionModel.createCollection()
            @.collectionView.characterPlacement =
                x: newPlacement[2] % CELLSPERSIDE
                y: (newPlacement[2] - (newPlacement[2] % CELLSPERSIDE)) / CELLSPERSIDE
            @.collectionView.setCharacterInitial()
            return


    ################################################################## FUNCTIONS
    Screen.Functions.initializeLayout = () ->
        Game.currentArea = ["Base", "Outside"]
        Screen.Views.wrapperView ?= new Screen.Views.WrapperView name: Game.currentArea
        Game.screenWrapperRegion.show Screen.Views.wrapperView,
            preventDestroy: false
        return

    Game.Screen = Screen
    return
