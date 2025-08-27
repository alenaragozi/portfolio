const i18n = {
  ru: { name:"Алёна Рагозина", subtitle:"Стратег по маркетингу | Запуски продуктов | Рост и бренд",
    lede:"Лидер маркетинга с опытом в IT, финтехе, FMCG и спорте. Строю стратегии, GTM, повышаю CR/LTV, снижаю CAC. Руководила командами до 10 человек.",
    viewCases:"Смотреть кейсы", contactMe:"Связаться", casesTitle:"Кейсы", contactsTitle:"Контакты", catAll:"Все",
    categories:{ brand:"Бренд-маркетинг и позиционирование", gtm:"Go-to-Market стратегии и запуск продуктов",
      performance:"Performance-маркетинг и рост продаж", digital:"Цифровые каналы и аналитика",
      events:"Мероприятия, PR и спонсорства", retention:"Удержание и лояльность", team:"Управление командой и процессами"},
    searchPlaceholder:"Поиск по названиям, меткам…",
    keys:{ project:"Проект", input:"Исходные данные", work:"Что сделано", result:"Результат" },
    viewCase:"Ссылка" },
  en: { name:"Alena Ragozina", subtitle:"Strategic Marketing Leader | Product Launches | Growth & Brand",
    lede:"Marketing leader with experience in IT, fintech, FMCG and sports. I build strategy & GTM, grow CR/LTV, reduce CAC. Led teams up to 10 people.",
    viewCases:"View cases", contactMe:"Contact", casesTitle:"Cases", contactsTitle:"Contacts", catAll:"All",
    categories:{ brand:"Brand Marketing & Positioning", gtm:"Go-to-Market & Product Launch", performance:"Performance & Revenue Growth",
      digital:"Digital Channels & Analytics", events:"Events, PR & Sponsorships", retention:"Retention & Loyalty", team:"Team & Process Management"},
    searchPlaceholder:"Search by title, tags…",
    keys:{ project:"Project", input:"Initial context", work:"What we did", result:"Outcome" },
    viewCase:"Link" }
};

// Добавь свои кейсы здесь
const CASES = [
  { id:"case-gtm-neo",
    title:{ ru:"Запуск финтех-продукта для SMB", en:"Fintech Product Launch for SMB" },
    cover:"assets/case-fintech.jpg",
    url:"#",
    category:"gtm",
    tags:["fintech","SMB","GTM"],
    kv:{
      project:{ ru:"Банк • Онлайн-сервис", en:"Bank • Online Service" },
      input:{ ru:"0 пользователей, жёсткие сроки, ограниченный бюджет", en:"Zero users, tight deadlines, limited budget" },
      work:{ ru:"Сегменты, JTBD, офферы, контент-стратегия, преленды, партнёрства", en:"Segments, JTBD, offers, content, pre-landers, partnerships" },
      result:{ ru:"MRR +32%/кв, CAC −18%, CR к заявке +22%, PR-охват 4,1M", en:"MRR +32%/q, CAC −18%, Lead CR +22%, PR reach 4.1M" }
    }
  },
  { id:"case-brand-hennessy",
    title:{ ru:"Репозиционирование премиум-бренда", en:"Premium Brand Repositioning" },
    cover:"assets/case-brand.jpg",
    url:"#",
    category:"brand",
    tags:["brand","luxury","positioning"],
    kv:{
      project:{ ru:"Alco • Luxury FMCG", en:"Alco • Luxury FMCG" },
      input:{ ru:"Снижение узнаваемости в сегменте 25–34", en:"Awareness decline in 25–34" },
      work:{ ru:"Платформа бренда, инфлюенсеры, digital-активации, спонсорство", en:"Brand platform, influencers, digital activations, sponsorship" },
      result:{ ru:"Awareness +9 п.п., SOV +18%, NPS 46→71", en:"Awareness +9 pp, SOV +18%, NPS 46→71" }
    }
  }
];

let lang = (localStorage.getItem("lang") || "ru");
const $ = (s, c=document)=>c.querySelector(s);
const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));

function applyLang(){
  const t=i18n[lang];
  $$("[data-i18n]").forEach(el=>{ const k=el.getAttribute("data-i18n"); el.textContent=t[k]||el.textContent; });
  const si=$("#searchInput"); if (si) si.placeholder=t.searchPlaceholder;
  $$(".chips .chip").forEach(ch=>{ const code=ch.dataset.filter; if(code && t.categories[code]) ch.textContent=t.categories[code]; });
  renderCards(); localStorage.setItem("lang",lang);
}
$("#lang-ru").addEventListener("click",()=>{lang="ru";setLangActive();applyLang();});
$("#lang-en").addEventListener("click",()=>{lang="en";setLangActive();applyLang();});
function setLangActive(){ $$(".lang-btn").forEach(b=>b.classList.remove("active")); $(`#lang-${lang}`).classList.add("active"); }

let activeFilter="all";
function renderCards(){
  const grid=$("#cardsGrid"); grid.innerHTML="";
  const needle=$("#searchInput").value.trim().toLowerCase();
  const t=i18n[lang];
  const filtered=CASES.filter(c=>{
    const byCat=activeFilter==="all"||c.category===activeFilter;
    const hay=(c.title[lang]+" "+c.tags.join(" ")+" "+c.kv.project[lang]+" "+c.kv.input[lang]+" "+c.kv.work[lang]+" "+c.kv.result[lang]).toLowerCase();
    const bySearch=!needle||hay.includes(needle);
    return byCat && bySearch;
  });
  filtered.forEach(c=>{
    const el=document.createElement("article");
    el.className="card";
    el.innerHTML=`
      <div class="card-media">
        <img src="${c.cover}" alt="">
        <div class="taglist">${c.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
      </div>
      <div class="card-body">
        <h3>${c.title[lang]}</h3>
        <div class="meta">${t.categories[c.category]}</div>
        <div class="kv"><div class="k">${t.keys.project}</div><div class="v">${c.kv.project[lang]}</div></div>
        <div class="kv"><div class="k">${t.keys.input}</div><div class="v">${c.kv.input[lang]}</div></div>
        <div class="kv"><div class="k">${t.keys.work}</div><div class="v">${c.kv.work[lang]}</div></div>
        <div class="kv"><div class="k">${t.keys.result}</div><div class="v">${c.kv.result[lang]}</div></div>
      </div>
      <div class="actions">
        <a class="link" href="${c.url}" target="_blank" rel="noopener">${t.viewCase}</a>
        <span class="badge">✓</span>
      </div>`;
    grid.appendChild(el);
  });
}
$$(".chips .chip").forEach(chip=>{
  chip.addEventListener("click",()=>{ $$(".chips .chip").forEach(c=>c.classList.remove("active")); chip.classList.add("active"); activeFilter=chip.dataset.filter; renderCards(); });
});
$("#searchInput").addEventListener("input", renderCards);
document.getElementById("year").textContent=new Date().getFullYear();
setLangActive(); applyLang();
