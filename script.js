document.addEventListener("DOMContentLoaded", () => {

    // ================= USER =================
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const legacyCartKey = "cart_" + (user ? user.email : "guest");
    let cart = JSON.parse(localStorage.getItem("cart") || localStorage.getItem(legacyCartKey) || "[]");
    if (!localStorage.getItem("cart") && cart.length) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // ================= SAVE CART =================
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // ================= CART COUNT =================
    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
        const el = document.getElementById("cart-count");
        if (el) el.innerText = count;
    }

    updateCartCount();

    // ================= TOAST =================
    function toast(msg) {
        const t = document.createElement("div");
        t.innerText = msg;

        Object.assign(t.style, {
            position: "fixed",
            top: "10px",
            right: "10px",
            background: "#28a745",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: "6px",
            zIndex: 9999
        });

        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2000);
    }

    // ================= ADD TO CART =================
    function addProduct(product) {
        const exist = cart.find(item => item.name === product.name && item.image === product.image);
        if (exist) exist.qty += 1;
        else cart.push({ ...product, qty: 1 });
        saveCart();
        updateCartCount();
    }

    function productFromCard(card) {
        return {
            name: card.dataset.name,
            price: Number(card.dataset.price),
            image: card.dataset.image
        };
    }

    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const product = productFromCard(btn.closest(".project-card"));
            addProduct(product);
            toast("تمت الإضافة للسلة 🛒");
        });
    });

    // ================= BUY NOW =================
    document.querySelectorAll(".buy-now").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const card = btn.closest(".project-card");

            const product = productFromCard(card);
            addProduct(product);
            window.location.href = "/links/confirmatio order/order.html";
        });
    });

    // ================= VIEW PRODUCT =================
    document.querySelectorAll(".view-product").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const card = btn.closest(".project-card");

            const product = {
                name: card.dataset.name,
                price: card.dataset.price,
                image: card.dataset.image,
                description: card.dataset.description || ""
            };

            localStorage.setItem("viewProduct", JSON.stringify(product));
            window.location.href = "/links/show-project/show.html";
        });
    });

    // ================= LOGIN UI =================
    const guest = document.getElementById("guestLinks");
    const userBox = document.getElementById("userLinks");
    const nameBox = document.getElementById("navUserName");

    if (user) {
        if (guest) guest.style.display = "none";
        if (userBox) userBox.style.display = "flex";
        if (nameBox) nameBox.innerText = user.displayName;
    } else {
        if (guest) guest.style.display = "flex";
        if (userBox) userBox.style.display = "none";
    }

    // ================= LOGOUT =================
    const logout = document.getElementById("logoutHome");
    if (logout) {
        logout.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            location.reload();
        });
    }

    // ================= DISCOUNT =================
    const form = document.getElementById("discountForm");
    const result = document.getElementById("discountResult");

    function generateCode(len = 6) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < len; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        return code;
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = form.querySelector("input[name='email']").value.trim();

            if (!user || user.email !== email) {
                result.innerHTML = "⚠️ لازم تسجيل دخول بنفس الإيميل";
                return;
            }

            if (user.discount?.code) {
                result.innerHTML = `⚠️ لديك كود بالفعل: <b>${user.discount.code}</b>`;
                return;
            }

            const discount = {
                code: generateCode(),
                value: Math.floor(Math.random() * 50) + 1,
                used: false
            };

            user.discount = discount;
            localStorage.setItem("loggedInUser", JSON.stringify(user));

            result.innerHTML = `🎉 كودك: <b>${discount.code}</b> (${discount.value}%)`;
        });
    }

});