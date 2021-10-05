// cs-sketch.js; P5 key animation & input fcns.  // CF p5js.org/reference
// Time-stamp: <2021-10-03 07:14:42>

let foo = ["cooper", "is", "awesome"];
let debug_on = True;

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

//verifies if password passes comp8 requirements, Boolean return
function comp8(str) {
	const len_req = 8;
	if (str.length != len_req) { 
		if (debug_on) {
			console.log("Password len " + str.length = " != " + len_req);
		}
		return False;
	}
	
	let has_upper = False, has_lower = False, has_symbol = False, has_number = False;
	
	for (let i = 0; i < str.length; i++) {
		let c = str.charCodeAt(i);
		
		if (c >= 48 && c <= 57) {
			has_number = True;
		}
		else if (c >= 65 && c <= 90) {
			has_upper = True;
		}
		else if (c >= 97 && c <= 122) {
			has_lower = True;
		}
		// the rest in this range are symbols
		else if (c >= 32 && c <= 127) {
			has_symbol = True;
		}
	}
	
	if (has_upper && has_lower && has_symbol && has_number ) {
		if (debug_on) { console.log("Password is valid comprehensive8."); }
		return True;
	}
	if (debug_on) { console.log("Password is not valid comprehensive8."); }
	return False;
}



// P5 Frame Re-draw Fcn, Called for Every Frame.
function draw()
{

}
