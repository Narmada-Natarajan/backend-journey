export const CheckPassword = (password) => {
  if (password.length < 8 || password.length > 12) {
    return false;
  }

  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSpecial = false;

  const specialChars = "-$#@.!";

  for (let char of password) {
    if (char >= "A" && char <= "Z") {
      hasUpper = true;
    } else if (char >= "a" && char <= "z") {
      hasLower = true;
    } else if (char >= "0" && char <= "9") {
      hasNumber = true;
    } else if (specialChars.includes(char)) {
      hasSpecial = true;
    } else {
      // spaces or invalid characters
      return false;
    }
  }

  return hasUpper && hasLower && hasNumber && hasSpecial;
};