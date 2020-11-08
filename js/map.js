(function(){
const MapStack = function (path,tileObjects,map,tileObjectsUp,mapUp){
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


  this.tileObjects = tileObjects;
  
  //нижная карта тайлов
this.map = map;

//верхнаяя карта тайлов
this.tileObjectsUp = tileObjectsUp;
this.mapUp = mapUp;
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
  const tileObjectLenght = tileObjects.length;
  for (let e = 0; e < tileObjectLenght; e++) {
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