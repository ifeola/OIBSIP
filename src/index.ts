const toDoSection = document.querySelector('section') as HTMLElement;
const pendingToDo = document.querySelector("#todo__pending") as HTMLUListElement;
const toDoListItems = pendingToDo.children as HTMLCollection;
const toDo = document.querySelector("#todo") as HTMLDivElement;
const completedToDo = document.querySelector("#todo__completed") as HTMLUListElement;
const toDoForm = document.querySelector("#todo-form") as HTMLFormElement;


// ToDo Type
type ToDo = {
  title: string;
  formattedDate: string;
  formattedTime: string;
  id: string;
}

// ToDO Class
class ToDoObj {
  title: string;
  formattedDate: string;
  formattedTime: string;
  id: string;

  constructor(title: string, formattedDate: string, formattedTime: string, id: string) {
    this.title = title
    this.formattedDate = formattedDate;
    this.formattedTime = formattedTime;
    this.id = id;
  }
}

class UI {
  static getToDOList() {
    let toDoList: ToDo[] = Store.getToDo();
    
    toDoList.forEach(toDo => {
      UI.addTodo(toDo);
    })
  }

  static addTodo(toDo: ToDo) {
    const listItem = document.createElement('li') as HTMLLIElement;
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
    `
    pendingToDo.appendChild(listItem);
  }

  static deleteToDo(target: HTMLElement) {
    if (target.classList.contains("delete-btn")) {
      const targetParent = target.parentElement?.parentElement?.parentElement;
      targetParent?.remove();
    }
  }

  static showEditForm(target: HTMLElement) {
    if (target.classList.contains("edit-btn")) {
      let editForm = target.parentElement?.parentElement?.nextElementSibling as HTMLFormElement;
      editForm?.classList.toggle('active');
      
      // Update Edited ToDo
      UI.editToDo(editForm)
    }
  }

  static editToDo(editForm: HTMLFormElement) {
    let toDoTitle = editForm.parentElement?.getElementsByTagName('h4') as HTMLCollection;
    let toDoTitleValue: string = toDoTitle[0].textContent!;
    const editInput = editForm.querySelector('input') as HTMLInputElement;
    editInput.value = toDoTitleValue;
    
    editForm?.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const editInputValue: string = editInput.value;

      const toDoList = Store.getToDo();
      toDoList.forEach((todo, index) => {
        if (todo.title === toDoTitleValue) {
          todo.title = editInputValue;
        }
      })
      toDoTitle[0].textContent = editInputValue;
      localStorage.setItem("toDoList", JSON.stringify(toDoList))
      
      editInput.value = ''
      editForm.classList.remove('active');
    })
  }
}

class Store {
  static getToDo() {
    let toDoList: ToDoObj[];

    if (localStorage.getItem('toDoList') === null) {
      toDoList = [];
    } else {
      toDoList = JSON.parse(localStorage.getItem('toDoList')!);
    }
    
    return toDoList;
  }

  static addToDo(toDo: ToDo) {
    const toDoList: ToDoObj[] = Store.getToDo();
    toDoList.push(toDo);
    localStorage.setItem("toDoList", JSON.stringify(toDoList))
  }

  static deleteToDo(target: HTMLElement) {
    if (target.classList.contains("delete-btn")) {
      const targetParent = target.parentElement?.parentElement?.parentElement as HTMLElement;
      let targetParentId: string = targetParent?.id;

      const toDoList = Store.getToDo();
      toDoList.forEach((toDo, index) => {
        if (toDo.id === targetParentId) {
          toDoList.splice(index, 1);
        }
      })

      localStorage.setItem("toDoList", JSON.stringify(toDoList))
    }
  }

  static editToDo(target: HTMLElement) {

  }
}

document.addEventListener('DOMContentLoaded', UI.getToDOList);

toDoForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  // Create a new Date object
  const currentDate: Date = new Date();

  // Get the hours and minutes
  const hours: number = currentDate.getHours();
  const minutes: string = currentDate.getMinutes().toString().padStart(2, '0'); // Ensures two-digit minutes

  // Format the date (you can adjust the order as needed)
  const year: number = currentDate.getFullYear();
  const month: string = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const day :string = currentDate.getDate().toString().padStart(2, '0');

  // Combine time and date
  const formattedTime :string = `${hours}:${minutes}`;
  const formattedDate: string = `${year}-${month}-${day}`;
  
  // Add ID

  let id: string | number = Math.ceil(Math.random() * 10000);
  const IDCount = id.toString().split("");
  while (IDCount.length < 4) {
    id = Math.ceil(Math.random() * 10000);
  }
  const idAsString: string = String(id);

  // Get Input Value
  const inputEl = toDoForm.querySelector('input') as HTMLInputElement;
  const inputValue: string = inputEl.value;
  const toDoObj: ToDo = new ToDoObj(inputValue, formattedDate, formattedTime, idAsString)
  UI.addTodo(toDoObj);
  Store.addToDo(toDoObj);

  // Clear Input field
  inputEl.value = "";
})

toDoSection.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement;
  if (!target) return;

  // Delete ToDo Item
  UI.deleteToDo(target);
  Store.deleteToDo(target);

  // Show Edit form
  UI.showEditForm(target);

  // completed ToDo
})