# Ghostek Media

Portfolio i showcase kreatywnych projektów — interaktywna strona z animacjami, galerią prac i panelem admina.

## Stack

- Next.js 14 / React 18
- TailwindCSS + Framer Motion
- Neon Database (PostgreSQL serverless)
- Vercel Blob (storage obrazów)
- Radix UI, dnd-kit, Lenis

## Uruchomienie

```bash
bun install
bun dev
```

## Zmienne środowiskowe

| Zmienna | Opis |
|---|---|
| `DATABASE_URL` | Connection string do PostgreSQL (Neon) |
| `BLOB_READ_WRITE_TOKEN` | Token do Vercel Blob Storage |

## Funkcje

- **Strona główna** — hero z animacjami 3D, marquee, cursor trail
- **Works** — galeria projektów z modalem i lightboxem
- **Admin** (`/admin`) — CRUD projektów, drag-and-drop reordering obrazów, upload, dashboard analityczny
- **Analityka** — tracking odsłon stron i projektów
