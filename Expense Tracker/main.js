const expenseForm = document.getElementById("form");
const expenseNameField = document.getElementById("expense-name");
const dateField = document.getElementById("date");
const amountField = document.getElementById("amount");
const table = document.getElementById("expense-table");

function submitExpense(event) {
    // Get values from fields
    let expenseName = expenseNameField.value;
    let date = dateField.value;
    let amount = amountField.value;

    // Reset field values to default state
    expenseNameField.value = "";
    dateField.value = "";
    amountField.value = "";

    // Create new elements
    let row = document.createElement("tr");
    let expenseNameData = document.createElement("td");
    let dateData = document.createElement("td");
    let amountData = document.createElement("td");

    // Add data to the table data elements
    expenseNameData.innerHTML = expenseName;
    dateData.innerHTML = date;
    amountData.innerHTML = amount;

    // Append the new elements to the document
    row.appendChild(expenseNameData);
    row.appendChild(dateData);
    row.appendChild(amountData);
    table.appendChild(row);

    event.preventDefault();
}

expenseForm.addEventListener("submit", submitExpense);