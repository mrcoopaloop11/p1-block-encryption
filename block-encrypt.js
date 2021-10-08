// cs-sketch.js; P5 key animation & input fcns.  // CF p5js.org/reference
// Time-stamp: <2021-10-07 20:30:06 cooper>

let debug_on = true;
let userInput;

let width;
let height;
let half_wid;
let half_hgt;


function setup() // P5 Setup Fcn
{
	width = windowWidth;
	height = windowHeight;
	half_wid = (width / 2);
	half_hgt = (height / 2);

	createCanvas(width, height);
	
	let input_pad = 15;
	let size = 200;
    // Setup input-box for input and a callback fcn when button is pressed.
    userInput = createInput(); // Create an input box, editable.
    userInput.position(half_wid - (size / 2), half_hgt - input_pad); // Put box on page.
	userInput.size(size);
    userButton = createButton( "Encrypt" ); // Create button to help get input data.
    userButton.position(half_wid - (size / 2), half_hgt + input_pad); // Put button on page.
	userButton.size(size);
	userButton.mousePressed(showEncrypt);	
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
	let pad = '0';

	if(typeof(vec) == "string") {
		return vec.padEnd(charLimit, pad);
	}

	let cpy = {}
	for(let c = 0; c < vec.length; c++) {
		cpy[c] = vec[c].padEnd(charLimit, pad);
	}
	return cpy;
}

// return true if all chars in str in printable 8bit ascii range
function in_ascii_range(str) {
	for (let i = 0; i < str.length; i++) {
		let c = str.charCodeAt(i);
		
		if ( !(c >= 32 && c <= 127) ) {
			return false;
		}
	}
	return true;
}

//verifies if password passes comp8 requirements, Boolean return
function comp8(str) {
	const len_req = 8;
	if (str.length != len_req) { 
		if (debug_on) {
			console.log("Password len " + str.length + " != " + len_req);
		}
		return false;
	}
	
	let has_upper = false, has_lower = false, has_symbol = false, has_number = false;
	
	for (let i = 0; i < str.length; i++) {
		let c = str.charCodeAt(i);
		
		if (c >= 48 && c <= 57) {
			has_number = true;
		}
		else if (c >= 65 && c <= 90) {
			has_upper = true;
		}
		else if (c >= 97 && c <= 122) {
			has_lower = true;
		}
		// the rest in this range are symbols
		else if (c >= 32 && c <= 127) {
			has_symbol = true;
		}
	}
	
	if (has_upper && has_lower && has_symbol && has_number ) {
		if (debug_on) { console.log("Password is valid comprehensive8."); }
		return true;
	}
	if (debug_on) { console.log("Password is not valid comprehensive8."); }
	return false;
}

// returns a string of text encrypted with password
function xor_chars(text, pass) {
	let text_enc = "";
	for(let i = 0; i < text.length; i++) {
		let tx = text.charCodeAt(i) - 32;
		let px = pass.charCodeAt(i % pass.length) - 32;
		text_enc += String.fromCharCode((tx ^ px) + 32);
	}
	return text_enc;
	
}

function showEncrypt() {
	background(0);
	textSize(32);
	fill(255,255,255)
	let input = userInput.value();
	text(input, 10, 50);

	text("Does this text pass the comp8 test?: " + comp8(input), 10, 100);

	let padInput = pad_text(input, 27)
	text(padInput, 10, 150);

	let inputArray = seg_str(padInput, 4);
	for(block in inputArray) {
		text(inputArray[block], 10, 200 + (block * 50));
	}
}


// P5 Frame Re-draw Fcn, Called for Every Frame.
function draw()
{
	
}
