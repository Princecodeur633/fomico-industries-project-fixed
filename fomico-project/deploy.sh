#!/bin/bash
set -e

echo "🚀 Déploiement FOMICO Industries..."

# Vérifier les variables d'environnement
if [ -z "$DB_PASSWORD" ]; then
    echo "❌ Erreur: DB_PASSWORD non défini"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo "❌ Erreur: JWT_SECRET non défini"
    exit 1
fi

# Pull des dernières images
echo "📦 Pull des images..."
docker-compose pull

# Build
echo "🔨 Build des services..."
docker-compose build --no-cache

# Démarrage
echo "▶️  Démarrage des services..."
docker-compose up -d

# Attente santé
echo "⏳ Vérification de la santé..."
sleep 30

# Vérification
echo "✅ Vérification des services..."
docker-compose ps

echo "🎉 Déploiement terminé !"
echo "   Frontend: http://localhost"
echo "   API: http://api.fomico-industries.com"
echo "   Admin: http://api.fomico-industries.com/admin"
