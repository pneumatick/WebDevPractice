const noteForm = document.getElementById("form");
const notepad = document.getElementById("notepad");
const noteTable = document.getElementById("notes");
const modal = document.getElementById("modal");
const span = document.getElementById("close");
const modalText = document.getElementById("modal-text")

function displayModal(event) {
    let noteText = event.target.parentNode.getElementsByTagName("p")[0].innerHTML;
    modalText.innerHTML = noteText;
    modal.style.display = "block";
}

function addNote(event) {
    // Get data
    let noteText = notepad.value;
    let lastRow = noteTable.rows[noteTable.rows.length - 1];

    // Create note elements
    let newNote = document.createElement("td");
    let noteData = document.createElement("p");
    noteData.className = "note-preview";
    let expandButton = document.createElement("button");

    // Add data to the elements
    noteData.innerHTML = noteText;
    expandButton.innerHTML = "View";

    // Add event listeners
    expandButton.addEventListener("click", displayModal);

    // Append elements 
    newNote.appendChild(noteData);
    newNote.appendChild(expandButton);

    // Append the new note to the table
    if (lastRow.childElementCount < 3) {
        lastRow.appendChild(newNote);
    }
    else {
        let newRow = document.createElement("tr");
        newRow.appendChild(newNote);
        noteTable.appendChild(newRow);
    }

    // Reset the textarea value
    notepad.value = "";

    event.preventDefault();
}

function spanClose() {
    modal.style.display = "none";
}

function windowClose(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

noteForm.addEventListener("submit", addNote);
span.addEventListener("click", spanClose);
window.addEventListener("click", windowClose);