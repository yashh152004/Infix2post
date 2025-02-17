function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
}

function infixToPostfix(exp) {
    let stack = [], output = "";
    for (let char of exp) {
        if (/[a-zA-Z0-9]/.test(char)) {
            output += char;
        } else if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output += stack.pop();
            }
            stack.pop();
        } else {
            while (stack.length && precedence(stack[stack.length - 1]) >= precedence(char)) {
                output += stack.pop();
            }
            stack.push(char);
        }
    }
    while (stack.length) output += stack.pop();
    return output;
}

function postfixToInfix(exp) {
    let stack = [];
    for (let char of exp) {
        if (/[a-zA-Z0-9]/.test(char)) {
            stack.push(char);
        } else {
            let b = stack.pop(), a = stack.pop();
            stack.push(`(${a}${char}${b})`);
        }
    }
    return stack[0];
}

function convertExpression() {
    let exp = document.getElementById("expression").value.trim();
    let conversionType = document.getElementById("conversionType").value;
    let result = "";
    
    if (conversionType === "infixToPostfix") {
        result = infixToPostfix(exp);
    } else {
        result = postfixToInfix(exp);
    }
    
    document.getElementById("result").textContent = result;
}
