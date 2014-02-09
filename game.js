var Game = {};
			
    Game.draw = function() {
        this.solSysRender.render( this.solSys);
        
        //this._hoffmanRenderer.render(this._hoffmanNavigation);
        this.canvas.renderAll();
    };
    
    Game.update = function(dt) {
        this.solSys.update(dt);
        //this._hoffmanNavigation.update(dt);
    };
    
    Game.start = function() {
    
        var strat = new VelocityVerlet();
        this.solSys = new SolarSystem(strat);
        
        
        var solStar = this.solSys.addPlanet(
            new Body({radius: 3, x: 0, y:0, vx:0, vy:0, mass: sunsMass, name:"sol", color: 'yellow'})
        );
        
        var v = Math.sqrt(G * sunsMass * 1 / mercuryOrbit);
        
        
        this.solSys.addPlanet(
            new Body({radius: 1, x: mercuryOrbit, y:0, vx:0, vy:v, mass: mercuryMass, name: "mecury", color: 'green'}) // MERCURY
        );
        
        var v = Math.sqrt(G * sunsMass * 1 / venusOrbit);
        
        
        this.solSys.addPlanet(
            new Body({radius: 3, x: venusOrbit, y:0, vx:0, vy:v, mass: venusMass, name: "venus", color: 'brown'}) // venus
        );
        
        var earthV = Math.sqrt(G * sunsMass * 1 / earthsOrbit);
        var earthPlanet = this.solSys.addPlanet(
            new Body({radius: 5, x: earthsOrbit, y:0, vx:0, vy:earthV, mass: earthsMass, name:"earth", color: 'blue'}) // EARTH
        );
        
        
        var moonV =  Math.sqrt(G * earthsMass * 1 / (moonsOrbitAroundEarth)) + earthV;// + (Math.sqrt(G * earthsMass * 1 / (moonsOrbitAroundEarth)));

        //var moonV = 1000.023;// km/s
        var moonPlanet = this.solSys.addPlanet(
            new Body({radius: 2, x: moonsOrbitAroundEarth + earthsOrbit , y:0, vx:0, vy:moonV, mass: moonsMass, name:"moon", color: 'grey'}) // EARTH
        );
        
        
        //Next steps:
        //calculate barycentre of the earth moon system.... http://en.wikipedia.org/wiki/Barycentric_coordinates_(astronomy)

        
        var v = Math.sqrt(G * sunsMass * 1 / marsOrbit);
    
        var marsPlanet = this.solSys.addPlanet(
            new Body({radius: 2, x: marsOrbit, y:0, vx:0, vy: v, mass: marsMass, name:"mars", color: 'red'}) // MARS
        );
        
        var v = Math.sqrt(G * sunsMass * 1 / jupiterOrbit);
    
        var jupiterPlanet = this.solSys.addPlanet(
            new Body({radius: 7, x: jupiterOrbit, y:0, vx:0, vy: v, mass: jupiterMass, name:"jupiter", color: 'orange'}) // MARS
        );
        
        var v = Math.sqrt(G * sunsMass * 1 / saturnOrbit);
    
        this.solSys.addPlanet(
            new Body({radius: 5, x: saturnOrbit, y:0, vx:0, vy: v, mass: saturnMass, name:"saturn", color: 'brown'}) // MARS
        );
        

        this.canvas = new fabric.StaticCanvas('canvas');

        this.camera = new Camera(1, this.canvas, solStar);
                        
        this.solSysRender = new SolarSystemRender(this.canvas, this.camera);
    
    };
    
    Game.fps= 50;

    Game.run = (function() {
        var loops = 0, skipTicks = 1000 / Game.fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime();
        var lastTime = nextGameTick

        return function() {
            loops = 0;
            currentTime = (new Date).getTime();
            
            while ( currentTime > nextGameTick && loops < maxFrameSkip) {
            
                
              dt = currentTime - lastTime;
              lastTime  = currentTime;
             
              Game.update(dt);
              nextGameTick += skipTicks;
              loops++;
            }

            Game.draw();
        }
        
        
        
    })();
    

    