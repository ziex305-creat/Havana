let waitingForSupport = false;
let ticketOpen = false;
let ticketId = null;

const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messagesBox = document.getElementById("messages");
const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");

const bc = new BroadcastChannel("support_channel");

// فتح/إغلاق الشات
chatBtn.onclick = () => {
    chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
};

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;
    addMessage(msg, "user");
    input.value = "";

    if (ticketOpen) return sendToSupport(msg);

    if (msg.includes("دعم") || msg.includes("تواصل") || msg.includes("support") || msg.includes("contact")) {
        waitingForSupport = true;
        return addMessage("تمام ✔️ اكتب مشكلتك بالتفصيل:", "bot");
    }

    if (waitingForSupport) {
        addMessage("جاري تحويلك للدعم الفني… ⏳", "bot");
        setTimeout(() => createTicket(msg), 800);
        return;
    }

    botReply(msg);
}

function botReply(text) {
    text = text.toLowerCase();
    if (text.includes("شحن") || text.includes("shipping") || text.includes("delivery")) return addMessage("مدة الشحن 2-5 أيام داخل مصر 🚚", "bot");
    if (text.includes("ارجاع") || text.includes("إرجاع") || text.includes("return")) return addMessage("يمكنك الإرجاع خلال 14 يومًا ❤️", "bot");
    if (text.includes("ترشيح") || text.includes("recommend")) return addMessage("ثانية واحدة… بدوّر على أفضل المنتجات 👗", "bot");
    if (text.includes("طلب") || text.includes("track") || text.includes("order")) return addMessage("أرسل رقم الطلب لفريق الدعم لمساعدتك في متابعته.", "bot");
    addMessage("ممكن توضح أكتر؟ 😊", "bot");
}

function createTicket(message) {
    ticketId = Date.now();
    ticketOpen = true;
    waitingForSupport = false;

    let tickets = JSON.parse(localStorage.getItem("supportTickets") || "[]");

    tickets.push({
        id: ticketId,
        status: "open",
        messages: [{
            from: "user",
            text: message,
            time: new Date().toLocaleString()
        }]
    });

    localStorage.setItem("supportTickets", JSON.stringify(tickets));

    bc.postMessage({
        type: "new-ticket",
        ticketId,
        message
    });

    addMessage("تم تحويلك للدعم الفني ✔️ سيتم الرد عليك قريبًا ❤️", "bot");
}


function sendToSupport(message) {
    let tickets = JSON.parse(localStorage.getItem("supportTickets") || "[]");
    let t = tickets.find(t => t.id === ticketId);
    t.messages.push({ from: "user", text: message, time: new Date().toLocaleString() });
    localStorage.setItem("supportTickets", JSON.stringify(tickets));

    bc.postMessage({ type: "new-message", ticketId, message });
}

bc.onmessage = (e) => {
    if (e.data.type === "reply") {
        addMessage(`Support🛡️: ${e.data.text}`, "bot");
        let tickets = JSON.parse(localStorage.getItem("supportTickets") || "[]");
        let t = tickets.find(t => t.id === e.data.ticketId);
        t.messages.push({ from: "support", text: e.data.text, time: new Date().toLocaleString() });
        localStorage.setItem("supportTickets", JSON.stringify(tickets));
        ticketOpen = true;
    }
    if (e.data.type === "ticket-closed") showFeedback();
}

function showFeedback() {
    addMessage("تم حل المشكلة ❤️ من فضلك قيّم تجربتك:", "bot");
    const div = document.createElement("div");
    div.className = "rating";
    for (let i = 1; i <= 5; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.onclick = () => submitRating(i);
        div.appendChild(btn);
    }
    messagesBox.appendChild(div);
}

function submitRating(stars) {
    addMessage(`⭐ تقييمك: ${stars}/5`, "user");
    bc.postMessage({ type: "rating", ticketId, stars });
    addMessage("شكراً لتقييمك! 💛", "bot");
}

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.textContent = text;
    messagesBox.appendChild(div);
    messagesBox.scrollTop = messagesBox.scrollHeight;
}

function quickSend(text) {
    input.value = window.siteTranslate ? window.siteTranslate(text) : text;
    sendMessage();
}

// في bot.js عند submitRating
bc.postMessage({
    type: "rating",
    ticketId,
    stars,
    supportName: "Support Name" // ممكن تضيف اسم السابورت الحالي أو تخزنه عند الرد
});