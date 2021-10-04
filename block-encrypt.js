// cs-sketch.js; P5 key animation & input fcns.  // CF p5js.org/reference
// Time-stamp: <2021-10-03 07:14:42>

let foo = ["cooper", "is", "awesome"];

function setup() // P5 Setup Fcn
{

}

// break up a long string into smaller segments
// does not modify str arg
// i.e. calling seg_str("computers are amazing", 5) --> ["compute", "rs are ", "amazing"]
function seg_str(str, charLimit)
{
	let strSeg = {};
	let a = 0; //pointer of starting new segment

	for(let c = 0; a < str.length; c++) {
		strSeg[c] = str.substr(a, charLimit);
		a += charLimit; //increment pointer to after limit
	}

	return strSeg;
}


// pads the end of the string to fill charLimit count
// does not modify vec arg
// can use on single strings OR objects (arays)
function pad_text(vec, charLimit)
{
	let pad = ' ';

	if(typeof(vec) == "string") {
		return vec.padEnd(charLimit, pad);
	}

	let cpy = {}
	for(let c = 0; c < vec.length; c++) {
		cpy[c] = vec[c].padEnd(charLimit, pad);
	}
	return cpy;
}

// P5 Frame Re-draw Fcn, Called for Every Frame.
function draw()
{

}
