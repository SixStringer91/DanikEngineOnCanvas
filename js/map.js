(function(){
const MapStack = function (path='images/tileSet5.png'){
this.x=64;
this.y=64;
this.viewport= {
offset    : 0,
endTile   : 0,
startTile : 0
};
this.ctx=document.getElementById('canvas').getContext('2d');
this.loaded =false;
this.img;
this.loadImage(path);
//объекты нижней карты тайлов


  this.tileObjects = [

    {
      array: [20, 0],
      walkable: true,
      id: 0 //grass
  
    },
    {array: [0, 1],
      walkable: true,
      id: 1 //road-base
    },
    {
      array: [15, 0],
      walkable: true,
      id: 3 // grassroad top left
    },
    {
      array: [16, 0],
      walkable: true,
      id: 4 // roadgrass top middle
    },
    {
      array: [17, 0],
      walkable: true,
      id: 5 // roadgrass top right
    },
    {
      array: [15, 1],
      walkable: true,
      id: 6 // road grass left middle
    },
    {
      array: [17, 1],
      walkable: true,
      id: 7 // road grass right middle
    },
    {
      array: [15, 2],
      walkable: true,
      id: 8 // road grass left bottom
    },
    {
      array: [16, 2],
      walkable: true,
      id: 9 //road grass bottom middle
    },
    {
      array: [17, 2],
      walkable: true,
      id: 10 //road grass right bottom
    },
    {
      array: [18, 1],
      walkable: true,
      id: 11 //grass-road right-top
    },
  
  
    {
      array: [19, 1],
      walkable: true,
      id: 12 // grass road bottom right
    },
  
    {
      array: [18, 0],
      walkable: true,
      id: 13 // grass road left top
    },
  
  
    {
      array: [19, 0],
      walkable: true,
      id: 14 // grass road top right
    },
  
    {
      array: [5, 7],
      walkable: true,
      id: 15 // plato-edge-biddle-bottom
    },
  
    {
      array: [6, 7],
      walkable: true,
      id: 16 //plato-edge-biddle-bottom-liana
    },
  
    {
      array: [6, 8],
      walkable: false,
      id: 17 //plato-wall-liana
    },
  
    {
      array: [7, 7],
      walkable: true,
      id: 18 //plato-edge-biddle-bottom-bush
    },
  
    {
      array: [7, 8],
      walkable: false,
      id: 19 //plato-wall-bush
    },
  
    {
      array: [2, 9],
      walkable: false,
      id: 20 //plato-edge-right-bottom
    },
  
    {
      array: [1, 10],
      walkable: false,
      id: 21 // plato-wall
    },
  
    {
      array: [5, 9],
      walkable: false,
      id: 22 // plato-wall-grass
    },
  
    {
      array: [7, 9],
      walkable: false,
      id: 23 // plato-wall-bottom-bush
    },
  
    {
      array: [2, 10],
      walkable: false,
      id: 24 // plato-wall-edge-right
    },
  
    {
      array: [2, 11],
      walkable: false,
      id: 25 // plato-wall-edge-right-grass
    },
  
    {
      array: [0, 11],
      walkable: false,
      id: 26 // plato-wall-edge-left-grass-bottom
    },
  
    {
      array: [0, 9],
      walkable: false,
      id: 27 // plato-wall-edge-left-grass-top
    },
  
    {
      array: [3, 9],
      walkable: false,
      id: 28 // grass-plato left-bottom
    },
  
    {
      array: [0, 10],
      walkable: false,
      id: 29 // plato left-middle
    }
  
    ,
  
    {
      array: [2, 8],
      walkable: true,
      id: 30 // plato-grass-right-middle
    },
  
    {
      array: [3, 16],
      walkable: true,
      id: 31 // staiway-grass-bottom
    },
  
    {
      array: [3, 15],
      walkable: true,
      id: 32 // staiway-grass-middle
    },
  
    {
      array: [3, 14],
      walkable: true,
      id: 33 // staiway-grass-top
    },
  
    {
      array: [3, 13],
      walkable: false,
      id: 34 // cave right bottom
    },
  
    {
      array: [2, 13],
      walkable: false,
      id: 35 // cave-left - bottom
    },
  
    {
      array: [2, 12],
      walkable: false,
      id: 36 //cave - left - top
    },
  
    {
      array: [3, 12],
      walkable: false,
      id: 37 //cave - right - top
    },
    {
      array: [15, 10],
      walkable: false,
      id: 38 //unwalkable zone
  
    },
    {
      array: [16, 10],
      walkable: false,
      id: 39 //unwalkable zone
  
    },
    {
      array: [17, 10],
      walkable: false,
      id: 40 //unwalkable zone
  
    },
    {
      array: [0, 19],
      walkable: false,
      id: 41 //unwalkable zone
  
    },
    {
      array: [1, 19],
      walkable: false,
      id: 42 //unwalkable zone
  
    },
  
    {
      array: [11, 13],
      walkable: false,
      id: 43 //forest
  
    },
    {
      array: [12, 13],
      walkable: false,
      id: 44 //forest
  
    },
    {
      array: [16, 13],
      walkable: false,
      id: 45 //forest
  
    },
    {
      array: [16, 14],
      walkable: false,
      id: 46 //forest
  
    },
    {
      array: [12, 14],
      walkable: false,
      id: 47 //forest
  
    },
    {
      array: [11, 14],
      walkable: false,
      id: 48 //forest
  
    },
    {
      array: [11, 15],
      walkable: false,
      id: 49 //forest
  
    },
    {
      array: [12, 15],
      walkable: false,
      id: 50 //forest
  
    },
    {
      array: [16, 15],
      walkable: false,
      id: 51 //forest
  
    },
   {
      array: [11, 16],
      walkable: false,
      id: 52 //forest
  
    },
    {
      array: [12, 16],
      walkable: false,
      id: 53 //forest
  
    },
    {
      array: [13, 16],
      walkable: false,
      id: 54 //forest
  
    },
    {
      array: [13, 15],
      walkable: false,
      id: 55 //forest
  
    },
    {
      array: [14, 15],
      walkable: false,
      id: 56 //forest
  
    },
    {
      array: [15, 15],
      walkable: false,
      id: 57 //forest
  
    },
    {
      array: [14, 16],
      walkable: false,
      id: 58 //forest
  
    },
    {
      array: [15, 16],
      walkable: false,
      id: 59 //forest
  
    },
    {
      array: [17, 16],
      walkable: false,
      id: 60 //forest
  
    },
    {
      array: [17, 15],
      walkable: false,
      id: 61 //forest
  
    },
    {
      array: [18, 14],
      walkable: false,
      id: 62 //forest
  
    },
    {
      array: [17, 17],
      walkable: false,
      id: 63 //forest
  
    },
    {
      array: [15, 17],
      walkable: false,
      id: 64 //forest
  
    },
    {
      array: [14, 17],
      walkable: false,
      id: 65 //forest
  
    },
    {
      array: [13, 17],
      walkable: false,
      id: 66 //forest
  
    },
    {
      array: [12, 17],
      walkable: false,
      id: 67 //forest
  
    },
    {
      array: [11, 17],
      walkable: false,
      id: 68 //forest
  
    },
    {
      array: [11, 18],
      walkable: false,
      id: 69 //forest
  
    },
    {
      array: [12, 18],
      walkable: false,
      id: 70 //forest
  
    },
    {
      array: [13, 18],
      walkable: false,
      id: 71 //forest
  
    },
    {
      array: [14, 18],
      walkable: false,
      id: 72 //forest
  
    },
    {
      array: [15, 18],
      walkable: false,
      id: 73 //forest
  
    },
    {
      array: [16, 18],
      walkable: false,
      id: 74 //forest
  
    },
    {
      array: [10, 17],
      walkable: false,
      id: 75 //forest
  
    },
    {
      array: [9, 17],
      walkable: false,
      id: 76 //forest
  
    },
    {
      array: [9, 16],
      walkable: false,
      id: 77 //forest
  
    },
    {
      array: [9, 15],
      walkable: false,
      id: 78 //forest
  
    },
    {
      array: [9, 14],
      walkable: false,
      id: 79 //forest
  
    },
    {
      array: [16, 17],
      walkable: false,
      id: 80 //forest
  
    },
    {
      array: [16, 16],
      walkable: false,
      id: 81 //forest
  
    },
    {
      array: [16, 15],
      walkable: false,
      id: 82 //forest
  
    },
    {
      array: [0, 8],
      walkable: false,
      id: 83 // plato-wall-edge-left-grass-bottom
    },
    {
      array: [0, 7],
      walkable: false,
      id: 84 // plato-wall-edge-left-grass-bottom
    },
    {
      array: [2, 7],
      walkable: false,
      id: 85 // plato-wall-edge-left-grass-bottom
    },
    {
      array: [0,12],
      walkable: false,
      id: 86 // staiway-grass-top
    },
    {
      array: [6,13],
      walkable: false,
      id: 87 // staiway-grass-top
    },
    {
      array: [7,13],
      walkable: false,
      id: 88 // staiway-grass-top
    },
    {
      array: [7,12],
      walkable: false,
      id: 89 // staiway-grass-top
    },
    {
      array: [6,12],
      walkable: false,
      id: 90 // staiway-grass-top
    },
    {
      array:  [7,7],
      walkable: false,
      id: 91 // staiway-grass-top
    },
    {
      array:  [6,10],
      walkable: false,
      id: 92 // staiway-grass-top
    },
    {
      array: [6, 11],
      walkable:false,
      id: 93 // staiway-grass-top
    },
    {
      array: [5, 6],
      walkable: false,
      id: 94 // staiway-grass-top
    },
    {
      array: [9, 5],
      walkable: false,
      id: 95 // plato-wall-grass
    },
    {
      array: [1, 3],
      walkable: true,
      id: 96 // stones
    },
    {
      array: [2, 2],
      walkable: true,
      id: 97 // stones
    },
    {
      array: [4,2],
      walkable: true,
      id: 98 // stones
    },
    {
      array: [0,13],
      walkable: false,
      id: 99 // plato-wall-grass
    },
 
  ];
  
  //нижная карта тайлов
this.map = [
  [83,84,27,15,15,15,15,28, 0, 0, 0, 0, 0, 0, 0,30,85,43,44,44,48,47,47,47,47,62,44,44,48,47,47,47,47,62,44,44,44,44,45,30],
  [83,83,29,21,36,37,21,27,92,15,92,91,92,15,16,20,30,48,47,47,47,47,62,56,57,82,47,47,47,47,62,56,57,82,47,47,47,47,62,30],
  [83,83,26,22,35,34,22,29,93,21,93,19,93,21,17,24,30,49,50,55,56,57,61,58,59,81,50,55,56,57,61,58,59,81,50,55,56,57,82,30],
  [83,83, 0, 0, 0, 0, 0,26,22,22,22,23,22,22,22,25,30,52,53,54,58,59,60,65,64,80,53,54,58,59,60,65,64,80,53,54,58,59,81,30],
  [83,27,15,15,15,33,15,15,15,15,15,15,15,15,15,15,20,68,67,66,65,64,63,72,73,74,67,66,65,64,63,72,73,74,67,66,65,64,80,30],
  [83,29,21,21,21,32,21,21,21,21,21,21,86,21,21,21,24,69,70,71,72,73,74, 0, 0,69,70,71,72,73,74, 0, 0,69,70,71,72,73,74,30],
  [83,26,22,22,22,31,22,22,22,22,22,22,99,22,22,22,25, 0, 0,98, 0, 0, 0,98, 0,97,97,97, 0, 0,97,97,97, 0, 0, 0,38,39,40,30],
  [83, 0, 0, 0, 3, 4, 5,97, 0,97, 0,97,96,96,96, 0, 0,98, 0, 0,98, 0, 0, 0, 0, 0, 0,38,39,40, 0, 0,97,97,97, 0, 0, 0, 0,30],
  [83,41,42, 0, 6, 1, 7,38,39,40,97, 0, 0, 0,41,42,38,39,40, 0,97,97,97, 0, 0,97,97,97,97, 0, 0, 0,98, 0,98,97,97,97, 0,30],
  [83, 0, 0, 0, 6, 1, 7, 0,97,97, 0,41,42,96,96, 0, 0, 0, 0, 0, 0, 0, 0, 0,98,41,42, 0,98, 0,96, 0, 0,97,97,97, 0,98, 0,30],
  [83,41,42, 3,12, 1, 7, 0,96, 0,96,96, 0,96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,96,97,97, 0, 0, 0,97,98, 0, 0, 0,30],
  [83, 0, 0, 6, 1, 1,11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0, 0,0, 0, 0, 0,97, 0, 0, 0,41,42, 0,38,39,40, 0,98, 0, 0,30],
  [83, 0, 0, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 0,38,39,40, 0,97, 0, 0,97,98, 0, 0, 0, 0, 0, 0, 0,41,42, 0,30],
  [83, 3, 4,12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 0, 0,98, 0,98, 0, 0,98, 0, 0,98, 0, 0, 0, 0, 0, 0, 0, 0, 0,30],
  [83, 6,13, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,14, 1, 7, 0,97,97,97, 0,96, 0, 0,97,97,97,97, 0, 0,96, 0,41,42, 0, 0,30],
  [83, 6, 7, 0,97,97,97, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 7, 0, 0, 0, 0, 0, 0,38,39,40,97, 0,97,97, 0,0, 0,96, 0, 0, 0,30],
  [83, 6, 7,97,97,97, 0, 0, 0,38,39,40, 0, 0, 0, 0, 6, 1, 7,41,42, 0, 0, 0, 0, 0, 0, 0,97,97,96, 0, 0,41,42, 0, 0,41,42,30],
  [83, 6,11, 4, 4, 4, 4, 4, 4, 5, 0, 0, 0, 0, 0, 0, 6, 1,11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0,30],
  [83, 8, 9, 9, 9, 9, 9, 9,14, 7,41,42, 0, 0, 0, 0, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 0,30],
  [83,41,42, 0, 0,41,42, 0, 8,10, 0, 0, 0,38,39,40, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,10, 0,30],
  [27,15,15,15,15,15,15,15,15,33,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,33,15,15,20],
  [29,21,21,21,21,21,21,21,21,32,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,32,21,21,24],
  [29,21,21,21,21,21,21,21,21,32,21,21,21,21,86,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,90,89,21,21,21,32,21,21,24],
  [26,22,22,22,22,22,22,22,22,31,22,22,22,22,99,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,87,88,22,22,22,31,22,22,25],
  [ 0,38,39,40, 0, 0, 0, 0, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0, 0, 0, 0, 0 ,0,97,97,97, 0, 0 ,0,97,97,97, 0, 0 ,3, 4, 5,41,42], 
  [83,41,42,97,97,97, 0, 0, 8, 9, 9, 9, 9, 9, 9, 9,14,11, 5, 0, 0, 0, 0, 0, 0, 0, 0,41,42, 0, 0,98, 0, 0, 3,12,13,10, 0,30],
  [83, 0, 0, 0, 0,97,97,97, 0, 0,97,97,97, 0, 0, 0, 6, 1, 7, 0, 0, 0,38,39,40, 0, 0, 0, 0,98, 0, 0, 0, 3,12, 1, 7, 0, 0,30],
  [83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,98, 0,97,97,97, 6, 1, 7,97,97,97, 0, 0, 0, 0,97,97,97, 0, 0, 3, 4,12,13, 9,10,98, 0,30],
  [83, 0,97,97,97, 0, 0, 0, 0, 0,97,97,97, 0, 0, 0, 6, 1, 7, 0, 0, 0,41,42, 0, 3, 4, 4, 4, 4, 4,12, 1,13,10, 0, 0, 0, 0,30],
  [83, 0,96, 0, 0, 0,96, 0, 0, 0, 0, 0, 0,98, 0, 0, 8,14, 7, 0, 0, 0, 0, 0, 3,12, 1, 1, 1, 1, 1, 1,13,10, 0, 0,98, 0, 0,30],
  [83,38,39,40,96, 0, 0, 0, 0,38,39,40, 0, 0, 0, 0, 0, 6, 1, 4, 4, 4, 4, 4,12, 1,13, 9, 9, 9, 9, 9,10,97,97,97, 0,98, 0,30],
  [83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,97,97,97, 0, 6, 1, 1, 1, 1, 1, 1, 1,13,10,97,97,97,97,97,97, 0,97,97,97, 0, 0,30],
  [83, 0,96, 0, 0, 0, 0,97,97,97, 0, 0, 0, 0, 0, 0, 0, 8, 9, 9,14, 1, 1,13, 9,10, 0,97,97,97,97,97,97, 0,41,42, 0, 0, 0,30],
  [83,96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,41,42, 0, 0, 0, 6, 1,13,10,98, 0, 0, 0,98, 0, 0, 0, 0, 0, 0,98, 0,98, 0,30],
  [83, 0,96, 0,38,39,40, 0,97,97,97, 0,97,97,97, 0, 0, 0, 0, 0, 6, 1, 7, 0,96, 0, 0,41,42, 0, 0,97,97,97, 0, 0, 0, 0, 0,30],
  [83,96, 0,97,97,97, 0,97,97,97, 0, 0, 0, 0, 0, 0,97,97,97, 0, 8, 9,10,0 , 0, 0, 0,97,97,97, 0, 0, 0, 0, 0,41,42, 0, 0,30],
  [83, 0, 0, 0,97,97,97, 0,96, 0,38,39,40, 0,96, 0,41,42,97,97,97, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,38,39,40, 0, 0, 0, 0, 0,30],
  [83,41,42, 0,96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,96,97,98,96, 0, 0, 0,96, 0, 0,96, 0, 0, 0, 0,30],
  [27,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,20],
  [29,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,24]
  
];
//93,94
//верхнаяя карта тайлов
this.tileObjectsUp = [{
  array: [15, 10],
  id: 1 //unwalkable zone

},
{
  array: [16, 10],
  id: 2 //unwalkable zone

},
{
  array: [17, 10],
  id: 3 //unwalkable zone

},
{
  array: [15, 8],
  id: 4 //unwalkable zone

},
{
  array: [16, 8],
  id: 5 //unwalkable zone

},
{
  array: [17, 8],
  id: 6 //unwalkable zone

},
{
  array: [14, 7],
  id: 7 //unwalkable zone

},
{
  array: [15, 7],
  id: 8 //unwalkable zone

},
{
  array: [16, 7],
  id: 9 //unwalkable zone

},
{
  array: [17, 7],
  id: 10 //unwalkable zone

},
{
  array: [18, 7],
  id: 11 //unwalkable zone

},
{
  array: [14, 6],
  id: 12 //unwalkable zone

},
{
  array: [15, 6],
  id: 13 //unwalkable zone

},
{
  array: [16, 6],
  id: 14 //unwalkable zone

},
{
  array: [17, 6],
  id: 15 //unwalkable zone

},
{
  array: [18, 6],
  id: 16 //unwalkable zone

},
{
  array: [14, 5],
  id: 17 //unwalkable zone

},
{
  array: [15, 5],
  id: 18 //unwalkable zone

},
{
  array: [16, 5],
  id: 19 //unwalkable zone

},
{
  array: [17, 5],
  id: 20 //unwalkable zone

}, {
  array: [18, 5],
  id: 21 //unwalkable zone

},
{
  array: [15, 4],
  id: 22 //unwalkable zone

},
{
  array: [16, 4],
  id: 23 //unwalkable zone

},
{
  array: [17, 4],
  id: 24 //unwalkable zone

},
{
  array: [0, 18],
  id: 25 //bush left

},
{
  array: [1, 18],
  id: 26 //bush right

},
{
  array: [11, 17],
  id: 27 //forest

},
{
  array: [11, 16],
  id: 28 //forest

},
{
  array: [11, 15],
  id: 29 //forest

},
{
  array: [11, 14],
  id: 30 //forest

},
{
  array: [11, 13],
  id: 31 //forest

},
{
  array: [12, 13],
  id: 32 //forest

},
{
  array: [16, 13],
  id: 33 //forest

},
{
  array: [5, 5],
  id: 34 //cave
},
{
  array: [6, 5],
  id: 35 //cave
},
{
  array: [7, 5],
  id: 36 //cave
},
{
  array: [10, 8],
  id: 37 //unwalkable zone

},
{
  array: [11, 8],
  id: 38 //unwalkable zone

},
{
  array: [12, 8],
  id: 39 //unwalkable zone

},
{
  array: [13, 7],
  id: 40 //unwalkable zone

},
{
  array: [12, 7],
  id: 41 //unwalkable zone

},
{
  array: [11, 7],
  id: 42 //unwalkable zone

},
{
  array: [10, 7],
  id: 43 //unwalkable zone

},
{
  array: [9, 7],
  id: 44 //unwalkable zone

},
{
  array: [9, 6],
  id: 45 //unwalkable zone

},
{
  array: [10, 6],
  id: 46 //unwalkable zone

},
{
  array: [11, 6],
  id: 47 //unwalkable zone

},
{
  array: [12, 6],
  id: 48 //unwalkable zone

},
{
  array: [13, 6],
  id: 49 //unwalkable zone

},
{
  array: [13, 5],
  id: 50 //unwalkable zone

},
{
  array: [12, 5],
  id: 51 //unwalkable zone

},
{
  array: [11, 5],
  id: 52 //unwalkable zone

},
{
  array: [10, 5],
  id: 53 //unwalkable zone

},
{
  array: [9, 5],
  id: 54 //unwalkable zone

},
{
  array: [10, 4],
  id: 55 //unwalkable zone

},
{
  array: [11, 4],
  id: 56 //unwalkable zone

},
{
  array: [12, 4],
  id: 57 //unwalkable zone

},
{
 array:[4,18],
  id: 58 //unwalkable zone

},
{
  array: [2, 5],
  id: 59 //unwalkable zone

},
{
  array: [1, 5],
  id: 60 //unwalkable zone

}
];
this.mapUp = [
  [ 0, 0, 0, 0, 0, 0, 0,58,58,58,58,58,58,58,58,58, 0, 0, 0, 0,32,32,33, 0, 0,31, 0, 0,32,32,33, 0, 0,31, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,30, 0, 0, 0, 0, 0, 0, 0,30, 0, 0,22,23,24, 0],
  [ 0,58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,29, 0,22,23,24, 0, 0, 0,29, 0,17,18,19,20,21],
  [ 0,58, 0, 0, 0, 0, 0,22,23,24, 0, 0, 0, 0, 0, 0,22,23,24, 0, 0, 0, 0, 0, 0,28,17,18,19,20,21, 0, 0,28, 0,12,13,14,15,16],
  [ 0,59, 0, 0, 0, 0,17,18,19,20,21, 0, 0, 0, 0,17,18,19,20,21, 0, 0, 0, 0, 0,27,12,13,14,15,16, 0, 0,27, 0, 7, 8, 9,10,11],
  [ 0, 0, 0, 0, 0, 0,12,13,14,15,16, 0, 0, 0, 0,12,13,14,15,16, 0, 0, 0, 0, 0, 0, 7, 8, 9,10,11, 0, 0, 0, 0, 0, 4, 5, 6, 0],
  [59, 0, 0, 0, 0, 0, 7, 8, 9,10,11, 0, 0, 0, 0, 7, 8, 9,10,11, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0,22,23,24, 0, 0, 0, 0, 0],
  [59,25,26, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0,25,26, 4, 5, 6, 0,22,23,24, 0, 0, 0, 0, 0, 0, 0, 0,17,18,19,20,21, 0, 0, 0, 0],
  [58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,25,26, 0, 0, 0, 0, 0, 0,17,18,19,20,21, 0,25,26, 0, 0, 0, 0,12,13,14,15,16, 0, 0, 0, 0],
  [59,25,26, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0,12,13,14,15,16, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9,10,11, 0, 0, 0, 0],
  [58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9,10,11, 0,55,56,57, 0,25,26, 0, 4, 5, 6, 0, 0, 0, 0, 0],
  [59, 0, 0, 0, 0, 0, 0, 0, 0,22,23,24, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0,54,53,52,51,50, 0, 0, 0, 0, 0, 0, 0,25,26, 0, 0],
  [58, 0, 0, 0, 0, 0, 0, 0,17,18,19,20,21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,45,46,47,48,49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [59, 0, 0, 0, 0, 0, 0, 0,12,13,14,15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,44,43,42,41,40, 0, 0, 0, 0, 0, 0,25,26, 0, 0, 0],
  [58, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9,10,11,55,56,57, 0, 0, 0, 0, 0, 0, 0, 0, 0,37,38,39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [59, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6,54,53,52,51,50, 0, 0,25,26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,25,26, 0, 0,25,26, 0],
  [58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,45,46,47,48,49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [59, 0, 0, 0, 0, 0, 0, 0, 0, 0,25,26,44,43,42,41,40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [58,25,26, 0, 0,25,26, 0, 0, 0, 0, 0, 0,37,38,39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [59,22,23,24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,58],
  [17,18,19,20,21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,58],
  [12,13,14,15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,22,23,24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 7, 8, 9,10,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,18,19,20,21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12,13,14,15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,25,26],
  [58,25,26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9,10,11, 0,25,26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [58,55,56,57, 0, 0, 0, 0, 0,22,23,24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [54,53,52,51,50, 0, 0, 0,17,18,19,20,21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [45,46,47,48,49, 0, 0, 0,12,13,14,15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0,25,26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [44,43,42,41,40, 0, 0, 0, 7, 8, 9,10,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [58,37,38,39,55,56,57, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [59, 0, 0,54,53,52,51,50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [59, 0, 0,45,46,47,48,49, 0, 0,55,56,57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,22,23,24,25,26, 0, 0, 0, 0],
  [58, 0, 0,44,43,42,41,40, 0,54,53,52,51,50, 0,25,26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,18,19,20,21, 0, 0, 0, 0, 0],
  [59, 0, 0, 0,37,38,39, 0, 0,45,46,47,48,49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,25,26, 0,12,13,14,15,16, 0, 0, 0, 0, 0],
  [59, 0, 0, 0, 0, 0, 0, 0, 0,44,43,42,41,40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9,10,11,25,26, 0, 0, 0],
  [59, 0, 0, 0, 0, 0, 0, 0, 0, 0,37,38,39, 0, 0, 0,25,26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0],
  [58,25,26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [59, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,58],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
}

MapStack.prototype.loadImage = function(path){
  this.img = new Image();
  this.img.src = path;
  this.img.addEventListener('load', () => {
    this.loaded = true
  })};

MapStack.prototype.drawMapAll = function(){
  this.drawMapBase(this.img, this.map);
  this.drawMapObjects(this.tileObjects, this.map, this.img);
}


MapStack.prototype.drawMapBase = function () {
  for (let i = this.viewport.startTile[1]; i < this.viewport.endTile[1]; i++) {
    for (let q = this.viewport.startTile[0]; q < this.viewport.endTile[0]; q++) {
      this.ctx.drawImage(this.img, 0 * this.x, 0 * this.y, this.x, this.y,
        this.viewport.offset[0] + this.x * q, this.viewport.offset[1] + this.y * i, this.x, this.y);
    
    }
  }

}

MapStack.prototype.drawMapObjects = function (tileObjects,arr=this.map,img=this.img ) {
  for (let e = 0; e < tileObjects.length; e++) {
    for (let i = this.viewport.startTile[1]; i < this.viewport.endTile[1]; i++) {

      for (let q = this.viewport.startTile[0]; q < this.viewport.endTile[0]; q++) {
        if (arr[i][q] === tileObjects[e].id&&tileObjects[e].id!==0) {
          this.ctx.drawImage(img, tileObjects[e].array[0] * this.x, tileObjects[e].array[1] * this.y,
            this.x, this.y, this.viewport.offset[0] + this.x * q, this.viewport.offset[1] + this.y * i, this.x, this.y);
        }
      }
    }
  }
}

// let unwalkable = tileObjects.filter(func => func.walkable ===false)

//console.log(unwalkable);
// bgImage.addEventListener('load', () => {
//   console.log(bgImage.src);
//   drawMapAll(bgImage, map,tileObjects);
//   drawMapObjects(bgImage,mapUp,tileObjects2)
// })
Game.MapStack = MapStack; 
})()