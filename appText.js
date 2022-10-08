//selects the unordered list (ul)
const ulList = document.querySelector(".list");
//Submit button
const submitBtn = document.querySelector(".todo-submit");
//selects the input field
const inputEl = document.querySelector(".todo-input");

//Array that holds the value from the input field
let valueFromInput = JSON.parse(localStorage.getItem("value")) || [];

//Click EventListner in Input Form
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!inputEl.value) return;
  const newValue = addToLocalStorage(inputEl.value);

  createList(newValue);
});

//Create HTML Elements on the Submit(add) button click
function createList({ value }) {
  //creates the ListItem (li)
  const listItem = document.createElement("li");
  //creates the check mark div
  const checkMarkDiv = document.createElement("div");
  checkMarkDiv.classList.add("check-mark");
  checkMarkDiv.innerHTML = `<i class="fa-solid fa-check"></i>`;
  //cheates the content div
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");
  //creates a h1 it holds the user input
  const h1 = document.createElement("h1");
  //   if (!inputEl.value) return;
  h1.textContent = value;
  contentDiv.appendChild(h1);
  //creates the close mark div
  const closeDiv = document.createElement("div");
  closeDiv.classList.add("close-mark");

  closeDiv.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  //adds the child elements to the (li)
  listItem.append(checkMarkDiv, contentDiv, closeDiv);

  ulList.appendChild(listItem);
  inputEl.value = "";

  //adding id to each close div
  const closeEl = document.querySelectorAll(".close-mark");

  for (let i = 0; i < closeEl.length; i++) {
    //closeEl[i].classList.add(i);
    closeEl[i].setAttribute("id", i);
  }

  // check funtionality
  listItem.addEventListener("click", () => {
    listItem.classList.toggle("checked");
    checkMarkDiv.classList.toggle("check-mark-show");
  });

  //delete functionality

  closeDiv.addEventListener("click", (e) => {
    //removeItem holds the parent element of the closeDiv
    const removeItem = e.currentTarget.parentElement;
    //it removes the parent element of the clicked div
    removeItem.remove();

    //it removes the specific item from the valueFromInput array and set the new array to localstorage
    valueFromInput.splice(e.target.id, 1);
    localStorage.setItem("value", JSON.stringify(valueFromInput));
  });
}

//Add the value from the input field to localStorage
function addToLocalStorage(value) {
  const getInputValue = {
    value: value,
  };
  valueFromInput.push(getInputValue);
  localStorage.setItem("value", JSON.stringify(valueFromInput));
  return getInputValue;
}

// valueFromInput.indexOf();

valueFromInput.forEach(createList);

// const arr = [0, 1, 2, 3, 4, 5];
// const index = arr.indexOf(2);
// console.log(index);

// arr2 = arr.splice(arr.length - 5, arr.length);
// arr2 = arr.splice(index, 1);
// console.log(arr2);
// console.log(arr);
