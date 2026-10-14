/* ============================================================
 * Almas Restaurant & Guesthouse — Public Website CONFIG
 * ------------------------------------------------------------
 * همه معلومات کسب‌وکار فقط در همین فایل است.
 * برای تغییر نمبر، آدرس، ساعت، منیو یا نرخ اطاق‌ها،
 * فقط همین فایل را ویرایش کنید — بدون نیاز به بلد/نصب.
 *
 * HOW TO UPDATE IN 10 SECONDS:
 *  1) Open this file (config.js)
 *  2) Edit the fields marked [قابل ویرایش] below
 *  3) Save + refresh the browser. Done.
 * ============================================================ */
window.CONFIG = {
  business: {
    name: "الماس رستورانت و مهمان‌خانه",
    nameLatin: "ALMAS RESTAURANT & GUESTHOUSE",
    tagline: "میزبان مطمئن شما با بهترین غذاهای افغانی و اطاق‌های مجهز فامیلی و انفرادی در ۹ منزل",
    heroTitle: "جایی برای آسودن، با پذیرایی شایسته",
    heroCopy: "غذاهای اصیل افغانی در رستورانت، و اقامت آرام در مهمان‌خانه ۹ منزله — برای سفرهای کاری، خانوادگی و مهمانان شما.",
    footerNote: "نمونه آماده — متن و تصاویر نهایی با معلومات واقعی تکمیل می‌شود.",
    // [۱۰ ثانیه‌ای] عکس پس‌زمینه هیرو — استخراج‌شده از space-5.html.
    // برای جایگزینی با عکس واقعی: فایل جدید را در assets/ کاپی کرده و همین مسیر را عوض کنید.
    heroImage: "assets/hero.jpg",
    // [۱۰ ثانیه‌ای] عکس فضای رستورانت (نوار experience) — استخراج‌شده از space-5.html.
    restaurantImage: "assets/restaurant.webp"
  },

  contact: {
    // [قابل ویرایش] WhatsApp number in international format WITHOUT "+" or spaces.
    waNumber: "93770700511",
    // [قابل ویرایش] Display format shown to visitors.
    phoneDisplay: "+93 77 070 0511",
    // tel: link (keep in +93... format)
    phoneLink: "+93770700511"
  },

  /* ----------------------------------------------------------
   * [قابل ویرایش — ۱۰ ثانیه‌ای] آدرس و ساعات کاری
   * CLIENT TODO: آدرس دقیق و ساعات ذیل را تایید و جایگزین کنید.
   * ---------------------------------------------------------- */
  location: {
    // PLACEHOLDER — replace once confirmed by client:
    address: "کابل، افغانستان — (آدرس دقیق به‌زودی از طرف مشتری تایید می‌شود)",
    landmark: "نزدیک مسیرهای اصلی شهر",
    // PLACEHOLDER — replace once confirmed by client:
    hours: "هر روز: ۷ صبح تا ۱۱ شب — (ساعت دقیق به‌زودی تایید می‌شود)",
    mapNote: "برای راهنمای مسیر در واتساپ پیام بدهید."
  },

  /* 12-Item Restaurant Menu — exact client list.
   * category: "asli" = غذاهای اصیل | "drink" = نوشیدنی
   * priceAf: null یعنی قیمت در رستورانت / با تماس — هر وقت نرخ نهایی شد، عدد بگذارید.
   * image: [۱۰ ثانیه‌ای] مسیر عکس هر غذا — نمونه‌های فعلی موقت‌اند.
   *   space-5.html عکس غذا نداشت، پس SVG نمونه گذاشته شده.
   *   برای عکس واقعی: فایل را در assets/ کاپی کنید و فقط همین رشته را عوض کنید. */
  categories: [
    { id: "all", label: "همه" },
    { id: "asli", label: "غذاهای اصیل" },
    { id: "drink", label: "نوشیدنی" }
  ],

  menu: [
    { id: "maycha",   name: "مایچه",     category: "asli",  desc: "مایچه لذیذ به سبک افغانی",            priceAf: null, badge: "پیشنهاد سرآشپز", image: "assets/food-1.svg" }, // [۱۰ ثانیه‌ای] عکس واقعی مایچه → assets/مایچه.jpg
    { id: "molang",   name: "مولانګ",     category: "asli",  desc: "مولانګ سنتی با طعم اصیل",              priceAf: null, badge: "", image: "assets/food-2.svg" }, // [۱۰ ثانیه‌ای] عکس واقعی → همین مسیر را عوض کنید
    { id: "qabili",   name: "قابلی",      category: "asli",  desc: "قابلی پلو با کشمش و زردک",             priceAf: null, badge: "مشهور", image: "assets/food-3.svg" }, // [۱۰ ثانیه‌ای] عکس واقعی → همین مسیر را عوض کنید
    { id: "rawash",   name: "روش",        category: "asli",  desc: "روش لذیذ با گوشت تازه",                priceAf: null, badge: "", image: "assets/food-1.svg" }, // [۱۰ ثانیه‌ای] عکس واقعی → همین مسیر را عوض کنید
    { id: "chainaki", name: "چینکی",      category: "asli",  desc: "چینکی داغ در ظرف سنتی",                priceAf: null, badge: "", image: "assets/food-2.svg" }, // [۱۰ ثانیه‌ای] عکس واقعی → همین مسیر را عوض کنید
    { id: "kabab",    name: "کباب",       category: "asli",  desc: "کباب تازه با نان گرم",                 priceAf: null, badge: "", image: "assets/food-3.svg" }, // [۱۰ ثانیه‌ای] عکس واقعی → همین مسیر را عوض کنید
    { id: "murgh-kabab", name: "کباب مرغ", category: "asli", desc: "کباب مرغ نرم و خوش‌طعم",               priceAf: null, badge: "", image: "assets/food-1.svg" }, // [۱۰ ثانیه‌ای] عکس واقعی → همین مسیر را عوض کنید
    { id: "karahi",   name: "کړای مرغ",   category: "asli",  desc: "کړای مرغ با مساله تازه",               priceAf: null, badge: "", image: "assets/food-2.svg" }, // [۱۰ ثانیه‌ای] عکس واقعی → همین مسیر را عوض کنید
    { id: "lobya",    name: "لوبیا",      category: "asli",  desc: "لوبیا پخته با طعم خانگی",              priceAf: null, badge: "", image: "assets/food-3.svg" }, // [۱۰ ثانیه‌ای] عکس واقعی → همین مسیر را عوض کنید
    { id: "sabzi",    name: "سبزی",       category: "asli",  desc: "سبزی تازه به سبک افغانی",              priceAf: null, badge: "", image: "assets/food-1.svg" }, // [۱۰ ثانیه‌ای] عکس واقعی → همین مسیر را عوض کنید
    { id: "chai",     name: "چای",        category: "drink", desc: "چای سبز و سیاه تازه‌دم",               priceAf: null, badge: "", image: "assets/drink-1.svg" }, // [۱۰ ثانیه‌ای] عکس واقعی → همین مسیر را عوض کنید
    { id: "noshaba",  name: "نوشابه",     category: "drink", desc: "نوشابه سرد، انواع موجود",              priceAf: null, badge: "", image: "assets/drink-1.svg" } // [۱۰ ثانیه‌ای] عکس واقعی → همین مسیر را عوض کنید
  ],

  /* Guesthouse — 9 floors, daily rate tiers (AFN per شبانه‌روز).
   * type: "family" = فامیلی | "single" = مردانه / انفرادی
   * image: [۱۰ ثانیه‌ای] عکس هر اطاق — استخراج‌شده از space-5.html.
   *   برای عکس واقعی اطاق: فایل را در assets/ کاپی و همین رشته را عوض کنید. */
  guesthouse: {
    headline: "اطاق‌های فامیلی و مردانه/انفرادی در ۹ منزل",
    subline: "از اقامت اقتصادی تا سوئیت فامیلی — نرخ شفاف فی شبانه‌روز. برای ریزرف، مستقیم در واتساپ پیام بدهید.",
    currency: "افغانی",
    perNight: "فی شبانه‌روز",
    floorsNote: "ساختمان ۹ منزله — اطاق‌ها در منزل‌های مختلف",
    rooms: [
      { id: "eco-200",    name: "اطاق اقتصادی مردانه",  type: "single", priceAf: 200,  capacity: "۱–۲ نفر",  desc: "گزینه اقتصادی برای اقامت کوتاه کاری.",        amenities: ["بستر پاک", "تشناب مشترک", "وای‌فای"], image: "assets/room-3.webp" }, // [۱۰ ثانیه‌ای] عکس واقعی اطاق ۲۰۰ → همین مسیر
      { id: "std-300",    name: "اطاق استاندارد مردانه", type: "single", priceAf: 300,  capacity: "۱–۲ نفر",  desc: "راحت و منظم برای سفرهای کاری.",               amenities: ["بستر پاک", "تشناب مشترک", "وای‌فای", "بخاری/سرما"], image: "assets/room-2.jpg" }, // [۱۰ ثانیه‌ای] عکس واقعی اطاق ۳۰۰ → همین مسیر
      { id: "single-500", name: "اطاق انفرادی مجهز",     type: "single", priceAf: 500,  capacity: "۱–۲ نفر",  desc: "اطاق آرام با امکانات بیشتر.",                 amenities: ["تشناب اختصاصی", "وای‌فای", "تلویزیون"], image: "assets/room-1.jpg" }, // [۱۰ ثانیه‌ای] عکس واقعی اطاق ۵۰۰ → همین مسیر
      { id: "double-600", name: "اطاق دو نفره",           type: "single", priceAf: 600,  capacity: "۲ نفر",    desc: "مناسب دو مهمان، فضای آرام‌تر.",               amenities: ["تشناب اختصاصی", "وای‌فای", "تلویزیون", "چای"], image: "assets/room-2.jpg" }, // [۱۰ ثانیه‌ای] عکس واقعی اطاق ۶۰۰ → همین مسیر
      { id: "family-700", name: "اطاق فامیلی متوسط",      type: "family", priceAf: 700,  capacity: "۳–۴ نفر",  desc: "فضای بیشتر برای خانواده‌ها.",                amenities: ["تشناب اختصاصی", "وای‌فای", "تلویزیون", "فضای فامیلی"], image: "assets/room-1.jpg" }, // [۱۰ ثانیه‌ای] عکس واقعی اطاق ۷۰۰ → همین مسیر
      { id: "family-800", name: "اطاق فامیلی بزرگ",       type: "family", priceAf: 800,  capacity: "۴–۵ نفر",  desc: "اطاق وسیع فامیلی با آرامش کامل.",             amenities: ["تشناب اختصاصی", "وای‌فای", "تلویزیون", "فضای نشست فامیلی"], image: "assets/room-3.webp" }, // [۱۰ ثانیه‌ای] عکس واقعی اطاق ۸۰۰ → همین مسیر
      { id: "vip-1000",   name: "سوئیت فامیلی VIP",       type: "family", priceAf: 1000, capacity: "۴–۶ نفر",  desc: "بهترین اطاق مهمان‌خانه برای اقامت خاص.",     amenities: ["تشناب اختصاصی", "وای‌فای پرسرعت", "تلویزیون", "خدمات ویژه"], badge: "بهترین انتخاب", image: "assets/hero.jpg" } // [۱۰ ثانیه‌ای] عکس واقعی سوئیت → همین مسیر
    ]
  },

  requestTypes: [
    "ریزرف اطاق مهمان‌خانه",
    "سفارش غذا / میز رستورانت"
  ],

  roomTypes: [
    "فامیلی",
    "مردها / انفرادی"
  ],

  ui: {
    searchPlaceholder: "جستجو در منیو… (مثلاً قابلی)",
    searchLabel: "جستجو",
    orderButton: "سفارش در واتساپ",
    reserveButton: "ریزرف اطاق در واتساپ",
    submitButton: "ارسال درخواست در واتساپ",
    currencySuffix: "افغانی"
  }
};
