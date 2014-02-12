	var Kepler = {
    
        /**
        * http://en.wikipedia.org/wiki/Mean_anomaly
        * @param {number} mass1
        * @param {number} mass2
        * @param {number} sma length of semi-major axis
        */
        meanAnomaly: function(mass1, mass2, sma, t) {
            var n = Math.sqrt(G * (mass1 * mass2)/Math.pow(sma,3));
            return n * t;
        }
    
    
	}


