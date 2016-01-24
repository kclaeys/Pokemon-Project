var FILEPATH = 'C:Users/Kloiper/Documents/NEU/Personal Projects/Pokemon/src/js/savefiles/'
var FILETYPE = '.json'

function loadSave(name) {
    filepath = FILEPATH + name + FILETYPE;
    saveFile = new File(filepath, 'r');
}

function saveGame(game) {
    playerName = game.player.name;
}
