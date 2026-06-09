// BEGIN
export default (companies) => {
  const state = {
    selectedCompanyId: null,
  };

  const container = document.querySelector('.container');

  companies.forEach((company) => {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'm-1');
    button.textContent = company.name;
    
    button.addEventListener('click', () => {
      if (state.selectedCompanyId === company.id) {
        state.selectedCompanyId = null;
      } else {
        state.selectedCompanyId = company.id;
      }
      render(state);
    });

    container.append(button);
  });

  const render = (currState) => {
    const oldDescription = container.querySelector('div');
    if (oldDescription) {
      oldDescription.remove();
    }

    if (currState.selectedCompanyId === null) {
      return;
    }

    const activeCompany = companies.find((c) => c.id === currState.selectedCompanyId);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.textContent = activeCompany.description;
    container.append(descriptionDiv);
  };

  render(state);
};

// END