
const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    mobile: /^[0-9]{10}$/,
    AZ: /[A-Z]/,
    az: /[a-z]/,
    number: /[0-9]/,
    anyChar: /[^A-Za-z0-9]/,
    alphabet: /^[a-zA-Z\s]*$/,
}

export const validateEmail = (email) => {
    const emailPattern = validationPatterns.email;
    return emailPattern.test(email);
}

export const validateMobile = (mobile) => {
    const mobilePattern = validationPatterns.mobile;
    return mobilePattern.test(mobile);
}

export const validateEmailOrMobile = (input) => {
    return validateEmail(input) || validateMobile(input);
};
  
export const validatePassword = (password) => {
    const AZ = validationPatterns.AZ;
    const az = validationPatterns.az;
    const number = validationPatterns.number;
    const anyChar = validationPatterns.anyChar;
    return password.length >= 6 && AZ.test(password) && az.test(password) && number.test(password) && anyChar.test(password);
};


export const validateNotEmpty = (text) => {
    if (typeof text === 'number') {
        return text > 0;
    }

    text = String(text);

    return text.length >= 1;
}

export const validateAlphabet = (text) => {
    return validationPatterns.alphabet.test(text);
}

export const validateMinLength = (text, minLength) => {
    return text.length >= minLength;
}