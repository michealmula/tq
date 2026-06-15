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

const WATCH_IMGS = [watch01,watch02,watch03,watch04,watch05,watch06,watch07,watch08,watch09,watch10,watch11,watch12,watch13,watch14,watch15,watch16]

const C = {
  bg:'#0a0908',bg2:'#111008',card:'#161410',card2:'#1e1b14',
  border:'rgba(212,170,80,0.18)',borderHover:'rgba(212,170,80,0.45)',
  gold:'#d4aa50',gold2:'#f0cc70',gold3:'#a07828',
  red:'#c0392b',green:'#27ae60',
  white:'#faf8f2',gray1:'#e8e2d4',gray2:'#b0a888',gray3:'#706850',
  serif:"'Playfair Display', Georgia, serif",
  sans:"'Inter', sans-serif",
  arabic:"'Cairo', sans-serif",
}

const WATCHES = [
  {id:1,name:"Datejust Crystal Dial",nameAr:"ديتجاست مينا كريستال",brand:"Rolex",model:"",price:350,original:600,discount:42,category:"Classic",categoryAr:"كلاسيكي",badge:"bestseller",badgeAr:"الأكثر مبيعاً",dial:"Purple Crystal-set",dialAr:"أرجواني مرصع بالكريستال",condition:"New",year:"2024",desc:"Exuding pure elegance, this Datejust features a captivating purple dial adorned with sparkling crystal hour markers, housed in a polished steel case.",descAr:"تفيض هذه الساعة بالأناقة الخالصة، حيث تتميز بمينا أرجواني ساحر مرصع بمؤشرات ساعات من الكريستال المتلألئ، داخل هيكل فولاذي مصقول.",features:["Crystal Indices","Jubilee Bracelet","Date Magnification"],featAr:["مؤشرات كريستالية","سوار جوبيلي","عدسة تكبير للتاريخ"],img:null,exclusive:false,hot:true},
  {id:2,name:"Nautilus Blue",nameAr:"نوتيلوس أزرق",brand:"Patek Philippe",model:"",price:380,original:500,discount:24,category:"Unique to own",categoryAr:"مميز للاقتناء",badge:"exclusive",badgeAr:"حصري",dial:"Blue Gradient Ribbed",dialAr:"أزرق متدرج مخطط",condition:"New",year:"2024",desc:"A masterpiece of horological engineering, the Nautilus is defined by its iconic porthole design and blue ribbed dial.",descAr:"تحفة فنية في هندسة الساعات، تتميز النوتيلوس بتصميمها الأيقوني المستوحى من كوة السفن ومينائها الأزرق المخطط.",features:["Signature Porthole Case","Integrated Bracelet","Automatic Movement"],featAr:["هيكل أيقوني مميز","سوار مدمج","حركة أوتوماتيكية"],img:null,exclusive:true,hot:false},
  {id:3,name:"Integral Quartz",nameAr:"إنتجرال كوارتز",brand:"Rado",model:"",price:450,original:640,discount:30,category:"Simple",categoryAr:"بسيط",badge:"hot",badgeAr:"مطلوب",dial:"Champagne Sunray",dialAr:"شامبين شمسية",condition:"New",year:"2024",desc:"Embodying minimalist beauty, this Rado timepiece offers a sleek champagne dial and a comfortable bracelet.",descAr:"تجسيداً للجمال البسيط، تقدم ساعة رادو هذه مينا شامبين أنيقاً وسواراً مريحاً.",features:["Slim Profile","Sapphire Crystal","Precision Quartz"],featAr:["تصميم نحيف","زجاج ياقوتي","حركة كوارتز دقيقة"],img:null,exclusive:false,hot:false},
  {id:4,name:"Vintage Square",nameAr:"فينتيج سكوير",brand:"Casio",model:"",price:500,original:700,discount:29,category:"Practical",categoryAr:"عملي",badge:"deal",badgeAr:"عرض",dial:"Matte Black",dialAr:"أسود مطفي",condition:"New",year:"2024",desc:"Combining retro charm with modern functionality, this black-on-black Casio square watch is the ultimate daily-wear piece.",descAr:"تجمع هذه الساعة من كاسيو بين سحر التصميم الكلاسيكي والوظائف الحديثة.",features:["Retro Square Case","Black IP Finish","Durable Quartz"],featAr:["هيكل مربع كلاسيكي","طلاء أسود مقاوم","كوارتز متين"],img:null,exclusive:true,hot:true},
  {id:5,name:"Nautilus Blue Date",nameAr:"نوتيلوس أزرق بالتاريخ",brand:"Patek Philippe",model:"",price:480,original:550,discount:13,category:"Unique to own",categoryAr:"مميز للاقتناء",badge:"exclusive",badgeAr:"حصري",dial:"Blue Gradient Ribbed",dialAr:"أزرق متدرج مخطط",condition:"New",year:"2024",desc:"The quintessential luxury sports watch. This Nautilus variant offers a clean blue dial with a functional date display.",descAr:"ساعة الرفاهية الرياضية بامتياز. تقدم نسخة النوتيلوس هذه مينا أزرق نقياً مع نافذة للتاريخ.",features:["Date Window","Screw-down Crown","Exhibition Caseback"],featAr:["نافذة للتاريخ","تاج ملولب","غطاء خلفي شفاف"],img:null,exclusive:false,hot:true},
  {id:6,name:"Integral Crystal",nameAr:"إنتجرال كريستال",brand:"Rado",model:"",price:600,original:670,discount:10,category:"Classic",categoryAr:"كلاسيكي",badge:"new",badgeAr:"جديد",dial:"Grey Crystal-set",dialAr:"رمادي مرصع بالكريستال",condition:"New",year:"2024",desc:"Sophisticated and refined, this Rado features a monochromatic grey palette enhanced by luxurious crystal indices.",descAr:"متطورة وراقية، تتميز ساعة رادو هذه بلوحة ألوان رمادية أحادية معززة بمؤشرات كريستالية فاخرة.",features:["Crystal Accents","Monochrome Design","Ceramic Construction"],featAr:["لمسات كريستالية","تصميم أحادي اللون","هيكل سيراميكي"],img:null,exclusive:false,hot:false},
  {id:7,name:"Royal Oak Quartz",nameAr:"رويال أوك كوارتز",brand:"Audemars Piguet",model:"",price:300,original:400,discount:25,category:"Unique to own",categoryAr:"مميز للاقتناء",badge:"hot",badgeAr:"مطلوب",dial:"Blue Tapisserie",dialAr:"أزرق بنقش تبيسري",condition:"New",year:"2024",desc:"Featuring the signature octagonal bezel and tapisserie dial, this Royal Oak is a horological masterpiece.",descAr:"تتميز بإطارها الثماني الشهير ومينائها بنقش التبيسري، تُعد رويال أوك تحفة فنية.",features:["Octagonal Bezel","Tapisserie Dial","Integrated Bracelet"],featAr:["إطار ثماني","مينا بنقش تبيسري","سوار مدمج"],img:null,exclusive:true,hot:false},
  {id:8,name:"Land-Dweller Fluted",nameAr:"لاند-دويلر بإطار مخدد",brand:"Rolex",model:"",price:420,original:490,discount:14,category:"Practical",categoryAr:"عملي",badge:"bestseller",badgeAr:"الأكثر مبيعاً",dial:"Honey-comb Grey",dialAr:"رمادي بنقش خلية نحل",condition:"New",year:"2024",desc:"A robust adventurer's companion, the Land-Dweller combines a distinctive fluted bezel with a unique textured dial.",descAr:"رفيق المغامر القوي، تجمع ساعة لاند-دويلر بين الإطار المخدد المميز والمينا ذو الملمس الفريد.",features:["Fluted Bezel","Textured Dial","Oystersteel Build"],featAr:["إطار مخدد","مينا مزخرف","هيكل من أويسترستيل"],img:null,exclusive:false,hot:false},
  {id:9,name:"Tank Louis",nameAr:"تانك لويس",brand:"Cartier",model:"",price:399,original:600,discount:34,category:"Classic",categoryAr:"كلاسيكي",badge:"exclusive",badgeAr:"حصري",dial:"Silver Roman",dialAr:"فضي بأرقام رومانية",condition:"New",year:"2024",desc:"The embodiment of timeless Parisian chic. With its rectangular silhouette and classic Roman numeral dial.",descAr:"تجسيد للأناقة الباريسية الخالدة. بفضل تصميمها المستطيل ومينائها الكلاسيكي ذي الأرقام الرومانية.",features:["Rectangular Case","Roman Numerals","Leather Strap"],featAr:["هيكل مستطيل","أرقام رومانية","سوار جلدي"],img:null,exclusive:false,hot:true},
  {id:10,name:"Nautilus Silver",nameAr:"نوتيلوس فضي",brand:"Patek Philippe",model:"",price:320,original:600,discount:47,category:"Unique to own",categoryAr:"مميز للاقتناء",badge:"hot",badgeAr:"مطلوب",dial:"Silver Ribbed",dialAr:"فضي مخطط",condition:"New",year:"2024",desc:"This silver-dialed Nautilus offers a brighter, modern take on the legendary design.",descAr:"تقدم ساعة نوتيلوس ذات المينا الفضي نظرة عصرية وأكثر إشراقاً على التصميم الأسطوري.",features:["Silver Dial","Automatic Caliber","Porthole Design"],featAr:["مينا فضي","عيار أوتوماتيكي","تصميم كوة السفن"],img:null,exclusive:true,hot:false},
  {id:11,name:"Minimalist Square",nameAr:"مربع مينيماليست",brand:"Casio",model:"",price:540,original:600,discount:10,category:"Simple",categoryAr:"بسيط",badge:"new",badgeAr:"جديد",dial:"Silver Sunray",dialAr:"فضي شمسي",condition:"New",year:"2026",desc:"A perfect blend of understated elegance and daily utility. This silver-toned square watch offers a clean, professional look.",descAr:"مزيج مثالي بين الأناقة البسيطة والعملية اليومية. توفر هذه الساعة المربعة ذات اللون الفضي مظهراً احترافياً نظيفاً.",features:["Square Profile","Silver Finish","Reliable Quartz"],featAr:["هيكل مربع","طلاء فضي","كوارتز موثوق"],img:null,exclusive:true,hot:false},
  {id:12,name:"Nautilus Brown",nameAr:"نوتيلوس بني",brand:"Patek Philippe",model:"",price:549,original:640,discount:14,category:"Unique to own",categoryAr:"مميز للاقتناء",badge:"hot",badgeAr:"مطلوب",dial:"Chocolate Ribbed",dialAr:"شوكولاتة مخطط",condition:"New",year:"2026",desc:"An extraordinary Nautilus variant featuring a rich chocolate-toned dial.",descAr:"نسخة استثنائية من نوتيلوس تتميز بميناء غني بلون الشوكولاتة.",features:["Chocolate Dial","Integrated Bracelet","Exhibition Caseback"],featAr:["مينا شوكولاتة","سوار مدمج","غطاء خلفي شفاف"],img:null,exclusive:false,hot:false},
  {id:13,name:"Black Stealth",nameAr:"بلاك ستيلث",brand:"Custom Design",model:"",price:399,original:550,discount:27,category:"Unique to own",categoryAr:"مميز للاقتناء",badge:"exclusive",badgeAr:"حصري",dial:"Arabic Numeral Matte",dialAr:"أرقام عربية مطفية",condition:"New",year:"2026",desc:"A bold, all-black statement piece featuring traditional Arabic numerals on a matte finish.",descAr:"قطعة جريئة باللون الأسود بالكامل تتميز بأرقام عربية تقليدية على سطح مطفي.",features:["Full Black Finish","Arabic Numerals","Artistic Dial"],featAr:["تشطيب أسود كامل","أرقام عربية","مينا فني"],img:null,exclusive:false,hot:false},
  {id:14,name:"Everyday Square",nameAr:"إيفري داي سكوير",brand:"Casio",model:"",price:450,original:600,discount:25,category:"Practical",categoryAr:"عملي",badge:"deal",badgeAr:"عرض",dial:"Dark Grey",dialAr:"رمادي داكن",condition:"New",year:"2026",desc:"Built for the practical individual, this square watch offers a sophisticated dark grey dial.",descAr:"صُممت للفرد العملي، تقدم هذه الساعة المربعة ميناءً رمادياً داكناً متطوراً.",features:["Square Case","Date Function","Casual Style"],featAr:["هيكل مربع","وظيفة التاريخ","تصميم كاجوال"],img:null,exclusive:true,hot:false},
  {id:15,name:"Oyster Perpetual Day-Date",nameAr:"أويستر بربتشوال داي-ديت",brand:"Rolex",model:"",price:500,original:600,discount:17,category:"Classic",categoryAr:"كلاسيكي",badge:"bestseller",badgeAr:"الأكثر مبيعاً",dial:"Sunray Grey Crystal-set",dialAr:"رمادي شمسي مرصع بالكريستال",condition:"New",year:"2026",desc:"The ultimate symbol of achievement. This Rolex features a day and date complication with exquisite crystal hour markers.",descAr:"رمز الإنجاز المطلق. تتميز رولكس هذه بخاصية عرض اليوم والتاريخ مع مؤشرات ساعات كريستالية رائعة.",features:["Day-Date Complication","Crystal Indices","President Bracelet"],featAr:["خاصية اليوم والتاريخ","مؤشرات كريستالية","سوار بريزيدنت"],img:null,exclusive:false,hot:false},
  {id:16,name:"Leather Datejust",nameAr:"ديتجاست جلد",brand:"Rolex",model:"",price:360,original:450,discount:20,category:"Classic",categoryAr:"كلاسيكي",badge:"exclusive",badgeAr:"حصري",dial:"Black Crystal-set",dialAr:"أسود مرصع بالكريستال",condition:"New",year:"2026",desc:"A refined twist on the classic Datejust, featuring a high-quality leather strap and crystal-set dial.",descAr:"لمسة راقية على ساعة ديتجاست الكلاسيكية، تتميز بسوار من الجلد عالي الجودة ومينا مرصع بالكريستال.",features:["Leather Strap","Crystal Accents","Date Window"],featAr:["سوار جلدي","لمسات كريستالية","نافذة للتاريخ"],img:null,exclusive:true,hot:true},
]

WATCHES.forEach((w,i)=>{ w.img = WATCH_IMGS[i] || null })

const BADGE_STYLE = {
  'bestseller':{bg:'linear-gradient(135deg,#d4aa50,#f0cc70)',color:'#0a0908'},
  'exclusive':{bg:'linear-gradient(135deg,#1a1260,#3a28c0)',color:'#fff'},
  'deal':{bg:'linear-gradient(135deg,#c0392b,#e74c3c)',color:'#fff'},
  'hot':{bg:'linear-gradient(135deg,#e67e22,#f39c12)',color:'#fff'},
  'ultra-rare':{bg:'linear-gradient(135deg,#2c0a3a,#6c2a9a)',color:'#fff'},
  'new':{bg:'linear-gradient(135deg,#1a4a1a,#27ae60)',color:'#fff'},
}

const fmtPrice = n => 'EGP ' + n.toLocaleString()

function useLang(){
  const [lang,setLang]=useState('ar')
  const ar=lang==='ar'
  const toggle=()=>setLang(l=>l==='ar'?'en':'ar')
  return{lang,ar,toggle}
}

function useInView(threshold=0.12){
  const ref=useRef(null)
  const [vis,setVis]=useState(false)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true)},{threshold})
    if(ref.current)obs.observe(ref.current)
    return()=>obs.disconnect()
  },[])
  return[ref,vis]
}

/* ── RESPONSIVE STYLES ── */
const rs = {
  // padding that scales down on mobile
  sectionPad: 'clamp(40px,8vw,100px) clamp(16px,5vw,60px)',
  heroGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px' },
  cardGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(300px,100%),1fr))', gap:'24px' },
  navPad: '14px clamp(16px,4vw,40px)',
}

/* ═══════════════════════
   LIVE CLOCK
═══════════════════════ */
function LiveClock({size=380}){
  const [now,setNow]=useState(new Date())
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t)},[])
  const cx=size/2,cy=size/2,R=size*.42
  const deg=(n,max)=>(n*360/max-90)*Math.PI/180
  const hp=(d,l)=>({x:cx+l*Math.cos(d),y:cy+l*Math.sin(d)})
  const sDeg=deg(now.getSeconds(),60)
  const mDeg=deg(now.getMinutes()+now.getSeconds()/60,60)
  const hDeg=deg((now.getHours()%12)+now.getMinutes()/60,12)
  const hand=(d,r,w,color,glow)=>(
    <g>
      <line x1={cx} y1={cy} x2={hp(d,r).x} y2={hp(d,r).y} stroke={glow||color} strokeWidth={w+2} strokeLinecap="round" opacity={0.15}/>
      <line x1={cx} y1={cy} x2={hp(d,r).x} y2={hp(d,r).y} stroke={color} strokeWidth={w} strokeLinecap="round"/>
      <line x1={cx} y1={cy} x2={cx-(hp(d,r).x-cx)*.2} y2={cy-(hp(d,r).y-cy)*.2} stroke={color} strokeWidth={w+1} strokeLinecap="round" opacity={0.5}/>
    </g>
  )
  return(
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{filter:'drop-shadow(0 0 40px rgba(212,170,80,0.2)) drop-shadow(0 30px 60px rgba(0,0,0,0.7))',maxWidth:'100%'}}>
      <defs>
        <radialGradient id="dialBg" cx="45%" cy="38%"><stop offset="0%" stopColor="#221e14"/><stop offset="100%" stopColor="#080705"/></radialGradient>
        <radialGradient id="caseBg" cx="50%" cy="50%"><stop offset="0%" stopColor="#2e2818"/><stop offset="100%" stopColor="#100e08"/></radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={R+32} fill="url(#caseBg)"/>
      <circle cx={cx} cy={cy} r={R+30} fill="none" stroke={C.gold} strokeWidth="1" opacity=".6"/>
      {Array.from({length:60},(_,i)=>{const a=(i*6-90)*Math.PI/180,big=i%5===0,r1=R+28,r2=R+(big?14:21);return<line key={i} x1={cx+r1*Math.cos(a)} y1={cy+r1*Math.sin(a)} x2={cx+r2*Math.cos(a)} y2={cy+r2*Math.sin(a)} stroke={C.gold} strokeWidth={big?2:.6} opacity={big?.9:.3}/>})}
      <circle cx={cx} cy={cy} r={R+8} fill="none" stroke="rgba(0,0,0,.95)" strokeWidth="7"/>
      <circle cx={cx} cy={cy} r={R} fill="url(#dialBg)"/>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.gold} strokeWidth=".6" opacity=".5"/>
      {Array.from({length:12},(_,i)=>{const a=(i*30-90)*Math.PI/180,big=i%3===0,rA=R-(big?6:9),rB=R-(big?20:16);return<line key={i} x1={cx+rA*Math.cos(a)} y1={cy+rA*Math.sin(a)} x2={cx+rB*Math.cos(a)} y2={cy+rB*Math.sin(a)} stroke={C.gold} strokeWidth={big?3:1.2} opacity={big?1:.55}/>})}
      {[{n:'XII',a:-90},{n:'III',a:0},{n:'VI',a:90},{n:'IX',a:180}].map(({n,a})=>{const rad=a*Math.PI/180;return<text key={n} x={cx+(R-50)*Math.cos(rad)} y={cy+(R-50)*Math.sin(rad)} textAnchor="middle" dominantBaseline="middle" fill={C.gold} fontSize="13" fontFamily={C.serif} fontWeight="500" opacity=".85">{n}</text>})}
      <text x={cx} y={cy-28} textAnchor="middle" fill={C.gold} fontSize="14" fontFamily={C.serif} fontWeight="500" letterSpacing="5" opacity=".9">TQ</text>
      <text x={cx} y={cy-12} textAnchor="middle" fill={C.gold3} fontSize="7" fontFamily={C.sans} fontWeight="300" letterSpacing="3.5" opacity=".7">WATCHES</text>
      <rect x={cx+42} y={cy-10} width="25" height="20" rx="3" fill="#0c0b08" stroke={C.gold} strokeWidth=".8" opacity=".9"/>
      <text x={cx+54} y={cy+1} textAnchor="middle" dominantBaseline="middle" fill={C.gray1} fontSize="10" fontFamily={C.sans} fontWeight="600">{now.getDate()}</text>
      {hand(hDeg,R*.52,4,C.gold,C.gold2)}
      {hand(mDeg,R*.72,2.5,C.gold2,C.gold2)}
      {hand(sDeg,R*.84,1.5,'#e8b040',C.gold)}
      <line x1={cx} y1={cy} x2={hp(sDeg,-R*.26).x} y2={hp(sDeg,-R*.26).y} stroke="#c0392b" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r="7" fill={C.gold}/>
      <circle cx={cx} cy={cy} r="3.5" fill="#0c0b08"/>
      <circle cx={cx} cy={cy} r="1.5" fill={C.gold}/>
    </svg>
  )
}

function MiniWatch({w,size=200}){
  const cx=size/2,cy=size/2,R=size*.41
  const ac=w.accentColor||C.gold,bg=w.dialColor||'#161208'
  return(
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{maxWidth:'100%'}}>
      <defs><radialGradient id={`d${w.id}`} cx="40%" cy="35%"><stop offset="0%" stopColor={bg+'cc'}/><stop offset="100%" stopColor={bg}/></radialGradient></defs>
      <circle cx={cx} cy={cy} r={R+18} fill={bg} opacity=".9"/>
      <circle cx={cx} cy={cy} r={R+16} fill="none" stroke={ac} strokeWidth=".7" opacity=".6"/>
      {Array.from({length:60},(_,i)=>{const a=(i*6-90)*Math.PI/180,b=i%5===0;return<line key={i} x1={cx+(R+14)*Math.cos(a)} y1={cy+(R+14)*Math.sin(a)} x2={cx+(R+(b?5:10))*Math.cos(a)} y2={cy+(R+(b?5:10))*Math.sin(a)} stroke={ac} strokeWidth={b?1.4:.5} opacity={b?.75:.25}/>})}
      <circle cx={cx} cy={cy} r={R+4} fill="none" stroke="rgba(0,0,0,.85)" strokeWidth="4"/>
      <circle cx={cx} cy={cy} r={R} fill={`url(#d${w.id})`}/>
      {Array.from({length:12},(_,i)=>{const a=(i*30-90)*Math.PI/180,b=i%3===0;return<line key={i} x1={cx+(R-(b?5:7))*Math.cos(a)} y1={cy+(R-(b?5:7))*Math.sin(a)} x2={cx+(R-(b?16:13))*Math.cos(a)} y2={cy+(R-(b?16:13))*Math.sin(a)} stroke={ac} strokeWidth={b?2.2:.9} opacity={b?.9:.45}/>})}
      <text x={cx} y={cy-22} textAnchor="middle" fill={ac} fontSize="10" fontFamily={C.serif} fontWeight="500" letterSpacing="4" opacity=".85">TQ</text>
      <line x1={cx} y1={cy} x2={cx} y2={cy-R*.54} stroke={ac} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1={cx} y1={cy} x2={cx+R*.37} y2={cy} stroke={ac} strokeWidth="2" strokeLinecap="round" opacity=".8"/>
      <circle cx={cx} cy={cy} r="4.5" fill={ac}/><circle cx={cx} cy={cy} r="2" fill={bg}/>
    </svg>
  )
}

/* ═══════════════════════
   TICKER
═══════════════════════ */
function Ticker({ar}){
  const items=ar
    ?['✅ جودة مضمونة','🎁 هدية مع كل ساعة','💎 أسعار تنافسية','🔒 دفع آمن بالكامل','⭐ ساعات مختارة بعناية']
    :['✅ Quality Guaranteed','🎁 Gift with Every Watch','💎 Competitive Pricing','🔒 Fully Secure Payment','⭐ Carefully Curated Watches']
  const doubled=[...items,...items,...items]
  return(
    <div style={{background:`linear-gradient(90deg,${C.gold3},${C.gold},${C.gold3})`,overflow:'hidden',padding:'10px 0',borderTop:`1px solid ${C.gold}33`,borderBottom:`1px solid ${C.gold}33`}}>
      <div style={{display:'flex',gap:'4rem',animation:'ticker 28s linear infinite',whiteSpace:'nowrap'}}>
        {doubled.map((item,i)=>(
          <span key={i} style={{color:C.bg,fontSize:'13px',fontWeight:'600',fontFamily:ar?C.arabic:C.sans,flexShrink:0}}>{item}</span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════
   NAVBAR
═══════════════════════ */
function Navbar({cart,onCart,lang,toggleLang,onSearch}){
  const [scrolled,setScrolled]=useState(false)
  const [mobileOpen,setMobileOpen]=useState(false)
  const ar=lang==='ar'
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>50)
    window.addEventListener('scroll',fn)
    return()=>window.removeEventListener('scroll',fn)
  },[])
  const navBg=scrolled?'rgba(10,9,8,0.97)':'rgba(10,9,8,0.7)'
  const links=[
    {en:'Collections',ar:'المجموعة',href:'#collections'},
    {en:'Deals',ar:'العروض',href:'#deals'},
    {en:'Find My Watch',ar:'ساعتك المثالية',href:'#finder'},
    {en:'Why TQ',ar:'لماذا TQ',href:'#why'},
  ]
  return(
    <nav style={{position:'fixed',top:0,insetInline:0,zIndex:1000,backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',background:navBg,borderBottom:scrolled?`1px solid ${C.border}`:'1px solid transparent',transition:'all .4s ease',direction:ar?'rtl':'ltr'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:rs.navPad,transition:'padding .4s'}}>
        {/* Logo */}
        <a href="#top" style={{display:'flex',alignItems:'center',gap:'10px',flexShrink:0}}>
          <div style={{position:'relative'}}>
            <span style={{fontFamily:C.serif,fontSize:'clamp(1.6rem,4vw,2.2rem)',fontWeight:'700',color:C.gold,letterSpacing:'0.12em',lineHeight:1}}>TQ</span>
            <div style={{position:'absolute',bottom:'-3px',left:0,right:0,height:'2px',background:`linear-gradient(90deg,${C.gold},${C.gold2},${C.gold})`}}/>
          </div>
          <div style={{width:'1px',height:'28px',background:C.border,display:'none'}} className="nav-divider"/>
          <div style={{display:'none'}} className="nav-subtitle">
            <div style={{fontFamily:ar?C.arabic:C.sans,fontSize:'11px',fontWeight:'600',color:C.gray1}}>{ar?'متجر الساعات الفاخرة':'Luxury Watch Store'}</div>
            <div style={{fontSize:'10px',color:C.gold3,fontFamily:ar?C.arabic:C.sans,marginTop:'2px'}}>{ar?'اختر ساعتك المثالية':'Find Your Perfect Watch'}</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div style={{display:'flex',gap:'clamp(12px,2vw,32px)',alignItems:'center'}} className="desktop-nav">
          {links.map(l=>(
            <a key={l.en} href={l.href} style={{fontFamily:ar?C.arabic:C.sans,fontSize:'clamp(11px,1.2vw,13px)',fontWeight:'500',color:C.gray2,transition:'color .3s',textTransform:ar?'none':'uppercase',letterSpacing:ar?0:'0.06em'}}
              onMouseEnter={e=>e.target.style.color=C.gold2} onMouseLeave={e=>e.target.style.color=C.gray2}>
              {ar?l.ar:l.en}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          {/* Search icon */}
          <button onClick={onSearch} style={{width:'38px',height:'38px',border:`1px solid ${C.border}`,borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',color:C.gray2,transition:'all .3s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
          </button>
          {/* Lang */}
          <button onClick={toggleLang} style={{padding:'7px 12px',border:`1px solid ${C.border}`,borderRadius:'8px',fontFamily:ar?C.arabic:C.sans,fontSize:'12px',fontWeight:'600',color:C.gray1,transition:'all .3s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray1}}>
            {ar?'EN':'عربي'}
          </button>
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
          {/* Mobile hamburger */}
          <button onClick={()=>setMobileOpen(p=>!p)} className="mobile-menu-btn" style={{width:'38px',height:'38px',border:`1px solid ${C.border}`,borderRadius:'8px',display:'none',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'5px',color:C.gray2}}>
            <span style={{width:'16px',height:'2px',background:'currentColor',display:'block'}}/>
            <span style={{width:'16px',height:'2px',background:'currentColor',display:'block'}}/>
            <span style={{width:'16px',height:'2px',background:'currentColor',display:'block'}}/>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileOpen&&(
        <div style={{background:C.bg2,borderTop:`1px solid ${C.border}`,padding:'16px',direction:ar?'rtl':'ltr'}}>
          {links.map(l=>(
            <a key={l.en} href={l.href} onClick={()=>setMobileOpen(false)} style={{display:'block',padding:'12px 16px',fontFamily:ar?C.arabic:C.sans,fontSize:'15px',color:C.gray1,borderBottom:`1px solid ${C.border}20`}}>
              {ar?l.ar:l.en}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ═══════════════════════
   HERO
═══════════════════════ */
function Hero({ar}){
  const [vis,setVis]=useState(false)
  useEffect(()=>{const t=setTimeout(()=>setVis(true),120);return()=>clearTimeout(t)},[])
  return(
    <section id="top" style={{minHeight:'100vh',background:`radial-gradient(ellipse at 70% 50%,rgba(212,170,80,.07) 0%,transparent 60%),radial-gradient(ellipse at 30% 80%,rgba(212,170,80,.04) 0%,transparent 50%),${C.bg}`,padding:'80px clamp(16px,5vw,60px) 40px',overflow:'hidden',direction:ar?'rtl':'ltr',position:'relative'}}>
      <div style={{position:'absolute',inset:0,backgroundImage:`linear-gradient(${C.gold}08 1px,transparent 1px),linear-gradient(90deg,${C.gold}08 1px,transparent 1px)`,backgroundSize:'50px 50px',pointerEvents:'none'}}/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(320px,100%),1fr))',alignItems:'center',gap:'40px',maxWidth:'1300px',margin:'0 auto',minHeight:'calc(100vh - 120px)'}}>
        {/* Text */}
        <div style={{position:'relative',zIndex:1,opacity:vis?1:0,transform:vis?'none':'translateY(32px)',transition:'opacity .9s ease,transform .9s ease'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'6px 16px',border:`1px solid ${C.gold}50`,borderRadius:'100px',marginBottom:'24px',background:`${C.gold}10`}}>
            <div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.green,animation:'pulse-ring 1.5s infinite'}}/>
            <span style={{fontFamily:ar?C.arabic:C.sans,fontSize:'12px',fontWeight:'600',color:C.gold}}>{ar?'🟢 متاح الآن — مجموعة 2026':'🟢 Available Now — 2026 Collection'}</span>
          </div>
          <h1 style={{fontFamily:C.serif,fontSize:'clamp(2.2rem,5vw,5.2rem)',fontWeight:'700',lineHeight:1.08,color:C.white,marginBottom:'20px',letterSpacing:'-0.02em'}}>
            {ar?<><span style={{fontStyle:'italic',color:C.gold}}>ساعات</span>{' '}استثنائية<br/>لأصحاب الذوق الرفيع</>:<>Exceptional<br/><span style={{fontStyle:'italic',color:C.gold}}>Timepieces</span><br/>For Discerning Taste</>}
          </h1>
          <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'clamp(14px,2vw,16px)',color:C.gray2,lineHeight:1.8,maxWidth:'420px',marginBottom:'32px'}}>
            {ar?'اكتشف مجموعة مميزة من الساعات الأنيقة بعناية وجودة عالية تناسب جميع الأذواق.':'Discover a curated collection of stylish, high-quality watches crafted to suit every taste.'}
          </p>
          <div style={{display:'flex',gap:'12px',flexWrap:'wrap',flexDirection:ar?'row-reverse':'row',justifyContent:ar?'flex-end':'flex-start'}}>
            <a href="#collections">
              <button style={{padding:'13px 28px',background:`linear-gradient(135deg,${C.gold3},${C.gold},${C.gold2})`,color:C.bg,fontFamily:ar?C.arabic:C.sans,fontSize:'14px',fontWeight:'700',borderRadius:'8px',boxShadow:`0 8px 32px ${C.gold}40`,transition:'all .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 12px 40px ${C.gold}60`}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 8px 32px ${C.gold}40`}}>
                {ar?'🛍 تصفح المجموعة':'🛍 Shop Collection'}
              </button>
            </a>
            <a href="#finder">
              <button style={{padding:'13px 24px',border:`1px solid ${C.border}`,color:C.gray1,fontFamily:ar?C.arabic:C.sans,fontSize:'14px',fontWeight:'500',borderRadius:'8px',transition:'all .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray1}}>
                {ar?'🎯 ساعتك المثالية':'🎯 Find Your Watch'}
              </button>
            </a>
          </div>
        </div>
        {/* Clock */}
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative',opacity:vis?1:0,transform:vis?'none':'scale(.88)',transition:'opacity 1.2s ease .3s,transform 1.2s ease .3s'}}>
          <div style={{position:'absolute',width:'min(500px,90vw)',height:'min(500px,90vw)',background:`radial-gradient(circle,${C.gold}0d 0%,transparent 70%)`,borderRadius:'50%',pointerEvents:'none'}}/>
          <LiveClock size={Math.min(420, typeof window!=='undefined'?window.innerWidth*.85:420)}/>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════
   WATCH CARD
═══════════════════════ */
function WatchCard({w,ar,onClick,onAdd,addedId,cartItems}){
  const [hov,setHov]=useState(false)
  const bs=BADGE_STYLE[w.badge]||{}
  const added=addedId===w.id
  const inCart=cartItems?.some(c=>c.id===w.id)
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?C.card2:C.card,border:`1px solid ${hov?C.borderHover:C.border}`,borderRadius:'12px',overflow:'hidden',transition:'all .35s cubic-bezier(.25,.46,.45,.94)',transform:hov?'translateY(-5px)':'none',boxShadow:hov?`0 20px 60px rgba(0,0,0,.6),0 0 0 1px ${C.gold}20`:'0 4px 20px rgba(0,0,0,.3)',cursor:'pointer',display:'flex',flexDirection:'column',direction:ar?'rtl':'ltr'}}>
      {/* Image — 4:5 */}
      <div onClick={()=>onClick(w)} style={{position:'relative',width:'100%',paddingBottom:'125%'}}>
        <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 50% 35%,${C.card2} 0%,${C.bg} 100%)`}}/>
        <div style={{position:'absolute',top:'12px',[ar?'left':'right']:'12px',zIndex:3,padding:'4px 11px',borderRadius:'100px',background:bs.bg||C.gold,color:bs.color||C.bg,fontSize:'11px',fontWeight:'700',fontFamily:ar?C.arabic:C.sans,boxShadow:'0 2px 8px rgba(0,0,0,.4)'}}>
          {ar?w.badgeAr:w.badge.toUpperCase()}
        </div>
        {w.discount>0&&<div style={{position:'absolute',top:'12px',[ar?'right':'left']:'12px',zIndex:3,background:C.red,color:'#fff',fontSize:'11px',fontWeight:'700',padding:'4px 9px',borderRadius:'4px',fontFamily:ar?C.arabic:C.sans}}>-{w.discount}%</div>}
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
          <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',transform:hov?'scale(1.07)':'scale(1)',transition:'transform .45s ease'}}>
            {w.img
              ?<img src={w.img} alt={ar?w.nameAr:w.name} style={{maxWidth:'85%',maxHeight:'85%',width:'auto',height:'auto',objectFit:'contain',objectPosition:'center',filter:'drop-shadow(0 16px 36px rgba(0,0,0,.65))'}}/>
              :<MiniWatch w={w} size={190}/>
            }
          </div>
        </div>
        {inCart&&<div style={{position:'absolute',bottom:'12px',[ar?'right':'left']:'12px',zIndex:3,background:C.green,color:'#fff',fontSize:'10px',fontWeight:'700',padding:'3px 9px',borderRadius:'100px',fontFamily:ar?C.arabic:C.sans}}>{ar?'في السلة':'In Cart'}</div>}
      </div>
      {/* Info */}
      <div onClick={()=>onClick(w)} style={{padding:'16px 16px 0',flex:1}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'5px',flexDirection:ar?'row-reverse':'row'}}>
          <span style={{fontFamily:ar?C.arabic:C.sans,fontSize:'11px',fontWeight:'700',color:C.gold3,textTransform:ar?'none':'uppercase',letterSpacing:ar?0:'0.1em'}}>{w.brand}</span>
        </div>
        <h3 style={{fontFamily:C.serif,fontSize:'clamp(1.05rem,2.5vw,1.2rem)',fontWeight:'600',color:C.white,marginBottom:'7px',lineHeight:1.2}}>{ar?w.nameAr:w.name}</h3>
        <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'13px',color:C.gray2,lineHeight:1.6,marginBottom:'10px'}}>{(ar?w.descAr:w.desc).slice(0,80)}…</p>
      </div>
      {/* Price + CTA */}
      <div style={{padding:'12px 16px 16px',borderTop:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:ar?'row-reverse':'row'}}>
        <div style={{textAlign:ar?'right':'left'}}>
          <div style={{fontFamily:C.sans,fontSize:'clamp(15px,2.5vw,19px)',fontWeight:'700',color:C.gold,lineHeight:1}}>{fmtPrice(w.price)}</div>
          {w.discount>0&&<div style={{fontFamily:C.sans,fontSize:'11px',color:C.gray3,textDecoration:'line-through',marginTop:'2px'}}>{fmtPrice(w.original)}</div>}
        </div>
        <div style={{display:'flex',gap:'6px'}}>
          <button onClick={e=>{e.stopPropagation();onAdd(w)}} style={{padding:'8px 14px',background:inCart?C.card2:added?C.green:`linear-gradient(135deg,${C.gold3},${C.gold})`,color:added||inCart?C.gold:'#0a0908',fontFamily:ar?C.arabic:C.sans,fontSize:'12px',fontWeight:'700',borderRadius:'6px',transition:'all .3s',border:inCart?`1px solid ${C.gold}`:' none'}}>
            {inCart?(ar?'✓ بالسلة':'✓ In Cart'):added?(ar?'✓ أُضيف':'✓ Added'):(ar?'+ سلة':'+ Cart')}
          </button>
          <button onClick={e=>{e.stopPropagation();onClick(w)}} style={{width:'34px',height:'34px',border:`1px solid ${C.border}`,borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',color:C.gray2,transition:'all .3s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2}}>
            👁
          </button>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════
   SECTION HEADER helper
═══════════════════════ */
function SectionHeader({icon,label,labelAr,title,titleAr,sub,subAr,ar,accentColor}){
  const col=accentColor||C.gold
  return(
    <div style={{textAlign:'center',marginBottom:'clamp(32px,5vw,60px)'}}>
      {label&&<div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'5px 18px',border:`1px solid ${col}40`,borderRadius:'100px',marginBottom:'14px',background:`${col}0a`}}>
        {icon&&<span style={{fontSize:'15px'}}>{icon}</span>}
        <span style={{fontFamily:ar?C.arabic:C.sans,fontSize:'12px',fontWeight:'700',color:col,letterSpacing:ar?0:'0.15em',textTransform:ar?'none':'uppercase'}}>{ar?labelAr:label}</span>
      </div>}
      <h2 style={{fontFamily:C.serif,fontSize:'clamp(1.6rem,4vw,3.2rem)',fontWeight:'700',color:C.white,marginBottom:'12px'}}>
        {ar?titleAr:title}
      </h2>
      {sub&&<p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'clamp(13px,2vw,16px)',color:C.gray2,maxWidth:'520px',margin:'0 auto'}}>{ar?subAr:sub}</p>}
    </div>
  )
}

/* ═══════════════════════
   COLLECTIONS
═══════════════════════ */
function Collections({ar,onWatch,onAdd,addedId,cartItems}){
  const [ref,vis]=useInView()
  return(
    <section id="collections" ref={ref} style={{padding:rs.sectionPad,background:C.bg2,direction:ar?'rtl':'ltr'}}>
      <SectionHeader icon="🛍" label="Browse All" labelAr="تصفح الكل"
        title={<>Our <span style={{fontStyle:'italic',color:C.gold}}>Curated</span> Collection</>}
        titleAr={<>مجموعتنا <span style={{fontStyle:'italic',color:C.gold}}>الحصرية</span></>}
        sub="A carefully curated selection — classic timepieces of the highest precision and elegance"
        subAr="مجموعة مختارة — ساعات كلاسيكية بأرقى مستويات الدقة والأناقة"
        ar={ar} vis={vis}/>
      <div style={rs.cardGrid}>
        {WATCHES.map((w,i)=>(
          <div key={w.id} style={{opacity:vis?1:0,transform:vis?'none':'translateY(24px)',transition:`opacity .6s ease ${i*.05}s,transform .6s ease ${i*.05}s`}}>
            <WatchCard w={w} ar={ar} onClick={onWatch} onAdd={onAdd} addedId={addedId} cartItems={cartItems}/>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════
   WATCH FINDER
═══════════════════════ */
function WatchFinder({ar,onWatch}){
  const [ref,vis]=useInView()
  const [step,setStep]=useState(0)
  const [budget,setBudget]=useState(null)
  const [style,setStyle]=useState(null)
  const [use,setUse]=useState(null)
  const budgets=[
    {key:'entry',label:ar?'أقل من 350EGP':'Under 350EGP',max:350},
    {key:'mid',label:ar?'350 – 450 EGP':'350–450 EGP',min:350,max:450},
    {key:'high',label:ar?'450 – 550 EGP':'450–550 EGP',min:450,max:550},
    {key:'ultra',label:ar?'فوق 550 EGP':'Above 550 EGP',min:550},
  ]
  const styles=[
    {key:'minimal',label:ar?'بسيط وأنيق':'Minimal & Elegant',icon:'🖤',cats:['Simple','Classic']},
    {key:'bold',label:ar?'جريء وعصري':'Bold & Modern',icon:'⚡',cats:['Unique to own']},
    {key:'classic',label:ar?'كلاسيك':'Classic & Timeless',icon:'👑',cats:['Classic']},
    {key:'sport',label:ar?'عملي ويومي':'Practical & Daily',icon:'☀️',cats:['Practical','Simple']},
  ]
  const uses=[
    {key:'daily',label:ar?'يومي':'Daily Wear',icon:'☀️'},
    {key:'formal',label:ar?'مناسبات':'Events',icon:'🎩'},
    {key:'gift',label:ar?'هدية':'As a Gift',icon:'🎁'},
    {key:'collect',label:ar?'للاقتناء':'Collecting',icon:'💎'},
  ]
  const getResults=()=>{
    let pool=[...WATCHES]
    if(budget){const b=budgets.find(x=>x.key===budget);pool=pool.filter(w=>(!b.min||w.price>=b.min)&&(!b.max||w.price<=b.max))}
    if(style){const cats=styles.find(x=>x.key===style)?.cats||[];const s=pool.filter(w=>cats.includes(w.category));if(s.length>0)pool=s}
    if(use==='formal'){const f=pool.filter(w=>['Classic','Unique to own'].includes(w.category));if(f.length)pool=f}
    if(use==='collect'){const f=pool.filter(w=>w.exclusive);if(f.length)pool=f}
    return pool.sort((a,b)=>(b.hot?2:0)+b.discount-((a.hot?2:0)+a.discount)).slice(0,3)
  }
  const reset=()=>{setStep(0);setBudget(null);setStyle(null);setUse(null)}
  const btn=(label,icon,sel,onClick)=>(
    <button onClick={onClick} style={{padding:'13px 16px',border:`1.5px solid ${sel?C.gold:C.border}`,borderRadius:'10px',background:sel?`${C.gold}18`:C.card,color:sel?C.gold:C.gray2,fontFamily:ar?C.arabic:C.sans,fontSize:'clamp(13px,2vw,14px)',fontWeight:sel?'700':'400',display:'flex',alignItems:'center',gap:'10px',transition:'all .25s',textAlign:ar?'right':'left',flexDirection:ar?'row-reverse':'row',boxShadow:sel?`0 0 0 1px ${C.gold}40,0 4px 20px ${C.gold}20`:''}}
      onMouseEnter={e=>{if(!sel){e.currentTarget.style.borderColor=C.borderHover;e.currentTarget.style.color=C.gray1}}}
      onMouseLeave={e=>{if(!sel){e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2}}}>
      <span style={{fontSize:'20px'}}>{icon}</span><span>{label}</span>
      {sel&&<span style={{marginLeft:ar?0:'auto',marginRight:ar?'auto':0,color:C.gold}}>✓</span>}
    </button>
  )
  const results=step===3?getResults():[]
  return(
    <section id="finder" ref={ref} style={{padding:rs.sectionPad,background:`linear-gradient(180deg,${C.bg} 0%,${C.bg2} 100%)`,direction:ar?'rtl':'ltr',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'30%',left:'50%',transform:'translateX(-50%)',width:'min(700px,100vw)',height:'min(700px,100vw)',background:`radial-gradient(circle,${C.gold}07 0%,transparent 70%)`,borderRadius:'50%',pointerEvents:'none'}}/>
      <SectionHeader icon="🎯" label="Watch Finder" labelAr="اكتشف ساعتك"
        title={<>Find Your <span style={{fontStyle:'italic',color:C.gold}}>Perfect Watch</span></>}
        titleAr={<><span style={{fontStyle:'italic',color:C.gold}}>الساعة المثالية</span> تنتظرك</>}
        sub="Answer 3 quick questions and we'll find your perfect match"
        subAr="3 أسئلة بس وهنلاقيلك الساعة اللي تناسبك تماماً"
        ar={ar}/>
      <div style={{maxWidth:'680px',margin:'0 auto',background:C.card,border:`1px solid ${C.border}`,borderRadius:'20px',overflow:'hidden',opacity:vis?1:0,transition:'opacity .7s .2s',boxShadow:`0 20px 60px rgba(0,0,0,.4)`}}>
        {step<3&&<div style={{height:'4px',background:C.bg2}}><div style={{height:'100%',width:`${((step+1)/3)*100}%`,background:`linear-gradient(90deg,${C.gold3},${C.gold2})`,transition:'width .5s ease',borderRadius:'2px'}}/></div>}
        <div style={{padding:'clamp(20px,5vw,36px) clamp(16px,5vw,40px)'}}>
          {step===0&&(
            <>
              <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'12px',color:C.gold,textTransform:ar?'none':'uppercase',letterSpacing:ar?0:'0.12em',marginBottom:'8px'}}>{ar?'السؤال 1 من 3':'Step 1 of 3'}</p>
              <h3 style={{fontFamily:C.serif,fontSize:'clamp(1.3rem,3vw,1.7rem)',fontWeight:'700',color:C.white,marginBottom:'24px'}}>{ar?'ما هي ميزانيتك؟':'What\'s your budget?'}</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(200px,100%),1fr))',gap:'10px',marginBottom:'24px'}}>
                {budgets.map(b=>btn(b.label,'💰',budget===b.key,()=>setBudget(b.key)))}
              </div>
              <button onClick={()=>{if(budget)setStep(1)}} disabled={!budget} style={{width:'100%',padding:'13px',background:budget?`linear-gradient(135deg,${C.gold3},${C.gold})`:C.card2,color:budget?C.bg:C.gray3,fontFamily:ar?C.arabic:C.sans,fontSize:'15px',fontWeight:'700',borderRadius:'10px',transition:'all .3s',cursor:budget?'pointer':'not-allowed'}}>
                {ar?'التالي ←':'Next →'}
              </button>
            </>
          )}
          {step===1&&(
            <>
              <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'12px',color:C.gold,textTransform:ar?'none':'uppercase',marginBottom:'8px'}}>{ar?'السؤال 2 من 3':'Step 2 of 3'}</p>
              <h3 style={{fontFamily:C.serif,fontSize:'clamp(1.3rem,3vw,1.7rem)',fontWeight:'700',color:C.white,marginBottom:'24px'}}>{ar?'إيه أسلوبك؟':'What\'s your style?'}</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(200px,100%),1fr))',gap:'10px',marginBottom:'24px'}}>
                {styles.map(s=>btn(s.label,s.icon,style===s.key,()=>setStyle(s.key)))}
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>setStep(0)} style={{flex:1,padding:'12px',border:`1px solid ${C.border}`,borderRadius:'10px',color:C.gray2,fontFamily:ar?C.arabic:C.sans,fontSize:'14px',transition:'all .3s'}}>{ar?'← رجوع':'← Back'}</button>
                <button onClick={()=>{if(style)setStep(2)}} disabled={!style} style={{flex:2,padding:'12px',background:style?`linear-gradient(135deg,${C.gold3},${C.gold})`:C.card2,color:style?C.bg:C.gray3,fontFamily:ar?C.arabic:C.sans,fontSize:'15px',fontWeight:'700',borderRadius:'10px',transition:'all .3s',cursor:style?'pointer':'not-allowed'}}>{ar?'التالي ←':'Next →'}</button>
              </div>
            </>
          )}
          {step===2&&(
            <>
              <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'12px',color:C.gold,textTransform:ar?'none':'uppercase',marginBottom:'8px'}}>{ar?'السؤال 3 من 3':'Step 3 of 3'}</p>
              <h3 style={{fontFamily:C.serif,fontSize:'clamp(1.3rem,3vw,1.7rem)',fontWeight:'700',color:C.white,marginBottom:'24px'}}>{ar?'هتستخدم الساعة إزاي؟':'How will you wear it?'}</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(200px,100%),1fr))',gap:'10px',marginBottom:'24px'}}>
                {uses.map(u=>btn(u.label,u.icon,use===u.key,()=>setUse(u.key)))}
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>setStep(1)} style={{flex:1,padding:'12px',border:`1px solid ${C.border}`,borderRadius:'10px',color:C.gray2,fontFamily:ar?C.arabic:C.sans,fontSize:'14px',transition:'all .3s'}}>{ar?'← رجوع':'← Back'}</button>
                <button onClick={()=>{if(use)setStep(3)}} disabled={!use} style={{flex:2,padding:'12px',background:use?`linear-gradient(135deg,${C.gold3},${C.gold})`:C.card2,color:use?C.bg:C.gray3,fontFamily:ar?C.arabic:C.sans,fontSize:'15px',fontWeight:'700',borderRadius:'10px',transition:'all .3s',cursor:use?'pointer':'not-allowed'}}>{ar?'🎯 اعرض ساعاتي المقترحة':'🎯 Show My Matches'}</button>
              </div>
            </>
          )}
          {step===3&&(
            <>
              <div style={{textAlign:'center',marginBottom:'24px'}}>
                <div style={{fontSize:'2.5rem',marginBottom:'10px'}}>🎯</div>
                <h3 style={{fontFamily:C.serif,fontSize:'clamp(1.2rem,3vw,1.6rem)',fontWeight:'700',color:C.white,marginBottom:'8px'}}>{ar?'الساعات المناسبة لك':'Your Perfect Matches'}</h3>
                <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'14px',color:C.gray2}}>{ar?`بناءً على ميزانيتك وذوقك، دي أفضل ${results.length} ساعات ليك`:`Based on your preferences, here are your top ${results.length} matches`}</p>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'24px'}}>
                {results.length===0?<div style={{textAlign:'center',padding:'24px',color:C.gray2,fontFamily:ar?C.arabic:C.sans}}>{ar?'مفيش ساعات في الميزانية دي حالياً':'No watches in this range currently'}</div>
                :results.map((w,idx)=>(
                  <button key={w.id} onClick={()=>onWatch(w)} style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px 16px',background:C.card2,border:`1px solid ${idx===0?C.gold:C.border}`,borderRadius:'12px',transition:'all .25s',textAlign:ar?'right':'left',flexDirection:ar?'row-reverse':'row',position:'relative',overflow:'hidden'}}
                    onMouseEnter={e=>{e.currentTarget.style.background=C.bg2;e.currentTarget.style.borderColor=C.gold}}
                    onMouseLeave={e=>{e.currentTarget.style.background=C.card2;e.currentTarget.style.borderColor=idx===0?C.gold:C.border}}>
                    {idx===0&&<div style={{position:'absolute',top:'8px',[ar?'left':'right']:'12px',padding:'3px 10px',background:`linear-gradient(135deg,${C.gold3},${C.gold})`,borderRadius:'100px',fontSize:'11px',fontWeight:'700',color:C.bg,fontFamily:ar?C.arabic:C.sans}}>{ar?'⭐ الأنسب ليك':'⭐ Best Match'}</div>}
                    <div style={{width:'64px',height:'64px',background:C.bg,borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,border:`1px solid ${C.border}`}}>
                      {w.img?<img src={w.img} alt="" style={{width:'56px',height:'56px',objectFit:'contain'}}/>:<MiniWatch w={w} size={60}/>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:ar?C.arabic:C.sans,fontSize:'11px',color:C.gold3,fontWeight:'700',marginBottom:'2px'}}>{w.brand}</div>
                      <div style={{fontFamily:C.serif,fontSize:'15px',fontWeight:'700',color:C.white,marginBottom:'4px'}}>{ar?w.nameAr:w.name}</div>
                      <div style={{display:'flex',gap:'8px',alignItems:'center',flexDirection:ar?'row-reverse':'row'}}>
                        <span style={{fontFamily:C.sans,fontSize:'15px',fontWeight:'700',color:C.gold}}>{fmtPrice(w.price)}</span>
                        {w.discount>0&&<span style={{fontSize:'11px',color:C.red,fontWeight:'700'}}>-{w.discount}%</span>}
                      </div>
                    </div>
                    <span style={{color:C.gold,fontSize:'18px',flexShrink:0}}>{ar?'←':'→'}</span>
                  </button>
                ))}
              </div>
              <button onClick={reset} style={{width:'100%',padding:'12px',border:`1px solid ${C.border}`,borderRadius:'10px',color:C.gray2,fontFamily:ar?C.arabic:C.sans,fontSize:'14px',transition:'all .3s'}}
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

/* ═══════════════════════
   DEALS
═══════════════════════ */
function DealsSection({ar,onWatch,onAdd,addedId,cartItems}){
  const [ref,vis]=useInView()
  const deals=WATCHES.filter(w=>w.badge==='deal'||w.discount>=20)
  const maxDiscount=Math.max(...deals.map(w=>w.discount))
  return(
    <section id="deals" ref={ref} style={{padding:rs.sectionPad,background:`linear-gradient(180deg,${C.bg2} 0%,${C.bg} 100%)`,direction:ar?'rtl':'ltr'}}>
      <div style={{opacity:vis?1:0,transition:'opacity .7s'}}>
        {/* Header — centered */}
        <div id='Exclusive Deals' style={{textAlign:'center',marginBottom:'clamp(32px,5vw,48px)'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'5px 16px',border:`1px solid ${C.red}50`,borderRadius:'100px',marginBottom:'14px',background:`${C.red}12`}}>
            <span style={{fontSize:'16px'}}>🔥</span>
            <span style={{fontFamily:ar?C.arabic:C.sans,fontSize:'12px',fontWeight:'700',color:C.red,letterSpacing:ar?0:'0.15em',textTransform:ar?'none':'uppercase'}}>{ar?'عروض محدودة':'Limited Time Deals'}</span>
          </div>
          <h2 style={{fontFamily:C.serif,fontSize:'clamp(1.6rem,4vw,3rem)',fontWeight:'700',color:C.white,marginBottom:'12px'}}>
            {ar?<>عروض <span style={{fontStyle:'italic',color:C.red}}>حصرية</span> الآن</>:<>Exclusive <span style={{fontStyle:'italic',color:C.red}}>Deals</span> Live Now</>}
          </h2>
          <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'clamp(13px,2vw,15px)',color:C.gray2}}>
            {ar?`خصم يصل إلى ${maxDiscount}% على قطع مختارة — لفترة محدودة`:`Up to ${maxDiscount}% off on selected pieces — for a limited time`}
          </p>
        </div>
      </div>
      <div style={rs.cardGrid}>
        {deals.map((w,i)=>(
          <div key={w.id} style={{opacity:vis?1:0,transform:vis?'none':'translateY(24px)',transition:`opacity .6s ease ${i*.07}s,transform .6s ease ${i*.07}s`}}>
            <WatchCard w={w} ar={ar} onClick={onWatch} onAdd={onAdd} addedId={addedId} cartItems={cartItems}/>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════
   HOT SECTION
═══════════════════════ */
function HotSection({ar,onWatch,onAdd,addedId,cartItems}){
  const [ref,vis]=useInView()
  const hot=WATCHES.filter(w=>w.hot)
  return(
    <section id="hot"  ref={ref} style={{padding:rs.sectionPad,background:C.bg2,direction:ar?'rtl':'ltr'}}>
      <SectionHeader   icon="⚡" label="Most Wanted" labelAr="الأكثر طلباً"
        title={<>The <span style={{fontStyle:'italic',color:C.gold}}>Most Wanted</span> Watches</>}
        titleAr={<>الساعات <span style={{fontStyle:'italic',color:C.gold}}>الأكثر طلباً</span></>}
        sub="Our best-selling and most requested pieces" subAr="الساعات الأكثر مبيعاً وطلباً" ar={ar}/>
      <div  style={rs.cardGrid}>
        {hot.map((w,i)=>(
          <div key={w.id} style={{opacity:vis?1:0,transform:vis?'none':'translateY(22px)',transition:`opacity .55s ease ${i*.08}s,transform .55s ease ${i*.08}s`}}>
            <WatchCard w={w} ar={ar} onClick={onWatch} onAdd={onAdd} addedId={addedId} cartItems={cartItems}/>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════
   WHY TQ
═══════════════════════ */
function WhyTQ({ar}){
  const [ref,vis]=useInView()
  const items=[
    {icon:'💱',en:'Easy Trade-In',ar:'استبدال سهل',enD:'Trade your current watch toward a new one. Fair valuations, simple process.',arD:'استبدل ساعتك الحالية بساعة جديدة بتقييم عادل وعملية بسيطة.'},
    {icon:'📦',en:'Premium Packaging',ar:'تغليف فاخر',enD:'Every order ships in a premium presentation box that reflects the quality inside.',arD:'كل طلب يُشحن في علبة عرض فاخرة تعكس قيمة ما بداخلها.'},
    {icon:'💬',en:'Personal Consultation',ar:'استشارة شخصية',enD:'Not sure which watch suits you? Our team will guide you to the perfect choice.',arD:'مش عارف أنسب ساعة ليك؟ فريقنا هيساعدك تلاقي الاختيار المثالي.'},
    {icon:'🔄',en:'Easy Returns',ar:'إرجاع سهل',enD:'Changed your mind? Simple return process within 7 days of receiving your order.',arD:'غيّرت رأيك؟ لا مشكلة. عملية إرجاع بسيطة خلال 7 أيام من استلام طلبك.'},
  ]
  return(
    <section id="why" ref={ref} style={{padding:rs.sectionPad,background:C.bg,direction:ar?'rtl':'ltr'}}>
      <SectionHeader
        title={<>Why Choose <span style={{fontStyle:'italic',color:C.gold}}>TQ?</span></>}
        titleAr={<>لماذا تختار <span style={{fontStyle:'italic',color:C.gold}}>TQ؟</span></>}
        sub="A different shopping experience — simple, transparent, and respectful of your time"
        subAr="تجربة تسوق مختلفة — بسيطة، شفافة، ومحترمة لوقتك" ar={ar}/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(260px,100%),1fr))',gap:'20px',marginBottom:'clamp(40px,6vw,64px)'}}>
        {items.map((item,i)=>(
          <div key={item.en} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:'12px',padding:'clamp(20px,4vw,32px)',opacity:vis?1:0,transform:vis?'none':'translateY(20px)',transition:`opacity .6s ease ${i*.1}s,transform .6s ease ${i*.1}s`}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.borderHover;e.currentTarget.style.background=C.card2}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.card}}>
            <div style={{fontSize:'2rem',marginBottom:'14px'}}>{item.icon}</div>
            <h3 style={{fontFamily:ar?C.arabic:C.sans,fontSize:'16px',fontWeight:'700',color:C.white,marginBottom:'10px'}}>{ar?item.ar:item.en}</h3>
            <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'14px',color:C.gray2,lineHeight:1.75}}>{ar?item.arD:item.enD}</p>
          </div>
        ))}
      </div>
      {/* CTA */}
      <div style={{padding:'clamp(24px,5vw,48px)',background:`linear-gradient(135deg,${C.card} 0%,${C.card2} 100%)`,border:`1px solid ${C.border}`,borderRadius:'16px',textAlign:'center',opacity:vis?1:0,transition:'opacity .7s .4s'}}>
        <h3 style={{fontFamily:C.serif,fontSize:'clamp(1.3rem,3vw,2.2rem)',fontWeight:'700',color:C.white,marginBottom:'12px'}}>
          {ar?<>مهتم بساعة معينة؟ <span style={{color:C.gold,fontStyle:'italic'}}>تواصل معنا</span></>:<>Interested? <span style={{color:C.gold,fontStyle:'italic'}}>Get in Touch</span></>}
        </h3>
        <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'15px',color:C.gray2,marginBottom:'28px',maxWidth:'480px',margin:'0 auto 28px'}}>
          {ar?'فريقنا مستعد للإجابة على كل أسئلتك.':'Our team is ready to answer all your questions.'}
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="https://wa.me/201117359755" target="_blank" rel="noreferrer">
            <button style={{padding:'12px 24px',background:'#25D366',color:'#fff',fontFamily:ar?C.arabic:C.sans,fontSize:'14px',fontWeight:'700',borderRadius:'8px',display:'flex',alignItems:'center',gap:'8px',transition:'opacity .3s'}}
              onMouseEnter={e=>e.currentTarget.style.opacity='.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
              <img src={whatsapp} alt="WhatsApp" style={{width:'18px',height:'18px'}}/>
              <span>{ar?'واتساب':'WhatsApp'}</span>
            </button>
          </a>
          <a href="mailto:mikelemel2@gmail.com">
            <button style={{padding:'12px 22px',border:`1px solid ${C.border}`,color:C.gray1,fontFamily:ar?C.arabic:C.sans,fontSize:'14px',fontWeight:'500',borderRadius:'8px',transition:'all .3s'}}
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

/* ═══════════════════════
   DETAIL PAGE
═══════════════════════ */
function WatchDetailPage({w,ar,onBack,onAdd,addedId}){
  const [tab,setTab]=useState('overview')
  const bs=BADGE_STYLE[w.badge]||{}
  const added=addedId===w.id
  return(
    <div style={{minHeight:'100vh',background:C.bg,paddingTop:'80px',direction:ar?'rtl':'ltr'}}>
      {/* Breadcrumb */}
      <div style={{padding:`14px clamp(16px,5vw,60px)`,borderBottom:`1px solid ${C.border}`,background:C.bg2,display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap'}}>
        <button onClick={onBack} style={{fontFamily:ar?C.arabic:C.sans,fontSize:'13px',color:C.gray2,transition:'color .3s'}}
          onMouseEnter={e=>e.currentTarget.style.color=C.gold} onMouseLeave={e=>e.currentTarget.style.color=C.gray2}>
          {ar?'→':'←'} {ar?'العودة':'Back'}
        </button>
        <span style={{color:C.gray3}}>·</span>
        <span style={{fontFamily:ar?C.arabic:C.sans,fontSize:'13px',color:C.gray3}}>{w.brand}</span>
        <span style={{color:C.gray3}}>·</span>
        <span style={{fontFamily:C.serif,fontSize:'13px',color:C.gold}}>{ar?w.nameAr:w.name}</span>
      </div>
      {/* Content */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(320px,100%),1fr))',maxWidth:'1300px',margin:'0 auto',padding:`0 clamp(16px,5vw,60px)`}}>
        {/* Image */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'clamp(24px,5vw,60px) 20px',position:'sticky',top:'80px',height:'fit-content'}}>
          <div style={{position:'relative',width:'100%',maxWidth:'400px'}}>
            <div style={{position:'absolute',inset:'-40px',background:`radial-gradient(circle,${C.gold}0d 0%,transparent 70%)`,borderRadius:'50%',pointerEvents:'none'}}/>
            {w.img?<img src={w.img} alt={ar?w.nameAr:w.name} style={{width:'100%',height:'auto',aspectRatio:'4/5',objectFit:'contain',filter:'drop-shadow(0 30px 80px rgba(0,0,0,.7))',position:'relative',zIndex:1}}/>
              :<div style={{position:'relative',zIndex:1}}><MiniWatch w={w} size={320}/></div>}
            <div style={{position:'absolute',top:'-10px',[ar?'left':'right']:'-10px',padding:'6px 14px',borderRadius:'100px',background:bs.bg||C.gold,color:bs.color||C.bg,fontSize:'12px',fontWeight:'700',fontFamily:ar?C.arabic:C.sans,zIndex:2}}>
              {ar?w.badgeAr:w.badge.toUpperCase()}
            </div>
          </div>
        </div>
        {/* Info */}
        <div style={{padding:'clamp(20px,4vw,60px) clamp(16px,3vw,40px)'}}>
          <div style={{display:'flex',gap:'8px',marginBottom:'14px',flexWrap:'wrap',flexDirection:ar?'row-reverse':'row'}}>
            <span style={{padding:'4px 12px',border:`1px solid ${C.border}`,borderRadius:'100px',fontSize:'12px',color:C.gold,fontFamily:ar?C.arabic:C.sans}}>{ar?w.categoryAr:w.category}</span>
            <span style={{padding:'4px 12px',border:`1px solid ${C.border}`,borderRadius:'100px',fontSize:'12px',color:C.gray2,fontFamily:C.sans}}>{w.condition} · {w.year}</span>
            {w.discount>0&&<span style={{padding:'4px 12px',borderRadius:'100px',background:C.red,color:'#fff',fontSize:'12px',fontWeight:'700'}}>-{w.discount}%</span>}
          </div>
          <div style={{fontFamily:ar?C.arabic:C.sans,fontSize:'12px',fontWeight:'700',color:C.gold3,letterSpacing:ar?0:'0.1em',textTransform:ar?'none':'uppercase',marginBottom:'8px'}}>{w.brand}</div>
          <h1 style={{fontFamily:C.serif,fontSize:'clamp(1.6rem,4vw,2.8rem)',fontWeight:'700',color:C.white,lineHeight:1.15,marginBottom:'20px'}}>{ar?w.nameAr:w.name}</h1>
          <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'clamp(14px,2vw,16px)',color:C.gray1,lineHeight:1.85,marginBottom:'28px'}}>{ar?w.descAr:w.desc}</p>
          {/* Tabs */}
          <div style={{display:'flex',borderBottom:`1px solid ${C.border}`,marginBottom:'20px',flexDirection:ar?'row-reverse':'row'}}>
            {[{k:'overview',en:'Overview',ar:'نظرة عامة'},{k:'features',en:'Features',ar:'المميزات'}].map(t=>(
              <button key={t.k} onClick={()=>setTab(t.k)} style={{padding:'10px 18px',fontFamily:ar?C.arabic:C.sans,fontSize:'13px',fontWeight:'600',color:tab===t.k?C.gold:C.gray2,borderBottom:`2px solid ${tab===t.k?C.gold:'transparent'}`,marginBottom:'-1px',transition:'all .25s'}}>
                {ar?t.ar:t.en}
              </button>
            ))}
          </div>
          {tab==='overview'&&(
            <div>
              {[{l:ar?'الماركة':'Brand',v:w.brand},{l:ar?'وجه الساعة':'Dial',v:ar?w.dialAr:w.dial},{l:ar?'الحالة':'Condition',v:w.condition},{l:ar?'السنة':'Year',v:w.year}].map(row=>(
                <div key={row.l} style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:`1px solid ${C.border}25`,flexDirection:ar?'row-reverse':'row'}}>
                  <span style={{fontFamily:ar?C.arabic:C.sans,fontSize:'13px',color:C.gray3}}>{row.l}</span>
                  <span style={{fontFamily:ar?C.arabic:C.sans,fontSize:'14px',color:C.gray1,fontWeight:'500',textAlign:ar?'left':'right',maxWidth:'60%'}}>{row.v}</span>
                </div>
              ))}
            </div>
          )}
          {tab==='features'&&(
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {(ar?w.featAr:w.features).map(f=>(
                <div key={f} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',background:C.card,borderRadius:'8px',border:`1px solid ${C.border}`,flexDirection:ar?'row-reverse':'row'}}>
                  <span style={{color:C.gold,fontSize:'13px'}}>◆</span>
                  <span style={{fontFamily:ar?C.arabic:C.sans,fontSize:'14px',color:C.gray1,fontWeight:'500'}}>{f}</span>
                </div>
              ))}
            </div>
          )}
          {/* Price CTA */}
          <div style={{marginTop:'32px',padding:'clamp(16px,4vw,24px)',background:C.card,border:`1px solid ${C.border}`,borderRadius:'12px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',flexDirection:ar?'row-reverse':'row'}}>
              <div style={{textAlign:ar?'right':'left'}}>
                <div style={{fontFamily:ar?C.arabic:C.sans,fontSize:'12px',color:C.gray3,marginBottom:'4px'}}>{ar?'السعر':'Price'}</div>
                <div style={{fontFamily:C.sans,fontSize:'clamp(1.6rem,4vw,2.2rem)',fontWeight:'700',color:C.gold,lineHeight:1}}>{fmtPrice(w.price)}</div>
                {w.discount>0&&<div style={{fontSize:'13px',color:C.gray3,textDecoration:'line-through',marginTop:'4px'}}>{fmtPrice(w.original)} <span style={{color:C.green,textDecoration:'none',fontWeight:'700'}}>({ar?`وفّرت ${fmtPrice(w.original-w.price)}`:`Save ${fmtPrice(w.original-w.price)}`})</span></div>}
              </div>
              <div style={{textAlign:ar?'left':'right'}}><div style={{fontFamily:ar?C.arabic:C.sans,fontSize:'12px',color:C.green,fontWeight:'600'}}>✅ {ar?'متاح الآن':'In Stock'}</div></div>
            </div>
            <button onClick={()=>onAdd(w)} style={{width:'100%',padding:'14px',background:added?C.green:`linear-gradient(135deg,${C.gold3},${C.gold},${C.gold2})`,color:added?'#fff':C.bg,fontFamily:ar?C.arabic:C.sans,fontSize:'15px',fontWeight:'700',borderRadius:'8px',transition:'all .3s'}}>
              {added?(ar?'✓ تمت الإضافة':'✓ Added to Cart'):(ar?'🛍 أضف للسلة':'🛍 Add to Cart')}
            </button>
          </div>
          <div style={{display:'flex',justifyContent:'space-around',marginTop:'16px',padding:'14px',background:C.card2,borderRadius:'8px',border:`1px solid ${C.border}25`}}>
            {[{i:'🛡',l:ar?'مضمون':'Warranted'},{i:'🔒',l:ar?'دفع آمن':'Secure Pay'},{i:'↩',l:ar?'إرجاع':'Returns'}].map(b=>(
              <div key={b.l} style={{textAlign:'center'}}>
                <div style={{fontSize:'18px',marginBottom:'4px'}}>{b.i}</div>
                <div style={{fontFamily:ar?C.arabic:C.sans,fontSize:'11px',color:C.gray3}}>{b.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════
   CART + CHECKOUT
═══════════════════════ */
function CartAndCheckout({items,onClose,onRemove,ar}){
  const [step,setStep]=useState('cart')
  const [form,setForm]=useState({name:'',phone:'',email:'',country:'',notes:''})
  const [status,setStatus]=useState('idle')
  const total=items.reduce((s,i)=>s+i.price,0)
  const saved=items.reduce((s,i)=>s+(i.original-i.price),0)
  const handleChange=e=>setForm(p=>({...p,[e.target.name]:e.target.value}))
  const handleSubmit=async()=>{
    if(!form.name||!form.phone){setStatus('error');return}
    setStatus('sending')
    const watchList=items.map(w=>`• ${w.brand} ${w.name} (${w.nameAr}) — ${fmtPrice(w.price)}`).join('\n')
    const msg=['🛍 طلب جديد من متجر TQ','',`👤 الاسم: ${form.name}`,`📱 الهاتف: ${form.phone}`,`📧 الإيميل: ${form.email||'—'}`,`🌍 الدولة: ${form.country||'—'}`,'','⌚ الساعات المطلوبة:',watchList,'',`💰 الإجمالي: ${fmtPrice(total)}`,saved>0?`💚 توفير: ${fmtPrice(saved)}`:'','',`📝 ملاحظات: ${form.notes||'—'}`].filter(Boolean).join('\n')
    window.open(`https://wa.me/201117359755?text=${encodeURIComponent(msg)}`,'_blank')
    setTimeout(()=>window.open(`mailto:mikelemel2@gmail.com?subject=${encodeURIComponent(`طلب جديد TQ — ${form.name}`)}&body=${encodeURIComponent(msg)}`),800)
    setStatus('sent')
  }
  const inp=(name,ph,type='text')=>(
    <input name={name} type={type} placeholder={ph} value={form[name]} onChange={handleChange}
      style={{width:'100%',padding:'11px 14px',background:C.bg2,border:`1px solid ${status==='error'&&!form[name]&&(name==='name'||name==='phone')?C.red:C.border}`,borderRadius:'8px',color:C.white,fontFamily:ar?C.arabic:C.sans,fontSize:'14px',outline:'none',direction:ar?'rtl':'ltr',marginBottom:'10px',boxSizing:'border-box'}}
      onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.border}/>
  )
  return(
    <>
      <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.78)',backdropFilter:'blur(7px)',zIndex:1999}}/>
      <div style={{position:'fixed',top:0,right:0,bottom:0,width:'min(460px,100vw)',background:C.card,zIndex:2000,display:'flex',flexDirection:'column',borderLeft:`1px solid ${C.border}`,direction:ar?'rtl':'ltr',overflowX:'hidden'}}>
        {/* Header */}
        <div style={{padding:'18px 20px',borderBottom:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            {step==='form'&&<button onClick={()=>setStep('cart')} style={{color:C.gray2,fontSize:'20px',lineHeight:1,transition:'color .2s'}} onMouseEnter={e=>e.currentTarget.style.color=C.gold} onMouseLeave={e=>e.currentTarget.style.color=C.gray2}>{ar?'→':'←'}</button>}
            <div>
              <h3 style={{fontFamily:ar?C.arabic:C.sans,fontSize:'16px',fontWeight:'700',color:C.white,lineHeight:1}}>{step==='cart'?(ar?'سلة المشتريات':'Shopping Cart'):(ar?'تفاصيل الطلب':'Order Details')}</h3>
              <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'12px',color:C.gray3,marginTop:'2px'}}>{step==='cart'?`${items.length} ${ar?'قطعة':'item(s)'}`:ar?'خطوة أخيرة':'Last step'}</p>
            </div>
          </div>
          <button onClick={onClose} style={{width:'32px',height:'32px',border:`1px solid ${C.border}`,borderRadius:'50%',color:C.gray2,fontSize:'18px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .25s',flexShrink:0}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.red;e.currentTarget.style.color=C.red}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2}}>×</button>
        </div>
        <div style={{height:'3px',background:C.bg2,flexShrink:0}}>
          <div style={{height:'100%',width:step==='cart'?'50%':status==='sent'?'100%':'75%',background:`linear-gradient(90deg,${C.gold3},${C.gold})`,transition:'width .5s ease'}}/>
        </div>
        {/* Cart step */}
        {step==='cart'&&(
          <>
            <div style={{flex:1,overflowY:'auto',padding:'14px 20px'}}>
              {items.length===0?(
                <div style={{textAlign:'center',paddingTop:'60px'}}>
                  <div style={{fontSize:'3rem',marginBottom:'14px'}}>🛍</div>
                  <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'15px',color:C.gray2}}>{ar?'سلتك فارغة':'Your cart is empty'}</p>
                  <button onClick={onClose} style={{marginTop:'16px',padding:'10px 22px',border:`1px solid ${C.border}`,borderRadius:'8px',fontFamily:ar?C.arabic:C.sans,fontSize:'13px',color:C.gray1,transition:'all .2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray1}}>
                    {ar?'تصفح الساعات':'Browse Watches'}
                  </button>
                </div>
              ):items.map((item,i)=>(
                <div key={`${item.id}-${i}`} style={{display:'flex',gap:'12px',padding:'12px 0',borderBottom:`1px solid ${C.border}20`,flexDirection:ar?'row-reverse':'row',alignItems:'flex-start'}}>
                  <div style={{width:'60px',height:'75px',background:C.bg2,borderRadius:'8px',overflow:'hidden',flexShrink:0,border:`1px solid ${C.border}`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {item.img?<img src={item.img} alt="" style={{width:'100%',height:'100%',objectFit:'contain',padding:'4px'}}/>:<MiniWatch w={item} size={60}/>}
                  </div>
                  <div style={{flex:1,textAlign:ar?'right':'left'}}>
                    <div style={{fontFamily:ar?C.arabic:C.sans,fontSize:'11px',color:C.gold3,fontWeight:'700',marginBottom:'2px'}}>{item.brand}</div>
                    <div style={{fontFamily:C.serif,fontSize:'14px',fontWeight:'600',color:C.white,marginBottom:'4px',lineHeight:1.2}}>{ar?item.nameAr:item.name}</div>
                    <div style={{fontFamily:C.sans,fontSize:'14px',fontWeight:'700',color:C.gold}}>{fmtPrice(item.price)}</div>
                    {item.discount>0&&<div style={{fontFamily:C.sans,fontSize:'11px',color:C.green,marginTop:'2px'}}>وفّرت {fmtPrice(item.original-item.price)}</div>}
                  </div>
                  <button onClick={()=>onRemove(i)} style={{color:C.gray3,fontSize:'18px',lineHeight:1,padding:'2px',flexShrink:0,transition:'color .2s'}}
                    onMouseEnter={e=>e.currentTarget.style.color=C.red} onMouseLeave={e=>e.currentTarget.style.color=C.gray3}>×</button>
                </div>
              ))}
            </div>
            {items.length>0&&(
              <div style={{padding:'16px 20px',borderTop:`1px solid ${C.border}`,flexShrink:0}}>
                {saved>0&&<div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px',flexDirection:ar?'row-reverse':'row'}}>
                  <span style={{fontFamily:ar?C.arabic:C.sans,fontSize:'13px',color:C.green}}>{ar?'إجمالي التوفير':'Total Savings'}</span>
                  <span style={{fontFamily:C.sans,fontSize:'13px',fontWeight:'700',color:C.green}}>-{fmtPrice(saved)}</span>
                </div>}
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'14px',flexDirection:ar?'row-reverse':'row'}}>
                  <span style={{fontFamily:ar?C.arabic:C.sans,fontSize:'15px',fontWeight:'700',color:C.white}}>{ar?'الإجمالي':'Total'}</span>
                  <span style={{fontFamily:C.sans,fontSize:'20px',fontWeight:'700',color:C.gold}}>{fmtPrice(total)}</span>
                </div>
                <button onClick={()=>setStep('form')} style={{width:'100%',padding:'13px',background:`linear-gradient(135deg,${C.gold3},${C.gold},${C.gold2})`,color:C.bg,fontFamily:ar?C.arabic:C.sans,fontSize:'15px',fontWeight:'700',borderRadius:'8px',transition:'opacity .25s'}}
                  onMouseEnter={e=>e.currentTarget.style.opacity='.88'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                  {ar?'متابعة الطلب ←':'Proceed to Order →'}
                </button>
              </div>
            )}
          </>
        )}
        {/* Form step */}
        {step==='form'&&(
          <div style={{flex:1,overflowY:'auto',padding:'18px 20px'}}>
            {status==='sent'?(
              <div style={{textAlign:'center',paddingTop:'40px'}}>
                <div style={{fontSize:'4rem',marginBottom:'14px'}}>✅</div>
                <h3 style={{fontFamily:ar?C.arabic:C.sans,fontSize:'19px',fontWeight:'700',color:C.white,marginBottom:'10px'}}>{ar?'تم إرسال طلبك!':'Order Sent!'}</h3>
                <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'14px',color:C.gray2,lineHeight:1.75,marginBottom:'24px'}}>{ar?'وصل طلبك على واتساب والإيميل — هنتواصل معاك في أقرب وقت.':'Your order was sent via WhatsApp & Email — we\'ll contact you shortly.'}</p>
                <button onClick={onClose} style={{padding:'12px 28px',background:`linear-gradient(135deg,${C.gold3},${C.gold})`,color:C.bg,fontFamily:ar?C.arabic:C.sans,fontSize:'14px',fontWeight:'700',borderRadius:'8px'}}>
                  {ar?'رجوع للمتجر':'Back to Store'}
                </button>
              </div>
            ):(
              <>
                <div style={{background:C.bg2,borderRadius:'10px',padding:'14px',marginBottom:'16px',border:`1px solid ${C.border}20`}}>
                  <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'11px',color:C.gold,fontWeight:'700',marginBottom:'10px'}}>{ar?'ملخص الطلب':'Order Summary'}</p>
                  {items.map((item,i)=>(
                    <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:i<items.length-1?`1px solid ${C.border}15`:'none',flexDirection:ar?'row-reverse':'row'}}>
                      <span style={{fontFamily:C.serif,fontSize:'13px',color:C.white}}>{ar?item.nameAr:item.name}</span>
                      <span style={{fontFamily:C.sans,fontSize:'13px',fontWeight:'700',color:C.gold}}>{fmtPrice(item.price)}</span>
                    </div>
                  ))}
                  <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px',paddingTop:'10px',borderTop:`1px solid ${C.border}`,flexDirection:ar?'row-reverse':'row'}}>
                    <span style={{fontFamily:ar?C.arabic:C.sans,fontWeight:'700',color:C.white,fontSize:'14px'}}>{ar?'الإجمالي':'Total'}</span>
                    <span style={{fontFamily:C.sans,fontSize:'16px',fontWeight:'700',color:C.gold}}>{fmtPrice(total)}</span>
                  </div>
                </div>
                <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'13px',color:C.gray2,marginBottom:'14px',lineHeight:1.6}}>
                  {ar?'* الاسم والهاتف كافيين — هنتواصل معاك فوراً على واتساب':'* Name & phone are enough — we\'ll reach you on WhatsApp instantly'}
                </p>
                {inp('name',ar?'* الاسم الكامل':'* Full Name')}
                {inp('phone',ar?'* رقم الهاتف / واتساب':'* Phone / WhatsApp','tel')}
                {inp('email',ar?'الإيميل (اختياري)':'Email (optional)','email')}
                {inp('country',ar?'الدولة':'Country')}
                <textarea name="notes" placeholder={ar?'ملاحظات إضافية...':'Additional notes...'} value={form.notes} onChange={handleChange} rows={3}
                  style={{width:'100%',padding:'11px 14px',background:C.bg2,border:`1px solid ${C.border}`,borderRadius:'8px',color:C.white,fontFamily:ar?C.arabic:C.sans,fontSize:'14px',outline:'none',resize:'none',direction:ar?'rtl':'ltr',marginBottom:'14px',boxSizing:'border-box'}}
                  onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.border}/>
                {status==='error'&&<p style={{color:C.red,fontFamily:ar?C.arabic:C.sans,fontSize:'13px',marginBottom:'12px'}}>⚠ {ar?'من فضلك ادخل اسمك ورقم هاتفك':'Please enter your name and phone number'}</p>}
                <button onClick={handleSubmit} disabled={status==='sending'} style={{width:'100%',padding:'13px',background:status==='sending'?C.gray3:`linear-gradient(135deg,${C.gold3},${C.gold},${C.gold2})`,color:C.bg,fontFamily:ar?C.arabic:C.sans,fontSize:'15px',fontWeight:'700',borderRadius:'8px',transition:'all .3s',marginBottom:'10px',opacity:status==='sending'?.7:1}}>
                  {status==='sending'?(ar?'جاري الإرسال...':'Sending...'):(ar?'📤 أرسل الطلب على واتساب':'📤 Send via WhatsApp')}
                </button>
                <p style={{textAlign:'center',fontFamily:ar?C.arabic:C.sans,fontSize:'11px',color:C.gray3}}>{ar?'هيتبعت على واتساب والإيميل تلقائياً':'Will be sent to WhatsApp & Email automatically'}</p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}

/* ═══════════════════════
   FOOTER
═══════════════════════ */
function Footer({ar}){
  const sections = [
  { en:'New Arrivals', ar:'وصل حديثاً', href:'#collections' },
  { en:'Best Sellers', ar:'الأكثر مبيعاً', href:'#hot' },
  { en:'Exclusive Deals', ar:'عروض حصرية', href:'#Exclusive Deals' },
];
  return(
    <footer style={{background:C.bg2,borderTop:`1px solid ${C.border}`,padding:'clamp(40px,7vw,80px) clamp(16px,5vw,60px) 32px',direction:ar?'rtl':'ltr'}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(220px,100%),1fr))',gap:'clamp(24px,4vw,48px)',marginBottom:'clamp(32px,5vw,56px)'}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'18px',flexDirection:ar?'row-reverse':'row',justifyContent:ar?'flex-end':'flex-start'}}>
            <span style={{fontFamily:C.serif,fontSize:'2.2rem',fontWeight:'700',color:C.gold,letterSpacing:'0.1em',lineHeight:1}}>TQ</span>
            <div style={{width:'1px',height:'28px',background:C.border}}/>
            <span style={{fontFamily:ar?C.arabic:C.sans,fontSize:'12px',fontWeight:'500',color:C.gray2}}>{ar?'متجر الساعات':'Watch Store'}</span>
          </div>
          <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'14px',color:C.gray2,lineHeight:1.85,maxWidth:'300px',marginBottom:'20px',textAlign:ar?'right':'left'}}>
            {ar?'متجر TQ — نقدم ساعات بتصميمات أنيقة وجودة ممتازة تناسب ذوقك اليومي.':'TQ Store — offering stylish watches with great quality that fit your daily look.'}
          </p>
          <div style={{display:'flex',gap:'10px',justifyContent:ar?'flex-end':'flex-start'}}>
            <button onClick={()=>window.open('https://wa.me/201117359755','_blank')} style={{width:'38px',height:'38px',border:`1px solid ${C.border}`,borderRadius:'8px',background:`url(${whatsapp}) center/60% no-repeat`,transition:'border-color .3s'}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}/>
            <button onClick={()=>window.open('#','_blank')} style={{width:'38px',height:'38px',border:`1px solid ${C.border}`,borderRadius:'8px',background:`url(${insta}) center/60% no-repeat`,transition:'border-color .3s'}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}/>
            <button onClick={()=>window.open('#','_blank')} style={{width:'38px',height:'38px',border:`1px solid ${C.border}`,borderRadius:'8px',background:`url(${face}) center/60% no-repeat`,transition:'border-color .3s'}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}/>
          </div>
        </div>
        
<div style={{textAlign:ar?'right':'left'}}>
  <h4 style={{
    fontFamily:ar?C.arabic:C.sans,
    fontSize:'13px',
    fontWeight:'700',
    color:C.gold,
    marginBottom:'16px'
  }}>
    {ar?'الأقسام':'Sections'}
  </h4>

  <ul style={{
    listStyle:'none',
    display:'flex',
    flexDirection:'column',
    gap:'10px'
  }}>
    {sections.map(l => (
      <li key={l.en}>
        <a
          href={l.href}
          style={{
            fontFamily:ar?C.arabic:C.sans,
            fontSize:'14px',
            color:C.gray2,
            transition:'color .25s'
          }}
          onMouseEnter={e=>e.target.style.color=C.gold2}
          onMouseLeave={e=>e.target.style.color=C.gray2}
        >
          {ar ? l.ar : l.en}
        </a>
      </li>
    ))}
  </ul>
</div>
        <div style={{textAlign:ar?'right':'left'}}>
          <h4 style={{fontFamily:ar?C.arabic:C.sans,fontSize:'13px',fontWeight:'700',color:C.gold,marginBottom:'16px'}}>{ar?'تواصل':'Contact'}</h4>
          <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
            <li style={{fontFamily:ar?C.arabic:C.sans,fontSize:'14px',color:C.gray2}}>WhatsApp: +20 1117359755</li>
            <li style={{fontFamily:ar?C.arabic:C.sans,fontSize:'14px',color:C.gray2}}>Email: mikelemel2@gmail.com</li>
          </ul>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px',borderTop:`1px solid ${C.border}25`,paddingTop:'20px',flexDirection:ar?'row-reverse':'row'}}>
        <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'13px',color:C.gray3}}>© 2026 TQ Watch Store · {ar?'كل الحقوق محفوظة':'All Rights Reserved'}</p>
      </div>
    </footer>
  )
}

/* ═══════════════════════
   SEARCH MODAL
═══════════════════════ */
function SearchModal({ar,onClose,onWatch}){
  const [q,setQ]=useState('')
  const inputRef=useRef(null)
  useEffect(()=>{
    inputRef.current?.focus()
    const fn=e=>{if(e.key==='Escape')onClose()}
    window.addEventListener('keydown',fn)
    return()=>window.removeEventListener('keydown',fn)
  },[onClose])

  const results=q.trim().length<2?[]:WATCHES.filter(w=>{
    const t=q.toLowerCase()
    return w.name.toLowerCase().includes(t)||w.nameAr.includes(q)||w.brand.toLowerCase().includes(t)||w.category.toLowerCase().includes(t)||w.categoryAr.includes(q)||String(w.price).includes(q)
  })

  // Quick suggestions — actual watches from the store
  const hotWatches=WATCHES.filter(w=>w.hot).slice(0,4)
  const dealWatches=WATCHES.filter(w=>w.badge==='deal').slice(0,2)
  const suggested=[...new Map([...hotWatches,...dealWatches].map(w=>[w.id,w])).values()].slice(0,6)

  return(
    <>
      <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.88)',backdropFilter:'blur(8px)',zIndex:2999}}/>
      <div style={{position:'fixed',top:0,left:0,right:0,zIndex:3000,padding:'16px clamp(16px,5vw,60px)',background:C.bg,borderBottom:`1px solid ${C.border}`,direction:ar?'rtl':'ltr'}}>
        <div style={{display:'flex',alignItems:'center',gap:'14px',maxWidth:'760px',margin:'0 auto'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
            <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
          </svg>
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)}
            placeholder={ar?'ابحث عن ساعة، براند...':'Search for a watch, brand...'}
            style={{flex:1,background:'transparent',border:'none',outline:'none',fontSize:'clamp(16px,3vw,22px)',fontFamily:ar?C.arabic:C.sans,color:C.white,fontWeight:'300',direction:ar?'rtl':'ltr',caretColor:C.gold}}/>
          <button onClick={onClose} style={{width:'34px',height:'34px',border:`1px solid ${C.border}`,borderRadius:'50%',color:C.gray2,fontSize:'18px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all .3s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.red;e.currentTarget.style.color=C.red}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray2}}>×</button>
        </div>
      </div>
      <div style={{position:'fixed',top:'70px',left:0,right:0,zIndex:3000,maxHeight:'calc(100vh - 80px)',overflowY:'auto',direction:ar?'rtl':'ltr'}}>
        <div style={{maxWidth:'760px',margin:'0 auto',padding:'16px clamp(16px,5vw,60px) 40px'}}>
          {/* Results */}
          {q.trim().length>=2&&(
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:'16px',overflow:'hidden',boxShadow:`0 20px 60px rgba(0,0,0,.6)`}}>
              {results.length===0?(
                <div style={{padding:'40px 32px',textAlign:'center'}}>
                  <div style={{fontSize:'2.5rem',marginBottom:'10px'}}>🔍</div>
                  <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'15px',color:C.gray2}}>{ar?`لا توجد نتائج لـ "${q}"`:`No results for "${q}"`}</p>
                </div>
              ):(
                <>
                  <div style={{padding:'12px 18px',borderBottom:`1px solid ${C.border}`,background:C.card2}}>
                    <span style={{fontFamily:ar?C.arabic:C.sans,fontSize:'12px',color:C.gold,fontWeight:'600'}}>{results.length} {ar?'نتيجة':'result(s)'}</span>
                  </div>
                  {results.map((w,i)=>(
                    <button key={w.id} onClick={()=>{onWatch(w);onClose()}}
                      style={{width:'100%',padding:'14px 18px',display:'flex',alignItems:'center',gap:'14px',borderBottom:i<results.length-1?`1px solid ${C.border}20`:'none',transition:'background .2s',direction:ar?'rtl':'ltr',textAlign:ar?'right':'left'}}
                      onMouseEnter={e=>e.currentTarget.style.background=C.card2}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <div style={{width:'52px',height:'52px',borderRadius:'8px',background:C.bg2,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,border:`1px solid ${C.border}`}}>
                        {w.img?<img src={w.img} alt="" style={{width:'44px',height:'44px',objectFit:'contain'}}/>:<MiniWatch w={w} size={48}/>}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:ar?C.arabic:C.sans,fontSize:'11px',color:C.gold3,fontWeight:'700',marginBottom:'2px'}}>{w.brand}</div>
                        <div style={{fontFamily:C.serif,fontSize:'15px',fontWeight:'600',color:C.white,marginBottom:'3px'}}>{ar?w.nameAr:w.name}</div>
                        <div style={{display:'flex',gap:'8px',alignItems:'center',flexDirection:ar?'row-reverse':'row'}}>
                          <span style={{fontFamily:C.sans,fontSize:'14px',fontWeight:'700',color:C.gold}}>{fmtPrice(w.price)}</span>
                          {w.discount>0&&<span style={{fontSize:'11px',background:C.red,color:'#fff',padding:'2px 6px',borderRadius:'4px',fontWeight:'700'}}>-{w.discount}%</span>}
                        </div>
                      </div>
                      <span style={{color:C.gold3,fontSize:'16px',flexShrink:0}}>{ar?'←':'→'}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
          {/* Suggestions — real watches */}
          {q.trim().length<2&&(
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:'16px',padding:'20px',boxShadow:`0 20px 60px rgba(0,0,0,.6)`}}>
              <p style={{fontFamily:ar?C.arabic:C.sans,fontSize:'12px',color:C.gold,fontWeight:'600',textTransform:ar?'none':'uppercase',letterSpacing:ar?0:'0.1em',marginBottom:'14px'}}>
                {ar?'⭐ الأكثر طلباً':'⭐ Most Wanted'}
              </p>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {suggested.map(w=>(
                  <button key={w.id} onClick={()=>{onWatch(w);onClose()}}
                    style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px 12px',borderRadius:'10px',border:`1px solid ${C.border}20`,background:'transparent',transition:'all .2s',direction:ar?'rtl':'ltr',textAlign:ar?'right':'left'}}
                    onMouseEnter={e=>{e.currentTarget.style.background=C.card2;e.currentTarget.style.borderColor=C.border}}
                    onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor=`${C.border}20`}}>
                    <div style={{width:'44px',height:'44px',borderRadius:'8px',background:C.bg2,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,border:`1px solid ${C.border}`}}>
                      {w.img?<img src={w.img} alt="" style={{width:'38px',height:'38px',objectFit:'contain'}}/>:<MiniWatch w={w} size={40}/>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:ar?C.arabic:C.sans,fontSize:'11px',color:C.gold3,fontWeight:'600',marginBottom:'2px'}}>{w.brand}</div>
                      <div style={{fontFamily:C.serif,fontSize:'14px',fontWeight:'600',color:C.white}}>{ar?w.nameAr:w.name}</div>
                    </div>
                    <div style={{textAlign:ar?'left':'right',flexShrink:0}}>
                      <div style={{fontFamily:C.sans,fontSize:'13px',fontWeight:'700',color:C.gold}}>{fmtPrice(w.price)}</div>
                      {w.discount>0&&<div style={{fontSize:'11px',color:C.red,fontWeight:'600'}}>-{w.discount}%</div>}
                    </div>
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

/* ═══════════════════════
   RESPONSIVE CSS
═══════════════════════ */
function GlobalStyles(){
  return(
    <style>{`
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:#0a0908;color:#faf8f2;font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
      a{color:inherit;text-decoration:none}
      button{cursor:pointer;border:none;background:none;font-family:inherit}
      img{display:block;max-width:100%}
      ::-webkit-scrollbar{width:5px}
      ::-webkit-scrollbar-track{background:#0a0908}
      ::-webkit-scrollbar-thumb{background:#a07828;border-radius:3px}
      ::selection{background:#d4aa50;color:#0a0908}
      @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes pulse-ring{0%{box-shadow:0 0 0 0 rgba(39,174,96,.5)}100%{box-shadow:0 0 0 8px rgba(39,174,96,0)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}

      /* ── TABLET (≤900px) ── */
      @media(max-width:900px){
        .desktop-nav{display:none !important}
        .mobile-menu-btn{display:flex !important}
        .cart-label{display:none !important}
        .nav-divider,.nav-subtitle{display:none !important}
      }
      /* ── MOBILE (≤600px) ── */
      @media(max-width:600px){
        #top > div{grid-template-columns:1fr !important}
        #top .clock-col{display:none}
      }
    `}</style>
  )
}

/* ═══════════════════════
   APP ROOT
═══════════════════════ */
export default function App(){
  const {lang,ar,toggle}=useLang()
  const [cart,setCart]=useState([])
  const [cartOpen,setCartOpen]=useState(false)
  const [searchOpen,setSearchOpen]=useState(false)
  const [detail,setDetail]=useState(null)
  const [addedId,setAddedId]=useState(null)

  const addToCart=useCallback(w=>{
    setCart(p=>p.find(x=>x.id===w.id)?p:[...p,w])
    setAddedId(w.id)
    setTimeout(()=>setAddedId(null),2000)
  },[])

  const removeFromCart=i=>setCart(p=>p.filter((_,idx)=>idx!==i))

  const openDetail=w=>{
    setDetail(w)
    setSearchOpen(false)
    window.scrollTo({top:0,behavior:'instant'})
  }

  useEffect(()=>{
    const fn=e=>{if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();setSearchOpen(p=>!p)}}
    window.addEventListener('keydown',fn)
    return()=>window.removeEventListener('keydown',fn)
  },[])

  const shared={ar,onWatch:openDetail,onAdd:addToCart,addedId,cartItems:cart}

  if(detail) return(
    <>
      <GlobalStyles/>
      <Navbar cart={cart} onCart={()=>setCartOpen(true)} lang={lang} toggleLang={toggle} onSearch={()=>setSearchOpen(true)}/>
      <WatchDetailPage w={detail} ar={ar} onBack={()=>setDetail(null)} onAdd={addToCart} addedId={addedId}/>
      <Footer ar={ar}/>
      {cartOpen&&<CartAndCheckout items={cart} onClose={()=>setCartOpen(false)} onRemove={removeFromCart} ar={ar}/>}
      {searchOpen&&<SearchModal ar={ar} onClose={()=>setSearchOpen(false)} onWatch={openDetail}/>}
    </>
  )

  return(
    <>
      <GlobalStyles/>
      <Navbar cart={cart} onCart={()=>setCartOpen(true)} lang={lang} toggleLang={toggle} onSearch={()=>setSearchOpen(true)}/>
      <Ticker ar={ar}/>
      <Hero ar={ar}/>
      <Collections {...shared}/>
      <WatchFinder ar={ar} onWatch={openDetail}/>
      <DealsSection {...shared}/>
      <HotSection {...shared}/>
      <WhyTQ ar={ar}/>
      <Footer ar={ar}/>
      {cartOpen&&<CartAndCheckout items={cart} onClose={()=>setCartOpen(false)} onRemove={removeFromCart} ar={ar}/>}
      {searchOpen&&<SearchModal ar={ar} onClose={()=>setSearchOpen(false)} onWatch={openDetail}/>}
    </>
  )
}