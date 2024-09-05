"use strict";
const toDoSection = document.querySelector('section');
const pendingToDo = document.querySelector("#todo__pending");
const toDoListItems = pendingToDo.children;
const toDo = document.querySelector("#todo");
const completedToDo = document.querySelector("#todo__completed");
const toDoForm = document.querySelector("#todo-form");
// ToDO Class
class ToDoObj {
    constructor(title, formattedTime, formattedDate, id) {
        this.title = title;
        this.formattedDate = formattedDate;
        this.formattedTime = formattedTime;
        this.id = id;
    }
}
class UI {
    static getToDOList() {
        let toDoList = Store.getToDo();
        toDoList.forEach(toDo => {
            UI.addTodo(toDo);
        });
    }
    static addTodo(toDo) {
        const listItem = document.createElement('li');
        listItem.classList.add('todo-item');
        listItem.id = toDo.id;
        listItem.innerHTML = `
      <div class="item__content">
        <div class="item__info">
          <label class="checkbox">
            <input type="checkbox" class="inp-checkbox" />
            <svg viewBox="0 0 12 10" height="10px" width="12px">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
          </label>
          <div class="item__info-top">
            <h4 class="item__title">${toDo.title}</h4>
            <div class="timestamp">
              <span class="date">${toDo.formattedDate}</span>
              <div class="dot"></div>
              <span class="time">${toDo.formattedTime}</span>
            </div>
          </div>
        </div>
        <div class="item__btn">
          <button class="delete-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
          <button class="edit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
        </div>
      </div>
      <form class="item__edit">
        <input type="text" id="edit" class="todo__input" />
        <button type="submit">Submit</button>
      </form>
    `;
        pendingToDo.appendChild(listItem);
    }
    static deleteToDo(target) {
        var _a, _b;
        if (target.classList.contains("delete-btn")) {
            const targetParent = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
            targetParent === null || targetParent === void 0 ? void 0 : targetParent.remove();
        }
    }
    static showEditForm(target) {
        var _a, _b;
        if (target.classList.contains("edit-btn")) {
            let editForm = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.nextElementSibling;
            editForm === null || editForm === void 0 ? void 0 : editForm.classList.toggle('active');
            // Update Edited ToDo
            UI.editToDo(editForm);
        }
    }
    static editToDo(editForm) {
        var _a;
        let toDoTitle = (_a = editForm.parentElement) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('h4');
        let toDoTitleValue = toDoTitle[0].textContent;
        const editInput = editForm.querySelector('input');
        editInput.value = toDoTitleValue;
        editForm === null || editForm === void 0 ? void 0 : editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const editInputValue = editInput.value;
            const toDoList = Store.getToDo();
            toDoList.forEach((todo, index) => {
                if (todo.title === toDoTitleValue) {
                    todo.title = editInputValue;
                }
            });
            toDoTitle[0].textContent = editInputValue;
            localStorage.setItem("toDoList", JSON.stringify(toDoList));
            editInput.value = '';
            editForm.classList.remove('active');
        });
    }
}
class Store {
    static getToDo() {
        let toDoList;
        if (localStorage.getItem('toDoList') === null) {
            toDoList = [];
        }
        else {
            toDoList = JSON.parse(localStorage.getItem('toDoList'));
        }
        return toDoList;
    }
    static addToDo(toDo) {
        const toDoList = Store.getToDo();
        toDoList.push(toDo);
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
    }
    static deleteToDo(target) {
        var _a, _b;
        if (target.classList.contains("delete-btn")) {
            const targetParent = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
            let targetParentId = targetParent === null || targetParent === void 0 ? void 0 : targetParent.id;
            const toDoList = Store.getToDo();
            toDoList.forEach((toDo, index) => {
                if (toDo.id === targetParentId) {
                    toDoList.splice(index, 1);
                }
            });
            localStorage.setItem("toDoList", JSON.stringify(toDoList));
        }
    }
    static editToDo(target) {
    }
}
document.addEventListener('DOMContentLoaded', UI.getToDOList);
toDoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Create a new Date object
    const currentDate = new Date();
    // Get the hours and minutes
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Ensures two-digit minutes
    // Format the date (you can adjust the order as needed)
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const day = currentDate.getDate().toString().padStart(2, '0');
    // Combine time and date
    const formattedTime = `${hours}:${minutes}`;
    const formattedDate = `${year}-${month}-${day}`;
    // Add ID
    let id = Math.ceil(Math.random() * 10000);
    const IDCount = id.toString().split("");
    while (IDCount.length < 4) {
        id = Math.ceil(Math.random() * 10000);
    }
    const idAsString = String(id);
    // Get Input Value
    const inputEl = toDoForm.querySelector('input');
    const inputValue = inputEl.value;
    const toDoObj = new ToDoObj(inputValue, formattedDate, formattedTime, idAsString);
    UI.addTodo(toDoObj);
    Store.addToDo(toDoObj);
    // Clear Input field
    inputEl.value = "";
});
toDoSection.addEventListener('click', (e) => {
    const target = e.target;
    if (!target)
        return;
    // Delete ToDo Item
    UI.deleteToDo(target);
    Store.deleteToDo(target);
    // Show Edit form
    UI.showEditForm(target);
    // completed ToDo
});
