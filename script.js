function renderTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let ul = document.querySelector('ul');
    ul.innerHTML = ''; 

    tasks.forEach(task => {
        let elmnt = document.createElement('li');
        let btn1 = document.createElement('button');
        let btn2 = document.createElement('button');
        btn1.innerText = "Done";
        btn2.innerText = "Delete";
        elmnt.innerText = task.text;

        btn1.classList.add('done');
        btn2.classList.add('delete');

        if (task.isDone) {
            elmnt.style.textDecoration = "line-through";
        }

        let ul = document.querySelector('ul');
         
        ul.appendChild(elmnt);
        elmnt.appendChild(btn1);
        elmnt.appendChild(btn2);
        
        btn1.style.border = "none";
        btn1.style.margin = "2%";
        btn1.style.borderRadius = "8px";
        btn1.style.backgroundColor = "#DEB57F";

        btn2.style.border = "none";
        btn2.style.margin = "2%";
        btn2.style.borderRadius = "8px";
        btn2.style.backgroundColor = "#DEB57F";

        
        btn1.addEventListener('click', function () {
            task.isDone = !task.isDone;
            saveTasks(tasks);
            renderTasks();
        });

        btn2.addEventListener('click', function () {
            tasks = tasks.filter(t => t !== task);
            saveTasks(tasks);
            renderTasks();
        });
    });
}


function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById('input').value;
    if (input.trim() !== "") {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: input, isDone: false });
        saveTasks(tasks);
        renderTasks();
        document.getElementById('input').value = ""; // Clear input field
    }
}

document.getElementById('btn').addEventListener('click', function () {
    addTask();
});


document.getElementById('input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask(); 
    }
});

window.onload = function () {
    renderTasks();
};
