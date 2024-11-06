import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const loadingSpinner = document.getElementById('loadingSpinner');

window.appendToDisplay = (value) => {
    display.value += value;
};

window.clearDisplay = () => {
    display.value = '';
};

window.calculate = async () => {
    try {
        const expression = display.value;
        const [num1, operator, num2] = expression.match(/(-?\d+\.?\d*)\s*([\+\-\*\/])\s*(-?\d+\.?\d*)/).slice(1);

        loadingSpinner.classList.remove('d-none');

        let result;
        switch (operator) {
            case '+':
                result = await backend.add(parseFloat(num1), parseFloat(num2));
                break;
            case '-':
                result = await backend.subtract(parseFloat(num1), parseFloat(num2));
                break;
            case '*':
                result = await backend.multiply(parseFloat(num1), parseFloat(num2));
                break;
            case '/':
                if (parseFloat(num2) === 0) {
                    throw new Error('Division by zero');
                }
                result = await backend.divide(parseFloat(num1), parseFloat(num2));
                break;
            default:
                throw new Error('Invalid operator');
        }

        display.value = result.toString();
    } catch (error) {
        display.value = 'Error: ' + error.message;
    } finally {
        loadingSpinner.classList.add('d-none');
    }
};
