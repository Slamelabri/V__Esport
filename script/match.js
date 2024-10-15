document.addEventListener('DOMContentLoaded', function() {
    const matchWrapper = document.querySelector('.matchwrapper');
    const prevButton = document.querySelector('.upcoming-match-prev');
    const nextButton = document.querySelector('.upcoming-match-next');
    const matchCards = document.querySelectorAll('.match-card');
    
    let isDragging = false;
    let startX;
    let scrollLeft;
    let isDraggingFlag = false; // Flag to detect if a drag occurred

    // Mouse events for dragging
    matchWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        isDraggingFlag = false; // Reset the drag flag
        startX = e.pageX - matchWrapper.offsetLeft;
        scrollLeft = matchWrapper.scrollLeft;
        matchWrapper.style.cursor = 'grabbing';
    });

    matchWrapper.addEventListener('mouseleave', () => {
        isDragging = false;
        matchWrapper.style.cursor = 'grab';
    });

    matchWrapper.addEventListener('mouseup', () => {
        isDragging = false;
        matchWrapper.style.cursor = 'grab';
    });

    matchWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - matchWrapper.offsetLeft;
        const walk = (x - startX) * 2; // Adjust sensitivity as needed
        if (Math.abs(walk) > 5) { // Threshold to detect actual dragging
            isDraggingFlag = true;
        }
        matchWrapper.scrollLeft = scrollLeft - walk;
    });

    // Prevent click events on match cards if a drag occurred
    matchCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (isDraggingFlag) {
                e.preventDefault(); // Prevent navigation
                isDraggingFlag = false; // Reset the flag
            }
        });
    });

    // Button click events for navigation
    prevButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        slideToPrevious();
    });

    nextButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        slideToNext();
    });

    // Function to slide to the previous match card
    function slideToPrevious() {
        const cardWidth = matchCards[0].offsetWidth + 20; // Include margin/padding if any
        matchWrapper.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    }

    // Function to slide to the next match card
    function slideToNext() {
        const cardWidth = matchCards[0].offsetWidth + 20; // Include margin/padding if any
        matchWrapper.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    }

    // Optional: Update button disabled state based on scroll position
    function updateButtonState() {
        // Disable prevButton if scrolled to the start
        if (matchWrapper.scrollLeft === 0) {
            prevButton.classList.add('is-disabled');
            prevButton.setAttribute('aria-disabled', 'true');
        } else {
            prevButton.classList.remove('is-disabled');
            prevButton.setAttribute('aria-disabled', 'false');
        }

        // Disable nextButton if scrolled to the end
        if (matchWrapper.scrollWidth - matchWrapper.clientWidth <= matchWrapper.scrollLeft + 1) {
            nextButton.classList.add('is-disabled');
            nextButton.setAttribute('aria-disabled', 'true');
        } else {
            nextButton.classList.remove('is-disabled');
            nextButton.setAttribute('aria-disabled', 'false');
        }
    }

    // Initial check
    updateButtonState();

    // Update button state on scroll
    matchWrapper.addEventListener('scroll', updateButtonState);
});

