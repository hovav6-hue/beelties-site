/* ============================================================
   הבילתיס' — כל התוכן של האתר נמצא בקובץ הזה.
   כדי לעדכן את האתר, ערוך רק את הקובץ הזה.
   ============================================================ */

const BILTIS = {

  bandName: "הבילתיס'",
  logo:     "images/logo.png",
  hero:     "images/hero.jpg",          /* 16:9 — דסקטופ */
  heroMobile: "images/hero-mobile.jpg", /* 9:16 — מסכים אנכיים */

  tagline:  "מסיבת רוק!",

  /* שלוש המילים שמתחת לכותרת בפתיחה */
  heroLine: ["מוזיקה חיה", "הימנוני רוק", "100% אנרגיה סוחפת"],

  /* האמנים שרצים בפס האדום */
  acts: ["מדונה", "גוון סטפאני", "בון ג׳ובי", "לני קרביץ"],

  /* ---------- אודות ---------- */
  about: {
    lead: "תכינו את הגרון ואת הרגליים. הבילתיס' מפגיזים עם המנוני רוק אגדיים במופע חי, מרים, ובאנרגיות שיא.",
    body: [
      "על הבמה נפגשת חבורת מוזיקאים מקצועיים מהשורה הראשונה — כולל יוצאי ״מיומנה״ ו״בוטן מתוק בקרקס״ — שיודעים בדיוק איך עושים מופע רוק איכותי.",
      "מדונה, גוון סטפאני, בון ג׳ובי ולני קרביץ מחממים מנועים… ואתם?!"
    ],
    /* שלוש נקודות שמופיעות ככרטיסים */
    points: [
      "מוזיקאים מקצועיים מהשורה הראשונה",
      "שירי רוק בלתי נשכחים",
      "מועדונים, ברים, פסטיבלים ואירועים פרטיים"
    ],
    area: "פעילים במרכז ובכל הארץ"
  },

  /* ---------- נגנים ----------
     bio ריק = לא מוצג כלום מתחת לתפקיד.
     כשיהיו טקסטים אמיתיים, פשוט ממלאים את bio והם יופיעו.      */
  members: [
    { name: "הדרה אלוק",      role: "שירה",            image: "images/member-hadara.jpg", bio: "" },
    { name: "יניב נאמן",      role: "גיטרה וקולות",    image: "images/member-yaniv.jpg",  bio: "" },
    { name: "אלעד גזית",      role: "גיטרה",           image: "images/member-elad.jpg",   bio: "" },
    { name: "דויד שמול",      role: "בס וקולות",       image: "images/member-david.jpg",  bio: "" },
    { name: "חובב רובינשטיין", role: "תופים וקולות",   image: "images/member-hovav.jpg",  bio: "" }
  ],

  /* ---------- הופעות ----------
     date בפורמט YYYY-MM-DD. האתר ממיין ומפריד לעתיד/עבר לבד.
     tickets: קישור לכרטיסים, או null.
     note:    טקסט קצר שמוצג במקום כפתור כרטיסים (למשל "כניסה חופשית").
     רשימה ריקה [] מציגה בלוק "התאריכים הבאים בדרך".            */
  shows: [
    { date: "2026-10-14", time: "20:30", title: "הבילתיס'",
      venue: "השוק הישן", city: "פרדס חנה", tickets: null, note: "כניסה חופשית" },
    { date: "2026-10-22", time: "20:30", title: "הבילתיס'",
      venue: "סטארט-אפ גלרי", city: "רשפון", tickets: null, note: "כניסה חופשית" },
    { date: "2027-01-28", time: "20:30", title: "הבילתיס'",
      venue: "פאב הארובה", city: "קיבוץ המעפיל", tickets: null, note: "כניסה חופשית" },
    { date: "2027-02-11", time: "20:30", title: "הבילתיס'",
      venue: "בירה שבט", city: "פרדס חנה", tickets: null, note: "כניסה חופשית" },
    { date: "2027-03-08", time: "20:30", title: "הבילתיס'",
      venue: "פטריקס", city: "קיסריה", tickets: null, note: "כניסה חופשית" }
  ],

  /* ---------- וידאו ----------
     youtube = המזהה בלבד (מה שאחרי v= או אחרי shorts/)
     aspect  = "9/16" לריל אנכי, "16/9" לסרטון רגיל (ברירת מחדל)   */
  videos: [
    { title: "הבילתיס' בלייב", meta: "Reel", youtube: "45p1edzBxQM",
      poster: "images/video-1.jpg", aspect: "9/16" }
  ],

  /* ---------- גלריה ----------
     src   = התמונה המלאה שנפתחת בלייטבוקס
     thumb = גרסה קלה שמוצגת ברשת. אם אין thumb, src משמש לשניהם.   */
  gallery: [
    { src: "images/gallery-01.jpg", thumb: "images/gallery-01-t.jpg", caption: "" },
    { src: "images/gallery-02.jpg", thumb: "images/gallery-02-t.jpg", caption: "" },
    { src: "images/gallery-03.jpg", thumb: "images/gallery-03-t.jpg", caption: "" },
    { src: "images/gallery-04.jpg", thumb: "images/gallery-04-t.jpg", caption: "" },
    { src: "images/gallery-05.jpg", thumb: "images/gallery-05-t.jpg", caption: "" },
    { src: "images/gallery-06.jpg", thumb: "images/gallery-06-t.jpg", caption: "" },
    { src: "images/gallery-07.jpg", thumb: "images/gallery-07-t.jpg", caption: "" },
    { src: "images/gallery-08.jpg", thumb: "images/gallery-08-t.jpg", caption: "" },
    { src: "images/gallery-09.jpg", thumb: "images/gallery-09-t.jpg", caption: "" },
    { src: "images/gallery-10.jpg", thumb: "images/gallery-10-t.jpg", caption: "" },
    { src: "images/gallery-11.jpg", thumb: "images/gallery-11-t.jpg", caption: "" },
    { src: "images/gallery-12.jpg", thumb: "images/gallery-12-t.jpg", caption: "" },
    { src: "images/gallery-13.jpg", thumb: "images/gallery-13-t.jpg", caption: "" },
    { src: "images/gallery-14.jpg", thumb: "images/gallery-14-t.jpg", caption: "" }
  ],

  /* ---------- קשר ---------- */
  contact: {
    note:  "רוצים אותנו אצלכם?",
    email: "Hovav6@gmail.com",
    phone: "052-2270855",
    socials: [
      { label: "YouTube", url: "https://youtube.com/shorts/45p1edzBxQM" }
    ]
  }
};
