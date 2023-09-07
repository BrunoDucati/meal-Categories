document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0; // Track the current category index
    let cartItemCount = 0; // Track the number of items in the cart
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Retrieve cart items from local storage

    // Function to update the content with data for a given category index
    function updateContent(categoryIndex) {
        // API URL to fetch categories
        const apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const category = data.categories[categoryIndex];
                // Update HTML elements with category data
                document.getElementById('categoryImage').src = category.strCategoryThumb;
                document.getElementById('categoryName').textContent = category.strCategory;
                document.getElementById('categoryDescription').textContent = category.strCategoryDescription;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Initial content update
    updateContent(currentIndex);

    // Button event listeners
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const buyButton = document.getElementById('buyButton');
    const cartItemCountElement = document.getElementById('cartItemCount');
    const cartIcon = document.querySelector('.cart-icon'); // Cart icon element (using class)

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + 3) % 3; // Wrap around to the end
        updateContent(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % 3; // Wrap around to the beginning
        updateContent(currentIndex);
    });

    // Attach the "Buy" button click event listener only once
    buyButton.addEventListener('click', () => {
        // Create an item object (you can adjust this structure based on your needs)
        const item = {
            name: document.getElementById('categoryName').textContent, // Use the category name as the item name
        };

        // Add the item to the cart (local storage)
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Increment the cart item count and update the cart icon
        cartItemCount++;
        cartItemCountElement.textContent = cartItemCount;
    });

    // Navigate to the cart page when the cart icon is clicked
    cartIcon.addEventListener('click', () => {
        // Replace 'cart.html' with the actual path to your cart page
        window.location.href = 'cart.html';
    });
});