function getTotal(state) {
  const { selectedToppings, selectedSize } = state;

  let total = selectedSize ? +selectedSize.price : 0;
  
  selectedToppings.forEach(({ price, amount }) => {
    selectedToppingTotal = price * amount;
    total = total + selectedToppingTotal;
  });

  return total;
}