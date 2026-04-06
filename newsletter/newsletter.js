// Real Newsletter Signup
function subscribe() {
    const emailInput = document.getElementById('email');
    const button = document.querySelector('.signup-form button');
    const email = emailInput.value.trim();

    if (!email) {
        button.textContent = "Please enter your email";
        button.style.backgroundColor = "#d32f2f";
        setTimeout(() => {
            button.textContent = "Subscribe";
            button.style.backgroundColor = "";
        }, 2500);
        return;
    }

    // Basic email validation
    if (!email.includes('@') || !email.includes('.')) {
        button.textContent = "Please enter a valid email";
        button.style.backgroundColor = "#d32f2f";
        setTimeout(() => {
            button.textContent = "Subscribe";
            button.style.backgroundColor = "";
        }, 2500);
        return;
    }

    button.textContent = "Sending...";
    button.disabled = true;

    // === HERE YOU WILL CONNECT TO YOUR EMAIL SERVICE ===
    // For now, we'll simulate success
    setTimeout(() => {
        button.textContent = "Subscribed ✓";
        button.style.backgroundColor = "#2e7d32";

        // Optional: alert or message
        alert("Thank you! You've been subscribed to the Wildlives Rescue Newsletter.");

        // Reset form
        setTimeout(() => {
            emailInput.value = "";
            button.textContent = "Subscribe";
            button.style.backgroundColor = "";
            button.disabled = false;
        }, 2000);
    }, 1200);
}

// Toggle year (only one opens)
function toggleYear(card) {
    const months = card.querySelector('.months');
    const isOpen = months.style.maxHeight && months.style.maxHeight !== '0px';

    document.querySelectorAll('.year-card .months').forEach(m => {
        m.style.maxHeight = '0px';
    });

    if (!isOpen) {
        months.style.maxHeight = months.scrollHeight + "px";
    }
}