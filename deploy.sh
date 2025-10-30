#!/bin/bash

# Script de déploiement pour le NAS
set -e

echo "🚀 Démarrage du déploiement..."

# Charger la nouvelle image Docker
echo "📦 Chargement de l'image Docker..."
docker load < cv-app.tar.gz

# Arrêter et supprimer l'ancien conteneur si il existe
echo "🛑 Arrêt de l'ancien conteneur..."
docker-compose down || true

# Démarrer le nouveau conteneur
echo "▶️  Démarrage du nouveau conteneur..."
docker-compose up -d

# Nettoyer les images inutilisées
echo "🧹 Nettoyage des anciennes images..."
docker image prune -f

echo "✅ Déploiement terminé avec succès!"

# Afficher le statut
docker-compose ps
