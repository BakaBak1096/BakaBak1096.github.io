document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    sendButton.addEventListener('click', searchBooks);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBooks();
        }
    });

    function searchBooks() {
        const bookTitle = userInput.value.trim();
        if (bookTitle !== '') {
            // Display user input message
            const userMessageElement = document.createElement('div');
            userMessageElement.innerHTML = `
                <div class="user-message">
                    <img src="user_profile_picture.jpg" class="user-profile-picture" alt="User Profile Picture">
                    <div class="user-name">user_login</div>
                    <div>${bookTitle}</div>
                </div>
            `;
            chatMessages.appendChild(userMessageElement);

            // Make request to OpenLibrary API
            const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(bookTitle)}`;
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Process API response and display search results
                displaySearchResults(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

            // Clear user input
            userInput.value = '';
        }
    }

    function displaySearchResults(data) {
        // Display search results
        data.docs.forEach(book => {
            const title = book.title;
            const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
            const html = `<div class="book-result">
                            <strong>Title:</strong> ${title}<br>
                            <strong>Author(s):</strong> ${author}
                          </div>`;
            const bookResultElement = document.createElement('div');
            bookResultElement.innerHTML = html;
            chatMessages.appendChild(bookResultElement);
        });
    }
});
