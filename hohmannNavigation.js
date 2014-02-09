//http://ksp.olex.biz/
//http://forum.kerbalspaceprogram.com/threads/16511-Tutorial-Interplanetary-How-To-Guide
		

var HoffmanNavigation =  function(star, homePlanet, destinationPlanet, ship) {
	this.star = star;
	this.homePlanet = homePlanet;
	this.destinationPlanet = destinationPlanet;
	this.phaseAngle = this.calculatePhaseAngle();
	
	
}

HoffmanNavigation.prototype= {
	//planetary phase angle
	//This is the angle your destination planet or moon needs to be in front or behind your origin along its orbit.
	calculatePhaseAngle: function() {
		var r1 = Math.sqrt(Math.pow(this.homePlanet.pos.elements[0],2) + Math.pow(this.homePlanet.pos.elements[1],2));
		var r2 = Math.sqrt(Math.pow(this.destinationPlanet.pos.elements[0],2) + Math.pow(this.destinationPlanet.pos.elements[1],2));
		var r = (r1+r2)/(2*r2);
		return 180 * (1-Math.pow(r,1.5));
	},
	
	update: function(dt) {
	
	}
}