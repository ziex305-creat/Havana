(() => {
    const languagePairs = [
        ["HaVaNa Shop|Home", "HaVaNa Shop | الرئيسية"],
        ["HaVaNa Shop | Cart", "HaVaNa Shop | السلة"],
        ["HaVaNa Shop | Hoodies", "HaVaNa Shop | هوديز"],
        ["HaVaNa Shop | SHOP", "HaVaNa Shop | المتجر"],
        ["Dashboard - HaVaNa Shop", "لوحة الحساب - HaVaNa Shop"],
        ["Havana Shop - T-Shirts", "Havana Shop - تيشيرتات"],
        ["HaVaNa Support", "دعم HaVaNa"],
        ["HaVaNa Shop", "HaVaNa Shop"],
        ["Home", "الرئيسية"],
        ["SHOP", "المتجر"],
        ["Shop", "المتجر"],
        ["T-SHIRTS", "تيشيرتات"],
        ["HOODIES", "هوديز"],
        ["GET offer", "العروض"],
        ["Contact", "تواصل معنا"],
        ["Login", "تسجيل الدخول"],
        ["Logout", "تسجيل الخروج"],
        ["Elevate Your Look. Own Your Style.", "ارتقِ بإطلالتك. عبّر عن أسلوبك."],
        ["Discover a smoother, smarter shopping experience designed around your needs. We bring you top-quality products, fast service, and a seamless journey from start to finish. Find everything you want in one place—because you deserve the best.", "اكتشف تجربة تسوق أسهل وأذكى تناسبك. نقدم لك منتجات عالية الجودة وخدمة سريعة ورحلة شراء بسيطة من البداية للنهاية. كل ما تحتاجه في مكان واحد، لأنك تستحق الأفضل."],
        ["SHOPING NOW", "تسوق الآن"],
        ["CONTACT US", "تواصل معنا"],
        ["Why Choose HaVaNa Shop?", "لماذا تختار HaVaNa Shop؟"],
        ["Premium Quality", "جودة مميزة"],
        ["We source only the finest materials to ensure our products meet the highest standards.", "نختار أفضل الخامات لضمان منتجات بجودة تليق بك."],
        ["Fast Shipping", "شحن سريع"],
        ["Enjoy quick and reliable delivery right to your doorstep.", "استلم طلبك بسرعة وبخدمة توصيل موثوقة."],
        ["24/7 Support", "دعم على مدار الساعة"],
        ["Our dedicated support team is here to assist you anytime, anywhere.", "فريق الدعم موجود لمساعدتك في أي وقت ومن أي مكان."],
        ["New Arrivals", "وصل حديثًا"],
        ["New collection", "تشكيلة جديدة"],
        ["SHOP collection", "تسوق التشكيلة"],
        ["View All Products", "عرض كل المنتجات"],
        ["View Product", "عرض المنتج"],
        ["Buy Now", "اشتري الآن"],
        ["Price | 500 EGP", "السعر | ٥٠٠ جنيه"],
        ["Price:", "السعر:"],
        ["500 EGP", "٥٠٠ جنيه"],
        ["Sweatshirt 🔥", "سويت شيرت🔥"],
        ["High-quality hoodie made from premium cotton", "سويت شيرت عالي الجودة من القطن الفاخر"],
        ["Limited Time Offer!", "عرض لفترة محدودة!"],
        ["Get 10% off on your first purchase. Use code", "احصل على خصم ١٠٪ على أول طلب باستخدام الكود"],
        ["at checkout.", "عند إتمام الطلب."],
        ["Subscribe to our newsletter for exclusive deals and updates.", "اشترك لتصلك العروض والتحديثات الحصرية."],
        ["Enter your email address to receive a discount code for up to 50% off.", "أدخل بريدك الإلكتروني لاستلام كود خصم يصل إلى ٥٠٪."],
        ["Get Discount", "احصل على الخصم"],
        ["Enter your email", "أدخل بريدك الإلكتروني"],
        ["© 2023 HaVaNa Shop. All rights reserved.", "© ٢٠٢٣ HaVaNa Shop. جميع الحقوق محفوظة."],
        ["Your Cart", "سلة التسوق"],
        ["Total:", "الإجمالي:"],
        ["EG", "جنيه"],
        ["Enter discount code", "أدخل كود الخصم"],
        ["Apply", "تطبيق"],
        ["Empty Cart", "إفراغ السلة"],
        ["Order Now", "إتمام الطلب"],
        ["Cart is empty", "سلة التسوق فارغة"],
        ["Cart is empty.", "سلة التسوق فارغة."],
        ["Add to Cart", "أضف إلى السلة"],
        ["Added to Cart!", "تمت الإضافة إلى السلة!"],
        ["⚠️ لازم تسجل دخول", "⚠️ Please sign in first"],
        ["⚠️ لازم تسجيل دخول", "⚠️ Please sign in first"],
        ["⚠️ لازم تسجيل دخول بنفس الإيميل", "⚠️ Sign in with the same email first"],
        ["⚠️ لازم تسجل دخول الأول", "⚠️ Please sign in first"],
        ["⚠️ مفيش كود خصم على حسابك", "⚠️ Your account has no discount code"],
        ["❌ الكود اتستخدم قبل كده", "❌ This code has already been used"],
        ["❌ كود غير صحيح", "❌ Invalid discount code"],
        ["⚠️ لديك كود بالفعل:", "⚠️ You already have a code:"],
        ["⚠️ لقد حصلت بالفعل على كود خصم:", "⚠️ You already have a discount code:"],
        ["🎉 كودك:", "🎉 Your code:"],
        ["🎉 كود خصمك:", "🎉 Your discount code:"],
        ["تم تطبيق الخصم", "Discount applied"],
        ["تأكيد الطلب", "Confirm order"],
        ["بيانات الشحن", "Shipping details"],
        ["اسم العميل", "Customer name"],
        ["رقم الهاتف", "Phone number"],
        ["العنوان", "Address"],
        ["تم تأكيد الطلب 🎉", "Order confirmed 🎉"],
        ["رقم الطلب:", "Order number:"],
        ["تفاصيل العميل:", "Customer details:"],
        ["تفاصيل المنتجات:", "Items:"],
        ["الإجمالي:", "Total:"],
        ["تحميل الفاتورة PDF", "Download invoice PDF"],
        ["يرجى ملء جميع البيانات!", "Please fill in all fields."],
        ["السلة فارغة أو تحتوي على بيانات غير صالحة.", "The cart is empty or contains invalid items."],
        ["تعذر الاتصال بقاعدة البيانات. راجع إعداد Supabase وحاول مرة أخرى.", "Could not connect to the database. Check the Supabase setup and try again."],
        ["جارٍ حفظ الطلب...", "Saving your order..."],
        ["لم يتم حفظ الطلب. تأكد من إعداد جداول Supabase والاتصال بالإنترنت ثم حاول مرة أخرى.", "The order was not saved. Check the Supabase tables and your internet connection, then try again."],
        ["الإجمالي قبل الخصم:", "Subtotal:"],
        ["الخصم:", "Discount:"],
        ["الخصم: لا يوجد", "Discount: none"],
        ["الخصم (", "Discount ("],
        ["الاسم:", "Name:"],
        ["الهاتف:", "Phone:"],
        ["سلة التسوق فارغة!", "Your cart is empty!"],
        ["CONTACT US", "تواصل معنا"],
        ["Email", "البريد الإلكتروني"],
        ["contact", "تواصل"],
        ["whatsapp Contact", "التواصل عبر واتساب"],
        ["Ready to lesning your massage.", "يسعدنا تواصلك معنا."],
        ["Name *", "الاسم *"],
        ["Email *", "البريد الإلكتروني *"],
        ["Brand / product Name", "العلامة التجارية / اسم المنتج"],
        ["catogr?", "التصنيف"],
        ["Hoodies", "هوديز"],
        ["T-shirts", "تيشيرتات"],
        ["Other", "أخرى"],
        ["massage Type", "نوع الرسالة"],
        ["Short-form", "مختصرة"],
        ["Inquiry-form", "استفسار"],
        ["your Message", "رسالتك"],
        ["Send Message", "إرسال الرسالة"],
        ["Prefer email? Reach me directly at", "تفضل البريد؟ راسلنا مباشرة على"],
        ["SEND", "إرسال"],
        ["Your name", "اسمك"],
        ["Type your name", "اكتب اسمك"],
        ["Phone number", "رقم الهاتف"],
        ["How can I help you?", "كيف نقدر نساعدك؟"],
        ["اقدر اساعدك ازي", "How can I help you?"],
        ["Login | HaVaNa Shop", "تسجيل الدخول | HaVaNa Shop"],
        ["Welcome To HaVaNa Shop", "أهلًا بك في HaVaNa Shop"],
        ["Sign in to access your account", "سجل دخولك للوصول إلى حسابك"],
        ["Remember me", "تذكرني"],
        ["Forgot Password?", "نسيت كلمة المرور؟"],
        ["LOGIN", "دخول"],
        ["Don't have an account?", "ليس لديك حساب؟"],
        ["Create Account", "إنشاء حساب"],
        ["Forgot Password", "استعادة كلمة المرور"],
        ["Enter your email to reset your password", "أدخل بريدك لإعادة تعيين كلمة المرور"],
        ["Send Reset Link", "إرسال رابط الاستعادة"],
        ["Back to Login", "العودة لتسجيل الدخول"],
        ["Welcome", "مرحبًا"],
        ["Sign Up to Access Your New Account", "أنشئ حسابك الجديد"],
        ["Create", "إنشاء الحساب"],
        ["Display name", "الاسم الظاهر"],
        ["Disply name", "الاسم الظاهر"],
        ["@user_name", "@اسم_المستخدم"],
        ["Email Address", "البريد الإلكتروني"],
        ["Password", "كلمة المرور"],
        ["Confirm password", "تأكيد كلمة المرور"],
        ["Passwords do NOT match!", "كلمتا المرور غير متطابقتين."],
        ["Username contains inappropriate words!", "اسم المستخدم يحتوي على كلمات غير مسموحة."],
        ["Password must contain:\n- Uppercase letter\n- Lowercase letter\n- Number\n- Symbol\n- At least 8 characters", "يجب أن تحتوي كلمة المرور على:\n- حرف كبير\n- حرف صغير\n- رقم\n- رمز\n- ٨ أحرف على الأقل"],
        ["Email not found!", "البريد الإلكتروني غير موجود."],
        ["Password reset link sent!", "تم إرسال رابط استعادة كلمة المرور."],
        ["Admin dashboard is not available yet.", "لوحة تحكم الإدارة غير متاحة حتى الآن."],
        ["Dashboard - HaVaNa Shop", "لوحة الحساب - HaVaNa Shop"],
        ["الملف الشخصي", "Profile"],
        ["تسجيل خروج", "Log out"],
        ["تعديل البيانات", "Edit profile"],
        ["حفظ", "Save"],
        ["مرحبا،", "Welcome,"],
        ["المستخدم", "Customer"],
        ["اسم المستخدم:", "Username:"],
        ["البريد الإلكتروني:", "Email:"],
        ["يرجى تسجيل الدخول أولاً", "Please sign in first."],
        ["يرجى ملء جميع الحقول!", "Please fill in all fields."],
        ["تم حفظ التعديلات بنجاح!", "Your changes were saved."],
        ["No description available.", "لا يوجد وصف متاح."],
        ["Reset to Main Image", "إعادة الصورة الرئيسية"],
        ["HaVaNa Support", "دعم HaVaNa"],
        ["تتبع الطلب", "Track order"],
        ["سياسة الشحن", "Shipping policy"],
        ["الإرجاع", "Returns"],
        ["ترشيح منتجات", "Product recommendations"],
        ["تواصل مع الدعم الفني", "Contact support"],
        ["اكتب رسالتك...", "Type your message..."],
        ["اكتب مشكلتك بالتفصيل:", "Describe your issue in detail:"],
        ["تمام ✔️ اكتب مشكلتك بالتفصيل:", "Sure ✔️ Describe your issue in detail:"],
        ["جاري تحويلك للدعم الفني… ⏳", "Connecting you with support… ⏳"],
        ["تم تحويلك للدعم الفني ✔️ سيتم الرد عليك قريبًا ❤️", "You are connected with support ✔️ We will reply soon ❤️"],
        ["مدة الشحن 2-5 أيام داخل مصر 🚚", "Shipping takes 2–5 days within Egypt 🚚"],
        ["يمكنك الإرجاع خلال 14 يومًا ❤️", "You can return items within 14 days ❤️"],
        ["ثانية واحدة… بدوّر على أفضل المنتجات 👗", "One moment… finding the best products 👗"],
        ["ممكن توضح أكتر؟ 😊", "Could you tell me a little more? 😊"],
        ["تم حل المشكلة ❤️ من فضلك قيّم تجربتك:", "Issue resolved ❤️ Please rate your experience:"],
        ["شكراً لتقييمك! 💛", "Thank you for your feedback! 💛"],
        ["Added to Cart!", "تمت الإضافة إلى السلة!"],
        ["تمت الإضافة للسلة 🛒", "Added to cart 🛒"],
        ["Are you sure you want to empty the cart?", "هل أنت متأكد من إفراغ السلة؟"],
        ["Please enter your email!", "من فضلك أدخل بريدك الإلكتروني."],
        ["T-shirts", "تيشيرتات"],
        ["SOON🔥", "قريبًا 🔥"],
        ["NEW", "جديد"]
    ];

    const normalizedPairs = languagePairs.map(([first, second]) => {
        const firstIsArabic = /[\u0600-\u06ff]/i.test(first);
        const secondIsArabic = /[\u0600-\u06ff]/i.test(second);
        return firstIsArabic && !secondIsArabic ? [second, first] : [first, second];
    });
    const englishToArabic = new Map(normalizedPairs);
    const arabicToEnglish = new Map(normalizedPairs.map(([english, arabic]) => [arabic, english]));
    let currentLanguage = "en";
    try {
        currentLanguage = localStorage.getItem("havana-site-language") || "ar";
    } catch {
        currentLanguage = "en";
    }
    if (currentLanguage !== "ar" && currentLanguage !== "en") currentLanguage = "en";

    function translateText(value, language = currentLanguage) {
        const normalized = value.trim();
        const translations = language === "ar" ? englishToArabic : arabicToEnglish;
        let translated = translations.get(normalized);

        if (!translated) {
            let partial = normalized;
            const fragments = [...translations.entries()].sort((first, second) => second[0].length - first[0].length);
            fragments.forEach(([source, target]) => {
                if (source.length > 1 && partial.includes(source)) {
                    partial = partial.replaceAll(source, target);
                }
            });
            if (partial !== normalized) translated = partial;
        }

        if (!translated) {
            if (language === "ar" && /\bEGP\b/.test(normalized)) {
                translated = normalized.replace(/\bEGP\b/g, "جنيه");
            } else if (language === "en" && normalized.includes(" جنيه")) {
                translated = normalized.replace(/ جنيه/g, " EGP");
            }
        }

        if (translated) {
            if (language === "ar") translated = translated.replace(/\bEGP\b/g, "جنيه");
            else translated = translated.replace(/ جنيه/g, " EGP").replace(/ ج(?=\s|$)/g, " EGP");
        }

        return translated ?? value;
    }

    function translateTextNodes(root) {
        if (!root) return;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (node.parentElement?.closest(".language-toggle, script, style, textarea, .message.user")) continue;
            const original = node.nodeValue;
            const translated = translateText(original);
            if (translated !== original) node.nodeValue = translated;
        }
    }

    function translateAttributes(root) {
        if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
        const elements = [root, ...root.querySelectorAll("[placeholder], [title], [alt], [aria-label]")];
        elements.forEach(element => {
            ["placeholder", "title", "alt", "aria-label"].forEach(attribute => {
                const value = element.getAttribute(attribute);
                if (!value) return;
                const translated = translateText(value);
                if (translated !== value) element.setAttribute(attribute, translated);
            });
        });
    }

    function translatePage(root = document.body) {
        if (root === document.body) {
            document.documentElement.lang = currentLanguage;
            document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
            document.title = translateText(document.title);
        }
        translateTextNodes(root);
        translateAttributes(root);
        updateToggle();
    }

    function updateToggle() {
        const button = document.querySelector(".language-toggle");
        if (button) {
            button.textContent = currentLanguage === "ar" ? "English" : "العربية";
            button.setAttribute("aria-label", currentLanguage === "ar" ? "Switch language to English" : "التبديل إلى العربية");
            button.setAttribute("title", currentLanguage === "ar" ? "Switch to English" : "التبديل إلى العربية");
        }
        document.querySelectorAll(".nav-toggle").forEach(menuToggle => {
            updateNavToggleLabel(menuToggle, menuToggle.getAttribute("aria-expanded") === "true");
        });
    }

    function updateNavToggleLabel(button, isOpen) {
        const label = currentLanguage === "ar"
            ? (isOpen ? "إغلاق القائمة" : "فتح القائمة")
            : (isOpen ? "Close menu" : "Open menu");
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
    }

    document.querySelectorAll(".nav-container").forEach((container, index) => {
        const navLinks = container.querySelector(".nav-links");
        if (!navLinks) return;

        if (!navLinks.id) navLinks.id = `site-nav-links-${index + 1}`;

        const menuToggle = document.createElement("button");
        menuToggle.type = "button";
        menuToggle.className = "nav-toggle";
        menuToggle.setAttribute("aria-controls", navLinks.id);
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "<span></span><span></span><span></span>";

        const setMenuOpen = isOpen => {
            menuToggle.classList.toggle("is-open", isOpen);
            navLinks.classList.toggle("is-open", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            updateNavToggleLabel(menuToggle, isOpen);
        };

        menuToggle.addEventListener("click", () => {
            setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
        });
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => setMenuOpen(false));
        });
        document.addEventListener("click", event => {
            if (!container.contains(event.target)) setMenuOpen(false);
        });
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") setMenuOpen(false);
        });

        container.insertBefore(menuToggle, navLinks);
        updateNavToggleLabel(menuToggle, false);
    });

    window.siteTranslate = translateText;
    window.siteLanguage = () => currentLanguage;
    const nativeAlert = window.alert.bind(window);
    const nativeConfirm = window.confirm.bind(window);
    window.alert = message => nativeAlert(translateText(String(message)));
    window.confirm = message => nativeConfirm(translateText(String(message)));

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "language-toggle";
    toggle.addEventListener("click", () => {
        currentLanguage = currentLanguage === "ar" ? "en" : "ar";
        try {
            localStorage.setItem("havana-site-language", currentLanguage);
        } catch {
            // Keep the selected language for the current page if storage is unavailable.
        }
        translatePage();
    });
    document.body.appendChild(toggle);
    translatePage();

    const observer = new MutationObserver(records => {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                if (!node.parentElement?.closest(".language-toggle, script, style, textarea, .message.user")) {
                    node.nodeValue = translateText(node.nodeValue);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE && !node.matches(".language-toggle")) {
                translateTextNodes(node);
                translateAttributes(node);
            }
        }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
