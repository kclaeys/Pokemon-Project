(function() {
  var Screen;
  Screen = {
    "Views": {},
    "Models": {},
    "Functions": {}
  };
  Screen.Views.WrapperView = Backbone.Marionette.LayoutView.extend({
    "class": "Screen.Views.WrapperView",
    template: "#screen-wrapper-template",
    initialize: function(options) {
      var mainModel;
      mainModel = new Screen.Models.CollectionModel();
      this.screenModel = mainModel.screenModel;
      this.screenModel.wrapperView = this;
      this.mainView = mainModel.view;
    },
    regions: {
      "screenRegion": "#screen-region"
    },
    onRender: function() {
      Game.viewUnwrap(this);
    },
    onShow: function() {
      this.$el.css({
        "outline": "2px solid black"
      });
      Game.lightsOff();
      this.screenRegion.show(this.mainView);
      this.$el.focus();
    }
  });
  Screen.Views.CollectionView = Backbone.Marionette.CollectionView.extend({
    "class": "Screen.Views.CollectionView",
    childView: Screen.Views.CellView,
    initialize: function(options) {
      this.screenModel = options.screenModel;
      this.characterPlacement = {
        x: 5,
        y: 3
      };
      $("body").keydown(_.bind(this.keydownHandler, this));
      this.throttledUCP = _.throttle(this.updateCharacterPlacement, 150);
    },
    events: {
      "keydown body": "keydownHandler"
    },
    onShow: function() {
      this.setCharacterInitial();
    },
    keydownHandler: function(event) {
      if (!Game.lightsAreOn) {
        switch (event.which) {
          case 27:
            if (!Game.lightsAreOn) {
              Game.lightsOn();
            } else {
              Game.lightsOff();
            }
            break;
          case 37:
            if (this.characterPlacement.x > 0) {
              this.throttledUCP(-1, 0);
            }
            break;
          case 38:
            if (this.characterPlacement.y > 0) {
              this.throttledUCP(0, -1);
            }
            break;
          case 39:
            if (this.characterPlacement.x < CELLSPERSIDE - 1) {
              this.throttledUCP(1, 0);
            }
            break;
          case 40:
            if (this.characterPlacement.y < CELLSPERSIDE - 1) {
              this.throttledUCP(0, 1);
            }
        }
      }
    },
    setCharacterInitial: function() {
      return this.throttledUCP(0, 0);
    },
    updateCharacterPlacement: function(x, y) {
      var $newCell, newIndex, newPlacement;
      newIndex = (this.characterPlacement.x + x) + CELLSPERSIDE * (this.characterPlacement.y + y);
      $newCell = this.$el.children().eq(newIndex);
      if ($newCell.is(".terrain-R, .terrain-O, .terrain-B, .terrain-W")) {
        return;
      } else if ($newCell.is(".terrain-D") && !(x === 0 && y === 0)) {
        newPlacement = Game.Areas[Game.currentArea[0]].DoorMap[Game.currentArea[1]][newIndex];
        this.screenModel.updateArea(newPlacement);
      } else {
        this.updateCharacterCell(x, y, $newCell);
      }
    },
    updateCharacterCell: function(x, y, $newCell) {
      this.characterPlacement.x += x;
      this.characterPlacement.y += y;
      this.screenModel.set("characterPlacement", this.characterPlacement);
      this.$el.find(".hasCharacter").removeClass("hasCharacter");
      $newCell.addClass("hasCharacter");
    }
  });
  Screen.Views.CellView = Backbone.Marionette.ItemView.extend({
    "class": "Screen.Views.CellView",
    template: "#screen-cell-view-template",
    initialize: function(options) {
      this.model = options.model;
      _.extend(this, this.model.attributes);
    },
    onRender: function() {
      Game.viewUnwrap(this);
      this.$el.addClass(String.format("cellPos{0}-{1} terrain-{2}", this.x, this.y, this.cellTerrain));
    },
    onShow: function() {}
  });
  Screen.Models.CellModel = Backbone.Model.extend({
    "class": "Screen.Models.CellModel",
    initialize: function(options) {
      _.extend(this.attributes, options);
    }
  });
  Screen.Models.CollectionModel = Backbone.Collection.extend({
    "class": "Screen.Models.CollectionModel",
    model: Screen.Models.CellModel,
    initialize: function(options) {
      this.createCollection();
      this.screenModel = new Screen.Models.ScreenModel({
        collectionModel: this,
        collectionView: this.view
      });
      this.view = new Screen.Views.CollectionView({
        collection: this,
        childView: Screen.Views.CellView,
        screenModel: this.screenModel
      });
      this.screenModel.collectionView = this.view;
    },
    createCollection: function() {
      var base, cellOptions, i, j, k, l, name, ref, ref1, terrainMap;
      if (!(Game.CreatedAreas[Game.currentArea[0]] && Game.CreatedAreas[Game.currentArea[0]][Game.currentArea[1]])) {
        if (this.length) {
          this.reset();
        }
        terrainMap = Game.Areas[Game.currentArea[0]][Game.currentArea[1]];
        for (i = k = 0, ref = CELLSPERSIDE; k < ref; i = k += 1) {
          for (j = l = 0, ref1 = CELLSPERSIDE; l < ref1; j = l += 1) {
            cellOptions = {
              x: j,
              y: i,
              cellTerrain: terrainMap[i][j * 2]
            };
            this.add([cellOptions]);
          }
        }
        if ((base = Game.CreatedAreas)[name = Game.currentArea[0]] == null) {
          base[name] = {};
        }
        Game.CreatedAreas[Game.currentArea[0]][Game.currentArea[1]] = {};
        $.extend(true, Game.CreatedAreas[Game.currentArea[0]][Game.currentArea[1]], [this.models]);
      } else {
        console.debug("area already exists, don't need to render");
        this.reset();
        this.add(Game.CreatedAreas[Game.currentArea[0]][Game.currentArea[1]][0]);
      }
    }
  });
  Screen.Models.ScreenModel = Backbone.Model.extend({
    "class": "Screen.Models.ScreenModel",
    initialize: function(options) {
      _.extend(this, options);
    },
    updateArea: function(newPlacement) {
      Game.currentArea = [newPlacement[0], newPlacement[1]];
      this.collectionModel.createCollection();
      this.collectionView.characterPlacement = {
        x: newPlacement[2] % CELLSPERSIDE,
        y: (newPlacement[2] - (newPlacement[2] % CELLSPERSIDE)) / CELLSPERSIDE
      };
      this.collectionView.setCharacterInitial();
    }
  });
  Screen.Functions.initializeLayout = function() {
    var base;
    Game.currentArea = ["Base", "Outside"];
    if ((base = Screen.Views).wrapperView == null) {
      base.wrapperView = new Screen.Views.WrapperView({
        name: Game.currentArea
      });
    }
    Game.screenWrapperRegion.show(Screen.Views.wrapperView, {
      preventDestroy: false
    });
  };
  Game.Screen = Screen;
})();
