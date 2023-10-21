document.addEventListener('DOMContentLoaded', function() {
    const list = document.getElementById('list');
    const showPanel = document.getElementById('show-panel');
  
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(books => {
        books.forEach(book => {
          const li = document.createElement('li');
          li.textContent = book.title;
          li.addEventListener('click', () => showBookDetails(book));
          list.appendChild(li);
        });
      });
  
    function showBookDetails(book) {
      showPanel.innerHTML = '';
      const img = document.createElement('img');
      img.src = book.thumbnailUrl;
      const title = document.createElement('h2');
      title.textContent = book.title;
      const description = document.createElement('p');
      description.textContent = book.description;
      const likeBtn = document.createElement('button');
      likeBtn.textContent = 'Like';
      likeBtn.addEventListener('click', () => likeBook(book));
      showPanel.appendChild(img);
      showPanel.appendChild(title);
      showPanel.appendChild(description);
      showPanel.appendChild(likeBtn);
  
      const likedBy = document.createElement('p');
      likedBy.textContent = 'Liked by: ' + book.users.map(user => user.username).join(', ');
      showPanel.appendChild(likedBy);
    }
  
    function likeBook(book) {
      const user = { id: 1, username: 'pouros' };
      book.users.push(user);
  
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ users: book.users })
      })
        .then(response => response.json())
        .then(updatedBook => {
          showBookDetails(updatedBook);
        });
    }
  });
  
