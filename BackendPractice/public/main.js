const searchForm = document.getElementById('search-form');
const searchField = document.getElementById('search-field');
const addForm = document.getElementById('add-form');
const titleField = addForm.querySelector('#title-field');
const authorField = addForm.querySelector('#author-field');

/* Functions */

async function search(event) {
    event.preventDefault();
    let input = searchField.value.toLowerCase().replaceAll(' ', '_');
    url = `http://localhost:8080/${input}`;

    // Get the book if it exists
    let book = await fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
            else {
                return null;
            }
        })
        .catch(err => {
            console.log("Error caught");
            console.log(err);
        });

    // Display book info
    if (book) {
        alert(`Title: ${book.title}\nAuthor: ${book.author}`);
    }
    else {
        alert(`Error: "${searchField.value}" not found`);
    }
}

function add(event) {
    event.preventDefault();
    let title = titleField.value.replaceAll(' ', '_');
    let titleKey = title.toLowerCase().replaceAll(' ', '_');
    let author = authorField.value.replaceAll(' ', '_');
    let book = { title: title, author: author };
    let url = `http://localhost:8080/${titleKey}?title=${title}&author=${author}`;
    let post = JSON.stringify(book);
    let xmlReq = new XMLHttpRequest();
    
    // Send the post request
    xmlReq.open('POST', url, true);
    //xmlReq.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xmlReq.send(post);

    // Handle response
    xmlReq.onload = () => {
        if (xmlReq.status === 201) {
            alert(`${titleField.value} sucessfully added!`);
        }
        else {
            alert(`Post failed:\n${xmlReq.status}: ${xmlReq.statusText}`);
        }
    };
}

/* Event listeners */

searchForm.addEventListener('submit', search);
addForm.addEventListener('submit', add);