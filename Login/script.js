// ==== عناصر الصفحة ====
const loginContainer = document.getElementById("loginContainer");
const signupContainer = document.getElementById("signupContainer");
const resetContainer = document.getElementById("resetPasswordContainer");

const loginForm = document.querySelector("#loginContainer form");
const signupForm = document.querySelector("#signupContainer form");
const resetForm = document.getElementById("resetPasswordForm");

const showSignupBtn = document.getElementById("showSignup");
const backToLoginBtns = document.querySelectorAll("#backToLogin");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");

// ==== بيانات الادمن ====
const adminUser = {
    email: "admin@havana.com",
    password: "admin123",
    displayName: "Admin",
    username: "admin",
    role: "support"
};

// ==== عرض الفورمات ====
showSignupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.style.display = "none";
    signupContainer.style.display = "block";
});

forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.style.display = "none";
    resetContainer.style.display = "block";
});

backToLoginBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        loginContainer.style.display = "block";
        signupContainer.style.display = "none";
        resetContainer.style.display = "none";
    });
});

// ==== Function لإظهار الأخطاء ====
function showError(text) {
    errorText.innerText = text;
    errorMessage.style.display = "flex";

    setTimeout(() => {
        errorMessage.classList.add("fade-out");
        setTimeout(() => {
            errorMessage.style.display = "none";
            errorMessage.classList.remove("fade-out");
        }, 600);
    }, 2000);
}

// ==== تسجيل دخول المستخدمين / الادمن ====
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    // ==== تحقق الادمن ====
    if (email === adminUser.email && password === adminUser.password) {
        showError("Admin dashboard is not available yet.");
        return;
    }

    // ==== تحقق المستخدم العادي ====
    const savedUser = localStorage.getItem("user_" + email);
    if (!savedUser) {
        showError("This account does NOT exist!");
        return;
    }

    const userData = JSON.parse(savedUser);
    if (userData.password !== password) {
        showError("Incorrect password!");
        return;
    }

    // تسجيل دخول المستخدم العادي
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    window.location.href = "/links/dashbboard/dashboard.html"; // ← الصفحة الرئيسية
});
// ==== كلمات ممنوعة في اليوزر نيم ====
const bannedWords = [
    "fuck", "shit", "bitch", "asshole", "a7a",
    "كس", "زب", "متناك", "شرموط", "عاهر", "احا"
];

// ==== فحص قوة الباسورد ====
function isStrongPassword(pass) {
    const lengthCheck = pass.length >= 8;
    const upperCheck = /[A-Z]/.test(pass);
    const lowerCheck = /[a-z]/.test(pass);
    const numberCheck = /[0-9]/.test(pass);
    const symbolCheck = /[^A-Za-z0-9]/.test(pass);

    return lengthCheck && upperCheck && lowerCheck && numberCheck && symbolCheck;
}

// ==== فحص اليوزرنيم ====
function isUsernameAllowed(username) {
    const lower = username.toLowerCase();
    return !bannedWords.some(word => lower.includes(word));
}

// ==== تسجيل مستخدم جديد ====
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const displayName = document.getElementById("signupDisplayName").value.trim();
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPass = document.getElementById("confirmPassword").value;

    // التحقق من تطابق الباسورد
    if (password !== confirmPass) {
        alert("Passwords do NOT match!");
        return;
    }

    // منع يوزرنيم بكلام ممنوع
    if (!isUsernameAllowed(username)) {
        alert("Username contains inappropriate words!");
        return;
    }

    // فحص قوة الباسورد
    if (!isStrongPassword(password)) {
        alert("Password must contain:\n- Uppercase letter\n- Lowercase letter\n- Number\n- Symbol\n- At least 8 characters");
        return;
    }

    const userData = { displayName, username, email, password };

    // حفظ بيانات المستخدم
    localStorage.setItem("user_" + email, JSON.stringify(userData));

    // تسجيل دخول تلقائي
    localStorage.setItem("loggedInUser", JSON.stringify(userData));

    // توجيه للصفحة الرئيسية
    window.location.href = "index.html";
});

// ==== نسيت الباسورد ====
resetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("resetEmail").value.trim();
    const savedUser = localStorage.getItem("user_" + email);

    const msgBox = document.getElementById("resetMessage");
    const msgText = document.getElementById("resetMessageText");
    const icon = document.getElementById("messageIcon");

    if (!savedUser) {
        icon.className = "fas fa-times-circle";
        msgBox.style.background = "#ffebe8";
        msgText.innerText = "Email not found!";
        msgBox.style.display = "flex";
        return;
    }

    icon.className = "fas fa-check-circle";
    msgBox.style.background = "#e8ffe8";
    msgText.innerText = "Password reset link sent!";
    msgBox.style.display = "flex";
});