let add_btn = document.getElementById("add_button");
let notesObj;
let notesTitleObj;
showNotes();
showTitle()

add_btn.addEventListener("click",()=>{
    let textarea = document.getElementById("textarea");
    let titleInput = document.getElementById("title-input");
    let notes = localStorage.getItem("notes");
    let notesTitle = localStorage.getItem("notesTitle");
    if(notes == null){
        notesObj = [];
        notesTitleObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
        notesTitleObj = JSON.parse(notesTitle);
    }
    notesObj.push(textarea.value);
    if(titleInput.value === ""){
        notesTitleObj.push(`Note ${notesObj.length}`)
    }
    else{
        notesTitleObj.push(titleInput.value);
    }
    localStorage.setItem("notes",JSON.stringify(notesObj));
    localStorage.setItem("notesTitle",JSON.stringify(notesTitleObj));
    textarea.value = "";
    titleInput.value = "";
    showNotes();
    showTitle();
})

function showNotes(){
    let notes = localStorage.getItem("notes");
    let notesObj = JSON.parse(notes);
    let html = "";
    let note_div = document.querySelector(".notes");
    if(notes !== null && notesObj.length !== 0){
        notesObj.forEach((element, index)=>{
            html += `<div class="note-pad">
                    <h3 class="note-pad-title">Note ${index+1}</h3>
                    <p class="note-pad-p">${element}</p>
                    <button type="button" class="delete-button" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
                </div>`
        })
        note_div.innerHTML = html;
    }
    else{
        note_div.innerHTML = `<p class="note-pad-p">Nothing to show! Use "Add a note" section to add notes</p>`
    }
}

function deleteNote(index){
    let note = localStorage.getItem("notes");
    let noteObj = JSON.parse(note);
    let title = localStorage.getItem("notesTitle")
    let titleObj = JSON.parse(title);
    noteObj.splice(index,1);
    titleObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(noteObj));
    localStorage.setItem("notesTitle",JSON.stringify(titleObj));
    showNotes();
    showTitle();
}

function search(){
    let input = document.getElementById("search-txt");
    let notesPad = document.getElementsByClassName("note-pad")
    Array.from(notesPad).forEach((element)=>{
        let noteText = element.getElementsByTagName("p")[0].textContent;
        let noteTitle = element.getElementsByTagName("h3")[0].textContent;
        if(noteText.toLowerCase().includes(input.value.toLowerCase()) || noteTitle.toLowerCase().includes(input.value.toLowerCase())){
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
}

function showTitle(){
    let titles = document.getElementsByClassName("note-pad-title");
    let titlesArray = Array.from(titles);
    let noteTitle = localStorage.getItem("notesTitle");
    let noteTitleObj = JSON.parse(noteTitle);
    if(noteTitle == null){
        return;
    }
    for (let i = 0; i < noteTitleObj.length; i++) {
        titlesArray[i].innerText = noteTitleObj[i];
    }
}