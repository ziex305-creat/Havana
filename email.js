document.querySelector(".contact-form").addEventListener("submit", function(e) {
    e.preventDefault(); // منع الريفريش

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const brand = document.getElementById("brand").value.trim();
    const message = document.getElementById("message").value.trim();

    const platforms = [...document.querySelectorAll('input[name="platform"]:checked')]
        .map(el => el.nextElementSibling.textContent)
        .join(", ");

    // جلب الراديو المختار
    const contentType = document.querySelector('input[name="content-type"]:checked') ?
        document.querySelector('input[name="content-type"]:checked').nextElementSibling.textContent :
        "";

    // إعداد الرسالة
    let body = "";
    body += `Name: ${name}\n`;
    body += `Email: ${email}\n`;
    if (brand) body += `Brand/Product: ${brand}\n`;
    if (platforms) body += `Category: ${platforms}\n`;
    if (contentType) body += `Message Type: ${contentType}\n`;
    if (message) body += `Message:\n${message}\n`;
    body += `\nSent from page: ${location.href}`;

    const subject = "New Contact Form Submission";

    //  الإيميل الخاص بك 
    const yourEmail = "lensphotography.202@gmail.com";

    const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
});