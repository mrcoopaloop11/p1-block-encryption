// Draw stuff, with P5  // CF p5js.org/reference
// Time-stamp: <2021-10-08 20:58:05 cooper>
// ------------------------------------------------------------



function userDialog(x, y, s, p) {
    let titlePad = 100;

    // Setup input-box for input and a callback fcn when button is pressed.
    plaintext = createInput(); // Create an input box, editable.
    plaintext.position(x, y); // Put box on page.
	plaintext.size(s);

    password = createInput(); // Create an input box, editable.
    password.position(x, y + (2 * p)); // Put box on page.
	password.size(s);

    encryptBtn = createButton( "Encrypt" ); // Create button to help get input data.
    encryptBtn.position(x + titlePad + 10, y + (4 * p)); // Put button on page.
	encryptBtn.size(s/2);	

    let titlePlain = createDiv("Plaintext:");
    titlePlain.position(x - titlePad, y);
    titlePlain.style('font-size', '18px');

    let titlePass = createDiv("Password:");
    titlePass.position(x - titlePad, y + (2 * p));
    titlePass.style('font-size', '18px');
}

function showStatus() {
    background(255);
    textAlign(LEFT);
	textSize(24);
	fill(0);

	// encrypted plaintext
	let ax = encrypt(plaintext.value(), plaintext.value().length);
	// encrypted plaintext with password
	let bx = xor_chars(ax, password.value());
	// decrypted plaintext
	let cx = xor_chars(bx, password.value());
    // back to normal plaintext
    let dx = decrypt(cx);

	let complete_str = "<b>Plaintext Input: </b>" + plaintext.value() + "<br>"
					+ "<b>Password Input: </b>" + password.value() + "<br>"
					+ "<b>Encrypted plaintext: </b>" + ax + "<br>"
					+ "<b>Encrypt plain + pass: </b>" + bx + "<br>"
					+ "<b>Decrypted plaintext: </b>" + cx + "<br>"
                    + "<b>Normal plaintext: </b>" + dx;
                    
    if(comp8(password.value()) == false) {
        complete_str = "Invalid password.";
    }
                    
    if(debug_on) {
        console.log(complete_str);
    }

    showEncrypt.remove();
    showEncrypt = createP(complete_str);
    showEncrypt.position(50, 150);
    showEncrypt.style('font-size', '18px');
	showEncrypt.style('text-align', 'left');


}

