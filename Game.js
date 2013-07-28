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
	var map = "wwwwwwwwwwwwwwwwwwwwwwwwwwww w************ww************w w*wwww*wwwww*ww*wwww*wwwww*w w*wwww*wwwww*ww*wwww*wwwww*w w*wwww*wwwww*ww*wwww*wwwww*w w**************************w w*wwww*ww*wwwwwwww*ww*wwww*w w*wwww*ww*wwwwwwww*ww*wwww*w w******ww****ww****ww******w wwwwww*wwwwwswwswwwww*wwwwww wwwwww*wwwwwswwswwwww*wwwwww wwwwww*wwssssssssssww*wwwwww wwwwww*wwswwwwwwwwsww*wwwwww wwwwww*wwswwwwwwwwsww*wwwwww sssssw*ssswwwwwwwwsss*wsssss wwwwww*wwswwwwwwwwsww*wwwwww wwwwww*wwswwwwwwwwsww*wwwwww wwwwww*wwssssssssssww*wwwwww wwwwww*wwswwwwwwwwsww*wwwwww wwwwww*wwswwwwwwwwsww*wwwwww w************ww************w w*wwwww*wwww*ww*wwwww*wwww*w w*wwwww*wwww*ww*wwwww*wwww*w w***ww*******ss*******ww***w www*ww*ww*wwwwwwww*ww*ww*www www*ww*ww*wwwwwwww*ww*ww*www w******ww****ww****ww******w w*wwwwwwwwww*ww*wwwwwwwwww*w w*wwwwwwwwww*ww*wwwwwwwwww*w w**************************w wwwwwwwwwwwwwwwwwwwwwwwwwwwwe";

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
		//alert(map[i]);
		i++;
		ix++;
	}
	//remember kids: create your 2d arrays for the order you want to address them! 
	// for(var y = 0; y < height; y++){
	// 	cells[y]=new Array();
	// 	for(var x = 0; x < width; x++){
	// 		cells[y][x]=new Cell(true, true, false); // a passable cell with a nibble
	// 		// if(y%2==1){
	// 		// 	cells[y][x]=new Cell(true, true, false); // a passable cell with a nibble
	// 		// }else if(x%2==1){
	// 		// 	cells[y][x]=new Cell(true, true, false); // a passable cell with a nibble
	// 		// }else{
	// 		// 	cells[y][x]=new Cell(false, false, true); // a passable cell with a nibble
	// 		// }
	// 		 if(x==0 || x == width-1){
	// 			cells[y][x]=new Cell(false, false, true); // a wall
	// 		}
	// 		if(y==0 || y == height-1){
	// 			cells[y][x]=new Cell(false, false, true); // a wall
	// 		}
	// 	}
	// }
	this.getBlinky = function(){//for inkies targeting
		return blinky;
	}
	this.getPinky = function(){//for inkies targeting
		return pinky;
	}
	this.getInky = function(){//for inkies targeting
		return inky;
	}
	this.getClyde = function(){//for inkies targeting
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
					context.fillRect(x*(canvas.width/width)+(canvas.width/width)/3,y*(canvas.width/width)+(canvas.width/width)/3,(canvas.width/width)/3,(canvas.width/width)/3);
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
		//alert(key);
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
		if(!cells[y][x].getIsWall())return true;
	}
	this.eatCell=function(x,y){
		if(cells[y][x].getEdible())
			cells[y][x].eat();
	}
	this.addGhost=function(x,y){
		//ghosts.push(new Ghost(x,y,color, this));
		
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
}