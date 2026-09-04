import { useEffect, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowLeft, ArrowUpRight, Check, FilePlus2, Instagram, Linkedin, Mail, Menu, MessageCircle, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';

const queryClient = new QueryClient();

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
          <span className="brand-dot" aria-hidden="true" />
            <span>Pionnier<span className="brand-break"><br /></span><span className="brand-last">Créatif</span></span>
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
          <Link href="/" className="footer-brand" data-testid="link-footer-brand">Pionnier<br />Créatif</Link>
          <p className="footer-copy">Direction artistique indépendante pour celles et ceux qui veulent faire les choses autrement.</p>
        </div>
        <div className="footer-copy">
          <p>Paris · France<br />Disponible pour les projets qui comptent.</p>
          <p><a href="mailto:bonjour@pionniercreatif.fr" data-testid="link-footer-email">bonjour@pionniercreatif.fr</a></p>
        </div>
        <div className="footer-copy">
          <p><a href="https://www.instagram.com" target="_blank" rel="noreferrer" data-testid="link-footer-instagram">Instagram</a><br /><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" data-testid="link-footer-linkedin">LinkedIn</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 Pionnier Créatif</span>
        <span>Créer sa voie. Oser. Évoluer.</span>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [location]);
  return <div className={`site-shell ${location === '/' ? 'home-shell' : ''}`}><SiteNav /><main className="main-wrap">{children}</main><Footer /></div>;
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
  usePageMeta('Direction artistique indépendante', 'Pionnier Créatif transforme les idées et ambitions en identités visuelles fortes, cohérentes et mémorables.');
  return (
    <>
      <section className="hero" data-testid="section-hero">
        <div className="hero-grid">
          <div className="hero-kicker reveal"><span>Studio indépendant · Paris</span><span>© 2024</span></div>
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
      <div className="project-shape" aria-hidden="true" />
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
      <span className="gallery-art-meta">{project.number} / {project.year}</span>
      <span className="gallery-art-client">{project.client}</span>
      <span className="gallery-art-frame frame-one" />
      <span className="gallery-art-frame frame-two" />
      <span className="gallery-art-orbit" />
      <span className="gallery-art-title">{project.name}</span>
    </span>
  );
}

function ProjectGalleryCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <article className={`project-gallery-card ${project.tone}`}>
      <button type="button" className="project-gallery-trigger" onClick={() => onOpen(project)} data-testid={`button-gallery-${project.slug}`}>
        <ProjectVisual project={project} />
        <span className="project-gallery-body">
          <span className="project-gallery-category">{project.category}</span>
          <span className="project-gallery-name">{project.name}</span>
          <span className="project-gallery-action">Voir le visuel <ArrowUpRight size={17} /></span>
        </span>
      </button>
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
    ['01', 'Positionnement', 'Trouver le mot, l’angle et la place qui rendent votre projet évident.'],
    ['02', 'Identité visuelle', 'Créer un langage visuel complet, reconnaissable et prêt à vivre.'],
    ['03', 'Direction artistique', 'Donner une direction juste à vos campagnes, contenus et expériences.'],
    ['04', 'Accompagnement', 'Faire grandir votre marque sans perdre son élan ni sa cohérence.'],
  ];
  return <section className="section" id="services" data-testid="section-services">
    <div className="section-inner"><span className="eyebrow">03 / Savoir-faire</span><h2 className="section-title display">De l’intuition à la <em>trajectoire.</em></h2>
      <div className="services-grid">{services.map(([number, title, copy]) => <article className="service" key={number} data-testid={`card-service-${number}`}><span className="service-no">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      <div style={{ marginTop: '30px' }}><ButtonLink href="/services">Découvrir l’approche</ButtonLink></div>
    </div>
  </section>;
}

function AboutPreview() {
  return <section className="section" id="a-propos" data-testid="section-about">
    <div className="section-inner about-layout"><div className="portrait-block"><div className="portrait-caption"><span>À propos / 04</span><span>En mouvement depuis 2015</span></div></div>
      <div className="about-copy"><span className="eyebrow">04 / À propos</span><p>Je suis la personne derrière Pionnier Créatif. J’aime les idées nettes, les détails qui décalent et les marques qui avancent.</p><p className="small-copy">Direction artistique, design graphique et stratégie de marque : je travaille en solo ou avec une équipe choisie selon chaque terrain de jeu. Mon rôle est de faire émerger ce qui vous appartient déjà.</p><div className="about-meta"><div><span className="meta-label">Base</span><span className="meta-value">Paris, partout</span></div><div><span className="meta-label">Terrain</span><span className="meta-value">Culture · lifestyle · impact</span></div></div><div style={{ marginTop: '30px' }}><ButtonLink href="/a-propos" variant="ghost">En savoir plus</ButtonLink></div></div>
    </div>
  </section>;
}

function ContactSection({ showForm = true }: { showForm?: boolean }) {
  return <section className="section dark-section" id="contact" data-testid="section-contact"><div className="section-inner contact-grid"><div><span className="eyebrow">05 / Le prochain pas</span><h2 className="contact-title">On ouvre une <em>nouvelle voie ?</em></h2><p className="contact-note">Un projet en tête, un virage à prendre ou simplement l’envie de confronter une idée ? Racontez-moi le début de l’histoire.</p><div className="contact-details"><a className="contact-detail" href="mailto:bonjour@pionniercreatif.fr" data-testid="link-contact-email"><span className="detail-icon"><Mail size={15} /></span>bonjour@pionniercreatif.fr</a><a className="contact-detail" href="https://wa.me/33600000000" target="_blank" rel="noreferrer" data-testid="link-contact-whatsapp"><span className="detail-icon"><MessageCircle size={15} /></span>WhatsApp · +33 6 00 00 00 00</a></div></div>{showForm && <ContactForm />}</div></section>;
}

type FormState = { name: string; email: string; type: string; objective: string; budget: string; deadline: string; message: string };

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [attachment, setAttachment] = useState('');
  const [form, setForm] = useState<FormState>({ name: '', email: '', type: '', objective: '', budget: '', deadline: '', message: '' });
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  if (submitted) return <div className="contact-form success-state" data-testid="status-form-success"><span className="success-mark"><Check size={25} /></span><h3>Bien reçu.</h3><p>Votre demande est enregistrée dans cette démo. Dans la vraie vie, je vous répondrais sous 2 jours ouvrés avec quelques premières pistes.</p><button className="text-button" type="button" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', type: '', objective: '', budget: '', deadline: '', message: '' }); setAttachment(''); }} data-testid="button-reset-form">Envoyer une autre demande</button></div>;
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
  return <><section className="case-hero" style={{ background: '#111' }}><div className="case-hero-inner"><span className="eyebrow">Projets / sélection</span><h1 className="display">Les idées<br /><span style={{ color: '#f29200' }}>prennent forme.</span></h1><p>Des mini case studies pour voir ce qui se passe entre le brief et la marque que l’on retient.</p></div></section><section className="section project-gallery-section" data-testid="page-projects"><div className="section-inner"><div className="project-gallery-grid">{projects.map((project) => <ProjectGalleryCard key={project.slug} project={project} onOpen={setSelectedProject} />)}</div></div></section>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</>;
}

function ServicesPage() {
  usePageMeta('Services', 'Positionnement, identité visuelle, direction artistique et accompagnement de marques ambitieuses.');
  return <><section className="case-hero"><div className="case-hero-inner"><span className="eyebrow">Services / méthode</span><h1 className="display">Donner une<br /><span className="outline">direction.</span></h1><p>Pas de formule préfabriquée. Une méthode sur mesure pour faire émerger ce qui rend votre projet impossible à confondre.</p></div></section><section className="section"><div className="section-inner"><span className="eyebrow">Un projet, quatre mouvements</span><div className="services-grid">{[['01', 'Éclairer', 'Un atelier de départ pour aligner ambition, audience, contexte et intuition.'], ['02', 'Structurer', 'Un territoire de marque, une idée forte et les règles du jeu qui la rendent solide.'], ['03', 'Déployer', 'Des identités et directions artistiques pensées pour les vrais supports, pas seulement pour le mockup.'], ['04', 'Transmettre', 'Un système documenté et des outils simples pour continuer à faire vivre la marque.']].map(([n, title, copy]) => <article className="service" key={n}><span className="service-no">{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section><section className="quote-band"><blockquote>Une identité forte n’explique pas tout.<br /><span>Elle donne envie d’aller voir.</span></blockquote></section><ContactSection showForm={false} /></>;
}

function AboutPage() {
  usePageMeta('À propos', 'Pionnier Créatif est le studio indépendant de direction artistique de Camille, basé à Paris.');
  return <><section className="case-hero" style={{ background: '#8049fe' }}><div className="case-hero-inner"><span className="eyebrow">À propos / coulisses</span><h1 className="display">Pas un mode<br /><span style={{ color: '#f29200' }}>d’emploi.</span></h1><p>Un regard, une méthode et le goût des projets qui déplacent quelque chose.</p></div></section><section className="section"><div className="section-inner about-layout"><div className="portrait-block"><div className="portrait-caption"><span>Camille · direction</span><span>2015 — aujourd’hui</span></div></div><div className="about-copy"><span className="eyebrow">Le studio</span><p>Pionnier Créatif est né d’une envie simple : remettre du sens, de la précision et du mouvement dans les identités de marque.</p><p className="small-copy">Je m’appelle Camille. Je conçois des identités visuelles, des campagnes et des systèmes qui aident les organisations à prendre une place juste. Je crois au travail bien fait, aux discussions franches et aux détails qui changent tout. Selon les projets, je m’entoure de rédacteurs, photographes, développeurs et autres cerveaux curieux.</p><div className="about-meta"><div><span className="meta-label">Clients rêvés</span><span className="meta-value">Celles et ceux qui osent</span></div><div><span className="meta-label">À côté</span><span className="meta-value">Éditions · musique · objets</span></div></div></div></div></section><section className="section manifesto"><div className="section-inner"><span className="eyebrow">Ce qui compte</span>{['Faire moins, mais mieux.', 'Rester curieux du problème.', 'Ne jamais confondre impact et bruit.'].map((line, index) => <div className="manifesto-row" key={line}><span className="manifesto-num">0{index + 1}</span><span className="manifesto-copy">{line}</span></div>)}</div></section><ContactSection showForm={false} /></>;
}

function ContactPage() {
  usePageMeta('Contact', 'Parlez de votre prochain projet à Pionnier Créatif.');
  return <><section className="case-hero" style={{ background: '#f29200', color: '#111' }}><div className="case-hero-inner"><span className="eyebrow">Contact / point de départ</span><h1 className="display">Racontez-moi<br /><span style={{ color: '#e00815' }}>la suite.</span></h1><p>Quelques mots suffisent pour ouvrir la conversation. Le formulaire est une démo locale : aucune donnée n’est envoyée.</p></div></section><section className="section dark-section"><div className="section-inner contact-grid"><div><span className="eyebrow">Par ici</span><h2 className="contact-title">Les projets qui comptent commencent par un <em>message.</em></h2><div className="contact-details"><a className="contact-detail" href="mailto:bonjour@pionniercreatif.fr" data-testid="link-page-email"><span className="detail-icon"><Mail size={15} /></span>bonjour@pionniercreatif.fr</a><a className="contact-detail" href="https://wa.me/33600000000" target="_blank" rel="noreferrer" data-testid="link-page-whatsapp"><span className="detail-icon"><MessageCircle size={15} /></span>WhatsApp · +33 6 00 00 00 00</a></div></div><ContactForm /></div></section></>;
}

function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === params.slug);
  usePageMeta(project?.name ?? 'Projet', project?.summary ?? 'Étude de cas Pionnier Créatif.');
  if (!project) return <NotFound />;
  return <><section className={`case-hero ${project.tone}`} style={{ background: project.tone === 'orange' ? '#f29200' : project.tone === 'violet' ? '#8049fe' : project.tone === 'cream' ? '#fffdf6' : '#e00815', color: project.tone === 'orange' || project.tone === 'cream' ? '#111' : '#fffdf6' }}><div className="case-hero-inner"><Link href="/projets" className="back-link" data-testid="link-back-projects"><ArrowLeft size={15} /> Retour aux projets</Link><span className="eyebrow">{project.number} / {project.category}</span><h1 className="display">{project.name}</h1><p>{project.summary}</p><div className="case-meta"><div><span>Client</span><strong>{project.client}</strong></div><div><span>Année</span><strong>{project.year}</strong></div></div></div></section><section className="case-body" data-testid={`page-case-study-${project.slug}`}><CaseStudySection label="Le contexte" title="Une marque avec quelque chose à dire." copy={`${project.client} avait une intuition forte, mais pas encore le langage pour la partager. Il fallait créer un point de vue clair, capable de réunir l’équipe et de donner envie aux publics de s’approcher.`} tone={project.tone} /><CaseStudySection label="Le problème" title="Sortir du déjà-vu sans perdre l’évidence." copy="Le défi était de trouver le juste équilibre : une identité assez singulière pour être mémorisée, assez souple pour accompagner des contenus, des temps forts et des conversations très différents." tone={project.tone === 'violet' ? 'orange' : 'violet'} /><CaseStudySection label="Le système" title="Une idée simple, beaucoup de possibilités." copy="Nous avons construit un système graphique à partir d’une forme-signature, d’une typographie qui assume sa voix et d’une palette qui donne le ton. Chaque règle est pensée pour être utilisée, détournée et transmise." tone={project.tone} /><div className="case-section"><div><span className="case-label">Le résultat</span><h2>{project.result}</h2></div><p>De la stratégie au déploiement, le rôle de Pionnier Créatif a été de faire tenir la vision dans chaque détail : direction artistique, identité, applications et accompagnement de l’équipe.</p></div></section><section className="section dark-section"><div className="section-inner project-next"><div><span className="eyebrow">Un autre terrain de jeu ?</span><h2 className="section-title display">Votre projet<br /><em>ensuite.</em></h2></div><ButtonLink href="/contact" variant="red">Parler du projet</ButtonLink></div></section></>;
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