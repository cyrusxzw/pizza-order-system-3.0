function clearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function render(state) {
  renderToppings(state);
  renderSummary(state);
  renderConfirmationModal(state);
  renderTotal(state);
  renderSizes(state);
  renderInputBox(state);
}

function main() {
  const toppings = [{
    name: 'anchovy',
    price: '0.69',
  }, {
    name: 'bacon',
    price: '0.69',
  }, {
    name: 'basil',
    price: '0.69',
  }, {
    name: 'chili',
    price: '0.69',
  }, {
    name: 'mozzarella',
    price: '0.69',
  }, {
    name: 'mushroom',
    price: '0.69',
  }, {
    name: 'olive',
    price: '0.69',
  }, {
    name: 'onion',
    price: '0.69',
  }];
  
  const sizes = [{
    name: 'small',
    inches: '9',
    price: '8.99'
  }, {
    name: 'medium',
    inches: '11',
    price: '10.99'
  }, {
    name: 'large',
    inches: '13',
    price: '12.99'
  }];

  const infos = [{
    label: 'NAME',
    value: '',
  }, {
    label: 'EMAIL',
    value: '',
  }, {
    label: 'CONFIRM EMAIL',
    value: '',
  }, {
    label: 'ADDRESS',
    value: '',
  }, {
    label: 'POSTCODE',
    value: '',
  }, {
    label: 'CONTACT NUMBER',
    value: '',
  }
  ];

  const selectedToppings = [];

  const state = {
    toppings,
    selectedToppings,
    selectedSize: null,
    isDisplayConfirmationModal: false,
    sizes,
    infos,
  };

  window.state = state;

  render(state);

  document.querySelector('button[type="reset"]').onclick = () => {
    state.selectedToppings = [];
    render(state);
  }

  document.querySelector('button[type="submit"]').onclick = () => {
    const { infos, selectedSize } = state;
    let haveAmount = 0;
    infos.forEach((info) => {
      if(info.value !== ''){
        haveAmount ++;
      }
    });  

    if(haveAmount < 6){
      alert('Please enter your details!');
    }
    else{
      state.isDisplayConfirmationModal = true;
      render(state);
    }
  };
}

document.addEventListener('DOMContentLoaded', main);