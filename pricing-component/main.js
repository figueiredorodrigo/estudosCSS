const checkBox = document.getElementById('switch');
const basic = document.getElementById('basic');
const professional = document.getElementById('professional');
const master = document.getElementById('master');

checkBox.addEventListener('change', () => {
    if(checkBox.checked) {
        basic.innerText = '19.99';
        professional.innerText = '24.99';
        master.innerText = '39.99';
    } else {
        basic.innerText = '199.99';
        professional.innerText = '249.99';
        master.innerText = '399.99';
    }
})

