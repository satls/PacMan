function Game(w,h,drawPane){
	var width = w;
	var height = h;
	var canvas = drawPane;
	var context = canvas.getContext('2d');
	var cells = new Array();
	var pacMan;
	var ghosts = new Array();
	var blinky;
	var pinky;
	var inky;
	var clyde;
	var map = "wwwwwwwwwwwwwwwwwwwwwwwwwwww w************ww************w w*wwww*wwwww*ww*wwww*wwwww*w w*wwww*wwwww*ww*wwww*wwwww*w w*wwww*wwwww*ww*wwww*wwwww*w w**************************w w*wwww*ww*wwwwwwww*ww*wwww*w w*wwww*ww*wwwwwwww*ww*wwww*w w******ww****ww****ww******w wwwwww*wwwwwswwswwwww*wwwwww wwwwww*wwwwwswwswwwww*wwwwww wwwwww*wwssssssssssww*wwwwww wwwwww*wwswwwwwwwwsww*wwwwww wwwwww*wwswwwwwwwwsww*wwwwww ssssss*ssswwwwwwwwsss*ssssss wwwwww*wwswwwwwwwwsww*wwwwww wwwwww*wwswwwwwwwwsww*wwwwww wwwwww*wwssssssssssww*wwwwww wwwwww*wwswwwwwwwwsww*wwwwww wwwwww*wwswwwwwwwwsww*wwwwww w************ww************w w*wwwww*wwww*ww*wwwww*wwww*w w*wwwww*wwww*ww*wwwww*wwww*w w***ww*******ss*******ww***w www*ww*ww*wwwwwwww*ww*ww*www www*ww*ww*wwwwwwww*ww*ww*www w******ww****ww****ww******w w*wwwwwwwwww*ww*wwwwwwwwww*w w*wwwwwwwwww*ww*wwwwwwwwww*w w**************************w wwwwwwwwwwwwwwwwwwwwwwwwwwwwe";

	fillMap();

	//fill out the map
	function fillMap(){
		var processing =true;
		var i = 0;
		var j = 0;
		var ix = 0;
		cells[0]=new Array();
		while(processing){
			if(map[i]=='w'){
				cells[j][ix]=new Cell(false, false, true);
			}
			if(map[i]=='*'){
				cells[j][ix]=new Cell(true, true, false); // a passable cell with a nibble
			}
			if(map[i]=='s'){
				cells[j][ix]=new Cell(true, false, false); // a passable cell with a nibble
			}
			if(map[i]==' '){
				cells[j+1]=new Array();
				j++;
				ix=-1;

			}
			if(map[i]=='e'){
				processing=false;
			}
			i++;
			ix++;
		}
	}

	this.scatterGhosts = function(){
		for(var i = 0; i < ghosts.length; i++){
			ghosts[i].scatter();
		}
	}
	this.chaseGhosts = function(){
		for(var i = 0; i < ghosts.length; i++){
			ghosts[i].chase();
		}
	}
	this.frightenGhosts = function(){
		for(var i = 0; i < ghosts.length; i++){
			ghosts[i].frighten();
		}
	}
	this.unfrightenGhosts = function(){
		for(var i = 0; i < ghosts.length; i++){
			ghosts[i].unfrighten();
		}
	}

	//ghost getter functions for targeting and logic
	this.getBlinky = function(){//for inkies targeting
		return blinky;
	}
	this.getPinky = function(){
		return pinky;
	}
	this.getInky = function(){
		return inky;
	}
	this.getClyde = function(){
		return clyde;
	}
	this.getWidth = function(){
		return width;
	}
	this.getHeight = function(){
		return height;
	}
	this.draw = function () {
		context.fillStyle='#000000';
		context.fillRect(0,0,canvas.width, canvas.height);

		//draw the level
		for(var y = 0; y < height; y++){
			for(var x= 0; x < width; x++){
				if(cells[y][x].getPassable()) {
					context.fillStyle='#000000';
					
				}
				if(cells[y][x].getIsWall()) {
					context.fillStyle='#0000FF';
					context.fillRect(x*(canvas.width/width),y*(canvas.height/height),(canvas.width/width),(canvas.height/height));
				}
				if(cells[y][x].getEdible()) {
					context.fillStyle='#FFFF00';
					context.fillRect(x*(canvas.width/width)+2*((canvas.width/width)/5),y*(canvas.width/width)+2*((canvas.width/width)/5),(canvas.width/width)/5,(canvas.width/width)/5);
					if((x==1 && y==3) || (x==1 && y==23) || (x==26 && y==3) || (x==26 && y==23)){
						context.fillRect(x*(canvas.width/width)+((canvas.width/width)/4),y*(canvas.width/width)+((canvas.width/width)/4),(canvas.width/width)/2,(canvas.width/width)/2);
					}
				}

			}
		}
		//draw pacmans body
		context.fillStyle='#FFFF00';
		context.fillRect(pacMan.getX()*(canvas.width/width), pacMan.getY()*(canvas.height/height),(canvas.width/width),(canvas.height/height));
		//TODO: draw pacmans mouth

		for(var i = 0; i < ghosts.length; i++){
			context.fillStyle=ghosts[i].getColor();
			context.fillRect(ghosts[i].getX()*(canvas.width/width), ghosts[i].getY()*(canvas.height/height),(canvas.width/width),(canvas.height/height));
		}
	}
	this.update=function(){
		pacMan.update();
		for(var i = 0; i < ghosts.length; i++){
			ghosts[i].update();
		}
	}
	this.addPacMan = function(x, y){
		pacMan = new PacMan(x,y, this);
	}
	this.inPut=function (key) {
		if(key=='w'){
			pacMan.setDirection(0,-1);
		}
		if(key=='s'){
			pacMan.setDirection(0,1);
		}
		if(key=='a'){
			pacMan.setDirection(-1,0);
		}
		if(key=='d'){
			pacMan.setDirection(1,0);
		}
	}
	this.canWalk=function(x,y){
		if(x<width && x>-1 && y<height && y>-1 && !cells[y][x].getIsWall())return true;
		else return false;
	}
	this.checkCollision = function(x,y){//check to see if pacman and a ghost occupy the same square
		for(var i = 0; i< ghosts.length; i++){
			if(pacMan.getX()==ghosts[i].getX() && pacMan.getY()==ghosts[i].getY()) {
				this.draw();
				this.resetBoard();

				alert("You just got omnomed by a ghost. click ok to continue");

				return true;
			}
		}
		return false;
	}
	this.canTurnInto=function(x,y){
		//ghosts may not turn up at (12,11), (15,11), (12,23), (15,23)
		//ie ghosts may not turn into (12,10), (15,10), (12,22), (15,22)
		var returnVal = true;
		switch(x){
			case 12:
				if(y==10 || y==22)  returnVal=false;
				break;
			case 15:
				if(y==10 || y==22) returnVal=false;
				break;
		}
		return returnVal;
	}
	this.eatCell=function(x,y){
		if(cells[y][x].getEdible())
			cells[y][x].eat();
	}
	this.addGhost=function(x,y){
		blinky = Blinky(x+3,y,this);
		pinky = Pinky(x,y,this);
		inky= Inky(x+1,y,this);
		clyde = Clyde(x+2,y,this);
		ghosts.push(blinky);
		ghosts.push(pinky);
		ghosts.push(inky);
		ghosts.push(clyde);
	}
	this.getPacMan = function(){
		return pacMan;
	}
	this.resetBoard = function(){
		this.scatterGhosts();
		blinky.setPos(14,11);
		pinky.setPos(13,14);
		inky.setPos(14,14);
		clyde.setPos(15,14);

		blinky.resetV();
		pinky.resetV();
		inky.resetV();
		clyde.resetV();

		pacMan.setPos(14,23);
		pacMan.resetV();

		
	}
}