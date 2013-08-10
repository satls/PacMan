function Cell(canPass, hasNibble, block) {
	var edible = hasNibble;
	var passable = canPass;
	var isWall = block;
	this.getEdible = function() {
		return edible;
	}
	this.getPassable=function() {
		return passable;
	}
	this.getIsWall=function() {
		return isWall;
	}
	this.eat=function(){
		if(edible){
			edible=false;
			return true;
		}
	}
}