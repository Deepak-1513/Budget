const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const balanceDisplay = document.getElementById("balance");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateBalance() {
  const total = expenses.reduce((acc, cur) => acc + cur.amount, 0);
  balanceDisplay.textContent = `Balance: ₹${total}`;
}
const toggleButton = document.getElementById("toggle-mode");

// Load saved theme
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

function applyDarkModeSetting() {
  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

toggleButton.addEventListener("click", () => {
  darkMode = !darkMode;
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
  applyDarkModeSetting();
});

applyDarkModeSetting(); // Apply on load

function renderExpenses() {
  list.innerHTML = "";
  expenses.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.desc} - ₹${item.amount}
      <button onclick="deleteExpense(${index})">x</button>
    `;
    list.appendChild(li);
  });
  updateBalance();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  if (!desc || isNaN(amount)) return;

  expenses.push({ desc, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  form.reset();
  renderExpenses();
});

renderExpenses();