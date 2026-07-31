# FOMICO Industries - Site Web Institutionnel

## 🏭 Présentation

Site web institutionnel moderne, professionnel et multilingue pour **FOMICO Industries**, 
fournisseur industriel basé au Congo (Brazzaville & Pointe-Noire), desservant la zone CEMAC.

## 🚀 Stack Technique

| Couche | Technologie |
|--------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Langage** | TypeScript |
| **Styling** | Tailwind CSS |
| **Formulaires** | React Hook Form + Zod |
| **i18n** | next-intl |
| **Icônes** | Lucide React |
| **CMS** | Strapi (à intégrer) |
| **Base de données** | PostgreSQL (via Strapi) |
| **Déploiement** | Docker + Nginx |

## 📁 Structure du projet

```
fomico-nextjs/
├── src/
│   ├── app/
│   │   ├── [locale]/                 # Routes localisées (fr, en)
│   │   │   ├── page.tsx              # Accueil
│   │   │   ├── a-propos/page.tsx     # Qui sommes-nous
│   │   │   ├── produits/page.tsx     # Catalogue produits
│   │   │   ├── services/page.tsx     # Nos services
│   │   │   ├── secteurs/page.tsx     # Secteurs d'activité
│   │   │   ├── actualites/page.tsx   # Actualités
│   │   │   ├── carrieres/page.tsx    # Offres d'emploi
│   │   │   ├── contact/page.tsx      # Contact + formulaire
│   │   │   ├── devis/page.tsx        # Demande de devis
│   │   │   └── layout.tsx            # Layout racine avec SEO
│   │   ├── globals.css               # Styles globaux + utilitaires
│   │   ├── sitemap.ts               # Sitemap dynamique
│   │   └── robots.ts                # robots.txt
│   ├── components/
│   │   ├── Header.tsx               # Navigation responsive + dropdown
│   │   ├── Footer.tsx               # Footer 4 colonnes
│   │   ├── Hero.tsx                 # Section hero avec overlay
│   │   ├── ServicesSection.tsx      # Grille services accueil
│   │   ├── SectorsSection.tsx       # Grille secteurs accueil
│   │   ├── ProductsPreview.tsx      # Aperçu produits accueil
│   │   ├── StatsSection.tsx         # Compteurs animés
│   │   ├── CTASection.tsx           # Appel à l'action
│   │   ├── QuoteForm.tsx            # Formulaire devis (RHF+Zod)
│   │   ├── ContactForm.tsx          # Formulaire contact (RHF+Zod)
│   │   ├── LocaleSwitcher.tsx       # Switch FR/EN
│   │   ├── LoadingSkeleton.tsx      # Skeleton loading
│   │   └── ErrorMessage.tsx         # Message d'erreur
│   └── lib/
│       ├── api.ts                   # Client API Strapi
│       ├── hooks.ts                 # Hooks React réutilisables
│       ├── i18n.ts                  # Configuration next-intl
│       └── utils.ts                 # Utilitaires (cn, etc.)
├── messages/
│   ├── fr.json                      # Traductions français
│   └── en.json                      # Traductions anglais
├── Dockerfile                       # Multi-stage build
├── docker-compose.yml               # Orchestration containers
├── middleware.ts                    # Redirection locale
├── next.config.js                   # Configuration Next.js
├── tailwind.config.ts               # Configuration Tailwind
└── tsconfig.json                    # Configuration TypeScript
```

## 🎨 Design System

### Couleurs FOMICO
| Token | Hex | Usage |
|-------|-----|-------|
| `fomico-navy` | `#0a1628` | Fond sombre, texte principal |
| `fomico-navy-light` | `#1a2a42` | Variante claire |
| `fomico-orange` | `#e85d04` | CTA, accents, hover |
| `fomico-orange-light` | `#f48c06` | Hover states |

### Composants réutilisables
- `.btn-primary` - Bouton principal (fond orange)
- `.btn-secondary` - Bouton secondaire (bordure)
- `.btn-outline` - Bouton outline (bordure foncée)
- `.card-hover` - Effet hover sur cards
- `.section-padding` - Espacement sections
- `.container-custom` - Container max-width

## 🌍 Internationalisation (i18n)

Le site est disponible en :
- 🇫🇷 **Français** (default)
- 🇬🇧 **Anglais**

Gestion via `next-intl` avec fichiers JSON dans `/messages/`. 
Routes structurées : `/fr/...` et `/en/...`

## 🔒 SEO

- ✅ Metadata dynamique par page
- ✅ Open Graph & Twitter Cards
- ✅ Sitemap.xml automatique
- ✅ robots.txt
- ✅ URLs canoniques
- ✅ Données structurées (prêt pour Schema.org)
- ✅ Balises hreflang

## 📝 Formulaires

### Demande de devis
- Nom, société, email, téléphone
- Produit/service (select)
- Quantité
- Message détaillé
- Upload fichier (PDF, DOC, JPG - max 10Mo)
- Validation Zod complète
- États : loading, success, error

### Contact
- Nom, email
- Sujet (select)
- Message
- Validation Zod
- Carte Google Maps intégrée

## 🐳 Docker

```bash
# Build et lancer
docker-compose up --build

# Ou build manuel
docker build -t fomico-frontend .
docker run -p 3000:3000 fomico-frontend
```

## 🔌 Intégration Strapi (à venir)

Collections à créer dans Strapi :
1. `products` - Produits avec catégories
2. `services` - Services détaillés
3. `sectors` - Secteurs d'activité
4. `projects` - Réalisations
5. `news` - Actualités
6. `testimonials` - Témoignages
7. `partners` - Partenaires
8. `jobs` - Offres d'emploi
9. `quote-requests` - Demandes de devis
10. `contact-messages` - Messages contact
11. `candidates` - Candidatures
12. `settings` - Paramètres globaux

## 🚀 Déploiement

### Recommandé
- **Frontend** : Vercel (optimal pour Next.js)
- **Backend** : VPS avec Docker (Strapi + PostgreSQL)
- **Médias** : Cloudinary
- **Domaine** : fomico-industries.com

### Variables d'environnement
```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud
```

## 📊 Performance

Objectifs Lighthouse :
- Performance : 90+
- Accessibilité : 100
- Bonnes pratiques : 100
- SEO : 100

## 🛠️ Scripts disponibles

```bash
npm run dev      # Développement
npm run build    # Production build
npm run start    # Démarrage production
npm run lint     # ESLint
```

## 📄 Licence

Propriété de FOMICO Industries. Tous droits réservés.

---

**Développé avec ❤️ pour l'industrie congolaise.**
