import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Download, FileText, MapPin, MessageCircle, Plane, Users, Instagram, RotateCw, ChevronRight } from 'lucide-react';
import { agency, destinations, hasPdf, pdfFilename, whatsappLink } from './content';

export const SITE = 'MRL Travel';
export const roteiroPath = (slug) => `/roteiros/${slug}`;
export const findDestination = (slug) => destinations.find(d => d.slug === slug);

export function setMeta(title, description) {
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
}
export function usePageMeta(title, description) { useEffect(() => setMeta(title, description), [title, description]); }

// Disponibilidade vem do manifesto gerado no build (só PDFs existentes em public/roteiros): sem requisições extras.
export const usePdfAvailable = (d) => !!d && hasPdf(d);

// Baixa o PDF do próprio site e dispara o download direto; falha (arquivo ausente ou resposta que não é PDF) vira mensagem com nova tentativa.
function DownloadButton({ destination }) {
  const [status, setStatus] = useState('idle');
  const filename = pdfFilename(destination);
  const start = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(destination.pdfUrl, { cache: 'no-cache' });
      if (!res.ok || !/pdf|octet-stream/i.test(res.headers.get('content-type') || '')) throw new Error('bad response');
      const url = URL.createObjectURL(await res.blob());
      const a = Object.assign(document.createElement('a'), { href: url, download: filename });
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      setStatus('idle');
    } catch { setStatus('error'); }
  };
  return <>
    <a className="button button-whatsapp download-btn" href={destination.pdfUrl} download={filename} onClick={start} aria-busy={status === 'loading'}>
      {status === 'loading' ? 'Preparando download…' : status === 'error' ? <>Tentar novamente <RotateCw size={20}/></> : <>BAIXAR ROTEIRO EM PDF <Download size={20}/></>}
    </a>
    {status === 'error' && <p className="download-error" role="alert">Não foi possível baixar o roteiro agora. Verifique sua conexão e tente novamente. Se o problema continuar, fale com a MRL Travel.</p>}
  </>;
}

const ext = { target: '_blank', rel: 'noopener noreferrer' };
function PdfDoc({ label }) {
  return <div className="pdf-doc" aria-hidden="true"><div className="pdf-sheet"><FileText size={44} strokeWidth={1.4}/><i/><i/><i/><span className="pdf-badge">PDF</span></div><strong>{label}</strong></div>;
}
function ContactCta({ destination, label }) {
  return <a className="button button-whatsapp" href={whatsappLink(`Olá! Vi o roteiro de ${destination.name} no site da MRL Travel e quero planejar minha viagem.`)} {...ext}>{label} <MessageCircle size={20}/><span className="sr-only"> (abre o WhatsApp em nova aba)</span></a>;
}

export function DestinationPage({ slug, navigate }) {
  const d = findDestination(slug);
  const available = usePdfAvailable(d);
  usePageMeta(
    d ? `Roteiro de ${d.name} | ${SITE}` : `Destino não encontrado | ${SITE}`,
    d ? `Roteiro de viagem para ${d.name} (${d.state}). ${d.description} Baixe o PDF no site da ${SITE}.` : `Não encontramos este destino. Veja todos os roteiros da ${SITE}.`
  );
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  const link = (href) => ({ href, onClick: (e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); navigate(href); } });

  if (!d) return <main className="container destination-page not-found" id="conteudo">
    <MapPin size={36}/><h1>Destino não encontrado</h1>
    <p>Não encontramos o destino que você procura. Ele pode ter mudado de endereço ou ainda não estar disponível.</p>
    <a className="button button-gold" {...link('/#destinos')}>Ver todos os destinos <ArrowRight size={18}/></a>
  </main>;

  return <main className="container destination-page" id="conteudo">
    <nav className="breadcrumb" aria-label="Você está em">
      <ol><li><a {...link('/')}>Início</a></li><li><ChevronRight size={14} aria-hidden="true"/><a {...link('/#destinos')}>Roteiros</a></li><li><ChevronRight size={14} aria-hidden="true"/><span aria-current="page">{d.name}</span></li></ol>
    </nav>
    <div className="destination-hero"><img src={d.image} alt={d.imageAlt} fetchPriority="high"/><span className="region-badge"><MapPin size={12}/>{d.region}</span></div>
    <header className="destination-heading"><span className="state">{d.state} · {d.region}</span><h1>{d.name}</h1><p>{d.description}</p></header>
    <section className={`itinerary-box ${available ? 'is-ready' : 'is-soon'}`} aria-labelledby="itinerary-title">
      <PdfDoc label={available ? 'PDF GRATUITO' : 'EM BREVE'}/>
      <div className="itinerary-body">
        <div className="kicker">{available ? 'ROTEIRO DISPONÍVEL' : 'EM PREPARAÇÃO'}</div>
        <h2 id="itinerary-title">{available ? `Seu roteiro de ${d.name} está pronto!` : `Seu roteiro de ${d.name}`}</h2>
        {available ? <>
          <p>Baixe gratuitamente nosso roteiro e descubra o melhor desse destino.</p>
          <div className="itinerary-actions"><DownloadButton destination={d}/></div>
          <p className="file-info"><span className="pdf-chip">PDF GRATUITO</span> Download gratuito</p>
        </> : <>
          <p>Estamos preparando um roteiro especial para você aproveitar o melhor desse destino.</p>
          <p className="file-info"><FileText size={18}/> Roteiro em PDF disponível em breve</p>
          <div className="itinerary-actions"><a className="button button-whatsapp" href={whatsappLink(`Olá! Gostaria de saber quando o roteiro de ${d.name} estará disponível.`)} {...ext}>Quero saber quando estiver pronto <MessageCircle size={20}/><span className="sr-only"> (abre o WhatsApp em nova aba)</span></a></div>
        </>}
      </div>
    </section>
    <section className="contact-block" aria-labelledby="agency-title">
      <div className="contact-intro"><Plane size={26} aria-hidden="true"/><h2 id="agency-title">Planeje sua viagem com a {SITE}</h2><p>Conte com a gente para contratar passeios, hospedagem e traslados em {d.name} e viajar com tranquilidade.</p></div>
      <div className="contact-cards">
        <a className="contact-card contact-wa" href={whatsappLink(`Olá! Vi o roteiro de ${d.name} no site da MRL Travel e quero planejar minha viagem.`)} {...ext}><MessageCircle size={30} aria-hidden="true"/><strong>Falar no WhatsApp</strong><span>Tire dúvidas e monte sua viagem com a nossa equipe.</span><em>Chamar agora <ArrowRight size={16}/></em></a>
        <a className="contact-card contact-group" href={agency.groupsUrl} {...ext}><Users size={30} aria-hidden="true"/><strong>Grupo de promoções</strong><span>Entre no grupo e receba as melhores ofertas em primeira mão.</span><em>Entrar no grupo <ArrowRight size={16}/></em></a>
        <a className="contact-card contact-ig" href={agency.instagramUrl} {...ext}><Instagram size={30} aria-hidden="true"/><strong>@mrltravel</strong><span>Acompanhe os vídeos e as novidades de cada destino.</span><em>Seguir no Instagram <ArrowRight size={16}/></em></a>
      </div>
    </section>
    <a className="back-link" {...link('/#destinos')}><ArrowLeft size={16}/> Voltar aos destinos</a>
  </main>;
}
