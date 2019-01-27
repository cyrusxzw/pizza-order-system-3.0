function getToppingsString(toppings) {
  let result = '';

  toppings.forEach(({ name, amount }, index) => {
    result = index === 0 ? `${name} * ${amount}` : `${result}, ${name} * ${amount}`;
  });

  return result;
}

function renderConfirmationModal(state) {
  const { isDisplayConfirmationModal, selectedToppings, selectedSize, infos } = state;

  const parentNode = document.querySelector('.confirmation-modal');
  clearNode(parentNode);

  if (!isDisplayConfirmationModal) {
    return;
  }


  const { name, price } = selectedSize;
  const modalDiv = document.createElement('div');
  modalDiv.classList.add('modal');

  const modalBoxDiv = document.createElement('div');
  modalBoxDiv.classList.add('modal-box');

  modalDiv.append(modalBoxDiv);

  const h1 = document.createElement('h1');
  h1.innerText = 'Your Order Details';

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info');

  infos.forEach(info => {
      const{ value } = info;
      const detailsP = document.createElement('p');
      detailsP.classList.add('detail');
      detailsP.innerText = `${value}`;
      infoDiv.append(detailsP);
    })

  
  const hr = document.createElement('hr');

  const pizzasDiv = document.createElement('div');
  pizzasDiv.classList.add('pizzas');

  const pizzaDiv = document.createElement('div');
  pizzaDiv.classList.add('pizza');

  const itemDiv = document.createElement('div');
  
  const itemStrong = document.createElement('strong');
  itemStrong.innerText = `${name} Pizza`;
  const itemBr = document.createElement('br');
  const itemSpan = document.createElement('span');
  itemSpan.innerText = getToppingsString(selectedToppings);

  itemDiv.append(itemStrong, itemBr, itemSpan);

  const priceDiv = document.createElement('div');
  const total = getTotal(state);
  priceDiv.innerText = `$${total}`;

  pizzaDiv.append(itemDiv, priceDiv);

  pizzasDiv.append(pizzaDiv);

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');

  const cancelButton = document.createElement('button');
  cancelButton.classList.add('cancel');
  cancelButton.innerText = 'Cancel';
  cancelButton.onclick = () => {
    state.isDisplayConfirmationModal = false;
    render(state);
  };

  const confirmButton = document.createElement('button');
  confirmButton.classList.add('confirm');
  confirmButton.innerText = 'Confirm';

  actionsDiv.append(cancelButton, confirmButton);

  modalBoxDiv.append(h1, infoDiv, hr, pizzasDiv, actionsDiv);

  parentNode.append(modalDiv);
} 