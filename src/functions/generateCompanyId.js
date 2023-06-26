let prefix = "109";
let lastRandomDigits = 0;

const generateCompanyId = () => {
  const randomDigits = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number

  if (randomDigits === lastRandomDigits) {
    // All possible combinations of the current prefix have been used
    const prefixNumber = parseInt(prefix);
    const newPrefix = (prefixNumber + 1).toString().padStart(3, "0");
    prefix = newPrefix;
  }

  lastRandomDigits = randomDigits;

  const companyId = prefix + randomDigits.toString().slice(1); // Take the last 6 digits of the random number
  return companyId;
};

export default generateCompanyId;
