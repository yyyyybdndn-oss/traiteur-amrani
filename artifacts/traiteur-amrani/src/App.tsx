import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, MapPin, Menu, Phone, Play, X } from 'lucide-react';
import { SiApplepay, SiMastercard, SiPaypal, SiStripe, SiVisa } from 'react-icons/si';

type Language = 'fr' | 'ar';
type QuantityUnit = 'guests' | 'tables';
type ServiceType = 'hospitality' | 'decor' | 'food' | 'complete';
type QuoteFields = {
  eventDate: string;
  quantity: string;
  quantityUnit: QuantityUnit;
  service: ServiceType;
  location: string;
};

function localDateString() {
  const date = new Date();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

const mediaRoot = '/assets/';
const photos = [
  { src: 'FB_IMG_1790861797885_1790863362263.jpg', key: 'seafood', fr: 'La mer en grand', ar: 'خيرات البحر', frDetail: 'Grand plateau de fruits de mer et de crustacés pour la réception.', arDetail: 'طبق بحري كبير من القشريات وخيرات البحر للمناسبات.' },
  { src: 'FB_IMG_1790861814293_1790863362298.jpg', key: 'pastries', fr: 'Les bouchées salées', ar: 'مقبلات مالحة', frDetail: 'Assortiment de pièces salées présenté pour le buffet.', arDetail: 'تشكيلة من المقبلات المالحة المقدمة للبوفيه.' },
  { src: 'FB_IMG_1790861819704_1790863362315.jpg', key: 'color', fr: 'Une table généreuse', ar: 'مائدة عامرة', frDetail: 'Composition festive de plats et d’accompagnements à partager.', arDetail: 'تشكيلة احتفالية من الأطباق والمقبلات للمشاركة.' },
  { src: 'IMG_20261001_134816_1790863383739.jpg', key: 'table', fr: 'L’art de recevoir', ar: 'فن الاستقبال', frDetail: 'Mise en place de réception avec vaisselle dorée et fleurs.', arDetail: 'تنسيق مائدة استقبال بأوانٍ ذهبية وزهور.' },
  { src: 'IMG_20261001_134831_1790863383766.jpg', key: 'buffet', fr: 'Le buffet, en fête', ar: 'بوفيه احتفالي', frDetail: 'Buffet de fête composé et dressé pour vos invités.', arDetail: 'بوفيه احتفالي متنوع ومنسق لاستقبال ضيوفكم.' },
  { src: 'IMG_20261001_134845_1790863383798.jpg', key: 'details', fr: 'Chaque détail compte', ar: 'كل تفصيل له قيمة', frDetail: 'Présentation soignée des plats et des détails de table.', arDetail: 'تقديم أنيق للأطباق وتفاصيل المائدة.' },
  { src: 'FB_IMG_1790861764190_1790863328968.jpg', key: 'platter', fr: 'Plateau de la côte', ar: 'طبق من الساحل', frDetail: 'Plateau de la mer garni de crevettes et de produits frais.', arDetail: 'طبق بحري مزين بالجمبري ومكونات طازجة.' },
  { src: 'FB_IMG_1790861789360_1790863346644.jpg', key: 'wedding', fr: 'Le grand plat marocain', ar: 'الطبق المغربي الأصيل', frDetail: 'Plat marocain généreux pour un repas de célébration.', arDetail: 'طبق مغربي عامر لمائدة احتفالية.' },
  { src: 'IMG_20261001_134900_1790863383824.jpg', key: 'setting', fr: 'Dressage de réception', ar: 'تنسيق مائدة الاستقبال', frDetail: 'Composition de table et présentation des mets pour la réception.', arDetail: 'تنسيق مائدة وتقديم أطباق لاستقبال الضيوف.' },
];

const copy = {
  fr: {
    location: 'Tanger, Maroc',
    nav: ['Notre savoir-faire', 'Galerie', 'Contact'],
    quoteNav: 'Devis en ligne',
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
    videoLabel: 'En images',
    videoTitle: <>La fête, dans<br /><em>tous ses détails.</em></>,
    videoIntro: 'Quelques instants pour entrer dans l’univers des réceptions Amrani.',
    film1: 'L’art de la réception', film2: 'Saveurs & savoir-faire',
    filmDescription1: 'Une réception pensée dans ses détails, de la table à l’accueil.',
    filmDescription2: 'Cuisine, dressage et savoir-faire au fil de la préparation.',
    galleryLabel: 'Le carnet des belles tables',
    galleryTitle: <>Des souvenirs qui<br /><em>se partagent.</em></>,
    galleryIntro: 'Quelques tables, quelques plats, et toute la joie autour.',
    galleryHint: 'Sélection de réalisations',
    introImageCaption: 'Mise en place raffinée pour une réception de fête',
    teamCaption: 'Une équipe attentive au service de vos invités',
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
    quoteEyebrow: 'Votre événement, en quelques détails',
    quoteTitle: <>Parlons de votre<br /><em>prochaine fête.</em></>,
    quoteIntro: 'Indiquez-nous l’essentiel : nous préparerons une proposition personnalisée, sans prix estimé à l’aveugle.',
    quoteDate: 'Date de l’événement',
    quoteQuantity: 'Nombre de convives ou de tables',
    quoteGuests: 'Convives',
    quoteTables: 'Tables',
    quoteService: 'Type de prestation',
    quoteServices: [
      { value: 'hospitality', label: 'Service & accueil des invités' },
      { value: 'decor', label: 'Décoration & mise en place' },
      { value: 'food', label: 'Repas & buffet uniquement' },
      { value: 'complete', label: 'Formule complète' },
    ],
    quoteLocation: 'Ville ou lieu de réception',
    quoteLocationPlaceholder: 'Ex. Tanger, salle ou quartier',
    quoteSubmit: 'Préparer ma demande',
    quoteReady: 'Votre demande est prête à être envoyée.',
    quoteMessageHello: 'Bonjour Traiteur Amrani, je souhaite un devis pour mon événement :',
    quoteMessageThanks: 'Merci de me recontacter pour en discuter.',
    quoteCopy: 'Copier la demande',
    quoteCopied: 'Demande copiée',
    quoteCopyError: 'La copie automatique n’est pas disponible. Vous pouvez sélectionner le texte ci-dessus.',
    quoteDisclaimer: 'Chaque devis est établi selon la date, le lieu et les prestations choisies.',
    quoteContact: 'Pour finaliser votre demande, appelez-nous au',
    quoteFieldRequired: 'Ce champ est obligatoire.',
    paymentsLabel: 'Moyens de paiement',
  },
  ar: {
    location: 'طنجة، المغرب',
    nav: ['خبرتنا', 'معرض الصور', 'تواصل معنا'],
    quoteNav: 'طلب عرض الثمن',
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
    videoLabel: 'لحظات مصورة',
    videoTitle: <>الاحتفال، في<br /><em>كل تفاصيله.</em></>,
    videoIntro: 'لحظات قصيرة تأخذكم إلى أجواء مناسبات العمراني.',
    film1: 'فن الاستقبال', film2: 'نكهات وخبرة',
    filmDescription1: 'استقبال متكامل التفاصيل، من تنسيق المائدة إلى حسن الضيافة.',
    filmDescription2: 'لمحات من تحضير الأطباق وتنسيقها وخبرة فريقنا.',
    galleryLabel: 'من دفاتر موائدنا',
    galleryTitle: <>ذكريات حلوة<br /><em>نتشاركها.</em></>,
    galleryIntro: 'موائد وأطباق، وفرح يجمع من حولها.',
    galleryHint: 'مختارات من أعمالنا',
    introImageCaption: 'تنسيق أنيق لمائدة استقبال احتفالية',
    teamCaption: 'فريق يهتم براحة ضيوفكم',
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
    quoteEyebrow: 'احتفالكم، في خطوات بسيطة',
    quoteTitle: <>أخبرونا عن<br /><em>احتفالكم القادم.</em></>,
    quoteIntro: 'شاركوا معنا أهم التفاصيل لنعدّ لكم عرضاً يناسب مناسبتكم، دون تخمين الأسعار.',
    quoteDate: 'تاريخ الحفلة',
    quoteQuantity: 'عدد المعازيم أو الطوابل',
    quoteGuests: 'المعازيم',
    quoteTables: 'الطوابل',
    quoteService: 'نوع الخدمة',
    quoteServices: [
      { value: 'hospitality', label: 'الطيافة وخدمة الضيوف' },
      { value: 'decor', label: 'الديكور وتنسيق القاعة' },
      { value: 'food', label: 'الماكلة بوحدها' },
      { value: 'complete', label: 'الحزمة الشاملة' },
    ],
    quoteLocation: 'المدينة أو مكان الحفل',
    quoteLocationPlaceholder: 'مثال: طنجة، القاعة أو الحي',
    quoteSubmit: 'حضّروا طلب عرض الثمن',
    quoteReady: 'طلبكم جاهز للإرسال.',
    quoteMessageHello: 'السلام عليكم تريتور العمراني، أود طلب عرض ثمن لمناسبتي:',
    quoteMessageThanks: 'شكراً، المرجو التواصل معي لمناقشة التفاصيل.',
    quoteCopy: 'نسخ الطلب',
    quoteCopied: 'تم نسخ الطلب',
    quoteCopyError: 'النسخ التلقائي غير متاح. يمكنكم تحديد النص أعلاه ونسخه.',
    quoteDisclaimer: 'يُحدد كل عرض حسب التاريخ والمكان والخدمات المطلوبة.',
    quoteContact: 'لإتمام طلبكم، اتصلوا بنا على',
    quoteFieldRequired: 'هذا الحقل مطلوب.',
    paymentsLabel: 'وسائل الدفع',
  },
} as const;

function App() {
  const [language, setLanguage] = useState<Language>('fr');
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quote, setQuote] = useState<QuoteFields>({
    eventDate: '',
    quantity: '',
    quantityUnit: 'guests',
    service: 'complete',
    location: '',
  });
  const [quoteMessage, setQuoteMessage] = useState('');
  const [quoteCopied, setQuoteCopied] = useState(false);
  const [quoteCopyError, setQuoteCopyError] = useState(false);
  const t = copy[language];
  const isArabic = language === 'ar';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.title = isArabic ? 'تريتور العمراني — أعراس ومناسبات في طنجة' : 'Traiteur Amrani — Mariages & réceptions à Tanger';
  }, [language, isArabic]);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

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

  const switchLanguage = (next: Language) => {
    setLanguage(next);
    setQuoteMessage('');
    setQuoteCopied(false);
    setQuoteCopyError(false);
  };
  const updateQuote = <K extends keyof QuoteFields,>(field: K, value: QuoteFields[K]) => {
    setQuote((current) => ({ ...current, [field]: value }));
    setQuoteMessage('');
    setQuoteCopied(false);
    setQuoteCopyError(false);
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const serviceLabel = t.quoteServices.find((service) => service.value === quote.service)?.label ?? '';
    const quantityLabel = quote.quantityUnit === 'guests' ? t.quoteGuests : t.quoteTables;
    setQuoteMessage([
      t.quoteMessageHello,
      `${t.quoteDate}: ${quote.eventDate}`,
      `${t.quoteQuantity}: ${quote.quantity} ${quantityLabel.toLowerCase()}`,
      `${t.quoteService}: ${serviceLabel}`,
      `${t.quoteLocation}: ${quote.location}`,
      t.quoteMessageThanks,
    ].join('\n'));
  };

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(quoteMessage);
      setQuoteCopied(true);
      setQuoteCopyError(false);
    } catch {
      setQuoteCopyError(true);
      setQuoteCopied(false);
    }
  };

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
            <a href="#devis" onClick={() => setMobileMenuOpen(false)} data-testid="link-nav-quote">{t.quoteNav}</a>
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
            <figure className="intro-image image-frame">
              <img src={`${mediaRoot}IMG_20261001_134816_1790863383739.jpg`} alt={isArabic ? 'مائدة استقبال أنيقة بأطباق ذهبية وزهور وسطية' : 'Table de réception dressée de vaisselle dorée et d’un bouquet central'} width="773" height="1024" loading="lazy" data-testid="img-intro-table" />
              <span className="image-index">AMRANI / TANGER</span>
              <figcaption className="intro-image-caption">{t.introImageCaption}</figcaption>
            </figure>
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
          <figure className="editorial-photo image-frame">
            <img src={`${mediaRoot}FB_IMG_1790861993343_1790863383686.jpg`} alt={isArabic ? 'فريق تريتور العمراني مجتمعاً في قاعة احتفالات' : 'L’équipe Traiteur Amrani réunie dans une salle de réception'} width="1024" height="576" loading="lazy" data-testid="img-team" />
            <figcaption className="editorial-caption">{t.teamCaption}</figcaption>
          </figure>
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
                 <figcaption><span className="film-index">FILM / 01</span><div className="film-caption-copy"><strong className="serif">{t.film1}</strong><small>{t.filmDescription1}</small></div></figcaption>
              </figure>
              <figure className="film-card">
                <div className="film-frame"><video controls playsInline preload="metadata" poster={`${mediaRoot}IMG_20261001_134831_1790863383766.jpg`} aria-label={t.film2} data-testid="video-savoir-faire"><source src={`${mediaRoot}54388237-7621-4a8f-9c5a-de0e2ad6aa55_1790863460571.mp4`} type="video/mp4" />{isArabic ? 'المتصفح لا يدعم تشغيل الفيديو.' : 'Votre navigateur ne peut pas lire cette vidéo.'}</video><span className="film-label"><Play size={12} fill="currentColor" aria-hidden="true" />{t.videoPlay}</span></div>
                 <figcaption><span className="film-index">FILM / 02</span><div className="film-caption-copy"><strong className="serif">{t.film2}</strong><small>{t.filmDescription2}</small></div></figcaption>
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
                  <img src={`${mediaRoot}${photo.src}`} alt={`${isArabic ? photo.ar : photo.fr}. ${isArabic ? photo.arDetail : photo.frDetail}`} width="820" height="1000" loading="lazy" />
                  <span className="gallery-overlay" aria-hidden="true"><ArrowUpRight size={17} /></span>
                  <span className="gallery-caption" aria-hidden="true">
                    <span className="gallery-caption-copy"><strong>{isArabic ? photo.ar : photo.fr}</strong><small>{isArabic ? photo.arDetail : photo.frDetail}</small></span>
                    <span className="gallery-caption-number">0{index + 1}</span>
                  </span>
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

        <section className="quote-section" id="devis" aria-labelledby="quote-title" data-testid="section-quote">
          <div className="section-wrap quote-layout">
            <div className="quote-intro">
              <p className="eyebrow">{t.quoteEyebrow}</p>
              <h2 id="quote-title" className="section-title serif">{t.quoteTitle}</h2>
              <p className="quote-description">{t.quoteIntro}</p>
              <p className="quote-disclaimer"><span aria-hidden="true">✦</span>{t.quoteDisclaimer}</p>
            </div>
            <div className="quote-panel">
              <form className="quote-form" onSubmit={submitQuote} data-testid="form-quote">
                <label className="quote-field">
                  <span>{t.quoteDate}</span>
                  <input type="date" min={localDateString()} required value={quote.eventDate} onChange={(event) => updateQuote('eventDate', event.target.value)} data-testid="input-event-date" />
                </label>

                <fieldset className="quote-field quote-count-field">
                  <legend>{t.quoteQuantity}</legend>
                  <div className="quote-count-options">
                    <label className={`quote-count-option ${quote.quantityUnit === 'guests' ? 'selected' : ''}`}>
                      <input type="radio" name="quote-quantity-unit" value="guests" checked={quote.quantityUnit === 'guests'} onChange={() => updateQuote('quantityUnit', 'guests')} data-testid="radio-count-guests" />
                      <span>{t.quoteGuests}</span>
                    </label>
                    <label className={`quote-count-option ${quote.quantityUnit === 'tables' ? 'selected' : ''}`}>
                      <input type="radio" name="quote-quantity-unit" value="tables" checked={quote.quantityUnit === 'tables'} onChange={() => updateQuote('quantityUnit', 'tables')} data-testid="radio-count-tables" />
                      <span>{t.quoteTables}</span>
                    </label>
                  </div>
                  <input className="quote-number" type="number" min="1" step="1" inputMode="numeric" required value={quote.quantity} onChange={(event) => updateQuote('quantity', event.target.value)} aria-label={t.quoteQuantity} placeholder="120" data-testid="input-guest-count" />
                </fieldset>

                <label className="quote-field">
                  <span>{t.quoteService}</span>
                  <select required value={quote.service} onChange={(event) => updateQuote('service', event.target.value as ServiceType)} data-testid="select-service-type">
                    {t.quoteServices.map((service) => <option key={service.value} value={service.value}>{service.label}</option>)}
                  </select>
                </label>

                <label className="quote-field">
                  <span>{t.quoteLocation}</span>
                  <input type="text" required maxLength={120} autoComplete="address-level2" value={quote.location} onChange={(event) => updateQuote('location', event.target.value)} placeholder={t.quoteLocationPlaceholder} data-testid="input-event-location" />
                </label>

                <button type="submit" className="button button-gold quote-submit focus-ring" data-testid="button-submit-quote">
                  {t.quoteSubmit}<ArrowUpRight size={15} aria-hidden="true" />
                </button>
              </form>

              {quoteMessage && (
                <div className="quote-result" role="status" aria-live="polite" data-testid="quote-result">
                  <p className="quote-result-title"><Check size={16} aria-hidden="true" />{t.quoteReady}</p>
                  <pre className="quote-message" dir={isArabic ? 'rtl' : 'ltr'}>{quoteMessage}</pre>
                  <div className="quote-result-actions">
                    <button type="button" className="button quote-copy focus-ring" onClick={copyQuote} data-testid="button-copy-quote">
                      {quoteCopied ? <Check size={15} aria-hidden="true" /> : null}{quoteCopied ? t.quoteCopied : t.quoteCopy}
                    </button>
                    <span className="quote-contact">{t.quoteContact} <a href="tel:+212654762729" dir="ltr" data-testid="link-quote-phone">+212 654-762729</a></span>
                  </div>
                  {quoteCopyError && <p className="quote-copy-error">{t.quoteCopyError}</p>}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="payments">
        <div className="section-wrap footer-inner">
          <a className="footer-brand focus-ring" href="#top" data-testid="link-footer-brand"><img src={`${mediaRoot}IMG_20261001_133238_1790863328946.jpg`} alt="" width="42" height="42" /><span><strong>Amrani</strong><small>TRAITEUR · TANGER</small></span></a>
          <p>{t.footerLine}</p>
          <a className="back-top focus-ring" href="#top" data-testid="link-back-to-top">{t.backTop}<ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
        <div className="footer-bottom section-wrap"><span>© {new Date().getFullYear()} TRAITEUR AMRANI</span><span>{t.location}</span><span>{t.footerMark}</span></div>
        <div className="footer-payments section-wrap" aria-label={t.paymentsLabel} data-testid="footer-payment-methods">
          <span className="footer-payments-label">{t.paymentsLabel}</span>
          <div className="payment-badges">
            <span className="payment-badge payment-visa" aria-label="Visa"><SiVisa aria-hidden="true" /></span>
            <span className="payment-badge payment-mastercard" aria-label="Mastercard"><SiMastercard aria-hidden="true" /></span>
            <span className="payment-badge payment-applepay" aria-label="Apple Pay"><SiApplepay aria-hidden="true" /></span>
            <span className="payment-badge payment-paypal" aria-label="PayPal"><SiPaypal aria-hidden="true" /></span>
            <span className="payment-badge payment-stripe" aria-label="Stripe"><SiStripe aria-hidden="true" /></span>
          </div>
        </div>
      </footer>

      {selectedPhoto !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={isArabic ? 'معرض الصور' : 'Galerie photo'} onClick={() => setSelectedPhoto(null)} data-testid="dialog-gallery-lightbox">
          <button className="lightbox-close focus-ring" type="button" aria-label={t.imageClose} onClick={() => setSelectedPhoto(null)} data-testid="button-gallery-close"><X size={22} /></button>
          <button className="lightbox-arrow lightbox-prev focus-ring" type="button" aria-label={t.imagePrev} onClick={(event) => { event.stopPropagation(); setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length); }} data-testid="button-gallery-prev"><ChevronLeft size={25} /></button>
          <figure className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img src={`${mediaRoot}${photos[selectedPhoto].src}`} alt={isArabic ? photos[selectedPhoto].ar : photos[selectedPhoto].fr} data-testid="img-gallery-lightbox" />
             <figcaption><span>0{selectedPhoto + 1} / 0{photos.length}</span><span className="lightbox-caption-copy"><strong>{isArabic ? photos[selectedPhoto].ar : photos[selectedPhoto].fr}</strong><small>{isArabic ? photos[selectedPhoto].arDetail : photos[selectedPhoto].frDetail}</small></span></figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next focus-ring" type="button" aria-label={t.imageNext} onClick={(event) => { event.stopPropagation(); setSelectedPhoto((selectedPhoto + 1) % photos.length); }} data-testid="button-gallery-next"><ChevronRight size={25} /></button>
        </div>
      )}
    </div>
  );
}

export default App;