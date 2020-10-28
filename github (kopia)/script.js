
const habitList = document.querySelector('.habit-list')
const addBtn = document.querySelector(".addBtn");
const habitInput = document.querySelector(".habit-input");
let colorChoice = document.getElementById("pick-color").value;
const condition = document.querySelector("#condition");

document.getElementById("pick-color").onchange = function () {
    backHEX = this.value;
    colorChoice = backHEX;
  };


// define a habit data variable
let habitDataArray

loadLocalStorage() // loaded from local storage, copied the data to your habitdata array

function loadLocalStorage () {
  if (localStorage.getItem('data')) {
    habitDataArray = JSON.parse(localStorage.getItem('data'))
  } else {
    habitDataArray = [{habitName: 'test habit', color: 'green', completed: [0, 2, 4]}]
  }
}

function save() {
  localStorage.setItem('data', JSON.stringify(habitDataArray))
}

function displayExisting () {
  habitDataArray.forEach(habit => {
      
    //create a habit div

    const habitDiv = document.createElement("div");
    habitDiv.classList.add("habits");

    //remove btn
    const trashHabit = document.createElement("button");
    trashHabit.innerHTML = '<p class="removeBtn">-</p>';
    trashHabit.classList.add("trash-btn");
    trashHabit.addEventListener('click', deleteThis)
    habitDiv.appendChild(trashHabit);

    //create li
    const newHabit = document.createElement("li");
    newHabit.innerText = habit.habitName;
    newHabit.classList.add("habit-item");
    habitDiv.appendChild(newHabit);
    // create divs with the information from habit
    for (let i = 0; i < 7; i++) {
      let button = document.createElement("button");
      button.classList.add("circle");
      
      habitDiv.appendChild(button);
      if (habit.completed.includes(i)) {
          console.log('hi')
        button.style.backgroundColor = habit.color
      } else {
        button.style.backgroundColor = 'transparent'
      }
      button.addEventListener("click", changeHabit.bind(button, habit));
      button.setAttribute("data-weekday", `${i}`);
    }

    habitList.appendChild(habitDiv)
  })
  habitInput.value = "";
  condition.textContent = "there u go!";
}

function changeHabit (habit) {
    if (this.style.backgroundColor === 'transparent') {
        this.style.backgroundColor = habit.color
        habit.completed.push(+this.getAttribute('data-weekday'))
        console.log(habitDataArray)
        save()
    } else {
        this.style.backgroundColor = 'transparent'
        habit.completed.splice(habit.completed.indexOf(this) - 1, 1)
        save()
        console.log(habit.completed)
    }
}

displayExisting()

addBtn.addEventListener("click", addHabitToPage.bind(addBtn, habitInput.value, colorChoice));

function addHabitToPage(name) {
    
    console.log(colorChoice)
    if (habitInput.value) {
        //create a habit div

    const habitDiv = document.createElement("div");
    habitDiv.classList.add("habits");

    //remove btn
    const trashHabit = document.createElement("button");
    trashHabit.innerHTML = '<p class="removeBtn">-</p>';
    trashHabit.classList.add("trash-btn");
    trashHabit.addEventListener('click', deleteThis)
    habitDiv.appendChild(trashHabit);

    //create li
    const newHabit = document.createElement("li");
    newHabit.innerText = habitInput.value;
    newHabit.classList.add("habit-item");
    habitDiv.appendChild(newHabit);

    let habit = {
        habitName: habitInput.value,
        color: colorChoice,
        completed: []
    }
    habitDataArray.push(habit)
    save()

    // create divs with the information from habit
    for (let i = 0; i < 7; i++) {
      let button = document.createElement("button");
      button.classList.add("circle");
      button.style.backgroundColor = 'transparent'
      habitDiv.appendChild(button);

      button.addEventListener("click", changeHabit.bind(button, habit));

   
      button.setAttribute("data-weekday", `${i}`);
    }

    habitList.appendChild(habitDiv)

    }
    habitInput.value = "";
  condition.textContent = "there u go!";

}


  const clearAll = document.querySelector(".clear-all");

  clearAll.addEventListener("click", removeAll);

  function removeAll () {
      habitDataArray = []
      save()
      habitList.innerHTML = ''
      displayExisting()
  }

  function deleteThis () {
    condition.textContent = "byeee!";
      console.log(this.nextSibling.innerText)
      habitDataArray = habitDataArray.filter(habit => {
          return this.nextSibling.innerText !== habit.habitName
      })
      save()
      this.parentNode.remove()
  }


//get week
const weekElement = document.getElementById("week");

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

  return [d.getUTCFullYear(), weekNo];
}

var result = getWeekNumber(new Date());

weekElement.innerHTML = "week " + result[1] + " of " + result[0];


const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitle = document.querySelector("[data-list-title]");
const habitContainer = document.querySelector("[data-tasks]");

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []; //store the list
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY); //get this info

newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return;

  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] };
}

function saveAndRender() {
  s();
  render();
}
function s() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

listsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

deleteListButton.addEventListener("click", (e) => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
  saveAndRender();
});

deleteListButton.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});

function render() {
  clearElement(listsContainer);

  renderList();
  const selectedList = lists.find((list) => list.id === selectedListId);
  if (selectedListId == null) {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = "";
    listTitle.innerText = selectedList.name;
  }
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach((task) => {
    displayExisting ()
  });
}

function renderList() {
  clearElement(listsContainer); //what we want to clear
  lists.forEach((list) => {
    const listElement = document.createElement("li"); //create a li
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name"); //add a class to it
    listElement.innerText = list.name; //set the name, text inside of it
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }

    listsContainer.appendChild(listElement); //append to the listcontainer
  });
}

function clearElement(element) {
  while (element.firstChild) {
    // if the element has a first  hild, remove
    element.removeChild(element.firstChild);
  }
}

render(); // everytime render is called, clear items
