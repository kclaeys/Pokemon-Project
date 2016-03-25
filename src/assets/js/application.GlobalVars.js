var CELLSIZE, CELLSPERSIDE, SCREENSIZE,
  slice = [].slice;

Game.TERRAIN = {
  "P": "#F0E68C",
  "G": "#228B22",
  "O": "#000000",
  "W": "#00008B",
  "R": "#835C3B",
  "B": "#444444",
  "D": "#A9A9A9",
  "T": "#FFFFFA"
};

SCREENSIZE = 375;

CELLSPERSIDE = 15;

CELLSIZE = SCREENSIZE / CELLSPERSIDE;

Game.CreatedAreas = {};

Game.viewUnwrap = function(view) {
  view.setElement(view.$el.children().unwrap());
};

Game.lightsOff = function() {
  if (Game.lightsAreOn) {
    Game.lightsAreOn = false;
    $("#shadow").css({
      "z-index": 1,
      "height": "100vh"
    });
    if ($(".screen-region").length) {
      $(".screen-region").css({
        "opacity": ""
      });
    }
    $("#main-region *:not(#screen-wrapper-region, #screen-wrapper-region *)").css({
      "visibility": "hidden"
    });
    $(".screen-region").css({
      "position": "fixed",
      "left": "50%",
      "top": "50%",
      "transform": "translate(-50%, -50%)"
    });
  }
};

Game.lightsOn = function() {
  if (!Game.lightsAreOn) {
    Game.lightsAreOn = true;
    $("#shadow").css({
      "z-index": "",
      "height": ""
    });
    if ($(".screen-region").length) {
      $(".screen-region").css({
        "opacity": 0.4
      });
    }
    $("#main-region *:not(#screen-wrapper-region, #screen-wrapper-region *)").css({
      "visibility": ""
    });
    $(".screen-region").css({
      "position": "relative",
      "left": "",
      "top": "",
      "transform": ""
    });
  }
};

Object.size = function(object) {
  var j, key, len, size;
  size = 0;
  for (j = 0, len = object.length; j < len; j++) {
    key = object[j];
    if (object.hasOwnProperty(key)) {
      ++size;
    }
  }
  return size;
};

String.format = function() {
  var i, init, j, ref, strings;
  init = arguments[0], strings = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  for (i = j = 0, ref = strings.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    init = init.replace("{" + i + "}", strings[i]);
  }
  return init;
};
