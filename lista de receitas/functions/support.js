function redirectToIndex() {
    window.location.href = 'index.html'; // Redirect to index.html
}

function redirectToCart() {
    window.location.href = 'cart.html'; // Redirect to cart.html
}

// Your existing JavaScript code goes here (starting from document.addEventListener)
document.addEventListener('DOMContentLoaded', function () {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Initial message from the chatbot
    displayMessage("Chatbot", "Hi there! How can I assist you today?");

    // State to keep track of the conversation
    let conversationState = "INITIAL"; // You can define different conversation states

    // Event listener for sending a user message
    sendButton.addEventListener('click', function () {
        const userMessage = userInput.value.trim();

        if (userMessage.toLowerCase() === 'index') {
            window.location.href = 'index.html'; // Redirect to index.html
            return; // Exit the function to prevent further chat processing
        } else if (userMessage.toLowerCase() === 'cart') {
            window.location.href = 'cart.html'; // Redirect to cart.html
            return; // Exit the function to prevent further chat processing
        }

        if (userMessage !== "") {
            displayMessage("You", userMessage);

            // Handle the conversation based on the current state
            switch (conversationState) {
                case "INITIAL":
                    displayMessage("Chatbot", "Are you interested in purchasing a product?");
                    conversationState = "PRODUCT_INTEREST";
                    break;
                case "PRODUCT_INTEREST":
                    if (userMessage.toLowerCase().includes("yes")) {
                        displayMessage("Chatbot", "Great! What type of product are you looking for?");
                        conversationState = "PRODUCT_TYPE";
                    } else {
                        displayMessage("Chatbot", "Okay, if you have any other questions, feel free to ask.");
                        conversationState = "END";
                    }
                    break;
                case "PRODUCT_TYPE":
                    // You can provide options and let the user choose
                    if (userMessage.toLowerCase().includes("electronics")) {
                        displayMessage("Chatbot", "We have a wide range of electronics. What specific product are you interested in?");
                        conversationState = "SPECIFIC_PRODUCT";
                    } else if (userMessage.toLowerCase().includes("clothing")) {
                        displayMessage("Chatbot", "We offer various clothing items. Which category would you like to explore?");
                        conversationState = "CLOTHING_CATEGORY";
                    } else {
                        displayMessage("Chatbot", "I'm sorry, we currently don't have that product category.");
                        conversationState = "END";
                    }
                    break;
                // Add more conversation states as needed

                case "SPECIFIC_PRODUCT":
                    // Handle specific product inquiries here
                    // Set conversationState accordingly
                    break;
                case "CLOTHING_CATEGORY":
                    // Handle clothing category selection here
                    // Set conversationState accordingly
                    break;
                case "END":
                    // Handle the end of the conversation or other scenarios
                    break;
            }

            userInput.value = ""; // Clear user input
        }
    });

    // Function to display a message in the chat
    function displayMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }
});