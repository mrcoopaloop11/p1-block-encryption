// cs-sketch.js; P5 key animation & input fcns.  // CF p5js.org/reference
// Time-stamp: <2021-10-08 20:57:55 cooper>

let debug_on = true;

// Make global g_canvas JS 'object': a key-value 'dictionary'.
const g_canvas = { cell_size:20, wid:40.015, hgt:3.78 }; 
const g_sz = g_canvas.cell_size;
const g_width = g_sz * g_canvas.wid; // Our 'canvas' uses cells of given size, not 1x1 pixels.
const g_height = g_sz * g_canvas.hgt;

const g_seg_size = 7;
const g_pt_max = 27;

var g_plaintext_div; 
var g_plaintext_label; 
var g_plaintext; 
var g_error_pt; 

var g_password_div; 
var g_password_label; 
var g_password;
var g_password_but;
var g_error_comp8; 


var plaintext = ''; //value of string since last button press
var password = ''; //same for password
var padded = ''; 
var chunked = ''; 
var encrypted = ''; 
var decrypted = ''; 

var valid_pt = false;
var valid_pass = false;

// P5 Setup Fcn
function setup() {

    // Setup input-box for input and a callback fcn when button is pressed.
	var g_header = createElement('h3', "Encrypt and Decrype string with password");

	//plaintext container, label, and box`
	g_plaintext_div = createP();
    g_plaintext_label = createSpan("Plaintext string: ");
    g_plaintext = createInput(); // Create an input box, editable.
    g_plaintext.input(update); 

	//put them in container rather than absolute positioning
	g_plaintext_label.parent(g_plaintext_div);
	g_plaintext.parent(g_plaintext_div);

	//error label that dissapears when plaintext input meets reqs.
    g_error_pt = createP( "Max 27 chars, all in printable ASCII range." );
	g_error_pt.style('color', 'red');
	g_error_pt.style('font-size', '14px');


	//password container, label, and box`
	g_password_div = createP();
    g_password_label = createSpan( " Comp8 Password: ");
    g_password = createInput();
    g_password.input(update); 

	g_password_but = createButton("Submit");
	g_password_but.input(update);

	//put them in container rather than absolute positioning
	g_password_label.parent(g_password_div);
	g_password.parent(g_password_div);
	g_password_but.parent(g_password_div);


	//error label that dissapears when password meets reqs.
    g_error_comp8 = createP( "Must be 8 chars and contain >= 1 uppercase, lowercase, number, and symbol." ); 
	g_error_comp8.style('color', 'red');
	g_error_comp8.style('font-size', '14px');


	// Make a P5 canvas.
    createCanvas( g_width, g_height );  
	background(255);
	
	update();
}

// P5 Frame Re-draw Fcn, Called for Every Frame.
function draw() {

}

function update() {
 	// Get data from Input boxes
    plaintext = g_plaintext.value();
	password = g_password.value();
    if (debug_on) {
		console.log( "plaintext: " + plaintext);
		console.log( "password: " + password);
	}

	// check for valid inputs
	valid_pt = ((0 < plaintext.length) && (plaintext.length <= g_pt_max) && in_ascii_range(plaintext));
	valid_pass = comp8(password);

	update_tooltips();

	if (valid_pt && valid_pass) {
		padded = pad_text(plaintext, g_pt_max) + String.fromCharCode(plaintext.length + 32);
		chunked = seg_str(padded, g_seg_size);
		encrypted = encrypt(chunked, password);
		decrypted = encrypt(encrypted, password);
	}
	update_grid();
}

function encrypt(vec, pass) {
	let enc_vec = []
	for (v in vec) {
		enc_vec.push(xor_chars(vec[v],pass));
	}
	return enc_vec;
}

// reset and fill out grid
function update_grid() {
	clear();
	background(255);
    draw_grid( 25, 8, 'black');
	if (valid_pt && valid_pass) {
		textSize(g_canvas.cell_size);
		textFont('Courier New');
		print_chunks(chunked, g_sz - 1);
		print_chunks(encrypted, 2 * g_sz + 4);
		print_chunks(decrypted, 3 * g_sz + 9);
	}
}

// prints one row of chunked strings into grid
function print_chunks(vec, v_offset) {
	let l = 7; // x offset, this put text near center of boxes
	//print chunk at time, box per letter, first letter in chunk red
	for (let i = 0; i < vec.length; i++) {
		fill('red');
		for (let c = 0; c < vec[i].length; c++) {
			text(vec[i][c], l, v_offset);
			if (c == 0 ) {
				fill('black');
			}
			l += 25;
		}
	}
}

// hide or unhide the error message tooltips based on input validity 
function update_tooltips() {
	if (valid_pt) {
		g_error_pt.style('visibility', 'hidden');
	}
	else {
		g_error_pt.style('visibility', 'visible');
	}
	if (valid_pass) {
		g_error_comp8.style('visibility', 'hidden');
	}
	else {
		g_error_comp8.style('visibility', 'visible');
	}
}

// break up a long string into smaller segments
// does not modify str arg
// i.e. calling seg_str("computers are amazing000000", 5) --> ["1compute", "2rs are ", "3amazing", "4000000"]
function seg_str(str, seg_size) {
	let strSeg = [];

	let a = 0; //pointer of starting new segment

	for(let c = 1; a <= str.length; c++) {
		strSeg.push("" + c + str.substr(a, seg_size));
		a += seg_size; //increment pointer to after limit
	}
	return strSeg;
}

// pads the end of the string to fill charLimit count
// does not modify vec arg
// can use on single strings OR objects (arays)
function pad_text(vec, charLimit, pad = '0')
{
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

// returns a string of text encoded with password
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