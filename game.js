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
            new Body({radius: 3, x: 0, y:0, vx:0, vy:0, mass: SUN_MASS, name:"sol", color: 'yellow'})
        );
        
        
        this.solSys.addPlanet(
            new Body({radius: 1, x: MERCURY_ORBIT, y:0, vx:0, vy: MERCURY_VELOCITY, mass: MERCURY_MASS, name: "mecury", color: 'green'}) // MERCURY
        );
        
        this.solSys.addPlanet(
            new Body({radius: 3, x: VENUS_ORBIT, y:0, vx:0, vy: VENUS_VELOCITY, mass: VENUS_MASS, name: "venus", color: 'brown'}) // venus
        );
        

        var earthPlanet = this.solSys.addPlanet(
            new Body({radius: 5, x: EARTH_ORBIT, y:0, vx:0, vy:EARTH_VELOCITY, mass: EARTH_MASS, name:"earth", color: 'blue'}) // EARTH
        );
        
        var moonPlanet = this.solSys.addPlanet(
            new Body({radius: 2, x: EARTH_ORBIT-MOON_ORBIT , y:0, vx:0, vy:EARTH_VELOCITY- MOON_VELOCITY, mass: MOON_MASS, name:"moon", color: 'grey'}) // EARTH
        );
       

        var marsPlanet = this.solSys.addPlanet(
            new Body({radius: 2, x: MARS_ORBIT, y:0, vx:0, vy: MARS_VELOCITY, mass: MARS_MASS, name:"mars", color: 'red'}) // MARS
        );
        
        var jupiterPlanet = this.solSys.addPlanet(
            new Body({radius: 10, x: JUPITER_ORBIT, y:0, vx:0, vy: JUPITER_VELOCITY, mass: JUPITER_MASS, name:"jupiter", color: 'grey'}) // MARS
        );
        
        var saturnPlanet = this.solSys.addPlanet(
            new Body({radius: 7, x: SATURN_ORBIT, y:0, vx:0, vy: SATURN_VELOCITY, mass: SATURN_MASS, name:"saturn", color: 'orange'}) // MARS
        );
        
        var uranusPlanet = this.solSys.addPlanet(
            new Body({radius: 7, x: URANUS_ORBIT, y:0, vx:0, vy: URANUS_VELOCITY, mass: URANUS_MASS, name:"uranus", color: 'grey'}) // MARS
        );
        
        var neptunePlanet = this.solSys.addPlanet(
            new Body({radius: 7, x: NEPTUNE_ORBIT, y:0, vx:0, vy:  NEPTUNE_VELOCITY, mass: NEPTUNE_MASS, name:"neptune", color: 'blue'}) // MARS
        );
        
        var plutoPlanet = this.solSys.addPlanet(
            new Body({radius: 1, x: PLUTO_ORBIT, y:0, vx:0, vy: PLUTO_VELOCITY, mass: PLUTO_MASS, name:"pluto", color: 'grey'}) // MARS
        );


        this.canvas = new fabric.StaticCanvas('canvas');

        this.camera = new Camera(1, this.canvas, solStar);
                        
        this.solSysRender = new SolarSystemRender(this.canvas, this.camera);
    
    };
    
    Game.fps= 50;
    Game.fixedTimeStep = 30;
    Game.run = (function() {
        var loops = 0, skipTicks = 1000 / Game.fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime();
        var lastTime = nextGameTick

        return function() {
            loops = 0;
            currentTime = (new Date).getTime();
            
            while ( currentTime > nextGameTick && loops < maxFrameSkip) {
            
            
              if(Game.fixedTimeStep) {
                dt = Game.fixedTimeStep;
              } else {
                dt = currentTime - lastTime;
              }

              lastTime  = currentTime;
             
              Game.update(dt);
              nextGameTick += skipTicks;
              loops++;
            }

            Game.draw();
        }
        
        
        
    })();
    

    