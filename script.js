document.getElementById('startBtn').addEventListener('click', () => {
    const expr = document.getElementById('expression').value.replace(/\s+/g, '');
    if (!expr) return alert("Enter a valid infix expression!");
  
    const infixRail = document.getElementById('infixRail');
    const stackRail = document.getElementById('stackRail');
    const postfixRail = document.getElementById('postfixRail');
  
    infixRail.innerHTML = '';
    stackRail.innerHTML = '';
    postfixRail.innerHTML = '';
  
    const tokens = expr.split('');
    const stack = [];
    const output = [];
  
    let index = 0;
  
    function createTrainCar(content, color = "#0077b6") {
      const car = document.createElement('div');
      car.className = 'train-car';
      car.textContent = content;
      car.style.backgroundColor = color;
      return car;
    }
  
    function getPrecedence(op) {
      switch (op) {
        case '+':
        case '-': return 1;
        case '*':
        case '/': return 2;
        case '^': return 3;
        default: return 0;
      }
    }
  
    function processInfix() {
      if (index < tokens.length) {
        const token = tokens[index++];
        infixRail.appendChild(createTrainCar(token));

        setTimeout(processInfix, 1000); 
      } else {
        
        processStackAndPostfix();
      }
    }

    function processStackAndPostfix() {
      let indexForOutput = 0; 

      const processNextStep = () => {
        if (indexForOutput < tokens.length) {
          const token = tokens[indexForOutput++];

          if (/[A-Za-z0-9]/.test(token)) {
            output.push(token);
            postfixRail.appendChild(createTrainCar(token, "#38b000"));
          } else if (token === '(') {
            stack.push(token);
            stackRail.appendChild(createTrainCar(token, "#ffb703"));
          } else if (token === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
              const op = stack.pop();
              postfixRail.appendChild(createTrainCar(op, "#38b000"));
              stackRail.removeChild(stackRail.lastChild);
            }
            if (stack.length && stack[stack.length - 1] === '(') {
              stack.pop();
              stackRail.removeChild(stackRail.lastChild);
            }
          } else {
            while (
              stack.length &&
              getPrecedence(stack[stack.length - 1]) >= getPrecedence(token)
            ) {
              const op = stack.pop();
              postfixRail.appendChild(createTrainCar(op, "#38b000"));
              stackRail.removeChild(stackRail.lastChild);
            }
            stack.push(token);
            stackRail.appendChild(createTrainCar(token, "#ffb703"));
          }

          setTimeout(processNextStep, 1000); 
        } else {
          
          flushStackOneByOne();
        }
      };

      processNextStep();
    }

    function flushStackOneByOne() {
      if (stack.length) {
        const op = stack.pop();
        postfixRail.appendChild(createTrainCar(op, "#38b000"));
        stackRail.removeChild(stackRail.lastChild);
        setTimeout(flushStackOneByOne, 1000); 
      }
    }

    processInfix(); 
});
const rulesBtn = document.getElementById('rulesBtn');
const sidebar = document.getElementById('sidebar');

rulesBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');

  if (sidebar.classList.contains('open')) {
    rulesBtn.textContent = "❌ Close Rules";
  } else {
    rulesBtn.textContent = "🚦 View Rules";
  }
});
