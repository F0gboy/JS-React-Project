let questsContainerElement = document.getElementById("questsContainer");
let questTemplateElement = document.getElementById("questTemplate");

let inputTitleElement = document.getElementById("inputTitle");
let inputDescriptionElement = document.getElementById("inputDescription");

let inputTypeElement = document.getElementById("inputType");
let inputAmountElement = document.getElementById("inputAmount");
let inputItemElement = document.getElementById("inputItem");

let previewElement = document.getElementById("preview");

inputTypeElement.onchange = onCompletionChanged;
inputAmountElement.onchange = onCompletionChanged;
inputItemElement.oninput = onCompletionChanged;

function onCompletionChanged() {
  /* Called whenever "type", "amount" or "item" inputs changes */
}

btnCreate.onclick = function() {

}