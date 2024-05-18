import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

const todos = [
  {
    text: "je suis une todo",
    done: false,
    editMode : true
  },
  {
    text: "faire du javascript",
    done: true,
    editMode : false
  }
];

form.addEventListener("submit", event => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    if(todo.editMode){
      return createTodoEditElement(todo,index)
    }else{
      return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const buttonDelet = document.createElement('button');
  buttonDelet.innerHTML = 'Supprimer';

  const buttonEdit = document.createElement('button');
  buttonEdit.innerHTML = 'Edit';
  
  buttonDelet.addEventListener('click', (event) =>{
    event.stopPropagation();
    deletTodo(index);
  });

  buttonEdit.addEventListener('click',event =>{
    event.stopPropagation();
    toggleEditModel(index);

  })


  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>
  `;

  li.addEventListener("click" , event  =>{
    toggleTodo(index);
  })


  li.appendChild(buttonEdit);
  li.appendChild(buttonDelet);
  return li;
};

const addTodo = text => {
  todos.push({
    text,
    done: false
  });
  displayTodo();
};

const deletTodo = (index) =>{
  todos.splice(index,1);
  displayTodo();
};

const toggleTodo = index =>{
  todos[index].done = !todos[index].done;
  displayTodo();
};

const createTodoEditElement = (todo,index) => {
  const li = document.createElement('li');
  const input =  document.createElement('input');

  input.type = 'text';
  input.value = todo.text;

  const buttonSave = document.createElement('button');
  buttonSave.innerHTML = 'Save';
  const buttonCancel = document.createElement('button');
  buttonCancel.innerHTML = 'Cancel';

  buttonCancel.addEventListener('click',event => {
    event.stopPropagation();

    toggleEditModel(index);
    
  });

  buttonSave.addEventListener('click', event =>{
    editTodo(index,input);
  })

  li.append(input , buttonCancel , buttonSave);

  return li;

}

const toggleEditModel = (index) =>{
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
}

const editTodo = (index,input) =>{
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
}
displayTodo();