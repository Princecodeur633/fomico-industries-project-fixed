# Guide de Déploiement FOMICO Industries

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Nginx     │────▶│   Next.js   │────▶│   Strapi    │
│  (Reverse   │     │  (Frontend)  │     │   (CMS)     │
│   Proxy)    │     │   Port 3000  │     │  Port 1337  │
└─────────────┘     └─────────────┘     └──────┬──────┘
      │                                          │
      │         ┌─────────────┐                  │
      │         │  PostgreSQL │◀─────────────────┘
      │         │   Port 5432 │
      │         └─────────────┘
      │
   SSL (Let's Encrypt)
```

## Prérequis

- Docker 24+ et Docker Compose
- 4 Go RAM minimum
- 20 Go disque
- Domaine configuré: fomico-industries.com

## Installation

### 1. Cloner le projet
```bash
git clone https://github.com/fomico-industries/website.git
cd website
```

### 2. Configurer les variables d'environnement
```bash
cp .env.example .env
# Éditer .env avec vos valeurs
```

Variables obligatoires:
- `DB_PASSWORD`: Mot de passe PostgreSQL
- `JWT_SECRET`: Clé secrète JWT
- `ADMIN_JWT_SECRET`: Clé secrète admin
- `API_TOKEN_SALT`: Salt pour les tokens API
- `APP_KEYS`: 4 clés pour les sessions (séparées par des virgules)

### 3. Lancer le déploiement
```bash
chmod +x deploy.sh
./deploy.sh
```

### 4. Créer le premier admin Strapi
```bash
docker exec -it fomico-strapi npx strapi admin:create-user
```

### 5. Configurer le token API
1. Connectez-vous à http://api.fomico-industries.com/admin
2. Settings > API Tokens > Create new API Token
3. Nom: "Frontend Read"
4. Type: "Full access" ou permissions personnalisées
5. Copier le token dans `NEXT_PUBLIC_STRAPI_API_TOKEN`
6. Redémarrer le frontend: `docker-compose restart fomico-frontend`

## SSL (Let's Encrypt)

```bash
# Premier certificat
docker run -it --rm \
  -v certbot-data:/etc/letsencrypt \
  -v ./nginx/www:/var/www/certbot \
  certbot/certbot certonly \
  --webroot -w /var/www/certbot \
  -d fomico-industries.com -d www.fomico-industries.com

# Renouvellement automatique (déjà configuré dans docker-compose)
```

## Maintenance

### Backup
```bash
chmod +x backup.sh
./backup.sh
# Backup dans ./backups/backup_YYYYMMDD_HHMMSS.tar.gz
```

### Logs
```bash
# Tous les services
docker-compose logs -f

# Frontend uniquement
docker-compose logs -f fomico-frontend

# Strapi uniquement
docker-compose logs -f fomico-strapi
```

### Mise à jour
```bash
# Pull des dernières versions
git pull origin main

# Rebuild et redémarrage
docker-compose down
docker-compose up -d --build
```

## Sécurité

- HTTPS obligatoire (Let's Encrypt)
- Headers de sécurité (X-Frame-Options, X-Content-Type-Options, etc.)
- Rate limiting sur les formulaires
- CORS configuré
- Variables d'environnement sécurisées
- Backups automatisés recommandés (cron)

## Monitoring

Recommandé:
- Uptime monitoring (UptimeRobot, Pingdom)
- Log aggregation (ELK stack ou Datadog)
- Performance monitoring (New Relic)

## Support

En cas de problème:
1. Vérifier les logs: `docker-compose logs`
2. Vérifier la santé: `docker-compose ps`
3. Redémarrer un service: `docker-compose restart <service>`
4. Restaurer un backup si nécessaire
