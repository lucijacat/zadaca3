document.addEventListener('DOMContentLoaded', () => {
    fetch('books.json')
        .then(response => response.json())
        .then(books => displayBooks(books))
        .catch(error => console.error('Error loading books:', error));
});

function displayBooks(books) {
    const booksList = document.getElementById('books-list');
    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.textContent = `${book.name} by ${book.author}`;
        const openButton = document.createElement('button');
        openButton.textContent = 'Open';
        openButton.addEventListener('click', () => openBookWindow(book, index));
        li.appendChild(openButton);
        booksList.appendChild(li);
    });
}

function openBookWindow(book, index) {
    const bookDetailsWindow = window.open("", "_blank", "width=600,height=400");
    bookDetailsWindow.document.write(`
        <html>
        <head>
            <title>${book.name}</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <h1>${book.name}</h1>
            <p>Author: ${book.author}</p>
            <div id="book-details">
                ${book.review ? `<p>Review: ${book.review}</p>` : '<p>No review yet.</p>'}
                <button onclick="editReview(${index}, '${book.review || ''}')">${book.review ? 'Edit' : 'Add'} Review</button>
            </div>
            <script>
                function editReview(index, currentReview) {
                    const formHtml = \`
                        <form id="review-form">
                            <label for="review">Review:</label>
                            <input type="text" id="review" name="review" value="\${currentReview}" required>
                            <button type="submit">${book.review ? 'Update' : 'Submit'} Review</button>
                        </form>
                    \`;
                    document.getElementById('book-details').innerHTML = formHtml;
                    document.getElementById('review-form').addEventListener('submit', (e) => submitReview(e, index));
                }

                function submitReview(event, index) {
                    event.preventDefault();
                    const review = document.getElementById('review').value;
                    window.opener.updateBookReview(index, review);
                    window.close();
                }
            </script>
        </body>
        </html>
    `);
}

function updateBookReview(index, review) {
    fetch('books.json')
        .then(response => response.json())
        .then(books => {
            books[index].review = review;
            saveBooks(books);
        })
        .catch(error => console.error('Error updating review:', error));
}

function saveBooks(books) {
    const fs = require('fs'); // Assuming this is run in a Node.js environment
    fs.writeFile('books.json', JSON.stringify(books, null, 2), err => {
        if (err) console.error('Error saving books:', err);
        else location.reload(); // Reload the main page to show updated reviews
    });
}
