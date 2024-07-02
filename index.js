const todos = JSON.parse(localStorage.getItem("todos")) || [];
const completedtodos = JSON.parse(localStorage.getItem("completedtodos")) || [];

function displayTodos(){
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    for(let todo of todos){
        const div = document.createElement("div");
        div.classList.add("todo");
        const title = document.createElement("h4");
        title.classList.add("todo-title");
        const description = document.createElement("p");
        description.classList.add("todo-description");
        const completeBtn = document.createElement("img");
        completeBtn.classList.add("complete-btn");
        completeBtn.src = "complete.svg";
        const deleteBtn = document.createElement("img");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.src = "bin.png";
        deleteBtn.onmouseover = function(){
            deleteBtn.src = "disposal.png";
        }
        deleteBtn.onmouseout = function(){
            deleteBtn.src = "bin.png";
        }

        title.innerText = todo.title;
        description.innerText = todo.description;
        deleteBtn.addEventListener("click",function(){
            const index = todos.indexOf(todo);
            todos.splice(index,1);
            localStorage.setItem("todos",JSON.stringify(todos));

            displayTodos();
        })

        completeBtn.addEventListener("click",function(){
            const index = todos.indexOf(todo);
            const completeTodo = todos[index];
            completeTodo.submitted = new Date().toLocaleString()
            todos.splice(index,1);
            localStorage.setItem("todos",JSON.stringify(todos));
            completedtodos.push(completeTodo);
            localStorage.setItem("completedtodos",JSON.stringify(completedtodos));
            displayTodos();
            displayCompletedTodos();
        })
        const time = document.createElement("p");
        time.classList.add("time")
        time.innerText = todo.submitted;

        div.append(title,description,completeBtn,deleteBtn);
        todoList.append(div,time);
    }
}


function displayCompletedTodos(){
    const completedTodoList = document.getElementById("completed-todo");
    completedTodoList.innerHTML = "";
    for(let todo of completedtodos){
        const div = document.createElement("div");
        div.classList.add("todo");
        const title = document.createElement("h4");
        title.classList.add("todo-title");
        const description = document.createElement("p");
        description.classList.add("todo-description");
        const deleteBtn = document.createElement("img");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.src = "bin.png";
        deleteBtn.onmouseover = function(){
            deleteBtn.src = "disposal.png";
        }
        deleteBtn.onmouseout = function(){
            deleteBtn.src = "bin.png";
        }
        title.innerText = todo.title;
        description.innerText = todo.description;
        deleteBtn.addEventListener("click",function(){
            const index = completedtodos.indexOf(todo);
            completedtodos.splice(index,1);
            localStorage.setItem("completedtodos",JSON.stringify(completedtodos));
            displayCompletedTodos();
        })

        const time = document.createElement("p");
        time.classList.add("time")
        time.innerText = todo.submitted;

        div.append(title,description,deleteBtn);
        completedTodoList.append(div,time);
    }
}

function addTodo(){

    const title = document.getElementById("title-input").value;
    const description = document.getElementById("description-input").value;
    const todo = {
        title:title,
        description : description,
        submitted : new Date().toLocaleString()
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

    console.log(JSON.stringify(todo));


    document.getElementById("title-input").value = "";
    document.getElementById("description-input").value = "";

    displayTodos();
}

displayTodos();
displayCompletedTodos();

document.getElementById("add").addEventListener("click",addTodo)