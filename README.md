# L'Atelier Caron : site vitrine et réservation

Coiffure femme, barbier et couleur, 12 rue Jean Calvin, Amiens. Next.js 16, Tailwind 4, Framer Motion, bilingue FR / EN (`/fr`, `/en`).

- Réservation : tous les boutons « Réserver » ouvrent Planity.
- Sur devis (chignon, permanente, carte cadeau, couleur) : `/fr/devis`, e-mail au salon et confirmation au client via Resend (`RESEND_API_KEY`, `DEVIS_NOTIFY_EMAIL`, `RESEND_FROM`).
- Données datées : `data/*.json` (prestations, horaires avec statut ouvert / fermé en direct, annonces, avis, galerie, avant / après).
- Textes : `locales/fr.json`, `locales/en.json`.

## Commandes

```bash
npm run dev          # développement
npm run media        # découpe et classe les photos (assets/raw → assets/<catégorie> et public/media)
npm run contenu      # régénère CONTENU.md
npm run affichette   # régénère public/affichette-atelier-caron-a5.pdf
```

Livrables : [CONTENU.md](CONTENU.md), [NOTE-FICHE-GOOGLE.md](NOTE-FICHE-GOOGLE.md), [INFOS-A-DEMANDER.md](INFOS-A-DEMANDER.md), `public/affichette-atelier-caron-a5.pdf`.
