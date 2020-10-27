//main list



// target from html
const addBtn = document.querySelector('.addBtn')
const addColor = document.querySelector('.btn-color')
const habitInput = document.querySelector('.habit-input')
const habitList = document.querySelector('.habit-list')
const errorEmpty = document.querySelector('.error')
const newWeek = document.querySelector('.btn')
const clearAll = document.querySelector('.clear-all')
const condition = document.querySelector("#condition")
    //const checkBox = document.querySelector(".check")

const changeBtn = document.querySelector('.items')


//local storage
document.addEventListener('DOMContentLoaded', getHabits)
    //event listeners
    //checkBox.addEventListener('click', addColorCheck)
addColor.addEventListener('click', addColorInput)
addBtn.addEventListener('click', addHabit)
habitList.addEventListener('click', deleteAction)
changeBtn.addEventListener('click', colorChange)
clearAll.addEventListener('click', removeAll)

//remove all btn
function addColorCheck(e) {

    if (document.querySelector(".check").value) {
        console.log('bedew');
    }
}

function removeAll(e) {
    const item = e.target
    const removeBtn = document.querySelector('.items')
    const habit = item.parentElement

    removeAllHabits(habit)

    removeBtn.innerHTML = '';
    // Clear items on local storage array

}

function addColorInput(e) {


    document.getElementById('habit-input').style.color = document.getElementById('favcolor').value;

    // document.getElementById('sectionText').style.color = document.getElementById('favcolor').value;

}

//hit enter insead of add btn
document.addEventListener('keypress', function(enter) {
    if (enter.keyCode === 13 || enter.which === 13) {
        addHabit(event)
    };
});


//function for changing color of the habits

function colorChange(x) {

    const button = x.target

    if (button.classList[0] === 'check') {
        condition.textContent = "nice work!"
        const color = button
        color.classList.toggle('c')
        const habit = button.parentElement
        saveButtons(habit)

    } else {
        const color = button
        color.classList.remove('c')
    }

}

//function for adding habits

function addHabit(event) {
    //prevent form from submitting
    event.preventDefault()

    //if the field is empty
    if (habitInput.value === '') {
        errorEmpty.classList.remove('hidden')

    } else {
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
        newHabit.style.color = document.getElementById('favcolor').value;
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
            '<div class= "selected"><button class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button></div>'

        checkHabit.classList.add('table-check')
            // checkHabit.div.button.style.backgroundColor = color_value;
        let color_value = document.getElementById('favcolor').value;
        //checkHabit.style.backgroundColor = color_value;
        // checkHabit.style.border = '.2em solid' + color_value;



        habitDiv.appendChild(checkHabit)

        //append to list

        habitList.appendChild(habitDiv)


    }

    //to clear the input after adding
    habitInput.value = ''
    condition.textContent = "there u go!"

}



//remove btn
function deleteAction(e) {
    const item = e.target
    if (item.classList[0] === 'trash-btn') {
        const habit = item.parentElement


        condition.textContent = "hope youre not cheating..!"
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
            '<div class= "selected"><button class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button><button class="check"></button></div>'

        checkHabit.classList.add('table-check')
        habitDiv.appendChild(checkHabit)

        //append to list
        habitList.appendChild(habitDiv)
    });
}

function saveButtons(habit) {
    let habits;
    if (localStorage.getItem('habits') === null) {
        habits = [];
    } else {
        habits = JSON.parse(localStorage.getItem('habits'));
    }
    //save buttons in local storage
    const habitIndex = (habit.classList[0] === 'check'.innerText)
        //habits.classList(habits.indexOf(habitIndex) ,1);
    localStorage.setItem('habits', JSON.stringify(habits));

}
/*
function colorChange(x) {
 
  const button = x.target
  
  if (button.classList[0]=== 'check') {
    condition.textContent = "nice work!"
    const color = button
    color.classList.toggle('c')
    saveLocalHabits(habit)

  } else {
    const color = button
    color.classList.remove('c')
  }
 
}
*/
function removeLocalHabits(habit) {
    let habits;
    if (localStorage.getItem('habits') === null) {
        habits = [];
    } else {
        habits = JSON.parse(localStorage.getItem('habits'));
    }
    const habitIndex = (habit.children[1].innerText)
    habits.splice(habits.indexOf(habitIndex), 1);
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
    habits.pop(habits.indexOf(habitIndex.length));
    localStorage.setItem('habits', JSON.stringify(habits));

}


//get week
const weekElement = document.getElementById('week')


function getWeekNumber(d) {

    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

    return [d.getUTCFullYear(), weekNo];
}

var result = getWeekNumber(new Date());



weekElement.innerHTML = 'week ' + result[1] + ' of ' + result[0]