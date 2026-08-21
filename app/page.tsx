"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Framework = {
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  accent: string;
  icon: "arc" | "thought" | "step";
};

const frameworks: Framework[] = [
  {
    eyebrow: "Kaygıyla birlikte ilerle",
    title: "Kabul ve Kararlılık Terapisi",
    description:
      "Kaygıyı yok etmeyi beklemeden, önem verdiğin yöne doğru küçük ama gerçek bir adım at.",
    detail:
      "Duyguyu fark et · düşünceden ayrış · değerini hatırla · adanmış eylemini seç.",
    accent: "gold",
    icon: "arc",
  },
  {
    eyebrow: "Düşünce tuzağını incele",
    title: "Bilişsel Davranışçı Terapi",
    description:
      "Felaketleştirme ve “ya hep ya hiç” düşüncelerini kanıtlarla değerlendir; daha dengeli bir bakış kur.",
    detail:
      "Olayı ayır · otomatik düşünceyi yakala · kanıtı incele · yeni bir davranış dene.",
    accent: "teal",
    icon: "thought",
  },
  {
    eyebrow: "Bir sonraki küçük adımı bul",
    title: "Çözüm Odaklı Yaklaşım",
    description:
      "Motivasyonun gelmesini beklemek yerine, bugün mümkün olan en küçük ilerlemeyi görünür kıl.",
    detail:
      "Ölçekle · istisnayı hatırla · gücünü fark et · bir puanlık ilerleme seç.",
    accent: "sage",
    icon: "step",
  },
];

const timeline = [
  {
    time: "08:10",
    label: "Yönünü hatırla",
    text: "Bugün senin için önemli olan değeri ve tek bir odağı seç.",
    tone: "gold",
  },
  {
    time: "11:40",
    label: "Kısa durum yoklaması",
    text: "Çalışmaya başlamanı zorlaştıran şeyi adlandır; sistem sana uygun akışı açsın.",
    tone: "teal",
  },
  {
    time: "15:20",
    label: "Küçük görev",
    text: "15 dakikalık uygulanabilir bir adım seç ve tamamladığında rotana bir yıldız ekle.",
    tone: "sage",
  },
  {
    time: "19:30",
    label: "Günü kapat",
    text: "Ne yaptığını, ne öğrendiğini ve yarın için neyi koruyacağını birlikte gör.",
    tone: "gold",
  },
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark${compact ? " brand-mark--compact" : ""}`} aria-hidden="true">
      <span className="brand-mark__orbit" />
      <span className="brand-mark__star">✦</span>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3 9h11M9.5 4.5 14 9l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FrameworkIcon({ type }: { type: Framework["icon"] }) {
  if (type === "thought") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M13 27.5c-3.3-.8-5.5-3.4-5.5-6.5 0-3.7 2.9-6.8 6.5-6.8.4-4 3.7-7 7.8-7 3.5 0 6.5 2.3 7.5 5.5h.7c3.3 0 6 2.7 6 6s-2.7 6-6 6H18l-5 4.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M17 18.7h.1M23 18.7h.1M29 18.7h.1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "step") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M8 30h9v-8h8v-8h8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m27.5 10 5.5-1v5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="30" r="2.5" fill="currentColor" />
        <circle cx="17" cy="22" r="2.5" fill="currentColor" />
        <circle cx="25" cy="14" r="2.5" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="M8 28c8.8-15 17.2-15 25-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M26.5 19.5 33 23l-6.8 2.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="28" r="2.4" fill="currentColor" />
    </svg>
  );
}

function Reveal({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={style} className={`reveal ${visible ? "reveal--visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function FrameworkCard({ framework, index }: { framework: Framework; index: number }) {
  return (
    <Reveal className="framework-card-wrap" style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}>
      <article className={`framework-card framework-card--${framework.accent}`}>
        <div className="framework-card__topline">
          <span className="framework-card__icon"><FrameworkIcon type={framework.icon} /></span>
          <span className="framework-card__number">0{index + 1}</span>
        </div>
        <p className="eyebrow">{framework.eyebrow}</p>
        <h3>{framework.title}</h3>
        <p className="framework-card__description">{framework.description}</p>
        <div className="framework-card__detail">
          <span className="detail-dot" />
          {framework.detail}
        </div>
      </article>
    </Reveal>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [exam, setExam] = useState<"YKS" | "LGS">("YKS");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !email.includes("@") || !consent) {
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="waitlist-success" role="status">
        <span className="success-mark">✓</span>
        <div>
        <strong>Rotana bir yıldız ekledik.</strong>
          <p>Kutup Yıldızı hazır olduğunda ilk haber alanlardan olacaksın.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
      <div className="waitlist-form__row">
        <label className="sr-only" htmlFor="waitlist-email">E-posta adresin</label>
        <input
          id="waitlist-email"
          type="email"
          placeholder="E-posta adresin"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
        <label className="sr-only" htmlFor="waitlist-exam">Hazırlandığın sınav</label>
        <select id="waitlist-exam" value={exam} onChange={(event) => setExam(event.target.value as "YKS" | "LGS")}>
          <option value="YKS">YKS</option>
          <option value="LGS">LGS</option>
        </select>
        <button className="button button--gold" type="submit">
          Listeye katıl <ArrowIcon />
        </button>
      </div>
      <label className="consent-label">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
        <span>Erken erişim hakkında e-posta almayı kabul ediyorum.</span>
      </label>
      {status === "error" && <p className="form-error" role="alert">E-posta adresini ve açık rıza kutusunu kontrol et.</p>}
    </form>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "faq-item--open" : ""}`}>
      <button type="button" className="faq-item__trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>{question}</span>
        <span className="faq-item__plus" aria-hidden="true">+</span>
      </button>
      <div className="faq-item__answer"><p>{answer}</p></div>
    </div>
  );
}

function NorthStarHero() {
  return (
    <div className="hero-visual" aria-label="Kutup Yıldızı rotası">
      <div className="hero-visual__glow hero-visual__glow--one" />
      <div className="hero-visual__glow hero-visual__glow--two" />
      <svg className="hero-route" viewBox="0 0 620 560" fill="none" aria-hidden="true">
        <path className="hero-route__ghost" d="M68 456C119 415 119 313 202 313s75 130 164 71c80-53 89-162 182-201" />
        <path className="hero-route__line" pathLength="1" d="M68 456C119 415 119 313 202 313s75 130 164 71c80-53 89-162 182-201" />
        <circle className="route-node route-node--one" cx="68" cy="456" r="7" />
        <circle className="route-node route-node--two" cx="202" cy="313" r="7" />
        <circle className="route-node route-node--three" cx="366" cy="384" r="7" />
        <circle className="route-node route-node--four" cx="548" cy="183" r="7" />
      </svg>
      <div className="star-orbit star-orbit--one" />
      <div className="star-orbit star-orbit--two" />
      <span className="hero-label hero-label--one">Fark et</span>
      <span className="hero-label hero-label--two">Anlamlandır</span>
      <span className="hero-label hero-label--three">Harekete geç</span>
      <div className="hero-caption"><span className="caption-pulse" />Kendi rotanı kur</div>
    </div>
  );
}

function JourneyBeacon() {
  // The landing beacon is deliberately simple now: the page stays in its
  // normal palette, the star reaches the slogan's centre, and the warm landing
  // state is latched for the rest of the visit.
  const [progress, setProgress] = useState(0);
  const [landed, setLanded] = useState(false);
  const [viewport, setViewport] = useState({ width: 1280, height: 720 });
  const landedRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    const landingThreshold = .985;

    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    const updateProgress = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        if (landedRef.current) {
          frame = 0;
          return;
        }

        const currentScrollY = window.scrollY;

        const hero = document.getElementById("top");
        const heroRect = hero?.getBoundingClientRect();
        const heroStart = heroRect ? heroRect.top + window.scrollY : 0;
        const heroEnd = heroStart + (heroRect?.height ?? window.innerHeight);
        const exitStart = Math.max(heroStart, heroEnd - window.innerHeight);
        const exitRange = Math.max(1, heroEnd - exitStart);
        const nextProgress = (currentScrollY - exitStart) / exitRange;
        const clampedProgress = Math.min(1, Math.max(0, nextProgress));
        const landingContentRect = document
          .querySelector(".beacon-landing__content")
          ?.getBoundingClientRect();
        const landingContentCenter = landingContentRect
          ? landingContentRect.top + landingContentRect.height / 2
          : Number.POSITIVE_INFINITY;
        const landingReady = landingContentRect
          ? landingContentCenter <= window.innerHeight / 2 + 8
          : clampedProgress >= landingThreshold;

        if (landingReady) {
          landedRef.current = true;
          setLanded(true);
          frame = 0;
          return;
        }
        setProgress(clampedProgress);
        frame = 0;
      });
    };

    updateViewport();
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateViewport);
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("resize", updateProgress);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const viewportWidth = viewport.width;
  const originTop = viewportWidth <= 680 ? 75 : viewportWidth <= 980 ? 34 : 27;
  const originLeft = viewportWidth <= 680 ? 50 : viewportWidth <= 980 ? 58 : 61;
  const followTop = viewportWidth <= 680 ? 79 : viewportWidth <= 980 ? 42 : 35;
  // Once landed, the star is rendered by the slogan itself so it remains in
  // the exact gap between the two lines instead of following the viewport.
  const landingTop = viewportWidth <= 680 ? 22 : viewportWidth <= 980 ? 25 : 25;
  const sampleStops = (stops: Array<[number, number]>) => {
    for (let index = 1; index < stops.length; index += 1) {
      const [endAt, endValue] = stops[index];
      const [startAt, startValue] = stops[index - 1];
      if (progress <= endAt) {
        const range = endAt - startAt || 1;
        const amount = Math.min(1, Math.max(0, (progress - startAt) / range));
        return startValue + (endValue - startValue) * amount;
      }
    }
    return stops[stops.length - 1][1];
  };
  const topStops: Array<[number, number]> = [
    [0, originTop], [0.1, originTop], [0.18, followTop], [0.32, 44],
    [0.48, 50], [0.56, 50], [0.64, 50], [0.76, 50], [0.86, 50],
    [0.92, 50], [0.96, 50], [1, 50],
  ];
  const leftStops: Array<[number, number]> = [
    [0, originLeft],
    [0.36, originLeft],
    [0.68, 50],
    [1, 50],
  ];
  const orbOpacityStops: Array<[number, number]> = [[0, 1], [.68, 1], [.82, 0], [1, 0]];
  const beaconTop = landed ? `${landingTop}vh` : `${sampleStops(topStops)}vh`;
  const beaconLeft = landed ? "50%" : `${sampleStops(leftStops)}%`;
  const orbOpacity = landed ? 0 : sampleStops(orbOpacityStops);
  const finished = landed;

  return (
    <div
      className={`journey-beacon journey-beacon--fallback ${finished ? "journey-beacon--finished" : ""}`}
      style={({ "--beacon-top": beaconTop, "--beacon-left": beaconLeft, "--beacon-x": beaconLeft, "--beacon-y": beaconTop, "--orb-opacity": orbOpacity } as React.CSSProperties)}
      aria-hidden="true"
    >
      <div className="hero-star journey-beacon__orb">
        <span>✦</span>
        <span className="journey-beacon__scatter" />
        <span className="journey-beacon__beam" />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <JourneyBeacon />
      <section className="hero" id="top">
        <div className="hero__noise" aria-hidden="true" />
        <div className="container">
          <nav className="nav" aria-label="Ana navigasyon">
            <a className="brand" href="#top">
              <BrandMark />
              <span><strong>Kutup Yıldızı</strong><small>Eğitim Danışmanlığı</small></span>
            </a>
            <div className="nav-links">
              <a href="#yaklasim">Yaklaşım</a>
              <a href="#akis">Nasıl çalışır?</a>
              <a href="#guven">Güven</a>
            </div>
            <a className="nav-cta" href="#waitlist">Erken erişim <ArrowIcon /></a>
          </nav>

          <div className="hero__grid">
            <div className="hero__copy">
              <div className="hero-kicker"><span className="kicker-star">✦</span> Sınav yolculuğunda yönün belli olsun</div>
              <h1>Yönünü kaybettiğinde, <em>Kutup Yıldızı</em>’nın yanında.</h1>
              <p className="hero__lead">Sınavda yalnızca netlerini değil, kendini de yönet. Yapay zekâ destekli planlama, psikoeğitim ve insan rehberliğiyle kendi rotanı kur.</p>
              <div className="hero__actions">
                <a className="button button--gold" href="#waitlist">Erken erişim listesine katıl <ArrowIcon /></a>
                <a className="text-link" href="#akis">Nasıl çalışır? <span>↓</span></a>
              </div>
              <div className="hero__proof"><span className="proof-line" /><span>Kabul ve Kararlılık · Bilişsel Davranışçı · Çözüm Odaklı</span></div>
            </div>
            <NorthStarHero />
          </div>
          <a className="scroll-cue" href="#yaklasim"><span className="scroll-cue__line" />Aşağıda keşfet</a>
        </div>
      </section>

      <section className="beacon-landing" aria-label="Kutup Yıldızı yön mesajı">
        <div className="beacon-landing__content">
          <p>Her hedefin bir yönü,</p>
          <span aria-hidden="true">✦</span>
          <p>her yolculuğun bir rehberi vardır.</p>
        </div>
      </section>

      <section className="section section--paper" id="yaklasim">
        <div className="container">
          <Reveal className="section-heading">
            <p className="eyebrow eyebrow--dark">Kutup Yıldızı yaklaşımı</p>
            <h2>Bu yalnızca bir çalışma programı değil.</h2>
            <p>Kaygıyı bastırmaya, düşünceleri susturmaya veya motivasyonu beklemeye değil; kendini anlayıp harekete geçebilmeye odaklanır.</p>
          </Reveal>
          <div className="framework-grid">
            {frameworks.map((framework, index) => <FrameworkCard key={framework.title} framework={framework} index={index} />)}
          </div>
        </div>
      </section>

      <section className="section section--navy" id="akis">
        <div className="container">
          <Reveal className="section-heading section-heading--light">
            <p className="eyebrow">Açıklanabilir yapay zekâ</p>
            <h2>Yapay zekâ seni nasıl tanır?</h2>
            <p>Sana ait olan sinyalleri, onaylı psikoeğitim mantığı ve insan rehberliğiyle anlamlı bir sonraki adıma çevirir.</p>
          </Reveal>
          <Reveal className="ai-flow" style={{ "--delay": "120ms" } as React.CSSProperties}>
            <div className="ai-flow__track" />
            {[
              ["01", "Durum yoklaması", "Bugün neyi zor buluyorsun?"],
              ["02", "Uygun yaklaşımı bul", "Şu an hangi yaklaşım sana daha yardımcı?"],
              ["03", "Küçük adım", "15 dakikada neyi seçebilirsin?"],
              ["04", "İnsan desteği", "Koçun rotanı seninle günceller."],
            ].map(([number, title, text]) => (
              <div className="ai-flow__step" key={number}>
                <span className="ai-flow__number">{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </Reveal>
          <div className="privacy-note"><span className="privacy-note__icon">⌁</span><span><strong>Kontrol sende.</strong> Kamera, gizli duygu takibi veya izinsiz gözetim yok.</span></div>
        </div>
      </section>

      <section className="section section--sage demo-section">
        <div className="container demo-grid">
          <Reveal className="demo-copy">
            <p className="eyebrow eyebrow--dark">Bugünün adanmış eylemi</p>
            <h2>Kaygın devam edebilir. Sen yine de başlayabilirsin.</h2>
            <p>Gerçek sistemde kullanıcıdan gelen tek bir cümle; düşünceyi, duyguyu ve yapılabilir adımı birbirinden ayıran küçük bir akışa dönüşür.</p>
            <a className="text-link text-link--dark" href="#waitlist">Kendi rotanı keşfet <ArrowIcon /></a>
          </Reveal>
          <Reveal className="demo-window" style={{ "--delay": "140ms" } as React.CSSProperties}>
            <div className="demo-window__top"><span className="window-dot window-dot--red" /><span className="window-dot window-dot--yellow" /><span className="window-dot window-dot--green" /><span className="window-title">bugünün adımı</span></div>
            <div className="demo-window__body">
              <p className="demo-label">Kısa durum yoklaması · 10:42</p>
              <h3>Bugün çalışmaya başlamanı en çok ne zorlaştırıyor?</h3>
              <div className="demo-bubble demo-bubble--user">Kaygım geçmeden başlayamam.</div>
              <div className="demo-response"><span className="demo-response__star">✦</span><div><p>Bu düşünceyi fark ettik. Kaygıyı göndermeyi beklemek yerine, onunla birlikte atabileceğin en küçük adımı seçelim.</p><button type="button">15 dakikalık adımı aç <ArrowIcon /></button></div></div>
              <div className="demo-progress"><span>Adanmış eylem</span><i><b /></i><span>15 dk</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--paper timeline-section">
        <div className="container">
          <Reveal className="section-heading section-heading--split">
            <div><p className="eyebrow eyebrow--dark">Bir günün rotası</p><h2>Günün her anında daha net bir yön.</h2></div>
            <p>Biriken küçük adımlar, yalnızca bir çalışma çizelgesi değil; kendinle kurduğun ilişkinin haritasını oluşturur.</p>
          </Reveal>
          <div className="timeline">
            <div className="timeline__line" />
            {timeline.map((item, index) => (
              <Reveal className="timeline-item" key={item.time} style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}>
                <span className={`timeline-item__dot timeline-item__dot--${item.tone}`} />
                <div className="timeline-item__time">{item.time}</div>
                <div className="timeline-item__body"><h3>{item.label}</h3><p>{item.text}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--night trust-section" id="guven">
        <div className="container trust-grid">
          <Reveal className="trust-copy">
            <p className="eyebrow">Güven, sistemin bir özelliği değil temelidir.</p>
            <h2>Yapay zekâ önerir. İnsan rehberlik eder. Karar senindir.</h2>
            <p>Uzman onaylı içerikler, açık rıza ve açıklanabilir önerilerle ilerleriz. Kriz anında sistem terapist rolüne geçmez; güvenli insan desteğine yönlendirir.</p>
          </Reveal>
          <Reveal className="trust-list" style={{ "--delay": "120ms" } as React.CSSProperties}>
            {[
              ["01", "Uzman onaylı içerik", "Her yaklaşım ve egzersiz yayınlanmadan önce gözden geçirilir."],
              ["02", "Açık rıza ve kontrol", "Ne paylaştığını, neyi kapatacağını ve verini ne zaman sileceğini sen belirlersin."],
              ["03", "İnsan desteği", "Yapay zekâ önerisi koçun tarafından görülebilir, düzenlenebilir veya reddedilebilir."],
            ].map(([number, title, text]) => <div className="trust-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}
          </Reveal>
        </div>
      </section>

      <section className="section section--paper faq-section">
        <div className="container faq-grid">
          <Reveal className="faq-intro"><p className="eyebrow eyebrow--dark">Merak edilenler</p><h2>Başlamadan önce bilmek isteyebileceğin şeyler.</h2><p>İyi bir yolculuk, sınırlarını ve yönünü bilmekle başlar.</p></Reveal>
          <Reveal className="faq-list" style={{ "--delay": "100ms" } as React.CSSProperties}>
            <FaqItem question="Kutup Yıldızı nedir?" answer="Yapay zekâ destekli planlama, psikoeğitim ve insan rehberliğini bir araya getiren sınav danışmanlığı deneyimidir." />
            <FaqItem question="Yapay zekâ ne yapar?" answer="Durum yoklaması, hedef ve çalışma sinyallerini onaylı içeriklerle eşleştirerek açıklanabilir küçük adım önerileri üretir. Kararı tek başına vermez." />
            <FaqItem question="Bu uygulama terapi midir?" answer="Hayır. Ürün terapötik çerçevelerden beslenen psikoeğitim ve koçluk desteğidir; teşhis veya klinik tedavi hizmeti sunmaz." />
            <FaqItem question="Kabul ve Kararlılık Terapisi, Bilişsel Davranışçı Terapi ve Çözüm Odaklı yaklaşım ne işe yarar?" answer="Kaygıyla birlikte hareket etmeyi, düşünce tuzaklarını incelemeyi ve bir sonraki küçük adımı görünür kılmayı öğretir." />
            <FaqItem question="Verilerim nasıl korunur?" answer="Bekleme listesinde yalnızca e-posta, sınav seçimi ve açık iletişim rızası istenir. Hassas psikolojik veri toplanmaz." />
            <FaqItem question="LGS öğrencileri kullanabilir mi?" answer="LGS için yaş doğrulama, veli rızası ve ayrı güvenlik akışı tasarlanacaktır." />
          </Reveal>
        </div>
      </section>

      <section className="section section--final" id="waitlist">
        <div className="final-stars" aria-hidden="true"><span>✦</span><span>·</span><span>✧</span></div>
        <div className="container final-inner">
          <Reveal className="final-copy"><p className="eyebrow">İlk rotalardan biri seninki olsun</p><h2>Yolunu tek başına bulmak zorunda değilsin.</h2><p>Kutup Yıldızı hazır olduğunda ilk haberdar olanlar arasında yerini al.</p></Reveal>
          <Reveal className="final-form" style={{ "--delay": "120ms" } as React.CSSProperties}><WaitlistForm /><small>Şimdilik yalnızca erken erişim haberleri. İstediğin zaman ayrılabilirsin.</small></Reveal>
        </div>
      </section>

      <footer className="footer"><div className="container footer-inner"><a className="brand brand--footer" href="#top"><BrandMark compact /><span><strong>Kutup Yıldızı</strong><small>Eğitim Danışmanlığı</small></span></a><p>Yapay zekâ destekli eğitim danışmanlığı.</p><span>© 2026 Kutup Yıldızı</span></div></footer>
    </main>
  );
}
