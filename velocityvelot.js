	var VelocityVerlet = function() {
	};
	
	

			
	VelocityVerlet.prototype.update = function (bodies, dt, calculateForces) { //delta is the num of milliseconds which have passed between updates
		
		var body;
		var pos;
		var acc;
		var vel;
		var accCopy;
		for(var i=0; i< bodies.length;i++ ){
		
			body = bodies[i];
			pos = body.pos;
			vel = body.v;
			acc = body.acc;
			accCopy = acc.dup();
			
			pos.elements[0] = pos.elements[0] + vel.elements[0]*dt + (0.5)*acc.elements[0]*dt*dt;
            pos.elements[1] = pos.elements[1] + vel.elements[1]*dt + (0.5)*acc.elements[1]*dt*dt;
			body.preAcc = accCopy;
			
		}

		var forces = calculateForces(bodies);
		
		
		 //update accelerations of bodies
        for (var n = 0; n < bodies.length; n++){
            bodies[n].acc.elements[0] = 0;
            bodies[n].acc.elements[1] = 0;
            var massN = bodies[n].mass;
            
           
            
            for (var m = 0; m < bodies.length; m++){
                bodies[n].acc.elements[0] += forces[n][m].elements[0]/massN;
                bodies[n].acc.elements[1] += forces[n][m].elements[1]/massN;       
            }
        }
		
		var preAcc;
		for(var i=0; i< bodies.length;i++ ){
		
			body = bodies[i];
			vel = body.v;
			acc = body.acc;
			preAcc = body.preAcc;
			
			vel.elements[0] = vel.elements[0] + (0.5)*(acc.elements[0] + preAcc.elements[0])*dt;
            vel.elements[1] = vel.elements[1] + (0.5)*(acc.elements[1] + preAcc.elements[1])*dt;
           
			
		}
        
		

					
	}
	