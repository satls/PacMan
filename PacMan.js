function PacMan(startX, startY, b){
	var board = b;
	var posX = startX;
	var posY = startY;
	var vX = 0;
	var vY = 0;
	var nextVX = 0;
	var nextVY = 0;

	this.resetV = function(){
		vX=0;
		vY=0;
	}
	this.getX=function(){
		return posX;
	}
	this.getY=function(){
		return posY;
	}
	this.getVX=function(){
		return vX;
	}
	this.getVY=function(){
		return vY;
	}
	this.setPos=function(x,y){
		posX = x;
		posY = y;
	}
	this.setDirection=function(xDir, yDir) {
		if(xDir<0){ nextVX = -1; nextVY = 0;}
		if(xDir>0){ nextVX = 1; nextVY = 0;}
		if(yDir<0){ nextVX = 0; nextVY = -1;}
		if(yDir>0){ nextVX = 0; nextVY = 1;}
	}
	this.update=function(){
		if(nextVX!=vX || nextVY!=vY){//check if user has tried to turn
			if(board.canWalk(posX+nextVX, posY+nextVY)){
				vX=nextVX;
				vY=nextVY;
			}
		}
		if(!board.canWalk(posX+vX, posY+vY)){
			//if corner, then check if only one option, then take that option
			var numChoice = 0;
			var nVX = 0;
			var nVY=0;

			for(var i = -1; i < 2; i++){
				if(board.canWalk(posX+i, posY) && i!=0 && i!=-vX){
					nVX=i;
					nVY=0;
					numChoice++;
				}
				if(board.canWalk(posX, posY+i) && i!=0 && i!=-vY){
					nVX=0;
					nVY=i;
					numChoice++;
				}
				
			}
			if(numChoice==1){
				vX=nVX;
				vY=nVY;
				nextVX=vX;
				nextVY=vY;
			}
			else{
				vX=0;
				vY=0;
				nextVX=vX;
				nextVY=vY;
			}
		}
		if(board.canWalk(posX+vX, posY+vY)){
			posX+=vX;
			posY+=vY;
			board.eatCell(posX, posY);
			if((posX==1 && posY==3) || (posX==1 && posY==23) || (posX==26 && posY==3) || (posX==26 && posY==23)){
				//energize
				board.energize();
			}
		}
		//teleport
		switch(posX){
			case 0:
				this.setPos(27, posY);
				break;
			case 27:
				this.setPos(0, posY)
				break;
		}
		board.checkCollision(posX, posY);
	}
}