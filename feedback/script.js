document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rating = document.getElementById('rating').value;
    const feedback = document.getElementById('feedback').value;
    
    // Simple validation
    if (!name || !email || !rating || !feedback) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    showMessage('Thank you for your feedback!', 'success');
    
    // Reset form
    this.reset();
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}