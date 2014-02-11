	var HoffmanNavigationRenderer =  function(canvas, hoffmanNavigation) {
		this.canvas = canvas;
	}

	HoffmanNavigationRenderer.prototype.render = function(hoffmanNavigation){
	
	
		//to draw the phase angle,
		// draw from sol to planet 
		var starX = (hoffmanNavigation.star.pos.elements[0]/METER_TO_PIXEL) + 500;
		var starY = (hoffmanNavigation.star.pos.elements[1]/METER_TO_PIXEL) + 500;

		//draw a line from starXto s
		var homeX = (hoffmanNavigation.homePlanet.pos.elements[0]/METER_TO_PIXEL)+ 500;
		var homeY = (hoffmanNavigation.homePlanet.pos.elements[1]/METER_TO_PIXEL)+ 500;
		 
		if(!this.starHomeLine) {
			this.starHomeLine = new fabric.Line([ homeX,homeY ], {
				stroke: 'red',
				originX: 'center',
				originY: 'center'
			});
			this.canvas.add(this.starHomeLine);
		} else {
			this.starHomeLine.set({ 'x1': homeX , 'y1': homeY  }); 
			this.starHomeLine.set({ 'x2': starX , 'y2': starY  }); 
		}
		
		
		
		var destinationX = (hoffmanNavigation.destinationPlanet.pos.elements[0]/METER_TO_PIXEL)+ 500;
		var destinationY = (hoffmanNavigation.destinationPlanet.pos.elements[1]/METER_TO_PIXEL)+ 500;

		
		if(!this.starDestinationLine) {
			this.starDestinationLine = new fabric.Line([ homeX,homeY ], {
				stroke: 'green',
				originX: 'center',
				originY: 'center'
			});
			this.canvas.add(this.starDestinationLine);
		} else {
			this.starDestinationLine.set({ 'x1': destinationX , 'y1': destinationY  }); 
			this.starDestinationLine.set({ 'x2': starX , 'y2': starY  }); 
		}
		
		//Math.cos(this.phaseAngle
		
		
		
		var point = this.rotateAround(Vector.create([homeX,homeY]), Vector.create([starX,starY]),hoffmanNavigation.phaseAngle);
		
		if(!this.phaseLine) {
			this.phaseLine = new fabric.Line([ homeX,homeY ], {
				stroke: 'green',
				originX: 'center',
				originY: 'center'
			});
			this.canvas.add(this.phaseLine);
		} else {
			this.phaseLine.set({ 'x1': point.elements[0] , 'y1': point.elements[1]  }); 
			this.phaseLine.set({ 'x2': starX , 'y2': starY  }); 
		}
	
	};
