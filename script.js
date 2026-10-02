document.addEventListener("DOMContentLoaded", () => {

    // ================= USER + CART KEY =================
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const legacyCartKey = "cart_" + (user ? user.email : "guest");
    let cart = JSON.parse(localStorage.getItem("cart") || localStorage.getItem(legacyCartKey) || "[]");
    if (!localStorage.getItem("cart") && cart.length) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const container = document.getElementById("cart-container");
    const totalElem = document.getElementById("total");

    const finalPriceEl = document.getElementById("finalPrice");
    const discountInput = document.getElementById("discountInput");
    const applyDiscountBtn = document.getElementById("applyDiscountBtn");

    // ================= SAVE =================
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // ================= CART COUNT =================
    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
        const el = document.getElementById("cart-count");
        if (el) el.innerText = count;
    }

    // ================= DISPLAY CART =================
    function displayCart() {
        container.innerHTML = "";

        if (cart.length === 0) {
            container.innerHTML = "<p>Cart is empty</p>";
            totalElem.innerText = "0";
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {

            total += item.price * item.qty;

            const div = document.createElement("div");
            div.className = "cart-item";

            div.innerHTML = `
                <img src="${item.image}" width="80">
                <h3>${item.name}</h3>
                <p>${item.price} EGP</p>

                <button onclick="window.changeQty(${index}, -1)">-</button>
                ${item.qty}
                <button onclick="window.changeQty(${index}, 1)">+</button>

                <button onclick="window.removeItem(${index})">Delete</button>
            `;

            container.appendChild(div);
        });

        totalElem.innerText = total;
    }

    // ================= GLOBAL FUNCTIONS =================
    window.removeItem = function(index) {
        cart.splice(index, 1);
        saveCart();
        displayCart();
        updateCartCount();
    };

    window.changeQty = function(index, amount) {
        cart[index].qty += amount;

        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }

        saveCart();
        displayCart();
        updateCartCount();
    };

    window.clearCart = function() {
        cart = [];
        localStorage.removeItem("cart");
        displayCart();
        updateCartCount();
    };

    // ================= ORDER BUTTON =================
    const orderBtn = document.querySelector(".empty-cart1");

    if (orderBtn) {
        orderBtn.addEventListener("click", () => {

            if (cart.length === 0) {
                alert("Cart is empty");
                return;
            }

            window.location.href = "/links/confirmatio order/order.html";
        });
    }

    // ================= TOTAL + DISCOUNT =================
    function calculateTotal() {
        return cart.reduce((t, i) => t + i.price * i.qty, 0);
    }

    if (applyDiscountBtn) {
        applyDiscountBtn.addEventListener("click", () => {

            const user = JSON.parse(localStorage.getItem("loggedInUser"));

            if (!user) {
                finalPriceEl.innerText = "⚠️ لازم تسجل دخول";
                return;
            }

            const code = discountInput.value.trim();

            const FIXED_CODE = "HAVANA20";
            const FIXED_VALUE = 5;

            let discount = 0;

            if (code === FIXED_CODE) {
                discount = FIXED_VALUE;
            }

            else if (user.discount?.code === code && !user.discount.used) {
                discount = Number(user.discount.value);
            }

            else {
                finalPriceEl.innerText = "❌ كود غير صحيح";
                return;
            }

            const total = calculateTotal();
            const discountAmount = total * discount / 100;
            const final = total - discountAmount;

            finalPriceEl.innerHTML = `
                <p>قبل الخصم: ${total} EGP</p>
                <p>الخصم: ${discountAmount.toFixed(0)} EGP</p>
                <p>بعد الخصم: ${final.toFixed(0)} EGP</p>
            `;

            localStorage.setItem("cartDiscount", JSON.stringify({
                code,
                value: discount
            }));

            applyDiscountBtn.style.display = "none";
            discountInput.disabled = true;

            if (user.discount?.code === code) {
                user.discount.used = true;
                localStorage.setItem("loggedInUser", JSON.stringify(user));
            }
        });
    }

    // ================= INIT =================
    displayCart();
    updateCartCount();
});