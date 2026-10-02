document.addEventListener("DOMContentLoaded", () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        let count = cart.reduce((sum, item) => sum + item.qty, 0);
        let cartCountElem = document.getElementById("cart-count");
        if (cartCountElem) cartCountElem.innerText = count;
    }

    function showNotification(message) {
        let notif = document.createElement("div");
        notif.innerText = message;
        notif.style.position = "fixed";
        notif.style.top = "10px";
        notif.style.right = "10px";
        notif.style.background = "green";
        notif.style.color = "#fff";
        notif.style.padding = "10px 15px";
        notif.style.borderRadius = "5px";
        notif.style.zIndex = "9999";
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 2000);
    }

    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault(); // يمنع إعادة تحميل إذا زر <a>
            let product = {
                name: btn.dataset.name,
                price: Number(btn.dataset.price),
                image: btn.dataset.image,
                qty: 1
            };

            let exists = cart.find(p => p.name === product.name);
            if (exists) {
                exists.qty += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            showNotification(`${product.name} تم إضافته للسلة`);
        });
    });

    document.querySelectorAll('.project-card a[href*="order.html"]').forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const card = link.closest(".project-card");
            const product = {
                name: card.dataset.name,
                price: Number(card.dataset.price),
                image: card.dataset.image,
                qty: 1
            };
            const existing = cart.find(item => item.name === product.name && item.image === product.image);
            if (existing) existing.qty += 1;
            else cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.href = link.href;
        });
    });

    updateCartCount(); // يحدث الرقم عند تحميل الصفحة

});

// ---- check login status ----
document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedUser) {
        document.getElementById("guestLinks").style.display = "none";
        document.getElementById("userLinks").style.display = "inline-block"; // أو "flex" حسب التصميم عندك
        document.getElementById("navUserName").innerText = loggedUser.displayName;
    } else {
        document.getElementById("guestLinks").style.display = "inline-block"; // أو "flex"
        document.getElementById("userLinks").style.display = "none";
    }

    window.logout = function() {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
    };
});

const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedUser) {
    // إخفاء زر Login
    document.getElementById("guestLinks").style.display = "none";
    document.getElementById("userLinks").style.display = "flex";

    // عرض اسم المستخدم
    document.getElementById("navUserName").innerText = loggedUser.displayName;
} else {
    document.getElementById("guestLinks").style.display = "flex";
    document.getElementById("userLinks").style.display = "none";
}

// Logout من الهوم
document.getElementById("logoutHome").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
});
document.addEventListener("DOMContentLoaded", function() {

    function generateDiscountCode(length = 6) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < length; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    const form = document.getElementById("discountForm");
    const resultDiv = document.getElementById("discountResult");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = this.querySelector("input[name='email']").value.trim();
        if (!email) {
            alert("Please enter your email!");
            return;
        }

        const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedUser || loggedUser.email !== email) {
            resultDiv.innerHTML = "⚠️ يجب تسجيل الدخول للحصول على كود الخصم.";
            return;
        }

        // تحقق إذا كان الكود موجود مسبقًا
        if (loggedUser.discount && loggedUser.discount.code) {
            resultDiv.innerHTML = `⚠️ لقد حصلت بالفعل على كود خصم: <strong>${loggedUser.discount.code}</strong> بقيمة <strong>${loggedUser.discount.value}%</strong>`;
            return;
        }

        const discountCode = generateDiscountCode();
        const discountValue = Math.floor(Math.random() * 51); // 0 إلى 50 %

        loggedUser.discount = { code: discountCode, value: discountValue };
        localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));

        resultDiv.innerHTML = `🎉 كود خصمك: <strong>${discountCode}</strong> بقيمة <strong>${discountValue}%</strong>`;
    });

    // ======== VIEW PRODUCT FROM CARD ========
    document.querySelectorAll('.view-product').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // يمنع كليك الكارد كله

            const card = this.closest('.project-card');

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
});