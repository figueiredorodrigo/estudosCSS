const notesContainer = document.querySelector('#notes-container');
const noteInput = document.querySelector('#note-content');
const addNoteBtn = document.querySelector('.add-note');


//Funcoes
function showNotes() {
    cleanNotes();
    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content);

        notesContainer.appendChild(noteElement);
    })
}

function cleanNotes() {
    notesContainer.replaceChildren([]);
}

function addNote() {
    const notes = getNotes();

  const noteObject = {
    id: generatedId(),
    content: noteInput.value,
  };  

  const noteElement = createNote(noteObject.id, noteObject.content);
  notesContainer.appendChild(noteElement);

  notes.push(noteObject);
  
  saveNotes(notes);

  noteInput.value = "";
}


function generatedId() {
    return Math.floor(Math.random() * 5000);
}

function createNote(id, content) {

    const element = document.createElement("ul");
        element.classList.add('notes-container');
        const liElement = document.createElement("li");
        liElement.classList.add('notesLi');
        element.appendChild(liElement);

        const elementText = document.createElement('p');
        elementText.classList.add('notesP')
        elementText.textContent = content;
        liElement.appendChild(elementText)
        

        const trashIcon = document.createElement("ion-icon");
        trashIcon.setAttribute('name', 'trash-outline');
        trashIcon.classList.add('trash');
        liElement.appendChild(trashIcon);
        element.querySelector('.trash').addEventListener('click', () => {
            deleteNote(id, element);
    });

    noteInput.focus();
    return element;
}


function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id !== id);

    saveNotes(notes);

    notesContainer.removeChild(element);
}


function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes))
}

function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    return notes;
}

noteInput.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        addNote();
    }
});


//Eventos
addNoteBtn.addEventListener('click', () => addNote());

showNotes()