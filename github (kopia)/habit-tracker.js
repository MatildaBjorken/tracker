//main list



// target from html
const addBtn = document.querySelector('.addBtn')
const habitInput = document.querySelector('.habit-input')
const habitList = document.querySelector('.habit-list')
const errorEmpty = document.querySelector('.error')
const newWeek = document.querySelector('.btn')
const clearAll = document.querySelector('.clear-all')
const condition = document.querySelector("#condition")
const weekSection = document.getElementById('btn');
const changeBtn = document.querySelector('.items')
let colorChoice = document.getElementById('pick-color').value






//local storage
document.addEventListener('DOMContentLoaded', getHabits)
//event listeners

addBtn.addEventListener('click', addHabit)
habitList.addEventListener('click', deleteAction)
//changeBtn.addEventListener('click', colorChange)
clearAll.addEventListener('click', removeAll)



//remove all btn


function removeAll() {
  location.reload()
  localStorage.clear()
      /*const item = e.target
      const removeBtn = document.querySelector('.items')
      const habit = item.parentElement
      removeAllHabits(habit)
      removeBtn.innerHTML = '';
      // Clear items on local storage array */
}


//hit enter insead of add btn
document.addEventListener('keypress', function(enter) {
  if (enter.keyCode === 13 || enter.which === 13) {
    addHabit(event)
  };
});

//function for changing color of the habits
/*
function colorChange(x) {
 
  const button = x.target
  
  if (button.classList[0]=== 'check') {
    condition.textContent = "nice work!"
    const color = button
    color.classList.toggle('c')
    const habit = button.parentElement
    saveButtons(button)

  } else {
    const color = button
    color.classList.remove('c')
  }
 
}
*/
/*
function colorChange(x) {

  const button = x.target
  if (button.classList[0] === 'check') {
      condition.textContent = "nice work!"
   
      const color = button
      color.classList.toggle('c') 
      saveButtons(button)

  } else {
      const color = button
      color.classList.remove('c')
  }
}
*/

document.getElementById("pick-color").onchange = function() {
  backHEX = this.value;
  colorChoice = backHEX;
}

document.addEventListener('click', function (event){
  const element=event.target;
 
  if (element.classList.contains('check')) {
      element.style.backgroundColor = element.parentNode.id;
      if (element.classList.contains('selected')) {
    
       
          element.classList.remove('selected')
          element.style.backgroundColor = colorChoice
        } else {
        element.classList.add('selected')
      
        element.style.backgroundColor = element.parentNode.id;
      }
  }})


const setBg = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
  setBg();
}



//function for adding habits

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


         //ADD HABIT TO LOCAL STORAGE
        saveLocalHabits(habitInput.value);
        //check 

        //edit
        //const editHabit = document.createElement('button');
        //editHabit.classList.add('edit-btn')
        //editHabit.innerHTML = '<p class="editBtn">edit</p>'
        //habitDiv.appendChild(editHabit)

        //checkboxes adding using inner HTML

        //creates the row of buttons
        const checkHabit = document.createElement('row')
        checkHabit.innerHTML = 
        `
      
           
        <div class="habitname ib"  style = color:${colorChoice}>
        <div class="row row-yellow" id = ${colorChoice}>
        <div class= "selected"><button id="1"class="check"></button><button id="2"class="check"></button><button id="3" class="check"></button><button id="4" class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button></div>
        </div></div>
    
     
    `
      

        checkHabit.classList.add('table-check')
        
        
        habitDiv.appendChild(checkHabit)

 
        rowCounter = 0

        let name = 'habit'
        
        function createButtons (name) {
          rowCounter++
          for (let i = 0; i < 7; i++) {
            let button = document.createElement('button')
            button.classList.add('circle')
            habitDiv.appendChild(button)
            button.addEventListener('click', completeHabit.bind(button, name))
            button.setAttribute('data-weekday', `${rowCounter}-${i}`)
            
            
            
          }
          document.getElementById("pick-color").onchange = function() {
            backHEX = this.value;
            colorChoice = backHEX;
          }
          
          document.addEventListener('click', function (event){
            const element=event.target;
            if (element.classList.contains('circle')) {
                element.style.backgroundColor = element.parentNode.id;
                
                element.classList.remove('selected')
                if (element.classList.contains('selected')) {
                 
                    element.classList.remove('selected')
                    element.style.backgroundColor = colorChoice
                  } else {
                  element.classList.add('selected')
                  
                  element.style.backgroundColor = element.parentNode.id;
                }
            }})
        }
        
        createButtons(name)
        //createButtons('new habit')
        
        function completeHabit (name) {
          console.log(this.parentNode)
          console.log(name)
          alert(this.getAttribute('data-weekday'))
          this.classList.toggle('circle')
          // saveHabittoData(name)
        }

       
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

      
      condition.textContent = "byee..!"
      habit.remove()
      removeLocalHabits(habit);
  }


}

//set count

//counter in list


//local storage
function saveLocalHabits(habit) {
  //CHECK IF I ALREADY HAVE THINGS IN THERE
  let habits;
  if (localStorage.getItem('habits') === null) {
      habits = [];
  } else {
    //assuming that stuff exist, parse it back to an array
      habits = JSON.parse(localStorage.getItem('habits'));
  }

  habits.push(habit);
  //set it back into local Storage
  localStorage.setItem('habits', JSON.stringify(habits));
}

function getHabits() {
  //CHECK IF I ALREADY HAVE THINGS IN THERE
  let habits;
  if (localStorage.getItem('habits') === null) {
      habits = [];
  } else {
      habits = JSON.parse(localStorage.getItem('habits'));
  }

//loop over them
  habits.forEach(function(habit) {
      //if the field is empty
      if (habitInput.value === '') {
          errorEmpty.classList.remove('hidden')
          
          // Remove error after 3 seconds
         

      } else {

      }
      errorEmpty.classList.add('hidden')
    
      //create a habit div

      const habitDiv = document.createElement('div')
      habitDiv.classList.add('habits')

      //trash btn
      const trashHabit = document.createElement('button')
      trashHabit.innerHTML = '<p class="removeBtn">-</p>'
      trashHabit.classList.add('trash-btn')
      habitDiv.appendChild(trashHabit)

      //create li
      const newHabit = document.createElement('li')
      newHabit.innerText = habit
      newHabit.classList.add('habit-item')
      habitDiv.appendChild(newHabit)

      //checkboxes adding using inner HTML
      const checkHabit = document.createElement('row')
      checkHabit.innerHTML =
      '<div class= "selected"><button id="1"class="check"></button><button id="2"class="check"></button><button id="3" class="check"></button><button id="4" class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button></div>'

      checkHabit.classList.add('table-check')
      habitDiv.appendChild(checkHabit)

      rowCounter = 0

let name = 'habit'

function createButtons (name) {
  rowCounter++
  for (let i = 0; i < 6; i++) {
    let button = document.createElement('button')
    button.classList.add('circle')
    habitDiv.appendChild(button)
    button.addEventListener('click', completeHabit.bind(button, name))
    button.setAttribute('data-weekday', `${rowCounter}-${i}`)
  }
}

createButtons(name)

function completeHabit (name) {
  console.log(this.parentNode)
  console.log(name)
  alert(this.getAttribute('data-weekday'))
  this.classList.toggle('circle')
  // saveHabittoData(name)
}

      //append to list
      habitList.appendChild(habitDiv)
  });
}


function saveButtons(button) {
  let buttons;
  if (localStorage.getItem('c') === null) {
      button = [];
    
  } else {
    buttons= JSON.parse(localStorage.getItem('check'));
  }

  localStorage.setItem('c', JSON.stringify(buttons));

  alert(button.name)
  if ((button.classList[0])=== 'c') {
    alert('f')
  }
  //const habitIndex = (button.innerText)
  //habits.splice(habits.indexOf(habitIndex) ,1);
  //localStorage.setItem('check', JSON.stringify(buttons));
}


function removeLocalHabits(habit) {
  let habits;
  if (localStorage.getItem('habits') === null) {
      habits = [];
  } else {
      habits = JSON.parse(localStorage.getItem('habits'));
  }
  const habitIndex = (habit.children[1].innerText)
  habits.splice(habits.indexOf(habitIndex) ,1);
  localStorage.setItem('habits', JSON.stringify(habits));

}

function removeAllHabits(habit) {
  let habits;
  if (localStorage.getItem('habits') === null) {
      habits = [];
  } else {
      habits = JSON.parse(localStorage.getItem('habits'));
  }
  const habitIndex = (habit.children[0].innerText)
  habits.splice(habits.indexOf(habitIndex).length);
  localStorage.setItem('habits', JSON.stringify(habits));

}


//get week
const weekElement = document.getElementById('week')


function getWeekNumber(d) {

  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);

  return [d.getUTCFullYear(), weekNo];
}

var result = getWeekNumber(new Date());



weekElement.innerHTML='week ' + result[1] + ' of ' + result[0]



const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitle = document.querySelector('[data-list-title]')
const habitContainer = document.querySelector('[data-tasks]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [] //store the list
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY) //get this info 


newListForm.addEventListener('submit', e => {
  e.preventDefault()
  const listName = newListInput.value
  if (listName == null || listName === '') return
  
  const list = createList(listName)
  newListInput.value = null
  lists.push(list)
  saveAndRender()
})

function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] }
}

function saveAndRender() {
  save()
  render()
}
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}


listsContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId
    saveAndRender()
  }
})

deleteListButton.addEventListener('click', e => {
  const selectedList = lists.find(list => list.id === selectedListId)
  selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
  saveAndRender()
})

deleteListButton.addEventListener('click', e => {
  lists = lists.filter(list => list.id !== selectedListId)
  selectedListId = null
  saveAndRender()
})

function render() {
  clearElement(listsContainer)
 
  renderList()
  const selectedList = lists.find(list => list.id === selectedListId)
  if (selectedListId == null) {
    listDisplayContainer.style.display = 'none'
  } else {
    listDisplayContainer.style.display = ''
    listTitle.innerText = selectedList.name
    
  }
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach(task => {
    addHabit(event)
  })
}

function renderList(){
  clearElement(listsContainer)//what we want to clear
  lists.forEach(list => {
    const listElement = document.createElement('li')//create a li
    listElement.dataset.listId = list.id
    listElement.classList.add('list-name')//add a class to it
    listElement.innerText = list.name//set the name, text inside of it
    if (list.id === selectedListId) {
      listElement.classList.add('active-list')
    }
  
    listsContainer.appendChild(listElement)//append to the listcontainer
  })
}

function clearElement(element) {
  while(element.firstChild){// if the element has a first  hild, remove
    element.removeChild(element.firstChild)
  }
}


render()// everytime render is called, clear items

