/**
 * NyayaSetu Clean Dictionary Language Translator (English <-> Hindi)
 * Pure client-side dictionary translator with NO auto-reloads and NO loops.
 */

const translations = {
  en: {
    // Nav & Brand
    "nav_brand_sub": "न्यायसेतु • Civic Action Assistant",
    "nav_explore": "Explore Services",
    "nav_how": "How It Works",
    "nav_trust": "Source Trust",
    "nav_home": "Home",
    "nav_rights": "Rights Navigator",
    "nav_rti": "RTI Builder",
    "nav_schemes": "Schemes",
    "nav_forms": "Form Filler",
    "nav_back": "← Back Home",
    "lang_btn_text": "EN / हिंदी",

    // Hero Section
    "hero_tag": "Official Source-Backed Civic Assistant",
    "hero_title": "Confused by a government process?<br>Let's find your next step.",
    "hero_subtitle": "Describe what you're trying to solve in your own words. NyayaSetu extracts key facts, checks official sources, and guides you to the right service.",
    "hero_placeholder": "Describe your situation or problem in detail... e.g. My landlord in Prayagraj hasn't returned my ₹15,000 security deposit for two months even though I vacated after serving notice.",
    "hero_speak": "Speak",
    "hero_clear": "✕ Clear",
    "hero_find_path": "Find My Path",
    "hero_try_asking": "Try asking:",

    // Example Pills
    "pill_tenant": "Tenant deposit refund",
    "pill_rti": "Road project expenditure RTI",
    "pill_scholarship": "Scholarship eligibility check",
    "pill_income": "Income Certificate Form",

    // Services Section
    "services_heading": "Four Purpose-Built Workflows",
    "services_subtitle": "Each module has its own visual identity, step-by-step intake, and official document backing.",
    "card_rights_title": "Rights Navigator",
    "card_rights_desc": "Understand tenant, consumer, or civic rights in plain language. Get clear step-by-step action plans grounded in Model Acts and state rules.",
    "card_rights_btn": "Resolve An Issue →",

    "card_rti_title": "RTI Application Builder",
    "card_rti_desc": "Turn your information request into a structured Right to Information (RTI) application with automated PIO authority matching and downloadable PDF.",
    "card_rti_btn": "Build RTI Application →",

    "card_schemes_title": "Scheme Eligibility Checker",
    "card_schemes_desc": "Verify whether you qualify for government welfare schemes using deterministic income/category rules and official guideline citations.",
    "card_schemes_btn": "Check Scheme Qualification →",

    "card_forms_title": "Guided Form Filler",
    "card_forms_desc": "Complete selected government intake forms step-by-step with real-time field validation, clean preview, and print-ready PDF export.",
    "card_forms_btn": "Fill Government Form →",

    // How It Works
    "how_title": "How NyayaSetu Works",
    "how_subtitle": "A transparent, 4-step guided path designed to keep citizens in full control.",
    "how_step1_title": "Describe",
    "how_step1_desc": "Tell us your situation or question in free-form language or voice input. We extract structured details automatically.",
    "how_step2_title": "Confirm",
    "how_step2_desc": "Review the extracted details (location, amount, issue type) and confirm the recommended workflow.",
    "how_step3_title": "Verify",
    "how_step3_desc": "Every guidance point is verified against official government guidelines, Gazette notifications, and statutory rules.",
    "how_step4_title": "Act",
    "how_step4_desc": "Get a clear Case Workspace action plan, document checklist, and official generated PDF ready to file.",

    // Trust Section
    "trust_title": "Grounded in Verified Official Sources",
    "trust_desc": "NyayaSetu never invents laws, section numbers, or deadlines. All insights link directly to official ministry guidelines, gazettes, and acts.",
    "trust_btn": "Explore Workflows",

    // Footer
    "footer_brand": "An AI-powered Civic Action Assistant helping citizens understand their rights, verify official information, and know what to do next.",
    "footer_title_modules": "Modules",
    "footer_title_resources": "Resources",
    "footer_title_legal": "Legal & Civic",
    "footer_disclaimer": "Disclaimer: NyayaSetu provides general civic and legal information based on official sources. It does not provide binding legal advice or formal representation."
  },

  hi: {
    // Nav & Brand
    "nav_brand_sub": "न्यायसेतु • नागरिक सेवा सहायक",
    "nav_explore": "सेवाएँ देखें",
    "nav_how": "यह कैसे काम करता है",
    "nav_trust": "विश्वसनीय स्रोत",
    "nav_home": "मुख्य पृष्ठ",
    "nav_rights": "अधिकार नेविगेटर",
    "nav_rti": "RTI बिल्डर",
    "nav_schemes": "सरकारी योजनाएँ",
    "nav_forms": "फॉर्म सहायक",
    "nav_back": "← वापस मुख्य पृष्ठ",
    "lang_btn_text": "हिंदी / EN",

    // Hero Section
    "hero_tag": "आधिकारिक सरकारी स्रोतों द्वारा सत्यापित नागरिक सहायक",
    "hero_title": "सरकारी प्रक्रिया या अधिकार को लेकर उलझन में हैं?<br>आइए आपका अगला कदम खोजें।",
    "hero_subtitle": "अपनी समस्या अपने शब्दों में बताएं। न्यायसेतु मुख्य तथ्यों का विश्लेषण करता है, आधिकारिक नियमों की जांच करता है और आपको सही दिशा दिखाता है।",
    "hero_placeholder": "अपनी स्थिति या समस्या को विस्तार से बताएं... उदा. प्रयागराज में मेरे मकान मालिक ने 2 महीने से मेरी ₹15,000 की सुरक्षा जमा राशि वापस नहीं की है।",
    "hero_speak": "बोलें",
    "hero_clear": "✕ साफ़ करें",
    "hero_find_path": "मेरा समाधान खोजें",
    "hero_try_asking": "उदाहरण प्रश्न आजमाएं:",

    // Example Pills
    "pill_tenant": "किरायेदार सुरक्षा जमा रिफंड",
    "pill_rti": "सड़क निर्माण खर्च की RTI जानकारी",
    "pill_scholarship": "छात्रवृत्ति पात्रता की जांच",
    "pill_income": "आय प्रमाण पत्र आवेदन फॉर्म",

    // Services Section
    "services_heading": "चार समर्पित कार्यप्रवाह",
    "services_subtitle": "प्रत्येक मॉड्यूल की अपनी पहचान, चरण-दर-चरण मार्गदर्शन और आधिकारिक दस्तावेज़ सत्यापन है।",
    "card_rights_title": "अधिकार नेविगेटर",
    "card_rights_desc": "किरायेदार, उपभोक्ता या नागरिक अधिकारों को सरल भाषा में समझें। कानून और नियमों पर आधारित स्पष्ट चरण-दर-चरण कार्रवाई योजना प्राप्त करें।",
    "card_rights_btn": "अपनी समस्या सुलझाएं →",

    "card_rti_title": "RTI आवेदन निर्माता",
    "card_rti_desc": "सूचना के अधिकार (RTI) के तहत अपनी जानकारी की मांग को स्वचालित जन सूचना अधिकारी (PIO) पते के साथ औपचारिक RTI आवेदन और डाउनलोड योग्य PDF में बदलें।",
    "card_rti_btn": "RTI आवेदन बनाएं →",

    "card_schemes_title": "सरकारी योजना पात्रता जांच",
    "card_schemes_desc": "आय, श्रेणी और आधिकारिक दिशा-निर्देशों के नियमों के आधार पर जांचें कि आप किन सरकारी कल्याणकारी योजनाओं के पात्र हैं।",
    "card_schemes_btn": "योजना पात्रता जांचें →",

    "card_forms_title": "मार्गदर्शित फॉर्म सहायक",
    "card_forms_desc": "वास्तविक समय फ़ील्ड जांच और तुरंत डाउनलोड योग्य PDF दस्तावेज़ के साथ आधिकारिक सरकारी आवेदन फॉर्म आसानी से भरें।",
    "card_forms_btn": "मार्गदर्शित फॉर्म भरें →",

    // How It Works
    "how_title": "न्यायसेतु कैसे काम करता है",
    "how_subtitle": "पारदर्शी 4-चरण मार्गदर्शित प्रक्रिया जो नागरिकों को पूर्ण नियंत्रण में रखती है।",
    "how_step1_title": "वर्णन करें",
    "how_step1_desc": "अपनी स्थिति या प्रश्न अपनी भाषा में दर्ज करें या बोलें। हम मुख्य विवरण स्वचालित रूप से पहचानते हैं।",
    "how_step2_title": "पुष्टि करें",
    "how_step2_desc": "पहचाने गए विवरणों (स्थान, राशि, समस्या का प्रकार) की समीक्षा करें और अनुशंसित कार्यप्रवाह की पुष्टि करें।",
    "how_step3_title": "सत्यापित करें",
    "how_step3_desc": "प्रत्येक मार्गदर्शन बिंदु को आधिकारिक सरकारी दिशा-निर्देशों, राजपत्र अधिसूचनाओं और वैधानिक नियमों से सत्यापित किया जाता है।",
    "how_step4_title": "कार्रवाई करें",
    "how_step4_desc": "स्पष्ट कार्रवाई योजना, दस्तावेज़ चेकलिस्ट और दाखिल करने के लिए तैयार आधिकारिक PDF प्राप्त करें।",

    // Trust Section
    "trust_title": "सत्यापित आधिकारिक स्रोतों पर आधारित",
    "trust_desc": "न्यायसेतु कभी भी फर्जी कानून, धारा संख्या या समय सीमा नहीं बनाता है। सभी जानकारियां सीधे आधिकारिक मंत्रालय गाइडलाइंस और अधिनियमों से जुड़ी होती हैं।",
    "trust_btn": "कार्यप्रवाह देखें",

    // Footer
    "footer_brand": "एक AI-संचालित नागरिक सेवा सहायक जो नागरिकों को उनके अधिकारों को समझने, आधिकारिक जानकारी सत्यापित करने और आगे के कदम जानने में मदद करता है।",
    "footer_title_modules": "मॉड्यूल",
    "footer_title_resources": "संसाधन",
    "footer_title_legal": "कानूनी एवं नागरिक",
    "footer_disclaimer": "अस्वीकरण: न्यायसेतु आधिकारिक स्रोतों के आधार पर सामान्य नागरिक और कानूनी जानकारी प्रदान करता है। यह औपचारिक कानूनी सलाह नहीं है।"
  }
};

const Translator = {
  currentLang: localStorage.getItem('nyayasetu_lang') || 'en',

  init() {
    this.bindButtons();
    this.applyLanguage(this.currentLang);
  },

  bindButtons() {
    const langBtns = document.querySelectorAll('.lang-selector, #lang-toggle-btn');
    langBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleLanguage();
      };
    });
  },

  toggleLanguage() {
    const nextLang = this.currentLang === 'en' ? 'hi' : 'en';
    this.setLanguage(nextLang);
  },

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('nyayasetu_lang', lang);
    document.documentElement.lang = lang;
    this.applyLanguage(lang);
  },

  applyLanguage(lang) {
    const isHindi = lang === 'hi';
    const dict = translations[lang] || translations.en;

    // 1. Language Toggle Button text
    document.querySelectorAll('#current-lang-text').forEach(el => {
      el.textContent = dict.lang_btn_text;
    });

    // 2. Brand Subtext
    document.querySelectorAll('.brand-subtext').forEach(el => {
      if (el.textContent.includes('Civic Action Assistant') || el.textContent.includes('नागरिक सेवा')) {
        el.textContent = dict.nav_brand_sub;
      }
    });

    // 3. Main Nav Links (Home Page)
    const mainNavLinks = document.querySelectorAll('#main-nav-links .nav-link');
    if (mainNavLinks.length >= 3) {
      mainNavLinks[0].textContent = dict.nav_explore;
      mainNavLinks[1].textContent = dict.nav_how;
      mainNavLinks[2].textContent = dict.nav_trust;
    }

    // 4. Sub-page Nav Links & Back Buttons
    document.querySelectorAll('.nav-links .nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === '/') link.textContent = dict.nav_home;
      if (href && href.includes('rights.html')) link.textContent = dict.nav_rights;
      if (href && href.includes('rti.html')) link.textContent = dict.nav_rti;
      if (href && href.includes('schemes.html')) link.textContent = dict.nav_schemes;
      if (href && href.includes('forms.html')) link.textContent = dict.nav_forms;
    });

    document.querySelectorAll('.btn-outline').forEach(btn => {
      if (btn.textContent.includes('Back Home') || btn.textContent.includes('वापस मुख्य पृष्ठ')) {
        btn.textContent = dict.nav_back;
      }
    });

    // 5. Hero Section Elements
    const heroInput = document.getElementById('hero-query-input');
    if (heroInput) heroInput.placeholder = dict.hero_placeholder;

    const heroTagSpan = document.querySelector('.hero-tag span');
    if (heroTagSpan) heroTagSpan.textContent = dict.hero_tag;

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.innerHTML = dict.hero_title;

    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub) heroSub.textContent = dict.hero_subtitle;

    const micLabel = document.querySelector('.mic-label');
    if (micLabel) micLabel.textContent = dict.hero_speak;

    const clearBtn = document.getElementById('clear-text-btn');
    if (clearBtn) clearBtn.textContent = dict.hero_clear;

    const heroSubmitSpan = document.querySelector('#hero-submit-btn span');
    if (heroSubmitSpan) heroSubmitSpan.textContent = dict.hero_find_path;

    const exampleLabel = document.querySelector('.hero-examples-label');
    if (exampleLabel) exampleLabel.textContent = dict.hero_try_asking;

    const pills = document.querySelectorAll('.example-pill');
    if (pills.length >= 4) {
      pills[0].textContent = dict.pill_tenant;
      pills[1].textContent = dict.pill_rti;
      pills[2].textContent = dict.pill_scholarship;
      pills[3].textContent = dict.pill_income;
    }

    // 6. Services Section
    const servicesHeader = document.querySelector('.services-section .section-header');
    if (servicesHeader) {
      const h2 = servicesHeader.querySelector('h2');
      const p = servicesHeader.querySelector('p');
      if (h2) h2.textContent = dict.services_heading;
      if (p) p.textContent = dict.services_subtitle;
    }

    const cardRightsTitle = document.querySelector('#card-rights h3');
    const cardRightsDesc = document.querySelector('#card-rights p');
    const cardRightsBtn = document.querySelector('#card-rights .service-link-text');
    if (cardRightsTitle) cardRightsTitle.textContent = dict.card_rights_title;
    if (cardRightsDesc) cardRightsDesc.textContent = dict.card_rights_desc;
    if (cardRightsBtn) cardRightsBtn.textContent = dict.card_rights_btn;

    const cardRtiTitle = document.querySelector('#card-rti h3');
    const cardRtiDesc = document.querySelector('#card-rti p');
    const cardRtiBtn = document.querySelector('#card-rti .service-link-text');
    if (cardRtiTitle) cardRtiTitle.textContent = dict.card_rti_title;
    if (cardRtiDesc) cardRtiDesc.textContent = dict.card_rti_desc;
    if (cardRtiBtn) cardRtiBtn.textContent = dict.card_rti_btn;

    const cardSchemesTitle = document.querySelector('#card-schemes h3');
    const cardSchemesDesc = document.querySelector('#card-schemes p');
    const cardSchemesBtn = document.querySelector('#card-schemes .service-link-text');
    if (cardSchemesTitle) cardSchemesTitle.textContent = dict.card_schemes_title;
    if (cardSchemesDesc) cardSchemesDesc.textContent = dict.card_schemes_desc;
    if (cardSchemesBtn) cardSchemesBtn.textContent = dict.card_schemes_btn;

    const cardFormsTitle = document.querySelector('#card-forms h3');
    const cardFormsDesc = document.querySelector('#card-forms p');
    const cardFormsBtn = document.querySelector('#card-forms .service-link-text');
    if (cardFormsTitle) cardFormsTitle.textContent = dict.card_forms_title;
    if (cardFormsDesc) cardFormsDesc.textContent = dict.card_forms_desc;
    if (cardFormsBtn) cardFormsBtn.textContent = dict.card_forms_btn;

    // 7. How It Works Section
    const howHeader = document.querySelector('#how-it-works .section-header');
    if (howHeader) {
      const h2 = howHeader.querySelector('h2');
      const p = howHeader.querySelector('p');
      if (h2) h2.textContent = dict.how_title;
      if (p) p.textContent = dict.how_subtitle;
    }

    const steps = document.querySelectorAll('#how-it-works .step-card');
    if (steps.length >= 4) {
      if (steps[0].querySelector('h4')) steps[0].querySelector('h4').textContent = dict.how_step1_title;
      if (steps[0].querySelector('p')) steps[0].querySelector('p').textContent = dict.how_step1_desc;

      if (steps[1].querySelector('h4')) steps[1].querySelector('h4').textContent = dict.how_step2_title;
      if (steps[1].querySelector('p')) steps[1].querySelector('p').textContent = dict.how_step2_desc;

      if (steps[2].querySelector('h4')) steps[2].querySelector('h4').textContent = dict.how_step3_title;
      if (steps[2].querySelector('p')) steps[2].querySelector('p').textContent = dict.how_step3_desc;

      if (steps[3].querySelector('h4')) steps[3].querySelector('h4').textContent = dict.how_step4_title;
      if (steps[3].querySelector('p')) steps[3].querySelector('p').textContent = dict.how_step4_desc;
    }

    // 8. Trust Section
    const trustContent = document.querySelector('#trust .trust-content');
    if (trustContent) {
      const h3 = trustContent.querySelector('h3');
      const p = trustContent.querySelector('p');
      if (h3) h3.textContent = dict.trust_title;
      if (p) p.textContent = dict.trust_desc;
    }

    const trustBtn = document.querySelector('#trust .btn-outline');
    if (trustBtn) trustBtn.textContent = dict.trust_btn;

    // 9. Footer
    const footerBrand = document.querySelector('.footer-brand p');
    if (footerBrand) footerBrand.textContent = dict.footer_brand;

    const footerTitles = document.querySelectorAll('.footer-title');
    if (footerTitles.length >= 3) {
      footerTitles[0].textContent = dict.footer_title_modules;
      footerTitles[1].textContent = dict.footer_title_resources;
      footerTitles[2].textContent = dict.footer_title_legal;
    }

    const footerDisc = document.querySelector('.footer-disclaimer');
    if (footerDisc) {
      footerDisc.innerHTML = `<strong>${isHindi ? 'अस्वीकरण:' : 'Disclaimer:'}</strong> ${dict.footer_disclaimer.replace(/^Disclaimer:\s*/i, '').replace(/^अस्वीकरण:\s*/i, '')}`;
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Translator.init());
} else {
  Translator.init();
}

window.Translator = Translator;
