import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowLeft, ArrowUpRight, Check, FilePlus2, Mail, Menu, MessageCircle, Search, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';

const queryClient = new QueryClient();
const CONTACT_EMAIL = 'medkoyi1@gmail.com';
const WHATSAPP_LINK = 'https://wa.me/22897899364';
const TIKTOK_LINK = 'https://www.tiktok.com/@md.koyi.graphiste?is_from_webapp=1&sender_device=pc';
const logoImage = `${import.meta.env.BASE_URL}pionnier-logo.png`;
const portraitImage = `${import.meta.env.BASE_URL}pionnier-portrait.png`;
const aboutPosterImage = `${import.meta.env.BASE_URL}med-koyi-poster.jpg`;
const aboutProfileImage = `${import.meta.env.BASE_URL}med-koyi-profile.jpg`;
const projectImages = {
  kondoTextile: `${import.meta.env.BASE_URL}kondo-textile.jpg`,
  kondoSacs: `${import.meta.env.BASE_URL}kondo-sacs.jpg`,
  solree: `${import.meta.env.BASE_URL}solree-event.png`,
  nexora: `${import.meta.env.BASE_URL}nexora-tech.jpg`,
  adeny: `${import.meta.env.BASE_URL}adeny.jpg`,
  kalima: `${import.meta.env.BASE_URL}projet-kalima.jpg`,
  evenementiels: `${import.meta.env.BASE_URL}projet-evenementiels.jpg`,
  differentsTravaux: `${import.meta.env.BASE_URL}projet-differents-travaux.jpg`,
};
const serviceVideos = {
  logo: 'https://videos.pexels.com/video-files/5928287/5928287-hd_1080_1920_25fps.mp4',
  identity: 'https://videos.pexels.com/video-files/6013203/6013203-uhd_4096_2160_24fps.mp4',
  campaign: 'https://videos.pexels.com/video-files/3125907/3125907-hd_1920_1080_25fps.mp4',
  packaging: 'https://videos.pexels.com/video-files/6013203/6013203-uhd_4096_2160_24fps.mp4',
  communication: 'https://videos.pexels.com/video-files/3125907/3125907-hd_1920_1080_25fps.mp4',
};
const savoirFaireVideo = 'https://videos.pexels.com/video-files/2539567/2539567-hd_1920_1080_24fps.mp4';

type Project = {
  slug: string;
  number: string;
  name: string;
  client: string;
  year: string;
  category: string;
  summary: string;
  tags: string[];
  tone: 'red' | 'orange' | 'violet' | 'cream';
  result: string;
  images: string[];
};

const projects: Project[] = [
  {
    slug: 'atelier-noma',
    number: '01',
    name: 'Atelier Noma',
    client: 'Maison d’édition indépendante',
    year: '2024',
    category: 'Identité · Direction artistique',
    summary: 'Faire d’une maison d’édition confidentielle un territoire éditorial désirable, radical et immédiatement reconnaissable.',
    tags: ['Identité', 'Édition', 'Digital'],
    tone: 'orange',
    result: 'Une identité modulaire qui se décline aussi bien en couverture qu’en événement.',
    images: [projectImages.kondoTextile],
  },
  {
    slug: 'météore-studio',
    number: '02',
    name: 'Météore Studio',
    client: 'Collectif de production culturelle',
    year: '2023',
    category: 'Positionnement · Système visuel',
    summary: 'Donner à un collectif pluridisciplinaire une signature visuelle à la hauteur de ses projets hors-cadre.',
    tags: ['Stratégie', 'Direction artistique', 'Campagne'],
    tone: 'red',
    result: 'Un système de marque vivant, pensé pour bouger avec chaque nouvelle production.',
    images: [projectImages.solree],
  },
  {
    slug: 'sillage',
    number: '03',
    name: 'Sillage',
    client: 'Marque de soin indépendante',
    year: '2022',
    category: 'Naming · Packaging · Digital',
    summary: 'Construire une marque de soin sensible et contemporaine sans tomber dans les codes attendus de la beauté.',
    tags: ['Naming', 'Packaging', 'E-commerce'],
    tone: 'violet',
    result: 'Une présence singulière qui a installé la marque dans 42 points de vente en un an.',
    images: [projectImages.nexora],
  },
  {
    slug: 'les-ondes',
    number: '04',
    name: 'Les Ondes',
    client: 'Festival de création sonore',
    year: '2021',
    category: 'Campagne · Expérience',
    summary: 'Transformer un programme complexe en expérience graphique claire, généreuse et pleine de mouvement.',
    tags: ['Campagne', 'Scénographie', 'Social'],
    tone: 'cream',
    result: 'Une campagne qui a fait grimper les réservations de 31% en deux éditions.',
    images: [projectImages.adeny],
  },
  {
    slug: 'kalima-packaging',
    number: '05',
    name: 'Kalima',
    client: 'Création packaging',
    year: '2026',
    category: 'Packaging · Campagne',
    summary: 'Construire un territoire packaging gourmand, énergique et immédiatement identifiable pour une gamme d’épices.',
    tags: ['Packaging', 'Campagne', 'Alimentaire'],
    tone: 'red',
    result: 'Une direction visuelle chaleureuse qui donne au produit une présence forte en rayon et dans les contenus.',
    images: [projectImages.kalima],
  },
  {
    slug: 'crea-evenementiels',
    number: '06',
    name: 'Créa, événementiels',
    client: 'Direction artistique événementielle',
    year: '2026',
    category: 'Événementiel · Affiche',
    summary: 'Créer des affiches qui donnent envie de sortir, de se retrouver et de vivre chaque rendez-vous comme une expérience.',
    tags: ['Affiche', 'Événementiel', 'Social'],
    tone: 'orange',
    result: 'Une série de visuels conçus pour attirer le regard et faire circuler l’énergie des événements.',
    images: [projectImages.evenementiels],
  },
  {
    slug: 'differents-travaux',
    number: '07',
    name: 'Différents travaux',
    client: 'Sélection graphique',
    year: '2026',
    category: 'Portfolio · Sélection',
    summary: 'Un dernier regard sur des travaux variés, réalisés avec la même envie de donner une forme juste aux idées.',
    tags: ['Sélection', 'Graphisme', 'Direction artistique'],
    tone: 'red',
    result: 'Des explorations différentes réunies par une même signature : créer avec intention.',
    images: [projectImages.differentsTravaux],
  },
];

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/projets', label: 'Projets' },
  { href: '/services', label: 'Services' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} — Pionnier Créatif`;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.setAttribute('content', description);
    const socialTitle = document.querySelector('meta[property="og:title"]');
    if (socialTitle) socialTitle.setAttribute('content', `${title} — Pionnier Créatif`);
    const socialDescription = document.querySelector('meta[property="og:description"]');
    if (socialDescription) socialDescription.setAttribute('content', description);
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', `${title} — Pionnier Créatif`);
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', description);
  }, [title, description]);
}

function SiteNav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => href === '/' ? location === '/' : location.startsWith(href);

  return (
    <>
      <header className="site-nav" data-testid="site-navigation">
        <Link href="/" className="brand-mark" data-testid="link-brand">
          <img className="brand-logo" src={logoImage} alt="Pionnier Créatif" />
          <span className="sr-only">Pionnier Créatif</span>
        </Link>
        <nav className="nav-links" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link ${isActive(item.href) ? 'active' : ''}`} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="nav-cta" data-testid="link-nav-brief">Parler d’un projet <ArrowUpRight size={14} /></Link>
        <button type="button" className="menu-toggle" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)} data-testid="button-toggle-menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>
      {open && (
        <nav className="mobile-menu" aria-label="Navigation mobile" data-testid="mobile-navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`mobile-nav-link ${isActive(item.href) ? 'active' : ''}`} onClick={() => setOpen(false)} aria-current={isActive(item.href) ? 'page' : undefined} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link href="/" className="footer-brand" data-testid="link-footer-brand">
            <img className="footer-logo" src={logoImage} alt="Pionnier Créatif" />
          </Link>
          <p className="footer-copy">Direction artistique indépendante pour celles et ceux qui veulent faire les choses autrement.</p>
        </div>
        <div className="footer-copy">
          <p>Disponible partout<br />pour les projets qui comptent.</p>
          <p><a href={`mailto:${CONTACT_EMAIL}`} data-testid="link-footer-email">{CONTACT_EMAIL}</a><br /><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" data-testid="link-footer-whatsapp">WhatsApp</a></p>
        </div>
        <div className="footer-copy">
          <p><a href={TIKTOK_LINK} target="_blank" rel="noreferrer" data-testid="link-footer-tiktok">TikTok</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 Pionnier Créatif</span>
        <span>Créer sa voie. Oser. Évoluer.</span>
      </div>
    </footer>
  );
}

function SplashIntro() {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 7500);
    const removeTimer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
    }, 8400);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const skipIntro = () => setIsLeaving(true);

  return (
    <div className={`splash-intro ${isLeaving ? 'is-leaving' : ''}`} aria-label="Introduction Pionnier Créatif">
      <video className="splash-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
        <source src={savoirFaireVideo} type="video/mp4" />
      </video>
      <div className="splash-overlay" aria-hidden="true" />
      <div className="splash-content">
        <div className="splash-kicker">Méd Koyi · Founder of Pionnier Créatif</div>
        <div className="splash-title" aria-label="Pionnier Créatif">
          <span className="splash-line splash-line-left">PIONNIER</span>
          <span className="splash-line splash-line-right">CRÉATIF</span>
        </div>
        <div className="splash-location">
          <span className="togo-flag" aria-hidden="true"><i /><i /><i /><i /><b /></span>
          <span>LOMÉ · TOGO</span>
        </div>
      </div>
      <button type="button" className="splash-skip" onClick={skipIntro}>Passer l’intro <ArrowUpRight size={14} /></button>
    </div>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
  return <><SplashIntro /><div className={`site-shell ${location === '/' ? 'home-shell' : ''}`}><SiteNav /><main className="main-wrap">{children}</main><Footer /></div></>;
}

function ButtonLink({ href, children, variant = 'dark' }: { href: string; children: ReactNode; variant?: 'dark' | 'light' | 'ghost' | 'red' }) {
  return <Link href={href} className={`btn btn-${variant}`} data-testid={`link-cta-${href.replaceAll('/', '') || 'home'}`}>{children}<ArrowUpRight size={15} /></Link>;
}

function Ticker() {
  const items = ['Identités qui ont du sens', 'Créer sa voie', 'Direction artistique', 'Oser évoluer'];
  return <div className="ticker" aria-label="Pionnier Créatif, direction artistique">
    <div className="ticker-track">{[...items, ...items].map((item, index) => <span className="ticker-item" key={`${item}-${index}`}>{item}</span>)}</div>
  </div>;
}

function HomePage() {
  usePageMeta('Pionnier Créatif — Méd Koyi', 'Pionnier Créatif est le studio de graphisme et direction artistique fondé par Méd Koyi.');
  return (
    <>
      <section className="hero" data-testid="section-hero">
        <div className="hero-grid">
          <div className="hero-kicker reveal"><span>Méd Koyi</span><span>Founder of Pionnier Créatif</span></div>
          <h1 className="hero-title display reveal delay-1"><span>Je crée</span><span className="outline">des chemins</span><span>visuels.</span></h1>
          <div className="hero-bottom reveal delay-2">
            <p className="hero-copy">Je transforme les idées en identités visuelles qui ont du sens.</p>
            <div className="hero-actions"><ButtonLink href="/projets" variant="light">Voir les projets</ButtonLink><ButtonLink href="/contact" variant="ghost">Parler du vôtre</ButtonLink></div>
          </div>
        </div>
        <span className="hero-star" aria-hidden="true">*</span>
      </section>
      <section className="home-intro" data-testid="section-home-intro">
        <div className="home-intro-inner">
          <span className="eyebrow">01 / La vision</span>
          <h2 className="home-intro-title">Les bonnes idées méritent plus qu’un joli <em>logo.</em></h2>
          <p className="home-intro-copy">Une marque n’est pas une façade. C’est une façon de prendre position, de créer du lien et d’avancer avec justesse.</p>
          <span className="home-intro-star" aria-hidden="true">*</span>
        </div>
      </section>
      <Ticker />
      <section className="section" id="vision" data-testid="section-vision">
        <div className="section-inner intro-grid">
          <div>
            <span className="eyebrow">01 / La vision</span>
            <h2 className="section-title display">Les bonnes idées méritent plus qu’un joli <em>logo.</em></h2>
          </div>
          <aside className="intro-aside">
            <span className="star" aria-hidden="true">*</span>
            <p>Une marque n’est pas une façade. C’est une façon de prendre position.</p>
            <span className="mini-meta">Manifeste / 01</span>
          </aside>
        </div>
      </section>
      <section className="section manifesto" data-testid="section-manifesto">
        <div className="section-inner">
          {[
            ['01', 'Clarifier ce qui vous rend singulier.'],
            ['02', 'Donner une forme à votre ambition.'],
            ['03', 'Construire un système qui tient dans le temps.'],
          ].map(([number, copy]) => <div className="manifesto-row" key={number}><span className="manifesto-num">{number}</span><span className="manifesto-copy">{copy}</span></div>)}
        </div>
      </section>
      <ProjectsPreview />
      <ServicesPreview />
      <section className="quote-band" data-testid="section-quote">
        <blockquote>Créer sa voie.<br /><span>Oser.</span><br />Évoluer.</blockquote>
      </section>
      <AboutPreview />
      <ContactSection showForm={false} />
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [, navigate] = useLocation();
  const [opening, setOpening] = useState(false);
  const projectHref = `/projets/${project.slug}`;

  const openProject = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => navigate(projectHref), 180);
  };

  return (
    <Link href={projectHref} onClick={openProject} className={`project-card ${project.tone} ${opening ? 'is-opening' : ''}`} data-testid={`card-project-${project.slug}`}>
      <div className="project-top"><span>{project.number} / {project.year}</span><span>{project.client}</span></div>
      <img className="project-card-image" src={project.images[0]} alt="" aria-hidden="true" />
      <span className="project-card-image-overlay" aria-hidden="true" />
      <div className="project-footer">
        <div><h3 className="project-name">{project.name}</h3><div className="project-tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
        <span className="circle-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
      </div>
    </Link>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <span className={`project-gallery-art ${project.tone}`} aria-hidden="true">
      <img className="project-gallery-image" src={project.images[0]} alt="" />
      <span className="gallery-art-meta">{project.number} / {project.year}</span>
      <span className="gallery-art-client">{project.client}</span>
    </span>
  );
}

function ProjectGalleryCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const open = () => onOpen(project);
  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  };
  return (
    <article className={`project-gallery-card ${project.tone}`} onClick={open} onKeyDown={handleKeyDown} role="button" tabIndex={0} aria-label={`Ouvrir le projet ${project.name}`} data-testid={`card-gallery-${project.slug}`}>
      <ProjectVisual project={project} />
      <div className="project-gallery-caption">
        <span className="project-gallery-category">{project.category}</span>
        <h2 className="project-gallery-name">{project.name}</h2>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="project-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}>
      <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <button type="button" className="project-modal-close" onClick={onClose} aria-label="Fermer le visuel" data-testid="button-close-project-modal">
          <X size={20} />
        </button>
        <div className="project-modal-visual"><ProjectVisual project={project} /></div>
        <div className="project-modal-copy">
          <span className="eyebrow">{project.number} / {project.category}</span>
          <h2 id="project-modal-title">{project.name}</h2>
          <p>{project.summary}</p>
          <div className="project-modal-tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
          <Link href={`/projets/${project.slug}`} className="btn btn-red" onClick={onClose}>Voir l’étude de cas <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </div>
  );
}

function ProjectsPreview() {
  return <section className="section dark-section" id="projets" data-testid="section-projects">
    <div className="section-inner">
      <div className="projects-head"><div><span className="eyebrow">02 / Projets choisis</span><h2 className="section-title display">Des idées mises <em>en mouvement.</em></h2></div><p className="projects-intro">Chaque projet commence par une question, pas par une tendance. Voici quelques réponses construites avec des marques ambitieuses.</p></div>
      <div className="project-list">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
      <Link href="/projets" className="view-all" data-testid="link-all-projects">Explorer tous les projets <ArrowUpRight size={17} /></Link>
    </div>
  </section>;
}

function ServicesPreview() {
  const services = [
    ['01', 'Positionnement', 'Trouver le mot, l’angle et la place qui rendent votre projet évident.', serviceVideos.logo],
    ['02', 'Identité visuelle', 'Créer un langage visuel complet, reconnaissable et prêt à vivre.', serviceVideos.identity],
    ['03', 'Direction artistique', 'Donner une direction juste à vos campagnes, contenus et expériences.', serviceVideos.campaign],
    ['04', 'Accompagnement', 'Faire grandir votre marque sans perdre son élan ni sa cohérence.', savoirFaireVideo],
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} className={`services-immersive ${isVisible ? 'is-visible' : ''}`} id="services" data-testid="section-services">
    <div className="services-immersive-bg" style={{ backgroundImage: `url(${portraitImage})` }} aria-hidden="true" />
    <div className="services-immersive-overlay" aria-hidden="true" />
    <div className="services-immersive-inner">
      <div className="services-immersive-heading">
        <span className="eyebrow">03 / Savoir-faire</span>
        <h2 className="section-title display">De l’intuition à la <em>trajectoire.</em></h2>
        <p>Nous transformons les idées fortes en identités visuelles claires, cohérentes et prêtes à avancer avec votre projet.</p>
      </div>
      <div className="services-panels">
        {services.map(([number, title, copy, video], index) => <article className={`service-panel service-panel-${index + 1}`} key={number} data-testid={`card-service-${number}`}>
          <video className="service-panel-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
            <source src={video} type="video/mp4" />
          </video>
          <span className="service-panel-overlay" aria-hidden="true" />
          <div className="service-panel-content">
            <div className="service-panel-top"><span>{number}</span><ArrowUpRight size={18} /></div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        </article>)}
      </div>
      <div className="services-immersive-action"><ButtonLink href="/services" variant="light">Découvrir l’approche</ButtonLink></div>
    </div>
  </section>;
}

function PortraitBlock({ label, detail }: { label: string; detail: string }) {
  return <div className="portrait-block">
    <img className="portrait-image" src={portraitImage} alt="Portrait du créateur de Pionnier Créatif" />
    <div className="portrait-caption"><span>{label}</span><span>{detail}</span></div>
  </div>;
}

function AboutPreview() {
  return <section className="section" id="a-propos" data-testid="section-about">
    <div className="section-inner about-layout"><PortraitBlock label="À propos / 04" detail="Méd Koyi · direction artistique" />
      <div className="about-copy"><span className="eyebrow">04 / À propos</span><p>Je suis <strong>Méd Koyi</strong>, la personne derrière Pionnier Créatif. J’aime les idées nettes, les détails qui décalent et les marques qui avancent.</p><p className="small-copy">Direction artistique, design graphique et stratégie de marque : je travaille en solo ou avec une équipe choisie selon chaque terrain de jeu. Mon rôle est de faire émerger ce qui vous appartient déjà.</p><div className="about-meta"><div><span className="meta-label">Disponibilité</span><span className="meta-value">Partout, à distance</span></div><div><span className="meta-label">Terrain</span><span className="meta-value">Culture · lifestyle · impact</span></div></div><div style={{ marginTop: '30px' }}><ButtonLink href="/a-propos" variant="ghost">En savoir plus</ButtonLink></div></div>
    </div>
  </section>;
}

function ContactSection({ showForm = true }: { showForm?: boolean }) {
  return <section className="section dark-section" id="contact" data-testid="section-contact"><div className="section-inner contact-grid"><div><span className="eyebrow">05 / Le prochain pas</span><h2 className="contact-title">On ouvre une <em>nouvelle voie ?</em></h2><p className="contact-note">Un projet en tête, un virage à prendre ou simplement l’envie de confronter une idée ? Racontez-moi le début de l’histoire.</p><div className="contact-details"><a className="contact-detail" href={`mailto:${CONTACT_EMAIL}`} data-testid="link-contact-email"><span className="detail-icon"><Mail size={15} /></span>{CONTACT_EMAIL}</a><a className="contact-detail" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" data-testid="link-contact-whatsapp"><span className="detail-icon"><MessageCircle size={15} /></span>WhatsApp · +228 97 89 93 64</a></div></div>{showForm && <ContactForm />}</div></section>;
}

type FormState = { name: string; email: string; type: string; objective: string; budget: string; deadline: string; message: string };

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [attachment, setAttachment] = useState('');
  const [form, setForm] = useState<FormState>({ name: '', email: '', type: '', objective: '', budget: '', deadline: '', message: '' });
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      'Bonjour, je souhaite parler de mon projet avec Pionnier Créatif.',
      '',
      `Nom / entreprise : ${form.name}`,
      `Email ou WhatsApp : ${form.email}`,
      `Type de projet : ${form.type}`,
      `Budget indicatif : ${form.budget || 'À préciser'}`,
      `Objectif : ${form.objective || 'À préciser'}`,
      `Deadline souhaitée : ${form.deadline || 'À préciser'}`,
      '',
      `Contexte : ${form.message}`,
      attachment ? `Référence / brief : ${attachment}` : '',
    ].filter(Boolean).join('\n');
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };
  if (submitted) return <div className="contact-form success-state" data-testid="status-form-success"><span className="success-mark"><Check size={25} /></span><h3>WhatsApp est ouvert.</h3><p>Votre message a été préparé avec les informations du formulaire. Vous pouvez l’envoyer directement dans la conversation.</p><button className="text-button" type="button" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', type: '', objective: '', budget: '', deadline: '', message: '' }); setAttachment(''); }} data-testid="button-reset-form">Préparer un autre message</button></div>;
  return <form className="contact-form" onSubmit={handleSubmit} data-testid="form-contact"><p className="form-intro">Parlez-moi de votre projet.</p>
    <div className="form-row"><div className="field"><label htmlFor="name">Nom / entreprise *</label><input id="name" required value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Votre nom" data-testid="input-name" /></div><div className="field"><label htmlFor="email">Email ou WhatsApp *</label><input id="email" required value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="Pour vous répondre" data-testid="input-email" /></div></div>
    <div className="form-row"><div className="field"><label htmlFor="type">Type de projet *</label><select id="type" required value={form.type} onChange={(event) => update('type', event.target.value)} data-testid="select-project-type"><option value="">Choisir une piste</option><option>Identité visuelle</option><option>Direction artistique</option><option>Campagne</option><option>Autre / à définir</option></select></div><div className="field"><label htmlFor="budget">Budget indicatif</label><select id="budget" value={form.budget} onChange={(event) => update('budget', event.target.value)} data-testid="select-budget"><option value="">À préciser</option><option>2 000 — 5 000 €</option><option>5 000 — 10 000 €</option><option>10 000 € et plus</option></select></div></div>
    <div className="form-row"><div className="field"><label htmlFor="objective">Objectif</label><input id="objective" value={form.objective} onChange={(event) => update('objective', event.target.value)} placeholder="Ce que le projet doit changer" data-testid="input-objective" /></div><div className="field"><label htmlFor="deadline">Deadline souhaitée</label><input id="deadline" value={form.deadline} onChange={(event) => update('deadline', event.target.value)} placeholder="Ex. septembre 2024" data-testid="input-deadline" /></div></div>
    <div className="field"><label htmlFor="message">Le contexte, en quelques mots *</label><textarea id="message" required value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="D’où partez-vous ?" data-testid="textarea-message" /></div>
    <div className="field"><label htmlFor="attachment">Référence / brief</label><input id="attachment" type="file" onChange={(event) => setAttachment(event.target.files?.[0]?.name ?? '')} data-testid="input-attachment" /><span className="form-helper">{attachment ? <><FilePlus2 size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{attachment}</> : 'PDF, PNG ou JPG · optionnel · 10 Mo max'}</span></div>
    <button className="btn btn-red form-submit" type="submit" data-testid="button-submit-contact">Envoyer la demande <ArrowUpRight size={16} /></button>
  </form>;
}

function ProjectsPage() {
  usePageMeta('Projets', 'Découvrez les identités visuelles, campagnes et systèmes de marque conçus par Pionnier Créatif.');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProjects = projects.filter((project) => [project.name, project.client, project.category, ...project.tags].join(' ').toLowerCase().includes(searchTerm.toLowerCase().trim()));
  return <>
    <section className="project-store-hero">
      <div className="project-store-hero-inner"><h1 className="display">Notre <span>conception.</span></h1><p>Des identités, campagnes et expériences visuelles pensées pour donner une forme juste aux bonnes idées.</p></div>
    </section>
    <section className="section project-gallery-section" data-testid="page-projects">
      <div className="section-inner">
        <div className="project-store-toolbar">
          <label className="project-search">
            <span className="sr-only">Rechercher un projet</span>
            <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Modèles de recherche" data-testid="input-project-search" />
            <span className="project-search-icon"><Search size={22} /></span>
          </label>
        </div>
        {filteredProjects.length > 0 ? <div className="project-gallery-grid">{filteredProjects.map((project) => <ProjectGalleryCard key={project.slug} project={project} onOpen={setSelectedProject} />)}</div> : <div className="project-empty-state"><Search size={25} /><h2>Aucun projet trouvé.</h2><p>Essayez un autre mot-clé ou explorez toute la sélection.</p><button type="button" className="btn btn-dark" onClick={() => setSearchTerm('')}>Réinitialiser la recherche</button></div>}
      </div>
    </section>
    {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
  </>;
}

function ServicesPage() {
  usePageMeta('Services', 'Positionnement, identité visuelle, direction artistique et accompagnement de marques ambitieuses.');
  const services = [
    ['01', 'Conception de logo', 'Créer un signe fort, lisible et mémorable pour donner un visage clair à votre activité.', serviceVideos.logo],
    ['02', 'Conception d’identité visuelle', 'Construire un univers cohérent avec une palette, une typographie et des règles prêtes à être utilisées.', serviceVideos.identity],
    ['03', 'Visuels de campagnes publicitaires', 'Imaginer des visuels qui attirent l’attention, racontent une idée et donnent envie de passer à l’action.', serviceVideos.campaign],
    ['04', 'Réalisation de packaging', 'Donner à vos produits une présence désirable, reconnaissable et adaptée à chaque support.', serviceVideos.packaging],
    ['05', 'Communication visuelle', 'Décliner votre message sur les supports qui font vivre votre marque au quotidien.', serviceVideos.communication],
  ];

  return <>
    <section className="case-hero">
      <div className="case-hero-inner">
        <span className="eyebrow">Services / création visuelle</span>
        <h1 className="display">Donner une<br /><span className="outline">forme.</span></h1>
        <p>De l’idée au support final, Pionnier Créatif conçoit les éléments visuels qui rendent votre activité claire, crédible et impossible à confondre.</p>
      </div>
    </section>
    <section className="section">
      <div className="section-inner">
        <span className="eyebrow">Ce que je peux créer pour vous</span>
        <h2 className="services-page-title">Des solutions visuelles pensées pour <em>avancer.</em></h2>
        <div className="services-grid services-page-grid">
          {services.map(([number, title, copy, video]) => (
            <article className="service service-image-card" key={number}>
              <video className="service-card-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
                <source src={video} type="video/mp4" />
              </video>
              <span className="service-image-overlay" aria-hidden="true" />
              <div className="service-card-content">
                <span className="service-no">{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="quote-band"><blockquote>Une identité forte n’explique pas tout.<br /><span>Elle donne envie d’aller voir.</span></blockquote></section>
    <ContactSection showForm={false} />
  </>;
}

function AboutPage() {
  usePageMeta('Méd Koyi — À propos', 'Découvrez Méd Koyi, fondateur et directeur artistique de Pionnier Créatif.');
  const roles = [
    ['01', 'Graphiste', 'Créer des identités visuelles modernes, stratégiques et cohérentes, pensées pour raconter une histoire et transmettre une émotion.'],
    ['02', 'Technicien synthé', 'Associer la précision technique, la curiosité et la pratique pour construire des solutions visuelles solides, du concept au support final.'],
    ['03', 'Formateur', 'Partager les outils, les méthodes et les réflexes qui permettent à chacun de progresser avec plus de confiance et d’autonomie.'],
  ];
  return <>
    <section className="about-hero">
      <div className="about-hero-grid">
        <div className="about-hero-copy">
          <span className="eyebrow">À propos / Méd Koyi</span>
          <h1 className="display">Créer.<br /><span>Transmettre.</span><br />Faire évoluer.</h1>
          <p>Graphiste, formateur et technicien synthé, je construis des identités visuelles qui donnent une direction claire aux idées.</p>
          <div className="about-hero-tags"><span>Graphiste</span><span>Formateur</span><span>Coach en développement personnel</span></div>
        </div>
        <figure className="about-poster">
          <img src={aboutPosterImage} alt="Portrait de Méd Koyi, graphiste et formateur" />
          <figcaption><span>01 / Profil</span><span>Lomé, Togo</span></figcaption>
        </figure>
      </div>
    </section>

    <section className="section about-story">
      <div className="section-inner about-story-grid">
        <div className="about-story-heading">
          <span className="eyebrow">Le parcours</span>
          <h2 className="section-title display">Un visuel réussi ne se contente pas d’être <em>beau.</em></h2>
          <span className="about-statement">Il raconte quelque chose.</span>
        </div>
        <div className="about-story-copy">
          <p>Je suis <strong>Méd Koyi</strong>, la personne derrière Pionnier Créatif. Je crois qu’une image doit porter du sens, créer une connexion et aider une marque à prendre sa place.</p>
          <p>Formé en infographie, je conçois des supports qui mêlent esthétique, cohérence et impact. Mon travail s’est construit entre la création, la transmission et l’accompagnement de celles et ceux qui veulent avancer.</p>
          <div className="about-facts"><div><strong>2015 — aujourd’hui</strong><span>Créer, apprendre, transmettre</span></div><div><strong>Lomé · Togo</strong><span>Disponible partout à distance</span></div></div>
        </div>
      </div>
    </section>

    <section className="about-roles" aria-labelledby="about-roles-title">
      <div className="about-roles-inner">
        <div className="about-section-intro"><span className="eyebrow">02 / Les casquettes</span><h2 id="about-roles-title" className="display">Trois façons<br /><span>d’avancer.</span></h2></div>
        <div className="about-role-list">{roles.map(([number, title, copy], index) => <article className={`about-role about-role-${index + 1}`} key={title}><span className="about-role-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight size={22} /></article>)}</div>
      </div>
    </section>

    <section className="about-coaching">
      <div className="about-coaching-grid">
        <div className="about-coaching-copy"><span className="eyebrow">03 / Transmission</span><h2 className="display">Le design avec du sens.<br /><em>La transmission comme moteur.</em></h2><p>J’ai eu l’opportunité de transmettre mon savoir-faire au sein de l’agence KONDO DESIGN et d’accompagner des apprenants débutants dans leur montée en compétence.</p><p>Le coaching en développement personnel prolonge cette envie : créer un espace de progression, de persévérance et d’évolution constante.</p><ButtonLink href="/contact" variant="light">Échanger avec Méd</ButtonLink></div>
        <figure className="about-profile-visual"><img src={aboutProfileImage} alt="Méd Koyi lors d’une intervention et présentation de son parcours" /><figcaption>Partager ce que l’on apprend, pour aider d’autres idées à prendre forme.</figcaption></figure>
      </div>
    </section>

    <section className="section manifesto"><div className="section-inner"><span className="eyebrow">Ce qui compte</span>{['Faire moins, mais mieux.', 'Rester curieux du problème.', 'Ne jamais confondre impact et bruit.'].map((line, index) => <div className="manifesto-row" key={line}><span className="manifesto-num">0{index + 1}</span><span className="manifesto-copy">{line}</span></div>)}</div></section>
    <ContactSection showForm={false} />
  </>;
}

function ContactPage() {
  usePageMeta('Contact', 'Parlez de votre prochain projet à Pionnier Créatif.');
  return <><section className="case-hero" style={{ background: '#f29200', color: '#111' }}><div className="case-hero-inner"><span className="eyebrow">Contact / point de départ</span><h1 className="display">Racontez-moi<br /><span style={{ color: '#e00815' }}>la suite.</span></h1><p>Quelques mots suffisent pour ouvrir la conversation. Après validation, WhatsApp s’ouvre avec votre message prérempli.</p></div></section><section className="section dark-section"><div className="section-inner contact-grid"><div><span className="eyebrow">Par ici</span><h2 className="contact-title">Les projets qui comptent commencent par un <em>message.</em></h2><div className="contact-details"><a className="contact-detail" href={`mailto:${CONTACT_EMAIL}`} data-testid="link-page-email"><span className="detail-icon"><Mail size={15} /></span>{CONTACT_EMAIL}</a><a className="contact-detail" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" data-testid="link-page-whatsapp"><span className="detail-icon"><MessageCircle size={15} /></span>WhatsApp · +228 97 89 93 64</a></div></div><ContactForm /></div></section></>;
}

function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === params.slug);
  usePageMeta(project?.name ?? 'Projet', project?.summary ?? 'Étude de cas Pionnier Créatif.');
  if (!project) return <NotFound />;
  return <><section className={`case-hero ${project.tone}`} style={{ background: project.tone === 'orange' ? '#f29200' : project.tone === 'violet' ? '#8049fe' : project.tone === 'cream' ? '#fffdf6' : '#e00815', color: project.tone === 'orange' || project.tone === 'cream' ? '#111' : '#fffdf6' }}><div className="case-hero-inner"><Link href="/projets" className="back-link" data-testid="link-back-projects"><ArrowLeft size={15} /> Retour aux projets</Link><span className="eyebrow">{project.number} / {project.category}</span><h1 className="display">{project.name}</h1><p>{project.summary}</p><div className="case-meta"><div><span>Client</span><strong>{project.client}</strong></div><div><span>Catégorie</span><strong>{project.category}</strong></div></div></div></section><section className="case-gallery" aria-label={`Visuels du projet ${project.name}`}>{project.images.map((image, index) => <img key={image} src={image} alt={`${project.name} — visuel ${index + 1}`} />)}</section><section className="case-body" data-testid={`page-case-study-${project.slug}`}><CaseStudySection label="Le contexte" title="Une marque avec quelque chose à dire." copy={`${project.client} avait une intuition forte, mais pas encore le langage pour la partager. Il fallait créer un point de vue clair, capable de réunir l’équipe et de donner envie aux publics de s’approcher.`} tone={project.tone} /><CaseStudySection label="Le problème" title="Sortir du déjà-vu sans perdre l’évidence." copy="Le défi était de trouver le juste équilibre : une identité assez singulière pour être mémorisée, assez souple pour accompagner des contenus, des temps forts et des conversations très différents." tone={project.tone === 'violet' ? 'orange' : 'violet'} /><CaseStudySection label="Le système" title="Une idée simple, beaucoup de possibilités." copy="Nous avons construit un système graphique à partir d’une forme-signature, d’une typographie qui assume sa voix et d’une palette qui donne le ton. Chaque règle est pensée pour être utilisée, détournée et transmise." tone={project.tone} /><div className="case-section"><div><span className="case-label">Le résultat</span><h2>{project.result}</h2></div><p>De la stratégie au déploiement, le rôle de Pionnier Créatif a été de faire tenir la vision dans chaque détail : direction artistique, identité, applications et accompagnement de l’équipe.</p></div></section><section className="section dark-section"><div className="section-inner project-next"><div><span className="eyebrow">Un autre terrain de jeu ?</span><h2 className="section-title display">Votre projet<br /><em>ensuite.</em></h2></div><ButtonLink href="/contact" variant="red">Parler du projet</ButtonLink></div></section></>;
}

function CaseStudySection({ label, title, copy, tone }: { label: string; title: string; copy: string; tone: Project['tone'] }) {
  return <div className="case-section"><div><span className="case-label">{label}</span><h2>{title}</h2></div><div className={`case-visual ${tone === 'violet' ? 'violet' : ''}`} aria-label={`Composition graphique pour ${label}`} /><p>{copy}</p></div>;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={HomePage} /><Route path="/projets" component={ProjectsPage} /><Route path="/projets/:slug" component={ProjectPage} /><Route path="/services" component={ServicesPage} /><Route path="/a-propos" component={AboutPage} /><Route path="/contact" component={ContactPage} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Shell><Router /></Shell></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;