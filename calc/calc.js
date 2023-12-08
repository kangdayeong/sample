let result = document.getElementById("result");
let preValue = document.getElementById("preValue");
result.value = 0;
preValue.innerHTML = "";
let buttons = new Array(...document.getElementsByTagName("button"));
let tempNumber = null;
let clearFlag = true;
let operation = "";

buttons.map((button) => {
  button.addEventListener("click", (e) => {
    let value = e.target.innerText;

    switch (value) {
      case "AC":
        result.value = "0";
        preValue.innerHTML = "";
        operation = "";
        tempNumber = 0;
        clearFlag = true;
        break;
      case "+":
        operation = "plus";
        operationMap[operation]();
        break;
      case "*":
        operation = "mul";
        operationMap[operation]();
        break;
      case "/":
        operation = "per";
        operationMap[operation]();
        break;
      case "-":
        operation = "minus";
        operationMap[operation]();
        break;
      case "=":
        operation && operationMap[operation]();
        clearFlag = true;
        operation = "";
        preValue.innerHTML = "";
        break;
      default:
        if (result.value.length === 10) return;
        result.value = !clearFlag ? result.value + value : value;
        clearFlag = false;
        break;
    }
  });
});

const operationMap = {
  plus() {
    if (tempNumber !== null) {
      result.value = tempNumber + Number(result.value);
      clearFlag = true;
    } else {
      clearFlag = true;
    }
    tempNumber = Number(result.value);
    preValue.innerHTML = `${tempNumber} +`;
  },
  mul() {
    if (tempNumber !== null) {
      result.value = tempNumber * Number(result.value);
      clearFlag = true;
    } else {
      clearFlag = true;
    }
    tempNumber = Number(result.value);
    preValue.innerHTML = `${tempNumber} *`;
  },
  per() {
    if (tempNumber !== null) {
      result.value = tempNumber / Number(result.value);
      clearFlag = true;
    } else {
      clearFlag = true;
    }
    tempNumber = Number(result.value);
    preValue.innerHTML = `${tempNumber} /`;
  },
  minus() {
    if (tempNumber !== null) {
      result.value = tempNumber - Number(result.value);
      clearFlag = true;
    } else {
      clearFlag = true;
    }
    tempNumber = Number(result.value);
    preValue.innerHTML = `${tempNumber} -`;
  },
};

function mapFunctionToOperation(params) {}
