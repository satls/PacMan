function Ghost(startX, startY, col, b){
	var color = col;
	var posX = startX;
	var posY = startY;
	var vX = -1; //initial ghost direction is left
	var vY=0;
	var board = b;
	var pacMan = board.getPacMan();
	var homeX = -1;
	var homeY = -1;
	var graveYardX = 0;
	var graveYardY = 0;

	var chase=true;
	var dead=false;

	var targetX;
	var targetY;

	this.getX=function(){
		return posX;
	}
	this.getY=function(){
		return posY;
	}
	this.getColor=function(){
		return color;
	}

	this.update=function(){

		//update target cell

		//blinky: target pacman
		if(color == '#FF0000'){
			targetX = pacMan.getX();
			targetY = pacMan.getY();
		}

		if(chase){
			targetX = homeX;
			targetY = homeY;
		}
		//set next direction
		//check all four directions
		//cannot move backwards ie next v != -v

		var bestVX = 0;
		var bestVY = 0;
		var bestD = 99999;

		
		for(var i = -1; i < 2; i++){//check left and right
			if(i!= -vX && i!=0 && board.canWalk(posX+i, posY)){
				var thisD = Math.sqrt( Math.pow(targetX - (posX+i),2) + Math.pow((targetY - posY),2));

				if(thisD<bestD) {
					bestD = thisD;
					bestVX = i;
					bestVY = 0;
				}
			}
		}

		for(var i = -1; i < 2; i++){//check up and down
			if(i!= -vY && i!=0 &&board.canWalk(posX, posY+i)){
				//alert(i);
				var thisD = Math.sqrt( Math.pow((targetX - posX),2) + Math.pow(targetY - (posY +i),2));
				if(thisD<bestD) {
					bestD = thisD;
					bestVX = 0;
					bestVY = i;
				}
			}
		}
		

		if(bestVX!=0){
			vX=bestVX;
			vY=0;
		}
		if(bestVY!=0){
			vX=0;
			vY=bestVY;
		}
		//alert(bestVX + " " +vX+ " " + bestVY + " " + vY + " best d" + bestD);
		//vX=bestVX;
		//vY=bestVY;
		//update pos
		if(board.canWalk(posX+vX, posY+vY)){
			posX+=vX;
			posY+=vY;
		}
		
	}

	//ghosts can turn left or right but not reverse without a special call.
	//TODO: implement special cell that a ghost may not turn into but may pass over normally

}