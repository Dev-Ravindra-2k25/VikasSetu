export type LanguageCode = "hi" | "en" | "bn" | "ta" | "te" | "mr";

export const translations: Record<LanguageCode, Record<string, string>> = {
  hi: {
    // Navigation
    "nav.brand": "विकाससेतु",
    "nav.home": "मुख्य पृष्ठ",
    "nav.citizen": "नागरिक पोर्टल",
    "nav.intelligence": "मांग हॉटस्पॉट",
    "nav.government": "नीति निर्माता हब",
    "nav.impact": "प्रभाव विश्लेषण",
    "nav.reportIssue": "समस्या दर्ज करें",
    "nav.reportDevIssue": "विकास समस्या दर्ज करें",

    // Hero Section
    "hero.badge": "बहुभाषी AI नागरिक विकास बुद्धिमत्ता मंच",
    "hero.titlePre": "नागरिकों की",
    "hero.titleVoices": "आवाज़",
    "hero.titleMid": "से बेहतर",
    "hero.titleDecisions": "विकास के फैसले",
    "hero.subtitle": "स्मार्ट, समावेशी और पारदर्शी विकास योजना के लिए AI-संचालित बहुभाषी मंच। आवाज़, टेक्स्ट और ज़मीनी रिपोर्टों को डेटा-संचालित बुनियादी ढांचे की प्राथमिकताओं में बदलें।",
    "hero.ctaReport": "विकास समस्या दर्ज करें",
    "hero.ctaMap": "मांग मानचित्र देखें",

    // Stats
    "stats.reports": "दर्ज की गई रिपोर्ट",
    "stats.hotspots": "सक्रिय हॉटस्पॉट",
    "stats.funds": "आवंटित धनराशि",
    "stats.resolution": "औसत समाधान",
    "stats.hours": "घंटे",

    // Core Loop & Workflow
    "workflow.badge": "एंड-टू-एंड विकास पाइपलाइन",
    "workflow.title": "नागरिक की आवाज़ से सरकारी बजट आवंटन तक",
    "workflow.step1Title": "बहुभाषी आवाज़ इनपुट",
    "workflow.step1Desc": "नागरिक हिंदी, अंग्रेजी या क्षेत्रीय भाषाओं में बोलकर या लिखकर शिकायत दर्ज करते हैं।",
    "workflow.step2Title": "AI ट्रायज और जियो-टैगिंग",
    "workflow.step2Desc": "NLP द्वारा समस्या का वर्गीकरण, तात्कालिकता और सटीक GPS स्थान निर्धारण।",
    "workflow.step3Title": "स्थानिक मांग क्लस्टरिंग",
    "workflow.step3Desc": "DBSCAN एल्गोरिदम कई शिकायतों को एक उच्च-प्राथमिकता वाले हॉटस्पॉट में जोड़ता है।",
    "workflow.step4Title": "नीति निर्माता सिफारिशें",
    "workflow.step4Desc": "अधिकारियों को बजट अनुमान, ROI और कार्यान्वयन प्राथमिकताओं के साथ समाधान मिलते हैं।",

    // Hotspots Section
    "hotspots.badge": "लाइव इंटेलिजेंस",
    "hotspots.title": "गंभीर क्षेत्रीय बुनियादी ढांचा हॉटस्पॉट",
    "hotspots.subtitle": "पूरे उत्तर प्रदेश में नागरिकों की आवाज़ द्वारा हाइलाइट किए गए उच्च प्राथमिकता वाले क्षेत्र",
    "hotspots.viewRadar": "पूरा मांग रडार खोलें",

    // Recommendations Section
    "rec.badge": "कार्यकारी योजना",
    "rec.title": "AI-अनुशंसित विकास परियोजनाएं",
    "rec.subtitle": "सख्त लागत-लाभ और ROI मॉडल पर आधारित बजट तैयार बुनियादी ढांचा प्रस्ताव",
    "rec.viewHub": "नीति निर्माता हब देखें",

    // Citizen Form
    "citizen.heroBadge": "नागरिक विकास आवाज़ पोर्टल",
    "citizen.heroTitle": "अपनी भाषा में",
    "citizen.heroTitleHighlight": "समस्या दर्ज करें",
    "citizen.heroDesc": "सड़क, पानी, बिजली या स्वास्थ्य समस्याओं को बोलकर या लिखकर दर्ज करें। हमारा AI इसे तुरंत उपयुक्त अधिकारियों तक पहुंचाएगा।",
    "citizen.tabVoice": "आवाज़ से दर्ज करें",
    "citizen.tabText": "फ़ॉर्म भरें",
    "citizen.tabTrack": "शिकायत ट्रैक करें",
    "citizen.formTitle": "समस्या का विवरण भरें",
    "citizen.nameLabel": "आपका पूरा नाम",
    "citizen.phoneLabel": "फ़ोन नंबर (अपडेट के लिए)",
    "citizen.districtLabel": "ज़िला चुनें",
    "citizen.categoryLabel": "बुनियादी ढांचा श्रेणी",
    "citizen.descLabel": "समस्या का विस्तार से वर्णन करें",
    "citizen.submitBtn": "शिकायत जमा करें",
    "citizen.submitting": "AI विश्लेषण और सबमिट हो रहा है...",
    "citizen.successTitle": "शिकायत सफलतापूर्वक दर्ज!",
    "citizen.successSub": "AI द्वारा आपकी शिकायत का विश्लेषण कर प्राथमिकता स्कोर तैयार कर दिया गया है।",
    "citizen.trackingId": "ट्रैकिंग आईडी",
    "citizen.submitAnother": "एक और समस्या दर्ज करें",

    // Footer
    "footer.desc": "भारत भर में ज़मीनी स्तर की नागरिक आवश्यकताओं और सार्वजनिक बुनियादी ढांचे की योजना के बीच की खाई को पाटने वाला बहुभाषी AI मंच।",
    "footer.dpg": "डिजिटल पब्लिक गुड",
    "footer.privacy": "गोपनीयता प्रथम (DPDP अधिनियम अनुरूप)",
    "footer.dashboards": "डैशबोर्ड",
    "footer.principles": "मूल सिद्धांत",
    "footer.multilingual": "बहुभाषी आवाज़ और NLP",
    "footer.spatial": "स्थानिक मांग हॉटस्पॉट",
    "footer.gap": "इन्फ्रास्ट्रक्चर गैप विश्लेषण",
    "footer.rights": "VikasSetu — AI नागरिक विकास बुद्धिमत्ता मंच। ओपन डिजिटल पब्लिक गुड फ्रेमवर्क के तहत जारी।",
    "footer.smartGov": "स्मार्ट, समावेशी और साक्ष्य-आधारित शासन के लिए निर्मित।"
  },

  en: {
    // Navigation
    "nav.brand": "VikasSetu",
    "nav.home": "Home",
    "nav.citizen": "Citizen Portal",
    "nav.intelligence": "Demand Hotspots",
    "nav.government": "Policymaker Hub",
    "nav.impact": "Impact Analytics",
    "nav.reportIssue": "Report Issue",
    "nav.reportDevIssue": "Report Development Issue",

    // Hero Section
    "hero.badge": "Multilingual AI Citizen Development Intelligence Platform",
    "hero.titlePre": "From",
    "hero.titleVoices": "Citizens' Voices",
    "hero.titleMid": "to Better",
    "hero.titleDecisions": "Development Decisions",
    "hero.subtitle": "AI-powered multilingual platform for smarter, more inclusive development planning. Transforming voice, text, and grassroots reports into data-driven infrastructure priorities.",
    "hero.ctaReport": "Report a Development Issue",
    "hero.ctaMap": "Explore Demand Map",

    // Stats
    "stats.reports": "Reports Ingested",
    "stats.hotspots": "Active Hotspots",
    "stats.funds": "Funds Allocated",
    "stats.resolution": "Avg Resolution",
    "stats.hours": "Hours",

    // Core Loop & Workflow
    "workflow.badge": "End-to-End Pipeline",
    "workflow.title": "From Citizen Voice to Government Budget Allocation",
    "workflow.step1Title": "Multilingual Voice Intake",
    "workflow.step1Desc": "Citizens report issues via voice or text in Hindi, English, and regional languages.",
    "workflow.step2Title": "AI Triage & Geo-Tagging",
    "workflow.step2Desc": "NLP categorizes urgency, infrastructure domain, and precise GPS coordinates.",
    "workflow.step3Title": "Spatial Demand Clustering",
    "workflow.step3Desc": "DBSCAN algorithms group recurring complaints into high-priority actionable hotspots.",
    "workflow.step4Title": "Policymaker Recommendations",
    "workflow.step4Desc": "Officials receive budget estimates, ROI models, and prioritized project proposals.",

    // Hotspots Section
    "hotspots.badge": "Live Intelligence",
    "hotspots.title": "Critical Regional Infrastructure Hotspots",
    "hotspots.subtitle": "High-priority problem clusters highlighted by verified citizen reports across North India",
    "hotspots.viewRadar": "Open Demand Radar",

    // Recommendations Section
    "rec.badge": "Executive Planning",
    "rec.title": "AI-Recommended Infrastructure Projects",
    "rec.subtitle": "Ready-to-budget project recommendations backed by cost-benefit analysis and community ROI",
    "rec.viewHub": "View Policymaker Hub",

    // Citizen Form
    "citizen.heroBadge": "Citizen Development Voice Portal",
    "citizen.heroTitle": "Report an Issue in",
    "citizen.heroTitleHighlight": "Your Native Language",
    "citizen.heroDesc": "Report road, water, electricity, or health problems by voice or text. Our AI will triage, geo-tag, and route it to local authorities.",
    "citizen.tabVoice": "Voice Intake",
    "citizen.tabText": "Text Form",
    "citizen.tabTrack": "Track Status",
    "citizen.formTitle": "Submit Grievance Details",
    "citizen.nameLabel": "Your Full Name",
    "citizen.phoneLabel": "Phone Number (for SMS updates)",
    "citizen.districtLabel": "Select District",
    "citizen.categoryLabel": "Infrastructure Category",
    "citizen.descLabel": "Describe the Problem in Detail",
    "citizen.submitBtn": "Submit Grievance",
    "citizen.submitting": "AI Analyzing & Submitting...",
    "citizen.successTitle": "Grievance Successfully Registered!",
    "citizen.successSub": "AI has parsed your issue and computed initial priority scores for municipal action.",
    "citizen.trackingId": "Tracking ID",
    "citizen.submitAnother": "Submit Another Issue",

    // Footer
    "footer.desc": "A multilingual AI-powered citizen development intelligence platform bridging the gap between grassroots citizen needs and public infrastructure planning across India.",
    "footer.dpg": "Digital Public Good",
    "footer.privacy": "Privacy First (DPDP Act Aligned)",
    "footer.dashboards": "Dashboards",
    "footer.principles": "Core Principles",
    "footer.multilingual": "Multilingual Voice & NLP",
    "footer.spatial": "Spatial Demand Hotspots",
    "footer.gap": "Infrastructure Gap Analysis",
    "footer.rights": "VikasSetu — AI Citizen Development Intelligence Platform. Released under open Digital Public Good framework.",
    "footer.smartGov": "Built for smart, inclusive, and evidence-based governance."
  },

  bn: {
    // Navigation
    "nav.brand": "বিকাশসেতু",
    "nav.home": "হোম",
    "nav.citizen": "নাগরিক পোর্টাল",
    "nav.intelligence": "ডিমান্ড হটস্পট",
    "nav.government": "নীতি নির্ধারক হাব",
    "nav.impact": "প্রভাব বিশ্লেষণ",
    "nav.reportIssue": "অভিযোগ জানান",
    "nav.reportDevIssue": "উন্নয়ন সংক্রান্ত সমস্যা জানান",

    // Hero Section
    "hero.badge": "বহুভাষিক AI নাগরিক উন্নয়ন বুদ্ধিমত্তা প্ল্যাটফর্ম",
    "hero.titlePre": "নাগরিকদের",
    "hero.titleVoices": "কণ্ঠস্বর",
    "hero.titleMid": "থেকে উন্নত",
    "hero.titleDecisions": "উন্নয়ন সিদ্ধান্ত",
    "hero.subtitle": "স্মার্ট ও অন্তর্ভুক্তিমূলক উন্নয়ন পরিকল্পনার জন্য AI-চালিত বহুভাষিক প্ল্যাটফর্ম। আপনার কণ্ঠস্বরকে তথ্যের ভিত্তিতে রূপান্তর করুন।",
    "hero.ctaReport": "উন্নয়ন সমস্যা জানান",
    "hero.ctaMap": "ডিমান্ড মানচিত্র দেখুন",

    // Stats
    "stats.reports": "গৃহীত রিপোর্ট",
    "stats.hotspots": "সক্রিয় হটস্পট",
    "stats.funds": "বরাদ্দকৃত তহবিল",
    "stats.resolution": "গড় সমাধান সময়",
    "stats.hours": "ঘণ্টা",

    // Core Loop & Workflow
    "workflow.badge": "উন্নয়ন পাইপলাইন",
    "workflow.title": "নাগরিকের কণ্ঠস্বর থেকে সরকারি বাজেট বরাদ্দ",
    "workflow.step1Title": "বহুভাষিক ভয়েস ইনপুট",
    "workflow.step1Desc": "নাগরিকরা বাংলায় কথা বলে বা লিখে সহজেই অভিযোগ নথিভুক্ত করতে পারেন।",
    "workflow.step2Title": "AI ট্রায়াজ ও জিও-ট্যাগিং",
    "workflow.step2Desc": "NLP দ্বারা সমস্যাটির তীব্রতা এবং সঠিক GPS অবস্থান নির্ণয় করা হয়।",
    "workflow.step3Title": "স্থানিক চাহিদা ক্লাস্টারিং",
    "workflow.step3Desc": "অ্যালগরিদম একাধিক অভিযোগকে একটি একক হটস্পটে একত্রিত করে।",
    "workflow.step4Title": "প্রকল্প সুপারিশ",
    "workflow.step4Desc": "প্রশাসনিক কর্মকর্তাদের জন্য বাজেট এবং ROI মডেল তৈরি করা হয়।",

    // Hotspots Section
    "hotspots.badge": "লাইভ ইন্টেলিজেন্স",
    "hotspots.title": "গুরুত্বপূর্ণ পরিকাঠামো হটস্পট",
    "hotspots.subtitle": "যাচাইকৃত নাগরিক রিপোর্টের ভিত্তিতে চিহ্নিত অগ্রাধিকার এলাকা",
    "hotspots.viewRadar": "ডিমান্ড রাডার খুলুন",

    // Recommendations Section
    "rec.badge": "পরিকল্পনা",
    "rec.title": "AI-সুপারিশকৃত প্রকল্পসমূহ",
    "rec.subtitle": "খরচ-সুবিধা বিশ্লেষণের ওপর ভিত্তি করে তৈরি পরিকাঠামো প্রস্তাবনা",
    "rec.viewHub": "পলিসি হাব দেখুন",

    // Citizen Form
    "citizen.heroBadge": "নাগরিক ভয়েস পোর্টাল",
    "citizen.heroTitle": "আপনার ভাষায়",
    "citizen.heroTitleHighlight": "সমস্যা নথিভুক্ত করুন",
    "citizen.heroDesc": "রাস্তা, পানীয় জল বা বিদ্যুতের সমস্যা ভয়েস বা টেক্সটের মাধ্যমে জানান। AI তাৎক্ষণিকভাবে এটি উপযুক্ত বিভাগে পাঠাবে।",
    "citizen.tabVoice": "ভয়েস ইনপুট",
    "citizen.tabText": "ফর্ম পূরণ",
    "citizen.tabTrack": "স্থিতি যাচাই",
    "citizen.formTitle": "অভিযোগের বিবরণ জমা দিন",
    "citizen.nameLabel": "আপনার পুরো নাম",
    "citizen.phoneLabel": "ফোন নম্বর (আপডেটের জন্য)",
    "citizen.districtLabel": "জেলা নির্বাচন করুন",
    "citizen.categoryLabel": "পরিকাঠামো বিভাগ",
    "citizen.descLabel": "সমস্যার বিশদ বিবরণ দিন",
    "citizen.submitBtn": "অভিযোগ জমা দিন",
    "citizen.submitting": "AI বিশ্লেষণ ও জমা হচ্ছে...",
    "citizen.successTitle": "অভিযোগ সফলভাবে নথিভুক্ত হয়েছে!",
    "citizen.successSub": "AI আপনার সমস্যা বিশ্লেষণ করে প্রাথমিক অগ্রাধিকার স্কোর নির্ধারণ করেছে।",
    "citizen.trackingId": "ট্র্যাকিং আইডি",
    "citizen.submitAnother": "আরেকটি সমস্যা জানান",

    // Footer
    "footer.desc": "তৃণমূল নাগরিক প্রয়োজন ও সরকারি পরিকল্পনার মধ্যে ব্যবধান ঘুচানোর একটি বহুভাষিক AI প্ল্যাটফর্ম।",
    "footer.dpg": "ডিজিটাল পাবলিক গুড",
    "footer.privacy": "গোপনীয়তা সুরক্ষিত (DPDP অ্যাক্ট সম্মত)",
    "footer.dashboards": "ড্যাশবোর্ড",
    "footer.principles": "মূলনীতি",
    "footer.multilingual": "বহুভাষিক ভয়েস ও NLP",
    "footer.spatial": "স্থানিক ডিমান্ড হটস্পট",
    "footer.gap": "পরিকাঠামো ঘাটতি বিশ্লেষণ",
    "footer.rights": "বিকাশসেতু — উন্মুক্ত ডিজিটাল পাবলিক গুড প্ল্যাটফর্ম।",
    "footer.smartGov": "স্মার্ট ও অন্তর্ভুক্তিমূলক সুশাসনের লক্ষ্যে নির্মিত।"
  },

  ta: {
    // Navigation
    "nav.brand": "விகாஸ்சேது",
    "nav.home": "முகப்பு",
    "nav.citizen": "குடிமக்கள் தளம்",
    "nav.intelligence": "தேவை மையங்கள்",
    "nav.government": "கொள்கை மையம்",
    "nav.impact": "தாக்க பகுப்பாய்வு",
    "nav.reportIssue": "புகாரளிக்கவும்",
    "nav.reportDevIssue": "வளர்ச்சிச் சிக்கலைப் புகாரளிக்கவும்",

    // Hero Section
    "hero.badge": "பன்மொழி AI குடிமக்கள் மேம்பாட்டு நுண்ணறிவு தளம்",
    "hero.titlePre": "குடிமக்களின்",
    "hero.titleVoices": "குரல்கள்",
    "hero.titleMid": "மூலம் சிறந்த",
    "hero.titleDecisions": "மேம்பாட்டு முடிவுகள்",
    "hero.subtitle": "அறிவுசார்ந்த மற்றும் உள்ளடக்கிய மேம்பாட்டுத் திட்டமிடலுக்கான AI இயங்கும் பன்மொழி தளம். குரல் மற்றும் தரைமட்ட அறிக்கைகளை முன்னுரிமைகளாக மாற்றுங்கள்.",
    "hero.ctaReport": "மேம்பாட்டுச் சிக்கலைப் புகாரளிக்கவும்",
    "hero.ctaMap": "தேவை வரைபடத்தை ஆராயவும்",

    // Stats
    "stats.reports": "பதிவு செய்யப்பட்ட புகார்கள்",
    "stats.hotspots": "செயலில் உள்ள மையங்கள்",
    "stats.funds": "ஒதுக்கப்பட்ட நிதி",
    "stats.resolution": "சராசரி தீர்வு நேரம்",
    "stats.hours": "மணிநேரம்",

    // Core Loop & Workflow
    "workflow.badge": "முழுமையான செயல்முறை",
    "workflow.title": "குடிமக்கள் குரலில் இருந்து அரசு நிதி ஒதுக்கீடு வரை",
    "workflow.step1Title": "பன்மொழி குரல் பதிவு",
    "workflow.step1Desc": "குடிமக்கள் தமிழில் பேசி அல்லது எழுதி எளிதாகப் புகாரளிக்கலாம்.",
    "workflow.step2Title": "AI வகைப்படுத்தல் மற்றும் இருப்பிடம்",
    "workflow.step2Desc": "NLP சிக்கலின் அவசரத்தையும் துல்லியமான GPS அமைவிடத்தையும் கணக்கிடுகிறது.",
    "workflow.step3Title": "இடஞ்சார்ந்த தேவைக் குழுமம்",
    "workflow.step3Desc": "அல்காரிதம்கள் பல புகார்களை உயர் முன்னுரிமை கொண்ட ஒரு மையமாக இணைக்கின்றன.",
    "workflow.step4Title": "கொள்கை பரிந்துரைகள்",
    "workflow.step4Desc": "அரசு அதிகாரிகளுக்கு திட்ட மதிப்பீடு மற்றும் முன்னுரிமைகள் வழங்கப்படுகின்றன.",

    // Hotspots Section
    "hotspots.badge": "நேரலை நுண்ணறிவு",
    "hotspots.title": "முக்கிய உட்கட்டமைப்பு மையங்கள்",
    "hotspots.subtitle": "உறுதிப்படுத்தப்பட்ட குடிமக்கள் புகார்களால் முன்னிலைப்படுத்தப்பட்ட பகுதிகள்",
    "hotspots.viewRadar": "ரேடாரைத் திறக்கவும்",

    // Recommendations Section
    "rec.badge": "திட்டமிடல்",
    "rec.title": "AI பரிந்துரைக்கப்பட்ட திட்டங்கள்",
    "rec.subtitle": "செலவு-பயன் பகுப்பாய்வு மூலம் ஆதரிக்கப்படும் முன்னுரிமைத் திட்டங்கள்",
    "rec.viewHub": "கொள்கை மையத்தைப் பார்க்கவும்",

    // Citizen Form
    "citizen.heroBadge": "குடிமக்கள் குரல் தளம்",
    "citizen.heroTitle": "உங்கள் தாய்மொழியில்",
    "citizen.heroTitleHighlight": "புகாரளிக்கவும்",
    "citizen.heroDesc": "சாலை, குடிநீர், மின்சாரம் அல்லது சுகாதாரப் பிரச்சினைகளை குரல் அல்லது எழுத்து மூலம் புகாரளிக்கவும்.",
    "citizen.tabVoice": "குரல் பதிவு",
    "citizen.tabText": "படிவம்",
    "citizen.tabTrack": "நிலையைக் கண்காணிக்கவும்",
    "citizen.formTitle": "புகார் விவரங்களைச் சமர்ப்பிக்கவும்",
    "citizen.nameLabel": "உங்கள் முழுப் பெயர்",
    "citizen.phoneLabel": "தொலைபேசி எண்",
    "citizen.districtLabel": "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
    "citizen.categoryLabel": "பிரிவு",
    "citizen.descLabel": "சிக்கலை விவரிக்கவும்",
    "citizen.submitBtn": "புகாரைச் சமர்ப்பிக்கவும்",
    "citizen.submitting": "AI பகுப்பாய்வு செய்து சமர்ப்பிக்கிறது...",
    "citizen.successTitle": "புகார் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!",
    "citizen.successSub": "AI உங்கள் புகாரைப் பகுப்பாய்வு செய்து முன்னுரிமை மதிப்பெண்ணை ஒதுக்கியுள்ளது.",
    "citizen.trackingId": "கண்காணிப்பு ஐடி",
    "citizen.submitAnother": "மற்றொரு சிக்கலைப் புகாரளிக்கவும்",

    // Footer
    "footer.desc": "தரைமட்ட குடிமக்கள் தேவைகளுக்கும் பொது உள்கட்டமைப்பு திட்டமிடலுக்கும் இடையிலான இடைவெளியைக் குறைக்கும் AI தளம்.",
    "footer.dpg": "டிஜிட்டல் பொது நலம்",
    "footer.privacy": "தனியுரிமைக்கு முதலிடம் (DPDP சட்டம்)",
    "footer.dashboards": "டாஷ்போர்டுகள்",
    "footer.principles": "முக்கியக் கோட்பாடுகள்",
    "footer.multilingual": "பன்மொழி குரல் & NLP",
    "footer.spatial": "இடஞ்சார்ந்த தேவை மையங்கள்",
    "footer.gap": "உட்கட்டமைப்பு இடைவெளி பகுப்பாய்வு",
    "footer.rights": "விகாஸ்சேது — திறந்த டிஜிட்டல் பொது நலக் கட்டமைப்பு.",
    "footer.smartGov": "சிறந்த, அனைவரையும் உள்ளடக்கிய நிர்வாகத்திற்காக உருவாக்கப்பட்டது."
  },

  te: {
    // Navigation
    "nav.brand": "వికాస్ సేతు",
    "nav.home": "హోమ్",
    "nav.citizen": "పౌర పోర్టల్",
    "nav.intelligence": "డిమాండ్ హాట్‌స్పాట్లు",
    "nav.government": "విధాన నిర్ణేతల కేంద్రం",
    "nav.impact": "ప్రభావ విశ్లేషణ",
    "nav.reportIssue": "సమస్యను నివేదించండి",
    "nav.reportDevIssue": "అభివృద్ధి సమస్యను నివేదించండి",

    // Hero Section
    "hero.badge": "బహుభాషా AI పౌర అభివృద్ధి ఇంటెలిజెన్స్ ప్లాట్‌ఫారమ్",
    "hero.titlePre": "పౌరుల",
    "hero.titleVoices": "గళం నుండి",
    "hero.titleMid": "మెరుగైన",
    "hero.titleDecisions": "అభివృద్ధి నిర్ణయాలు",
    "hero.subtitle": "తెలివైన మరియు సమ్మిళిత అభివృద్ధి ప్రణాళిక కోసం AI-ఆధారిత బహుభాషా వేదిక. ప్రజల స్వరాలను ప్రాధాన్యతలుగా మార్చండి.",
    "hero.ctaReport": "అభివృద్ధి సమస్యను నివేదించండి",
    "hero.ctaMap": "డిమాండ్ మ్యాప్ చూడండి",

    // Stats
    "stats.reports": "నమోదైన నివేదికలు",
    "stats.hotspots": "క్రియాశీల హాట్‌స్పాట్లు",
    "stats.funds": "కేటాయించిన నిధులు",
    "stats.resolution": "సగటు పరిష్కార సమయం",
    "stats.hours": "గంటలు",

    // Core Loop & Workflow
    "workflow.badge": "సమగ్ర ప్రక్రియ",
    "workflow.title": "పౌరుల స్వరం నుండి ప్రభుత్వ బడ్జెట్ కేటాయింపు వరకు",
    "workflow.step1Title": "బహుభాషా వాయిస్ ఇన్‌పుట్",
    "workflow.step1Desc": "పౌరులు తెలుగులో మాట్లాడి లేదా రాసి సులభంగా సమస్యలను నివేదించవచ్చు.",
    "workflow.step2Title": "AI వర్గీకరణ & జియో-ట్యాగింగ్",
    "workflow.step2Desc": "NLP సమస్య తీవ్రత మరియు ఖచ్చితమైన GPS స్థానాన్ని గుర్తిస్తుంది.",
    "workflow.step3Title": "ప్రాంతీయ డిమాండ్ క్లస్టరింగ్",
    "workflow.step3Desc": "అల్గారిథమ్ ఫిర్యాదులను అధిక ప్రాధాన్యత గల హాట్‌స్పాట్‌గా సమూహపరుస్తుంది.",
    "workflow.step4Title": "విధాన సిఫార్సులు",
    "workflow.step4Desc": "అధికారులకు బడ్జెట్ అంచనాలు మరియు ప్రాధాన్యత పరిష్కారాలు అందుతాయి.",

    // Hotspots Section
    "hotspots.badge": "లైవ్ ఇంటెలిజెన్స్",
    "hotspots.title": "కీలక మౌలిక సదుపాయాల హాట్‌స్పాట్లు",
    "hotspots.subtitle": "ధృవీకరించబడిన పౌర నివేదికల ఆధారంగా గుర్తించబడిన సమస్య ప్రాంతాలు",
    "hotspots.viewRadar": "డిమాండ్ రాడార్ తెరవండి",

    // Recommendations Section
    "rec.badge": "ప్రణాళిక",
    "rec.title": "AI సిఫార్సు చేసిన ప్రాజెక్ట్‌లు",
    "rec.subtitle": "వ్యయ-ప్రయోజన విశ్లేషణతో కూడిన ప్రాధాన్యత ప్రతిపాదనలు",
    "rec.viewHub": "విధాన కేంద్రం చూడండి",

    // Citizen Form
    "citizen.heroBadge": "పౌర స్వరం పోర్టల్",
    "citizen.heroTitle": "మీ సొంత భాషలో",
    "citizen.heroTitleHighlight": "సమస్యను నివేదించండి",
    "citizen.heroDesc": "రోడ్డు, నీరు, విద్యుత్ లేదా ఆరోగ్య సమస్యలను వాయిస్ లేదా టెక్స్ట్ ద్వారా నివేదించండి.",
    "citizen.tabVoice": "వాయిస్ ఇన్‌పుట్",
    "citizen.tabText": "ఫారమ్ నింపండి",
    "citizen.tabTrack": "స్టేటస్ ట్రాక్ చేయండి",
    "citizen.formTitle": "ఫిర్యాదు వివరాలను సమర్పించండి",
    "citizen.nameLabel": "మీ పూర్తి పేరు",
    "citizen.phoneLabel": "ఫోన్ నంబర్",
    "citizen.districtLabel": "జిల్లాను ఎంచుకోండి",
    "citizen.categoryLabel": "వర్గం",
    "citizen.descLabel": "సమస్యను వివరంగా తెలపండి",
    "citizen.submitBtn": "ఫిర్యాదు సమర్పించండి",
    "citizen.submitting": "AI విశ్లేషిస్తోంది...",
    "citizen.successTitle": "ఫిర్యాదు విజయవంతంగా నమోదైంది!",
    "citizen.successSub": "AI మీ సమస్యను విశ్లేషించి ప్రాధాన్యత స్కోరును కేటాయించింది.",
    "citizen.trackingId": "ట్రాకింగ్ ఐడీ",
    "citizen.submitAnother": "మరో సమస్యను నమోదు చేయండి",

    // Footer
    "footer.desc": "పౌర అవసరాలకు మరియు ప్రభుత్వ మౌలిక సదుపాయాల ప్రణాళికకు మధ్య వారధిగా పనిచేసే AI వేదిక.",
    "footer.dpg": "డిజిటల్ పబ్లిక్ గుడ్",
    "footer.privacy": "గోప్యతకు ప్రాధాన్యత (DPDP చట్టం)",
    "footer.dashboards": "డాష్‌బోర్డులు",
    "footer.principles": "ప్రాథమిక సూత్రాలు",
    "footer.multilingual": "బహుభాషా వాయిస్ & NLP",
    "footer.spatial": "ప్రాంతీయ డిమాండ్ హాట్‌స్పాట్లు",
    "footer.gap": "మౌలిక సదుపాయాల అంతర విశ్లేషణ",
    "footer.rights": "వికాస్ సేతు — ఓపెన్ డిజిటల్ పబ్లిక్ గుడ్.",
    "footer.smartGov": "తెలివైన, అందరికీ అందుబాటులో ఉండే సుపరిపాలన కోసం రూపొందించబడింది."
  },

  mr: {
    // Navigation
    "nav.brand": "विकाससेतू",
    "nav.home": "मुख्यपृष्ठ",
    "nav.citizen": "नागरिक पोर्टल",
    "nav.intelligence": "मागणी हॉटस्पॉट",
    "nav.government": "धोरणकर्ते केंद्र",
    "nav.impact": "प्रभाव विश्लेषण",
    "nav.reportIssue": "समस्या नोंदवा",
    "nav.reportDevIssue": "विकास समस्या नोंदवा",

    // Hero Section
    "hero.badge": "बहुभाषिक AI नागरिक विकास बुद्धिमत्ता मंच",
    "hero.titlePre": "नागरिकांच्या",
    "hero.titleVoices": "आवाजातून",
    "hero.titleMid": "अधिक चांगले",
    "hero.titleDecisions": "विकास निर्णय",
    "hero.subtitle": "स्मार्ट आणि सर्वसमावेशक विकास नियोजनासाठी AI-शक्तीवर चालणारा बहुभाषिक मंच. तळागाळातील अहवाल डेटा-आधारित प्राधान्यांमध्ये बदला.",
    "hero.ctaReport": "विकास समस्या नोंदवा",
    "hero.ctaMap": "मागणी नकाशा पाहा",

    // Stats
    "stats.reports": "नोंदवलेले अहवाल",
    "stats.hotspots": "सक्रिय हॉटस्पॉट",
    "stats.funds": "वाटप केलेला निधी",
    "stats.resolution": "सरासरी निवारण वेळ",
    "stats.hours": "तास",

    // Core Loop & Workflow
    "workflow.badge": "विकास पाइपलाइन",
    "workflow.title": "नागरिकांच्या आवाजापासून ते सरकारी बजेट वाटपापर्यंत",
    "workflow.step1Title": "बहुभाषिक व्हॉइस इनपुट",
    "workflow.step1Desc": "नागरिक मराठीत बोलून किंवा लिहून सहजपणे तक्रारी नोंदवू शकतात.",
    "workflow.step2Title": "AI वर्गीकरण व जिओ-टॅगिंग",
    "workflow.step2Desc": "NLP द्वारे समस्येची तीव्रता आणि अचूक GPS स्थान निर्धारित केले जाते.",
    "workflow.step3Title": "स्थानिक मागणी क्लस्टरिंग",
    "workflow.step3Desc": "अल्गोरिदम अनेक तक्रारींना उच्च-प्राधान्य हॉटस्पॉटमध्ये एकत्रित करतो.",
    "workflow.step4Title": "धोरण शिफारसी",
    "workflow.step4Desc": "अधिकाऱ्यांना बजेट अंदाज आणि प्राधान्य प्रकल्प अहवाल मिळतात.",

    // Hotspots Section
    "hotspots.badge": "थेट बुद्धिमत्ता",
    "hotspots.title": "गंभीर पायाभूत सुविधा हॉटस्पॉट",
    "hotspots.subtitle": "सत्यापित नागरिक अहवालांद्वारे अधोरेखित केलेली प्राधान्य क्षेत्रे",
    "hotspots.viewRadar": "मागणी रडार उघडा",

    // Recommendations Section
    "rec.badge": "नियोजन",
    "rec.title": "AI-शिफारस केलेले प्रकल्प",
    "rec.subtitle": "खर्च-फायदा विश्लेषणावर आधारित तयार प्रकल्प प्रस्ताव",
    "rec.viewHub": "धोरण केंद्र पाहा",

    // Citizen Form
    "citizen.heroBadge": "नागरिक आवाज पोर्टल",
    "citizen.heroTitle": "आपल्या भाषेत",
    "citizen.heroTitleHighlight": "समस्या नोंदवा",
    "citizen.heroDesc": "रस्ते, पाणी, वीज किंवा आरोग्य समस्या व्हॉइस किंवा मजकुराद्वारे नोंदवा. आमचे AI ते त्वरित संबंधित विभागाकडे पाठवेल.",
    "citizen.tabVoice": "व्हॉइस इनपुट",
    "citizen.tabText": "फॉर्म भरा",
    "citizen.tabTrack": "स्थिती तपासा",
    "citizen.formTitle": "तक्रार तपशील सबमिट करा",
    "citizen.nameLabel": "तुमचे पूर्ण नाव",
    "citizen.phoneLabel": "फोन नंबर (अपडेटसाठी)",
    "citizen.districtLabel": "जिल्हा निवडा",
    "citizen.categoryLabel": "पायाभूत सुविधा श्रेणी",
    "citizen.descLabel": "समस्येचे सविस्तर वर्णन करा",
    "citizen.submitBtn": "तक्रार सबमिट करा",
    "citizen.submitting": "AI विश्लेषण करत आहे...",
    "citizen.successTitle": "तक्रार यशस्वीरित्या नोंदवली गेली!",
    "citizen.successSub": "AI ने तुमच्या समस्येचे विश्लेषण करून प्राधान्य स्कोअर तयार केला आहे.",
    "citizen.trackingId": "ट्रॅकिंग आयडी",
    "citizen.submitAnother": "दुसरी समस्या नोंदवा",

    // Footer
    "footer.desc": "नागरिकांच्या गरजा आणि सार्वजनिक पायाभूत सुविधा नियोजन यातील दरी सांधणारा बहुभाषिक AI मंच.",
    "footer.dpg": "डिजिटल पब्लिक गुड",
    "footer.privacy": "गोपनीयतेला प्राधान्य (DPDP कायदा)",
    "footer.dashboards": "डॅशबोर्ड",
    "footer.principles": "मूलभूत तत्त्वे",
    "footer.multilingual": "बहुभाषिक व्हॉइस व NLP",
    "footer.spatial": "स्थानिक मागणी हॉटस्पॉट",
    "footer.gap": "पायाभूत सुविधा तूट विश्लेषण",
    "footer.rights": "विकाससेतू — डिजिटल पब्लिक गुड फ्रेमवर्क अंतर्गत जारी.",
    "footer.smartGov": "स्मार्ट व समावेशक सुशासनासाठी समर्पित."
  }
};
