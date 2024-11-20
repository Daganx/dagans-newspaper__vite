const bcrypt = require("bcryptjs");

const hashPassword = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("dagantest420", salt);
  console.log("Hashed password:", hashedPassword);
};

hashPassword();
