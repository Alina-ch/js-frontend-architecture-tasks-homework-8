import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default () => {
  const generalId = uniqueId();

  const state = {
    lists: [
      { id: generalId, name: 'General' }
    ],
    tasks: [],
    currentListId: generalId
  };

  const listsContainer = document.querySelector('[data-container="lists"]');
  const tasksContainer = document.querySelector('[data-container="tasks"]');

  const newListForm = document.querySelector('[data-container="new-list-form"]');
  const newListNameInput = document.getElementById('new-list-name');
  
  const newTaskForm = document.querySelector('[data-container="new-task-form"]');
  const newTaskNameInput = document.getElementById('new-task-name');

  const render = (currState) => {
    listsContainer.textContent = '';
    tasksContainer.textContent = '';

    const ulLists = document.createElement('ul');
    currState.lists.forEach((list) => {
      const li = document.createElement('li');
      
      if (list.id === currState.currentListId) {
        const b = document.createElement('b');
        b.textContent = list.name;
        li.append(b);
      } else {
        const a = document.createElement('a');
        a.href = '#' + list.name.toLowerCase();
        a.textContent = list.name;
        
        a.addEventListener('click', (e) => {
          e.preventDefault();
          currState.currentListId = list.id;
          render(currState);
        });
        
        li.append(a);
      }
      ulLists.append(li);
    });
    listsContainer.append(ulLists);

    const currentTasks = currState.tasks.filter((task) => task.listId === currState.currentListId);
    
    if (currentTasks.length > 0) {
      const ulTasks = document.createElement('ul');
      currentTasks.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.name;
        ulTasks.append(li);
      });
      tasksContainer.append(ulTasks);
    }
  };

  render(state);

  newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const listName = newListNameInput.value.trim();

    let isExist = false;
    state.lists.forEach((list) => {
      if (list.name.toLowerCase() === listName.toLowerCase()) {
        isExist = true;
      }
    });

    if (isExist || listName === '') {
      newListForm.reset();
      return;
    }

    const newList = { id: uniqueId(), name: listName };
    state.lists.push(newList);
    newListForm.reset();
    render(state);
  });

  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = newTaskNameInput.value.trim();

    if (taskName === '') {
      newTaskForm.reset();
      return;
    }

    const newTask = { id: uniqueId(), listId: state.currentListId, name: taskName };
    state.tasks.push(newTask);
    newTaskForm.reset();
    render(state);
  });
};
// END