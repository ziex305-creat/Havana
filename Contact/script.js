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

    updateCartCount(); // يحدث الرقم عند تحميل الصفحة

});