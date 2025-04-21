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
  previewElement.innerText = constructCompletionText();
}

function constructCompletionText() {
  return `${inputTypeElement.value}  ${inputAmountElement.value}  ${inputItemElement.value}`
}

btnCreate.onclick = function () {
  createQuest(inputTitleElement.value, inputDescriptionElement.value);
  inputTitleElement.value = "";
  inputDescriptionElement.value = "";
  inputTypeElement.value = "Gather";
  inputAmountElement.value = "";
  inputItemElement.value = "";
  onCompletionChanged();
}

function createQuest(title, description) {
  let clonedQuest = questTemplateElement.cloneNode(true);
  clonedQuest.removeAttribute("hidden");
  clonedQuest.removeAttribute("id");

  let clonedQuestTitle = clonedQuest.getElementsByClassName("questTitle")[0];
  let clonedQuestContent = clonedQuest.getElementsByClassName("questContent")[0];
  let completionHTML = `<p><small>${constructCompletionText()}</small></p>`;

  clonedQuestTitle.innerText = title;
  clonedQuestContent.innerHTML = completionHTML + "<h5>Description</h5>" + description;

  let clonedQuestButton = clonedQuest.getElementsByTagName("button")[0];
  clonedQuestButton.onclick = function () {
    this.parentNode.remove();
  };

  questsContainerElement.appendChild(clonedQuest);
}