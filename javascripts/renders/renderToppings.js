function onToppingClick(topping, state) {
  const { selectedToppings } = state;
  const isExists = state.selectedToppings.find(({ name }) => name === topping.name);

  const newSelectedToppings = !isExists 
    ? [{ ...topping, amount: 1 }, ...selectedToppings] 
    : selectedToppings.filter(({ name }) => name !== topping.name);

  state.selectedToppings = newSelectedToppings;
  render(state);
}

function renderToppings(state) {
  const { toppings, selectedToppings } = state;
  const parentNode = document.querySelector('.toppings');
  clearNode(parentNode);

  toppings.forEach(topping => {
    const { name: toppingName } = topping;
    const container = document.createElement('div');
    container.classList.add('topping');

    if (selectedToppings.find(({ name }) => name === topping.name)) {
      container.classList.add('active');
    }

    container.onclick = function() {
      onToppingClick(topping, state);
    };

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('img');

    const image = document.createElement('img');
    image.alt = toppingName;
    image.src = `https://toddmotto.com/angular-pizza-creator/assets/toppings/${toppingName}.svg`;

    const name = document.createElement('span');
    name.innerText = toppingName;
    
    imageContainer.append(image);
    container.append(imageContainer, name);

    parentNode.append(container);
  });
}