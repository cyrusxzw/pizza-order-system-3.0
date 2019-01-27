function renderInputBox(state){
    const parentNode = document.querySelector('.details');
    clearNode(parentNode);
    const { infos } = state;
    infos.forEach(info => {
      const{ label } = info;
      let{ value } = info;
      const formControl = document.createElement('div');

      formControl.onchange = () =>{
          inputInfoChange(info, state);
      }

      formControl.classList.add('form-control');
      const labelContent = document.createElement('label');
      labelContent.innerText = `${label}`;
      const inputContent = document.createElement('input');
      inputContent.value = `${value}`;
      inputContent.classList.add(`${label.replace(/ /g,'')}`);
      formControl.append(labelContent, inputContent);
      parentNode.append(formControl);
    })


    function inputInfoChange(info, state){
        const validValue = document.querySelector(`.${info.label.replace(/ /g,'')}`).value;
        info.value = validValue;
        render(state);
    }

  }