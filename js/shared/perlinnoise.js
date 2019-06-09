// Linear interpolation

var Perlin = {
	
	PRNG_SEED : 0, // initial seed
	PRNG_PRIME : 0, // a big prime number for %
	
	// Perlin field gradient
	Gradient : [],

	lerp : function ( a0,  a1,  w) {
		return a0 + w*(a1 - a0); // equivalent to : (1.0 - w)*a0 + w*a1
	},
	
	/*//Math.Random gradient generator -> generates "blocky" grid
	var x,y;
	for ( x = 0; x <  1024; x++ ) {
		this.Gradient[x] = [];
		for ( y = 0; y < 1024; y++ ){
			this.Gradient[x][y] = [];
			this.Gradient[x][y][0] = Math.random(-1,1);
			this.Gradient[x][y][1] = Math.random(-1,1);
		}
	} 
	*/
	generateGradient : function() {
		let x,y;
		for ( x = 0; x <  1024; x++ ) {
			this.Gradient[x] = [];
			for ( y = 0; y < 1024; y++ ){
				this.Gradient[x][y] = [];
				this.Gradient[x][y][0] = this.hashing_PRNG();
				this.Gradient[x][y][1] = this.hashing_PRNG();
			}
		}
	},
	
	setSeed : function( seed ) {
		this.PRNG_SEED = seed;
		this.PRNG_PRIME = 48611;
		this.generateGradient();
	},

	hashing_PRNG : function (){
		this.PRNG_SEED *= 65541; // random multiplier
		this.PRNG_SEED = this.PRNG_SEED % this.PRNG_PRIME;
		return 1-2*this.PRNG_SEED/this.PRNG_PRIME; // generates values between -1, 1
	},

	// Computes the dot product of the distance and gradient vectors.
	dotGridGradient : function ( ix,  iy,  x,  y) {
		// Compute the distance vector
		let dx = x - ix;
		let dy = y - iy;

		// Compute the dot-product
		return (dx*this.Gradient[iy][ix][0] + dy*this.Gradient[iy][ix][1]);
	},

	// S-curve to get a smooth image
	fade : function (t) {
		return t*t*t*(t*(t*6-15)+10); // as described by Ken Perlin
	},

	// Compute Perlin noise at coordinates x, y
	perlin : function ( x, y) {

		// Determine grid cell coordinates
		let x0 = Math.floor(x);
		let x1 = x0 + 1;
		let y0 = Math.floor(y);
		let y1 = y0 + 1;

		// Determine interpolation weights, using S-curve to create smooth interpolation
		let sx = this.fade(x - x0);
		let sy = this.fade(y - y0);

		// Interpolate between grid point gradients
		let n0, n1, ix0, ix1, val;
		n0 = this.dotGridGradient(x0, y0, x, y);
		n1 = this.dotGridGradient(x1, y0, x, y);
		ix0 = this.lerp(n0, n1, sx);
		n0 = this.dotGridGradient(x0, y1, x, y);
		n1 = this.dotGridGradient(x1, y1, x, y);
		ix1 = this.lerp(n0, n1, sx);
		val = this.lerp(ix0, ix1, sy);

		return (val+1)/2;
	},

	OctavePerlin : function ( x, y, octaves, persistence) {
		let total = 0;
		let frequency = 1;
		let amplitude = 1;
		let maxValue = 0;  // Used for normalizing result to 0.0 - 1.0
		for( let i=0;i<octaves;i++) {
			total += this.perlin(x * frequency, y * frequency ) * amplitude;
			maxValue += amplitude;
			amplitude *= persistence;
			frequency *= 2;
		}
		
		return total/maxValue;
	}
};

// shared code hotfix
var module = module;
if ( typeof module == "object" ){
module.exports = Perlin;
}