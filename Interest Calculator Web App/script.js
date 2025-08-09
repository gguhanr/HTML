// ===== Calculate Interest Function =====
function calculateInterest() {
    let principal = parseFloat(document.getElementById("principal").value);
    let rate = parseFloat(document.getElementById("rate").value);
    let time = parseFloat(document.getElementById("time").value);
    let type = document.getElementById("type").value;
    let resultBox = document.getElementById("result");

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        resultBox.innerHTML = "Please enter valid numbers.";
        resultBox.classList.add("show");
        return;
    }

    let interest = 0, amount = 0;

    if (type === "simple") {
        interest = (principal * rate * time) / 100;
        amount = principal + interest;
    } else {
        amount = principal * Math.pow((1 + rate / 100), time);
        interest = amount - principal;
    }

    resultBox.innerHTML = `
        Interest: ₹${interest.toFixed(2)} <br>
        Total Amount: ₹${amount.toFixed(2)}
    `;
    
    // Show with animation
    resultBox.classList.add("show");
}

// ===== Theme Toggle =====
document.getElementById("themeBtn").addEventListener("click", function() {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        this.textContent = "☀ Light Mode";
    } else {
        this.textContent = "🌙 Dark Mode";
    }
});
