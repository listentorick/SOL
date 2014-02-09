			var Camera = function(zoom,  canvas, planet) {
				this.zoom = zoom;
				this.planet = planet;
				this.canvas = canvas;
			}	

			Camera.prototype.getScaleFactor = function() {
				return 1;
			};
			
			Camera.prototype.getOffsetX = function() {
			
				var x = this.planet.pos.elements[0]/METER_TO_PIXEL;
			
				return - x;
			}
			
			Camera.prototype.getOffsetY = function() {
				var y = this.planet.pos.elements[1]/METER_TO_PIXEL;
			
				return  - y;
			}