function validateEmail(email) {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Check if password is at least 8 characters long and contains at least one number and one letter
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}

function validateCredentials(email, password) {
    if (!validateEmail(email)) {
        throw new Error("Invalid email format.");
    }
    if (!validatePassword(password)) {
        throw new Error("Password must be at least 8 characters long and contain at least one letter and one number.");
    }
    return true; // If both validations pass
}

// Example usage
try {
    const email = "test@example.com"; // Replace with user input
    const password = "Password1"; // Replace with user input
    validateCredentials(email, password);
    console.log("Email and password are valid.");
} catch (error) {
    console.error(error.message);
}