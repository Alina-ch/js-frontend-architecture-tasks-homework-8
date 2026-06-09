// BEGIN
export default () => {
  const form = document.querySelector('.form-inline');
  const input = document.querySelector('input[name="number"]');
  const resultDiv = document.getElementById('result');
  const resetBtn = document.querySelector('.btn-outline-primary');

  let sum = 0;

  input.focus();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sum = sum + parseInt(input.value, 10);
    resultDiv.textContent = sum;
    form.reset();
    input.focus();
  });

  resetBtn.addEventListener('click', () => {
    sum = 0;
    resultDiv.textContent = sum;
    form.reset();
    input.focus();
  });
};
// END