// DATA
let today = new Date();
const dayNumber = today.getDate();
const year = today.getFullYear();
const dayName = today.toLocaleString("pt-BR", {weekday: "long"});
const monthName = today.toLocaleString("pt-BR", {month: "short"});

document.querySelector('.month-name').innerHTML = monthName;
document.querySelector('.day-name').innerHTML = dayName;
document.querySelector('.year').innerHTML = year;
document.querySelector('.day-number').innerHTML = dayNumber;

// Variaveis START
const time = document.querySelector('#tempo');
const pausa = document.querySelector('#pausa');
const sections = document.querySelector('#sessoes');
const start = document.querySelector('.btn-start');

let minutes = document.querySelector('.minutes');
let sec = document.querySelector('.seconds');
let seconds;

const btnStart = document.querySelector('.btn-restart');
const input = document.querySelector('.input-container');
const timer = document.querySelector('.timer');
const finalPomodoro = document.querySelector('.final-container');
const closeModal = document.querySelector('.close');

//Audios
let begin = new Audio("./assets/start.mp3");
let back = new Audio("./assets/back.mp3");
let final = new Audio("./assets/final.mp3");
let pauseAudio = new Audio("./assets/pausa.mp3")

// Header play/pause
let lofi = document.getElementById('lofi');
let pause = document.querySelector('.pause');
let play = document.querySelector('.play');

//To-do-list
const notesContainer = document.querySelector('.create-tasks');
const noteInput = document.querySelector('.new-task-input');
const addNoteBtn = document.querySelector('.new-task-button');

//Eventlisteners
start.addEventListener('click', pomodoro);
pause.addEventListener('click', pausar);
play.addEventListener('click', executar);
//Eventlisteners closeModal
closeModal.addEventListener('click', () => {
    document.querySelector('.modal-tutorial').style.display = 'none';
});
//Eventlisteners reiniciar o pomodoro
btnStart.addEventListener('click', () => {
    let tutorialStorage = Number(localStorage.getItem('tutorial'));
    if (tutorialStorage == '') {
        localStorage.setItem('tutorial', 1);
    }else {
        document.querySelector('.modal-tutorial').style.display = 'none';
    }
    location.reload();
});
//Eventlisteners adicionar to-do-list
addNoteBtn.addEventListener('click', addNote);

noteInput.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        addNote();
    }
});

// LocalStorage tutorial
let tutorialStorage = Number(localStorage.getItem('tutorial'));
if (tutorialStorage == '') {
    localStorage.setItem('tutorial', 1);
}else {
    document.querySelector('.modal-tutorial').style.display = 'none';
}

// regex
let regex = /^[0123456789]+$/;

// Função para pausar a musica tirar o botão pause e colocar o play
function pausar(){
    lofi.pause()
    play.style.display = 'block';
    pause.style.display = 'none';
 }
 
 // Função para tocar a musica tirar o botão play e colocar o pause
 function executar(){
    lofi.play();
    play.style.display = 'none';
    pause.style.display = 'block';
 }

function pomodoro() {
    
    if (regex.test(time.value) == false || time.value == 0)  {
        setTimeout(function() {
            time.style.border = "none";
        }, 3000);
            time.style.border = "thick solid #F00";
            time.focus();
    } else if (regex.test(pausa.value) == false || time.value == 0) {
        setTimeout(function() {
            pausa.style.border = "none";
        }, 3000);
            pausa.style.border = "thick solid #F00";
            pausa.focus();
    } else if (regex.test(sessoes.value) == false || time.value == 0) {
        setTimeout(function() {
            sessoes.style.border = "none";
        }, 3000);
            sessoes.style.border = "thick solid #F00";
            sessoes.focus();
    } else {
        lofi.play();
        pause.style.display = 'block';
        
        localStorage.setItem('time', String(time.value));
        localStorage.setItem('pausa', String(pausa.value));
        localStorage.setItem('sessoes', String(sections.value));

        input.style.display = 'none';
        timer.style.display = 'flex';
        begin.play();
        count();
    }
}

function count() {
    let sectionsValue = localStorage.getItem('sessoes');

    if (sectionsValue != 1) {
        document.querySelector('.title-section').innerHTML = `${sectionsValue} sessões restantes` ;
    } else {
        document.querySelector('.title-section').innerHTML = `${sectionsValue} sessão restante` ;
    }

    let actionTitle = document.querySelector('.action-title');
    actionTitle.innerHTML = 'TEMPO RESTANTE';

    min = Number(localStorage.getItem('time'));
    min -= 1;
    seconds = 59;

    minutes.innerHTML = min;
    sec.innerHTML = seconds;

    let minInterval = setInterval(function() {
        min -= 1;
        minutes.innerHTML = min;
    }, 60000);
    let secInterval = setInterval(function() {
        seconds -= 1;
        if (seconds < 10) {
            sec.innerHTML = `0${seconds}`;
        } else {
            sec.innerHTML = seconds;
        }
        if (seconds <= 0) { 
            if (min <= 0) {
                clearInterval(minInterval);
                clearInterval(secInterval);

                pauseAudio.play();
                window.navigator.vibrate(900);

                timePomodoro();
        }
        seconds = 60;
    }
    }, 1000);
}

function timePomodoro() {
    let actionTitle = document.querySelector('.action-title');
    actionTitle.innerHTML = 'PAUSA';

    let minPausa = Number(localStorage.getItem('pausa'));
    minPausa -= 1;
    seconds = 59;

    minutes.innerHTML = minPausa;
    sec.innerHTML = seconds;

    let minInterval = setInterval(function() {
        min -= 1;
        minutes.innerHTML = min;
    }, 60000);

    let secInterval = setInterval(function() {
        seconds -= 1;
        if (seconds < 10) {
            sec.innerHTML = `0${seconds}`;
        } else {
            sec.innerHTML = seconds;
        }
        if (seconds <= 0) { 
            if (minPausa <= 0) {
                ses = Number(localStorage.getItem('sessoes'));
                ses -= 1;
                localStorage.setItem('sessoes', String(ses));

                clearInterval(minInterval);
                clearInterval(secInterval);

                if (ses <= 0) {
                    final.play();
                    localStorage.removeItem("time");
                    localStorage.removeItem("pausa");
                    localStorage.removeItem("sessoes");
                    lofi.pause();
                    window.navigator.vibrate(900);

                    timer.style.display = 'none';
                    finalPomodoro.style.display = 'flex';
                } else {
                    begin.play();
                    count();
                }
        }
        seconds = 60;
        }
    }, 1000);
}

function addNote() {
    if (noteInput.value == '') {
        setTimeout(function() {
            noteInput.classList.remove('error');
        }, 2000);
        noteInput.classList.add('error');
    } else {
        let inputValue = noteInput.value;
        let getLocalStorage = localStorage.getItem("New Todo");
        if (getLocalStorage == null) {
            listArray = []
        } else {
            listArray = JSON.parse(getLocalStorage);
        }
    
        listArray.push(inputValue);
        localStorage.setItem("New Todo", JSON.stringify(listArray));
        atualizaTasks();
    }
}

function atualizaTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArray = []
    } else {
        listArray = JSON.parse(getLocalStorage);
    }
    let newTag = '';
    listArray.forEach((element, index) => {
        newTag += `<ul class="notes-container">
        <li class="notesLi">
            <p class="notesP">${element}</p>
            <ion-icon name="trash-outline" class="trash" onclick="deleteTask(${index})"></ion-icon>
        </li>
    </ul> `
    });

    notesContainer.innerHTML = newTag;
    noteInput.value = '';
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorage);
    listArray.splice(index, 1); 
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    atualizaTasks(); 
  }

atualizaTasks();
