document.addEventListener("DOMContentLoaded", () => {
    const orderForm = document.getElementById("orderForm");
    const invoiceBox = document.getElementById("invoiceBox");
    const confirmButton = document.getElementById("confirmOrder");

    function getCart() {
        try {
            const user = JSON.parse(localStorage.getItem("loggedInUser"));
            const legacyCartKey = "cart_" + (user ? user.email : "guest");
            const cart = JSON.parse(localStorage.getItem("cart") || localStorage.getItem(legacyCartKey) || "[]");
            if (!localStorage.getItem("cart") && cart.length) {
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            return cart;
        } catch {
            return [];
        }
    }

    function getDiscount() {
        try {
            const discount = JSON.parse(localStorage.getItem("cartDiscount"));
            const value = Number(discount?.value);
            return Number.isFinite(value) ? Math.min(Math.max(value, 0), 50) : 0;
        } catch {
            return 0;
        }
    }

    function displayInvoice({ orderNumber, name, phone, address, cart, subtotal, discount, total }) {
        document.getElementById("orderID").textContent = `ORD-${String(orderNumber).padStart(6, "0")}`;
        document.getElementById("invName").textContent = `الاسم: ${name}`;
        document.getElementById("invPhone").textContent = `رقم الهاتف: ${phone}`;
        document.getElementById("invAddress").textContent = `العنوان: ${address}`;

        const productsBox = document.getElementById("invProducts");
        productsBox.replaceChildren();
        cart.forEach(item => {
            const line = document.createElement("p");
            line.textContent = `${item.name} - الكمية: ${item.qty} - السعر: ${item.price} ج`;
            productsBox.appendChild(line);
        });

        document.getElementById("invSubtotal").textContent = `الإجمالي قبل الخصم: ${subtotal} ج`;
        document.getElementById("invDiscount").textContent = discount
            ? `الخصم (${discount}%): -${Math.round(subtotal - total)} ج`
            : "الخصم: لا يوجد";
        document.getElementById("invTotal").textContent = `الإجمالي النهائي: ${Math.round(total)} ج`;
        orderForm.style.display = "none";
        invoiceBox.style.display = "block";
    }

    async function generateInvoice() {
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const cart = getCart();

        if (!name || !phone || !address) {
            alert("يرجى ملء جميع البيانات!");
            return;
        }
        if (!cart.length || cart.some(item => !item.name || !Number(item.price) || !Number(item.qty))) {
            alert("السلة فارغة أو تحتوي على بيانات غير صالحة.");
            return;
        }
        if (!window.supabaseClient) {
            alert("تعذر الاتصال بقاعدة البيانات. راجع إعداد Supabase وحاول مرة أخرى.");
            return;
        }

        const whatsappWindow = window.open("about:blank", "_blank");
        confirmButton.disabled = true;
        confirmButton.textContent = "جارٍ حفظ الطلب...";

        try {
            const discount = getDiscount();
            const { data, error } = await window.supabaseClient.rpc("create_store_order", {
                p_customer_name: name,
                p_customer_phone: phone,
                p_customer_address: address,
                p_items: cart.map(item => ({
                    name: item.name,
                    price: Number(item.price),
                    qty: Number(item.qty),
                    image: item.image || ""
                })),
                p_discount_percent: discount
            });

            if (error) throw error;

            const savedOrder = Array.isArray(data) ? data[0] : data;
            const subtotal = Number(savedOrder.subtotal);
            const total = Number(savedOrder.total_amount);
            const orderNumber = savedOrder.order_no;
            const orderId = `ORD-${String(orderNumber).padStart(6, "0")}`;

            displayInvoice({ orderNumber, name, phone, address, cart, subtotal, discount, total });

            const message = [
                "طلب جديد:",
                `رقم الطلب: ${orderId}`,
                `الاسم: ${name}`,
                `الهاتف: ${phone}`,
                `العنوان: ${address}`,
                "",
                "المنتجات:",
                ...cart.map(item => `${item.name} - الكمية: ${item.qty} - السعر: ${item.price} ج`),
                "",
                `الإجمالي قبل الخصم: ${subtotal} ج`,
                `الخصم: ${discount}%`,
                `الإجمالي النهائي: ${Math.round(total)} ج`
            ].join("\n");
            const whatsappUrl = `https://wa.me/201093310936?text=${encodeURIComponent(message)}`;

            if (whatsappWindow) whatsappWindow.location.href = whatsappUrl;
            else window.location.href = whatsappUrl;

            localStorage.removeItem("cart");
            localStorage.removeItem("cartDiscount");
        } catch (error) {
            if (whatsappWindow) whatsappWindow.close();
            console.error("Could not save order:", error);
            alert("لم يتم حفظ الطلب. تأكد من إعداد جداول Supabase والاتصال بالإنترنت ثم حاول مرة أخرى.");
        } finally {
            confirmButton.disabled = false;
            confirmButton.textContent = "تأكيد الطلب";
        }
    }

    confirmButton.addEventListener("click", generateInvoice);

    document.getElementById("downloadPDF").addEventListener("click", () => {
        html2pdf().from(invoiceBox).set({
            margin: 1,
            filename: `فاتورة_${Date.now()}.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { unit: "cm", format: "a4", orientation: "portrait" }
        }).save();
    });
});