export function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasDigits = /[0-9]/;
    const hasSpecialChar = /[!@#$_%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
        return { isValid: false, message: "Password must be at least 8 characters long." };
    }
    if (!hasUpperCase.test(password)) {
        return { isValid: false, message: "Password must contain at least one uppercase letter." };
    }
    if (!hasLowerCase.test(password)) {
        return { isValid: false, message: "Password must contain at least one lowercase letter." };
    }
    if (!hasDigits.test(password)) {
        return { isValid: false, message: "Password must contain at least one digit." };
    }
    if (!hasSpecialChar.test(password)) {
        return { isValid: false, message: "Password must contain at least one special character." };
    }
    return { isValid: true, message: "Password is valid." };
}
