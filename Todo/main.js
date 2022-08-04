const form = document.getElementById("form");
const newItemField = document.getElementById("new-item-field");
const list = document.getElementById("list");
let itemNum = list.childElementCount;

let removeListItem = (event) => {
    event.target.parentElement.remove();
    itemNum--;
}

let completeListItem = (event) => {
    event.target.parentElement.style.color = "green";
}

let createNewListItem = (event) => {
    // Setting up new elements and getting data
    let text = newItemField.value;
    let newItem = document.createElement("li");
    newItem.className = "list-item"
    let del = document.createElement("button");
    del.innerHTML = "Del";
    del.onclick = removeListItem;
    let complete = document.createElement("button");
    complete.innerHTML = "Done";
    complete.onclick = completeListItem;

    // Applying changes
    itemNum++;
    newItem.innerHTML = itemNum + ": " + text;
    list.appendChild(newItem);
    newItem.appendChild(del);
    newItem.appendChild(complete);
    newItemField.value = "";
    event.preventDefault();
}

form.onsubmit = createNewListItem;