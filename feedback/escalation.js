document.getElementById('escalationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    const dateReceived = document.getElementById('dateReceived').value;
    
    if (!name || !position || !department || !dateReceived) {
        return;
    }
    
    // Show success message
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'Escalation submitted successfully!';
    messageDiv.className = 'message success';
    messageDiv.style.display = 'block';
    
    // Reset form
    this.reset();
});