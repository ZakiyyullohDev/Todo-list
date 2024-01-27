const todoInput = document.getElementById('todoInput');
const todoAddBtn = document.getElementById('todoAddBtn');
const todoUl = document.getElementById('todoUl');
const deleteTodoBtn = document.getElementById('deleteTodo')
let todos = JSON.parse(localStorage.getItem('Todolar')) || [];
let todoList = todos.slice(); 

const addTodoLocalStorage = () => {
    localStorage.setItem('Todolar', JSON.stringify(todoList));
};

const getTodoFromLocalStorage = () => {
    todos.forEach(todoText => {
        const todoLi = document.createElement('li');
        todoLi.textContent = todoText;
        todoLi.classList.add('todo-li');
        todoUl.appendChild(todoLi);
    });
    
    todoUl.classList.remove('display-none');
    
};

getTodoFromLocalStorage();

const addTodo = () => {
    const todoInputValue = todoInput.value.trim();
    
    if (todoInputValue === '') {
        alert('Iltimos todo kiriting!');
        return;
    } else{
        const todoLi = document.createElement('li');
        todoLi.textContent = todoInputValue;
        todoLi.classList.add('todo-li');
        todoUl.appendChild(todoLi);
        todoList.push(todoInputValue);
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('deleteTodoBtn')
        todoLi.appendChild(deleteBtn)
        
        addTodoLocalStorage();
        todoInput.value = '';
        // deleteTodoBtn.addEventListener('click', ()=> {
        // })
    }
};

todoAddBtn.addEventListener('click', ()=> {
    addTodo()
});

todoUl.classList.remove('display-none')
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});
