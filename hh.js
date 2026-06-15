import { useState, useEffect, useRef, useCallback } from 'react'
import watch01 from './watches/watch-01.jpeg'
import watch02 from './watches/watch-02.jpeg'
import watch03 from './watches/watch-03.jpeg'
import watch04 from './watches/watch-04.jpeg'
import watch05 from './watches/watch-05.jpeg'
import watch06 from './watches/watch-06.jpeg'
import watch07 from './watches/watch-07.jpeg'
import watch08 from './watches/watch-08.jpeg'
import watch09 from './watches/watch-09.jpeg'
import watch10 from './watches/watch-10.jpeg'
import watch11 from './watches/watch-11.jpeg'
import watch12 from './watches/watch-12.jpeg'
import watch13 from './watches/watch-13.jpeg'
import watch14 from './watches/watch-14.jpeg'
import watch15 from './watches/watch-15.jpeg'
import watch16 from './watches/watch-16.jpeg'

import whatsapp from './icons/whatsapp.png'
import insta from './icons/insta.png'
import face from './icons/face.png'
// import watch17 from './watches/watch-17.jpeg'
// import watch18 from './watches/watch-18.jpeg'
// import watch19 from './watches/watch-19.jpg'
// import watch20 from './watches/watch-20.jpeg'

// ─── Watch Images ─────────────────────────────────────────────────────────────
// ضع صورك في src/assets/watches/ باسم watch-01.jpg ... watch-20.jpg
// لو الصورة مش موجودة هيظهر الـ SVG تلقائياً بدون أي error
const loadImg = (path) => {
  try {
    return new URL(path, import.meta.url).href
  } catch {
    return null
  }
}
const WATCH_IMGS = [
  watch01,
  watch02,
  watch03,
  watch04,
  watch05,
  watch06,
  watch07,
  watch08,
  watch09,
  watch10,
  watch11,
  watch12,
  watch13,
  watch14,
  watch15,
  watch16,
  // watch17,
  // watch18,
  // watch19,
  // watch20,
]

/* ═══════════════════════════════════════════════
   DESIGN TOKENS (inline — consistent everywhere)
═══════════════════════════════════════════════ */
const C = {
  bg: '#0a0908', bg2: '#111008', card: '#161410', card2: '#1e1b14',
  border: 'rgba(212,170,80,0.18)', borderHover: 'rgba(212,170,80,0.45)',
  gold: '#d4aa50', gold2: '#f0cc70', gold3: '#a07828',
  red: '#c0392b', green: '#27ae60',
  white: '#faf8f2', gray1: '#e8e2d4', gray2: '#b0a888', gray3: '#706850',
  serif: "'Playfair Display', Georgia, serif",
  sans:  "'Inter', sans-serif",
  arabic:"'Cairo', sans-serif",
}
const S = (obj) => obj  // style passthrough for readability

/* ═══════════════════════════════════════════════
   DATA — 20 WATCHES
═══════════════════════════════════════════════ */
const WATCHES = [
  {id: 1,
name: "Datejust Diamond Dial",
nameAr: "ديتجاست مينا ألماس",
brand: "Rolex",           price:350, original:600, discount:42,  category: "Classic",
categoryAr: "كلاسيكي",
badge: "bestseller",
badgeAr: "الأكثر مبيعاً",
dial: "Purple Diamond-set",
dialAr: "أرجواني مرصع بالألماس",
condition: "New",
year: "2024",
desc: "Exuding pure elegance, this Datejust features a captivating purple dial adorned with sparkling diamond hour markers, housed in a polished steel case. A timeless icon of luxury and refined taste.",
descAr: "تفيض هذه الساعة بالأناقة الخالصة، حيث تتميز بمينا أرجواني ساحر مرصع بمؤشرات ساعات من الألماس المتلألئ، داخل هيكل فولاذي مصقول. رمز خالد للفخامة والذوق الرفيع.",
features: ["Diamond Indices", "Jubilee Bracelet", "Date Magnification"],
featAr: ["مؤشرات ألماسية", "سوار جوبيلي", "عدسة تكبير للتاريخ"], img:null, exclusive:false, hot:true },
    

  { id: 2,
name: "Nautilus Blue",
nameAr: "نوتيلوس أزرق",
brand: "Patek Philippe", price:380, original:500, discount:24, category: "Unique to own",
categoryAr: "مميز للاقتناء",
badge: "exclusive",
badgeAr: "حصري",
dial: "Blue Gradient Ribbed",
dialAr: "أزرق متدرج مخطط",
condition: "New",
year: "2024",
desc: "A masterpiece of horological engineering, the Nautilus is defined by its iconic porthole design and blue ribbed dial. A must-have for serious collectors seeking unmatched luxury.",
descAr: "تحفة فنية في هندسة الساعات، تتميز النوتيلوس بتصميمها الأيقوني المستوحى من كوة السفن ومينائها الأزرق المخطط. قطعة لا غنى عنها لهواة الجمع الباحثين عن فخامة لا تضاهى.",
features: ["Signature Porthole Case", "Integrated Bracelet", "Automatic Movement"],
featAr: ["هيكل أيقوني مميز", "سوار مدمج", "حركة أوتوماتيكية"], img:null, exclusive:true, hot:false },

  { id: 3,
name: "Integral Quartz",
nameAr: "إنتجرال كوارتز",
brand: "Rado", price:450, original:640, discount:30, category: "Simple",
categoryAr: "بسيط",
badge: "hot",
badgeAr: "مطلوب",
dial: "Champagne Sunray",
dialAr: "شامبين شمسية",
condition: "New",
year: "2024",
desc: "Embodying minimalist beauty, this Rado timepiece offers a sleek champagne dial and a comfortable bracelet. The perfect daily companion for those who appreciate clean, modern aesthetics.",
descAr: "تجسيداً للجمال البسيط، تقدم ساعة رادو هذه مينا شامبين أنيقاً وسواراً مريحاً. الرفيق اليومي المثالي لأولئك الذين يقدرون التصاميم العصرية النظيفة.",
features: ["Slim Profile", "Sapphire Crystal", "Precision Quartz"],
featAr: ["تصميم نحيف", "زجاج ياقوتي", "حركة كوارتز دقيقة"], img:null, exclusive:false, hot:false },

  { id: 4,
name: "Vintage Square",
nameAr: "فينتيج سكوير",
brand: "Casio", price:500, original:700, discount:29, category: "Practical",
categoryAr: "عملي",
badge: "deal",
badgeAr: "عرض",
dial: "Matte Black",
dialAr: "أسود مطفي",
condition: "New",
year: "2024",
desc: "Combining retro charm with modern functionality, this black-on-black Casio square watch is the ultimate daily-wear piece. Reliable, stylish, and built to withstand your busiest days.",
descAr: "تجمع هذه الساعة من كاسيو بين سحر التصميم الكلاسيكي والوظائف الحديثة، لتكون القطعة الأمثل للاستخدام اليومي. عملية، أنيقة، ومصممة لتحمل انشغال أيامك.",
features: ["Retro Square Case", "Black IP Finish", "Durable Quartz"],
featAr: ["هيكل مربع كلاسيكي", "طلاء أسود مقاوم", "كوارتز متين"], img:null, exclusive:true, hot:true },

  { id: 5,
name: "Nautilus Blue Date",
nameAr: "نوتيلوس أزرق بالتاريخ",
brand: "Patek Philippe", price:480, original:550, discount:13, category: "Unique to own",
categoryAr: "مميز للاقتناء",
badge: "exclusive",
badgeAr: "حصري",
dial: "Blue Gradient Ribbed",
dialAr: "أزرق متدرج مخطط",
condition: "New",
year: "2024",
desc: "The quintessential luxury sports watch. This Nautilus variant offers a clean blue dial with a functional date display, blending sporty utility with high-end craftsmanship seamlessly.",
descAr: "ساعة الرفاهية الرياضية بامتياز. تقدم نسخة النوتيلوس هذه مينا أزرق نقياً مع نافذة للتاريخ، لتجمع بين الأداء العملي والبراعة الحرفية العالية بكل سلاسة.",
features: ["Date Window", "Screw-down Crown", "Exhibition Caseback"],
featAr: ["نافذة للتاريخ", "تاج ملولب", "غطاء خلفي شفاف"], img:null, exclusive:false, hot:true },

  {id: 6,
name: "Integral Diamond",
nameAr: "إنتجرال ألماس",
brand: "Rado", price:600, original:670, discount:10, category: "Classic",
categoryAr: "كلاسيكي",
badge: "new",
badgeAr: "جديد",
dial: "Grey Diamond-set",
dialAr: "رمادي مرصع بالألماس",
condition: "New",
year: "2024",
desc: "Sophisticated and refined, this Rado features a monochromatic grey palette enhanced by luxurious diamond indices. A perfect choice for those who value understated glamour.",
descAr: "متطورة وراقية، تتميز ساعة رادو هذه بلوحة ألوان رمادية أحادية معززة بمؤشرات ألماسية فاخرة. خيار مثالي لمن يقدرون الفخامة الهادئة.",
features: ["Diamond Accents", "Monochrome Design", "Ceramic Construction"],
featAr: ["لمسات ألماسية", "تصميم أحادي اللون", "هيكل سيراميكي"], img:null, exclusive:false, hot:false },

  { id: 7,
name: "Royal Oak Quartz",
nameAr: "رويال أوك كوارتز",
brand: "Audemars Piguet", price:300, original:400, discount:25, category: "Unique to own",
categoryAr: "مميز للاقتناء",
badge: "hot",
badgeAr: "مطلوب",
dial: "Blue Tapisserie",
dialAr: "أزرق بنقش تبيسري",
condition: "New",
year: "2024",
desc: "Featuring the signature octagonal bezel and tapisserie dial, this Royal Oak is a horological masterpiece. Sleek, powerful, and an absolute statement piece for any enthusiast.",
descAr: "تتميز بإطارها الثماني الشهير ومينائها بنقش التبيسري، تُعد رويال أوك تحفة فنية. أنيقة، قوية، وقطعة مميزة تلفت الأنظار لكل محبي الساعات.",
features: ["Octagonal Bezel", "Tapisserie Dial", "Integrated Bracelet"],
featAr: ["إطار ثماني", "مينا بنقش تبيسري", "سوار مدمج"], img:null, exclusive:true, hot:false },

  { id: 8,
name: "Land-Dweller Fluted",
nameAr: "لاند-دويلر بإطار مخدد",
brand: "Rolex", price:420, original:490, discount:14, category: "Practical",
categoryAr: "عملي",
badge: "bestseller",
badgeAr: "الأكثر مبيعاً",
dial: "Honey-comb Grey",
dialAr: "رمادي بنقش خلية نحل",
condition: "New",
year: "2024",
desc: "A robust adventurer's companion, the Land-Dweller combines a distinctive fluted bezel with a unique textured dial, offering durability and style for both the field and the office.",
descAr: "رفيق المغامر القوي، تجمع ساعة لاند-دويلر بين الإطار المخدد المميز والمينا ذو الملمس الفريد، مما يوفر المتانة والأناقة للعمل الميداني والمكتبي على حد سواء.",
features: ["Fluted Bezel", "Textured Dial", "Oystersteel Build"],
featAr: ["إطار مخدد", "مينا مزخرف", "هيكل من أويسترستيل"], img:null, exclusive:false, hot:false },

  {id: 9,
name: "Tank Louis",
nameAr: "تانك لويس",
brand: "Cartier", price:399, original:600, discount:34, category: "Classic",
categoryAr: "كلاسيكي",
badge: "exclusive",
badgeAr: "حصري",
dial: "Silver Roman",
dialAr: "فضي بأرقام رومانية",
condition: "New",
year: "2024",
desc: "The embodiment of timeless Parisian chic. With its rectangular silhouette and classic Roman numeral dial, this Tank is an essential for any sophisticated wardrobe.",
descAr: "تجسيد للأناقة الباريسية الخالدة. بفضل تصميمها المستطيل ومينائها الكلاسيكي ذي الأرقام الرومانية، تُعد ساعة تانك قطعة أساسية في خزانة أي شخص أنيق.",
features: ["Rectangular Case", "Roman Numerals", "Leather Strap"],
featAr: ["هيكل مستطيل", "أرقام رومانية", "سوار جلدي"], img:null, exclusive:false, hot:true },

  { id: 10,
name: "Nautilus Silver",
nameAr: "نوتيلوس فضي",
brand: "Patek Philippe", price:320, original:600, discount:47,category: "Unique to own",
categoryAr: "مميز للاقتناء",
badge: "hot",
badgeAr: "مطلوب",
dial: "Silver Ribbed",
dialAr: "فضي مخطط",
condition: "New",
year: "2024",
desc: 'This silver-dialed Nautilus offers a brighter, modern take on the legendary design. Precision, elegance, and exclusivity come together in this high-horology masterpiece.',
descAr: 'تقدم ساعة نوتيلوس ذات المينا الفضي نظرة عصرية وأكثر إشراقاً على التصميم الأسطوري. الدقة، الأناقة، والحصرية تجتمع كلها في هذه التحفة الفنية.',
features: ["Silver Dial", "Automatic Caliber", "Porthole Design"],
featAr: ["مينا فضي", "عيار أوتوماتيكي", "تصميم كوة السفن"], img:null, exclusive:true, hot:false },

  { "id": 11,
"name": "Minimalist Square",
"nameAr": "مربع مينيماليست",
"brand": "Casio", price:540, original:600, discount:10, "category": "Simple",
"categoryAr": "بسيط",
"badge": "new",
"badgeAr": "جديد",
"dial": "Silver Sunray",
"dialAr": "فضي شمسي",
"condition": "New",
"year": "2026",
"desc": "A perfect blend of understated elegance and daily utility. This silver-toned square watch offers a clean, professional look suitable for any setting, featuring reliable quartz precision.",
"descAr": "مزيج مثالي بين الأناقة البسيطة والعملية اليومية. توفر هذه الساعة المربعة ذات اللون الفضي مظهراً احترافياً نظيفاً يناسب أي مكان، مع دقة كوارتز موثوقة.",
"features": ["Square Profile", "Silver Finish", "Reliable Quartz"],
"featAr": ["هيكل مربع", "طلاء فضي", "كوارتز موثوق"], img:null, exclusive:true, hot:false },

  { "id": 12,
"name": "Nautilus Brown",
"nameAr": "نوتيلوس بني",
"brand": "Patek Philippe", price:549, original:640, discount:14, "category": "Unique to own",
"categoryAr": "مميز للاقتناء",
"badge": "hot",
"badgeAr": "مطلوب",
"dial": "Chocolate Ribbed",
"dialAr": "شوكولاتة مخطط",
"condition": "New",
"year": "2026",
"desc": "An extraordinary Nautilus variant featuring a rich chocolate-toned dial. Its iconic design and warm color palette make it a rare masterpiece for the sophisticated watch collector.",
"descAr": "نسخة استثنائية من نوتيلوس تتميز بميناء غني بلون الشوكولاتة. تصميمها الأيقوني ولوحة ألوانها الدافئة تجعلها تحفة فنية نادرة لهواة جمع الساعات الراقية.",
"features": ["Chocolate Dial", "Integrated Bracelet", "Exhibition Caseback"],
"featAr": ["مينا شوكولاتة", "سوار مدمج", "غطاء خلفي شفاف"], img:null, exclusive:false, hot:false },

  {"id": 13,
"name": "Black Stealth",
"nameAr": "بلاك ستيلث",
"brand": "Custom Design", price:399, original:550, discount:27,"category": "Unique to own",
"categoryAr": "مميز للاقتناء",
"badge": "exclusive",
"badgeAr": "حصري",
"dial": "Arabic Numeral Matte",
"dialAr": "أرقام عربية مطفية",
"condition": "New",
"year": "2026",
"desc": "A bold, all-black statement piece featuring traditional Arabic numerals on a matte finish. This watch pushes boundaries with its stealth aesthetic and unique artistic expression.",
"descAr": "قطعة جريئة باللون الأسود بالكامل تتميز بأرقام عربية تقليدية على سطح مطفي. تكسر هذه الساعة الحواجز بجماليتها الغامضة وتعبيرها الفني الفريد.",
"features": ["Full Black Finish", "Arabic Numerals", "Artistic Dial"],
"featAr": ["تشطيب أسود كامل", "أرقام عربية", "مينا فني"], img:null, exclusive:false, hot:false },

  { "id": 14,
"name": "Everyday Square",
"nameAr": "إيفري داي سكوير",
"brand": "Casio", price:450, original:600, discount:25, "category": "Practical",
"categoryAr": "عملي",
"badge": "deal",
"badgeAr": "عرض",
"dial": "Dark Grey",
"dialAr": "رمادي داكن",
"condition": "New",
"year": "2026",
"desc": "Built for the practical individual, this square watch offers a sophisticated dark grey dial. It is the perfect everyday companion that balances affordability with classic design.",
"descAr": "صُممت للفرد العملي، تقدم هذه الساعة المربعة ميناءً رمادياً داكناً متطوراً. إنها الرفيق اليومي المثالي الذي يوازن بين السعر المناسب والتصميم الكلاسيكي.",
"features": ["Square Case", "Date Function", "Casual Style"],
"featAr": ["هيكل مربع", "وظيفة التاريخ", "تصميم كاجوال"], img:null, exclusive:true, hot:false },

  { "id": 15,
"name": "Oyster Perpetual Day-Date",
"nameAr": "أويستر بربتشوال داي-ديت",
"brand": "Rolex", price:500, original:600, discount:17,"category": "Classic",
"categoryAr": "كلاسيكي",
"badge": "bestseller",
"badgeAr": "الأكثر مبيعاً",
"dial": "Sunray Grey Diamond-set",
"dialAr": "رمادي شمسي مرصع بالألماس",
"condition": "New",
"year": "2026",
"desc": "The ultimate symbol of achievement. This Rolex features a day and date complication with exquisite diamond hour markers, set against a stunning sunray grey dial.",
"descAr": "رمز الإنجاز المطلق. تتميز رولكس هذه بخاصية عرض اليوم والتاريخ مع مؤشرات ساعات ألماسية رائعة، على خلفية ميناء رمادي شمسي مذهل.",
"features": ["Day-Date Complication", "Diamond Indices", "President Bracelet"],
"featAr": ["خاصية اليوم والتاريخ", "مؤشرات ألماسية", "سوار بريزيدنت"], img:null, exclusive:false, hot:false },

  { "id": 16,
"name": "Leather Datejust",
"nameAr": "ديتجاست جلد",
"brand": "Rolex", price:360, original:450, discount:20, "category": "Classic",
"categoryAr": "كلاسيكي",
"badge": "exclusive",
"badgeAr": "حصري",
"dial": "Black Diamond-set",
"dialAr": "أسود مرصع بالألماس",
"condition": "New",
"year": "2026",
"desc": "A refined twist on the classic Datejust, featuring a high-quality leather strap. The contrast between the black dial, diamonds, and leather exudes sophisticated, understated luxury.",
"descAr": "لمسة راقية على ساعة ديتجاست الكلاسيكية، تتميز بسوار من الجلد عالي الجودة. التباين بين الميناء الأسود والألماس والجلد يبعث على الفخامة المتطورة والهادئة.",
"features": ["Leather Strap", "Diamond Accents", "Date Window"],
"featAr": ["سوار جلدي", "لمسات ألماسية", "نافذة للتاريخ"], img:null, exclusive:true, hot:true },

  { id:17, name:'Radiomir Black Seal', nameAr:'راديومير بلاك سيل',  brand:'Panerai',         model:'PAM00505', price:400, original:700, discount:43, category:'Sport', categoryAr:'رياضي', badge:'deal', badgeAr:'عرض',
    dial:'Matte Black',               dialAr:'أسود مات',             caseMM:'45mm', thickness:'15.6mm', wr:'100M', movement:'P.6000 Manual', movAr:'يدوي P.6000',
    material:'DLC-Coated Steel',      matAr:'ستيل بطلاء DLC', condition:'New', year:'2024',
    desc:'Italian military heritage in a bold 45mm cushion case. In-house P.6000 movement with 3-day power reserve.',
    descAr:'التراث العسكري الإيطالي في غلاف وسادة 45مم جريء. حركة P.6000 الداخلية لـ 3 أيام احتياطي.',
    features:['3-Day Power Reserve','DLC Cushion Case','P.6000 In-House'],
    featAr:['احتياطي 3 أيام','غلاف وسادة DLC','P.6000 داخلية'], img:null, exclusive:false, hot:false },

  { id:18, name:'Master Ultra Thin Moon',nameAr:'ماستر أولترا ثين',  brand:'Jaeger-LeCoultre',model:'Q1368470', price:450, original:550, discount:18, category:'Dress', categoryAr:'رسمي', badge:'new', badgeAr:'جديد',
    dial:'Silver Guilloché',          dialAr:'فضي غيوشيه',           caseMM:'39mm', thickness:'9.2mm', wr:'50M', movement:'Cal. 925/3 Automatic', movAr:'أوتوماتيك Cal. 925/3',
    material:'Pink Gold',             matAr:'ذهب وردي', condition:'New', year:'2024',
    desc:'Ultra-thin perpetual moon phase accurate to one day in 3,887 years. Pink gold case and guilloché dial of incomparable refinement.',
    descAr:'مرحلة قمر دائمة رفيعة للغاية، دقيقة ليوم واحد كل 3,887 سنة. ذهب وردي وغيوشيه لا مثيل له.',
    features:['Moon Phase 3,887yr Accuracy','Ultra-Thin 9.2mm','Pink Gold Case'],
    featAr:['دقة 3,887 سنة','رفيع 9.2مم','غلاف ذهب وردي'], img:null, exclusive:false, hot:false },

  { id:19, name:'Constellation Globemaster',nameAr:'كونستيليشن',   brand:'Omega',           model:'130.33.41.22.03.001', price:500, original:890, discount:44, category:'Dress', categoryAr:'رسمي', badge:'deal', badgeAr:'عرض',
    dial:'Blue Pie-Pan',              dialAr:'أزرق باي باندا',       caseMM:'41mm', thickness:'11.9mm', wr:'100M', movement:'Cal. 8900 Master Chronometer', movAr:'ماستر كرونوميتر Cal. 8900',
    material:'Stainless Steel',       matAr:'ستيل', condition:'New', year:'2024',
    desc:'METAS Master Chronometer certified. The pie-pan dial from the 1950s reimagined with modern execution and Sedna gold details.',
    descAr:'شهادة METAS ماستر كرونوميتر. وجه باي باندا من الخمسينات بأسلوب عصري وتفاصيل ذهب سيدنا.',
    features:['METAS Master Chronometer','Pie-Pan Dial','Sedna Gold Accents'],
    featAr:['شهادة METAS','وجه باي باندا','لمسات ذهب سيدنا'], img:null, exclusive:false, hot:false },

  { id:20, name:'Tourbillon Souverain',nameAr:'توربيون سوفيران',    brand:'F.P. Journe',     model:'TN', price:700, original:1000, discount:30, category:'Complicated', categoryAr:'معقد', badge:'ultra-rare', badgeAr:'نادر جداً',
    dial:'Silver Brass',              dialAr:'نحاسي فضي',            caseMM:'38mm', thickness:'8mm', wr:'30M', movement:'Cal. 1499-3 Manual Tourbillon', movAr:'توربيون يدوي Cal. 1499-3',
    material:'18K Gold',              matAr:'ذهب 18 قيراط', condition:'Unworn', year:'2023',
    desc:'The purist\'s tourbillon. F.P. Journe\'s signature remontoir d\'egalité ensures every single oscillation receives identical energy.',
    descAr:'توربيون المتذوق الحقيقي. نظام Remontoir المميز لـ F.P. Journe يضمن طاقة متساوية لكل تذبذب.',
    features:['Remontoir d\'Egalité','Signed Brass Dial','18K Gold Case'],
    featAr:['نظام Remontoir','وجه نحاسي موقّع','غلاف ذهب 18 قيراط'], img:null, exclusive:true, hot:true },
]

// ── ربط الصور بالساعات تلقائياً (index 0 = watch id 1) ──
// لما تضيف صورة، بدّل img1..img20 في الأعلى بالباث الصح
WATCHES.forEach((w, i) => { w.img = WATCH_IMGS[i] || null })

const BADGE_STYLE = {
  'exclusive':  { bg:'linear-gradient(135deg,#1a1260,#3a28c0)', color:'#fff' },
  'deal':       { bg:'linear-gradient(135deg,#c0392b,#e74c3c)', color:'#fff' },
  'hot':        { bg:'linear-gradient(135deg,#e67e22,#f39c12)', color:'#fff' },
  'ultra-rare': { bg:'linear-gradient(135deg,#2c0a3a,#6c2a9a)', color:'#fff' },
  'new':        { bg:'linear-gradient(135deg,#1a4a1a,#27ae60)',  color:'#fff' },
}

const CATEGORIES = [
  { en:'All',         ar:'الكل' },
  { en:'Sport',       ar:'رياضي' },
  { en:'Dress',       ar:'رسمي' },
  { en:'Complicated', ar:'معقد' },
  { en:'Travel',      ar:'سفر' },
]

/* ═══════════════════════════════════════════════
   TINY HELPERS
═══════════════════════════════════════════════ */
const fmtPrice = n => 'EGP' + n.toLocaleString()

function useLang() {
  const [lang, setLang] = useState('ar')
  const ar = lang === 'ar'
  const t = (enTxt, arTxt) => ar ? arTxt : enTxt
  const toggle = () => setLang(l => l === 'ar' ? 'en' : 'ar')
  return { lang, ar, t, toggle }
}

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, vis]
}

function AnimNum({ to, suffix='', active }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!active) return
    let f = 0, total = 70
    const step = () => { f++; setV(Math.round(to * (1 - Math.pow(1-f/total, 3)))); if(f<total) requestAnimationFrame(step) }
    requestAnimationFrame(step)
  }, [active, to])
  return <>{v}{suffix}</>
}

/* ═══════════════════════════════════════════════
   LIVE CLOCK SVG
═══════════════════════════════════════════════ */
function LiveClock({ size = 380 }) {
  const [now, setNow] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])
  const cx = size/2, cy = size/2, R = size*0.42
  const deg = (n, max) => (n * 360/max - 90) * Math.PI/180
  const hp = (d,l) => ({ x: cx + l*Math.cos(d), y: cy + l*Math.sin(d) })
  const sDeg = deg(now.getSeconds(), 60)
  const mDeg = deg(now.getMinutes() + now.getSeconds()/60, 60)
  const hDeg = deg((now.getHours()%12) + now.getMinutes()/60, 12)
  const hand = (d, r, w, color, glow) => (
    <g>
      <line x1={cx} y1={cy} x2={hp(d,r).x} y2={hp(d,r).y}
        stroke={glow||color} strokeWidth={w+2} strokeLinecap="round" opacity={0.15}/>
      <line x1={cx} y1={cy} x2={hp(d,r).x} y2={hp(d,r).y}
        stroke={color} strokeWidth={w} strokeLinecap="round"/>
      <line x1={cx} y1={cy}
        x2={cx-(hp(d,r).x-cx)*0.2} y2={cy-(hp(d,r).y-cy)*0.2}
        stroke={color} strokeWidth={w+1} strokeLinecap="round" opacity={0.5}/>
    </g>
  )
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{filter:'drop-shadow(0 0 40px rgba(212,170,80,0.2)) drop-shadow(0 30px 60px rgba(0,0,0,0.7))'}}>
      <defs>
        <radialGradient id="dialBg" cx="45%" cy="38%">
          <stop offset="0%" stopColor="#221e14"/><stop offset="100%" stopColor="#080705"/>
        </radialGradient>
        <radialGradient id="caseBg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#2e2818"/><stop offset="100%" stopColor="#100e08"/>
        </radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Case */}
      <circle cx={cx} cy={cy} r={R+32} fill="url(#caseBg)"/>
      <circle cx={cx} cy={cy} r={R+30} fill="none" stroke={C.gold} strokeWidth="1" opacity=".6"/>
      <circle cx={cx} cy={cy} r={R+24} fill="none" stroke={C.gold3} strokeWidth=".5" opacity=".3"/>
      {/* Bezel ticks */}
      {Array.from({length:60},(_,i) => {
        const a = (i*6-90)*Math.PI/180, big=i%5===0
        const r1=R+28, r2=R+(big?14:21)
        return <line key={i} x1={cx+r1*Math.cos(a)} y1={cy+r1*Math.sin(a)} x2={cx+r2*Math.cos(a)} y2={cy+r2*Math.sin(a)}
          stroke={C.gold} strokeWidth={big?2:.6} opacity={big?.9:.3}/>
      })}
      {/* Shadow ring */}
      <circle cx={cx} cy={cy} r={R+8} fill="none" stroke="rgba(0,0,0,.95)" strokeWidth="7"/>
      {/* Dial */}
      <circle cx={cx} cy={cy} r={R} fill="url(#dialBg)"/>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.gold} strokeWidth=".6" opacity=".5"/>
      <circle cx={cx} cy={cy} r={R-18} fill="none" stroke={C.gold} strokeWidth=".3" opacity=".12"/>
      {/* Hour markers */}
      {Array.from({length:12},(_,i)=>{
        const a=(i*30-90)*Math.PI/180, big=i%3===0
        const rA=R-(big?6:9), rB=R-(big?20:16)
        return <line key={i} x1={cx+rA*Math.cos(a)} y1={cy+rA*Math.sin(a)} x2={cx+rB*Math.cos(a)} y2={cy+rB*Math.sin(a)}
          stroke={C.gold} strokeWidth={big?3:1.2} opacity={big?1:.55}/>
      })}
      {/* Roman nums */}
      {[{n:'XII',a:-90},{n:'III',a:0},{n:'VI',a:90},{n:'IX',a:180}].map(({n,a})=>{
        const rad=a*Math.PI/180
        return <text key={n} x={cx+(R-50)*Math.cos(rad)} y={cy+(R-50)*Math.sin(rad)}
          textAnchor="middle" dominantBaseline="middle"
          fill={C.gold} fontSize="13" fontFamily={C.serif} fontWeight="500" opacity=".85">{n}</text>
      })}
      {/* Brand */}
      <text x={cx} y={cy-28} textAnchor="middle" fill={C.gold} fontSize="14" fontFamily={C.serif} fontWeight="500" letterSpacing="5" opacity=".9">TQ</text>
      <text x={cx} y={cy-12} textAnchor="middle" fill={C.gold3} fontSize="7" fontFamily={C.sans} fontWeight="300" letterSpacing="3.5" opacity=".7">WATCHES</text>
      {/* Date */}
      <rect x={cx+42} y={cy-10} width="25" height="20" rx="3" fill="#0c0b08" stroke={C.gold} strokeWidth=".8" opacity=".9"/>
      <text x={cx+54} y={cy+1} textAnchor="middle" dominantBaseline="middle" fill={C.gray1} fontSize="10" fontFamily={C.sans} fontWeight="600">{now.getDate()}</text>
      {/* Hands */}
      {hand(hDeg, R*.52, 4, C.gold, C.gold2)}
      {hand(mDeg, R*.72, 2.5, C.gold2, C.gold2)}
      {hand(sDeg, R*.84, 1.5, '#e8b040', C.gold)}
      <line x1={cx} y1={cy} x2={hp(sDeg, -R*.26).x} y2={hp(sDeg, -R*.26).y} stroke="#c0392b" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Center */}
      <circle cx={cx} cy={cy} r="7" fill={C.gold}/>
      <circle cx={cx} cy={cy} r="3.5" fill="#0c0b08"/>
      <circle cx={cx} cy={cy} r="1.5" fill={C.gold}/>
    </svg>
  )
}

/* Mini watch face for cards */
function MiniWatch({ w, size=200 }) {
  const cx=size/2, cy=size/2, R=size*.41
  const ac = w.accentColor || C.gold
  const bg = w.dialColor || '#161208'
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id={`d${w.id}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor={bg+'cc'}/><stop offset="100%" stopColor={bg}/>
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={R+18} fill={bg} opacity=".9"/>
      <circle cx={cx} cy={cy} r={R+16} fill="none" stroke={ac} strokeWidth=".7" opacity=".6"/>
      <circle cx={cx} cy={cy} r={R+10} fill="none" stroke={ac} strokeWidth=".3" opacity=".25"/>
      {Array.from({length:60},(_,i)=>{
        const a=(i*6-90)*Math.PI/180, b=i%5===0
        return <line key={i} x1={cx+(R+14)*Math.cos(a)} y1={cy+(R+14)*Math.sin(a)} x2={cx+(R+(b?5:10))*Math.cos(a)} y2={cy+(R+(b?5:10))*Math.sin(a)}
          stroke={ac} strokeWidth={b?1.4:.5} opacity={b?.75:.25}/>
      })}
      <circle cx={cx} cy={cy} r={R+4} fill="none" stroke="rgba(0,0,0,.85)" strokeWidth="4"/>
      <circle cx={cx} cy={cy} r={R} fill={`url(#d${w.id})`}/>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={ac} strokeWidth=".5" opacity=".45"/>
      {Array.from({length:12},(_,i)=>{
        const a=(i*30-90)*Math.PI/180, b=i%3===0
        return <line key={i} x1={cx+(R-(b?5:7))*Math.cos(a)} y1={cy+(R-(b?5:7))*Math.sin(a)} x2={cx+(R-(b?16:13))*Math.cos(a)} y2={cy+(R-(b?16:13))*Math.sin(a)}
          stroke={ac} strokeWidth={b?2.2:.9} opacity={b?.9:.45}/>
      })}
      <text x={cx} y={cy-22} textAnchor="middle" fill={ac} fontSize="10" fontFamily={C.serif} fontWeight="500" letterSpacing="4" opacity=".85">TQ</text>
      <line x1={cx} y1={cy} x2={cx} y2={cy-R*.54} stroke={ac} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1={cx} y1={cy} x2={cx+R*.37} y2={cy} stroke={ac} strokeWidth="2" strokeLinecap="round" opacity=".8"/>
      <line x1={cx} y1={cy} x2={cx+R*.03} y2={cy-R*.67} stroke="#e8e0d0" strokeWidth=".9" strokeLinecap="round" opacity=".5"/>
      <circle cx={cx} cy={cy} r="4.5" fill={ac}/>
      <circle cx={cx} cy={cy} r="2" fill={bg}/>
    </svg>
  )
}

/* ═══════════════════════════════════════════════
   TICKER BANNER
═══════════════════════════════════════════════ */
function Ticker({ ar }) {
  const items = ar
    ? ['✅ ضمان الأصالة 100%','🎁 هدية مع كل ساعة','⭐ أكثر من 2000 عميل راضٍ','💎 أسعار تنافسية','🔒 دفع آمن بالكامل']
    : ['✅ 100% Authenticity Guarantee','🎁 Gift with Every Watch','⭐ 2,000+ Happy Clients','💎 Competitive Pricing','🔒 Fully Secure Payment']
  const doubled = [...items, ...items]
  return (
    <div style={{ background: `linear-gradient(90deg, ${C.gold3}, ${C.gold}, ${C.gold3})`, overflow:'hidden', padding:'10px 0', borderTop:`1px solid ${C.gold}33`, borderBottom:`1px solid ${C.gold}33` }}>
      <div style={{ display:'flex', gap:'4rem', animation:'ticker 28s linear infinite', whiteSpace:'nowrap' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ color:C.bg, fontSize:'13px', fontWeight:'600', fontFamily: ar ? C.arabic : C.sans, flexShrink:0 }}>{item}</span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SEARCH OVERLAY
═══════════════════════════════════════════════ */
function SearchOverlay({ ar, onClose, onWatch }) {
  const [q, setQ] = useState('')
  const inputRef = useRef(null)
  useEffect(() => { inputRef.current?.focus() }, [])

  const results = q.trim().length < 2 ? [] : WATCHES.filter(w => {
    const str = q.toLowerCase()
    return (
      w.name.toLowerCase().includes(str) ||
      w.nameAr.includes(q) ||
      w.brand.toLowerCase().includes(str) ||
      w.model.toLowerCase().includes(str) ||
      w.category.toLowerCase().includes(str) ||
      w.categoryAr.includes(q) ||
      String(w.price).includes(str)
    )
  })

  const handleKey = e => { if (e.key === 'Escape') onClose() }

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.85)', backdropFilter:'blur(10px)', zIndex:2000 }}/>
      <div style={{ position:'fixed', top:'80px', left:'50%', transform:'translateX(-50%)', width:'680px', maxWidth:'95vw', zIndex:2001, direction:ar?'rtl':'ltr' }}>
        {/* Search input */}
        <div style={{ position:'relative', marginBottom:'16px' }}>
          <span style={{ position:'absolute', top:'50%', [ar?'right':'left']:'18px', transform:'translateY(-50%)', fontSize:'20px', pointerEvents:'none' }}>🔍</span>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={handleKey}
            placeholder={ar ? 'ابحث عن ساعة، براند، موديل...' : 'Search for a watch, brand, model...'}
            style={{
              width:'100%', padding:'18px 56px', background:C.card,
              border:`1px solid ${C.gold}60`, borderRadius:'12px',
              color:C.white, fontFamily:ar?C.arabic:C.sans, fontSize:'16px',
              outline:'none', direction:ar?'rtl':'ltr',
              boxShadow:`0 20px 60px rgba(0,0,0,.6), 0 0 0 1px ${C.gold}20`
            }}
          />
          {q && (
            <button onClick={() => setQ('')} style={{ position:'absolute', top:'50%', [ar?'left':'right']:'16px', transform:'translateY(-50%)', color:C.gray3, fontSize:'20px', lineHeight:1 }}>×</button>
          )}
        </div>

        {/* Quick suggestions when empty */}
        {q.length < 2 && (
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'20px', boxShadow:'0 20px 60px rgba(0,0,0,.5)' }}>
            <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.gray3, marginBottom:'14px', textTransform:ar?'none':'uppercase', letterSpacing:ar?0:'0.1em' }}>
              {ar ? 'بحث سريع' : 'Quick Search'}
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
              {['Rolex','Patek Philippe','Omega','Sport','Dress','< $15,000'].map(tag => (
                <button key={tag} onClick={() => setQ(tag)}
                  style={{ padding:'6px 14px', border:`1px solid ${C.border}`, borderRadius:'100px', fontSize:'13px', color:C.gray2, fontFamily:ar?C.arabic:C.sans, transition:'all .2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2}}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {q.length >= 2 && (
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:'12px', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,.5)', maxHeight:'60vh', overflowY:'auto' }}>
            {results.length === 0 ? (
              <div style={{ padding:'40px', textAlign:'center' }}>
                <div style={{ fontSize:'2.5rem', marginBottom:'12px' }}>🔍</div>
                <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'15px', color:C.gray2 }}>
                  {ar ? `لا توجد نتائج لـ "${q}"` : `No results for "${q}"`}
                </p>
              </div>
            ) : (
              <>
                <div style={{ padding:'12px 20px', borderBottom:`1px solid ${C.border}`, background:C.card2 }}>
                  <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.gold }}>
                    {results.length} {ar ? 'نتيجة' : 'result(s)'}
                  </span>
                </div>
                {results.map(w => (
                  <button key={w.id} onClick={() => { onWatch(w); onClose() }}
                    style={{ width:'100%', padding:'16px 20px', display:'flex', alignItems:'center', gap:'16px', borderBottom:`1px solid ${C.border}20`, transition:'background .2s', direction:ar?'rtl':'ltr', textAlign:ar?'right':'left' }}
                    onMouseEnter={e=>e.currentTarget.style.background=C.card2}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    {/* Mini visual */}
                    <div style={{ width:'56px', height:'56px', borderRadius:'8px', background:C.bg2, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${C.border}` }}>
                      <MiniWatch w={w} size={52}/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexDirection:ar?'row-reverse':'row', marginBottom:'4px' }}>
                        <div>
                          <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'11px', color:C.gold3, fontWeight:'600' }}>{w.brand}</span>
                          <div style={{ fontFamily:C.serif, fontSize:'15px', fontWeight:'600', color:C.white }}>{ar?w.nameAr:w.name}</div>
                        </div>
                        <div style={{ textAlign:ar?'left':'right' }}>
                          <div style={{ fontFamily:C.sans, fontSize:'15px', fontWeight:'700', color:C.gold }}>${w.price.toLocaleString()}</div>
                          {w.discount > 0 && <div style={{ fontSize:'11px', color:C.red, fontWeight:'600' }}>-{w.discount}%</div>}
                        </div>
                      </div>
                      <div style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.gray3 }}>{ar?w.categoryAr:w.category} · {w.caseMM}</div>
                    </div>
                    <span style={{ color:C.gray3, fontSize:'18px', flexShrink:0 }}>{ar?'←':'→'}</span>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════ */
function Navbar({ cart, onCart, lang, toggleLang, onSearch }) {
  const [scrolled, setScrolled] = useState(false)
  const ar = lang === 'ar'
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navBg = scrolled ? 'rgba(10,9,8,0.97)' : 'rgba(10,9,8,0.7)'

  return (
    <nav style={{ position:'fixed', top:0, insetInline:0, zIndex:1000, backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', background:navBg, borderBottom:scrolled?`1px solid ${C.border}`:'1px solid transparent', transition:'all .4s ease', direction:ar?'rtl':'ltr' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:scrolled?'14px 40px':'20px 40px', transition:'padding .4s' }}>
        {/* Logo */}
        <a href="#top" style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ position:'relative' }}>
            <span style={{ fontFamily:C.serif, fontSize:'2.2rem', fontWeight:'700', color:C.gold, letterSpacing:'0.12em', lineHeight:1 }}>TQ</span>
            <div style={{ position:'absolute', bottom:'-3px', left:0, right:0, height:'2px', background:`linear-gradient(90deg, ${C.gold}, ${C.gold2}, ${C.gold})` }}/>
          </div>
          <div style={{ width:'1px', height:'32px', background:C.border }}/>
          <div>
            <div style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'11px', fontWeight:'600', color:C.gray1, letterSpacing:ar?0:'0.2em', textTransform:ar?'none':'uppercase', lineHeight:1.2 }}>{ar?'متجر الساعات الفاخرة':'Luxury Watch Store'}</div>
            <div style={{ fontSize:'10px', color:C.gold3, fontFamily:ar?C.arabic:C.sans, marginTop:'2px' }}>{ar?'اختر ساعتك المثالية':'Find Your Perfect Watch'}</div>
          </div>
        </a>

        {/* Nav links */}
        <div style={{ display:'flex', gap:'32px', alignItems:'center' }}>
          {[
            {en:'Collections', ar:'المجموعة',  href:'#collections'},
            {en:'Deals',       ar:'العروض',     href:'#deals'},
            {en:'Find My Watch',ar:'ساعتك المثالية',href:'#finder'},
            {en:'Why TQ',      ar:'لماذا TQ',  href:'#why'},
          ].map(l=>(
            <a key={l.en} href={l.href}
              style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'13px', fontWeight:'500', color:C.gray2, letterSpacing:ar?0:'0.06em', transition:'color .3s', textTransform:ar?'none':'uppercase' }}
              onMouseEnter={e=>e.target.style.color=C.gold2}
              onMouseLeave={e=>e.target.style.color=C.gray2}>
              {ar?l.ar:l.en}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          {/* Search */}
          <button onClick={onSearch}
            style={{ display:'flex', alignItems:'center', gap:'8px', padding:'8px 16px', border:`1px solid ${C.border}`, borderRadius:'8px', color:C.gray2, fontFamily:ar?C.arabic:C.sans, fontSize:'13px', transition:'all .3s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2}}>
            <span>🔍</span>
            <span>{ar?'بحث':'Search'}</span>
          </button>
          {/* Lang */}
          <button onClick={toggleLang}
            style={{ padding:'8px 14px', border:`1px solid ${C.border}`, borderRadius:'8px', fontFamily:ar?C.arabic:C.sans, fontSize:'12px', fontWeight:'600', color:C.gray1, transition:'all .3s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray1}}>
            {ar?'EN':'عربي'}
          </button>
          {/* Cart */}
          <button onClick={onCart}
            style={{ display:'flex', alignItems:'center', gap:'8px', padding:'9px 20px', background:`linear-gradient(135deg, ${C.gold3}, ${C.gold})`, borderRadius:'8px', fontFamily:ar?C.arabic:C.sans, fontSize:'13px', fontWeight:'700', color:C.bg, position:'relative', transition:'all .3s' }}
            onMouseEnter={e=>e.currentTarget.style.opacity='.85'}
            onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
            <span>🛍</span>
            <span>{ar?'طلباتي':'My Order'}</span>
            {cart.length > 0 && (
              <span style={{ position:'absolute', top:'-7px', [ar?'left':'right']:'-7px', background:C.red, color:'#fff', width:'20px', height:'20px', borderRadius:'50%', fontSize:'11px', fontWeight:'700', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

/* ═══════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════ */
function Hero({ ar }) {
  const [vis, setVis] = useState(false)
  useEffect(()=>{ const t=setTimeout(()=>setVis(true),120); return()=>clearTimeout(t) },[])

  return (
    <section id="top" style={{ minHeight:'100vh', background:`radial-gradient(ellipse at 70% 50%, rgba(212,170,80,0.07) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(212,170,80,0.04) 0%, transparent 50%), ${C.bg}`, display:'grid', gridTemplateColumns:'1fr 1fr', alignItems:'center', padding:'0 60px', gap:'40px', overflow:'hidden', direction:ar?'rtl':'ltr', position:'relative' }}>
      {/* Grid overlay */}
      <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${C.gold}08 1px,transparent 1px),linear-gradient(90deg,${C.gold}08 1px,transparent 1px)`, backgroundSize:'50px 50px', pointerEvents:'none' }}/>

      {/* Left */}
      <div style={{ position:'relative', zIndex:1, opacity:vis?1:0, transform:vis?'none':'translateY(32px)', transition:'opacity .9s ease, transform .9s ease' }}>
        {/* Badge */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', border:`1px solid ${C.gold}50`, borderRadius:'100px', marginBottom:'28px', background:`${C.gold}10` }}>
          <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:C.green, boxShadow:`0 0 0 3px ${C.green}33`, animation:'pulse-ring 1.5s infinite' }}/>
          <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', fontWeight:'600', color:C.gold, letterSpacing:ar?0:'0.12em', textTransform:ar?'none':'uppercase' }}>
            {ar?'🟢 متاح الآن — مجموعة 2026':'🟢 Available Now — 2026 Collection'}
          </span>
        </div>

        <h1 style={{ fontFamily:C.serif, fontSize:'clamp(2.8rem,5vw,5.2rem)', fontWeight:'700', lineHeight:1.08, color:C.white, marginBottom:'20px', letterSpacing:'-0.02em' }}>
          {ar?(
            <><span style={{ fontStyle:'italic', color:C.gold }}>ساعات</span>{' '}استثنائية<br/>لأصحاب الذوق الرفيع</>
          ):(
            <>Exceptional<br/><span style={{ fontStyle:'italic', color:C.gold }}>Timepieces</span><br/>For Discerning Taste</>
          )}
        </h1>

        <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'16px', color:C.gray2, lineHeight:1.8, maxWidth:'420px', marginBottom:'36px', fontWeight:'400' }}>
  {ar
    ? 'اكتشف مجموعة مميزة من الساعات الأنيقة بعناية وجودة عالية تناسب جميع الأذواق.'
    : 'Discover a curated collection of stylish, high-quality watches crafted to suit every taste.'
}        </p>

        {/* CTA buttons */}
        <div style={{ display:'flex', gap:'12px', alignItems:'center', flexWrap:'wrap', flexDirection:ar?'row-reverse':'row', justifyContent:ar?'flex-end':'flex-start' }}>
          <a href="#collections">
            <button style={{ padding:'14px 32px', background:`linear-gradient(135deg, ${C.gold3}, ${C.gold}, ${C.gold2})`, color:C.bg, fontFamily:ar?C.arabic:C.sans, fontSize:'14px', fontWeight:'700', letterSpacing:ar?0:'0.08em', borderRadius:'4px', textTransform:ar?'none':'uppercase', boxShadow:`0 8px 32px ${C.gold}40`, transition:'all .3s' }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 12px 40px ${C.gold}60`}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 8px 32px ${C.gold}40`}}>
              {ar?'🛍 تصفح المجموعة':'🛍 Shop Collection'}
            </button>
          </a>
          <a href="#cho">
            <button style={{ padding:'14px 28px', border:`1px solid ${C.border}`, color:C.gray1, fontFamily:ar?C.arabic:C.sans, fontSize:'14px', fontWeight:'500', borderRadius:'4px', transition:'all .3s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray1}}>
              {ar?'💎 الحصري':'💎 Exclusives'}
            </button>
          </a>
        </div>

      </div>

      {/* Right — clock */}
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', position:'relative', opacity:vis?1:0, transform:vis?'none':'scale(.88)', transition:'opacity 1.2s ease .3s, transform 1.2s ease .3s' }}>
        <div style={{ position:'absolute', width:'500px', height:'500px', background:`radial-gradient(circle, ${C.gold}0d 0%, transparent 70%)`, borderRadius:'50%', pointerEvents:'none' }}/>
        <LiveClock size={420}/>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   WATCH CARD
═══════════════════════════════════════════════ */
function WatchCard({ w, ar, onClick, onAdd, addedId, cartItems }) {
  const [hov, setHov] = useState(false)
  const bs = BADGE_STYLE[w.badge] || {}
  const added = addedId === w.id
  const inCart = cartItems?.some(c => c.id === w.id)

  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:hov?C.card2:C.card, border:`1px solid ${hov?C.borderHover:C.border}`, borderRadius:'12px', overflow:'hidden', transition:'all .35s cubic-bezier(.25,.46,.45,.94)', transform:hov?'translateY(-6px)':'none', boxShadow:hov?`0 20px 60px rgba(0,0,0,.6), 0 0 0 1px ${C.gold}20`:'0 4px 20px rgba(0,0,0,.3)', cursor:'pointer', display:'flex', flexDirection:'column', direction:ar?'rtl':'ltr' }}>

      {/* Image area — 4:5 ratio */}
      <div onClick={()=>onClick(w)} style={{ position:'relative', width:'100%', paddingBottom:'125%' /* 4:5 = 125% */ }}>
        {/* Background */}
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 50% 35%, ${C.card2} 0%, ${C.bg} 100%)` }}/>

        {/* Badge */}
        <div style={{ position:'absolute', top:'12px', [ar?'left':'right']:'12px', zIndex:3, padding:'4px 12px', borderRadius:'100px', background:bs.bg||C.gold, color:bs.color||C.bg, fontSize:'11px', fontWeight:'700', fontFamily:ar?C.arabic:C.sans, boxShadow:'0 2px 8px rgba(0,0,0,.4)' }}>
          {ar?w.badgeAr:w.badge.toUpperCase()}
        </div>
        {/* Discount */}
        {w.discount>0 && (
          <div style={{ position:'absolute', top:'12px', [ar?'right':'left']:'12px', zIndex:3, background:C.red, color:'#fff', fontSize:'11px', fontWeight:'700', padding:'4px 10px', borderRadius:'4px', fontFamily:ar?C.arabic:C.sans }}>
            -{w.discount}%
          </div>
        )}

        {/* Watch image — centered inside 4:5 box */}
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
          <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', transform:hov?'scale(1.07)':'scale(1)', transition:'transform .45s ease' }}>
            {w.img
              ? <img src={w.img} alt={ar?w.nameAr:w.name}
                  style={{ maxWidth:'85%', maxHeight:'85%', width:'auto', height:'auto', objectFit:'contain', objectPosition:'center', filter:'drop-shadow(0 16px 36px rgba(0,0,0,.65))' }}/>
              : <MiniWatch w={w} size={190}/>
            }
          </div>
        </div>

        {/* Wishlist */}
        {/* <button
          onClick={e=>e.stopPropagation()}
          style={{ position:'absolute', bottom:'12px', [ar?'left':'right']:'12px', zIndex:3, width:'32px', height:'32px', borderRadius:'50%', border:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', background:C.bg+'cc', backdropFilter:'blur(4px)', transition:'all .3s' }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=C.red;e.currentTarget.style.background=C.red+'33'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.bg+'cc'}}>
          🤍
        </button> */}

        {/* In-cart indicator */}
        {inCart && (
          <div style={{ position:'absolute', bottom:'12px', [ar?'right':'left']:'12px', zIndex:3, background:C.green, color:'#fff', fontSize:'10px', fontWeight:'700', padding:'3px 9px', borderRadius:'100px', fontFamily:ar?C.arabic:C.sans }}>
            {ar?'في السلة':'In Cart'}
          </div>
        )}
      </div>

      {/* Info */}
      <div onClick={()=>onClick(w)} style={{ padding:'18px 18px 0', flex:1 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px', flexDirection:ar?'row-reverse':'row' }}>
          <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'11px', fontWeight:'700', color:C.gold3, textTransform:ar?'none':'uppercase', letterSpacing:ar?0:'0.1em' }}>{w.brand}</span>
          <span style={{ fontFamily:C.sans, fontSize:'10px', color:C.gray3 }}>{(w.model || "").slice(0,14) || "نموذج"}</span>
        </div>
        <h3 style={{ fontFamily:C.serif, fontSize:'1.2rem', fontWeight:'600', color:C.white, marginBottom:'7px', lineHeight:1.2 }}>{ar?w.nameAr:w.name}</h3>
        <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'13px', color:C.gray2, lineHeight:1.6, marginBottom:'12px' }}>
{((ar ? w.descAr : w.desc) || "وصف").slice(0,85)}…
        </p>
        <div style={{ display:'flex', gap:'5px', flexWrap:'wrap', marginBottom:'14px', flexDirection:ar?'row-reverse':'row' }}>
          {[w.caseMM || "?", (w.movement || "").split(' ')[0] || "?", (w.wr || "?") + ' WR'].map(f=>(
            <span key={f} style={{ padding:'3px 9px', border:`1px solid ${C.border}`, borderRadius:'100px', fontSize:'10px', color:C.gray3, fontFamily:C.sans }}>{f}</span>
          ))}
        </div>
      </div>

      {/* Price + CTA */}
      <div style={{ padding:'14px 18px 18px', borderTop:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:ar?'row-reverse':'row' }}>
        <div style={{ textAlign:ar?'right':'left' }}>
          <div style={{ fontFamily:C.sans, fontSize:'19px', fontWeight:'700', color:C.gold, lineHeight:1 }}>{fmtPrice(w.price)}</div>
          {w.discount>0 && <div style={{ fontFamily:C.sans, fontSize:'11px', color:C.gray3, textDecoration:'line-through', marginTop:'2px' }}>{fmtPrice(w.original)}</div>}
        </div>
        <div style={{ display:'flex', gap:'7px' }}>
          <button
            onClick={e=>{e.stopPropagation();onAdd(w)}}
            style={{ padding:'9px 16px', background: inCart ? C.card2 : added?C.green:`linear-gradient(135deg,${C.gold3},${C.gold})`, color:added||inCart?C.gold:'#0a0908', fontFamily:ar?C.arabic:C.sans, fontSize:'12px', fontWeight:'700', borderRadius:'6px', transition:'all .3s', border: inCart?`1px solid ${C.gold}`:' none', boxShadow:added?`0 4px 15px ${C.green}40`:`0 4px 15px ${C.gold}30` }}>
            {inCart?(ar?'✓ بالسلة':'✓ In Cart'):added?(ar?'✓ أُضيف':'✓ Added'):(ar?'+ سلة':'+ Cart')}
          </button>
          <button
            onClick={e=>{e.stopPropagation();onClick(w)}}
            style={{ width:'36px', height:'36px', border:`1px solid ${C.border}`, borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', color:C.gray2, transition:'all .3s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2}}>
            👁
          </button>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   COLLECTIONS SECTION
═══════════════════════════════════════════════ */
function Collections({ ar, onWatch, onAdd, addedId, cartItems }) {
  const [ref, vis] = useInView()

  return (
    <section id="collections" ref={ref} style={{ padding:'100px 60px', background:C.bg2, direction:ar?'rtl':'ltr' }}>
      {/* Header */}
      <div style={{ textAlign:'center', marginBottom:'60px', opacity:vis?1:0, transform:vis?'none':'translateY(20px)', transition:'opacity .7s, transform .7s' }}>
        <div style={{ display:'inline-block', padding:'6px 20px', border:`1px solid ${C.gold}40`, borderRadius:'100px', marginBottom:'16px', background:`${C.gold}0a` }}>
          <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', fontWeight:'600', color:C.gold, letterSpacing:ar?0:'0.15em', textTransform:ar?'none':'uppercase' }}>{ar?'🛍 تصفح الكل':'🛍 Browse All'}</span>
        </div>
        <h2 style={{ fontFamily:C.serif, fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:'700', color:C.white, marginBottom:'14px' }}>
          {ar?<>مجموعتنا <span style={{fontStyle:'italic',color:C.gold}}>الحصرية</span></>:<>Our <span style={{fontStyle:'italic',color:C.gold}}>Curated</span> Collection</>}
        </h2>
        <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'16px', color:C.gray2, maxWidth:'520px', margin:'0 auto' }}>
          {ar?'مجموعة مختارة — ساعات كلاسيكية بأرقى مستويات الدقة والأناقة':'A carefully curated selection from the world\'s greatest Swiss houses — classic timepieces of the highest precision and elegance'}
        </p>
      </div>

      {/* Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'24px' }}>
        {WATCHES.map((w,i)=>(
          <div key={w.id} style={{ opacity:vis?1:0, transform:vis?'none':'translateY(24px)', transition:`opacity .6s ease ${i*0.06}s, transform .6s ease ${i*0.06}s` }}>
            <WatchCard w={w} ar={ar} onClick={onWatch} onAdd={onAdd} addedId={addedId} cartItems={cartItems}/>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   WATCH FINDER QUIZ
═══════════════════════════════════════════════ */
function WatchFinder({ ar, onWatch }) {
  const [ref, vis] = useInView()
  const [step, setStep] = useState(0)      // 0=budget 1=style 2=use 3=results
  const [budget, setBudget]   = useState(null)
  const [style,  setStyle]    = useState(null)
  const [use,    setUse]      = useState(null)

  const budgets = [
    { key:'entry',  label:ar?'أقل من 300EGP':'Under 300EGP',    max:300 },
    { key:'mid',    label:ar?'300EGP – 400EGP':'300EGP–400EGP', min:300, max:400 },
    { key:'high',   label:ar?'400EGP – 500EGP':'400EGP–500EGP', min:400, max:500 },
    { key:'ultra',  label:ar?'فوق 500EGP':'Above 500EGP',        min:500 },
  ]
  const styles = [
    { key:'minimal',  label:ar?'بسيط وأنيق':'Minimal & Elegant',    icon:'🖤', cats:['Dress'] },
    { key:'bold',     label:ar?'جريء وعصري':'Bold & Modern',         icon:'⚡', cats:['Sport','Complicated'] },
    { key:'classic',  label:ar?'كلاسيك':'Classic & Timeless',        icon:'👑', cats:['Dress','Complicated'] },
    { key:'sport',    label:ar?'رياضي وعملي':'Sporty & Practical',   icon:'🏄', cats:['Sport','Travel'] },
  ]
  const uses = [
    { key:'daily',   label:ar?'يومي':'Daily Wear',    icon:'☀️' },
    { key:'formal',  label:ar?'مناسبات':'Events',     icon:'🎩' },
    { key:'travel',  label:ar?'سفر وعمل':'Travel',    icon:'✈️' },
    { key:'collect', label:ar?'للاقتناء':'Collecting', icon:'💎' },
  ]

  const getResults = () => {
    let pool = [...WATCHES]
    if (budget) {
      const b = budgets.find(x=>x.key===budget)
      pool = pool.filter(w => (!b.min || w.price >= b.min) && (!b.max || w.price <= b.max))
    }
    if (style) {
      const cats = styles.find(x=>x.key===style)?.cats || []
      const styled = pool.filter(w => cats.includes(w.category))
      if (styled.length > 0) pool = styled
    }
    if (use === 'travel') pool = pool.filter(w => w.category === 'Travel').length > 0 ? pool.filter(w=>w.category==='Travel') : pool
    if (use === 'formal') pool = pool.filter(w => w.category === 'Dress').length > 0 ? pool.filter(w=>w.category==='Dress') : pool
    if (use === 'collect') pool = pool.filter(w=>w.price>30000).length > 0 ? pool.filter(w=>w.price>30000) : pool

    // score: prefer hot + highest discount
    return pool
      .sort((a,b) => (b.hot?2:0) + b.discount - ((a.hot?2:0) + a.discount))
      .slice(0, 3)
  }

  const reset = () => { setStep(0); setBudget(null); setStyle(null); setUse(null) }

  const choiceBtn = (label, icon, selected, onClick) => (
    <button onClick={onClick}
      style={{ padding:'14px 18px', border:`1.5px solid ${selected?C.gold:C.border}`, borderRadius:'10px', background:selected?`${C.gold}18`:C.card, color:selected?C.gold:C.gray2, fontFamily:ar?C.arabic:C.sans, fontSize:'14px', fontWeight:selected?'700':'400', display:'flex', alignItems:'center', gap:'10px', transition:'all .25s', textAlign:ar?'right':'left', flexDirection:ar?'row-reverse':'row', boxShadow:selected?`0 0 0 1px ${C.gold}40,0 4px 20px ${C.gold}20`:'' }}
      onMouseEnter={e=>{ if(!selected){e.currentTarget.style.borderColor=C.borderHover;e.currentTarget.style.color=C.gray1} }}
      onMouseLeave={e=>{ if(!selected){e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2} }}>
      <span style={{ fontSize:'22px' }}>{icon}</span>
      <span>{label}</span>
      {selected && <span style={{ marginLeft:ar?0:'auto', marginRight:ar?'auto':0, color:C.gold, fontSize:'16px' }}>✓</span>}
    </button>
  )

  const results = step === 3 ? getResults() : []

  return (
    <section id="finder" ref={ref} style={{ padding:'100px 60px', background:`linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)`, direction:ar?'rtl':'ltr', position:'relative', overflow:'hidden' }}>
      {/* Bg glow */}
      <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translateX(-50%)', width:'700px', height:'700px', background:`radial-gradient(circle, ${C.gold}07 0%, transparent 70%)`, borderRadius:'50%', pointerEvents:'none' }}/>

      {/* Header */}
      <div id='cho' style={{ textAlign:'center', marginBottom:'56px', opacity:vis?1:0, transform:vis?'none':'translateY(20px)', transition:'opacity .7s, transform .7s' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'7px 20px', border:`1px solid ${C.gold}40`, borderRadius:'100px', marginBottom:'16px', background:`${C.gold}0a` }}>
          <span style={{ fontSize:'16px' }}>🎯</span>
          <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', fontWeight:'700', color:C.gold, letterSpacing:ar?0:'0.15em', textTransform:ar?'none':'uppercase' }}>
            {ar ? 'اكتشف ساعتك' : 'Watch Finder'}
          </span>
        </div>
        <h2  style={{ fontFamily:C.serif, fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:'700', color:C.white, marginBottom:'14px' }}>
          {ar
            ? <> <span style={{fontStyle:'italic',color:C.gold}}>الساعة المثالية</span> تنتظرك</>
            : <>Find Your <span style={{fontStyle:'italic',color:C.gold}}>Perfect Watch</span></>
          }
        </h2>
        <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'16px', color:C.gray2, maxWidth:'460px', margin:'0 auto' }}>
          {ar ? '3 أسئلة بس وهنلاقيلك الساعة اللي تناسبك تماماً' : 'Answer 3 quick questions and we\'ll find your perfect match'}
        </p>
      </div>

      {/* Quiz card */}
      <div style={{ maxWidth:'680px', margin:'0 auto', background:C.card, border:`1px solid ${C.border}`, borderRadius:'20px', overflow:'hidden', opacity:vis?1:0, transition:'opacity .7s .2s', boxShadow:`0 20px 60px rgba(0,0,0,.4)` }}>

        {/* Progress bar */}
        {step < 3 && (
          <div style={{ height:'4px', background:C.bg2 }}>
            <div style={{ height:'100%', width:`${((step+1)/3)*100}%`, background:`linear-gradient(90deg, ${C.gold3}, ${C.gold2})`, transition:'width .5s ease', borderRadius:'2px' }}/>
          </div>
        )}

        <div style={{ padding:'36px 40px' }}>

          {/* STEP 0 — Budget */}
          {step === 0 && (
            <>
              <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.gold, textTransform:ar?'none':'uppercase', letterSpacing:ar?0:'0.12em', marginBottom:'8px' }}>
                {ar?'السؤال 1 من 3':'Step 1 of 3'}
              </p>
              <h3 style={{ fontFamily:C.serif, fontSize:'1.7rem', fontWeight:'700', color:C.white, marginBottom:'28px' }}>
                {ar ? 'ما هي ميزانيتك؟' : 'What\'s your budget?'}
              </h3>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'28px' }}>
                {budgets.map(b => choiceBtn(b.label, '💰', budget===b.key, ()=>setBudget(b.key)))}
              </div>
              <button onClick={()=>{ if(budget) setStep(1) }}
                disabled={!budget}
                style={{ width:'100%', padding:'14px', background:budget?`linear-gradient(135deg,${C.gold3},${C.gold})`:C.card2, color:budget?C.bg:C.gray3, fontFamily:ar?C.arabic:C.sans, fontSize:'15px', fontWeight:'700', borderRadius:'10px', transition:'all .3s', cursor:budget?'pointer':'not-allowed' }}>
                {ar ? 'التالي ←' : 'Next →'}
              </button>
            </>
          )}

          {/* STEP 1 — Style */}
          {step === 1 && (
            <>
              <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.gold, textTransform:ar?'none':'uppercase', letterSpacing:ar?0:'0.12em', marginBottom:'8px' }}>
                {ar?'السؤال 2 من 3':'Step 2 of 3'}
              </p>
              <h3 style={{ fontFamily:C.serif, fontSize:'1.7rem', fontWeight:'700', color:C.white, marginBottom:'28px' }}>
                {ar ? 'إيه أسلوبك؟' : 'What\'s your style?'}
              </h3>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'28px' }}>
                {styles.map(s => choiceBtn(s.label, s.icon, style===s.key, ()=>setStyle(s.key)))}
              </div>
              <div style={{ display:'flex', gap:'10px' }}>
                <button onClick={()=>setStep(0)} style={{ flex:1, padding:'13px', border:`1px solid ${C.border}`, borderRadius:'10px', color:C.gray2, fontFamily:ar?C.arabic:C.sans, fontSize:'14px', transition:'all .3s' }}>
                  {ar?'← رجوع':'← Back'}
                </button>
                <button onClick={()=>{ if(style) setStep(2) }} disabled={!style}
                  style={{ flex:2, padding:'13px', background:style?`linear-gradient(135deg,${C.gold3},${C.gold})`:C.card2, color:style?C.bg:C.gray3, fontFamily:ar?C.arabic:C.sans, fontSize:'15px', fontWeight:'700', borderRadius:'10px', transition:'all .3s', cursor:style?'pointer':'not-allowed' }}>
                  {ar?'التالي ←':'Next →'}
                </button>
              </div>
            </>
          )}

          {/* STEP 2 — Use */}
          {step === 2 && (
            <>
              <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.gold, textTransform:ar?'none':'uppercase', letterSpacing:ar?0:'0.12em', marginBottom:'8px' }}>
                {ar?'السؤال 3 من 3':'Step 3 of 3'}
              </p>
              <h3 style={{ fontFamily:C.serif, fontSize:'1.7rem', fontWeight:'700', color:C.white, marginBottom:'28px' }}>
                {ar ? 'هتستخدم الساعة إزاي؟' : 'How will you wear it?'}
              </h3>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'28px' }}>
                {uses.map(u => choiceBtn(u.label, u.icon, use===u.key, ()=>setUse(u.key)))}
              </div>
              <div style={{ display:'flex', gap:'10px' }}>
                <button onClick={()=>setStep(1)} style={{ flex:1, padding:'13px', border:`1px solid ${C.border}`, borderRadius:'10px', color:C.gray2, fontFamily:ar?C.arabic:C.sans, fontSize:'14px', transition:'all .3s' }}>
                  {ar?'← رجوع':'← Back'}
                </button>
                <button onClick={()=>{ if(use) setStep(3) }} disabled={!use}
                  style={{ flex:2, padding:'13px', background:use?`linear-gradient(135deg,${C.gold3},${C.gold})`:C.card2, color:use?C.bg:C.gray3, fontFamily:ar?C.arabic:C.sans, fontSize:'15px', fontWeight:'700', borderRadius:'10px', transition:'all .3s', cursor:use?'pointer':'not-allowed' }}>
                  {ar?'🎯 اعرض ساعاتي المقترحة':'🎯 Show My Matches'}
                </button>
              </div>
            </>
          )}

          {/* STEP 3 — Results */}
          {step === 3 && (
            <>
              <div style={{ textAlign:'center', marginBottom:'28px' }}>
                <div style={{ fontSize:'2.5rem', marginBottom:'10px' }}>🎯</div>
                <h3 style={{ fontFamily:C.serif, fontSize:'1.6rem', fontWeight:'700', color:C.white, marginBottom:'8px' }}>
                  {ar ? 'الساعات المناسبة لك' : 'Your Perfect Matches'}
                </h3>
                <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'14px', color:C.gray2 }}>
                  {ar
                    ? `بناءً على ميزانيتك وذوقك، دي أفضل ${results.length} ساعات ليك`
                    : `Based on your preferences, here are your top ${results.length} matches`
                  }
                </p>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'28px' }}>
                {results.length === 0 ? (
                  <div style={{ textAlign:'center', padding:'30px', color:C.gray2, fontFamily:ar?C.arabic:C.sans }}>
                    {ar?'مفيش ساعات في الميزانية دي حالياً — جرّب ميزانية تانية':'No watches in this range currently — try a different budget'}
                  </div>
                ) : results.map((w, idx) => (
                  <button key={w.id} onClick={() => onWatch(w)}
                    style={{ display:'flex', alignItems:'center', gap:'16px', padding:'16px 18px', background:C.card2, border:`1px solid ${idx===0?C.gold:C.border}`, borderRadius:'12px', transition:'all .25s', textAlign:ar?'right':'left', flexDirection:ar?'row-reverse':'row', position:'relative', overflow:'hidden' }}
                    onMouseEnter={e=>{e.currentTarget.style.background=C.bg2;e.currentTarget.style.borderColor=C.gold}}
                    onMouseLeave={e=>{e.currentTarget.style.background=C.card2;e.currentTarget.style.borderColor=idx===0?C.gold:C.border}}>
                    {idx === 0 && (
                      <div style={{ position:'absolute', top:'8px', [ar?'left':'right']:'12px', padding:'3px 10px', background:`linear-gradient(135deg,${C.gold3},${C.gold})`, borderRadius:'100px', fontSize:'11px', fontWeight:'700', color:C.bg, fontFamily:ar?C.arabic:C.sans }}>
                        {ar?'⭐ الأنسب ليك':'⭐ Best Match'}
                      </div>
                    )}
                    <div style={{ width:'70px', height:'70px', background:C.bg, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${C.border}` }}>
                      <MiniWatch w={w} size={65}/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'11px', color:C.gold3, fontWeight:'700', marginBottom:'3px' }}>{w.brand}</div>
                      <div style={{ fontFamily:C.serif, fontSize:'16px', fontWeight:'700', color:C.white, marginBottom:'4px' }}>{ar?w.nameAr:w.name}</div>
                      <div style={{ display:'flex', gap:'8px', alignItems:'center', flexDirection:ar?'row-reverse':'row' }}>
                        <span style={{ fontFamily:C.sans, fontSize:'16px', fontWeight:'700', color:C.gold }}>${w.price.toLocaleString()}</span>
                        {w.discount > 0 && <span style={{ fontSize:'12px', color:C.red, fontWeight:'700' }}>-{w.discount}%</span>}
                        <span style={{ fontSize:'12px', color:C.gray3 }}>{ar?w.categoryAr:w.category}</span>
                      </div>
                    </div>
                    <span style={{ color:C.gold, fontSize:'20px', flexShrink:0 }}>{ar?'←':'→'}</span>
                  </button>
                ))}
              </div>

              <button onClick={reset}
                style={{ width:'100%', padding:'13px', border:`1px solid ${C.border}`, borderRadius:'10px', color:C.gray2, fontFamily:ar?C.arabic:C.sans, fontSize:'14px', fontWeight:'500', transition:'all .3s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2}}>
                🔄 {ar?'ابدأ من جديد':'Start Over'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   DEALS / DISCOUNT SECTION
═══════════════════════════════════════════════ */
function DealsSection({ ar, onWatch, onAdd, addedId, cartItems }) {
  const [ref, vis] = useInView()
  const [time, setTime] = useState({ h:23, m:59, s:59 })
  useEffect(()=>{
    const t = setInterval(()=>setTime(prev=>{
      let {h,m,s}=prev; s--
      if(s<0){s=59;m--} if(m<0){m=59;h--} if(h<0){h=23;m=59;s=59}
      return {h,m,s}
    }),1000)
    return ()=>clearInterval(t)
  },[])
  const pad = n=>String(n).padStart(2,'0')
  const deals = WATCHES.filter(w=>w.badge==='deal'||w.discount>=10)

  return (
    <section id="deals" ref={ref} style={{ padding:'100px 60px', background:`linear-gradient(180deg, ${C.bg2} 0%, ${C.bg} 100%)`, direction:ar?'rtl':'ltr' }}>
      {/* Header with timer */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'48px', flexDirection:ar?'row-reverse':'row', flexWrap:'wrap', gap:'24px', opacity:vis?1:0, transition:'opacity .7s' }}>
        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'5px 16px', border:`1px solid ${C.red}50`, borderRadius:'100px', marginBottom:'14px', background:`${C.red}12` }}>
            <span style={{ fontSize:'16px', animation:'pulse-ring 1s infinite' }}>🔥</span>
            <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', fontWeight:'700', color:C.red, letterSpacing:ar?0:'0.15em', textTransform:ar?'none':'uppercase' }}>{ar?'عروض محدودة':'Limited Time Deals'}</span>
          </div>
          <h2 style={{ fontFamily:C.serif, fontSize:'clamp(1.8rem,3.5vw,3rem)', fontWeight:'700', color:C.white }}>
            {ar?<>عروض <span style={{fontStyle:'italic',color:C.red}}>حصرية</span> الآن</>:<>Exclusive <span style={{fontStyle:'italic',color:C.red}}>Deals</span> Live Now</>}
          </h2>
          <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'15px', color:C.gray2, marginTop:'10px' }}>
            {ar?`خصم يصل إلى ${Math.max(...deals.map(w=>w.discount))}% على قطع مختارة — لفترة محدودة`:`Up to ${Math.max(...deals.map(w=>w.discount))}% off on selected pieces — for a limited time`}
          </p>
        </div>
        {/* Countdown */}
        {/* <div style={{ textAlign:'center' }}>
          <div style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.gray3, marginBottom:'10px', textTransform:ar?'none':'uppercase', letterSpacing:ar?0:'0.1em' }}>{ar?'⏱ ينتهي العرض خلال':'⏱ Offer Ends In'}</div>
          <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
            {[{v:pad(time.h),l:ar?'ساعة':'HRS'},{v:pad(time.m),l:ar?'دقيقة':'MIN'},{v:pad(time.s),l:ar?'ثانية':'SEC'}].map((seg,i)=>(
              <div key={seg.l} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                {i>0 && <span style={{color:C.red,fontWeight:'700',fontSize:'20px',lineHeight:1}}>:</span>}
                <div style={{ background:C.card2, border:`1px solid ${C.red}40`, borderRadius:'8px', padding:'10px 14px', textAlign:'center', minWidth:'60px' }}>
                  <div style={{ fontFamily:C.sans, fontSize:'22px', fontWeight:'700', color:C.red, lineHeight:1 }}>{seg.v}</div>
                  <div style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'10px', color:C.gray3, marginTop:'3px' }}>{seg.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'24px' }}>
        {deals.map((w,i)=>(
          <div key={w.id} style={{ opacity:vis?1:0, transform:vis?'none':'translateY(24px)', transition:`opacity .6s ease ${i*.07}s, transform .6s ease ${i*.07}s` }}>
            <WatchCard w={w} ar={ar} onClick={onWatch} onAdd={onAdd} addedId={addedId} cartItems={cartItems}/>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   HOT / MOST WANTED SECTION
═══════════════════════════════════════════════ */
function HotSection({ ar, onWatch, onAdd, addedId, cartItems }) {
  const [ref, vis] = useInView()
  const hot = WATCHES.filter(w=>w.hot)

  return (
    <section id="hot" ref={ref} style={{ padding:'100px 60px', background:C.bg2, direction:ar?'rtl':'ltr' }}>
      <div style={{ textAlign:'center', marginBottom:'52px', opacity:vis?1:0, transition:'opacity .7s' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'5px 16px', border:`1px solid ${C.gold}40`, borderRadius:'100px', marginBottom:'14px', background:`${C.gold}0a` }}>
          <span style={{ fontSize:'16px' }}>⚡</span>
          <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', fontWeight:'700', color:C.gold, letterSpacing:ar?0:'0.15em', textTransform:ar?'none':'uppercase' }}>{ar?'الأكثر طلباً':'Most Wanted'}</span>
        </div>
        <h2 style={{ fontFamily:C.serif, fontSize:'clamp(1.8rem,3.5vw,3rem)', fontWeight:'700', color:C.white, marginBottom:'12px' }}>
          {ar?<>الساعات <span style={{fontStyle:'italic',color:C.gold}}>الأكثر طلباً</span></>:<>The <span style={{fontStyle:'italic',color:C.gold}}>Most Wanted</span> Watches</>}
        </h2>
        <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'15px', color:C.gray2 }}>
          {ar?'الساعات الأكثر مبيعاً وطلباً من عملائنا':'Our best-selling and most requested pieces from our clients'}
        </p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'24px' }}>
        {hot.map((w,i)=>(
          <div key={w.id} style={{ opacity:vis?1:0, transform:vis?'none':'translateY(22px)', transition:`opacity .55s ease ${i*.08}s, transform .55s ease ${i*.08}s` }}>
            <WatchCard w={w} ar={ar} onClick={onWatch} onAdd={onAdd} addedId={addedId} cartItems={cartItems}/>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   WHY TQ
═══════════════════════════════════════════════ */
function WhyTQ({ ar }) {
  const [ref, vis] = useInView()

  const items = [
    { icon:'💱', en:'Easy Trade-In', ar:'استبدال سهل', enD:'Trade your current watch toward a new one. Fair valuations, simple process, zero hassle.', arD:'استبدل ساعتك الحالية بساعة جديدة بتقييم عادل وعملية بسيطة وبدون تعقيدات.' },
    { icon:'📦', en:'Premium Packaging', ar:'تغليف فاخر', enD:'Every order ships in a premium presentation box that reflects the quality of what\'s inside.', arD:'كل طلب يُشحن في علبة عرض فاخرة تعكس قيمة ما بداخلها.' },
    { icon:'💬', en:'Personal Consultation', ar:'استشارة شخصية', enD:'Not sure which watch suits you? Our team will guide you to the perfect choice for your wrist.', arD:'مش عارف أنسب ساعة ليك؟ فريقنا هيساعدك تلاقي الاختيار المثالي لمعصمك.' },
    { icon:'🔄', en:'Easy Returns', ar:'إرجاع سهل', enD:'Changed your mind? No problem. Simple return process within 7 days of receiving your order.', arD:'غيّرت رأيك؟ لا مشكلة. عملية إرجاع بسيطة خلال 7 أيام من استلام طلبك.' },
  ]

  return (
    <section id="why" ref={ref} style={{ padding:'100px 60px', background:C.bg, direction:ar?'rtl':'ltr' }}>
      <div style={{ textAlign:'center', marginBottom:'64px', opacity:vis?1:0, transition:'opacity .7s' }}>
        <h2 style={{ fontFamily:C.serif, fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:'700', color:C.white, marginBottom:'14px' }}>
          {ar?<>لماذا تختار <span style={{fontStyle:'italic',color:C.gold}}>TQ؟</span></>:<>Why Choose <span style={{fontStyle:'italic',color:C.gold}}>TQ?</span></>}
        </h2>
        <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'16px', color:C.gray2, maxWidth:'500px', margin:'0 auto' }}>
          {ar?'تجربة تسوق مختلفة — بسيطة، شفافة، ومحترمة لوقتك':'A different shopping experience — simple, transparent, and respectful of your time'}
        </p>
      </div>

      {/* Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'20px' }}>
        {items.map((item,i)=>(
          <div key={item.en} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'32px', opacity:vis?1:0, transform:vis?'none':'translateY(20px)', transition:`opacity .6s ease ${i*.1}s, transform .6s ease ${i*.1}s` }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.borderHover;e.currentTarget.style.background=C.card2}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.card}}>
            <div style={{ fontSize:'2.2rem', marginBottom:'16px' }}>{item.icon}</div>
            <h3 style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'17px', fontWeight:'700', color:C.white, marginBottom:'12px' }}>{ar?item.ar:item.en}</h3>
            <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'14px', color:C.gray2, lineHeight:1.75 }}>{ar?item.arD:item.enD}</p>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div style={{ marginTop:'64px', padding:'48px', background:`linear-gradient(135deg, ${C.card} 0%, ${C.card2} 100%)`, border:`1px solid ${C.border}`, borderRadius:'16px', textAlign:'center', opacity:vis?1:0, transition:'opacity .7s .4s' }}>
        <h3 style={{ fontFamily:C.serif, fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:'700', color:C.white, marginBottom:'12px' }}>
          {ar?<>مهتم بساعة معينة؟ <span style={{color:C.gold,fontStyle:'italic'}}>تواصل معنا</span></>:<>Interested in a specific watch? <span style={{color:C.gold,fontStyle:'italic'}}>Get in Touch</span></>}
        </h3>
        <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'15px', color:C.gray2, marginBottom:'28px', maxWidth:'480px', margin:'0 auto 28px' }}>
          {ar?'فريقنا مستعد للإجابة على كل أسئلتك ومساعدتك في اتخاذ القرار الصح.':'Our team is ready to answer all your questions and help you make the right decision.'}
        </p>
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
          <a href="https://wa.me/201117359755" target="_blank" rel="noreferrer">
            <button style={{ padding:'13px 28px', background:'#25D366', color:'#fff', fontFamily:ar?C.arabic:C.sans, fontSize:'14px', fontWeight:'700', borderRadius:'8px', display:'flex', alignItems:'center', gap:'8px', transition:'opacity .3s' }}
              onMouseEnter={e=>e.currentTarget.style.opacity='.85'}
              onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
  <img src={whatsapp} alt="WhatsApp" style={{ width:'18px', height:'18px' }} />
  <span>{ar ? 'واتساب' : 'WhatsApp'}</span>
</div>
            </button>
          </a>
          <a href="mailto:mikelemel2@gmail.com">
            <button style={{ padding:'13px 28px', border:`1px solid ${C.border}`, color:C.gray1, fontFamily:ar?C.arabic:C.sans, fontSize:'14px', fontWeight:'500', borderRadius:'8px', transition:'all .3s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray1}}>
              📧 {ar?'إيميل':'Email'}
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   WATCH DETAIL PAGE
═══════════════════════════════════════════════ */
function WatchDetailPage({ w, ar, onBack, onAdd, addedId }) {
  const [tab, setTab] = useState('overview')
  const bs = BADGE_STYLE[w.badge]||{}
  const added = addedId===w.id

  return (
    <div style={{ minHeight:'100vh', background:C.bg, paddingTop:'85px', direction:ar?'rtl':'ltr' }}>
      {/* Breadcrumb */}
      <div style={{ padding:'16px 60px', borderBottom:`1px solid ${C.border}`, background:C.bg2, display:'flex', alignItems:'center', gap:'8px', direction:ar?'rtl':'ltr' }}>
        <button onClick={onBack} style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'13px', color:C.gray2, display:'flex', alignItems:'center', gap:'6px', transition:'color .3s' }}
          onMouseEnter={e=>e.currentTarget.style.color=C.gold}
          onMouseLeave={e=>e.currentTarget.style.color=C.gray2}>
          {ar?'→':'←'} {ar?'العودة للمجموعة':'Back to Collection'}
        </button>
        <span style={{color:C.gray3}}>·</span>
        <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'13px', color:C.gray3 }}>{w.brand}</span>
        <span style={{color:C.gray3}}>·</span>
        <span style={{ fontFamily:C.serif, fontSize:'13px', color:C.gold }}>{ar?w.nameAr:w.name}</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'calc(100vh - 130px)', maxWidth:'1400px', margin:'0 auto', padding:'0 60px' }}>
        {/* Left */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'60px 40px', position:'sticky', top:'85px', height:'calc(100vh - 85px)' }}>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', inset:'-60px', background:`radial-gradient(circle, ${C.gold}0d 0%, transparent 70%)`, borderRadius:'50%', pointerEvents:'none' }}/>
            {w.img
              ? <img src={w.img} alt={ar?w.nameAr:w.name} style={{ width:'380px', height:'380px', objectFit:'contain', filter:'drop-shadow(0 30px 80px rgba(0,0,0,.7))', position:'relative', zIndex:1 }}/>
              : <div style={{ position:'relative', zIndex:1 }}><MiniWatch w={w} size={380}/></div>
            }
            {/* Badge */}
            <div style={{ position:'absolute', top:'-10px', [ar?'left':'right']:'-10px', padding:'6px 16px', borderRadius:'100px', background:bs.bg||C.gold, color:bs.color||C.bg, fontSize:'12px', fontWeight:'700', fontFamily:ar?C.arabic:C.sans, zIndex:2, boxShadow:'0 4px 16px rgba(0,0,0,.5)' }}>
              {ar?w.badgeAr:w.badge.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ padding:'60px 20px 60px 40px', overflowY:'auto' }}>
          <div style={{ display:'flex', gap:'8px', marginBottom:'14px', flexWrap:'wrap', flexDirection:ar?'row-reverse':'row' }}>
            <span style={{ padding:'4px 14px', border:`1px solid ${C.border}`, borderRadius:'100px', fontSize:'12px', color:C.gold, fontFamily:ar?C.arabic:C.sans, fontWeight:'600' }}>{ar?w.categoryAr:w.category}</span>
            <span style={{ padding:'4px 14px', border:`1px solid ${C.border}`, borderRadius:'100px', fontSize:'12px', color:C.gray2, fontFamily:C.sans }}>{w.condition} · {w.year}</span>
            {w.discount>0 && <span style={{ padding:'4px 14px', borderRadius:'100px', background:C.red, color:'#fff', fontSize:'12px', fontWeight:'700', fontFamily:C.sans }}>-{w.discount}%</span>}
          </div>

          <div style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'13px', fontWeight:'700', color:C.gold3, letterSpacing:ar?0:'0.12em', textTransform:ar?'none':'uppercase', marginBottom:'8px' }}>{w.brand}</div>
          <h1 style={{ fontFamily:C.serif, fontSize:'clamp(2rem,3.5vw,2.8rem)', fontWeight:'700', color:C.white, lineHeight:1.15, marginBottom:'6px' }}>{ar?w.nameAr:w.name}</h1>
          <div style={{ fontFamily:C.sans, fontSize:'13px', color:C.gray3, marginBottom:'24px' }}>{w.model}</div>

          <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'16px', color:C.gray1, lineHeight:1.85, marginBottom:'28px' }}>{ar?w.descAr:w.desc}</p>

          {/* Key specs
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:C.border, borderRadius:'10px', overflow:'hidden', marginBottom:'28px' }}>
            {[{l:ar?'القطر':'Diameter',v:w.caseMM},{l:ar?'السُّمك':'Thickness',v:w.thickness},{l:ar?'مقاومة الماء':'Water Res.',v:w.waterResistance}].map(s=>(
              <div key={s.l} style={{ background:C.card2, padding:'16px', textAlign:'center' }}>
                <div style={{ fontFamily:C.sans, fontSize:'18px', fontWeight:'700', color:C.gold, marginBottom:'4px' }}>{s.v}</div>
                <div style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'11px', color:C.gray3, textTransform:ar?'none':'uppercase' }}>{s.l}</div>
              </div>
            ))}
          </div> */}

          {/* Tabs */}
          <div style={{ display:'flex', borderBottom:`1px solid ${C.border}`, marginBottom:'24px', flexDirection:ar?'row-reverse':'row' }}>
            {[{k:'overview',en:'Overview',ar:'نظرة عامة'},{k:'features',en:'Features',ar:'المميزات'}].map(t=>(
              <button key={t.k} onClick={()=>setTab(t.k)} style={{ padding:'10px 20px', fontFamily:ar?C.arabic:C.sans, fontSize:'13px', fontWeight:'600', color:tab===t.k?C.gold:C.gray2, borderBottom:`2px solid ${tab===t.k?C.gold:'transparent'}`, marginBottom:'-1px', transition:'all .25s' }}>
                {ar?t.ar:t.en}
              </button>
            ))}
          </div>

          {tab==='overview' && (
            <div>
              {[
                {l:ar?'الماركة':'Brand', v:w.brand},
              
                {l:ar?'وجه الساعة':'Dial', v:ar?w.dialAr:w.dial},
                {l:ar?'الحالة':'Condition', v:w.condition},
                {l:ar?'السنة':'Year', v:w.year},
              ].map(row=>(
                <div key={row.l} style={{ display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:`1px solid ${C.border}30`, flexDirection:ar?'row-reverse':'row' }}>
                  <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'13px', color:C.gray3 }}>{row.l}</span>
                  <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'14px', color:C.gray1, fontWeight:'500', textAlign:ar?'left':'right', maxWidth:'60%' }}>{row.v}</span>
                </div>
              ))}
            </div>
          )}

          {/* {tab==='specs' && (
            <div>
              {[
                {l:ar?'قطر الغلاف':'Case Diameter', v:w.caseMM},
                {l:ar?'سُمك الغلاف':'Case Thickness', v:w.thickness},
                {l:ar?'مقاومة الماء':'Water Resistance', v:w.waterResistance},
                {l:ar?'الحركة':'Movement', v:ar?w.movAr:w.movement},
                {l:ar?'مادة الغلاف':'Case Material', v:ar?w.matAr:w.material},
              ].map(row=>(
                <div key={row.l} style={{ display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:`1px solid ${C.border}30`, flexDirection:ar?'row-reverse':'row' }}>
                  <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'13px', color:C.gray3 }}>{row.l}</span>
                  <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'14px', color:C.gray1, fontWeight:'600' }}>{row.v}</span>
                </div>
              ))}
            </div>
          )} */}

          {tab==='features' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {(ar?w.featAr:w.features).map(f=>(
                <div key={f} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'12px 16px', background:C.card, borderRadius:'8px', border:`1px solid ${C.border}`, flexDirection:ar?'row-reverse':'row' }}>
                  <span style={{ color:C.gold, fontSize:'14px' }}>◆</span>
                  <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'14px', color:C.gray1, fontWeight:'500' }}>{f}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price + CTA */}
          <div style={{ marginTop:'36px', padding:'24px', background:C.card, border:`1px solid ${C.border}`, borderRadius:'12px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px', flexDirection:ar?'row-reverse':'row' }}>
              <div style={{ textAlign:ar?'right':'left' }}>
                <div style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.gray3, marginBottom:'4px', textTransform:ar?'none':'uppercase' }}>{ar?'السعر':'Price'}</div>
                <div style={{ fontFamily:C.sans, fontSize:'2.2rem', fontWeight:'700', color:C.gold, lineHeight:1 }}>{fmtPrice(w.price)}</div>
                {w.discount>0 && <div style={{ fontFamily:C.sans, fontSize:'14px', color:C.gray3, textDecoration:'line-through', marginTop:'4px' }}>
                  {fmtPrice(w.original)} <span style={{ color:C.green, textDecoration:'none', fontWeight:'700' }}>({ar?`وفّرت ${fmtPrice(w.original-w.price)}`:`Save ${fmtPrice(w.original-w.price)}`})</span>
                </div>}
              </div>
              <div style={{ textAlign:ar?'left':'right' }}>
                <div style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.green, fontWeight:'600', marginBottom:'4px' }}>✅ {ar?'متاح الآن':'In Stock'}</div>
                {/* <div style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.gray3 }}>🚀 {ar?'شحن مجاني':'Free Shipping'}</div> */}
              </div>
            </div>
            <div style={{ display:'flex', gap:'10px', flexDirection:ar?'row-reverse':'row' }}>
              <button onClick={()=>onAdd(w)} style={{ flex:1, padding:'14px', background:added?C.green:`linear-gradient(135deg,${C.gold3},${C.gold},${C.gold2})`, color:added?'#fff':C.bg, fontFamily:ar?C.arabic:C.sans, fontSize:'15px', fontWeight:'700', borderRadius:'8px', transition:'all .3s', boxShadow:added?`0 6px 20px ${C.green}40`:`0 6px 20px ${C.gold}40` }}>
                {added?(ar?'✓ تمت الإضافة':'✓ Added to Cart'):(ar?'🛍 أضف للسلة':'🛍 Add to Cart')}
              </button>
              {/* <button style={{ padding:'14px 20px', border:`1px solid ${C.border}`, borderRadius:'8px', fontFamily:ar?C.arabic:C.sans, fontSize:'14px', color:C.gray2, transition:'all .3s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2}}>
                {ar?'💬 استفسار':'💬 Enquire'}
              </button> */}
            </div>
          </div>

          {/* Trust row */}
          <div style={{ display:'flex', justifyContent:'space-around', marginTop:'20px', padding:'16px', background:C.card2, borderRadius:'8px', border:`1px solid ${C.border}30` }}>
            {[{i:'🛡',l:ar?'مضمون':'Warranted'},{i:'🔒',l:ar?'دفع آمن':'Secure Pay'},{i:'↩',l:ar?'إرجاع مجاني':'Free Return'}].map(b=>(
              <div key={b.l} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'18px', marginBottom:'4px' }}>{b.i}</div>
                <div style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'11px', color:C.gray3 }}>{b.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   CART + CHECKOUT FLOW
═══════════════════════════════════════════════ */
function CartAndCheckout({ items, onClose, onRemove, ar }) {
  const [step, setStep] = useState('cart') // 'cart' | 'form'
  const [form, setForm] = useState({ name:'', phone:'', email:'', country:'', notes:'' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const total = items.reduce((s,i)=>s+i.price, 0)
  const saved = items.reduce((s,i)=>s+(i.original-i.price), 0)

  const handleChange = e => setForm(p=>({...p,[e.target.name]:e.target.value}))

  const handleSubmit = async () => {
    if (!form.name || !form.phone) { setStatus('error'); return }
    setStatus('sending')
    const watchList = items.map(w=>`• ${w.brand} ${w.name} (${w.nameAr}) — $${w.price.toLocaleString()}`).join('\n')
    const msgBody = [
      '🛍 طلب جديد من متجر TQ',
      '',
      `👤 الاسم: ${form.name}`,
      `📱 الهاتف: ${form.phone}`,
      `📧 الإيميل: ${form.email||'—'}`,
      `🌍 الدولة: ${form.country||'—'}`,
      '',
      '⌚ الساعات المطلوبة:',
      watchList,
      '',
      `💰 الإجمالي: $${total.toLocaleString()}`,
      saved>0 ? `💚 توفير: $${saved.toLocaleString()}` : '',
      '',
      `📝 ملاحظات: ${form.notes||'—'}`,
    ].filter(Boolean).join('\n')

    // WhatsApp first (instant)
    const waText = encodeURIComponent(msgBody)
    window.open(`https://wa.me/201117359755?text=${waText}`, '_blank')

    // Email fallback
    const subject = encodeURIComponent(`طلب جديد TQ — ${form.name}`)
    const mailBody = encodeURIComponent(msgBody)
    setTimeout(() => {
      window.open(`mailto:mikelemel2@gmail.com?subject=${subject}&body=${mailBody}`)
    }, 800)

    setStatus('sent')
  }

  const inp = (name, ph, type='text') => (
    <input name={name} type={type} placeholder={ph} value={form[name]} onChange={handleChange}
      style={{ width:'100%', padding:'11px 15px', background:C.bg2, border:`1px solid ${status==='error'&&!form[name]&&(name==='name'||name==='phone')?C.red:C.border}`, borderRadius:'8px', color:C.white, fontFamily:ar?C.arabic:C.sans, fontSize:'14px', outline:'none', direction:ar?'rtl':'ltr', marginBottom:'10px', transition:'border-color .2s' }}
      onFocus={e=>e.target.style.borderColor=C.gold}
      onBlur={e=>e.target.style.borderColor=C.border}/>
  )

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.78)', backdropFilter:'blur(7px)', zIndex:1999 }}/>

      {/* Drawer panel */}
      <div style={{ position:'fixed', top:0, right:0, bottom:0, width:'460px', maxWidth:'100vw', background:C.card, zIndex:2000, display:'flex', flexDirection:'column', borderLeft:`1px solid ${C.border}`, direction:ar?'rtl':'ltr', transition:'transform .35s ease' }}>

        {/* ── HEADER ── */}
        <div style={{ padding:'20px 24px', borderBottom:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', background:C.card, flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            {step==='form' && (
              <button onClick={()=>setStep('cart')} style={{ color:C.gray2, fontSize:'20px', lineHeight:1, marginInlineEnd:'4px', transition:'color .2s' }}
                onMouseEnter={e=>e.currentTarget.style.color=C.gold}
                onMouseLeave={e=>e.currentTarget.style.color=C.gray2}>
                {ar?'→':'←'}
              </button>
            )}
            <div>
              <h3 style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'17px', fontWeight:'700', color:C.white, lineHeight:1 }}>
                {step==='cart'?(ar?'سلة المشتريات':'Shopping Cart'):(ar?'تفاصيل الطلب':'Order Details')}
              </h3>
              <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.gray3, marginTop:'3px' }}>
                {step==='cart'
                  ? `${items.length} ${ar?'قطعة':'item(s)'}`
                  : ar?'خطوة أخيرة — أرسل طلبك':'Last step — send your order'}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ width:'34px', height:'34px', border:`1px solid ${C.border}`, borderRadius:'50%', color:C.gray2, fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .25s', flexShrink:0 }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.red;e.currentTarget.style.color=C.red}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2}}>×</button>
        </div>

        {/* Progress bar */}
        <div style={{ height:'3px', background:C.bg2 }}>
          <div style={{ height:'100%', width:step==='cart'?'50%':status==='sent'?'100%':'75%', background:`linear-gradient(90deg,${C.gold3},${C.gold})`, transition:'width .5s ease' }}/>
        </div>

        {/* ── CART STEP ── */}
        {step==='cart' && (
          <>
            <div style={{ flex:1, overflowY:'auto', padding:'16px 24px' }}>
              {items.length===0 ? (
                <div style={{ textAlign:'center', paddingTop:'60px' }}>
                  <div style={{ fontSize:'3.5rem', marginBottom:'14px' }}>🛍</div>
                  <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'16px', color:C.gray2 }}>{ar?'سلتك فارغة':'Your cart is empty'}</p>
                  <button onClick={onClose} style={{ marginTop:'20px', padding:'10px 24px', border:`1px solid ${C.border}`, borderRadius:'8px', fontFamily:ar?C.arabic:C.sans, fontSize:'13px', color:C.gray1, transition:'all .2s' }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray1}}>
                    {ar?'تصفح الساعات':'Browse Watches'}
                  </button>
                </div>
              ) : items.map((item,i)=>(
                <div key={`${item.id}-${i}`} style={{ display:'flex', gap:'14px', padding:'14px 0', borderBottom:`1px solid ${C.border}20`, flexDirection:ar?'row-reverse':'row', alignItems:'flex-start' }}>
                  {/* Thumbnail — 4:5 */}
                  <div style={{ width:'64px', height:'80px', background:C.bg2, borderRadius:'8px', overflow:'hidden', flexShrink:0, border:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {item.img
                      ? <img src={item.img} alt="" style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'center', padding:'4px' }}/>
                      : <MiniWatch w={item} size={64}/>
                    }
                  </div>
                  <div style={{ flex:1, textAlign:ar?'right':'left' }}>
                    <div style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'11px', color:C.gold3, fontWeight:'700', marginBottom:'2px' }}>{item.brand}</div>
                    <div style={{ fontFamily:C.serif, fontSize:'14px', fontWeight:'600', color:C.white, marginBottom:'5px', lineHeight:1.2 }}>{ar?item.nameAr:item.name}</div>
                    <div style={{ fontFamily:C.sans, fontSize:'15px', fontWeight:'700', color:C.gold }}>${item.price.toLocaleString()}</div>
                    {item.discount>0 && <div style={{ fontFamily:C.sans, fontSize:'11px', color:C.green, marginTop:'2px' }}>وفّرت ${(item.original-item.price).toLocaleString()}</div>}
                  </div>
                  <button onClick={()=>onRemove(i)} style={{ color:C.gray3, fontSize:'18px', lineHeight:1, padding:'2px 4px', flexShrink:0, transition:'color .2s', marginTop:'2px' }}
                    onMouseEnter={e=>e.currentTarget.style.color=C.red}
                    onMouseLeave={e=>e.currentTarget.style.color=C.gray3}>×</button>
                </div>
              ))}
            </div>

            {items.length>0 && (
              <div style={{ padding:'18px 24px', borderTop:`1px solid ${C.border}`, flexShrink:0, background:C.card }}>
                {saved>0 && (
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px', flexDirection:ar?'row-reverse':'row' }}>
                    <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'13px', color:C.green }}>{ar?'إجمالي التوفير':'Total Savings'}</span>
                    <span style={{ fontFamily:C.sans, fontSize:'13px', fontWeight:'700', color:C.green }}>-${saved.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'16px', flexDirection:ar?'row-reverse':'row' }}>
                  <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'15px', fontWeight:'700', color:C.white }}>{ar?'الإجمالي':'Total'}</span>
                  <span style={{ fontFamily:C.sans, fontSize:'22px', fontWeight:'700', color:C.gold }}>${total.toLocaleString()}</span>
                </div>
                <button onClick={()=>setStep('form')} style={{ width:'100%', padding:'14px', background:`linear-gradient(135deg,${C.gold3},${C.gold},${C.gold2})`, color:C.bg, fontFamily:ar?C.arabic:C.sans, fontSize:'15px', fontWeight:'700', borderRadius:'8px', boxShadow:`0 6px 24px ${C.gold}35`, transition:'opacity .25s' }}
                  onMouseEnter={e=>e.currentTarget.style.opacity='.88'}
                  onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                  {ar?'متابعة الطلب ←':'Proceed to Order →'}
                </button>
              </div>
            )}
          </>
        )}

        {/* ── FORM STEP ── */}
        {step==='form' && (
          <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
            {status==='sent' ? (
              <div style={{ textAlign:'center', paddingTop:'40px', paddingBottom:'40px' }}>
                <div style={{ fontSize:'4rem', marginBottom:'16px' }}>✅</div>
                <h3 style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'20px', fontWeight:'700', color:C.white, marginBottom:'10px' }}>{ar?'تم إرسال طلبك!':'Order Sent!'}</h3>
                <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'14px', color:C.gray2, lineHeight:1.75, marginBottom:'8px' }}>
                  {ar?'وصل طلبك على واتساب والإيميل — هنتواصل معاك في أقرب وقت.':'Your order was sent via WhatsApp & Email — we\'ll contact you shortly.'}
                </p>
                <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'13px', color:C.gray3, marginBottom:'28px' }}>mikelemel2@gmail.com</p>
                <button onClick={onClose} style={{ padding:'12px 32px', background:`linear-gradient(135deg,${C.gold3},${C.gold})`, color:C.bg, fontFamily:ar?C.arabic:C.sans, fontSize:'14px', fontWeight:'700', borderRadius:'8px' }}>
                  {ar?'رجوع للمتجر':'Back to Store'}
                </button>
              </div>
            ) : (
              <>
                {/* Mini summary */}
                <div style={{ background:C.bg2, borderRadius:'10px', padding:'14px', marginBottom:'18px', border:`1px solid ${C.border}20` }}>
                  <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'11px', color:C.gold, fontWeight:'700', textTransform:ar?'none':'uppercase', letterSpacing:ar?0:'0.1em', marginBottom:'10px' }}>{ar?'ملخص الطلب':'Order Summary'}</p>
                  {items.map((item,i)=>(
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:i<items.length-1?`1px solid ${C.border}15`:'none', flexDirection:ar?'row-reverse':'row' }}>
                      <span style={{ fontFamily:C.serif, fontSize:'13px', color:C.white }}>{ar?item.nameAr:item.name}</span>
                      <span style={{ fontFamily:C.sans, fontSize:'13px', fontWeight:'700', color:C.gold }}>${item.price.toLocaleString()}</span>
                    </div>
                  ))}
                  <div style={{ display:'flex', justifyContent:'space-between', marginTop:'10px', paddingTop:'10px', borderTop:`1px solid ${C.border}`, flexDirection:ar?'row-reverse':'row' }}>
                    <span style={{ fontFamily:ar?C.arabic:C.sans, fontWeight:'700', color:C.white, fontSize:'14px' }}>{ar?'الإجمالي':'Total'}</span>
                    <span style={{ fontFamily:C.sans, fontSize:'17px', fontWeight:'700', color:C.gold }}>${total.toLocaleString()}</span>
                  </div>
                </div>

                <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'13px', color:C.gray2, marginBottom:'14px', lineHeight:1.6 }}>
                  {ar?'* الاسم والهاتف كافيين — هنتواصل معاك فوراً على واتساب':'* Name & phone are enough — we\'ll reach you on WhatsApp instantly'}
                </p>

                {inp('name',   ar?'* الاسم الكامل':'* Full Name')}
                {inp('phone',  ar?'* رقم الهاتف / واتساب':'* Phone / WhatsApp', 'tel')}
                {inp('email',  ar?'الإيميل (اختياري)':'Email (optional)', 'email')}
                {inp('country',ar?'الدولة':'Country')}
                <textarea name="notes" placeholder={ar?'ملاحظات إضافية...':'Additional notes...'} value={form.notes} onChange={handleChange} rows={3}
                  style={{ width:'100%', padding:'11px 15px', background:C.bg2, border:`1px solid ${C.border}`, borderRadius:'8px', color:C.white, fontFamily:ar?C.arabic:C.sans, fontSize:'14px', outline:'none', resize:'none', direction:ar?'rtl':'ltr', marginBottom:'16px', transition:'border-color .2s' }}
                  onFocus={e=>e.target.style.borderColor=C.gold}
                  onBlur={e=>e.target.style.borderColor=C.border}/>

                {status==='error' && (
                  <p style={{ color:C.red, fontFamily:ar?C.arabic:C.sans, fontSize:'13px', marginBottom:'12px' }}>
                    ⚠ {ar?'من فضلك ادخل اسمك ورقم هاتفك':'Please enter your name and phone number'}
                  </p>
                )}

                <button onClick={handleSubmit} disabled={status==='sending'}
                  style={{ width:'100%', padding:'14px', background:status==='sending'?C.gray3:`linear-gradient(135deg,${C.gold3},${C.gold},${C.gold2})`, color:C.bg, fontFamily:ar?C.arabic:C.sans, fontSize:'15px', fontWeight:'700', borderRadius:'8px', transition:'all .3s', marginBottom:'10px', opacity:status==='sending'?.7:1 }}>
                  {status==='sending'?(ar?'جاري الإرسال...':'Sending...'):(ar?'📤 أرسل الطلب على واتساب':'📤 Send via WhatsApp')}
                </button>

                <p style={{ textAlign:'center', fontFamily:ar?C.arabic:C.sans, fontSize:'11px', color:C.gray3 }}>
                  {ar?'هيتبعت على واتساب والإيميل تلقائياً':'Will be sent to WhatsApp & Email automatically'}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════ */
function Footer({ ar }) {
  return (
    <footer style={{ background:C.bg2, borderTop:`1px solid ${C.border}`, padding:'80px 60px 40px', direction:ar?'rtl':'ltr' }}>
      
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:'48px', marginBottom:'56px' }}>
        
        {/* Brand */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px', flexDirection:ar?'row-reverse':'row', justifyContent:ar?'flex-end':'flex-start' }}>
            <span style={{ fontFamily:C.serif, fontSize:'2.4rem', fontWeight:'700', color:C.gold, letterSpacing:'0.1em', lineHeight:1 }}>TQ</span>
            <div style={{ width:'1px', height:'32px', background:C.border }}/>
            <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', fontWeight:'500', color:C.gray2 }}>
              {ar ? 'متجر الساعات' : 'Watch Store'}
            </span>
          </div>

          <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'14px', color:C.gray2, lineHeight:1.85, maxWidth:'300px', marginBottom:'24px', textAlign:ar?'right':'left' }}>
            {ar 
              ? 'متجر TQ — نقدم ساعات بتصميمات أنيقة وجودة ممتازة تناسب ذوقك اليومي وبأسعار مناسبة.' 
              : 'TQ Store — offering stylish watches with great quality that fit your daily look at affordable prices.'
            }
          </p>

          {/* Social */}
          <div style={{ display:'flex', gap:'10px', justifyContent:ar?'flex-end':'flex-start' }}>
            
            {/* WhatsApp */}
            <button 
              onClick={() => window.open('https://wa.me/201117359755', '_blank')}
            style={{ width:'38px', height:'38px', border:`1px solid ${C.border}`, borderRadius:'8px',     background:`url(${whatsapp}) center/60% no-repeat` }} />

            {/* insta */}
            <button
              onClick={() => window.open('#', '_blank')}
            style={{ width:'38px', height:'38px', border:`1px solid ${C.border}`, borderRadius:'8px', background:`url(${insta}) center/60% no-repeat` }} />

            {/* face */}
            <button
              onClick={() => window.open('#', '_blank')}
            style={{ width:'38px', height:'38px', border:`1px solid ${C.border}`, borderRadius:'8px', background:`url(${face}) center/60% no-repeat` }} />

          </div>
        </div>

        {/* Collections (بسيطة) */}
        <div style={{ textAlign:ar?'right':'left' }}>
          <h4 style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'13px', fontWeight:'700', color:C.gold, marginBottom:'18px' }}>
            {ar ? 'الأقسام' : 'Sections'}
          </h4>

          <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'10px' }}>
            {[
              {en:'New Arrivals', ar:'وصل حديثاً'},
              {en:'Best Sellers', ar:'الأكثر مبيعاً'},
              {en:'Classic Watches', ar:'كلاسيك'},
              {en:'Contact Us', ar:'تواصل معنا'}
            ].map(l=>(
              <li key={l.en}>
                <a href="#" style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'14px', color:C.gray2 }}>
                  {ar ? l.ar : l.en}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div style={{ textAlign:ar?'right':'left' }}>
          <h4 style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'13px', fontWeight:'700', color:C.gold, marginBottom:'18px' }}>
            {ar ? 'تواصل' : 'Contact'}
          </h4>

          <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'10px' }}>
            <li style={{ color:C.gray2, fontSize:'14px' }}>
              WhatsApp: +20 1117359755
            </li>
            <li style={{ color:C.gray2, fontSize:'14px' }}>
              Email: mikelemel2@gmail.com
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px', borderTop:`1px solid ${C.border}30`, paddingTop:'24px' }}>
        <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'13px', color:C.gray3 }}>
          © 2026 TQ Watch Store · {ar ? 'كل الحقوق محفوظة' : 'All Rights Reserved'}
        </p>
      </div>

    </footer>
  )
}

/* ═══════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════ */
export default function App() {
  const { lang, ar, toggle } = useLang()
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [detail, setDetail] = useState(null)
  const [addedId, setAddedId] = useState(null)

  const addToCart = useCallback((w) => {
    setCart(p => p.find(x => x.id === w.id) ? p : [...p, w])
    setAddedId(w.id)
    setTimeout(() => setAddedId(null), 2000)
  }, [])

  const removeFromCart = (i) => setCart(p => p.filter((_, idx) => idx !== i))

  const openDetail = (w) => {
    setDetail(w)
    setSearchOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Ctrl+K / Cmd+K → search
  useEffect(() => {
    const fn = e => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(p => !p) } }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const navbarProps = {
    cart, lang, toggleLang: toggle,
    onCart: () => setCartOpen(true),
    onSearch: () => setSearchOpen(true),
  }

  if (detail) return (
    <>
      <Navbar {...navbarProps}/>
      <WatchDetailPage w={detail} ar={ar} onBack={() => setDetail(null)} onAdd={addToCart} addedId={addedId}/>
      <Footer ar={ar}/>
      {cartOpen && <CartAndCheckout items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} ar={ar}/>}
      {searchOpen && <SearchModal ar={ar} onClose={() => setSearchOpen(false)} onWatch={openDetail}/>}
    </>
  )

  return (
    <>
      <Navbar {...navbarProps}/>
      <Ticker ar={ar}/>
      <Hero ar={ar}/>
      <Collections ar={ar} onWatch={openDetail} onAdd={addToCart} addedId={addedId} cartItems={cart}/>
      <WatchFinder ar={ar} onWatch={openDetail}/>
      <DealsSection ar={ar} onWatch={openDetail} onAdd={addToCart} addedId={addedId} cartItems={cart}/>
      <HotSection ar={ar} onWatch={openDetail} onAdd={addToCart} addedId={addedId} cartItems={cart}/>
      <WhyTQ ar={ar}/>
      <Footer ar={ar}/>
      {cartOpen && <CartAndCheckout items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} ar={ar}/>}
      {searchOpen && <SearchModal ar={ar} onClose={() => setSearchOpen(false)} onWatch={openDetail}/>}
    </>
  )
}
function SearchModal({ ar, onClose, onWatch }) {
  const [q, setQ] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = q.trim().length < 2 ? [] : WATCHES.filter(w => {
    const term = q.toLowerCase()
    return (
      w.name.toLowerCase().includes(term) ||
      w.nameAr.includes(q) ||
      w.brand.toLowerCase().includes(term) ||
      w.model.toLowerCase().includes(term) ||
      w.category.toLowerCase().includes(term) ||
      w.categoryAr.includes(q) ||
      w.dial.toLowerCase().includes(term) ||
      w.material.toLowerCase().includes(term) ||
      String(w.price).includes(q)
    )
  })

  const highlight = (text) => {
    if (!q.trim()) return text
    const idx = text.toLowerCase().indexOf(q.toLowerCase())
    if (idx < 0) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: `${C.gold}40`, color: C.gold, borderRadius: '2px', padding: '0 2px' }}>
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    )
  }

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.85)', backdropFilter:'blur(8px)', zIndex:2999 }}/>
      <div style={{ position:'fixed', top:0, left:0, right:0, zIndex:3000, padding:'20px 60px', background:C.bg, borderBottom:`1px solid ${C.border}`, direction:ar?'rtl':'ltr' }}>
        {/* Search bar */}
        <div style={{ display:'flex', alignItems:'center', gap:'16px', maxWidth:'800px', margin:'0 auto' }}>
          <span style={{ fontSize:'22px', color:C.gold, flexShrink:0 }}>🔍</span>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={ar ? 'ابحث عن ساعة، ماركة، موديل...' : 'Search watches, brands, models...'}
            style={{ flex:1, background:'transparent', border:'none', outline:'none', fontSize:'22px', fontFamily:ar?C.arabic:C.sans, color:C.white, fontWeight:'300', direction:ar?'rtl':'ltr', caretColor:C.gold }}
          />
          <button onClick={onClose} style={{ width:'36px', height:'36px', border:`1px solid ${C.border}`, borderRadius:'50%', color:C.gray2, fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all .3s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.red;e.currentTarget.style.color=C.red}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2}}>
            ×
          </button>
        </div>
      </div>

      {/* Results dropdown */}
      <div style={{ position:'fixed', top:'90px', left:0, right:0, zIndex:3000, maxHeight:'calc(100vh - 100px)', overflowY:'auto', direction:ar?'rtl':'ltr' }}>
        <div style={{ maxWidth:'800px', margin:'0 auto', padding:'0 60px 40px' }}>
          {q.trim().length >= 2 && (
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:'16px', overflow:'hidden', boxShadow:`0 20px 60px rgba(0,0,0,.6)` }}>
              {results.length === 0 ? (
                <div style={{ padding:'48px 32px', textAlign:'center' }}>
                  <div style={{ fontSize:'3rem', marginBottom:'12px' }}>🔎</div>
                  <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'16px', color:C.gray2, marginBottom:'8px' }}>
                    {ar ? `مفيش نتائج لـ "${q}"` : `No results for "${q}"`}
                  </p>
                  <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'14px', color:C.gray3 }}>
                    {ar ? 'جرب اسم الماركة أو الموديل' : 'Try the brand name or model number'}
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ padding:'14px 20px', borderBottom:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:ar?'row-reverse':'row' }}>
                    <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.gold, fontWeight:'600', textTransform:ar?'none':'uppercase', letterSpacing:ar?0:'0.1em' }}>
                      {ar ? `${results.length} نتيجة` : `${results.length} result${results.length !== 1 ? 's' : ''}`}
                    </span>
                    <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.gray3 }}>
                      {ar ? 'اضغط Esc للإغلاق' : 'Press Esc to close'}
                    </span>
                  </div>
                  {results.map((w, i) => (
                    <button key={w.id} onClick={() => { onWatch(w); onClose() }}
                      style={{ width:'100%', display:'flex', alignItems:'center', gap:'16px', padding:'16px 20px', borderBottom: i < results.length-1 ? `1px solid ${C.border}30` : 'none', transition:'background .2s', textAlign:ar?'right':'left', flexDirection:ar?'row-reverse':'row' }}
                      onMouseEnter={e=>e.currentTarget.style.background=C.card2}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      {/* Mini preview */}
                      <div style={{ width:'60px', height:'60px', background:C.bg2, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${C.border}` }}>
                        {w.img
                          ? <img src={w.img} alt="" style={{width:'50px',height:'50px',objectFit:'contain'}}/>
                          : <MiniWatch w={w} size={56}/>
                        }
                      </div>
                      {/* Info */}
                      <div style={{ flex:1 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'3px', flexDirection:ar?'row-reverse':'row' }}>
                          <span style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', fontWeight:'700', color:C.gold3 }}>{highlight(w.brand)}</span>
                          <span style={{ fontSize:'11px', color:C.gray3 }}>·</span>
                          <span style={{ fontFamily:C.sans, fontSize:'11px', color:C.gray3 }}>{highlight(w.model)}</span>
                        </div>
                        <div style={{ fontFamily:C.serif, fontSize:'16px', fontWeight:'600', color:C.white, marginBottom:'3px' }}>
                          {ar ? highlight(w.nameAr) : highlight(w.name)}
                        </div>
                        <div style={{ display:'flex', gap:'10px', alignItems:'center', flexDirection:ar?'row-reverse':'row' }}>
                          <span style={{ fontFamily:C.sans, fontSize:'15px', fontWeight:'700', color:C.gold }}>${w.price.toLocaleString()}</span>
                          {w.discount > 0 && <span style={{ fontSize:'11px', background:C.red, color:'#fff', padding:'2px 7px', borderRadius:'4px', fontWeight:'700' }}>-{w.discount}%</span>}
                          <span style={{ fontSize:'11px', color:C.gray3, fontFamily:ar?C.arabic:C.sans }}>{ar?w.categoryAr:w.category}</span>
                        </div>
                      </div>
                      <span style={{ color:C.gold3, fontSize:'18px', flexShrink:0 }}>{ar?'←':'→'}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Quick suggestions when empty */}
          {q.trim().length < 2 && (
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:'16px', padding:'24px 24px 20px', boxShadow:`0 20px 60px rgba(0,0,0,.6)` }}>
              <p style={{ fontFamily:ar?C.arabic:C.sans, fontSize:'12px', color:C.gold, fontWeight:'600', textTransform:ar?'none':'uppercase', letterSpacing:ar?0:'0.1em', marginBottom:'16px' }}>
                {ar ? '🔥 الأكثر بحثاً' : '🔥 Popular Searches'}
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                {['Rolex','Patek Philippe','Audemars Piguet','Omega','IWC','Tourbillon','Chronograph','GMT'].map(tag => (
                  <button key={tag} onClick={() => setQ(tag)}
                    style={{ padding:'7px 16px', border:`1px solid ${C.border}`, borderRadius:'100px', fontFamily:C.sans, fontSize:'13px', color:C.gray2, background:'transparent', transition:'all .2s' }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2}}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}