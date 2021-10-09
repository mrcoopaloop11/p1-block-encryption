// cs-sketch.js; P5 key animation & input fcns.  // CF p5js.org/reference
// Time-stamp: <2021-10-07 20:30:06 cooper>

let debug_on = true;

let plaintext;
let password;
let encryptBtn;

let showEncrypt;

function setup() // P5 Setup Fcn
{
	createCanvas(windowWidth - 20, displayHeight - 200);
	background(255);

	userDialog(width / 2, 50, 200, 15);
    showEncrypt = createDiv("");
	encryptBtn.mousePressed(showStatus);
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

function merge_seg(vec) {
	let complete = "";
	for(block in vec) {
		complete += vec[block];
	}
	return complete;
}

function encrpyt() {
	let plain = plaintext.value();
	let pass = password.value();

	if(debug_on) {
		console.log("Plaintext: " + plain);
		console.log("Password: " + pass);
	}

	if(comp8(pass)) {
		let pTextLength = pass.length;
		let padInput = pad_text(pass, 27);

		let segInput = seg_str(padInput, 4);

		let segBlocks = Object.keys(segInput).length;
		for(block in segInput) {
			segInput[block] = block + segInput[block];

			if((segBlocks - 1) == block) {
				segInput[block] += String.fromCharCode(pTextLength);
			}
		}
		return xor_chars(plain, merge_seg(segInput));
	}
	return "Invalid Password";
}

function keyPressed() {
	if(key == "Enter") {
		showStatus();
	}
}

// P5 Frame Re-draw Fcn, Called for Every Frame.
function draw()
{

}
