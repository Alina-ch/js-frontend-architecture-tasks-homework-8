// BEGIN
export default (laptops) => {
  const state = {
    filterForm: {
      processor: '',
      memory: '',
      minFrequency: '',
      maxFrequency: '',
    },
  };

  const form = document.querySelector('form');
  const resultContainer = document.querySelector('.result');

  const render = (currState) => {
    resultContainer.textContent = '';

    const filteredLaptops = laptops.filter((laptop) => {
      const activeFilters = Object.keys(currState.filterForm).filter((key) => currState.filterForm[key] !== '');

      return activeFilters.every((key) => {
        if (key === 'processor') return laptop.processor === currState.filterForm.processor;
        if (key === 'memory') return laptop.memory === parseInt(currState.filterForm.memory, 10);
        if (key === 'minFrequency') return laptop.frequency >= parseFloat(currState.filterForm.minFrequency);
        if (key === 'maxFrequency') return laptop.frequency <= parseFloat(currState.filterForm.maxFrequency);
        return true;
      });
    });

    if (filteredLaptops.length === 0) {
      return;
    }

    const ul = document.createElement('ul');
    filteredLaptops.forEach((laptop) => {
      const li = document.createElement('li');
      li.textContent = laptop.model;
      ul.append(li);
    });
    resultContainer.append(ul);
  };

  render(state);

  form.addEventListener('input', (e) => {
    if (e.target.name === 'processor_eq') state.filterForm.processor = e.target.value;
    if (e.target.name === 'memory_eq') state.filterForm.memory = e.target.value;
    if (e.target.name === 'frequency_gte') state.filterForm.minFrequency = e.target.value;
    if (e.target.name === 'frequency_lte') state.filterForm.maxFrequency = e.target.value;

    render(state);
  });
};
// END