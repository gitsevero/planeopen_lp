# planeopen — landing page

Landing page do **planeopen**, um centralizador open-source de provedores
públicos de localização de aeronaves (ADS-B). Iniciativa gratuita, sem
fins lucrativos.

> 🌐 **Site:** [planeopen.com](https://planeopen.com) *(em breve)*

---

## O que é o planeopen

O planeopen agrega dados de aeronaves de múltiplos provedores
open-source (ADSBExchange, OpenSky Network e outros) e expõe tudo em
uma única API JSON. Você pode:

- **Usar a API gratuita** — sem chave, sem cobrança, JSON normalizado
- **Rodar na sua infra** — solicite o código e deploya no seu Postgres

A solicitação de implementação é redirecionada para
[cave.codes](https://cave.codes).

---

## Sobre este repositório

Este repo contém **apenas o site institucional** (LP). O código do
agregador (Python + Postgres) e do dashboard (Next.js) ficam em repos
separados.

### Stack
- **HTML5 + CSS3 + JavaScript** puro
- Sem framework, sem build step, sem `node_modules`
- Tipografia: [Big Shoulders Display](https://fonts.google.com/specimen/Big+Shoulders+Display) + [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (Google Fonts via `<link>`)
- Animações: SVG `<animateMotion>` (aviões nas trajetórias) + CSS keyframes (radar, ticker, estrelas)

### Estrutura
```
.
├── index.html      # markup semântico
├── styles.css      # ~1400 linhas, CSS variables
├── script.js       # vanilla JS (relógio UTC, copy-to-clipboard, estrelas, ticker)
└── README.md
```

---

## Como rodar localmente

Não precisa de servidor:

```bash
# Mac/Linux
open index.html

# Windows
start index.html
```

Abre no navegador padrão. Tudo funciona em `file://` — inclusive o
botão "Copiar" (com fallback para `execCommand` quando `navigator.clipboard`
não está disponível em contexto inseguro).

Se quiser servir via HTTP (recomendado pra testar `clipboard.writeText`):

```bash
# Python 3
python -m http.server 8000

# Node
npx serve .
```

Aí abra `http://localhost:8000`.

---

## Deploy

### Vercel (recomendado)
1. Importe este repo na Vercel
2. Framework Preset: **Other**
3. Root Directory: `./`
4. Build Command: *(vazio)*
5. Output Directory: `./`
6. Deploy

A Vercel serve estáticos diretamente — sem build, sem config.

### Outros
Funciona em qualquer host estático: GitHub Pages, Netlify, Cloudflare
Pages, S3 + CloudFront, ou um nginx servindo os 3 arquivos.

---

## Sem rastreamento

A LP **não tem analytics, nem cookies, nem trackers de terceiros**.
Os únicos requests externos são para o Google Fonts (carregamento da
tipografia). Se você quiser zero requests externos, baixe as fontes e
sirva localmente.

---

## Licença

Em definição. Por enquanto, considere "todos os direitos reservados",
mas a intenção é abrir sob uma licença permissiva (MIT ou Apache 2.0)
junto com o restante do projeto planeopen.
