import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN
export default async () => {
  const form = document.querySelector('.form-inline');
  const input = document.querySelector('input[name="name"]');
  const tasksList = document.getElementById('tasks');

  const response = await axios.get(routes.tasksPath());
  const tasks = response.data.items;

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = task.name;
    tasksList.append(li);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const taskName = input.value;
    const data = { name: taskName };

    const postResponse = await axios.post(routes.tasksPath(), data);

    if (postResponse.status === 201) {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = taskName;
      tasksList.prepend(li);

      form.reset();
      input.focus();
    }
  });
};
// END