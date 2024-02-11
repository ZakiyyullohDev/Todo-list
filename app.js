const todoInput = document.getElementById('todoInput');
const todoAddBtn = document.getElementById('todoAddBtn');
const todoUl = document.getElementById('todoUl');
const editTodo = document.getElementById('editTodo')
const deleteTodo = document.getElementById('deleteTodo')
const todos = JSON.parse(localStorage.getItem('todos')) || []
const todoList = todos.slice()

const getItem = () => {

    todos.forEach(todoText => {
        const todoLi = document.createElement('li');
        todoLi.textContent = todoText
        todoLi.classList.add('todo-li');
        const editBtn = document.createElement('button')
        editBtn.classList.add('edit-todo')
        editBtn.textContent = 'Edit'
        editBtn.addEventListener('click', ()=> {
            const editTodoPrompt = prompt('Todo Kiriritng:')
            if (editTodoPrompt.length > 3) {
                todoLi.textContent = editTodoPrompt
                const index = todoList.indexOf(todoText);
                if (index !== -1) {
                    todoList[index] = editTodoPrompt;
                    setItemStorage();
                }
                
                todoBtnWrapper.appendChild(deleteBtn)
                todoLi.appendChild(todoBtnWrapper)
                todoLi.appendChild(todoBtnWrapper)
                todoList.push(todoInput.value)
            } else {
                const writeTodo = confirm('Iltimos Todo Kiriting!')
                if (writeTodo) {
                    prompt('Todo Kiritng:')
                } else {
                    confirm('Todo Kirit Iplos!')
                    prompt('Todo Kirit marraz!:')
                }
            }
        })
        
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-todo')
        
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', ()=> {
            todoUl.removeChild(todoLi)
            const index = todoList.indexOf(todoText);
            if (index !== -1) {
                todoList.splice(index, 1);
                setItemStorage();
            }
        })
        
        const todoBtnWrapper = document.createElement('div')
        
        todoBtnWrapper.appendChild(editBtn)
        todoBtnWrapper.appendChild(deleteBtn)
        
        todoLi.appendChild(todoBtnWrapper)
        todoUl.appendChild(todoLi);
    });
}

getItem()

const setItemStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todoList))
}

const addTodo = ()=> {
    const todoText = todoInput.value.trim();
    
    if (!todoText) {
        alert('Iltimos todo kiriting');
        return;

    } else if (todoText.length > 40) {
        alert("Iltimos 40 ta so'zdan kamroq yozing!")

        todoInput.value = ''

    } else {
        
        todoUl.classList.remove('display-none')
        
        const todoLi = document.createElement('li')
        todoLi.textContent = todoInput.value
        todoLi.classList.add('todo-li')
        
        const editBtn = document.createElement('button')
        editBtn.classList.add('edit-todo')
        editBtn.textContent = 'Edit'
        
        editBtn.addEventListener('click', ()=> {
            const editTodoPrompt = prompt('Todo Kiriritng:')
            if (editTodoPrompt.length > 3) {
                todoLi.textContent = editTodoPrompt
                const index = todoList.indexOf(todoText);
                if (index !== -1) {
                    todoList[index] = editTodoPrompt;
                    setItemStorage();
                }
                
                todoBtnWrapper.appendChild(deleteBtn)
                todoLi.appendChild(todoBtnWrapper)
                todoList.push(editTodoPrompt)

            } else {
                const writeTodo = confirm('Iltimos Todo Kiriting!')
                if (writeTodo) {
                    prompt('Todo Kiriritng:')
                } else {
                    confirm('Todo Kirit Iplos!')
                }
            }
        })
        
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-todo')
        deleteBtn.textContent = 'Delete'
        
        const todoBtnWrapper = document.createElement('div')
        
        todoBtnWrapper.appendChild(editBtn)
        todoBtnWrapper.appendChild(deleteBtn)
        deleteBtn.addEventListener('click', ()=> {
            todoUl.removeChild(todoLi)
            const index = todoList.indexOf(todoText);
            if (index !== -1) {
                todoList.splice(index, 1);
                setItemStorage();
            }
        })
        
        todoLi.appendChild(todoBtnWrapper)
        
        todoUl.appendChild(todoLi)
        todoList.push(todoInput.value)
        setItemStorage()
        todoInput.value = ''
    }
}

todoAddBtn.addEventListener('click', ()=> {
    addTodo()
})

todoInput.addEventListener('keydown', (e)=> {
    if (e.key === "Enter") {
        addTodo()      
    }
})
