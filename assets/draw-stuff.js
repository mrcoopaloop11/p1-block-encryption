// Draw stuff, with P5  // CF p5js.org/reference
// Time-stamp: <2020-02-02 14:46:00 Chuck Siska>
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

	let ax = encrpyt();
    if(debug_on) {
        console.log(ax);
    }

    showEncrypt.remove();
    showEncrypt = createDiv(ax);
    showEncrypt.position(width/ 2, 200);
    showEncrypt.style('font-size', '18px');
}

