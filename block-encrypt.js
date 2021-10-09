// cs-sketch.js; P5 key animation & input fcns.  // CF p5js.org/reference
// Time-stamp: <2021-10-08 20:57:55 cooper>

let debug_on = true;

let plaintext;
let password;
let encryptBtn;

let showEncrypt;

function setup() // P5 Setup Fcn
{
	createCanvas(windowWidth - 20, displayHeight - 200);
	background(255);

	userDialog(150, 50, 200, 15);
    showEncrypt = createP("");
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

function encrypt(plain, len) {
	let str = "";

	let msg32 = seg_str(plain, 27);
	for(let c=1; c < Object.keys(msg32).length; c++) {
		str += encrypt(msg32[c], len);
	}

	let padInput = pad_text(msg32[0], 27);

	let segInput = seg_str(padInput, 7);

	let segBlocks = Object.keys(segInput).length;
	for(block in segInput) {
		segInput[block] = (int(block) + 1) + segInput[block];

		if((segBlocks - 1) == block) {
			if(debug_on) console.log("The length of the plaintext is: " + len)
			segInput[block] += String.fromCharCode(len);
		}
	}
	return merge_seg(segInput) + str;
}

function decrypt(cipher) {
	let blocksOf = 8;
	let msg32 = seg_str(cipher, 32);
	let str = "";
	for(let c=1; c < Object.keys(msg32).length; c++) {
		str += decrypt(msg32[c]);
	}

	let segInput = seg_str(msg32[0], blocksOf);
	let length;

	let segBlocks = Object.keys(segInput).length;
	for(block in segInput) {
		if(int(segInput[block][0]) != ((block % 4) + 1)) {
			return "Sequence mismatch at block " + int(block + 1);
		}
		
		segInput[block] = segInput[block].slice(1);

		if((segBlocks - 1) == block) {
			length = segInput[block].charCodeAt(blocksOf - 2);
			if(debug_on) console.log("Length found from the cipher text: " + length);
		}
	}

	str = merge_seg(segInput).slice(0, 27) + str;
	return str.slice(0, length);
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
