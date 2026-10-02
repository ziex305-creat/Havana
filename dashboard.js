document.addEventListener("DOMContentLoaded", function() {

    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    // إذا المستخدم غير مسجّل دخول
    if (!user) {
        alert("يرجى تسجيل الدخول أولاً");
        window.location.href = "/links/Login/login.html";
    }

    // عرض البيانات
    function updateProfileUI() {
        document.getElementById("profileName").innerText = user.displayName;
        document.getElementById("profileUsername").innerText = user.username;
        document.getElementById("profileEmail").innerText = user.email;
        if (user.profilePic) document.getElementById("profilePic").src = user.profilePic;
    }

    updateProfileUI();

    // تغيير صورة الملف الشخصي
    document.getElementById("profilePicInput").addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function() {
            document.getElementById("profilePic").src = reader.result;
            user.profilePic = reader.result;
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            localStorage.setItem("user_" + user.email, JSON.stringify(user));
        };
        reader.readAsDataURL(file);
    });

    // تسجيل خروج
    document.getElementById("logoutBtn").addEventListener("click", function() {
        localStorage.removeItem("loggedInUser");
        window.location.href = "/links/Login/login.html";
    });

    // عرض/إخفاء نموذج تعديل البيانات
    document.getElementById("editProfileBtn").addEventListener("click", function() {
        const form = document.getElementById("editProfileForm");
        form.style.display = form.style.display === "none" ? "flex" : "none";

        document.getElementById("editDisplayName").value = user.displayName;
        document.getElementById("editUsername").value = user.username;
        document.getElementById("editEmail").value = user.email;
    });

    // حفظ التعديلات
    document.getElementById("saveProfileBtn").addEventListener("click", function() {

        const newDisplayName = document.getElementById("editDisplayName").value.trim();
        const newUsername = document.getElementById("editUsername").value.trim();
        const newEmail = document.getElementById("editEmail").value.trim();

        if (!newDisplayName || !newUsername || !newEmail) {
            alert("يرجى ملء جميع الحقول!");
            return;
        }

        // تحديث الإيميل + حذف القديم
        if (user.email !== newEmail) {
            localStorage.removeItem("user_" + user.email);
        }

        user.displayName = newDisplayName;
        user.username = newUsername;
        user.email = newEmail;

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        localStorage.setItem("user_" + newEmail, JSON.stringify(user));

        updateProfileUI();
        alert("تم حفظ التعديلات بنجاح!");

        document.getElementById("editProfileForm").style.display = "none";
    });

});