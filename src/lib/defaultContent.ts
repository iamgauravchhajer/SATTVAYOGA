// DEFAULT_CONTENT represents the copywriting configuration for the landing page.
// If Firestore is offline or unconfigured, the app falls back to this dictionary instantly.
export const DEFAULT_CONTENT = {
  images: {
    logoUrl: "",
    heroUrl: "",
    instructorUrl: "",
    featureUrl: "",
  },
  hero: {
    marathiTitle: "तुमचं आरोग्य,",
    englishTitleStart: "Transform Your Life with ",
    englishTitleHighlight: "365 Days",
    englishTitleEnd: " of Yoga",
    description:
      "A complete one-year guided yoga journey by Pooja Ingle. Daily live sessions, expert mentorship, and a thriving community — designed for real Indian lifestyles.",
    startDate: "TODAY",
    liveTimes: "6:00 AM & 6:00 PM IST",
    studentRatingText: "500+ students",
  },
  mentor: {
    name: "Pooja Ingle",
    marathiSubtitle: "तुमची दैनंदिन योग मार्गदर्शक",
    englishSubtitle: "Your Daily Yoga Mentor",
    description:
      "For over a decade, Pooja has guided thousands of women and men into a daily yoga practice that fits real Indian lives. SATTVAYOGA 365 is her vision — to make transformation simple, accessible and joyful for everyone, every single day.",
    statsStudents: "1K+",
    statsPlan: "365",
    statsRating: "4.9★",
    experienceYears: "1+",
  },
  pricing: {
    planName: "365 Days Access",
    price: "₹4,999",
    originalPrice: "₹12,000",
    discountText: "58% OFF",
    rupeeCost: "₹13",
    rupeeCostSubtitle: "That is less than ₹14 per day for certified expert guidance!",
  },
  contacts: {
    phone: "+91 95793 17724",
    whatsappNumber: "919579317724",
    instagramUrl: "https://www.instagram.com/sattvayogawithpooja?igsh=MXUxemNveGF5bDAwcw==",
    facebookUrl: "https://www.instagram.com/sattvayogawithpooja?igsh=MXUxemNveGF5bDAwcw==",
    threadsUrl: "https://www.instagram.com/sattvayogawithpooja?igsh=MXUxemNveGF5bDAwcw==",
  },
  whyJoin: {
    title: "Why You Shouldn't Miss This Program?",
    subtitle: "A complete year of transformation — built for results, designed for delight.",
    items: [
      {
        icon: "Sun",
        title: "Daily live sessions",
        marathi: "रोज सकाळी सराव",
        desc: "30–45 min guided sessions designed for busy schedules.",
      },
      {
        icon: "Heart",
        title: "Holistic wellbeing",
        marathi: "संपूर्ण आरोग्य",
        desc: "Body, mind and breath — a balanced practice for real change.",
      },
      {
        icon: "Award",
        title: "Expert mentorship",
        marathi: "तज्ञ मार्गदर्शन",
        desc: "Personal feedback from Pooja and certified instructors.",
      },
      {
        icon: "Users",
        title: "Supportive community",
        marathi: "एकत्र प्रवास",
        desc: "Practice alongside thousands on the same transformation path.",
      },
    ],
  },
  whoFor: {
    title: "Made For Every Lifestyle",
    cards: [
      {
        icon: "Briefcase",
        title: "Working Professionals",
        desc: "Beat desk fatigue and find calm during hectic workdays.",
      },
      {
        icon: "Home",
        title: "Homemakers",
        desc: "Reclaim energy and time for yourself, every single morning.",
      },
      {
        icon: "GraduationCap",
        title: "Students",
        desc: "Sharpen focus, reduce anxiety and build healthy routines.",
      },
      {
        icon: "Baby",
        title: "Women After Delivery",
        desc: "Gentle, safe recovery practices to rebuild strength.",
      },
      {
        icon: "Scale",
        title: "Weight Loss Seekers",
        desc: "Sustainable yoga-led fat loss without crash diets.",
      },
      {
        icon: "Brain",
        title: "Anyone Seeking Peace",
        desc: "Stress relief, better sleep, and mental clarity.",
      },
    ],
  },
  features: {
    title: "Everything You Need In One Practice",
    subtitle: "Six pillars of transformation — woven into every session.",
    items: [
      { icon: "Sun", label: "Daily Yoga Practice", pos: "top-2 -left-4 sm:left-0" },
      { icon: "Brain", label: "Stress Relief", pos: "top-20 -right-4 sm:right-0" },
      { icon: "Wind", label: "Better Flexibility", pos: "top-1/2 -left-6 sm:-left-10" },
      { icon: "Scale", label: "Weight Management", pos: "top-1/2 -right-6 sm:-right-10" },
      { icon: "Leaf", label: "Mental Peace", pos: "bottom-20 -left-4 sm:left-0" },
      { icon: "Heart", label: "Healthy Lifestyle", pos: "bottom-2 -right-4 sm:right-0" },
    ],
  },
  reasons: {
    title: "Five Reasons Students Stay & Thrive",
    items: [
      {
        title: "Expert Guidance",
        desc: "Learn from a certified mentor with 12+ years of teaching experience.",
      },
      {
        title: "Daily Motivation",
        desc: "Wake up to a community that holds you accountable, every day.",
      },
      {
        title: "Community Support",
        desc: "Private group with thousands of students sharing the same journey.",
      },
      {
        title: "Beginner Friendly",
        desc: "Every pose has gentle modifications — start exactly where you are.",
      },
      {
        title: "Affordable Program",
        desc: "Premium guidance at a fraction of personal-coaching cost.",
      },
    ],
  },
  beforeAfter: {
    title: "From Where You Are to Where You Want to Be",
    beforeTitle: "The Current You",
    beforeSubtitle: "Stuck in the same loop",
    beforeItems: [
      "Low energy mornings",
      "Stress & anxiety",
      "Stiff body, back pain",
      "Inconsistent routine",
      "Weight gain",
    ],
    afterTitle: "The Future You",
    afterSubtitle: "Living lighter, calmer, stronger",
    afterItems: [
      "Energized 6 AM rituals",
      "Calm, focused mind",
      "Flexible & strong body",
      "Daily 30-min practice",
      "Sustainable weight loss",
    ],
  },
  bestStudents: {
    title: "Our Stars of This Month",
    subtitle:
      "Meet the dedicated yogis who transformed their health, discipline, and daily energy.",
    students: [
      {
        name: "Aarav Mehta",
        location: "Mumbai · Software Engineer",
        imageText: "AM",
        tag: "Weight & Habit Transformation",
        stat: "98% Consistency",
        days: "29/30 Days",
        achievement: "Lost 6 kg & beat desk posture back pain",
        quote:
          "Daily morning yoga with Pooja has completely changed my day. The stiffness is gone and my focus is sharper than ever!",
        color: "bg-saffron/10 text-saffron-deep border-saffron/20",
      },
      {
        name: "Sneha Patel",
        location: "Pune · Homemaker",
        imageText: "SP",
        tag: "Consistent Daily practice",
        stat: "100% Consistency",
        days: "30/30 Days",
        achievement: "Zero fatigue & mental peace",
        quote:
          "365 days seemed tough, but the supportive community makes it easy. I feel so energized and happy every morning!",
        color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      },
      {
        name: "Dr. Rohit Sharma",
        location: "Delhi · Cardiologist",
        imageText: "RS",
        tag: "Stress & Anxiety Relief",
        stat: "95% Consistency",
        days: "28/30 Days",
        achievement: "Better sleep & low stress levels",
        quote:
          "Yoga has become my daily medicine. The breathing techniques helped me manage stressful surgeries with absolute calm.",
        color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      },
    ],
  },
  reels: {
    title: "Daily Inspiration on Instagram",
    subtitle:
      "Watch clips of our daily sessions, custom yoga posture tutorials, and student milestones directly on our feed.",
    items: [
      {
        title: "6:00 AM Morning Energy Ritual",
        topic: "Live session energy peak & pranayam posture flows.",
        likes: "1.2K",
        comments: "84",
        gradient: "from-saffron/40 to-brown/90",
        bgText: "🧘‍♀️ Live Energy Flow",
        reelUrl: "https://www.instagram.com/reel/C8XyZ_pSo2v/",
        imageUrl: "",
      },
      {
        title: "Fix Desk-Job Stiffness in 5 Mins",
        topic: "Quick gentle exercises to ease chronic lower back stiffness.",
        likes: "948",
        comments: "56",
        gradient: "from-amber-500/40 to-brown/90",
        bgText: "💪 Posture Relief",
        reelUrl: "https://www.instagram.com/reel/C8XyZ_pSo2v/",
        imageUrl: "",
      },
      {
        title: "Surya Namaskar: Step-by-Step Form Check",
        topic: "Avoid common beginners mistakes with this detailed breakdown.",
        likes: "2.4K",
        comments: "128",
        gradient: "from-emerald-500/40 to-brown/90",
        bgText: "☀️ Step-by-Step Surya",
        reelUrl: "https://www.instagram.com/reel/C8XyZ_pSo2v/",
        imageUrl: "",
      },
      {
        title: "100 Days Practice Transformation Story",
        topic: "How consistency builds daily physical flexibility & mental calm.",
        likes: "1.8K",
        comments: "92",
        gradient: "from-blue-500/40 to-brown/90",
        bgText: "🌟 100-Day Success",
        reelUrl: "https://www.instagram.com/reel/C8XyZ_pSo2v/",
        imageUrl: "",
      },
    ],
  },
  finalCta: {
    title: "Transform your health, boost your energy, and find inner peace.",
    marathiSubtitle: "तुमचा प्रवास आजच सुरू करा",
    buttonText: "Reserve My Seat Now",
    seatsLeftText: "⚡ Only 24 seats left in this batch",
  },
  testimonials: {
    title: "Real Stories. Real Transformation.",
    items: [
      {
        name: "Priya M.",
        text: "Lost 8 kg in 6 months and my back pain is gone. Pooja didi ne zindagi badal di!",
        role: "Homemaker, Pune",
      },
      {
        name: "Rohan S.",
        text: "Morning sessions transformed my workday. I'm calmer, sharper, and finally sleeping well.",
        role: "Software Engineer",
      },
      {
        name: "Anjali K.",
        text: "Started 3 months after delivery. Felt safe, supported, and stronger every week.",
        role: "New Mom",
      },
      {
        name: "Meera M.",
        text: "The community is everything. 365 days felt like 365 mornings with friends.",
        role: "Teacher",
      },
      {
        name: "Vikram J.",
        text: "Affordable, premium, and incredibly effective. Best decision of the year.",
        role: "Entrepreneur",
      },
      {
        name: "Kavita R.",
        text: "Pooja's energy is unmatched. I look forward to 6 AM now — never thought I'd say that.",
        role: "Student",
      },
    ],
  },
  faqSection: {
    title: "Questions, Answered",
    faqs: [
      {
        q: "Is this program suitable for complete beginners?",
        a: "Absolutely. Every session starts with foundational poses and gentle modifications, so you can begin with zero experience and progress at your own pace.",
      },
      {
        q: "How much time do I need each day?",
        a: "Just 30–45 minutes a day. Sessions are designed to fit busy schedules — perfect for working professionals, homemakers and students.",
      },
      {
        q: "Will I get personal guidance from Pooja?",
        a: "Yes. You get live weekly sessions, a private community, and direct feedback on your practice from Pooja and her team.",
      },
      {
        q: "Can I join after a recent delivery?",
        a: "Yes — we have a dedicated post-delivery track with safe, gradual recovery practices designed for new mothers.",
      },
      {
        q: "What if I miss a session?",
        a: "All sessions are recorded and available in your dashboard for the full 365 days, so you can practice on your own schedule.",
      },
      {
        q: "Is there a refund policy?",
        a: "Yes, we offer a 7-day no-questions-asked refund if the program doesn't feel right for you.",
      },
    ],
  },
};

export type LandingPageContent = typeof DEFAULT_CONTENT;
