# Cosram Auto

Site-ul oficial al parcului auto Cosram Auto — mașini rulate verificate tehnic, Buzău.

## Cerințe

- Node.js 20+
- npm

## Instalare

```bash
npm install
```

## Dezvoltare

```bash
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000) în browser.

## Build producție

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Structură proiect

| Cale | Descriere |
|------|-----------|
| `src/app/` | Pagini Next.js (App Router) |
| `src/components/` | Componente UI și secțiuni |
| `src/data/` | Date statice (mașini, recenzii, parteneri) |
| `src/lib/` | Logică partajată (filtrare, formatare, utilitare) |
| `public/images/masini/` | Imagini mașini |

Site-ul funcționează standalone, fără variabile de mediu obligatorii.
