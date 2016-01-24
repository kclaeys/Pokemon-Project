GameApp = Marionette.Application.extend({
    
});

var GameApp = new GameApp();

GameApp.addRegions({
    appRegion: "#app-container"
});

GameApp.on("start", function () {
    console.log("GameApp has started!");
});

GameApp.start();
