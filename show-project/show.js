// جلب بيانات المنتج من localStorage
const productData = JSON.parse(localStorage.getItem("viewProduct"));

const mainImage = document.getElementById("mainImage");
const originalImageSrc = productData ? productData.image : "";
mainImage.src = originalImageSrc;

// عرض البيانات في الصفحة
if (productData) {
    document.getElementById("productName").innerText = productData.name;
    document.getElementById("productPrice").innerText = productData.price + " EGP";
    document.getElementById("productDesc").innerText = productData.description || "No description available.";
}

// إضافة الصور المصغرة
const thumbnails = [productData.image];
const thumbnailList = document.getElementById("thumbnailList");
thumbnails.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "thumb" + (index === 0 ? " active" : "");
    img.onclick = () => changeImage(img);
    thumbnailList.appendChild(img);
});

// ==== دوال الصور ====
function changeImage(img) {
    mainImage.src = img.src;
    document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
    img.classList.add("active");
}

function resetToOriginal() {
    mainImage.src = originalImageSrc;
    document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
    thumbnailList.querySelector("img").classList.add("active");
}

// ==== إضافة للسلة ====
document.getElementById("addToCartBtn").addEventListener("click", () => {
    const name = document.getElementById("productName").innerText;
    const price = parseFloat(document.getElementById("productPrice").innerText.replace(" EGP", ""));
    const image = mainImage.src;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showAddedPopup();
});

// ==== التحقق من حالة تسجيل الدخول ====
document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedUser) {
        document.getElementById("guestLinks").style.display = "none";
        document.getElementById("userLinks").style.display = "inline-block";
        document.getElementById("navUserName").innerText = loggedUser.displayName;
    } else {
        document.getElementById("guestLinks").style.display = "inline-block";
        document.getElementById("userLinks").style.display = "none";
    }

    window.logout = function() {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
    };
});

// ==== تحديث العداد ====
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById("cart-count").innerText = count;
}

// ==== رسالة إضافة للسلة ====
function showAddedPopup() {
    let popup = document.createElement("div");
    popup.className = "added-popup";
    popup.innerHTML = `<i class="fa-solid fa-check"></i> Added to Cart!`;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add("show"), 100);
    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 300);
    }, 1500);
}

// ==== Buy Now ====
document.getElementById("buyNowBtn").addEventListener("click", () => {
    if (productData) {
        localStorage.setItem("checkoutProduct", JSON.stringify(productData));
        window.location.href = "/links/confirmatio order/order.html";
    }
});

// ==== الخصم ====
const finalPriceEl = document.getElementById("finalPrice");
const discountInput = document.getElementById("discountInput");
const applyDiscountBtn = document.getElementById("applyDiscountBtn");
let currentPrice = parseInt(productData.price);

// ======== REDEEM DISCOUNT CODE ========
applyDiscountBtn.addEventListener("click", () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser) {
        finalPriceEl.innerText = "⚠️ لازم تسجل دخول الأول";
        finalPriceEl.className = "final-price error";
        return;
    }

    if (!loggedUser.discount || !loggedUser.discount.code) {
        finalPriceEl.innerText = "⚠️ مفيش كود خصم على حسابك";
        finalPriceEl.className = "final-price error";
        return;
    }

    const enteredCode = discountInput.value.trim();
    if (enteredCode !== loggedUser.discount.code) {
        finalPriceEl.innerText = "❌ كود الخصم غير صحيح";
        finalPriceEl.className = "final-price error";
        return;
    }

    if (loggedUser.discount.used === true) {
        finalPriceEl.innerText = "❌ الكود اتستخدم قبل كده";
        finalPriceEl.className = "final-price error";
        return;
    }

    const discountValue = Number(loggedUser.discount.value);
    const discountedPrice = currentPrice - (currentPrice * discountValue / 100);

    document.getElementById("originalPrice").innerText = currentPrice + " EGP";
    document.getElementById("productPrice").innerText = Math.round(discountedPrice) + " EGP";

    finalPriceEl.innerHTML = `🎉 تم تطبيق الخصم (${discountValue}%)`;
    finalPriceEl.className = "final-price success";

    applyDiscountBtn.style.display = "none";
    discountInput.disabled = true;

    loggedUser.discount.used = true;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));

    // تخزين الخصم للسلة **صح**
    localStorage.setItem("cartDiscount", JSON.stringify({
        code: loggedUser.discount.code,
        value: discountValue
    }));

    productData.finalPrice = Math.round(discountedPrice);
    productData.discount = { code: loggedUser.discount.code, value: discountValue };
    localStorage.setItem("checkoutProduct", JSON.stringify(productData));
});

// ==== تحديث العداد عند الدخول للصفحة ====
updateCartCount();