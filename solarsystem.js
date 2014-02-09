	var SolarSystem = function(strategy) {
				this._planets = [];
				this._ships = [];
				this._bodies = [];
				this._timePassed = 0 ; //in seconds
				this._strategy = strategy;
				this._forces = [];
			};
			
			SolarSystem.prototype = {
			
				update: function(dt) {
					dt = dt * 60; //each millisecond == 1 minute					
					dt = dt * 60; //each millisecond == 1 hr
					this._timePassed+=dt;
					//for (var i in this._bodies) {
					//	if(this._bodies[i].name!="sol") {
					//		this.movePlanet(this._bodies[i], dt);
					//	}
					//}
					var that = this;
					this._strategy.update (this._bodies, dt, function(bodies) {
						return that.setForcesAndAccels(bodies);
					
					}) ;
				},
			
				addPlanet: function(planet) {
					//add a vector to our planet def
					//planet.pos = Vector.create([planet.x,planet.y,0]);
					this._planets.push(planet);
					this._bodies.push(planet);
					
					
					for(var i = 0; i < this._bodies.length; i++){
						this._forces[i] = [];
						this._forces[i][i] = Vector.create([0,0]);
					}

					
					
					return planet;
				},
				
				addShip: function(ship) {
					this._ships.push(ship);
					this._bodies.push(ship);
				},
				
				getPlanets: function() {
					return this._planets;
				},
				
				getShips: function() {
					return this._ships;
				},
				
				//This is a leapFrog algorithm 
				//Currently the moon is well unstable YO!
				//Next implement Velocity Verlot - using //https://phet.unfuddle.com/a#/repositories/23262/file?path=/trunk/simulations-flash/simulations/my-solar-system/src/Model.as&commit=73806
				
				//movePlanet: function (planet, delta) { //delta is the num of milliseconds which have passed between updates
				//	var that = this;
				//	this._strategy.movePlanet(planet,delta, function(planet, updatedx, updatedy, planetMass) {
				//		return that.calculateGravityOnPlanet(planet, updatedx, updatedy, planetMass);
				//	});
					
					
					/*
				
					var dt = delta ; //each millisecond = a second
					
					
					var currentx, currenty, currentvx, currentvu, currentax, currentay, force, dt2 = dt * dt;
					
					currentx = planet.pos.elements[0]; 
					currenty = planet.pos.elements[1];
					
					currentvx = planet.v.elements[0];
					currentvy = planet.v.elements[1];
					
					currentax = planet.acc.elements[0]; 
					currentay = planet.acc.elements[1];
					
					updatedx = currentx + ((currentvx * dt) + (0.5 * currentax * dt2));
					updatedy = currenty + ((currentvy * dt) + (0.5 * currentay * dt2));
					
					//calculate accn based on position..
					force = this.calculateGravityOnPlanet(planet, updatedx, updatedy, planet.mass);
					
					updatedax = (force.elements[0]/planet.mass) ;//* updatedx; 
					updateday = (force.elements[1]/planet.mass) ;//* updatedy;
					
					planet.v.elements[0] = currentvx + (0.5 * (currentax + updatedax) * dt);  
					planet.v.elements[1] = currentvy + (0.5 * (currentay + updateday) * dt);
					
					planet.acc.elements[0] = updatedax;
					planet.acc.elements[1] = updateday;
					
					//draw here?
					
					planet.pos.elements[0] = updatedx;
					planet.pos.elements[1] = updatedy;
						*/		
				//},

				setForcesAndAccels: function (bodies) { //compute current forces and  acceleration of all bodies in system
					//update forces matrix
					//var zeroForce:Vector = new Vector(0,0); 
					//indices i and j start at 0!
					for (var i = 0; i < bodies.length ; i++){
						//this.forces[i][i] = zeroForce;  //diagonal zeroForce forces now set in setN(N)
						for(var j = i+1; j < bodies.length; j++){
							this._forces[i][j] = this.getForce(bodies, i, j);
							this._forces[j][i] = Vector.create([-this._forces[i][j].elements[0], -this._forces[i][j].elements[1]]);
						}
					}
					
					return this._forces;
				},
				
				getForce: function(bodies, i, j) {  //vector force on body 1 from body 2
					var body1 = bodies[i];
					var body2 = bodies[j];
					var GM1M2 = G*body1.mass*body2.mass;
					var delX = body2.pos.elements[0] - body1.pos.elements[0];    //x2 - x1;
					var delY = body2.pos.elements[1] - body1.pos.elements[1];    //y2 - y1;
					var distSq = delX*delX + delY*delY;
					var dist = Math.sqrt(distSq);
					var force = Vector.create([0,0]);
					//var product = GM1M2/(distSq*dist); 
                    var product = GM1M2/(distSq*dist);  
					force.elements[0] = product*delX;
					force.elements[1] = product*delY;
                    
					return force;
				},

/*
				
				calculateGravityOnPlanet: function(planet, planetX,planetY,planetMass) {
					
					updatedPos = Vector.create([planetX,planetY]);
					
					var unitVector;
					var radius;
					var forceScalar;
					var force= Vector.create([0,0]);
					var planets = this._planets;
					//iterate over the planets
					for(var i=0; i<planets.length;i++) {
					
						if(planet!=planets[i]) {
							p = planets[i].pos;
							//p = Vector.create([0,0]);//sol
							//var solMass = sunsMass;
							radius =  updatedPos.distanceFrom(p);
							unitVector =  p.subtract(updatedPos).toUnitVector();
						
						//since were using the other planets old position, could this be cause instabilities
						
						
						
							forceScalar = (G * planets[i].mass * planetMass)/(radius * radius);
							//console.log("forceScalar", forceScalar);
						
							force = force.add(unitVector.multiply(forceScalar));
						}
					}
					
					return force;
				}*/

	
			};