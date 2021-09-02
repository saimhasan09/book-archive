const errorDiv = document.getElementById('error');
errorDiv.style.display = 'none';
const searchBook = () => {
    const inputValue = document.getElementById('input-filed');
    const searchText = inputValue.value;
    //empty value error checking
    if (searchText === '') {
        errorDiv.style.display = 'block';
    }
    else {
        //fetch api
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => showBook(data))
    }

};
//all book container
const showBook = (books) => {
    const bookList = books.docs;
    //checking search result
    document.getElementById('view-results').innerHTML = `<p>About ${bookList.length} results out of ${books.numFound}</p>`

    if ((bookList.length) === 0) {
        errorDiv.style.display = 'block';
        errorDiv.innerText = 'no result found';

    }
    else {
        bookList.length ? errorDiv.style.display = 'none' : '';
        //bring book container from html
        const bookContainer = document.getElementById('book-container');
        bookContainer.textContent = '';
        bookList.forEach(book => {
            let author = '';
            let bookPublisher = '';
            const div = document.createElement('div');
            div.classList.add('col');
            book.author_name ? author = book.author_name[0] : ''; 
            book.publisher ? bookPublisher = book.publisher[0] : '';
            div.innerHTML = `
             <div class="card rounded "  style="height:500px;" >
                  <img class="mx-auto mt-2 rounded" src='https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg' />
                    <div class="card-body mx-auto">
                         <h4>${book.title}</h4>
                         <p>author: ${author}</p>
                        <p>publiser: ${bookPublisher}</p>
                        <p>frist publist: ${book.first_publish_year}</p>
                    </div>
             </div>
        `;

            bookContainer.appendChild(div);
        });
    }
};

