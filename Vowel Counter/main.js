const textField = document.getElementById("text-field");
const submitButton = document.getElementById("submit-button");
const VOWELS = ["a", "e", "i", "o", "u"];

function countVowels(text) {
    let numVowels = 0;
    let lowerText = text.toLowerCase();
    
    for (let i = 0; i < lowerText.length; i++) {
        if (VOWELS.includes(lowerText[i])) {
            numVowels++;
        }
    }

    return numVowels;
}

function showVowelCount() {
    let text = textField.value;
    let numVowels = countVowels(text);
    alert("There are " + numVowels + " vowels!");
}

submitButton.addEventListener("click", showVowelCount);
