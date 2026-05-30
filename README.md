# Portfolio — Bala Andegue François Lionnel

Portfolio professionnel fullstack développé avec **Next.js 13 App Router**, **Prisma ORM** et **SQLite**. Déployable en un clic sur Vercel.

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 13, React 18, TypeScript |
| Styles | Tailwind CSS, Radix UI (shadcn/ui) |
| Animations | Framer Motion |
| Backend | Next.js Server Actions |
| ORM | Prisma 6 |
| Base de données | SQLite (local) |
| Auth | NextAuth.js v4 |
| Déploiement | Vercel |

## Fonctionnalités

- **Page d'accueil** — Hero animé (clavier tech + flashs code assembleur), projets mis en avant, certifications
- **Projets** — Grille filtrée avec captures d'écran réelles, liens GitHub et sites live
- **Certifications** — Affichage avec logos locaux (Google, Stanford Online, Johns Hopkins…)
- **Contact** — Formulaire persisté en base de données
- **Panel admin** — CRUD complet (projets, certifications, messages, profil) protégé par NextAuth
- **Responsive** — Mobile first, dark/light mode

## Lancer le projet localement

### Prérequis

- Node.js ≥ 18
- npm

### Installation

```bash
git clone https://github.com/BalaAndegue/<nom-du-repo>.git
cd <nom-du-repo>
npm install
```

### Variables d'environnement

Copie le fichier d'exemple puis remplis les valeurs :

```bash
cp .env.example .env
```

Ensuite génère un secret pour NextAuth :

```bash
openssl rand -base64 32
# Colle le résultat dans .env → NEXTAUTH_SECRET
```

Le `.env` final doit contenir :

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<valeur générée par openssl>"
```

> `.env` est dans `.gitignore` — il ne sera jamais committé. `.env.example` sert de référence et est committé.

### Initialiser la base de données

```bash
npx prisma db push
npx prisma db seed
```

### Démarrer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

### Accès admin

```
URL      : http://localhost:3000/login
Email    : admin@example.com
Mot de passe : admin123
```

> **Changez le mot de passe admin** en production via le panel `/admin/settings`.

## Structure du projet

```
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── project/              # Liste des projets
│   ├── certificates/         # Certifications
│   ├── about/                # À propos
│   ├── contact/              # Formulaire de contact
│   └── admin/                # Panel d'administration
├── components/
│   ├── animations/
│   │   ├── TechKeyboard.tsx  # Clavier animé (stack technique)
│   │   └── CodeFlash.tsx     # Flashs code assembleur en fond
│   ├── layout/               # Header, Footer
│   └── ui/                   # Composants shadcn/ui
├── lib/
│   ├── actions.ts            # Server Actions (CRUD)
│   ├── prisma.ts             # Client Prisma
│   └── auth-options.ts       # Config NextAuth
├── prisma/
│   ├── schema.prisma         # Modèles de données
│   ├── seed.ts               # Données initiales
│   └── dev.db                # Base SQLite locale
└── public/
    ├── logos/                # SVG logos certifications
    ├── xccm.png              # Capture XXCM
    ├── epuc_bitotol.png      # Capture EPUCBITOTOL
    └── customwolrd.png       # Capture Custom World
```

## Déploiement sur Vercel

### 1. Pusher le repo sur GitHub

```bash
git push origin main
```

### 2. Importer sur Vercel

Connecte le repo GitHub sur [vercel.com](https://vercel.com).

`DATABASE_URL` et `NEXTAUTH_URL` sont déjà dans `.env.production` (committé).  
**`NEXTAUTH_SECRET` doit être ajouté manuellement dans le dashboard Vercel** :

```
Vercel → Projet → Settings → Environment Variables
  Nom   : NEXTAUTH_SECRET
  Valeur: <résultat de openssl rand -base64 32>
  Scope : Production + Preview
```

> Sans `NEXTAUTH_SECRET` en production, la connexion admin est impossible.

Récapitulatif complet des variables :

| Variable | Local (`.env`) | Vercel dashboard |
|----------|---------------|-----------------|
| `DATABASE_URL` | `file:./dev.db` | *(dans `.env.production`)* |
| `NEXTAUTH_URL` | `http://localhost:3000` | *(dans `.env.production`)* |
| `NEXTAUTH_SECRET` | valeur locale (`.env`) | **À définir obligatoirement** |

### 3. Commande de build

Le script `build` génère automatiquement le client Prisma avant la compilation :

```bash
prisma generate && next build
```

> **Note SQLite / Vercel** : SQLite fonctionne parfaitement pour les pages en lecture (portfolio public). Pour persister les messages de contact entre les déploiements, migrer vers [Neon](https://neon.tech) (PostgreSQL gratuit) en changeant `provider = "sqlite"` → `provider = "postgresql"` dans `schema.prisma` et en mettant à jour `DATABASE_URL`.

## Projets présentés

| Projet | Statut | Lien |
|--------|--------|------|
| XXCM – Composition de cours | En cours | [frontend-xccm-12027.vercel.app](https://frontend-xccm-12027.vercel.app/fr) |
| EPUCBITOTOL – Plateforme éducative | En cours | [epucbitotol.vercel.app](https://epucbitotol.vercel.app/fr) |
| Custom World – E-commerce | Terminé | [customworld.vercel.app](https://customworld.vercel.app) |
| YOWYOB ERP – Module Tiers | Terminé | — |
| CollabSpace – Outil collaboratif | En cours | — |

## Activité GitHub

- **69** dépôts publics
- **5** organisations
- **~1 070** commits sur la dernière année

## Licence

Ce projet est personnel et non sous licence open source. Tous droits réservés — Bala Andegue François Lionnel.
