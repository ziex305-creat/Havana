document.getElementById('sendBtn').addEventListener('click', function() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message').value.trim();

    let text = "📌 طلب جديد من الموقع\n\n";
    if (name) text += "👤 الاسم: " + name + "\n";
    if (email) text += "📧 رقم التلفون: " + email + "\n";
    if (msg) text += "💬 الرسالة: " + msg + "\n";
    text += "\n 📌طلب جديد من الموقع: " + location.href;

    const encoded = encodeURIComponent(text);

    // الرقم بتاعك
    const phone = "201121299169";

    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, "_blank");
});

document.getElementById('sendBtn').addEventListener('click', function() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('number').value.trim();
    const msg = document.getElementById('message').value.trim();

    // صياغة الرسالة
    let text = "";
    if (name) text += "الاسم: " + name + "\n";
    if (email) text += "رقم الهاتف:" + email + "\n";
    if (msg) text += "الرسالة: " + msg + "\n";


    const encoded = encodeURIComponent(text);

    // الرقم بتاعك ثابت هنا
    const phone = "201093310936";

    // الرابط النهائي
    const url = `https://wa.me/${phone}?text=${encoded}`;

    window.open(url, "_blank");
});