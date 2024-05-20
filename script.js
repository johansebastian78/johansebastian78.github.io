document.addEventListener('DOMContentLoaded', () => {
    let customerId = 0; 
    const customerQueue = []; 
    const queueElement = document.getElementById('customerQueue'); 
    const statusCounter1 = document.getElementById('statusCounter1');
    const statusCounter2 = document.getElementById('statusCounter2');
    const servingCounter1 = document.getElementById('servingCounter1');
    const servingCounter2 = document.getElementById('servingCounter2');
    let counter1Busy = false;
    let counter2Busy = false;

    document.getElementById('addCustomer').addEventListener('click', () => {
        customerId++;
        customerQueue.push(`Cliente ${customerId}`);
        updateQueue();
    });

    document.getElementById('enableCounter1').addEventListener('click', () => {
        statusCounter1.textContent = 'Habilitada';
    });

    document.getElementById('disableCounter1').addEventListener('click', () => {
        statusCounter1.textContent = 'Deshabilitada';
        counter1Busy = false;
        servingCounter1.textContent = 'No atendiendo a nadie';
    });

    document.getElementById('enableCounter2').addEventListener('click', () => {
        statusCounter2.textContent = 'Habilitada';
    });

    document.getElementById('disableCounter2').addEventListener('click', () => {
        statusCounter2.textContent = 'Deshabilitada';
        counter2Busy = false;
        servingCounter2.textContent = 'No atendiendo a nadie';
    });

    function updateQueue() {
        queueElement.innerHTML = '';
        customerQueue.forEach(customer => {
            const li = document.createElement('li');
            li.textContent = customer;
            queueElement.appendChild(li);
        });
    }

    function attendCustomer() {
        if (customerQueue.length > 0) {
            if (statusCounter1.textContent === 'Habilitada' && !counter1Busy) {
                counter1Busy = true;
                const customer = customerQueue.shift();
                updateQueue();
                servingCounter1.textContent = `Atendiendo a ${customer}`;
                setTimeout(() => {
                    counter1Busy = false;
                    servingCounter1.textContent = 'No atendiendo a nadie';
                }, 2000);
            } else if (statusCounter2.textContent === 'Habilitada' && !counter2Busy) {
                counter2Busy = true;
                const customer = customerQueue.shift();
                updateQueue();
                servingCounter2.textContent = `Atendiendo a ${customer}`;
                setTimeout(() => {
                    counter2Busy = false;
                    servingCounter2.textContent = 'No atendiendo a nadie';
                }, 2000);
            }
        }
    }

    setInterval(attendCustomer, 1000);
});
