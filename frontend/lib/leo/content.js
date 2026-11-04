// All copy for the LEO Institute showcase. Both languages MUST keep identical keys.

export const PHONES = [
  { display: "0770 736 2000", tel: "+9647707362000" },
  { display: "0750 886 2786", tel: "+9647508862786" },
];

export const SOCIALS = {
  instagram: "https://www.instagram.com/leo__institute/",
  facebook: "https://www.facebook.com/share/1A5FcmPKNE/",
  threads: "https://www.threads.net/@leo__institute",
};

// Optional: link to a real LEO AI deployment. Falls back to scrolling to #contact.
export const LEO_AI_URL = process.env.NEXT_PUBLIC_LEO_AI_URL || "";

// Language-independent English sample text for the writing demo (the learner writes English).
// `f: true` marks a corrected fragment.
export const WRITING_SEGMENTS = {
  market: [
    { t: "Yesterday I " },
    { t: "went", f: true },
    { t: " to the market and " },
    { t: "bought", f: true },
    { t: " some " },
    { t: "fruit", f: true },
    { t: "." },
  ],
  coffee: [
    { t: "She " },
    { t: "doesn't", f: true },
    { t: " like coffee because it " },
    { t: "is", f: true },
    { t: " too bitter." },
  ],
  agree: [
    { t: "I " },
    { t: "agree", f: true },
    { t: " with you about this topic." },
  ],
};

export const PLACEMENT_QUESTIONS = [
  { q: "She ___ to work every day.", options: ["go", "goes", "going"], answer: 1 },
  { q: "If I ___ more time, I would travel.", options: ["have", "had", "will have"], answer: 1 },
  {
    q: "The report ___ by the manager before the meeting.",
    options: ["was reviewed", "reviewed", "has reviewing"],
    answer: 0,
  },
];

export const content = {
  // ───────────────────────────── English ─────────────────────────────
  en: {
    nav: {
      home: "Home",
      about: "About",
      courses: "Courses",
      ai: "LEO AI",
      contact: "Contact",
      call: "Call us",
      switchLang: "کوردی",
      newBadge: "New",
      menu: "Menu",
    },
    hero: {
      eyebrow: "Learn · Enjoy · Stay",
      title: "Learn languages with confidence, now with your own AI tutor",
      subtitle:
        "English, Arabic and German courses online and in person, plus LEO AI: instant feedback, any time you want to practice.",
      ctaAi: "Try LEO AI",
      ctaCourses: "Our courses",
      chat: {
        header: "LEO AI",
        online: "Online",
        user: "I goed to school yesterday.",
        ai: "Almost! Say “I went to school yesterday.”",
        level: "Level: A2",
      },
    },
    stats: [
      { value: 44, suffix: "K+", label: "Instagram followers" },
      { value: 3, suffix: "", label: "Languages taught" },
      { text: "Online + In-person", label: "Learn your way" },
      { text: "Free", label: "Placement test" },
    ],
    about: {
      title: "About LEO Institute",
      text: "LEO Institute helps learners in the Kurdistan Region build language skills, personal development and confidence through practical, friendly courses.",
      values: [
        { title: "Learn", text: "Structured courses from A1 to C1 taught by experienced teachers." },
        { title: "Enjoy", text: "Lively lessons, real conversation and a friendly classroom." },
        { title: "Stay", text: "Keep progressing with follow-up, practice and LEO AI beside you." },
      ],
    },
    ai: {
      badge: "Powered by AI",
      title: "Meet LEO AI",
      subtitle:
        "Your personal language tutor, available 24/7. Try the demo below: it uses sample answers to show how LEO AI feels.",
      features: [
        "Instant, detailed feedback",
        "Available 24/7, practice non-stop",
        "Explanations in Kurdish when you need them",
        "Tracks your progress level by level",
      ],
      tabs: { writing: "Writing", speaking: "Speaking", placement: "Placement test" },
      cta: "Request full access",
      note: "This is a preview with sample answers.",
      writing: {
        hint: "Pick a sentence, then let LEO AI check it.",
        check: "Check my writing",
        checking: "Checking…",
        yourSentence: "Your sentence",
        corrected: "Corrected",
        estimated: "Estimated level",
        tips: "Tips",
        samples: [
          {
            id: "market",
            input: "Yesterday I goed to the market and buyed some fruits.",
            level: "A2",
            tips: [
              "“go” is irregular: go → went.",
              "“buy” becomes “bought”, not “buyed”.",
              "“fruit” is usually uncountable.",
            ],
          },
          {
            id: "coffee",
            input: "She don't like coffee because it are too bitter.",
            level: "A2",
            tips: ["With she / he / it, use “doesn't”.", "“it” goes with “is”, not “are”."],
          },
          {
            id: "agree",
            input: "I am agree with you about this topic.",
            level: "B1",
            tips: [
              "“agree” is a verb, so we don't say “am agree”.",
              "Good vocabulary: “topic” fits perfectly here.",
            ],
          },
        ],
      },
      speaking: {
        promptLabel: "Speaking prompt",
        prompt: "Tell me about your favourite place in Kurdistan.",
        record: "Record my answer",
        listening: "Listening…",
        analyzing: "Analyzing…",
        heard: "What LEO AI heard",
        transcript:
          "My favourite place is Dukan Lake. It is very beautiful and I go there with my family every summer.",
        scores: { pronunciation: "Pronunciation", fluency: "Fluency", grammar: "Grammar" },
        feedbackTitle: "Feedback",
        feedback:
          "Clear and well structured! Stress the word “beautiful” a little more, and try linking your sentences with “because” or “and then”.",
        again: "Try again",
      },
      placement: {
        intro: "Answer 3 quick questions and LEO AI will estimate your level.",
        start: "Start the test",
        question: "Question",
        of: "of",
        resultTitle: "Your estimated level",
        recommended: "Recommended course",
        restart: "Take it again",
        recs: {
          A1: "General English A1",
          A2: "General English A2",
          B1: "General English B1",
        },
      },
    },
    courses: {
      title: "Our courses",
      subtitle: "A taste of what LEO Institute can offer. Pick a course and register your interest.",
      online: "Online",
      inPerson: "In person",
      cta: "Register interest",
      note: "Course list is illustrative.",
      items: [
        { icon: "book", title: "General English", level: "A1 – C1", desc: "Speak, read, write and listen with confidence at every level.", online: true, inPerson: true },
        { icon: "monitor", title: "English Online", level: "All levels", desc: "Live online classes you can join from home.", online: true, inPerson: false },
        { icon: "smile", title: "Kids & Teens English", level: "Ages 6 – 17", desc: "Fun, interactive lessons designed for young learners.", online: true, inPerson: true },
        { icon: "languages", title: "Arabic", level: "Beginner – Advanced", desc: "Learn Arabic for study, work and everyday life.", online: true, inPerson: true },
        { icon: "plane", title: "German A1 (Visa)", level: "A1", desc: "Focused preparation for the A1 certificate needed for visas.", online: true, inPerson: true },
        { icon: "award", title: "IELTS Preparation", level: "B1 – C1", desc: "Strategies and practice tests for your target band score.", online: true, inPerson: true },
      ],
    },
    testimonials: {
      title: "What learners say",
      // SAMPLE testimonials: replace with real ones.
      items: [
        { name: "Shilan", role: "English learner", quote: "The classes are friendly and I finally speak without being afraid of mistakes." },
        { name: "Aram", role: "IELTS student", quote: "Practice tests and quick feedback helped me raise my score." },
        { name: "Dilan", role: "Parent", quote: "My daughter looks forward to her lessons every week." },
      ],
    },
    contact: {
      title: "Get in touch",
      text: "Call us, message us on social media, or leave your details and we'll call you back.",
      call: "Call",
      follow: "Follow us",
      location: "Kurdistan Region, Iraq",
      form: {
        name: "Full name",
        phone: "Phone number",
        course: "Course you're interested in",
        choose: "Choose a course",
        submit: "Send",
        success: "Thanks! We'll call you soon.",
        errName: "Please enter your name",
        errPhone: "Please enter a valid phone number",
        errCourse: "Please choose a course",
        demo: "Demo form: nothing is sent.",
      },
    },
    footer: {
      tagline: "Learn · Enjoy · Stay",
      links: "Quick links",
      contact: "Contact",
      follow: "Follow us",
      rights: "All rights reserved.",
      credit: "Website concept by Tutelage",
    },
  },

  // ───────────────────────────── Kurdish (Sorani) ─────────────────────────────
  // TODO(ku-review): all Kurdish strings below need a native-speaker proofread.
  ku: {
    nav: {
      home: "سەرەکی",
      about: "دەربارە",
      courses: "خولەکان",
      ai: "LEO AI",
      contact: "پەیوەندی",
      call: "پەیوەندیمان پێوە بکە",
      switchLang: "English",
      newBadge: "نوێ",
      menu: "مینیو",
    },
    hero: {
      eyebrow: "فێربە · چێژ وەربگرە · بمێنەرەوە",
      title: "زمان فێربە بە متمانەوە، ئێستا لەگەڵ مامۆستای زیرەکی خۆت",
      subtitle:
        "خولی ئینگلیزی، عەرەبی و ئەڵمانی بە شێوەی ئۆنلاین و بەرەوڕوو، لەگەڵ LEO AI کە هەر کاتێک ڕاهێنان بکەیت ڕاستەوخۆ ڕاستکردنەوەت بۆ دەکات.",
      ctaAi: "LEO AI تاقی بکەرەوە",
      ctaCourses: "خولەکانمان",
      chat: {
        header: "LEO AI",
        online: "ئۆنلاین",
        user: "I goed to school yesterday.",
        ai: "نزیکیت! بڵێ: “I went to school yesterday.”",
        level: "ئاست: A2",
      },
    },
    stats: [
      { value: 44, suffix: "K+", label: "شوێنکەوتووی ئینستاگرام" },
      { value: 3, suffix: "", label: "زمانی فێرکراو" },
      { text: "ئۆنلاین + بەرەوڕوو", label: "بە شێوازی خۆت فێربە" },
      { text: "بێبەرامبەر", label: "تاقیکردنەوەی ئاست" },
    ],
    about: {
      title: "دەربارەی پەیمانگای لیۆ",
      text: "پەیمانگای لیۆ یارمەتی فێرخوازانی هەرێمی کوردستان دەدات تا لە ڕێگەی خولی کرداری و دۆستانەوە زمان، گەشەپێدانی کەسی و متمانە بە خۆبوون بەهێز بکەن.",
      values: [
        { title: "فێربە", text: "خولی ڕێکخراو لە A1 تا C1 لەلایەن مامۆستای بەئەزموونەوە." },
        { title: "چێژ وەربگرە", text: "وانەی زیندوو، گفتوگۆی ڕاستەقینە و کەشێکی دۆستانە." },
        { title: "بمێنەرەوە", text: "بەردەوام پێشدەکەویت بە شوێنکەوتن، ڕاهێنان و LEO AI لە تەنیشتتەوە." },
      ],
    },
    ai: {
      badge: "بە هێزی زیرەکی دەستکرد",
      title: "ناسینی LEO AI",
      subtitle:
        "مامۆستای زمانی کەسی تۆ، ٢٤ کاتژمێر ئامادەیە. دیمۆکەی خوارەوە تاقی بکەرەوە: وەڵامی نموونە بەکاردەهێنێت بۆ پیشاندانی ئەزموونی LEO AI.",
      features: [
        "ڕاستکردنەوەی خێرا و ورد",
        "٢٤ کاتژمێر ئامادەیە، بێوچان ڕاهێنان بکە",
        "ڕوونکردنەوە بە کوردی کاتێک پێویستت پێیەتی",
        "پێشکەوتنت ئاست بە ئاست تۆمار دەکات",
      ],
      tabs: { writing: "نووسین", speaking: "قسەکردن", placement: "تاقیکردنەوەی ئاست" },
      cta: "داواکردنی دەستگەیشتنی تەواو",
      note: "ئەمە پیشاندانێکە بە وەڵامی نموونە.",
      writing: {
        hint: "یەکێک لە ڕستەکان هەڵبژێرە و با LEO AI بیپشکنێت.",
        check: "نووسینەکەم بپشکنە",
        checking: "پشکنین دەکرێت…",
        yourSentence: "ڕستەکەی تۆ",
        corrected: "ڕاستکراوە",
        estimated: "ئاستی مەزەندەکراو",
        tips: "ئامۆژگاری",
        samples: [
          {
            id: "market",
            input: "Yesterday I goed to the market and buyed some fruits.",
            level: "A2",
            tips: [
              "“go” کرداری ناڕێکە: go ← went.",
              "“buy” دەبێتە “bought”، نەک “buyed”.",
              "“fruit” زۆرجار بە ژمارە ناهێنرێت.",
            ],
          },
          {
            id: "coffee",
            input: "She don't like coffee because it are too bitter.",
            level: "A2",
            tips: [
              "لەگەڵ she / he / it بەکاربهێنە “doesn't”.",
              "“it” لەگەڵ “is” دێت، نەک “are”.",
            ],
          },
          {
            id: "agree",
            input: "I am agree with you about this topic.",
            level: "B1",
            tips: [
              "“agree” خۆی کردارە، بۆیە نابێت بڵێین “am agree”.",
              "وشەی باش: “topic” لێرەدا زۆر گونجاوە.",
            ],
          },
        ],
      },
      speaking: {
        promptLabel: "پرسیاری قسەکردن",
        prompt: "Tell me about your favourite place in Kurdistan.",
        record: "وەڵامەکەم تۆمار بکە",
        listening: "گوێ دەگرێت…",
        analyzing: "شیکردنەوە دەکرێت…",
        heard: "ئەوەی LEO AI بیستی",
        transcript:
          "My favourite place is Dukan Lake. It is very beautiful and I go there with my family every summer.",
        scores: { pronunciation: "دەربڕین", fluency: "ڕەوانی", grammar: "ڕێزمان" },
        feedbackTitle: "ڕاستکردنەوە",
        feedback:
          "ڕوون و ڕێکخراو بوو! زیاتر تکیە بخەرە سەر وشەی “beautiful”، و هەوڵبدە ڕستەکانت بە “because” یان “and then” بەیەکەوە ببەستیتەوە.",
        again: "جارێکی تر",
      },
      placement: {
        intro: "وەڵامی ٣ پرسیاری خێرا بدەرەوە و LEO AI ئاستەکەت مەزەندە دەکات.",
        start: "دەستپێکردنی تاقیکردنەوە",
        question: "پرسیاری",
        of: "لە",
        resultTitle: "ئاستی مەزەندەکراوی تۆ",
        recommended: "خولی پێشنیارکراو",
        restart: "دووبارە تاقی بکەرەوە",
        recs: {
          A1: "ئینگلیزیی گشتی A1",
          A2: "ئینگلیزیی گشتی A2",
          B1: "ئینگلیزیی گشتی B1",
        },
      },
    },
    courses: {
      title: "خولەکانمان",
      subtitle: "نموونەیەک لەوەی پەیمانگای لیۆ پێشکەشی دەکات. خولێک هەڵبژێرە و خۆت تۆمار بکە.",
      online: "ئۆنلاین",
      inPerson: "بەرەوڕوو",
      cta: "خۆتۆمارکردن",
      note: "لیستی خولەکان نموونەیە.",
      items: [
        { icon: "book", title: "ئینگلیزیی گشتی", level: "A1 – C1", desc: "لە هەموو ئاستێکدا بە متمانەوە قسە بکە، بخوێنەوە، بنووسە و گوێ بگرە.", online: true, inPerson: true },
        { icon: "monitor", title: "ئینگلیزی ئۆنلاین", level: "هەموو ئاستەکان", desc: "وانەی ڕاستەوخۆی ئۆنلاین کە لە ماڵەوە بەشداری تێدا دەکەیت.", online: true, inPerson: false },
        { icon: "smile", title: "ئینگلیزی بۆ منداڵان و هەرزەکاران", level: "تەمەن ٦ – ١٧", desc: "وانەی خۆش و کارلێککار، تایبەت بۆ فێرخوازە گەنجەکان.", online: true, inPerson: true },
        { icon: "languages", title: "عەرەبی", level: "دەستپێک – پێشکەوتوو", desc: "عەرەبی فێربە بۆ خوێندن، کار و ژیانی ڕۆژانە.", online: true, inPerson: true },
        { icon: "plane", title: "ئەڵمانی A1 (ڤیزا)", level: "A1", desc: "ئامادەکاری تایبەت بۆ بڕوانامەی A1 کە بۆ ڤیزا پێویستە.", online: true, inPerson: true },
        { icon: "award", title: "ئامادەکاری IELTS", level: "B1 – C1", desc: "ستراتیژ و تاقیکردنەوەی ڕاهێنان بۆ گەیشتن بە نمرەی مەبەستت.", online: true, inPerson: true },
      ],
    },
    testimonials: {
      title: "فێرخوازان چی دەڵێن",
      // نموونەن: دەبێت بگۆڕدرێن بە ڕاستەقینە
      items: [
        { name: "شیلان", role: "فێرخوازی ئینگلیزی", quote: "وانەکان دۆستانەن و ئێستا بێ ترس لە هەڵە قسە دەکەم." },
        { name: "ئارام", role: "خوێندکاری IELTS", quote: "تاقیکردنەوەی ڕاهێنان و ڕاستکردنەوەی خێرا یارمەتیدام نمرەکەم بەرز بکەمەوە." },
        { name: "دیلان", role: "دایک", quote: "کچەکەم هەموو هەفتەیەک چاوەڕێی وانەکانی دەکات." },
      ],
    },
    contact: {
      title: "پەیوەندیمان پێوە بکە",
      text: "پەیوەندیمان پێوە بکە، لە تۆڕە کۆمەڵایەتییەکان نامەمان بۆ بنێرە، یان زانیارییەکانت بەجێبهێڵە و پەیوەندیت پێوە دەکەین.",
      call: "پەیوەندی",
      follow: "شوێنمان بکەوە",
      location: "هەرێمی کوردستان، عێراق",
      form: {
        name: "ناوی تەواو",
        phone: "ژمارەی مۆبایل",
        course: "ئەو خولەی حەزی لێیەتی",
        choose: "خولێک هەڵبژێرە",
        submit: "ناردن",
        success: "سوپاس! بەمزووانە پەیوەندیت پێوە دەکەین.",
        errName: "تکایە ناوەکەت بنووسە",
        errPhone: "تکایە ژمارەیەکی دروست بنووسە",
        errCourse: "تکایە خولێک هەڵبژێرە",
        demo: "فۆڕمی دیمۆ: هیچ شتێک نانێردرێت.",
      },
    },
    footer: {
      tagline: "فێربە · چێژ وەربگرە · بمێنەرەوە",
      links: "بەستەرە خێراکان",
      contact: "پەیوەندی",
      follow: "شوێنمان بکەوە",
      rights: "هەموو مافەکان پارێزراون.",
      credit: "ئایدیای ماڵپەڕ لەلایەن Tutelage",
    },
  },
};
