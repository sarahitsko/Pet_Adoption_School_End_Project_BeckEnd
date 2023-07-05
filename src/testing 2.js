const bcrypt = require("bcrypt");

async function testBcrypt() {
  try {
    const inputPassword = "password123";

    // Hash the input password
    const hashedPassword = await bcrypt.hash(inputPassword, 10);
    console.log("Hashed Password:", hashedPassword);

    // Compare the hashed password with the input password
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    console.log("Password Match:", isMatch);
  } catch (err) {
    console.error(err);
  }
}

// Call the test function
testBcrypt();
