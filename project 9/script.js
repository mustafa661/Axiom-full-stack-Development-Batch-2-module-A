// Get DOM Elements
const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

// temporary array of transactions - to be replaced with local storage
const Transactions = [
    { id: 1, reason: 'Salary', amount: 5000 },
    { id: 2, reason: 'Breakfast', amount: -20 },
    { id: 3, reason: 'Lunch', amount: -30 },
    { id: 4, reason: 'Dinner', amount: -60 },
];

// Get transaction data from storage
let transactions = Transactions;

// function to display transactions in DOM - history section
function displayTransaction(transaction) {
    // calculate if transaction is credit or debit
    const type = transaction.amount > 0 ? '+' : '-';
    // create a list item for the transaction
    const transactionLI = document.createElement('li');
    // determine class based on transaction type. if positive, then credit, otherwise debit
    transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit' );
    //assign the inner HTML for the transaction li
    transactionLI.innerHTML = `
        ${transaction.reason} <span>${transaction.amount}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})" >X</button>
    `;
    // add the li in the DOM under the transaction history list
    list.appendChild(transactionLI);
};

// function to update all balances
function updateBalance() {
    // create a new array with just the amounts from the transactions array
    const transactionAmounts = transactions.map( transaction => transaction.amount );
    // calculate total balance value
    const totalBalance = transactionAmounts.reduce( (acc, amount) => ( acc += amount), 0 );
    // calculate total credit balance value
    const creditBalance = transactionAmounts
                            .filter(amount => amount > 0)
                            .reduce( (acc, amount) => (acc += amount), 0 );
    // calculate total debit balance value
    const debitBalance = transactionAmounts
                            .filter(amount => amount < 0)
                            .reduce( (acc, amount) => (acc += amount), 0 );
    // update values in the DOM for overall balance, and debit balance
    balance.innerText = `$${totalBalance}`;
    moneyCredit.innerText = `$${creditBalance}`;
    moneyDebit.innerText = `$${debitBalance}`;                        
};

// function to create a random ID
function createID() {
    return Math.floor(Math.random() * 100000000000);
};

// function to add a transaction from the form
function addTransaction(e) {
    // stop the page reload
    e.preventDefault();
    // check if form has valid data
    if ( reason.value.trim() === '' || amount.value.trim() === '' ) {
        // display error message if form is not complete
        alert('Please provide a valid reason and transaction amount.')
    } else {
        // create an object for the transaction containing id,
        // text for the reason, and the transaction amount
        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }
        //push the new transaction into the transactions array
        transactions.push(transaction);
        // Display the new transaction in the DOM
        displayTransaction(transaction);
        // update all balances
        updateBalance();
        // clear form fields
        reason.value = '';
        amount.value = '';
    }
};

// function to delete a transaction from the history
function deleteTransaction(id) {
    // filter out the transaction with the provided id
    transactions = transactions.filter( transaction => transaction.id !== id );
    // initialize the app again to update the DOM
    init();
};

// function to initialize the application
function init() {
    // clear all transaction history
    list.innerHTML = '';
    // Display all transaction in db in the DOM
    transactions.forEach(displayTransaction);
    updateBalance();
};

// event listeners
// 1. liste for form submit to add a transaction
form.addEventListener('submit', addTransaction);

// initialize the application
init();