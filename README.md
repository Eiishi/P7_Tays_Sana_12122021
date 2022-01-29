###

Bienvenue sur Gagomania, le réseau social interne de chez Groupomania.

###

Cette application a pour but de permettre à ses utilisateurs, les employés de Groupomania, de créer un compte et d'échanger via le partage de gifs sur un fil d'actualité, ainsi que de les commenter, afin d'améliorer les rapports et l'ambiance au sein de l'entreprise.

###

Le/La chargé.e de communication Groupomania aura un rôle de modérateur.trice, lui donnant le droit de supprimer des gifs et des commentaires jugés inappropriés.


### Pour démarrer le projet ###

### Base de données

Commencez par installer MySQL sur votre ordinateur. Pour cela, suivez ce tutoriel pour la configuration https://www.youtube.com/watch?v=K1SOagDC3Xg jusqu'à environ 8mn.
Gardez bien votre nom d'utilisateur (vous pouvez garder root) et votre mot de passe MySQL.
Ouvrez l'application "MySQL Command Line Client" et entrez votre mot de passe utilisateur.
S'il ne vous est pas demandé d'entrer votre mot de passe, c'est simplement un bug de MySQL. Fermez (patiemment) la fenêtre et relancez l'application.
Exécutez maintenant les commandes suivantes (attention aux fautes de frappe) :

- CREATE DATABASE # Nommez votre base de données comme vous le souhaitez #;

- USE # Nom choisi pour votre base de données #;

- CREATE TABLE user (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(25) NOT NULL, prenom VARCHAR(25) NOT NULL, mail VARCHAR(100) NOT NULL UNIQUE, mot_de_passe VARCHAR(100) NOT NULL, photo_url VARCHAR(255) DEFAULT 'https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png', moderateur BOOLEAN DEFAULT 0);

- CREATE TABLE gif (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, titre VARCHAR(255), url VARCHAR(255) NOT NULL, user_id INTEGER, date VARCHAR(100) NOT NULL);

- ALTER TABLE gif ADD FOREIGN KEY (user_id) REFERENCES user(id) ON CASCADE DELETE;

- CREATE TABLE commentaire (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, contenu VARCHAR(255) NOT NULL, date VARCHAR(100) NOT NULL, user_id INTEGER, gif_id INTEGER);

- ALTER TABLE commentaire ADD FOREIGN KEY (user_id) REFERENCES user(id) ON CASCADE DELETE;

- ALTER TABLE commentaire ADD FOREIGN KEY (gif_id) REFERENCES gif(id) ON CASCADE DELETE;

Vous avez maintenant créé votre base de données avec les bonnes tables et les bons champs. Vous allez pouvoir connecter l'application à votre base de données pour la faire fonctionner sur votre ordinateur.

### API et application

Avant tout, assurez-vous d'avoir installé NodeJS sur votre ordinateur.
Si ce n'est pas le cas, suivez ce tutoriel : https://www.youtube.com/watch?v=EtMBZriJk9g

Depuis le site https://github.com/Eiishi/P7_Tays_Sana_12122021, cliquez sur le bouton vert "Code".

Si vous êtes familier avec git :
Récupérez le lien https et clonez le repo git sur votre ordinateur.
Sinon :
Cliquez sur l'option "Download ZIP" et téléchargez le fichier.

Ouvrez le fichier dans un éditeur de code et ouvrez un terminal.
(Si vous utilisez Visual Studio Code, que vous pouvez installer ici https://code.visualstudio.com/Download, un onglet Terminal en haut de la fenêtre vous permet d'ouvrir un nouveau temrinal. Raccourci : Ctrl + Maj + ù)


Dans l'explorateur de fichiers sur la gauche, allez dans le dossier "backend" et ouvrez le fichier ".env".
Renseignez votre nom d'utilisateur et votre mot de passe MySQL dans les champs prévus à cet effet. Voici un exemple de syntaxe :
DB_USER = root
DB_PASSWORD = myPassword
DATABASE = myDataBase

Exécutez ensuite dans votre terminal les commandes suivantes :

- cd backend

- npm install

- node server

Attention : si vous rencontrez des erreurs ou des difficultés, essayez d'ouvrir un terminal "cmd" et non "powershell". Pour cela, identifiez le bouton "+" en haut à droite de votre terminal et cliquez sur la flèche descendante qui l'accompagne ("Launch profile..."). Choisissez "Command Prompt".

Vous devriez voir s'afficher les messages suivants :
Listening on port 3000
Connexion à MySQL réussie !

Ensuite, ouvrez un nouveau terminal (Ctrl + Maj + ù) et exécutez les commandes :

- cd frontend\myproject

- npm install

- npm run serve

-- les commandes "npm install" ne sont à exécuter que lors de votre première utilisation --

Après chargement, le projet est prêt à être ouvert sur l'un des URL donnés dans votre terminal, à la ligne "App running at:"

Note : N'hésitez pas à actualiser la page d'accueil deux ou trois fois pour assurer le bon fonctionnement du site.