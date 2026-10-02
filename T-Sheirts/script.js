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

document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
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
});