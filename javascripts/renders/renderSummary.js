function onAddToppingClick(topping, state) {
  const { selectedToppings } = state;

  const newSelectedToppings = selectedToppings.map(selectedTopping => {
    const { name } = selectedTopping;

    if (name === topping.name) {
      const { amount } = topping;
      const newAmount = amount + 1;

      return {
        ...topping,
        amount: newAmount,
      }
    }

    return selectedTopping;
  });

  state.selectedToppings = newSelectedToppings;
  render(state);
}

function onMinusToppingClick(topping, state) {
  const { selectedToppings } = state;

  const newSelectedToppings = selectedToppings.map(selectedTopping => {
    const { name } = selectedTopping;

    if (name === topping.name) {
      const { amount } = topping;
      const newAmount = amount - 1;

      if (newAmount === 0) {
        return undefined;
      }

      return {
        ...topping,
        amount: newAmount,
      }
    }

    return selectedTopping;
  });

  state.selectedToppings = newSelectedToppings.filter(newSelectedTopping => !!newSelectedTopping);
  render(state);
}

function renderSummary(state) {
  const { selectedToppings, selectedSize } = state;
  const parentNode = document.querySelector('ul.summary');
  clearNode(parentNode);

  if (selectedSize) {
    const { name, price } = selectedSize;

    const pizzaPriceLi = document.createElement('li');
    const nameSpan = document.createElement('span');
    nameSpan.innerText = `${name} Pizza`;

    const priceSpan = document.createElement('span');
    priceSpan.innerText = `$${price}`;

    const addButtonPlaceholderSpan = document.createElement('span');
    const minusButtonPlaceholderSpan = document.createElement('span');
    const amountPlaceholderSpan = document.createElement('span');

    pizzaPriceLi.append(nameSpan, addButtonPlaceholderSpan, minusButtonPlaceholderSpan, amountPlaceholderSpan, priceSpan);

    parentNode.append(pizzaPriceLi);
  }

  selectedToppings.forEach(selectedTopping => {
    const { name, amount, price } = selectedTopping;

    const li = document.createElement('li');

    const addButton = document.createElement('button');
    addButton.classList.add('amount');
    addButton.innerText = '+';
    addButton.onclick = () => {
      onAddToppingClick(selectedTopping, state);
    }

    const minusButton = document.createElement('button');
    minusButton.classList.add('amount');
    minusButton.innerText = '-';
    minusButton.onclick = () => {
      onMinusToppingClick(selectedTopping, state);
    }

    const nameSpan = document.createElement('span');
    nameSpan.innerText = name;

    const amountSpan = document.createElement('span');
    amountSpan.innerText = `* ${amount}`;

    const totalSpan = document.createElement('span');
    totalSpan.innerText = `$ ${price * amount}`;

    li.append(addButton, minusButton, nameSpan, amountSpan, totalSpan);
    parentNode.append(li);
  });
}