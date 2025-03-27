export function checkPassword(firstInput, secondInput) {
    if (firstInput !== secondInput) {
        return { passwordMatch: false, message: "Passwords don't Match." };
    } else {
        return { passwordMatch: true, message: "Password Matches." };
    }
}
