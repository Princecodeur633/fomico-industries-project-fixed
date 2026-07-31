#!/bin/bash
set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

echo "💾 Backup FOMICO Industries..."

# Backup PostgreSQL
echo "📦 Backup base de données..."
docker exec fomico-postgres pg_dump -U strapi strapi > "$BACKUP_DIR/db_$TIMESTAMP.sql"

# Backup uploads Strapi
echo "📁 Backup uploads..."
docker cp fomico-strapi:/opt/app/public/uploads "$BACKUP_DIR/uploads_$TIMESTAMP"

# Compression
echo "🗜️  Compression..."
tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" -C $BACKUP_DIR "db_$TIMESTAMP.sql" "uploads_$TIMESTAMP"

# Nettoyage
rm -rf "$BACKUP_DIR/db_$TIMESTAMP.sql" "$BACKUP_DIR/uploads_$TIMESTAMP"

echo "✅ Backup terminé: $BACKUP_DIR/backup_$TIMESTAMP.tar.gz"
