const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const list = document.getElementById('list');
const form = document.getElementById('form');

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

/**
 * Add transaction
 */
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

/**
 * Generate random ID
 */
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

/**
 * add transaction dom list
 */
function addTransactionDOM(transaction) {
    // get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `${transaction.text}<p>${sign}${Math.abs(transaction.amount)}</p>
    <button class="delete-btn" onclick="removeTransactionByID(${transaction.id})">x</button>`;

    list.appendChild(item);
}

/**
 * update balance, income and expense
 */
function updateValues() {
    const amounts = transactions.map(transaction => +transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts.filter(amount => amount > 0)
        .reduce((acc, item) => (acc += item), 0).toFixed(2);

    const expense = amounts.filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0).toFixed(2);

    balance.innerText = `$${total}`;
    moneyMinus.innerHTML = `${expense}`;
    moneyPlus.innerHTML = `${income}`;
}

/**
 * Remove transaction by id
 */
function removeTransactionByID(id) {
    transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

/**
 * update local storage transactions
 */
function updateLocalStorage() {
    localStorage.setItem('transaction', JSON.stringify(transactions));
}

/**
 * Init app
 */
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);