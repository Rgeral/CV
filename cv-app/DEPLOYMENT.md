# Guide de Déploiement sur NAS

## Configuration requise

### 1. Prérequis sur votre NAS
- Docker installé sur votre NAS (via Docker Package si Synology)
- SSH activé sur votre NAS
- Un utilisateur avec les droits Docker

### 2. Configuration de Next.js pour le mode standalone

Ajoutez cette configuration dans votre `next.config.ts` :

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
};
```

### 3. Configuration des secrets GitHub

Dans votre repository GitHub, allez dans **Settings > Secrets and variables > Actions** et ajoutez :

- `NAS_HOST` : L'adresse IP ou le domaine de votre NAS (ex: `192.168.1.100` ou `nas.mondomaine.com`)
- `NAS_USERNAME` : Votre nom d'utilisateur SSH (ex: `admin`)
- `NAS_SSH_KEY` : Votre clé SSH privée (générez-la si nécessaire)
- `NAS_PORT` : Le port SSH (généralement `22`)

### 4. Générer une clé SSH (si nécessaire)

Sur votre machine locale :

```bash
# Générer une paire de clés SSH
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/nas_deploy

# Copier la clé publique sur votre NAS
ssh-copy-id -i ~/.ssh/nas_deploy.pub user@nas-ip

# Afficher la clé privée pour la copier dans GitHub Secrets
cat ~/.ssh/nas_deploy
```

### 5. Créer le répertoire sur votre NAS

Connectez-vous en SSH à votre NAS et créez le répertoire :

```bash
ssh user@nas-ip
mkdir -p /volume1/docker/cv-app
```

> **Note pour Synology** : Le chemin peut varier selon votre configuration. 
> Utilisez `/volume1/docker/cv-app` pour un volume standard Synology.
> Pour QNAP, utilisez `/share/Container/cv-app` ou similaire.

### 6. Configuration Nginx Reverse Proxy (Optionnel)

Si vous voulez exposer l'application via nginx sur votre NAS :

```nginx
server {
    listen 80;
    server_name cv.mondomaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Utilisation

1. Modifiez votre code
2. Commitez et poussez sur la branche `main`
3. GitHub Actions se déclenche automatiquement
4. L'application se met à jour sur votre NAS

## Vérifier le déploiement

```bash
# SSH sur votre NAS
ssh user@nas-ip

# Vérifier que le conteneur tourne
cd /volume1/docker/cv-app
docker-compose ps

# Voir les logs
docker-compose logs -f
```

## Accès à l'application

- Local (sur le NAS) : http://localhost:3000
- Réseau local : http://IP-DU-NAS:3000
- Avec reverse proxy : http://votre-domaine.com

## Dépannage

### Le conteneur ne démarre pas
```bash
docker-compose logs cv-app
```

### Ports déjà utilisés
Modifiez le port dans `docker-compose.yml` :
```yaml
ports:
  - "3001:3000"  # Utiliser 3001 au lieu de 3000
```

### Problèmes de permissions
```bash
sudo chown -R $(whoami):$(whoami) /volume1/docker/cv-app
```

## Architecture alternative : Sans Docker

Si vous préférez déployer sans Docker, vous pouvez utiliser PM2 :

```bash
# Sur votre NAS
npm install -g pm2
pm2 start npm --name "cv-app" -- start
pm2 save
pm2 startup
```

Adaptez le workflow GitHub Actions en conséquence.
