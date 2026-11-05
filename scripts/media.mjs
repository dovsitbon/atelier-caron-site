// Découpe et classe les photos Instagram du salon (assets/raw) :
//  - assets/<catégorie>/<nom>.jpg : version haute qualité, classée (hero, femme, homme-barbier, couleur, avant-apres, equipe, salon) ;
//  - public/media/<catégorie>/<nom>.jpg : version servie par le site (next/image la convertit en AVIF/WebP) ;
//  - data/media-sizes.json : dimensions, pour éviter tout décalage au chargement.
// Les recadrages évitent les textes incrustés (« L'ATELIER CARON », « Avant », avis clients, adresses).
// Coordonnées : [x, y, largeur, hauteur] en pixels de l'image d'origine.
// Pour ajouter vos propres photos prises au salon : déposez-les dans assets/<catégorie>/ et ajoutez une ligne ici avec crop: null.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const RAW = "assets/raw";
const file = (n) => fs.readdirSync(RAW).find((f) => f.startsWith(`atelier-caron_${n}`));

// Gabarits de ses montages Instagram (format 1440 × 1800)
const Q = {
  tl: [140, 10, 540, 675], // carré du haut à gauche, au-dessus du mot « Avant »
  tr: [760, 10, 540, 675],
  bl: [140, 975, 540, 675],
  br: [760, 975, 540, 675],
};
const F = {
  avant: [85, 130, 540, 675], // cadre violet du haut (avant)
  apres: [700, 780, 640, 800], // grand cadre du bas (après)
};

const items = [
  // Hero
  ["hero", "balayage-blond-ondule", "06", [0, 0, 1440, 1667]],
  ["hero", "degrade-texture-homme", "31", [0, 0, 1440, 1800]],
  // Équipe (couvertures de reels, basse définition : à remplacer par de vrais portraits)
  ["equipe", "quentin-taille-de-barbe", "02", [96, 0, 624, 780]],
  ["equipe", "zoe-au-travail", "03", [0, 140, 720, 900]],
  // Salon
  ["salon", "devanture-rue-jean-calvin", "logo", [0, 180, 880, 820]],
  // Femme
  ["femme", "boucles-naturelles-blondes", "25", [0, 480, 1440, 1100]],
  ["femme", "boucles-foulard-leopard", "15", [0, 0, 1440, 1500]],
  ["femme", "carre-mi-long-lumineux", "42", [0, 680, 1440, 940]],
  ["femme", "lisse-long-blond", "23", [0, 680, 1440, 940]],
  ["femme", "brushing-ondule-chatain", "09", [750, 300, 630, 1170]],
  ["femme", "coupe-courte-boucles-profil", "26", Q.tr],
  ["femme", "carre-flou-ondule", "33", Q.br],
  ["femme", "chignon-mariage-fleurs", "28", [60, 30, 700, 620]],
  ["femme", "chignon-tresse-mariage", "28", [120, 910, 700, 580]],
  ["femme", "chignon-mariage-profil", "28", [855, 570, 500, 620]],
  ["femme", "demi-queue-ondulee", "32", [0, 0, 1440, 1150]],
  // Homme & barbier
  ["homme-barbier", "degrade-americain-arriere", "11", [0, 0, 1440, 760]],
  ["homme-barbier", "coupe-mi-longue-plaquee", "12", [100, 0, 1240, 960]],
  ["homme-barbier", "boucles-degrade-bas", "21", [0, 0, 1440, 980]],
  ["homme-barbier", "texture-degrade-barbe", "44", [0, 0, 1440, 930]],
  ["homme-barbier", "coupe-texture-profil", "36", [0, 0, 1440, 1230]],
  ["homme-barbier", "degrade-blond-barbe", "39", [0, 0, 1440, 1150]],
  ["homme-barbier", "pompadour-degrade-gris", "05", Q.tl],
  ["homme-barbier", "degrade-barbe-profil", "05", Q.bl],
  ["homme-barbier", "mulet-boucle-arriere", "08", Q.tr],
  ["homme-barbier", "texture-boucles-face", "08", Q.bl],
  ["homme-barbier", "degrade-a-blanc-barbe", "16", Q.tr],
  ["homme-barbier", "degrade-a-blanc-profil", "16", Q.bl],
  ["homme-barbier", "rituel-barbe-quentin", "02", [0, 0, 720, 780]],
  // Couleur
  ["couleur", "balayage-ondule-dos", "13", Q.tl],
  ["couleur", "balayage-ondule-profil", "13", Q.br],
  ["couleur", "blond-polaire-lisse", "29", [760, 300, 620, 1170]],
  ["couleur", "balayage-blond-long", "41", F.apres],
  ["couleur", "balayage-miel-profil", "37", F.apres],
  ["couleur", "blond-froid-attache", "45", [0, 0, 1440, 1100]],
  // Avant / après (paires au même format 4:5)
  ["avant-apres", "coupe-courte-avant", "26", Q.tl],
  ["avant-apres", "coupe-courte-apres", "26", Q.bl],
  ["avant-apres", "balayage-froid-avant", "34", Q.tl],
  ["avant-apres", "balayage-froid-apres", "34", Q.tr],
  ["avant-apres", "degrade-texture-avant", "35", Q.tl],
  ["avant-apres", "degrade-texture-apres", "35", Q.bl],
  ["avant-apres", "carre-ondule-avant", "33", Q.tl],
  ["avant-apres", "carre-ondule-apres", "33", Q.br],
  ["avant-apres", "eclaircissement-avant", "10", F.avant],
  ["avant-apres", "eclaircissement-apres", "10", F.apres],
  ["avant-apres", "balayage-carre-avant", "17", F.avant],
  ["avant-apres", "balayage-carre-apres", "17", F.apres],
  ["avant-apres", "balayage-long-avant", "37", F.avant],
  ["avant-apres", "balayage-long-apres", "37", F.apres],
];

const sizes = {};
for (const [cat, name, id, crop] of items) {
  const src = path.join(RAW, file(id));
  const base = () => {
    const s = sharp(src).rotate();
    return crop ? s.extract({ left: crop[0], top: crop[1], width: crop[2], height: crop[3] }) : s;
  };
  for (const [dir, w, q] of [
    [`assets/${cat}`, 1600, 90],
    [`public/media/${cat}`, 1400, 82],
  ]) {
    fs.mkdirSync(dir, { recursive: true });
    const info = await base()
      .resize({ width: w, withoutEnlargement: true })
      .modulate({ saturation: 0.94 }) // atténue un peu les néons violets du salon
      .jpeg({ quality: q, mozjpeg: true, progressive: true })
      .toFile(`${dir}/${name}.jpg`);
    if (dir.startsWith("public")) sizes[`/media/${cat}/${name}.jpg`] = { w: info.width, h: info.height };
  }
  console.log(`${cat}/${name}`);
}
fs.writeFileSync("data/media-sizes.json", JSON.stringify(sizes, null, 2) + "\n");

// Image de partage (Open Graph) 1200 × 630 : les deux photos du hero côte à côte
const half = async (id, c) => sharp(path.join(RAW, file(id))).extract({ left: c[0], top: c[1], width: c[2], height: c[3] }).resize(600, 630, { fit: "cover", position: "top" }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#F8F5F0" } })
  .composite([
    { input: await half("06", [0, 0, 1440, 1512]), left: 0, top: 0 },
    { input: await half("31", [0, 120, 1440, 1512]), left: 600, top: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/og.jpg");
console.log("public/og.jpg");
