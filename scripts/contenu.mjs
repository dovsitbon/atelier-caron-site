// Génère CONTENU.md : tous les textes du site (FR / EN) et toutes les prestations avec leurs prix, pour validation par le salon.
//   npm run contenu
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const json = async (p) => JSON.parse(await readFile(path.join(ROOT, p), "utf8"));
const fr = await json("locales/fr.json");
const en = await json("locales/en.json");
const prestations = await json("data/prestations.json");
const horaires = await json("data/horaires.json");
const annonces = await json("data/annonces.json");
const avis = await json("data/avis.json");
const avantApres = await json("data/avant-apres.json");
const galerie = await json("data/galerie.json");

const out = [];
const w = (s = "") => out.push(s);
const price = (p) => (!p ? "Sur devis" : p.from != null ? `dès ${p.from} €` : p.min === p.max ? `${p.min} €` : `${p.min} – ${p.max} €`);
const dur = (m) => (!m ? "" : m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${String(m % 60).padStart(2, "0")}` : ""}`);
const book = { planity: "Planity", devis: "formulaire du site", phone: "téléphone" };

w("# L'Atelier Caron : contenu du site");
w();
w("Tous les textes et tous les prix du site, en français et en anglais, pour relecture avant validation. Les textes se corrigent dans `locales/fr.json` et `locales/en.json` ; prix, horaires, annonces, avis et photos dans `data/*.json`. Ce fichier se régénère avec `npm run contenu`.");
w();
w(`Rien n'a été inventé : prestations, durées et prix viennent de Planity (relevé du ${prestations.checked}) ; notes Planity ${avis.planity.rating}/5 (${avis.planity.count} avis) et Google ${avis.google.rating}/5 (${avis.google.count} avis) relevées le ${avis.checked}. Les points à confirmer sont listés dans [INFOS-A-DEMANDER.md](INFOS-A-DEMANDER.md).`);
w();

w("## Prestations et prix (`data/prestations.json`)");
w();
for (const c of prestations.categories) {
  w(`### ${c.title.fr} / ${c.title.en}`);
  w();
  w("| Prestation | Précision | Durée | Prix | Réservation |");
  w("|---|---|---|---|---|");
  for (const i of c.items) w(`| **${i.name.fr}**<br>*${i.name.en}* | ${i.detail ? `${i.detail.fr}<br>*${i.detail.en}*` : ""} | ${dur(i.duration)} | ${price(i.price)} | ${book[i.book]} |`);
  w();
}
w("Prestations masquées sur Planity, à récupérer : 3 prestations homme, 1 prestation femme.");
w();

w("## Horaires (`data/horaires.json`)");
w();
const days = fr.days;
for (const d of [2, 3, 4, 5, 6, 0, 1]) {
  const r = horaires.week[String(d)];
  w(`- ${days[d]} : ${r ? r.map(([a, b]) => `${a} – ${b}`).join(", ") : "fermé"}`);
}
w();
w(`Statut : ${horaires.confirmed ? "confirmés" : "**à confirmer** (Planity, Instagram et Google ne disent pas la même chose)"}.`);
w();

w("## Bandeau du haut (`data/annonces.json`)");
w();
w(`- Permanent : ${annonces.default.text.fr} / *${annonces.default.text.en}*`);
for (const a of annonces.items) w(`- Du ${a.from} au ${a.to} : ${a.text.fr} / *${a.text.en}*`);
w();

w("## Avant / après et galerie");
w();
for (const p of avantApres.items) w(`- Avant / après : ${p.title.fr} / *${p.title.en}*`);
w(`- Galerie : ${galerie.items.length} photos tirées d'Instagram, filtrables (femme, dégradé, balayage, barbe).`);
w();

// Tous les textes, FR puis EN, section par section
const walk = (a, b, prefix = "") => {
  for (const k of Object.keys(a)) {
    const key = prefix ? `${prefix}.${k}` : k;
    const x = a[k];
    const y = b?.[k];
    if (typeof x === "string") w(`| \`${key}\` | ${x.replace(/\n/g, "<br>").replace(/\|/g, "\|")} | ${(y ?? "").replace(/\n/g, "<br>").replace(/\|/g, "\|")} |`);
    else if (Array.isArray(x)) x.forEach((v, i) => (typeof v === "string" ? w(`| \`${key}.${i}\` | ${v} | ${y?.[i] ?? ""} |`) : walk(v, y?.[i], `${key}.${i}`)));
    else if (x && typeof x === "object") walk(x, y, key);
  }
};
w("## Textes du site");
w();
for (const section of Object.keys(fr)) {
  w(`### ${section}`);
  w();
  w("| Clé | Français | English |");
  w("|---|---|---|");
  walk({ [section]: fr[section] }, { [section]: en[section] });
  w();
}

await writeFile(path.join(ROOT, "CONTENU.md"), out.join("\n"));
console.log("CONTENU.md écrit");
