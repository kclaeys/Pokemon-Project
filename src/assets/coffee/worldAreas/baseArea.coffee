Game.Areas =
    Base: {}

Game.Areas.Base.Outside = [
    "R R R R R R R R R R R R R R R",
    "G G G G G G G G G G G G G G G",
    "G G G G G G G G G G G G G G G",
    "G G G G G P P P P P P P P P P",
    "G G G G G P P P P P P P P P P",
    "G B B B B P P R R R R R R R R",
    "G B B B B P P R W W W W W W W",
    "G B B B D P P R W W W W W W W",
    "G B B B D P P R W W W W W W W",
    "G B B B B P P W W W W W W W W",
    "G G G G G P P W W W W W W W W",
    "G G G P P P P R W W W W W W W",
    "G G G P P P P R W W W W W W W",
    "G G G P P R R R W W W W W W W",
    "G G G P P R W W W W W W W W W"
]

Game.Areas.Base.Building1 = [
    "O O O O O O O O O O O O O O O",
    "O O O O O O O O O O O O O O O",
    "O O O O O O O O O O O O O O O",
    "O O O O O O O O O O O O O O O",
    "O O O O T T T T T T T O O O O",
    "O O O O T T T T T T T O O O O",
    "O O O O T T T T T T T O O O O",
    "O O O O T T T T T T T D O O O",
    "O O O O T T T T T T T D O O O",
    "O O O O T T T T T T T O O O O",
    "O O O O T T T T T T T O O O O",
    "O O O O O O O O O O O O O O O",
    "O O O O O O O O O O O O O O O",
    "O O O O O O O O O O O O O O O",
    "O O O O O O O O O O O O O O O"
]

# Insides are InsideName: {InsideIndex: OutsideIndex, ... }
# Outsides are Outside: {OutsideIndex: InsideIndex, ... }
# Doors lead to the tile past their corresponding door
Game.Areas.Base.DoorMap =
    Outside:
        109: ["Base", "Building1", 115]
        124: ["Base", "Building1", 130]
    Building1:
        116: ["Base", "Outside", 110]
        131: ["Base", "Outside", 125]
