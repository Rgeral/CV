# Configuration SSH pour le déploiement automatique

## Problème actuel

Votre NAS demande un mot de passe lors de la connexion SSH. GitHub Actions ne peut pas entrer de mot de passe interactivement, il faut donc configurer l'authentification par clé SSH.

## Solution : Ajouter la clé SSH publique sur le NAS

### Étape 1 : Récupérer la clé publique

Sur votre NAS, vous avez déjà créé une clé SSH. Récupérez la **clé publique** :

```bash
ssh rgeral@192.168.1.22
cat ~/.ssh/github_actions_cv.pub
```

Vous devriez voir quelque chose comme :
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDxwef1dCPrVaBhm3k0bSTjmGMN0kSq2B2Oa6az6RfLh github-actions-cv-deploy
```

### Étape 2 : Vérifier que c'est bien dans authorized_keys

```bash
ssh rgeral@192.168.1.22
cat ~/.ssh/authorized_keys
```

Vous devriez voir la même clé. Si elle n'y est pas, ajoutez-la :

```bash
cat ~/.ssh/github_actions_cv.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### Étape 3 : Vérifier la configuration SSH du serveur

Assurez-vous que votre serveur accepte l'authentification par clé :

```bash
ssh rgeral@192.168.1.22
sudo nano /etc/ssh/sshd_config
```

Vérifiez ces lignes (décommentez-les si nécessaire) :

```
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

Si vous modifiez le fichier, redémarrez SSH :

```bash
sudo systemctl restart sshd
```

### Étape 4 : Tester depuis votre Mac

Pour tester que la clé fonctionne, essayez de vous connecter avec la clé privée :

```bash
ssh -i ~/.ssh/github_actions_cv rgeral@192.168.1.22
```

⚠️ **Si ça ne fonctionne pas et demande toujours un mot de passe**, c'est que :
- La clé publique n'est pas dans `authorized_keys`
- Les permissions sont incorrectes
- `PubkeyAuthentication` est désactivé dans `/etc/ssh/sshd_config`

### Étape 5 : Vérifier les permissions

Sur votre NAS :

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### Étape 6 : Vérifier le secret GitHub

Assurez-vous que le secret `SERVER_SSH_KEY` dans GitHub contient bien la **clé PRIVÉE** complète :

```bash
ssh rgeral@192.168.1.22
cat ~/.ssh/github_actions_cv
```

Copiez tout le contenu (avec `-----BEGIN` et `-----END`) et vérifiez qu'il est bien dans le secret GitHub.

## Debugging

### Voir les logs SSH sur le serveur

```bash
ssh rgeral@192.168.1.22
sudo tail -f /var/log/auth.log
```

Puis relancez le workflow GitHub Actions et regardez les logs en temps réel pour voir pourquoi la connexion est refusée.

### Test en local

Depuis votre Mac, testez avec la même clé que GitHub utilisera :

```bash
# Créer un fichier temporaire avec la clé
echo "$VOTRE_CLE_PRIVEE" > /tmp/test_key
chmod 600 /tmp/test_key

# Tester la connexion
ssh -i /tmp/test_key rgeral@192.168.1.22

# Nettoyer
rm /tmp/test_key
```

## Alternative : Utiliser un mot de passe (déconseillé)

Si vous ne voulez vraiment pas utiliser les clés SSH, vous pouvez utiliser `sshpass`, mais ce n'est **pas recommandé** pour des raisons de sécurité.

Une fois que l'authentification par clé SSH fonctionne, le déploiement automatique devrait fonctionner ! 🚀
