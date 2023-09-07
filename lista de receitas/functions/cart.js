document.addEventListener('DOMContentLoaded', () => {
    // Get the ul element where cart items will be displayed
    const cartItemList = document.getElementById('cartItemList');
    const paginationControls = document.getElementById('paginationControls');
    const prevPageButton = document.getElementById('prevPageButton');
    const nextPageButton = document.getElementById('nextPageButton');

    // Find the "Back to Home" button element
    const backToHomeButton = document.getElementById('backToHomeButton');

    // Add a click event listener to the "Back to Home" button
    backToHomeButton.addEventListener('click', () => {
        // Redirect to the index.html page (home page)
        window.location.href = 'index.html'; // Replace with the actual path to your index page
    });

    // Display cart items with pagination
    function displayCartItems(pageNumber, pageSize) {
        cartItemList.innerHTML = ''; // Clear previous items

        const storedCartItems = localStorage.getItem('cartItems');
        const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        if (cartItems.length === 0) {
            cartItemList.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            const displayedItems = cartItems.slice(startIndex, endIndex);
            displayedItems.forEach(item => {
                // Fetch item details from the API based on the item name
                fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(item.name)}`)
                    .then(response => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            throw new Error('Failed to fetch item details from the API');
                        }
                    })
                    .then(data => {
                        // Create a list item element for each item
                        const listItem = document.createElement('li');

                        // Create an image element for the item
                        const itemImage = document.createElement('img');
                        itemImage.src = data.meals[0].strMealThumb; // Set the image source
                        itemImage.alt = data.meals[0].strMeal; // Set alt text for accessibility

                        // Create a heading element for the item name
                        const itemName = document.createElement('h3');
                        itemName.textContent = data.meals[0].strMeal;

                        // Create a paragraph element for the item description
                        const itemDescription = document.createElement('p');
                        itemDescription.textContent = data.meals[0].strInstructions; // Use the appropriate property for description

                        // Append the image, name, and description to the list item
                        listItem.appendChild(itemImage);
                        listItem.appendChild(itemName);
                        listItem.appendChild(itemDescription);

                        // Append the list item to the cartItemList
                        cartItemList.appendChild(listItem);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });
        }
    }

    // Pagination variables
    const pageSize = 5;
    let currentPage = 1;

    // Initial display of cart items
    displayCartItems(currentPage, pageSize);

    // Pagination control event listeners
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCartItems(currentPage, pageSize);
        }
    });

    nextPageButton.addEventListener('click', () => {
        const storedCartItems = localStorage.getItem('cartItems');
        const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
        const totalItems = cartItems.length;

        if (currentPage < Math.ceil(totalItems / pageSize)) {
            currentPage++;
            displayCartItems(currentPage, pageSize);
        }
    });
});