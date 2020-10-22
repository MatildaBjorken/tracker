//main list

let list = []


// target from html
const addBtn = document.querySelector('.addBtn')
const habitInput = document.querySelector('.habit-input')
const habitList = document.querySelector('.habit-list')
const errorEmpty = document.querySelector('.error')
const newWeek = document.querySelector('.btn')
const clearAll = document.querySelector('.clear-all')
const condition = document.querySelector("#condition")

//class eventName {
//    constructor(event) {
//        this.createDiv(event)
//    }
//}
const changeBtn = document.querySelector('.items')

//event listeners
addBtn.addEventListener('click', addHabit)
habitList.addEventListener('click', deleteAction)
changeBtn.addEventListener('click', colorChange)
clearAll.addEventListener('click', removeAll)



document.addEventListener('keypress', function(enter) {
  if (enter.keyCode === 13 || enter.which === 13) {
    addHabit(event)
  };
});


//function for changing color of the habits

function colorChange(x) {
 
  
  const button = x.target
  
  if (button.classList[0]=== 'check') {
    condition.textContent = "nice work!"
    const color = button
    color.classList.toggle('c')

  } else {
    const color = button
    color.classList.remove('c')
  }
}


/*
habitInput.addEventListener("keyup", addHabit) 
  if (event.keyCode === 13) {
   event.preventDefault();
   alert('ehue')
  }
  
*/

function addHabit(event){
    //prevent form from submitting
    event.preventDefault()

    //if the field is empty
    if (habitInput.value === '' ) {
        errorEmpty.classList.remove('hidden')
    
    }else {
        errorEmpty.classList.add('hidden')
        //create a habit div
     
       
        const habitDiv = document.createElement('div')
        habitDiv.classList.add('habits')

        //remove btn
        const trashHabit = document.createElement('button')
        trashHabit.innerHTML = '<p class="removeBtn">-</p>'
        trashHabit.classList.add('trash-btn')
        habitDiv.appendChild(trashHabit)

        //create li
        const newHabit = document.createElement('li')
        newHabit.innerText = habitInput.value
        newHabit.classList.add('habit-item')
        habitDiv.appendChild(newHabit)

        //check 

        //edit
        //const editHabit = document.createElement('button');
    	  //editHabit.classList.add('edit-btn')
        //editHabit.innerHTML = '<p class="editBtn">edit</p>'
        //habitDiv.appendChild(editHabit)

        //checkboxes adding using inner HTML

        const checkHabit = document.createElement('row')
        checkHabit.innerHTML = 
        '<div class= "selected"><button class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button></div>'

        checkHabit.classList.add('table-check')
        
        habitDiv.appendChild(checkHabit)


        //append to list

        habitList.appendChild(habitDiv)

        
    }  
    
    //to clear the input after adding
    habitInput.value= ''
    condition.textContent = "there u go!"
}



//remove btn
function deleteAction(e) {
  const item = e.target
  if (item.classList[0]=== 'trash-btn'){
      const habit = item.parentElement
 
      habit.remove()
  }
}

//remove all btn

function removeAll() {
  alert ('remove')
}

       //set count




//counter
let counter = document.querySelector('.counter');
const addCount = document.querySelector('#addCountBtn');
const lowerCount = document.querySelector('#lowerCountBtn');


let count = 0;


addCount.addEventListener('click', incrementCounter);
lowerCount.addEventListener('click', decrementCounter);

function incrementCounter (){
    count++;
    counter.innerHTML =  count;
    
}

function incrementCounter (){
    count++;
    counter.innerHTML =  count;
    if(counter.innerHTML>'1'){
        counter.style.color = 'white'
    }
    
    counter.animate([{opacity:'0.2'},{opacity:'1.0'}], {duration: 1000, fill:'forwards'})
}
;

function decrementCounter (){
    count--;
    counter.innerHTML =  count;
    if(counter.innerHTML<'1'){
        count++
    }
  
    counter.animate([{opacity:'0.2'},{opacity:'1.0'}], {duration: 1000, fill:'forwards'})
}
const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

listsContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId
    saveAndRender()
  }
})

tasksContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedList = lists.find(list => list.id === selectedListId)
    const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
    selectedTask.complete = e.target.checked
    save()
    renderTaskCount(selectedList)
  }
})

clearCompleteTasksButton.addEventListener('click', e => {
  const selectedList = lists.find(list => list.id === selectedListId)
  selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
  saveAndRender()
})

deleteListButton.addEventListener('click', e => {
  lists = lists.filter(list => list.id !== selectedListId)
  selectedListId = null
  saveAndRender()
})

newListForm.addEventListener('submit', e => {
  e.preventDefault()
  const listName = newListInput.value
  if (listName == null || listName === '') return
  const list = createList(listName)
  newListInput.value = null
  lists.push(list)
  saveAndRender()
})

newTaskForm.addEventListener('submit', e => {
  e.preventDefault()
  const taskName = newTaskInput.value
  if (taskName == null || taskName === '') return
  const task = createTask(taskName)
  newTaskInput.value = null
  const selectedList = lists.find(list => list.id === selectedListId)
  selectedList.tasks.push(task)
  saveAndRender()
})

function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] }
}

function createTask(name) {
  return { id: Date.now().toString(), name: name, complete: false }
}

function saveAndRender() {
  save()
  render()
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

function render() {
  clearElement(listsContainer)
  renderLists()

  const selectedList = lists.find(list => list.id === selectedListId)
  if (selectedListId == null) {
    listDisplayContainer.style.display = 'none'
  } else {
    listDisplayContainer.style.display = ''
    listTitleElement.innerText = selectedList.name
    renderTaskCount(selectedList)
    clearElement(tasksContainer)
    renderTasks(selectedList)
  }
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true)
    const checkbox = taskElement.querySelector('input')
    checkbox.id = task.id
    checkbox.checked = task.complete
    const label = taskElement.querySelector('label')
    label.htmlFor = task.id
    label.append(task.name)
    tasksContainer.appendChild(taskElement)
  })
}

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
}

function renderLists() {
  lists.forEach(list => {
    const listElement = document.createElement('li')
    listElement.dataset.listId = list.id
    listElement.classList.add("list-name")
    listElement.innerText = list.name
    if (list.id === selectedListId) {
      listElement.classList.add('active-list')
    }
    listsContainer.appendChild(listElement)
  })
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

render()


