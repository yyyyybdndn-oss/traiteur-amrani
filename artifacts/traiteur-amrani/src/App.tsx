import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, MapPin, Menu, Phone, Play, X } from 'lucide-react';

type Language = 'fr' | 'ar';

const mediaRoot = '/assets/';
const photos = [
  { src: 'FB_IMG_1790861797885_1790863362263.jpg', key: 'seafood', fr: 'La mer en grand', ar: 'خيرات البحر' },
  { src: 'FB_IMG_1790861814293_1790863362298.jpg', key: 'pastries', fr: 'Mille-feuille salé', ar: 'مملحات فاخرة' },
  { src: 'FB_IMG_1790861819704_1790863362315.jpg', key: 'color', fr: 'Une table généreuse', ar: 'مائدة عامرة' },
  { src: 'IMG_20261001_134816_1790863383739.jpg', key: 'table', fr: 'L’art de recevoir', ar: 'فن الاستقبال' },
  { src: 'IMG_20261001_134831_1790863383766.jpg', key: 'buffet', fr: 'Le buffet, en fête', ar: 'بوفيه احتفالي' },
  { src: 'IMG_20261001_134845_1790863383798.jpg', key: 'details', fr: 'Chaque détail compte', ar: 'كل تفصيل له قيمة' },
  { src: 'FB_IMG_1790861764190_1790863328968.jpg', key: 'platter', fr: 'Plateau de la côte', ar: 'طبق من الساحل' },
  { src: 'FB_IMG_1790861789360_1790863346644.jpg', key: 'wedding', fr: 'Le grand plat marocain', ar: 'الطبق المغربي الأصيل' },
  { src: 'IMG_20261001_134900_1790863383824.jpg', key: 'setting', fr: 'Dressage de réception', ar: 'تنسيق مائدة الاستقبال' },
];

const copy = {
  fr: {
    location: 'Tanger, Maroc',
    nav: ['Notre savoir-faire', 'Galerie', 'Contact'],
    kicker: 'L’art de célébrer, à la tangéroise',
    heroTitle: <>Les beaux jours<br />se <em>partagent</em><br />à table.</>,
    heroText: 'Des fêtes de mariage aux grandes tablées de la côte, Traiteur Amrani imagine une hospitalité généreuse, élégante et profondément marocaine.',
    inquire: 'Parlons de votre fête',
    explore: 'Découvrir notre univers',
    since: 'Traiteur · Tanger',
    heroNote: 'Une table soignée. Des saveurs qui rassemblent.',
    scroll: 'Défiler pour découvrir',
    introLabel: 'L’hospitalité, notre signature',
    introTitle: <>Pour les moments<br />qui <em>comptent</em>.</>,
    introText: 'Un mariage, une réunion de famille, une soirée à célébrer. Nous composons des tables qui ont le goût du partage et le sens du détail — avec la générosité de la cuisine marocaine au cœur de chaque moment.',
    introQuote: '« Notre objectif est de réussir votre mariage et de satisfaire vos invités. »',
    servicesLabel: 'Nos univers',
    servicesTitle: <>La fête prend<br /><em>plusieurs formes.</em></>,
    servicesIntro: 'Une même attention, du premier dressage au dernier service.',
    services: [
      { n: '01', title: 'Fêtes & mariages', text: 'Des tables de réception élégantes, pensées pour accompagner les grands moments et accueillir vos proches comme il se doit.', tag: 'L’émotion du grand jour' },
      { n: '02', title: 'Buffets & réceptions', text: 'Des buffets généreux et composés avec soin, entre bouchées salées, pièces de partage et douceurs.', tag: 'L’abondance bien pensée' },
      { n: '03', title: 'Plateaux de la mer', text: 'Crevettes, coquillages, poissons et couleurs de saison, réunis dans des plateaux qui font leur entrée.', tag: 'Un air de Méditerranée' },
    ],
    serviceCta: 'Imaginer votre réception',
    editorialTag: 'L’esprit Amrani',
    editorialTitle: <>L’élégance se goûte<br />autant qu’elle <em>se voit.</em></>,
    editorialText: 'Une belle réception se reconnaît à l’équilibre : une cuisine généreuse, une présentation soignée et une équipe attentive à l’instant. À Tanger, nous mettons le plaisir de recevoir au centre de chaque célébration.',
    editorialPoints: ['Cuisine marocaine & inspirations du monde', 'Présentation raffinée, jusque dans les détails', 'Accueil et service pensés pour vos invités'],
    teamCaption: 'Une équipe au rendez-vous',
    videoLabel: 'En images',
    videoTitle: <>La fête, dans<br /><em>tous ses détails.</em></>,
    videoIntro: 'Quelques instants pour entrer dans l’univers des réceptions Amrani.',
    film1: 'L’art de la réception', film2: 'Saveurs & savoir-faire',
    galleryLabel: 'Le carnet des belles tables',
    galleryTitle: <>Des souvenirs qui<br /><em>se partagent.</em></>,
    galleryIntro: 'Quelques tables, quelques plats, et toute la joie autour.',
    galleryHint: 'Sélection de réalisations',
    contactLabel: 'Votre prochaine célébration',
    contactTitle: <>Et si l’on préparait<br />la <em>suite ensemble ?</em></>,
    contactText: 'Parlez-nous de votre date, de vos envies et de vos invités. Nous serons heureux d’échanger avec vous.',
    call: 'Appeler le traiteur',
    secondPhone: 'Deuxième ligne',
    find: 'Nous trouver à Tanger',
    follow: 'Suivre les coulisses',
    facebook: 'Facebook · Imad Amrani',
    snapchat: 'Snapchat',
    footerLine: 'Traiteur Amrani · L’art de recevoir à Tanger',
    backTop: 'Retour en haut',
    footerMark: 'HOSPITALITÉ · TANGER',
    imageClose: 'Fermer la photo',
    imagePrev: 'Photo précédente',
    imageNext: 'Photo suivante',
    galleryOpen: 'Ouvrir la photo',
    videoPlay: 'Lire la vidéo',
    socialLabel: 'Réseaux sociaux',
  },
  ar: {
    location: 'طنجة، المغرب',
    nav: ['خبرتنا', 'معرض الصور', 'تواصل معنا'],
    kicker: 'فن الاحتفال بروح طنجة',
    heroTitle: <>أجمل اللحظات<br />تُعاش <em>حول المائدة</em>.</>,
    heroText: 'من أعراس المغرب إلى موائد الساحل العامرة، يصنع تريتور العمراني ضيافة أنيقة وكريمة، تنبض بروح المغرب.',
    inquire: 'لنتحدث عن مناسبتكم',
    explore: 'اكتشفوا عالمنا',
    since: 'تريتور · طنجة',
    heroNote: 'مائدة أنيقة. ونكهات تجمع الأحبة.',
    scroll: 'اكتشفوا المزيد',
    introLabel: 'الضيافة عنواننا',
    introTitle: <>للحظات التي<br /><em>تستحق الاحتفاء.</em></>,
    introText: 'زفاف، لقاء عائلي أو أمسية مميزة. ننسق موائد تجمع دفء اللقاء واهتمام التفاصيل، وتبقى فيها أصالة المطبخ المغربي حاضرة في كل لحظة.',
    introQuote: '« هدفنا أن يكتمل فرح زفافكم وأن ينال ضيوفكم أطيب الضيافة. »',
    servicesLabel: 'عالمنا',
    servicesTitle: <>للاحتفال<br /><em>أكثر من حكاية.</em></>,
    servicesIntro: 'عناية واحدة، من تنسيق المائدة حتى آخر لحظة في الضيافة.',
    services: [
      { n: '٠١', title: 'الأعراس والمناسبات', text: 'موائد استقبال أنيقة ترافق لحظاتكم الكبيرة وتستقبل أحبتكم بما يليق بهم.', tag: 'فرحة اليوم الكبير' },
      { n: '٠٢', title: 'البوفيه والاستقبالات', text: 'بوفيهات عامرة ومنسقة بعناية، من المقبلات المتنوعة إلى الحلويات.', tag: 'وفرة بتنسيق جميل' },
      { n: '٠٣', title: 'أطباق البحر', text: 'جمبري ومحار وأسماك وألوان موسمية، في أطباق بحرية تحضر بأناقة.', tag: 'نسمة من المتوسط' },
    ],
    serviceCta: 'لنخطط لاستقبالكم',
    editorialTag: 'روح العمراني',
    editorialTitle: <>الأناقة تُذاق<br />كما <em>تُرى.</em></>,
    editorialText: 'تُعرف الضيافة الجميلة بتوازنها: مطبخ كريم، تقديم أنيق وفريق يعتني بلحظتكم. في طنجة، نضع متعة استقبال الأحبة في قلب كل احتفال.',
    editorialPoints: ['مطبخ مغربي ولمسات من مطابخ العالم', 'تقديم راقٍ وعناية بأدق التفاصيل', 'استقبال وخدمة يليقان بضيوفكم'],
    teamCaption: 'فريقنا في خدمتكم',
    videoLabel: 'لحظات مصورة',
    videoTitle: <>الاحتفال، في<br /><em>كل تفاصيله.</em></>,
    videoIntro: 'لحظات قصيرة تأخذكم إلى أجواء مناسبات العمراني.',
    film1: 'فن الاستقبال', film2: 'نكهات وخبرة',
    galleryLabel: 'من دفاتر موائدنا',
    galleryTitle: <>ذكريات حلوة<br /><em>نتشاركها.</em></>,
    galleryIntro: 'موائد وأطباق، وفرح يجمع من حولها.',
    galleryHint: 'مختارات من أعمالنا',
    contactLabel: 'احتفالكم القادم',
    contactTitle: <>ما رأيكم أن نعدّ<br /><em>الفرحة معاً؟</em></>,
    contactText: 'أخبرونا عن موعد مناسبتكم، أفكاركم وعدد ضيوفكم. يسعدنا أن نتحدث معكم.',
    call: 'اتصلوا بالتريتور',
    secondPhone: 'الخط الثاني',
    find: 'اعثروا علينا في طنجة',
    follow: 'تابعوا يومياتنا',
    facebook: 'فيسبوك · عماد العمراني',
    snapchat: 'سناب شات',
    footerLine: 'تريتور العمراني · فن الضيافة في طنجة',
    backTop: 'العودة إلى الأعلى',
    footerMark: 'الضيافة · طنجة',
    imageClose: 'إغلاق الصورة',
    imagePrev: 'الصورة السابقة',
    imageNext: 'الصورة التالية',
    galleryOpen: 'افتحوا الصورة',
    videoPlay: 'تشغيل الفيديو',
    socialLabel: 'تابعونا',
  },
} as const;

function App() {
  const [language, setLanguage] = useState<Language>('fr');
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = copy[language];
  const isArabic = language === 'ar';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.title = isArabic ? 'تريتور العمراني — أعراس ومناسبات في طنجة' : 'Traiteur Amrani — Mariages & réceptions à Tanger';
  }, [language, isArabic]);

  useEffect(() => {
    if (selectedPhoto === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhoto(null);
      if (event.key === 'ArrowRight') setSelectedPhoto((current) => current === null ? null : (current + 1) % photos.length);
      if (event.key === 'ArrowLeft') setSelectedPhoto((current) => current === null ? null : (current - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedPhoto]);

  const switchLanguage = (next: Language) => setLanguage(next);

  return (
    <div className="site-shell grain" data-testid="page-traiteur-amrani">
      <div className="topline">
        <div className="section-wrap topline-inner">
          <a className="place-link focus-ring" href="https://maps.app.goo.gl/1iEjWNspaQ9Zboz59" target="_blank" rel="noopener noreferrer" data-testid="link-location-top">
            <MapPin size={13} strokeWidth={1.7} aria-hidden="true" /><span>{t.location}</span>
          </a>
          <div className="language-switch" role="group" aria-label={isArabic ? 'اختيار اللغة' : 'Choisir la langue'} data-testid="language-switch">
            <button type="button" onClick={() => switchLanguage('fr')} aria-pressed={language === 'fr'} className={`lang-option focus-ring ${language === 'fr' ? 'selected' : ''}`} data-testid="button-language-fr">FR</button>
            <span className="lang-separator" aria-hidden="true">/</span>
            <button type="button" onClick={() => switchLanguage('ar')} aria-pressed={language === 'ar'} className={`lang-option focus-ring ${language === 'ar' ? 'selected' : ''}`} data-testid="button-language-ar">عربي</button>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="section-wrap header-inner">
          <a href="#top" className="brand focus-ring" aria-label="Traiteur Amrani — accueil" data-testid="link-brand">
            <img src={`${mediaRoot}IMG_20261001_133238_1790863328946.jpg`} alt="Emblème noir et or de Traiteur Amrani" width="56" height="56" />
            <span className="brand-name"><strong>Amrani</strong><small>TRAITEUR · TANGER</small></span>
          </a>
          <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`} aria-label={isArabic ? 'التنقل الرئيسي' : 'Navigation principale'}>
            <a href="#savoir-faire" onClick={() => setMobileMenuOpen(false)} data-testid="link-nav-savoir-faire">{t.nav[0]}</a>
            <a href="#galerie" onClick={() => setMobileMenuOpen(false)} data-testid="link-nav-gallery">{t.nav[1]}</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} data-testid="link-nav-contact">{t.nav[2]}</a>
          </nav>
          <a className="header-call focus-ring" href="tel:+212654762729" data-testid="link-header-call"><Phone size={14} aria-hidden="true" /> <span>{t.inquire}</span></a>
          <button type="button" className="mobile-menu focus-ring" aria-label={isArabic ? (mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة') : (mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu')} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)} data-testid="button-mobile-menu">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title" data-testid="section-hero">
          <div className="hero-image" role="img" aria-label={isArabic ? 'طبق بحري مزين بالجمبري والمأكولات البحرية' : 'Grand plateau de fruits de mer garni de crevettes et de légumes frais'} />
          <div className="hero-shade" />
          <div className="section-wrap hero-content">
            <div className="hero-copy">
              <div className="hero-kicker hero-enter"><span className="kicker-line" />{t.kicker}</div>
              <h1 id="hero-title" className="hero-title serif hero-enter delay-1">{t.heroTitle}</h1>
              <p className="hero-description hero-enter delay-2" data-testid="text-hero-description">{t.heroText}</p>
              <div className="hero-actions hero-enter delay-2">
                <a href="tel:+212654762729" className="button button-gold focus-ring" data-testid="link-hero-inquire">{t.inquire}<ArrowUpRight size={15} aria-hidden="true" /></a>
                <a href="#savoir-faire" className="text-link light focus-ring" data-testid="link-hero-explore">{t.explore}<ArrowDown size={14} aria-hidden="true" /></a>
              </div>
            </div>
            <aside className="hero-stamp hero-enter delay-2" aria-label={t.since}>
              <span className="stamp-inner"><span className="stamp-top">{isArabic ? 'منذ' : 'L’art de'}</span><span className="stamp-center serif">{isArabic ? 'الضيافة' : 'recevoir'}</span><span className="stamp-bottom">{t.since}</span></span>
            </aside>
            <div className="hero-foot">
              <span className="hero-note">{t.heroNote}</span>
              <a href="#savoir-faire" className="scroll-note focus-ring" data-testid="link-scroll-discover"><span>{t.scroll}</span><span className="scroll-rule" /></a>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">01 <span /> 04</div>
        </section>

        <section className="intro-section" id="savoir-faire" aria-labelledby="intro-title" data-testid="section-intro">
          <div className="section-wrap intro-grid">
            <div className="intro-mark">
              <span className="intro-number serif">01</span>
              <span className="gold-rule" />
              <span className="intro-side-label">{isArabic ? 'طنجة، المغرب' : 'TANGER · MAROC'}</span>
            </div>
            <div className="intro-copy section-copy">
              <p className="eyebrow">{t.introLabel}</p>
              <h2 id="intro-title" className="section-title serif">{t.introTitle}</h2>
              <p className="section-lead" data-testid="text-intro">{t.introText}</p>
              <blockquote className="intro-quote serif">{t.introQuote}<span>— Amrani</span></blockquote>
            </div>
            <div className="intro-image image-frame">
              <img src={`${mediaRoot}IMG_20261001_134816_1790863383739.jpg`} alt={isArabic ? 'مائدة استقبال أنيقة بأطباق ذهبية وزهور وسطية' : 'Table de réception dressée de vaisselle dorée et d’un bouquet central'} width="773" height="1024" loading="lazy" data-testid="img-intro-table" />
              <span className="image-index">AMRANI / TANGER</span>
            </div>
          </div>
        </section>

        <section className="services-section" aria-labelledby="services-title" data-testid="section-services">
          <div className="section-wrap">
            <div className="services-heading">
              <div><p className="eyebrow">{t.servicesLabel}</p><h2 id="services-title" className="section-title serif">{t.servicesTitle}</h2></div>
              <div className="services-intro-block"><p>{t.servicesIntro}</p><a className="text-link focus-ring" href="#contact" data-testid="link-services-contact">{t.serviceCta}<ArrowUpRight size={14} aria-hidden="true" /></a></div>
            </div>
            <div className="service-list">
              {t.services.map((service, index) => (
                <article className="service-card" key={service.n} data-testid={`card-service-${index + 1}`}>
                  <span className="service-number">{service.n}</span>
                  <div className="service-card-copy"><h3 className="serif">{service.title}</h3><p>{service.text}</p></div>
                  <span className="service-tag"><span />{service.tag}</span>
                  <ArrowUpRight className="service-arrow" size={18} aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="editorial-section" aria-labelledby="editorial-title" data-testid="section-editorial">
          <div className="editorial-photo image-frame">
            <img src={`${mediaRoot}FB_IMG_1790861993343_1790863383686.jpg`} alt={isArabic ? 'فريق تريتور العمراني مجتمعاً في قاعة احتفالات' : 'L’équipe Traiteur Amrani réunie dans une salle de réception'} width="1024" height="576" loading="lazy" data-testid="img-team" />
            <span className="editorial-caption">{t.teamCaption}</span>
          </div>
          <div className="editorial-panel">
            <div className="editorial-inner">
              <p className="eyebrow">{t.editorialTag}</p>
              <h2 id="editorial-title" className="section-title serif">{t.editorialTitle}</h2>
              <p className="editorial-text">{t.editorialText}</p>
              <ul className="editorial-points">
                {t.editorialPoints.map((point) => <li key={point}><Check size={14} aria-hidden="true" /><span>{point}</span></li>)}
              </ul>
              <a href="#contact" className="text-link focus-ring editorial-link" data-testid="link-editorial-contact">{t.inquire}<ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
            <span className="editorial-watermark serif" aria-hidden="true">A.</span>
          </div>
        </section>

        <section className="films-section" aria-labelledby="films-title" data-testid="section-films">
          <div className="section-wrap">
            <div className="films-heading">
              <div><p className="eyebrow">{t.videoLabel}</p><h2 id="films-title" className="section-title serif">{t.videoTitle}</h2></div>
              <p className="films-intro">{t.videoIntro}</p>
            </div>
            <div className="film-grid">
              <figure className="film-card">
                <div className="film-frame"><video controls playsInline preload="metadata" poster={`${mediaRoot}IMG_20261001_134900_1790863383824.jpg`} aria-label={t.film1} data-testid="video-reception"><source src={`${mediaRoot}24dc0e38-1a92-4341-a53b-88e38bacf23c_1790863431810.mp4`} type="video/mp4" />{isArabic ? 'المتصفح لا يدعم تشغيل الفيديو.' : 'Votre navigateur ne peut pas lire cette vidéo.'}</video><span className="film-label"><Play size={12} fill="currentColor" aria-hidden="true" />{t.videoPlay}</span></div>
                <figcaption><span>FILM / 01</span><strong className="serif">{t.film1}</strong></figcaption>
              </figure>
              <figure className="film-card">
                <div className="film-frame"><video controls playsInline preload="metadata" poster={`${mediaRoot}IMG_20261001_134831_1790863383766.jpg`} aria-label={t.film2} data-testid="video-savoir-faire"><source src={`${mediaRoot}54388237-7621-4a8f-9c5a-de0e2ad6aa55_1790863460571.mp4`} type="video/mp4" />{isArabic ? 'المتصفح لا يدعم تشغيل الفيديو.' : 'Votre navigateur ne peut pas lire cette vidéo.'}</video><span className="film-label"><Play size={12} fill="currentColor" aria-hidden="true" />{t.videoPlay}</span></div>
                <figcaption><span>FILM / 02</span><strong className="serif">{t.film2}</strong></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="gallery-section" id="galerie" aria-labelledby="gallery-title" data-testid="section-gallery">
          <div className="section-wrap">
            <div className="gallery-heading">
              <div><p className="eyebrow">{t.galleryLabel}</p><h2 id="gallery-title" className="section-title serif">{t.galleryTitle}</h2></div>
              <div className="gallery-note"><span>09</span><p>{t.galleryIntro}</p></div>
            </div>
            <div className="gallery-grid">
              {photos.map((photo, index) => (
                <button type="button" className={`gallery-tile gallery-tile-${index + 1} focus-ring`} key={photo.key} onClick={() => setSelectedPhoto(index)} aria-label={`${t.galleryOpen}: ${isArabic ? photo.ar : photo.fr}`} data-testid={`button-gallery-${photo.key}`}>
                  <img src={`${mediaRoot}${photo.src}`} alt={isArabic ? photo.ar : photo.fr} width="820" height="1000" loading="lazy" />
                  <span className="gallery-overlay"><span>{isArabic ? photo.ar : photo.fr}</span><ArrowUpRight size={17} aria-hidden="true" /></span>
                </button>
              ))}
            </div>
            <p className="gallery-footnote">{t.galleryHint}<span>—</span>TRAITEUR AMRANI · TANGER</p>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title" data-testid="section-contact">
          <div className="contact-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="section-wrap contact-inner">
            <div className="contact-copy">
              <p className="eyebrow">{t.contactLabel}</p>
              <h2 id="contact-title" className="section-title serif">{t.contactTitle}</h2>
              <p>{t.contactText}</p>
            </div>
            <div className="contact-actions">
              <a className="contact-phone focus-ring" href="tel:+212654762729" data-testid="link-phone-primary"><span className="contact-icon"><Phone size={18} aria-hidden="true" /></span><span><small>{t.call}</small><strong dir="ltr">+212 654-762729</strong></span><ArrowUpRight size={17} aria-hidden="true" /></a>
              <a className="contact-phone focus-ring" href="tel:+212617369017" data-testid="link-phone-secondary"><span className="contact-icon"><Phone size={18} aria-hidden="true" /></span><span><small>{t.secondPhone}</small><strong dir="ltr">+212 617-369017</strong></span><ArrowUpRight size={17} aria-hidden="true" /></a>
              <div className="contact-socials" aria-label={t.socialLabel}>
                <a href="https://www.facebook.com/share/1JEBwbjUdd/" target="_blank" rel="noopener noreferrer" className="social-link focus-ring" aria-label={t.facebook} data-testid="link-facebook"><span>f</span>{t.facebook}<ArrowUpRight size={13} aria-hidden="true" /></a>
                <a href="https://www.snapchat.com/add/imad_armani2021" target="_blank" rel="noopener noreferrer" className="social-link focus-ring" data-testid="link-snapchat"><span className="snap-mark">S</span>{t.snapchat}<ArrowUpRight size={13} aria-hidden="true" /></a>
              </div>
              <a className="map-link focus-ring" href="https://maps.app.goo.gl/1iEjWNspaQ9Zboz59" target="_blank" rel="noopener noreferrer" data-testid="link-google-maps"><MapPin size={15} aria-hidden="true" />{t.find}<ArrowUpRight size={13} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap footer-inner">
          <a className="footer-brand focus-ring" href="#top" data-testid="link-footer-brand"><img src={`${mediaRoot}IMG_20261001_133238_1790863328946.jpg`} alt="" width="42" height="42" /><span><strong>Amrani</strong><small>TRAITEUR · TANGER</small></span></a>
          <p>{t.footerLine}</p>
          <a className="back-top focus-ring" href="#top" data-testid="link-back-to-top">{t.backTop}<ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
        <div className="footer-bottom section-wrap"><span>© {new Date().getFullYear()} TRAITEUR AMRANI</span><span>{t.location}</span><span>{t.footerMark}</span></div>
      </footer>

      {selectedPhoto !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={isArabic ? 'معرض الصور' : 'Galerie photo'} onClick={() => setSelectedPhoto(null)} data-testid="dialog-gallery-lightbox">
          <button className="lightbox-close focus-ring" type="button" aria-label={t.imageClose} onClick={() => setSelectedPhoto(null)} data-testid="button-gallery-close"><X size={22} /></button>
          <button className="lightbox-arrow lightbox-prev focus-ring" type="button" aria-label={t.imagePrev} onClick={(event) => { event.stopPropagation(); setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length); }} data-testid="button-gallery-prev"><ChevronLeft size={25} /></button>
          <figure className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img src={`${mediaRoot}${photos[selectedPhoto].src}`} alt={isArabic ? photos[selectedPhoto].ar : photos[selectedPhoto].fr} data-testid="img-gallery-lightbox" />
            <figcaption><span>0{selectedPhoto + 1} / 0{photos.length}</span><strong>{isArabic ? photos[selectedPhoto].ar : photos[selectedPhoto].fr}</strong></figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next focus-ring" type="button" aria-label={t.imageNext} onClick={(event) => { event.stopPropagation(); setSelectedPhoto((selectedPhoto + 1) % photos.length); }} data-testid="button-gallery-next"><ChevronRight size={25} /></button>
        </div>
      )}
    </div>
  );
}

export default App;