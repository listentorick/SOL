var Body = function(c) {
				this.name = c.name;
				this.pos = Vector.create([c.x,c.y]);
				this.acc = Vector.create([0,0]);
				this.v = Vector.create([c.vx,c.vy]);
				this.mass = c.mass;
				this.radius = c.radius;
				this.color = c.color;
			}

			Body.prototype = {
				
				getX: function() {
					return this.pos.elements[0];
				},
				
				getY: function() {
					return this.pos.elements[1];
				}
			
			}