# L'Atelier Caron : contenu du site

Tous les textes et tous les prix du site, en français et en anglais, pour relecture avant validation. Les textes se corrigent dans `locales/fr.json` et `locales/en.json` ; prix, horaires, annonces, avis et photos dans `data/*.json`. Ce fichier se régénère avec `npm run contenu`.

Rien n'a été inventé : prestations, durées et prix viennent de Planity (relevé du 2026-11-05) ; notes Planity 5/5 (306 avis) et Google 4.9/5 (118 avis) relevées le 2026-11-05. Les points à confirmer sont listés dans [INFOS-A-DEMANDER.md](INFOS-A-DEMANDER.md).

## Prestations et prix (`data/prestations.json`)

### Homme & barbier / Men & barbering

| Prestation | Précision | Durée | Prix | Réservation |
|---|---|---|---|---|
| **Coupe + taille de barbe au coupe-choux**<br>*Haircut + straight-razor beard trim* | Soins, serviette chaude et coiffage<br>*Beard care, hot towel and styling* | 45 min | dès 38 € | Planity |
| **Coupe classique, dégradé à blanc**<br>*Classic cut, skin fade* | Dégradé progressif, avec ou sans sabot · avec Quentin<br>*Gradual fade, with or without guards · with Quentin* | 30 min | 24 € | Planity |
| **Coupe classique, dégradé simple ou ciseaux**<br>*Classic cut, simple fade or scissor cut* | Avec ou sans sabot · avec Zoé<br>*With or without guards · with Zoé* | 30 min | 24 € | Planity |
| **Coupe transformation**<br>*Transformation cut* | Du long au court, ou cheveux longs avec soin<br>*Long to short, or long hair with a treatment* | 45 min | dès 30 € | Planity |
| **Barbe longue**<br>*Long beard* | Finitions à la lame et serviette chaude<br>*Razor finish and hot towel* | 30 min | 25 € | Planity |

### Femme / Women

| Prestation | Précision | Durée | Prix | Réservation |
|---|---|---|---|---|
| **Coupe cheveux courts**<br>*Short hair cut* | Sous l'oreille (le carré n'en fait pas partie)<br>*Above the ear line (bobs not included)* | 30 min | 34 – 38 € | Planity |
| **Coupe cheveux mi-longs**<br>*Mid-length cut* | À hauteur d'épaule<br>*Shoulder length* | 45 min | 38 – 42 € | Planity |
| **Coupe cheveux longs**<br>*Long hair cut* | Sous l'épaule, jusqu'au dos<br>*Below the shoulders* | 50 min | 44 – 48 € | Planity |
| **Shampoing + brushing, court à mi-long**<br>*Wash + blow-dry, short to mid-length* |  | 30 min | dès 25 € | Planity |
| **Shampoing + brushing, cheveux longs**<br>*Wash + blow-dry, long hair* |  | 45 min | dès 30 € | Planity |

### Enfants / Children

| Prestation | Précision | Durée | Prix | Réservation |
|---|---|---|---|---|
| **Moins de 2 ans**<br>*Under 2* | Garçons et filles<br>*Boys and girls* | 30 min | 12 € | Planity |
| **Garçon, 2 à 15 ans**<br>*Boy, 2 to 15* | Avec ou sans shampoing, selon l'âge<br>*With or without a wash, depending on age* | 30 min | 15 – 20 € | Planity |
| **Fille, 2 à 15 ans, cheveux courts**<br>*Girl, 2 to 15, short hair* | Jusqu'aux épaules<br>*Up to the shoulders* | 30 min | 20 – 25 € | Planity |
| **Fille, 2 à 15 ans, cheveux longs**<br>*Girl, 2 to 15, long hair* | Au-delà des épaules<br>*Past the shoulders* | 40 min | 25 – 30 € | Planity |

### Couleur, balayage & mèches / Colour, balayage & highlights

| Prestation | Précision | Durée | Prix | Réservation |
|---|---|---|---|---|
| **Coloration d'oxydation, courts et mi-longs**<br>*Permanent colour, short to mid-length* |  | 1 h 30 | 60 – 90 € | Planity |
| **Coloration d'oxydation, cheveux longs**<br>*Permanent colour, long hair* |  | 1 h 45 | 66 – 98 € | Planity |
| **Coloration semi-temporaire, courts et mi-longs**<br>*Semi-permanent colour, short to mid-length* | Part au fil des shampoings, couvre environ 50 % des cheveux blancs<br>*Fades wash by wash, covers about 50% of greys* | 1 h 30 | 55 – 85 € | Planity |
| **Coloration semi-temporaire, cheveux longs**<br>*Semi-permanent colour, long hair* | Part au fil des shampoings, couvre environ 50 % des cheveux blancs<br>*Fades wash by wash, covers about 50% of greys* | 1 h 45 | 60 – 92 € | Planity |
| **Décoloration + coupe**<br>*Full bleach + cut* | Tête entière, avec ou sans patine · appelez-nous pour le rendez-vous<br>*Full head, with or without toner · please call to book* | 3 h 15 | dès 80 € | téléphone |
| **Balayage, cheveux mi-longs**<br>*Balayage, mid-length* | Au-dessus des épaules<br>*Above the shoulders* | 3 h 45 | dès 130 € | Planity |
| **Balayage, cheveux longs**<br>*Balayage, long hair* | Sous les épaules<br>*Below the shoulders* | 4 h 15 | dès 150 € | Planity |
| **Mèches, courts et mi-longs**<br>*Highlights, short to mid-length* |  | 3 h 45 | dès 135 € | Planity |
| **Mèches, cheveux longs**<br>*Highlights, long hair* | Sous les épaules<br>*Below the shoulders* | 4 h 15 | dès 155 € | Planity |

### Chignons, permanentes & cartes cadeaux / Updos, perms & gift cards

| Prestation | Précision | Durée | Prix | Réservation |
|---|---|---|---|---|
| **Chignon, cheveux mi-longs**<br>*Updo, mid-length hair* |  | 1 h | Sur devis | formulaire du site |
| **Chignon, cheveux longs**<br>*Updo, long hair* |  | 1 h 30 | Sur devis | formulaire du site |
| **Chignon de mariage**<br>*Wedding updo* |  | 1 h 30 | Sur devis | formulaire du site |
| **Essai chignon de mariage**<br>*Wedding updo trial* |  | 1 h | Sur devis | formulaire du site |
| **Permanente homme**<br>*Men's perm* | Boucles ou mouvement<br>*Curls or movement* | 1 h | Sur devis | formulaire du site |
| **Permanente femme**<br>*Women's perm* | Volume racine, ondulations, boucles<br>*Root lift, waves, curls* | 1 h 30 | Sur devis | formulaire du site |
| **Carte cadeau homme**<br>*Gift card, men* | Sur demande<br>*On request* |  | Sur devis | formulaire du site |
| **Carte cadeau femme**<br>*Gift card, women* | Sur demande<br>*On request* |  | Sur devis | formulaire du site |

Prestations masquées sur Planity, à récupérer : 3 prestations homme, 1 prestation femme.

## Horaires (`data/horaires.json`)

- mardi : 10:00 – 18:00
- mercredi : 10:00 – 17:00
- jeudi : 10:00 – 19:00
- vendredi : 10:00 – 19:00
- samedi : 10:00 – 17:00
- dimanche : fermé
- lundi : fermé

Statut : **à confirmer** (Planity, Instagram et Google ne disent pas la même chose).

## Bandeau du haut (`data/annonces.json`)

- Permanent : Paiement en espèces ou par chèque uniquement, pas de carte bancaire. / *Cash or cheque only, cards are not accepted.*
- Du 2026-11-15 au 2026-12-24 : Fêtes de fin d'année : les créneaux partent vite, réservez dès maintenant. Paiement en espèces ou par chèque. / *Christmas is busy: book your slot early. Cash or cheque only.*

## Avant / après et galerie

- Avant / après : Balayage sur carré ondulé / *Balayage on a wavy bob*
- Avant / après : Des boucles longues à la coupe courte / *Long curls to a short cut*
- Avant / après : Dégradé et dessus texturé / *Fade with a textured top*
- Avant / après : Des reflets cuivrés au blond froid / *From brassy to cool blonde*
- Avant / après : Éclaircir et faire briller / *Lighter and glossier*
- Avant / après : Carré ondulé, reflets froids / *Wavy bob, cool tones*
- Galerie : 18 photos tirées d'Instagram, filtrables (femme, dégradé, balayage, barbe).

## Textes du site

### meta

| Clé | Français | English |
|---|---|---|
| `meta.title` | Coiffeur et barbier à Amiens centre | L'Atelier Caron, rue Jean Calvin | Hairdresser and barber in central Amiens | L'Atelier Caron, rue Jean Calvin |
| `meta.description` | Coiffeur et barbier à Amiens centre depuis 2016 : coupe femme, dégradé, barbe au coupe-choux, balayage, coloration. Prix affichés, réservation sur Planity. | Hairdresser and barber in central Amiens since 2016: women's cuts, fades, straight-razor beards, balayage, colour. Clear prices, booking on Planity. |
| `meta.ogAlt` | Un balayage blond ondulé et un dégradé texturé réalisés à L'Atelier Caron, Amiens | A wavy blonde balayage and a textured fade done at L'Atelier Caron, Amiens |

### intro

| Clé | Français | English |
|---|---|---|
| `intro.skip` | Passer | Skip |

### nav

| Clé | Français | English |
|---|---|---|
| `nav.skip` | Aller au contenu | Skip to content |
| `nav.home` | L'Atelier Caron, accueil | L'Atelier Caron, home |
| `nav.menu` | Menu | Menu |
| `nav.close` | Fermer le menu | Close menu |
| `nav.femme` | Femme | Women |
| `nav.homme` | Homme & barbier | Men & barber |
| `nav.couleur` | Couleur | Colour |
| `nav.equipe` | L'équipe | The team |
| `nav.infos` | Infos | Visit |
| `nav.prix` | Prix | Prices |
| `nav.lang` | Langue | Language |
| `nav.instagram` | Instagram de L'Atelier Caron | L'Atelier Caron on Instagram |
| `nav.book` | Réserver | Book |
| `nav.call` | Appeler | Call |

### announce

| Clé | Français | English |
|---|---|---|
| `announce.close` | Fermer l'annonce | Dismiss |

### status

| Clé | Français | English |
|---|---|---|
| `status.open` | Ouvert maintenant | Open now |
| `status.closed` | Fermé | Closed |
| `status.until` | jusqu'à {time} | until {time} |
| `status.reopens` | ouvre {day} à {time} | opens {day} at {time} |
| `status.today` | aujourd'hui | today |
| `status.tomorrow` | demain | tomorrow |

### days

| Clé | Français | English |
|---|---|---|
| `days.0` | dimanche | Sunday |
| `days.1` | lundi | Monday |
| `days.2` | mardi | Tuesday |
| `days.3` | mercredi | Wednesday |
| `days.4` | jeudi | Thursday |
| `days.5` | vendredi | Friday |
| `days.6` | samedi | Saturday |

### hero

| Clé | Français | English |
|---|---|---|
| `hero.eyebrow` | Coiffure · Barbier · Amiens centre · Depuis 2016 | Hair · Barber · Central Amiens · Since 2016 |
| `hero.title` | Coupe, couleur et barbe, faites avec soin | Cuts, colour and beards, done with care |
| `hero.lead` | Quentin s'occupe des hommes et de la barbe, Zoé des coupes femme et de la couleur. Un petit salon de la rue Jean Calvin, où l'on prend le temps. | Quentin looks after the men and the beards, Zoé after women's cuts and colour. A small salon on rue Jean Calvin where nobody is rushed. |
| `hero.book` | Réserver | Book |
| `hero.prices` | Voir les prix | See prices |
| `hero.ratingPlanity` | sur Planity | on Planity |
| `hero.ratingGoogle` | sur Google | on Google |
| `hero.reviews` | {count} avis | {count} reviews |
| `hero.altFemme` | Balayage blond sur cheveux longs ondulés, réalisé au salon | Blonde balayage on long wavy hair, done in the salon |
| `hero.altHomme` | Dégradé bas et dessus texturé, réalisé au salon | Low fade with a textured top, done in the salon |

### tiles

| Clé | Français | English |
|---|---|---|
| `tiles.eyebrow` | Au salon | In the salon |
| `tiles.title` | Coiffure femme, barbier et couleur à Amiens | Women's hair, barbering and colour in Amiens |
| `tiles.items.femme.title` | Femme | Women |
| `tiles.items.femme.text` | Coupes courtes à longues, brushings, boucles | Short to long cuts, blow-dries, curls |
| `tiles.items.femme.alt` | Coupe courte bouclée avec nuque dégradée | Short curly cut with a faded nape |
| `tiles.items.homme.title` | Homme & barbier | Men & barber |
| `tiles.items.homme.text` | Dégradés, coupes ciseaux, barbe au coupe-choux | Fades, scissor cuts, straight-razor beards |
| `tiles.items.homme.alt` | Dégradé à blanc et barbe taillée | Skin fade and trimmed beard |
| `tiles.items.enfants.title` | Enfants | Children |
| `tiles.items.enfants.text` | Garçons et filles jusqu'à 15 ans, de 12 à 30 € | Boys and girls up to 15, from €12 to €30 |
| `tiles.items.enfants.alt` |  |  |
| `tiles.items.couleur.title` | Couleur & balayage | Colour & balayage |
| `tiles.items.couleur.text` | Balayage, mèches, coloration, blond froid | Balayage, highlights, colour, cool blondes |
| `tiles.items.couleur.alt` | Balayage blond sur cheveux longs | Blonde balayage on long hair |
| `tiles.items.chignons.title` | Chignons & mariage | Updos & weddings |
| `tiles.items.chignons.text` | Essai, jour J, sur devis | Trial and wedding day, on quote |
| `tiles.items.chignons.alt` | Chignon de mariage orné de fleurs fraîches | Wedding bun dressed with fresh flowers |

### prices

| Clé | Français | English |
|---|---|---|
| `prices.eyebrow` | Prestations et prix | Services and prices |
| `prices.title` | Les prix, sans surprise | Prices, upfront |
| `prices.lead` | Les mêmes tarifs que sur Planity. Les fourchettes dépendent de la longueur et de l'épaisseur des cheveux ; nous vous confirmons le prix avant de commencer. | The same prices as on Planity. Ranges depend on the length and thickness of your hair; we confirm the price before we start. |
| `prices.from` | dès | from |
| `prices.quote` | Sur devis | On quote |
| `prices.book` | Réserver | Book |
| `prices.bookAria` | Réserver : {name} | Book: {name} |
| `prices.ask` | Demander | Ask |
| `prices.askAria` | Demander un devis : {name} | Ask for a quote: {name} |
| `prices.call` | Appeler | Call |
| `prices.with` | avec | with |
| `prices.duration` | Durée | Time |
| `prices.price` | Prix | Price |
| `prices.payment` | Paiement en espèces ou par chèque uniquement. | Cash or cheque only. |
| `prices.checked` | Prix relevés le {date}. Ils peuvent évoluer : le prix affiché sur Planity au moment de la réservation fait foi. | Prices checked on {date}. They may change: the price shown on Planity when you book is the one that applies. |

### team

| Clé | Français | English |
|---|---|---|
| `team.eyebrow` | L'équipe | The team |
| `team.title` | Deux paires de mains, deux spécialités | Two pairs of hands, two specialities |
| `team.lead` | Le salon est petit : vous savez qui vous coiffe, et vous pouvez le choisir au moment de réserver. | It's a small salon: you know who will do your hair, and you choose when you book. |
| `team.photoNote` | Photo tirée d'une vidéo du salon | Still from a salon video |
| `team.quentin.name` | Quentin | Quentin |
| `team.quentin.role` | Fondateur, coiffeur barbier | Founder, hairdresser and barber |
| `team.quentin.text` | Il a ouvert l'atelier en 2016. Dégradés progressifs jusqu'à la peau, coupes aux ciseaux, et barbe taillée au coupe-choux avec serviette chaude : c'est lui qui s'occupe des hommes. | He opened the salon in 2016. Gradual fades down to the skin, scissor cuts, and beards trimmed with a straight razor and a hot towel: he looks after the men. |
| `team.quentin.skills.0` | Dégradé à blanc | Skin fade |
| `team.quentin.skills.1` | Barbe au coupe-choux | Straight-razor beard |
| `team.quentin.skills.2` | Coupe transformation | Transformation cut |
| `team.quentin.skills.3` | Permanente homme | Men's perm |
| `team.quentin.book` | Réserver avec Quentin | Book with Quentin |
| `team.quentin.alt` | Quentin taille la barbe d'un client au peigne et aux ciseaux | Quentin trimming a client's beard with comb and scissors |
| `team.zoe.name` | Zoé | Zoé |
| `team.zoe.role` | Coiffeuse, coloriste | Hairdresser and colourist |
| `team.zoe.text` | Formée au salon par Quentin, Zoé s'occupe des femmes : coupes, brushings, chignons, et surtout la couleur. Ses balayages et ses blonds froids remplissent le fil Instagram du salon. | Trained in the salon by Quentin, Zoé looks after the women: cuts, blow-dries, updos, and above all colour. Her balayages and cool blondes fill the salon's Instagram. |
| `team.zoe.skills.0` | Balayage | Balayage |
| `team.zoe.skills.1` | Blond froid et patine | Cool blonde and toner |
| `team.zoe.skills.2` | Coupe femme | Women's cuts |
| `team.zoe.skills.3` | Chignon de mariage | Wedding updos |
| `team.zoe.book` | Réserver avec Zoé | Book with Zoé |
| `team.zoe.alt` | Zoé coiffe une cliente aux cheveux courts bouclés | Zoé styling a client with short curly hair |

### ba

| Clé | Français | English |
|---|---|---|
| `ba.eyebrow` | Avant / après | Before / after |
| `ba.title` | Balayages, dégradés, coupes : les transformations | Balayage, fades, cuts: the transformations |
| `ba.lead` | Faites glisser le curseur. Toutes les photos ont été prises au salon, sur de vrais clients. | Drag the handle. Every photo was taken in the salon, on real clients. |
| `ba.before` | Avant | Before |
| `ba.after` | Après | After |
| `ba.slider` | Comparer avant et après : {title} | Compare before and after: {title} |
| `ba.galleryTitle` | Les réalisations | Recent work |
| `ba.filters.all` | Tout | All |
| `ba.filters.femme` | Femme | Women |
| `ba.filters.degrade` | Dégradé | Fades |
| `ba.filters.balayage` | Balayage | Balayage |
| `ba.filters.barbe` | Barbe | Beards |
| `ba.filterLabel` | Filtrer les réalisations | Filter the work |
| `ba.instagram` | Plus de réalisations sur Instagram | More on Instagram |
| `ba.close` | Fermer | Close |
| `ba.prev` | Photo précédente | Previous photo |
| `ba.next` | Photo suivante | Next photo |
| `ba.open` | Agrandir : {alt} | Enlarge: {alt} |

### ritual

| Clé | Français | English |
|---|---|---|
| `ritual.eyebrow` | Le rituel barbier | The barber ritual |
| `ritual.title` | La barbe, au coupe-choux et à la serviette chaude | Beards, by straight razor and hot towel |
| `ritual.text` | La coupe d'abord, puis la barbe : taillée, dessinée, et les contours finis au coupe-choux. La serviette chaude et le soin font partie de la prestation, le coiffage aussi. Comptez 45 minutes pour la coupe et la barbe, 30 pour une barbe longue seule. | The cut first, then the beard: trimmed, shaped, and the lines finished with a straight razor. The hot towel and the beard care are part of it, and so is the styling. Allow 45 minutes for cut and beard, 30 for a long beard on its own. |
| `ritual.points.0` | Contours finis à la lame | Lines finished with the razor |
| `ritual.points.1` | Serviette chaude | Hot towel |
| `ritual.points.2` | Soin et coiffage | Beard care and styling |
| `ritual.price` | Coupe + barbe dès 38 € · barbe longue 25 € | Cut + beard from €38 · long beard €25 |
| `ritual.book` | Réserver avec Quentin | Book with Quentin |
| `ritual.alt` | Quentin taille la barbe d'un client dans le salon | Quentin trimming a client's beard in the salon |

### gift

| Clé | Français | English |
|---|---|---|
| `gift.eyebrow` | Cartes cadeaux | Gift cards |
| `gift.title` | Offrir une coupe, une barbe ou une couleur | Give a cut, a beard or a colour |
| `gift.text` | Des cartes cadeaux homme et femme, préparées au salon. Dites-nous la prestation ou le montant, nous la préparons pour le jour où vous passez la chercher. | Gift cards for men and women, prepared in the salon. Tell us the service or the amount and we'll have it ready when you come to collect it. |
| `gift.men` | Carte cadeau homme | Gift card, men |
| `gift.women` | Carte cadeau femme | Gift card, women |
| `gift.cta` | Demander une carte cadeau | Ask for a gift card |

### infos

| Clé | Français | English |
|---|---|---|
| `infos.eyebrow` | Infos pratiques | Visit |
| `infos.title` | 12 rue Jean Calvin, Amiens centre | 12 rue Jean Calvin, central Amiens |
| `infos.address` | Adresse | Address |
| `infos.hours` | Horaires | Opening hours |
| `infos.hoursNote` | Horaires à confirmer avec le salon. | Hours to be confirmed with the salon. |
| `infos.phone` | Téléphone | Phone |
| `infos.payment` | Paiement | Payment |
| `infos.paymentText` | Espèces ou chèque. La carte bancaire n'est pas acceptée. | Cash or cheque. Cards are not accepted. |
| `infos.access` | Accès | Getting here |
| `infos.accessText` | En centre-ville, rue Jean Calvin. Le bouton Itinéraire ouvre le trajet depuis là où vous êtes. | In the town centre, on rue Jean Calvin. The Directions button opens the route from wherever you are. |
| `infos.directions` | Itinéraire | Directions |
| `infos.closed` | Fermé | Closed |
| `infos.closures` | Fermetures exceptionnelles | Special closures |
| `infos.mapTitle` | Plan : L'Atelier Caron, 12 rue Jean Calvin, Amiens | Map: L'Atelier Caron, 12 rue Jean Calvin, Amiens |
| `infos.mapLoad` | Afficher la carte | Show the map |
| `infos.mapNote` | La carte est chargée depuis Google Maps. | The map loads from Google Maps. |
| `infos.storefrontAlt` | La devanture du salon, rue Jean Calvin, avec l'enseigne l'Atelier Coiffure | The salon front on rue Jean Calvin, with the l'Atelier Coiffure sign |

### faq

| Clé | Français | English |
|---|---|---|
| `faq.eyebrow` | Questions fréquentes | FAQ |
| `faq.title` | Avant de venir | Before you come |
| `faq.items.0.q` | Quels moyens de paiement acceptez-vous ? | How can I pay? |
| `faq.items.0.a` | Les espèces et les chèques uniquement. Le salon ne prend pas la carte bancaire : pensez-y avant de venir. Le paiement se fait sur place, après la prestation. | Cash or cheque only. The salon does not take cards, so plan ahead. You pay in the salon, after your appointment. |
| `faq.items.1.q` | Je vais être en retard, ou je dois annuler | I'm running late, or I need to cancel |
| `faq.items.1.a` | Prévenez-nous dès que possible au 03 22 40 53 07, ou annulez directement depuis Planity. En cas de gros retard, nous ferons au mieux, mais il faudra peut-être raccourcir la prestation ou la décaler pour ne pas pénaliser le client suivant. | Let us know as soon as you can on 03 22 40 53 07, or cancel directly on Planity. If you're very late we'll do our best, but we may need to shorten or move your appointment so the next client isn't kept waiting. |
| `faq.items.2.q` | Coiffez-vous les enfants ? | Do you cut children's hair? |
| `faq.items.2.a` | Oui, dès le plus jeune âge : 12 € pour les moins de 2 ans, 15 à 20 € pour les garçons et 20 à 30 € pour les filles jusqu'à 15 ans, selon l'âge et la longueur. | Yes, from the very youngest: €12 for under-twos, €15 to €20 for boys and €20 to €30 for girls up to 15, depending on age and length. |
| `faq.items.3.q` | Comment connaître le prix exact d'une couleur ? | How do I get an exact price for colour? |
| `faq.items.3.a` | Le prix d'une coloration ou d'un balayage dépend de la longueur, de l'épaisseur et de la couleur de départ. Les fourchettes sont affichées plus haut. Pour une décoloration ou un changement important, appelez-nous ou envoyez une photo de vos cheveux avec le formulaire : nous vous donnons un prix avant le rendez-vous. | Colour and balayage prices depend on length, thickness and your starting colour. The ranges are listed above. For bleach or a big change, call us or send a photo of your hair through the form, and we'll give you a price before the appointment. |
| `faq.items.4.q` | Peut-on choisir son coiffeur ? | Can I choose who does my hair? |
| `faq.items.4.a` | Oui. Sur Planity, choisissez Quentin ou Zoé au moment de réserver. Quentin s'occupe surtout des hommes et de la barbe, Zoé des femmes et de la couleur. | Yes. On Planity, pick Quentin or Zoé when you book. Quentin mostly looks after men and beards, Zoé after women and colour. |
| `faq.items.5.q` | Faites-vous les coiffures de mariage ? | Do you do wedding hair? |
| `faq.items.5.a` | Oui, chignons de mariage et essai au préalable, sur devis. Envoyez-nous la date et une photo d'inspiration avec le formulaire de demande. | Yes, wedding updos with a trial beforehand, on quote. Send us the date and an inspiration photo through the request form. |

### reviews

| Clé | Français | English |
|---|---|---|
| `reviews.eyebrow` | Ce qu'en disent les clients | What clients say |
| `reviews.via` | Avis relayé sur Instagram | Review shared on Instagram |

### devis

| Clé | Français | English |
|---|---|---|
| `devis.slug` | devis | quote |
| `devis.title` | Demande de devis | Request a quote |
| `devis.metaTitle` | Chignon de mariage, permanente, carte cadeau : demande de devis | L'Atelier Caron Amiens | Wedding updo, perm, gift card: request a quote | L'Atelier Caron Amiens |
| `devis.metaDescription` | Chignon de mariage, essai, permanente homme ou femme, carte cadeau : envoyez votre demande au salon L'Atelier Caron, 12 rue Jean Calvin à Amiens. Réponse par téléphone ou e-mail. | Wedding updo, trial, men's or women's perm, gift card: send your request to L'Atelier Caron, 12 rue Jean Calvin, Amiens. We reply by phone or email. |
| `devis.eyebrow` | Sur devis | On quote |
| `devis.lead` | Pour un chignon, une permanente, une carte cadeau ou une couleur importante. Remplissez ces quelques lignes, nous vous rappelons avec un prix et une date. | For an updo, a perm, a gift card or a big colour change. Fill in these few lines and we'll call you back with a price and a date. |
| `devis.service` | Prestation | Service |
| `devis.servicePick` | Choisir une prestation | Choose a service |
| `devis.services.chignon-mariage` | Chignon de mariage | Wedding updo |
| `devis.services.essai-chignon` | Essai chignon de mariage | Wedding updo trial |
| `devis.services.chignon` | Chignon (soirée, événement) | Updo (evening, event) |
| `devis.services.permanente-femme` | Permanente femme | Women's perm |
| `devis.services.permanente-homme` | Permanente homme | Men's perm |
| `devis.services.carte-cadeau-femme` | Carte cadeau femme | Gift card, women |
| `devis.services.carte-cadeau-homme` | Carte cadeau homme | Gift card, men |
| `devis.services.couleur` | Couleur, décoloration ou balayage | Colour, bleach or balayage |
| `devis.date` | Date souhaitée | Preferred date |
| `devis.dateHint` | Pour un mariage : la date du mariage. | For a wedding: the wedding date. |
| `devis.length` | Longueur des cheveux | Hair length |
| `devis.lengths.court` | Courts | Short |
| `devis.lengths.mi-long` | Mi-longs | Mid-length |
| `devis.lengths.long` | Longs | Long |
| `devis.name` | Nom | Name |
| `devis.phone` | Téléphone | Phone |
| `devis.email` | E-mail | Email |
| `devis.emailHint` | Pour recevoir une copie de votre demande. | To receive a copy of your request. |
| `devis.photo` | Photo d'inspiration | Inspiration photo |
| `devis.photoHint` | Facultatif. JPG ou PNG, réduite automatiquement. | Optional. JPG or PNG, resized automatically. |
| `devis.photoRemove` | Retirer la photo | Remove photo |
| `devis.message` | Précisions | Details |
| `devis.messagePh` | Nombre de personnes, heure de la cérémonie, montant de la carte cadeau… | Number of people, time of the ceremony, gift card amount… |
| `devis.required` | obligatoire | required |
| `devis.optional` | facultatif | optional |
| `devis.send` | Envoyer la demande | Send request |
| `devis.sending` | Envoi… | Sending… |
| `devis.errors.service` | Choisissez une prestation. | Choose a service. |
| `devis.errors.name` | Indiquez votre nom. | Please enter your name. |
| `devis.errors.phone` | Indiquez un numéro de téléphone valide. | Please enter a valid phone number. |
| `devis.errors.email` | Cette adresse e-mail ne semble pas valide. | This email address doesn't look right. |
| `devis.errors.network` | L'envoi n'a pas abouti. Réessayez ou appelez-nous au 03 22 40 53 07. | Sending failed. Try again or call us on +33 3 22 40 53 07. |
| `devis.done.title` | Merci, votre demande est envoyée | Thank you, your request has been sent |
| `devis.done.text` | Le salon vous rappelle rapidement avec un prix et une date. | The salon will call you back shortly with a price and a date. |
| `devis.done.copy` | Une copie vient de vous être envoyée par e-mail. | A copy has been sent to your email. |
| `devis.done.fallbackTitle` | Dernière étape : un appel | One last step: a phone call |
| `devis.done.fallbackText` | L'envoi automatique n'est pas encore en place. Appelez le salon pour lui transmettre votre demande, voici le récapitulatif : | Automatic sending isn't set up yet. Please call the salon to pass on your request; here is the summary: |
| `devis.done.call` | Appeler le salon | Call the salon |
| `devis.done.again` | Faire une autre demande | Make another request |
| `devis.email_.subject` | Demande de devis | Quote request |
| `devis.email_.title` | Nouvelle demande de devis | New quote request |
| `devis.email_.confirmSubject` | Votre demande à L'Atelier Caron | Your request to L'Atelier Caron |
| `devis.email_.confirmIntro` | Bonjour {name},<br><br>Merci pour votre demande. Voici ce que nous avons reçu : | Hello {name},<br><br>Thank you for your request. Here is what we received: |
| `devis.email_.confirmOutro` | Nous vous rappelons rapidement. Pour toute question, appelez-nous au 03 22 40 53 07.<br><br>L'Atelier Caron<br>12 rue Jean Calvin, 80000 Amiens<br>Paiement en espèces ou par chèque. | We'll call you back shortly. Any questions, call us on +33 3 22 40 53 07.<br><br>L'Atelier Caron<br>12 rue Jean Calvin, 80000 Amiens<br>Cash or cheque only. |
| `devis.email_.call` | Appeler le salon | Call the salon |
| `devis.email_.photo` | Photo d'inspiration jointe. | Inspiration photo attached. |

### legal

| Clé | Français | English |
|---|---|---|
| `legal.slug` | mentions-legales | legal-notice |
| `legal.title` | Mentions légales | Legal notice |
| `legal.metaDescription` | Mentions légales et données personnelles du site de L'Atelier Caron, coiffeur et barbier à Amiens. | Legal notice and privacy for the website of L'Atelier Caron, hairdresser and barber in Amiens. |
| `legal.sections.0.h` | Éditeur | Publisher |
| `legal.sections.0.p` | L'Atelier Caron (enseigne L'atelier coiffure), salon de coiffure, 12 rue Jean Calvin, 80000 Amiens. Téléphone : 03 22 40 53 07. SIRET : en cours de renseignement. | L'Atelier Caron (trading as L'atelier coiffure), hair salon, 12 rue Jean Calvin, 80000 Amiens, France. Phone: +33 3 22 40 53 07. Company number (SIRET): to be added. |
| `legal.sections.1.h` | Hébergement | Hosting |
| `legal.sections.1.p` | Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. | Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. |
| `legal.sections.2.h` | Photos | Photos |
| `legal.sections.2.p` | Toutes les photos sont celles du salon et de ses réalisations, publiées sur son compte Instagram. Elles ne peuvent pas être réutilisées sans accord. | All photos show the salon and its work, as published on its Instagram account. They may not be reused without permission. |
| `legal.sections.3.h` | Données personnelles | Personal data |
| `legal.sections.3.p` | Le formulaire de demande transmet votre nom, votre téléphone, votre e-mail et votre photo d'inspiration au salon, par e-mail, pour répondre à votre demande. Ces données ne sont ni revendues ni utilisées à d'autres fins. Vous pouvez demander leur suppression en appelant le salon. Les réservations sont gérées par Planity, selon ses propres conditions. | The request form sends your name, phone number, email and inspiration photo to the salon by email, only to answer your request. This data is never sold or used for anything else. Call the salon to have it deleted. Bookings are handled by Planity under its own terms. |
| `legal.sections.4.h` | Cookies | Cookies |
| `legal.sections.4.p` | Le site ne dépose pas de cookie publicitaire ni de mesure d'audience. Il retient seulement votre choix de langue. La carte Google Maps n'est chargée que si vous la demandez. | The site sets no advertising or analytics cookies. It only remembers your language choice. The Google map only loads if you ask for it. |

### footer

| Clé | Français | English |
|---|---|---|
| `footer.tagline` | Coiffure femme, barbier et couleur au cœur d'Amiens, depuis 2016. | Women's hair, barbering and colour in the heart of Amiens, since 2016. |
| `footer.contact` | Contact | Contact |
| `footer.hours` | Horaires | Hours |
| `footer.follow` | Suivre | Follow |
| `footer.book` | Réserver sur Planity | Book on Planity |
| `footer.legal` | Mentions légales | Legal notice |
| `footer.devis` | Demande de devis | Request a quote |
| `footer.rights` | Tous droits réservés. | All rights reserved. |

### logo

| Clé | Français | English |
|---|---|---|
| `logo.line` | coiffure · barbier · Amiens | coiffure · barbier · Amiens |
