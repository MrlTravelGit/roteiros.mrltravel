import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, Search, MapPin, Instagram, MessageCircle, Users, Compass, FolderOpen, X, Waves, Plane, Luggage, Ticket, Globe2, ArrowDown } from 'lucide-react';
import { agency, destinations } from './content';
import { DestinationPage, roteiroPath, setMeta, usePdfAvailable } from './DestinationPage';
import CircularGallery from './CircularGallery';
import WorldMapBackground from './WorldMapBackground';
import './styles.css';

const galleryItems = destinations.map(d => ({image: d.image, text: d.name, description: d.description, alt: d.imageAlt}));
const regions = ['Todos', ...new Set(destinations.map(d => d.region))];
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function DestinationLink({ destination, navigate, children }) {
  const href = roteiroPath(destination.slug);
  const available = usePdfAvailable(destination);
  const open = (e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); navigate(href); };
  return <a className="card-link" href={href} onClick={open} aria-label={available ? `Ver roteiro de ${destination.name}` : `Ver página de ${destination.name} — roteiro em breve`}>{children}</a>;
}
function CardFooter({ destination }) {
  const available = usePdfAvailable(destination);
  return available ? <div className="drive-link"><span><FolderOpen size={16}/> Ver roteiro</span><ArrowUpRight size={20}/></div> : <div className="coming-soon"><span><FolderOpen size={16}/> Roteiro em breve</span><span className="status-dot"/></div>;
}
function Brand({ light = false, navigate }) { return <a className="brand" href={navigate ? '/' : '#inicio'} onClick={navigate ? (e) => { e.preventDefault(); navigate('/'); } : undefined} aria-label="MRL Travel — início"><img src={light ? '/brand/logo-branca.png' : '/brand/logo-azul.png'} alt="MRL Travel" width={light ? 1000 : 3082} height={light ? 781 : 2524} /></a>; }
function FlightRoute({ className = '' }) {
  return <svg className={`flight-route ${className}`} viewBox="0 0 520 260" fill="none" aria-hidden="true"><path className="route-line" d="M12 226C93 254 157 176 112 143C60 105 57 217 161 214C278 210 207 28 328 42C392 49 369 117 339 101C306 83 397 24 490 32"/><circle cx="12" cy="226" r="5"/><circle cx="490" cy="32" r="5"/></svg>;
}
function TravelStamp() { return <div className="travel-stamp" aria-hidden="true"><span>MRL TRAVEL</span><Globe2 size={28} strokeWidth={1.5}/><strong>BORA VIAJAR?</strong><span>COLECIONE HISTÓRIAS</span></div>; }
function SiteHeader({ navigate }) {
  const go = (e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); navigate(e.currentTarget.getAttribute('href')); };
  return <header className="header"><div className="container nav"><Brand navigate={navigate}/><nav aria-label="Menu principal"><a className="nav-active" href="/#destinos" onClick={go}>Nossos roteiros</a><a href="/#como-funciona" onClick={go}>Como funciona</a></nav><a className="nav-cta" href="/#destinos" onClick={go}>Encontre seu destino <ArrowUpRight size={17}/></a></div></header>;
}
function SiteFooter({ navigate }) {
  const go = (e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); navigate(e.currentTarget.getAttribute('href')); };
  const explore = [['Roteiros de viagem', '/#destinos'], ['Destinos', '/#galeria']];
  const services = ['Passagens aéreas', 'Hospedagens e resorts', 'Passeios e traslados', 'Assessoria de viagem'];
  const contacts = [['WhatsApp', agency.footerWhatsappUrl, MessageCircle], ['Instagram', agency.instagramUrl, Instagram], ['Grupo de promoções', agency.groupsUrl, Users]];
  return <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-col footer-about">
        <a className="footer-logo" href="/" onClick={go} aria-label="MRL Travel — início"><img src="/brand/logo-azul.png" alt="MRL Travel" width="3082" height="2524" loading="lazy"/></a>
        <p className="footer-slogan">Você planeja, a gente guia!</p>
        <p>Agência de viagens com atendimento humanizado e assessoria completa para você viajar com tranquilidade.</p>
      </div>
      <nav className="footer-col" aria-label="Explore"><h2>Explore</h2><ul>
        {explore.map(([label, href]) => <li key={label}><a href={href} onClick={go}>{label}</a></li>)}
        <li><a href={agency.groupsUrl} target="_blank" rel="noopener noreferrer">Grupo de promoções</a></li>
      </ul></nav>
      <div className="footer-col"><h2>Nossos serviços</h2><ul>{services.map(s => <li key={s}>{s}</li>)}</ul></div>
      <div className="footer-col"><h2>Contato</h2>
        <div className="footer-icons">{contacts.map(([label, href, Icon]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}><Icon size={22} strokeWidth={1.8} aria-hidden="true"/></a>)}</div>
        <p>Estamos prontos para planejar sua próxima viagem.</p>
      </div>
    </div>
    <div className="container footer-bottom"><span>© 2026 MRL Travel. Todos os direitos reservados.</span><span>Boas viagens começam com boas histórias.</span></div>
  </footer>;
}
function App({ navigate, query, setQuery, region, setRegion }) {
  const filtered = destinations.filter(d => (region === 'Todos' || d.region === region) && normalize(`${d.name} ${d.state}`).includes(normalize(query.trim())));
  const revealDestination = (_item, index) => {
    setQuery('');
    setRegion('Todos');
    requestAnimationFrame(() => {
      const card = document.getElementById(`cidade-${destinations[index].slug}`);
      card?.focus({ preventScroll: true });
      card?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
    });
  };
  return <>
    <main id="inicio"><a className="skip-link" href="#destinos">Pular para os roteiros</a>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src="/images/hero.png" alt="Paisagem litorânea brasileira com mar, montanhas e luz dourada" fetchPriority="high"/>
        <div className="hero-shade"/>
        <div className="container hero-inner"><div className="eyebrow"><Plane size={14}/> DO NOSSO INSTAGRAM PARA A SUA VIAGEM</div><h1 id="hero-title">Seu próximo <strong>destino.</strong> <span>Uma nova <em>história.</em></span></h1><p>Viu nos nossos vídeos e ficou com vontade de ir?<br className="desktop-break"/> Encontre aqui os roteiros para explorar cada cidade.</p><a className="button button-gold" href="#galeria">Explorar os roteiros <Plane size={20}/></a><div className="hero-caption"><span className="caption-line"/> Menos tempo planejando. Mais momentos vivendo.</div></div>
        <div className="hero-travel-art" aria-hidden="true"><FlightRoute/><TravelStamp/><img className="travel-kit" src="/images/travel-kit.png" alt=""/><div className="boarding-tag"><span className="tag-icon"><Plane size={24}/></span><div><small>PRÓXIMA PARADA</small><strong>Sua melhor história.</strong></div><span className="tag-barcode"/></div></div>
        <div className="hero-bottom"><span>BRASIL, UM DESTINO DE CADA VEZ</span><span>ROLE PARA DESCOBRIR ↓</span></div>
      </section>
      <div className="travel-ribbon" aria-label="Inspiração para viajar"><div className="container"><span><Globe2 size={18}/><strong>{destinations.length} destinos</strong> para explorar</span><span className="ribbon-divider"/><span><Ticket size={18}/> Do vídeo ao seu roteiro</span><span className="ribbon-divider"/><a href="#galeria">Sua próxima parada começa aqui <ArrowDown size={17}/></a></div></div>
      <section id="galeria" className="gallery-section" aria-labelledby="gallery-title">
        <div className="container gallery-heading"><div><div className="kicker">SINTA O DESTINO ANTES DE CHEGAR</div><h2 id="gallery-title">O mundo chama.<br/><em>Você vai?</em><Plane className="heading-plane" size={35}/></h2></div><p>Arraste para explorar.<br/>Clique em uma cidade para ver seu roteiro.</p></div>
        <div className="gallery-stage"><CircularGallery items={galleryItems} bend={3} textColor="#0b1f33" borderRadius={0.05} scrollEase={0.05} font="700 30px Outfit" openOnClick={false} onItemClick={revealDestination} aria-label="Explore as cidades da MRL Travel" /></div>
        <div className="container gallery-bottom"><span>EXPLORE NO SEU RITMO <ArrowRight size={14}/></span><a href="#destinos">Ver todos os roteiros <ArrowRight size={16}/></a></div>
      </section>
      <section className="destinations container" id="destinos" aria-labelledby="destinations-title"><div className="section-top"><div><div className="kicker">SEU PRÓXIMO EMBARQUE</div><h2 id="destinations-title">Para onde <em>vamos?</em></h2></div><p>Cada cidade, um roteiro.<br/>Encontre o seu e comece a imaginar a viagem.</p></div>
        <div className="filter-bar"><div className="filters" aria-label="Filtrar por região">{regions.map(r => <button type="button" key={r} className={region === r ? 'filter active' : 'filter'} onClick={()=>setRegion(r)} aria-pressed={region===r}>{r}{r==='Todos' && <span>{destinations.length.toString().padStart(2,'0')}</span>}</button>)}</div><div className="search"><Search size={18}/><input type="search" aria-label="Buscar cidade ou estado" placeholder="Qual cidade você procura?" value={query} onChange={e=>setQuery(e.target.value)}/>{query && <button onClick={()=>setQuery('')} aria-label="Limpar busca"><X size={16}/></button>}</div></div>
        <div className="result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'destino para explorar' : 'destinos para explorar'}</div>
        <div className="cards">{filtered.map((d,i)=><article className="destination-card" id={`cidade-${d.slug}`} tabIndex={-1} key={d.slug} style={{'--delay':`${i*70}ms`}}><DestinationLink destination={d} navigate={navigate}><div className="card-photo"><img src={d.image} alt={d.imageAlt} loading="lazy"/><span className="region-badge"><MapPin size={12}/>{d.region}</span><span className="photo-number"><Plane size={13}/>{String(destinations.indexOf(d)+1).padStart(2,'0')}</span></div><div className="card-content"><span className="state">{d.state}</span><h3>{d.name}</h3><p>{d.description}</p><div className="card-footer"><CardFooter destination={d}/></div></div></DestinationLink></article>)}</div>
        {filtered.length===0 && <div className="empty"><Compass size={32}/><h3>Vamos tentar outro destino?</h3><p>Nenhuma cidade encontrada para essa busca.</p><button className="reset" onClick={()=>{setQuery('');setRegion('Todos');}}>Ver todos os destinos <ArrowRight size={15}/></button></div>}
        <p className="collection-note"><Waves size={16}/> Novas cidades e novos roteiros vêm por aí. Sua próxima história pode estar aqui.</p>
      </section>
      <section className="how container" id="como-funciona" aria-labelledby="how-title"><div className="how-decoration" aria-hidden="true"><Luggage size={75} strokeWidth={1}/><FlightRoute/></div><div className="how-heading"><div className="kicker">DA INSPIRAÇÃO AO ROTEIRO</div><h2 id="how-title">A vontade é sua.<br/><em>O roteiro está aqui.</em></h2><p>Simples assim. Do vídeo que despertou a vontade<br className="desktop-break"/> ao roteiro da sua próxima descoberta.</p></div><ol className="steps"><li><span><MapPin size={20}/></span><div><h3>Escolha a cidade</h3><p>Encontre o destino que chamou sua atenção nos nossos vídeos.</p></div></li><li><span><Ticket size={20}/></span><div><h3>Abra o roteiro</h3><p>Abra a página do destino e, quando disponível, baixe o roteiro em PDF.</p></div></li><li><span><Plane size={20}/></span><div><h3>Comece a planejar</h3><p>Consulte o material e dê o primeiro passo para a sua próxima viagem.</p></div></li></ol></section>
    </main>
  </>;
}
const setHomeMeta = () => setMeta('MRL Travel | Roteiros por cidade', 'MRL Travel: encontre os roteiros dos vídeos do Instagram organizados por cidade. Escolha seu destino e baixe o roteiro em PDF.');
const routeOf = () => { const m = location.pathname.match(/^\/roteiros\/([^/]+)\/?$/); return m ? decodeURIComponent(m[1]) : null; };
function Root() {
  const [slug, setSlug] = useState(routeOf);
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('Todos');
  useEffect(() => { const on = () => setSlug(routeOf()); addEventListener('popstate', on); return () => removeEventListener('popstate', on); }, []);
  useEffect(() => { if (slug === null) setHomeMeta(); }, [slug]);
  const navigate = (href) => {
    history.pushState(null, '', href);
    setSlug(routeOf());
    const hash = href.split('#')[1];
    if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
    else window.scrollTo(0, 0);
  };
  // A home fica montada (filtros preservados) e oculta enquanto a página de destino está aberta.
  return <>
    <WorldMapBackground/>
    <div className="site-content">
      <SiteHeader navigate={navigate}/>
      {slug !== null && <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><DestinationPage slug={slug} navigate={navigate}/></>}
      <div hidden={slug !== null}><App navigate={navigate} query={query} setQuery={setQuery} region={region} setRegion={setRegion}/></div>
      <SiteFooter navigate={navigate}/>
    </div>
  </>;
}
createRoot(document.getElementById('root')).render(<Root/>);
