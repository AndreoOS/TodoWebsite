let id = 0;
let numOfTodos = 0;
let doneTodos = 0;
let renderType = -1; // 0 pentru all ; 1 pentru active; 2 pentru completed
let calledClearAll = 0;

//State
let todos = []

let checkAll = document.getElementById('checkallbtn')
let footer = document.getElementById('footer')
let allTodos = document.getElementById('allTodos')
const render = () => {
    if (todos.length == 0) {
        numOfTodos = 0;
        doneTodos = 0;
    }
    // clear the page 
    allTodos.innerHTML = ''
    todos.forEach(element => {
        let HTMLElem = document.createElement('div');
        HTMLElem.classList.add('mockTodo')

        let check = document.createElement('div');
        check.classList.add('checkbx')
        if (element.checked == true) {
            check.innerHTML = `<input type="checkbox" checked>`
        } else {
            check.innerHTML = `<input type="checkbox">`
        }
        check.querySelector("input").addEventListener('change', function() {
            if (element.checked == true) {
                element.checked = false;
                doneTodos--;
            } else {
                element.checked = true;
                doneTodos++
            }
            if (renderType === 0 || renderType === -1) {
                render();
            } else if (renderType === 1) {
                renderActive();
            } else {
                renderCompleted();
            }
        });
        let todoText = document.createElement('div')
        todoText.classList.add('todoElement')
        if (element.checked == true) {
            todoText.style.textDecorationLine = "line-through";
            todoText.style.opacity = 0.3;
        } else {
            todoText.style.textDecorationLine = "none";
            todoText.style.opacity = 1;
        }
        todoText.innerHTML = element.text;
        let remove = document.createElement('div')
        remove.classList.add('removeTodo')
        remove.addEventListener('click', function() {
            remove_todo(element.id);
        });
        remove.innerHTML = `<i class="fa fa-times"></i>`
        HTMLElem.appendChild(check)
        HTMLElem.appendChild(todoText)
        HTMLElem.appendChild(remove)
        allTodos.appendChild(HTMLElem)
    });
    if (numOfTodos > 0) {
        renderFooter();
    } else {
        footer.innerHTML = '';
    }
    
}

const add_todo = () => {
    document.getElementById("textInput").addEventListener("keypress", function(e) {
        if (e.key === 'Enter' && e.target.value !== '') {
            let todo = {
                "id": id,
                "text": e.target.value,
                "checked": false,
            }
            id = id + 1;
            numOfTodos++;
            todos.push(todo);
            if (renderType === 0 || renderType === -1) {
                render();
            } else if (renderType === 1) {
                renderActive();
            } else {
                renderCompleted();
            }
            e.target.value = "";
        }   
    })
}

const renderFooter = () => {
    footer.innerHTML='';
    let footerElement = document.createElement('div')
    footerElement.classList.add('footer');
    footerElement.classList.add('paper');
    let leftTodos = document.createElement('div')
    leftTodos.classList.add('leftTodos');
    if (numOfTodos - doneTodos === 1) {
        leftTodos.innerHTML = (numOfTodos - doneTodos) + ' item left'
    } else {
        leftTodos.innerHTML = (numOfTodos - doneTodos) + ' items left'
    }
    let filters = document.createElement('div');
    filters.classList.add('filterTodos');
    let allFilter = document.createElement('div');
    let activeFilter = document.createElement('div');
    let completedFilter = document.createElement('div');
    if (renderType === 0) {
        allFilter.style.border = '2px solid #EAD7D7'
        activeFilter.style.border = '0'
        completedFilter.style.border = '0'
    }
    if (renderType === 1) {
        allFilter.style.border = '0'
        activeFilter.style.border = '2px solid #EAD7D7'
        completedFilter.style.border = '0'
    }
    if (renderType === 2) {
        allFilter.style.border = '0'
        activeFilter.style.border = '0'
        completedFilter.style.border = '2px solid #EAD7D7'
    }
    allFilter.classList.add('all');
    activeFilter.classList.add('active');
    completedFilter.classList.add('completed');
    allFilter.innerHTML = "All";
    activeFilter.innerHTML = "Active";
    completedFilter.innerHTML = "Completed";
    allFilter.addEventListener('click', function () {
        renderType = 0;
        render();
    })
    activeFilter.addEventListener('click', function() {
        renderType = 1;
        renderActive();
    })
    completedFilter.addEventListener('click', function() {
        renderType = 2;
        renderCompleted();
    })
    let clearDone = document.createElement('div');
    clearDone.classList.add("cleardone");
    if (doneTodos !== 0) {
        clearDone.innerHTML = "Clear completed";
        clearDone.addEventListener('click', function() {
            removeDone();
        })
    }
    filters.appendChild(allFilter);
    filters.appendChild(activeFilter);
    filters.appendChild(completedFilter);
    footerElement.appendChild(leftTodos);
    footerElement.appendChild(filters);
    footerElement.appendChild(clearDone);
    footer.appendChild(footerElement);
} 

function remove_todo(id) {
    new_id = 0;
    todos.forEach(element => {
        if (element.id === id) {
            if(element.checked === true) {
                doneTodos--;
            }
        }
    })
    numOfTodos--;
    todos.splice(id, 1);
    todos.forEach(element => {
        element.id = new_id;
        new_id = new_id + 1;
    })
    if (renderType === 0 || renderType === -1) {
        render();
    } else if (renderType === 1) {
        renderActive();
    } else {
        renderCompleted();
    }
}

const checkAllFunction = () => {
    checkAll.addEventListener('click', function() {
        if (doneTodos != numOfTodos) {
            todos.forEach(element => {
                if (element.checked === false) {
                    element.checked = true;
                    doneTodos++;
                }
            })
        } else if (doneTodos === numOfTodos) {
            todos.forEach(element => {
                if (element.checked === true) {
                    element.checked = false;
                    doneTodos--;
                }
            })
        }
        if (renderType === 0 || renderType === -1) {
            render();
        } else if (renderType === 1) {
            renderActive();
        } else {
            renderCompleted();
        }
    })
}

const renderActive = () => {
    allTodos.innerHTML = '';
    todos.forEach(element => {
        if (element.checked === false) {
        let HTMLElem = document.createElement('div');
        HTMLElem.classList.add('mockTodo')

        let check = document.createElement('div');
        check.classList.add('checkbx')
        if (element.checked == true) {
            check.innerHTML = `<input type="checkbox" checked>`
        } else {
            check.innerHTML = `<input type="checkbox">`
        }
        check.querySelector("input").addEventListener('change', function() {
            if (element.checked == true) {
                element.checked = false;
                doneTodos--;
            } else {
                element.checked = true;
                doneTodos++
            }
            if (renderType === 0 || renderType === -1) {
                render();
            } else if (renderType === 1) {
                renderActive();
            } else {
                renderCompleted();
            }
            
        });
        let todoText = document.createElement('div')
        todoText.classList.add('todoElement')
        if (element.checked == true) {
            todoText.style.textDecorationLine = "line-through";
            todoText.style.opacity = 0.3;
        } else {
            todoText.style.textDecorationLine = "none";
            todoText.style.opacity = 1;
        }
        todoText.innerHTML = element.text;
        let remove = document.createElement('div')
        remove.classList.add('removeTodo')
        remove.addEventListener('click', function() {
            remove_todo(element.id);
        });
        remove.innerHTML = `<i class="fa fa-times"></i>`
        HTMLElem.appendChild(check)
        HTMLElem.appendChild(todoText)
        HTMLElem.appendChild(remove)
        allTodos.appendChild(HTMLElem)
    }
    })
    if (numOfTodos > 0) {
        renderFooter();
    } else {
        footer.innerHTML = '';
    }
}

const renderCompleted = () => {
    allTodos.innerHTML = '';
    todos.forEach(element => {
        if (element.checked === true) {
        let HTMLElem = document.createElement('div');
        HTMLElem.classList.add('mockTodo')

        let check = document.createElement('div');
        check.classList.add('checkbx')
        if (element.checked == true) {
            check.innerHTML = `<input type="checkbox" checked>`
        } else {
            check.innerHTML = `<input type="checkbox">`
        }
        check.querySelector("input").addEventListener('change', function() {
            if (element.checked == true) {
                element.checked = false;
                doneTodos--;
            } else {
                element.checked = true;
                doneTodos++
            }
            if (renderType === 0 || renderType === -1) {
                render();
            } else if (renderType === 1) {
                renderActive();
            } else {
                renderCompleted();
            }
        });
        let todoText = document.createElement('div')
        todoText.classList.add('todoElement')
        if (element.checked == true) {
            todoText.style.textDecorationLine = "line-through";
            todoText.style.opacity = 0.3;
        } else {
            todoText.style.textDecorationLine = "none";
            todoText.style.opacity = 1;
        }
        todoText.innerHTML = element.text;
        let remove = document.createElement('div')
        remove.classList.add('removeTodo')
        remove.addEventListener('click', function() {
            remove_todo(element.id);
        });
        remove.innerHTML = `<i class="fa fa-times"></i>`
        HTMLElem.appendChild(check)
        HTMLElem.appendChild(todoText)
        HTMLElem.appendChild(remove)
        allTodos.appendChild(HTMLElem)
    }
    })
    if (numOfTodos > 0) {
        renderFooter();
    } else {
        footer.innerHTML = '';
    }

}
 
const removeDone = () => {
    todos.forEach(element => {
        if (element.checked === true) {
            remove_todo(element.id);
        }
        if (renderType === 0 || renderType === -1) {
            render();
        } else if (renderType === 1) {
            renderActive();
        } else {
            renderCompleted();
        }
    })
}

const main = () => {
    checkAllFunction();
    render();
    add_todo();
}

main();