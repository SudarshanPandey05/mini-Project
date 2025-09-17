// Add event listeners for password input, buttons, dark mode toggle, and high contrast toggle
document.getElementById('passwordInput').addEventListener('input', updateStrength);
document.getElementById('checkButton').addEventListener('click', updateStrength);
document.getElementById('generateButton').addEventListener('click', generatePassword);
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
document.getElementById('eyeButton').addEventListener('click', togglePasswordVisibility);
document.getElementById('highContrastToggle').addEventListener('click', toggleHighContrastMode);

// Function to update password strength
function updateStrength() {
    const password = document.getElementById('passwordInput').value;
    const strengthIndicator = document.getElementById('strengthIndicator');
    const feedback = document.getElementById('feedback');
    const requirements = {
        length: document.getElementById('lengthRequirement'),
        uppercase: document.getElementById('uppercaseRequirement'),
        number: document.getElementById('numberRequirement'),
        special: document.getElementById('specialRequirement')
    };

    let strength = 'Weak';
    let color = 'red';

    // Check password length
    if (password.length >= 8) {
        requirements.length.style.color = 'green';
        strength = 'Moderate';
    } else {
        requirements.length.style.color = 'red';
    }

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
        requirements.uppercase.style.color = 'green';
        strength = strength === 'Weak' ? 'Moderate' : 'Strong';
    } else {
        requirements.uppercase.style.color = 'red';
    }

    // Check for numbers
    if (/\d/.test(password)) {
        requirements.number.style.color = 'green';
        strength = strength === 'Weak' ? 'Moderate' : 'Strong';
    } else {
        requirements.number.style.color = 'red';
    }

    // Check for special characters
    if (/[@$!%*?&#]/.test(password)) {
        requirements.special.style.color = 'green';
        strength = 'Strong';
    } else {
        requirements.special.style.color = 'red';
    }

    // Update strength indicator
    switch (strength) {
        case 'Weak':
            color = 'red';
            break;
        case 'Moderate':
            color = 'orange';
            break;
        case 'Strong':
            color = 'green';
            break;
    }

    strengthIndicator.style.backgroundColor = color;
    feedback.textContent = `Password Strength: ${strength}`;
}

// Function to generate a random password
function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    document.getElementById('generatedPassword').value = password;
    document.getElementById('passwordInput').value = password; // Update the password input field
    updateStrength(); // Update the strength for the generated password
}

// Function to toggle between dark mode and light mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    // Optionally update text for Dark Mode Toggle Button
    const buttonText = document.body.classList.contains('dark-mode') ? "Switch to Light Mode" : "Switch to Dark Mode";
    document.getElementById('darkModeToggle').textContent = buttonText;
}

// Function to toggle password visibility
function togglePasswordVisibility() {
    const passwordField = document.getElementById('passwordInput');
    const eyeIcon = document.getElementById('eyeButton');

    const isPasswordVisible = passwordField.type === 'text';
    passwordField.type = isPasswordVisible ? 'password' : 'text';

    // Optionally change the eye icon when toggling visibility
    eyeIcon.src = isPasswordVisible ? 'path/to/eye-icon.png' : 'path/to/eye-off-icon.png'; // Update the icon
}

// Function to toggle between High Contrast and Normal modes
function toggleHighContrastMode() {
    document.body.classList.toggle('high-contrast-mode');
    
    // Optionally update text for High Contrast Mode Toggle Button
    const buttonText = document.body.classList.contains('high-contrast-mode') ? "Disable High Contrast Mode" : "Enable High Contrast Mode";
    document.getElementById('highContrastToggle').textContent = buttonText;
}
