
// target from html
const addBtn = document.querySelector('.addBtn')
const habitInput = document.querySelector('#habit-name')
const habitColorInput = document.querySelector('#habit-color')
const habitList = document.querySelector('#habit-list')
const errorEmpty = document.querySelector('.error')
const newWeek = document.querySelector('.btn')

//class eventName {
//    constructor(event) {
//        this.createDiv(event)
//    }
//}

//event listeners
addBtn.addEventListener('click', addHabit)
// habitList.addEventListener('click', deleteAction)
// newWeek.addEventListener('click', addWeek)
document.addEventListener('click', function (event) {
  const element = event.target;
  if(element.classList.contains('habit-day')){
    if (element.classList.contains('selected')) {
      element.style.backgroundColor = '#00000038';
      element.classList.remove('selected');
    } else {
      const color = element.parentElement.parentElement.getElementsByTagName('input')[0].value;
      element.style.backgroundColor = color;
      element.classList.add('selected');
    }
  }
});




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
        // errorEmpty.classList.remove('hidden')
        alert("please insert habit name");
    
    }else {
        // errorEmpty.classList.add('hidden')
        //create a habit div
       
        const habitName = habitInput.value;
        const habitClolor = habitColorInput.value;
        let sample = `
        <tr>
              <input type="hidden" value="${habitClolor}">
              <td><button onclick = "habitRemover(this)">remove</button></td>
              <td style="color:${habitClolor}">${habitName}</td>
              <td><span class="habit-day"></span></td>
              <td><span class="habit-day"></span></td>
              <td><span class="habit-day"></span></td>
              <td><span class="habit-day"></span></td>
              <td><span class="habit-day"></span></td>
              <td><span class="habit-day"></span></td>
              <td><span class="habit-day"></span></td>
        </tr>
        `;
      habitList.innerHTML = habitList.innerHTML + sample;
        
    }  
    
    //to clear the input after adding
    habitInput.value= ''
    
}

function habitRemover(element)
{
  element.parentElement.parentElement.remove();
}

//remove btn
function deleteAction(e) {
  const item = e.target
  if (item.classList[0]=== 'trash-btn'){
      const habit = item.parentElement
      habit.remove()
  }
}


//function

//list

//element.insertAdjacentHTML(beforeend,text)



function addWeek(x) {
  const section = document.createElement('section');
  section.setAttribute('id', 1);
  document.getElementById('wrapper').appendChild(section); 
  var h3 = document.createElement('h3');
  h3.innerText = document.getElementById('sectionText').value;
  section.appendChild(h3);
  var input = document.createElement('INPUT');
  input.setAttribute('type', 'text')
  section.appendChild(input);
  var btn = document.createElement('button');
  btn.innerText = 'New List Item'
  section.appendChild(btn);
}

/*
var a = document.getElementById('btn');
a.addEventListener('click', function() {
  var section = document.createElement('section');
  section.setAttribute('id', 1);
  document.getElementById('wrapper').appendChild(section); 
  var h3 = document.createElement('h3');
  h3.innerText = document.getElementById('sectionText').value;
  section.appendChild(h3);
  var input = document.createElement('INPUT');
  input.setAttribute('type', 'text')
  section.appendChild(input);
  var btn = document.createElement('button');
  btn.innerText = 'New List Item'
  section.appendChild(btn);

  btn.addEventListener('click', function() {
    var div = document.createElement('div');
    div.setAttribute('class', 'listItem');
    var checkbox = document.createElement('INPUT');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', 'checker');
    div.appendChild(checkbox);
    var span = document.createElement('span')
    span.innerText = this.previousElementSibling.value;
    div.appendChild(span);
    input.parentNode.insertBefore(div, input);
  }, false);
})

*/