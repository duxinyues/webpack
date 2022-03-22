export default () => {
  const element = document.createElement('h2');
  element.textContent = 'Hello webpack';
  element.addEventListener('click', () => {
    console.log("432");
  })

  return element;
}