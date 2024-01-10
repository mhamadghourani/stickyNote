let addNote = document.querySelector(".addNote")
let popUp = document.querySelector(".popup")
let closePopUp = document.getElementById('close-popup')
let createBtn = document.getElementById('create')
let title = document.getElementById('title');
let subject = document.getElementById('subject');
let dateN = document.getElementById('date')
let popupTitle = document.getElementById('popup-title')
let mood = "create";
let tmp;
// ====================================================================================
addNote.addEventListener('click', ()=> {
    popUp.removeAttribute('id')

})
closePopUp.addEventListener('click', ()=>{
    popUp.id='popuptoggle'; 
     
    
})
// ====================================================================================
let currentDate = new Date();
let options = { month: 'long', day: 'numeric', year:'numeric'};
let formattedDate = currentDate.toLocaleDateString('en-US', options);
// ====================================================================================

let dataNote;
if(localStorage.newNote != null){
    dataNote = JSON.parse(localStorage.newNote)
}
else{
    dataNote = [];
}
console.log(dataNote)

createBtn.onclick = function(){
    let newNote = {
        title:title.value,
        subject:subject.value,
        dateN:formattedDate,
    }
    if(mood == 'create' && title.value !='' && subject.value != ''){
        dataNote.push(newNote);
  
    }
    else{
dataNote[tmp] = newNote;
createBtn.innerHTML= "Create"
popupTitle.innerHTML = "Add new note"
mood = 'create'
clearInput()
    }
    localStorage.setItem('newNote', JSON.stringify(dataNote))
  clearInput()
  showNotes()
  location.reload()

    
}
// ==============================================================================
function clearInput(){
    title.value = '';
    subject.value ='';
    popUp.id='popuptoggle';  
}
// ==============================================================================

function showNotes() {
    let notes = '';
    for (let i = 0; i < dataNote.length; i++) {
        notes += `
        <div class="note">
            <h2>${dataNote[i].title}</h2>
            <p>${dataNote[i].subject}</p>
            <div><p>${dataNote[i].dateN}</p><button onclick="showOption(${i})"><img src="./resources/dots.png"  id="option"></button>
                <span id="option-cont" class="option-toggle">
                    <button onclick="deleteNote(${i})"><img src="./resources/delete.png">Delete</button>
                    <button onclick="updateNote(${i})"><img src="./resources/edit.png">Edit</button>
                </span></div>
          </div>
        `;
    }
    document.querySelector('.notes').innerHTML = notes;
}
showNotes()
// ===============================================================================
function showOption(i) {
    let optionCont = document.getElementsByTagName('span')[i];
    optionCont.classList.toggle('option-toggle');
}
// ===============================================================================
function deleteNote(i){
   dataNote.splice(i,1)
   localStorage.newNote = JSON.stringify(dataNote)
   showNotes()
   location.reload()
}
// ================================================================================
function updateNote(i){
    title.value = dataNote[i].title
    subject.value = dataNote[i].subject
    popUp.removeAttribute('id') 
    createBtn.innerHTML = " Update"
    popupTitle.innerHTML = "Update note"
    tmp = i;
    showOption(i)
    mood = "update"
}
// ================================================================================
let welcome = document.getElementById('wlc-img')
 function hek(){
    if (dataNote.length >= 1 ){
        welcome.classList ='wlc-hide'
    }
    else{
        welcome.removeAttribute('class')
    }

}
hek()
// ================================================================================
