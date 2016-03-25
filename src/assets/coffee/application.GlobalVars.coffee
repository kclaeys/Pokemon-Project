################################################################################
## VARIABLES ###################################################################
################################################################################

Game.TERRAIN =
    "P": "#F0E68C" # Path
    "G": "#228B22" # Grass
    "O": "#000000" # Off screen
    "W": "#00008B" # Water
    "R": "#835C3B" # Rock
    "B": "#444444" # Building
    "D": "#A9A9A9" # Door to building
    "T": "#FFFFFA" # Tile (paved path or inside building)

SCREENSIZE = 375
CELLSPERSIDE = 15
CELLSIZE = SCREENSIZE / CELLSPERSIDE

Game.CreatedAreas = {}

################################################################################
## FUNCTIONS ###################################################################
################################################################################

Game.viewUnwrap = (view) ->
    view.setElement view.$el.children().unwrap()
    return

Game.lightsOff = () ->
    if Game.lightsAreOn
        Game.lightsAreOn = false
        $("#shadow").css "z-index": 1, "height": "100vh"
        if $(".screen-region").length
            $(".screen-region").css "opacity": ""
        $("#main-region *:not(#screen-wrapper-region, #screen-wrapper-region *)").css "visibility": "hidden"
        $(".screen-region").css
            "position": "fixed"
            "left": "50%"
            "top": "50%"
            "transform": "translate(-50%, -50%)"
    return

Game.lightsOn = () ->
    unless Game.lightsAreOn
        Game.lightsAreOn = true
        $("#shadow").css "z-index": "", "height": ""
        if $(".screen-region").length
            $(".screen-region").css "opacity": 0.4
        $("#main-region *:not(#screen-wrapper-region, #screen-wrapper-region *)").css "visibility": ""
        $(".screen-region").css
            "position": "relative"
            "left": ""
            "top": ""
            "transform": ""
        return

Object.size = (object) ->
    size = 0
    for key in object
        if object.hasOwnProperty key then ++size
    return size

String.format = (init, strings...) ->
    for i in [0...strings.length]
        init = init.replace("{" + i + "}", strings[i])
    return init
