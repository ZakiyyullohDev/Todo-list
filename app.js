import { uuidv4 } from "./js/uuid.js";

const todoList = JSON.parse(localStorage.getItem('todos')) || [];
let allDeleteButtons = document.querySelectorAll('.delete-todo');
let allEditButtons = document.querySelectorAll('.edit-todo');
const todoAddBtn = document.getElementById('todoAddBtn');
const todoInput = document.getElementById('todoInput');
const todoUl = document.getElementById('todoUl');

const setItemStorage = (id, todoText) => {
    if (id && todoText) {
        todoList.push(
            {
                id,
                todoText:todoText
            })
        }
        localStorage.setItem('todos', JSON.stringify(todoList));
    }
    
    const getItemStorage = () => {
        todoList.forEach(todo => {
            
            const todoLi = document.createElement('li');
            todoLi.classList.add('todo-li')
            todoLi.dataset.id = todo.id
            
            const todoP = document.createElement('p');
            todoP.textContent = todo.todoText;
            todoP.dataset.id = todo.id
            
            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-todo');
            editBtn.textContent = 'Edit';
            editBtn.dataset.id = todo.id
            
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-todo');
            deleteBtn.textContent = 'Delete';
            deleteBtn.dataset.id = todo.id
            
            const todoBtnWrapper = document.createElement('div');
            todoBtnWrapper.appendChild(editBtn);0
            todoBtnWrapper.appendChild(deleteBtn);
            
            todoLi.appendChild(todoP);
            todoLi.appendChild(todoBtnWrapper);
            todoUl.appendChild(todoLi);
        });
        deleteTodoFunc()
        editTodoFunc()
    }
    
    const deleteTodoFunc = () => {
        allDeleteButtons = document.querySelectorAll('.delete-todo')
        
        for (const deleteBtn of allDeleteButtons) {
            deleteBtn.onclick = (e) => {
                todoUl.removeChild(e.target.parentElement.parentElement);
                const searchedTodo = todoList.find(todo => todo.id == e.target.dataset.id)
                const index = todoList.indexOf(searchedTodo)
                
                if (index !== -1) {
                    todoList.splice(index, 1);
                    setItemStorage();
                }
            }
        }
    }
    
    const editTodoFunc = () => {
        allEditButtons = document.querySelectorAll('.edit-todo');
        let todoTextP = document.querySelectorAll('p')
        
        for (const editBtn of allEditButtons) {
            editBtn.addEventListener('click', (e) => {
                const text = e.target.parentElement.parentElement.firstChild
                text.setAttribute('contenteditable', true)
                text.focus()

                for (const todo of todoTextP) {
                    text.addEventListener('keydown', (e) => {
                        if (e.key == 'Enter') {
                            text.setAttribute('contenteditable', false)
                            const newValue = e.target.textContent
                            const itemId = e.target.dataset.id
                            const searchedTodo = todoList.find(todo => todo.id == e.target.dataset.id)
                            const index = todoList.indexOf(searchedTodo)
                            if (index !== -1) {
                                todoList.splice(index, 1)
                                setItemStorage(itemId, newValue)
                            }        
                        }
                    })
                }
            })
        }
    }
    
    const addTodo = () => {
        const todoText = todoInput.value.trim();
        
        if (!todoText) {
            alert('Iltimos todo kiriting!')
            return ''
        }
        
        if (todoText.length > 50) {
            alert("Iltimos 50 ta so'zdan kam yozing!")
            todoInput.value = ''
            return ''
        }
        
        const id = uuidv4()
        
        const todoLi = document.createElement('li')
        todoLi.classList.add('todo-li')
        todoLi.dataset.id = id
        
        const todoP = document.createElement('p')
        todoP.textContent = todoText
        todoP.dataset.id = todoLi.id
        
        const editTodo = document.createElement('button')
        editTodo.textContent = 'Edit'
        editTodo.classList.add('edit-todo')
        editTodo.dataset.id = todoLi.id
        
        const deleteTodo = document.createElement('button')
        deleteTodo.textContent = 'Delete'
        deleteTodo.classList.add('delete-todo')
        deleteTodo.dataset.id = todoLi.id
        
        const todoBtnsWrapper = document.createElement('div')
        todoBtnsWrapper.appendChild(editTodo)
        todoBtnsWrapper.appendChild(deleteTodo)
        
        todoLi.appendChild(todoP)
        todoLi.appendChild(todoBtnsWrapper)
        
        todoUl.appendChild(todoLi)
        
        todoInput.value = ''
        setItemStorage(id, todoText)
        
        deleteTodoFunc()
        editTodoFunc()
    }
    
    todoAddBtn.addEventListener('click', ()=> {
        addTodo()
    })
    
    todoInput.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            addTodo()
        }
    })
    
    getItemStorage()