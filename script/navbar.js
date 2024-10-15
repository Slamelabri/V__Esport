document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('navbar-toggle');
    const navbarLinks = document.getElementById('navbar-links');
    const searchIcon = document.getElementById('search-icon');
    const desktopSearchBar = document.getElementById('search-bar');
    const mobileSearchBar = document.getElementById('mobile-search-bar');

    // click navbar links
    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('show');
    });

    //  desktop search bar visibility
    searchIcon.addEventListener('click', (event) => {
        event.stopPropagation(); 
        desktopSearchBar.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
        if (!searchIcon.contains(event.target) && !desktopSearchBar.contains(event.target)) {
            desktopSearchBar.classList.remove('show');
        }
    });

    // Optional: Handle Enter key for search
    desktopSearchBar.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            // Implement search functionality here
            console.log('Search:', desktopSearchBar.value);
            desktopSearchBar.classList.remove('show');
        }
    });

    mobileSearchBar.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            // Implement search functionality here
            console.log('Search:', mobileSearchBar.value);
            // Optionally close the menu after search
            navbarLinks.classList.remove('show');
        }
    });
});
