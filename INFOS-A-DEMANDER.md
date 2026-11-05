# Infos à demander au salon

À valider avec Quentin avant de mettre le site en avant (fiche Google, Instagram, affichette).

1. **Le nom à garder** : « L'Atelier Caron » (Instagram, Facebook, Google) ou « L'atelier coiffure » (Planity, enseigne de la vitrine) ? Et que signifie « QF Capil'Hair by Atelier Coiffure » (publication Instagram) : une marque à mettre sur le site ?
2. **Les bons horaires** : Planity indique mardi 10 h – 18 h, mercredi 10 h – 17 h, jeudi et vendredi 10 h – 19 h, samedi 10 h – 17 h ; Instagram et Fresha indiquent mardi au vendredi 10 h – 19 h, samedi 10 h – 17 h ; Google en affiche encore d'autres. Le site affiche aujourd'hui ceux de Planity, avec la mention « à confirmer ». Fermetures prévues (vacances de Quentin et de Zoé, jours fériés, 11 novembre ?).
3. **Les 4 prestations masquées sur Planity** : 3 côté homme, 1 côté femme (nom, durée, prix).
4. **La politique d'annulation et de retard** : délai pour annuler, que se passe-t-il en cas de gros retard ? La FAQ du site reste prudente en attendant.
5. **Le lien Facebook** : trouvé (facebook.com/AtelierCoiffureAmiens, « Atelier Caron Amiens »), à confirmer que c'est bien le bon.
6. **Photos du salon et de l'équipe** : le site utilise des images tirées de vidéos Instagram pour les portraits de Quentin et Zoé (basse définition) et la photo de la devanture. À prévoir sur place : un portrait de chacun, l'intérieur du salon (fauteuils, bois, plantes), le geste du coupe-choux, une photo d'enfant (avec accord des parents) pour la tuile « Enfants ». Emplacements prêts : `assets/equipe/`, `assets/salon/`, `assets/homme-barbier/`, puis `npm run media`.
7. **Le logo** : la photo de profil Instagram est la devanture, pas un logo. Le site utilise un logo typographique provisoire (ciseaux et coupe-choux croisés). S'il existe un logo dessiné (enseigne « l'Atelier Coiffure » ?), récupérer le fichier.
8. **Le SIRET** et la raison sociale exacte, pour les mentions légales.
9. **Une adresse e-mail** pour recevoir les demandes de devis (chignon de mariage, permanente, carte cadeau). Sans elle, le formulaire demande au client d'appeler le salon.
10. **Cartes cadeaux** : montants proposés ? Valables combien de temps ?
11. **Avis clients** : accord pour citer les deux avis repris de ses publications Instagram (Fabien G., Gaëtan C.).

## Réglages techniques une fois les réponses reçues

- Horaires : `data/horaires.json` (passer `confirmed` à `true`).
- Prestations et prix : `data/prestations.json`.
- Bandeau du haut : `data/annonces.json`.
- E-mails de devis (Vercel → Settings → Environment Variables) : `RESEND_API_KEY`, `DEVIS_NOTIFY_EMAIL`, `RESEND_FROM`.
