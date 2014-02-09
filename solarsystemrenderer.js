	var SolarSystemRender = function(canvas, camera, scale) {
				this.canvas = canvas;
				this.width = this.canvas.width;
				this.height = this.canvas.height;
				this.scale = scale; 
				this.planetObjectCache = {};
				this.camera = camera;
			};
			
			SolarSystemRender.prototype = {
			
				getCoordinates: function(pos) {
					pos.x= pos.x/METER_TO_PIXEL;
					pos.y =pos.y/METER_TO_PIXEL;
					return pos;
				},
			
				render: function(solarSystem) {
					this.canvas.renderOnAddRemove = false;
					var planets = solarSystem.getPlanets();
					for(var i=0; i<planets.length;i++) {
						this.drawPlanet(planets[i]);
					}
					
					var ships = solarSystem.getShips();
					for(var i=0; i<ships.length;i++) {
						this.drawShip(ships[i]);
					}
					
					
					this.drawTime(solarSystem);
					
				},
				
				drawTime: function(solarSystem) {
					if(!this._timePassedText) {
						this._timePassedText = new fabric.Text(solarSystem._timePassed.toString(),{fontSize: 30});
						this.canvas.add(this._timePassedText);
					} else {
						this._timePassedText.set({'text': (solarSystem._timePassed/60/60/24/365).toString() + "years passed"}); //dont understand this number 4
					}
				},
				
				drawShip: function(ship) {
					var radius = 2;
					var circle;
					var coords = this.getCoordinates({x:ship.getX(),y:ship.getY()});
					
					if(this.planetObjectCache[ship.name]){
						
						circle = this.planetObjectCache[ship.name];
						circle.set('left', coords.x - radius + (this.canvas.width/2) + this.camera.getOffsetX());
						circle.set('top', coords.y - radius + (this.canvas.height/2) + this.camera.getOffsetY());
					
					} else {
						//console.log(planet.name);
						var circle = new fabric.Circle({
							radius: radius, fill: 'red', left: coords.x - radius, top: coords.y -radius
						});
						this.planetObjectCache[ship.name] = circle;
						this.canvas.add(circle);
					}
				
				},
				
				drawPlanet: function(planet) {
					var radius = planet.radius;
					var circle;
					var coords = this.getCoordinates({x:planet.getX(),y:planet.getY()});
					
					if(this.planetObjectCache[planet.name]){
						//console.log(planet.name);
						circle = this.planetObjectCache[planet.name];
						circle.set('left', coords.x - radius + (this.canvas.width/2) + this.camera.getOffsetX());
						circle.set('top', coords.y - radius + (this.canvas.height/2) + this.camera.getOffsetY());
					
					} else {
					
						var circle = new fabric.Circle({
							radius: planet.radius, fill: planet.color, left: coords.x - radius, top: coords.y -radius
						});
                        circle.set('left', coords.x - radius + (this.canvas.width/2) + this.camera.getOffsetX());
						circle.set('top', coords.y - radius + (this.canvas.height/2) + this.camera.getOffsetY());
				
						this.planetObjectCache[planet.name] = circle;
						this.canvas.add(circle);
					}
				}
				
			};
			