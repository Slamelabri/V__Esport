
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');

            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button
            this.classList.add('active');

            // Show the selected tab content
            document.getElementById(tab).classList.add('active');
        });
    });
});

// Add after updating classes

