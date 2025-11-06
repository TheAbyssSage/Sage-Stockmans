// Calculator
function calculate() {
    const box1 = document.getElementById('input1');
    const box2 = document.getElementById('input2');
    const operator = document.getElementById('operator');
    const button = document.getElementById('button');

    numbox1 = parseInt(input1.value);
    numbox2 = parseInt(input2.value);
    operatorvalue = operator.value;

    console.log(numbox1, numbox2, operatorvalue);

    let result;

    if (operatorvalue == '+') {
        result = numbox1 + numbox2;
        alert(result);
    } else if (operatorvalue == '-') {
        result = numbox1 - numbox2;
        alert(result);
    } else if (operatorvalue == '*') {
        result = numbox1 * numbox2;
        alert(result);
    } else {
        result = numbox1 / numbox2;
        alert(result);
    } 
}

