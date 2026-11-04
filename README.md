# MRL Travel — Roteiros por cidade

Página em React e Vite, adaptada para celular, com imagem de destaque, 35 destinos, busca sem distinção de acentos e filtros por região.

## Personalização

- Cidades, textos e PDFs: `src/content.js`. Cada destino tem `slug` (URL `/roteiros/<slug>`) e `pdfUrl`. Para publicar um roteiro: copie o PDF para `public/roteiros/` (ex.: `public/roteiros/maceio.pdf`), preencha `pdfUrl: '/roteiros/maceio.pdf'` e rode `npm run build`. Para substituir, troque o arquivo mantendo o nome. O arquivo baixado sempre se chama `roteiro-<slug>-mrl-travel.pdf`. Sem `pdfUrl`, o card mostra "Roteiro em breve". Só são aceitos PDFs do próprio site (caminho iniciado por `/`).
- WhatsApp: preencha `agency.whatsappUrl` (ex.: `https://wa.me/55DDDNUMERO`) para exibir os botões de contato nas páginas de destino.
- Rotas: o build gera `dist/roteiros/<slug>/index.html` e `404.html`, então o acesso direto às URLs funciona em hospedagem estática.
- Instagram: preencha `agency.instagramUrl` no mesmo arquivo.
- Cores: variáveis `--brand`, `--accent` e `--paper` no início de `src/styles.css`. Paleta oficial enviada pela agência: azul profundo #0B1F33, azul secundário #173A5E, dourado #CD9A49 / #FCD58A, amarelo fechado #D4A62A, branco suave #F7F6F2 e branco puro #FFFFFF.
- Os logos oficiais estão em `public/brand/`: versão azul no cabeçalho e versão branca no rodapé. Os arquivos originais foram preservados, incluindo transparência e proporções.

## Executar

`npm install`, depois `npm run dev`. Para gerar os arquivos finais: `npm run build`.

## Imagem HERO

Arquivo: `public/images/hero.png`. Criada com a ferramenta integrada de geração de imagens. Imagem conceitual de entrada, inspirada no litoral do Rio de Janeiro; é usada como entrada visual da página.

Prompt final utilizado:

Use case: photorealistic-natural. Asset type: wide website hero background for a Brazilian agency's city itinerary library. Primary request: cinematic editorial panoramic photograph of Rio de Janeiro coastline, curving beach, blue ocean, lush mountains and distant city, warm late-afternoon sunlight, rich natural greens, soft atmospheric haze, subtle film texture, sophisticated travel magazine aesthetic. Composition: wide landscape 3:2 or wider, open blue sky and calm ocean on upper left for white website headline overlay, detailed mountains and coastline on right half. No people in foreground, no text, no lettering, no logos, no watermark. Realistic landscape photography, not illustration, not website mockup.

## Referências das fotografias dos cards

- Maceió: [Viagens e Caminhos](https://www.viagensecaminhos.com/melhores-praias-de-alagoas/).
- Maragogi: [Rota de Férias — SETUR AL](https://rotadeferias.com.br/destino/maragogi/).
- Florianópolis: [Viagens e Caminhos](https://www.viagensecaminhos.com/florianopolis-sc/).

As fotos são referências visuais externas para esta primeira versão. Substitua pelos arquivos oficiais da agência antes da divulgação pública.

## Galeria circular

Componente CircularGallery (React Bits), integrado a partir do código TypeScript e CSS fornecido pelo usuário. Aparece imediatamente depois do HERO. A mesma lista de `src/content.js` alimenta a galeria, os cards e os filtros de região. Clique ou pressione Enter em uma cidade para ir ao card correspondente; as setas do teclado e o gesto de arrastar navegam pela galeria. A rolagem vertical continua disponível. O efeito respeita a preferência por movimento reduzido e oferece galeria horizontal como alternativa quando WebGL2 não está disponível.

### Fotografias dos novos destinos

- Foz do Iguaçu: [fonte da fotografia](https://www.grupodicas.com/passeio-de-barco-nas-cataratas-de-foz-do-iguacu/).
- Bonito: [fonte da fotografia](https://rioandlearn.com/mato-grosso-do-sul/).
- Lençóis Maranhenses: [fonte da fotografia](https://extremos.com.br/noticia/2024/0209-12-trilhas-no-brasil/).
- Gramado: [fonte da fotografia](https://www2.faccat.br/portal/?q=node%2F4531).
- Jalapão: [fonte da fotografia](https://conexaoto.com.br/2019/01/07/dunas-do-jalapao-tem-recorde-de-visitacao-em-2018).
- Jericoacoara: [fonte da fotografia](https://commons.wikimedia.org/wiki/File:Pedra_furada_-_Jericoacoara.JPG).
- Alter do Chão: [fonte da fotografia](https://www.voelivre.com.br/blog/atrativos/o-que-fazer-em-alter-do-chao-guia-completo-para-explorar-o-paraiso-amazonico/).
- João Pessoa: [fonte da fotografia](https://www.essemundoenosso.com.br/praias-de-joao-pessoa-paraiba/).
- Rio de Janeiro: [fonte da fotografia](https://tipsforjourney.com/rio-de-janeiro-attractions-weather/).

### Fotografias dos destinos adicionais

- Porto de Galinhas: [fonte da fotografia](https://beachsearcher.com/pt/beach/76202225/porto-de-galinhas).
- Fernando de Noronha: [fonte da fotografia](https://www.islaguru.com/articles/discover-paradise-exploring-the-stunning-beaches-a).
- Arraial do Cabo: [fonte da fotografia](https://www.vamostrilhar.com.br/aventuras/conheca-tudo-sobre-a-praia-da-ilha-do-farol-arraial-do-cabo/).
- Balneário Camboriú: [fonte da fotografia](https://ndmais.com.br/infraestrutura/video-como-e-a-vista-da-cobertura-das-torres-mais-altas-da-america-latina-em-sc/).
- Búzios: [fonte da fotografia](https://guia.melhoresdestinos.com.br/praia-de-joao-fernandes-193-5278-l.html).
- Ouro Preto: [fonte da fotografia](https://www.touropia.com/destinations-that-will-transport-you-back-in-time/).
- Paraty: [fonte da fotografia](https://swimchannel.blogosfera.uol.com.br/2015/03/02/nadando-nas-historicas-aguas-de-paraty/).
- Caldas Novas: [fonte da fotografia](https://www.diariodoaco.com.br/noticia/0060162-caldas-novas-recebe-turistas-o-ano-inteiro).
- Chapada dos Veadeiros: [fonte da fotografia](https://turismochapadadosveadeiros.com.br/parque-nacional-da-chapada-dos-veadeiros/).
- São Luís: [fonte da fotografia](https://folha.qconcursos.com/n/cro-ma-anuncia-abertura-das-inscricoes-para-edital-de-concurso-publico).
- Campina Grande: [fonte da fotografia](https://commons.wikimedia.org/wiki/File%3AA%C3%A7ude_Velho_-_Campina_Grande%2C_Para%C3%ADba%2C_Brasil.jpg).
- Canela: [fonte da fotografia](https://www.abcmais.com/regiao/canela-prepara-programacao-especial-em-alusao-ao-setembro-amarelo-confira-atividades-previstas/).
- Campos do Jordão: [fonte da fotografia](https://guia.melhoresdestinos.com.br/capivari-119-2468-l.html).
- Chapada dos Guimarães: [fonte da fotografia](https://www.viagensecaminhos.com/cachoeiras-mais-bonitas-do-brasil/).
- Curitiba: [fonte da fotografia](https://www.brasultrips.com/why-is-curitiba-famous).
- Fortaleza: [fonte da fotografia](https://emalgumlugardomundo.com.br/o-que-fazer-em-fortaleza/).
- Pipa: [fonte da fotografia](https://www.grupodicas.com/7-coisas-para-fazer-de-graca-em-pipa/).
- Canoa Quebrada: [fonte da fotografia](https://www.viagensecaminhos.com/canoa-quebrada-ce/).
- Delta do Parnaíba: [fonte da fotografia](https://www.clubecandeias.com/conteudo/delta-do-parnaiba-um-destino-com-paisagens-maravilhosas).
- Recife: [fonte da fotografia](https://www.folhape.com.br/economia/campanha-de-verao-do-governo-de-pernambuco-foca-16-atracoes-e-pontos/288201/).
- Porto Seguro: [fonte da fotografia](https://www.guiaviagensbrasil.com/ba/porto-seguro/).
- Salvador: [fonte da fotografia](https://www.opovo.com.br/agencia/flipar/2025/08/27/pelourinho-uma-verdadeira-joia-no-centro-historico-de-salvador.html).
- Penha (Beto Carrero): [fonte da fotografia](https://www.viagensecaminhos.com/beto-carrero-world/).

As texturas da galeria são carregadas conforme os destinos se aproximam da área visível, para evitar baixar todas as fotos de uma vez. Maragogi foi mantido uma única vez.

## Direção visual de viagem

Títulos em Outfit com pesos 700 a 900, azul profundo e secundário, amarelo fechado e dourado da paleta oficial. O HERO inclui uma ilustração de viagem com transparência, uma rota pontilhada, um selo e uma etiqueta de embarque. Os cards receberam marcadores de avião e divisórias pontilhadas. A galeria continua sobre o fundo claro. A seção de orientação usa um painel dourado. Animações respeitam a preferência por movimento reduzido.

Arte: `public/images/travel-kit.png`. Criada com a ferramenta integrada de geração de imagens.

Prompt final da ilustração:

Use case: product-mockup. Asset type: transparent-background travel website hero decoration. Primary request: premium playful 3D travel kit matching a Brazilian travel agency's navy and gold palette. A compact ribbed hard-shell golden yellow rolling suitcase, a deep navy generic travel journal with a small gold globe symbol (no words), two simple cream boarding passes with abstract lines and a small white toy passenger airplane angled upward. Arrange as one cohesive floating still-life, suitcase dominant, journal in front left, airplane behind upper right. Three-quarter studio view, soft rounded forms, polished realistic materials, warm gold highlights, gentle contact shadows only within the object group. Palette strictly deep navy #0B1F33, secondary blue #173A5E, gold #CD9A49, warm yellow #D4A62A, pale gold #FCD58A and white. Transparent background, isolated objects with clean alpha, no backdrop, no floor, no typography, no logos, no watermark. Tall-ish 4:5 composition with generous clear margins around the silhouette.


## Mapa-múndi interativo no fundo

`WorldMapBackground.jsx` combina o CursorGrid do React Bits fornecido pelo usuário com uma máscara SVG dos continentes. O mapa tem presença suave em repouso e é revelado ao redor do cursor, deixando uma trilha que desaparece em cerca de 1,4 segundo. A camada é fixa ao tamanho da janela, fica atrás do conteúdo e não intercepta cliques. Em dispositivos de toque ou com preferência por movimento reduzido, aparece apenas a versão estática discreta.

Geometria: [Natural Earth, land 1:110m](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson), em [domínio público](https://www.naturalearthdata.com/about/terms-of-use/). Silhueta decorativa sem fronteiras ou rótulos, armazenada em `public/images/world-map.svg`.
#   r o t e i r o s . m r l  
 