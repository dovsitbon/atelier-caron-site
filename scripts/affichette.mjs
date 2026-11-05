// Affichette A5 imprimable (PDF) avec QR code vers le site, à poser au salon ou en vitrine.
//   npm run affichette   →   public/affichette-atelier-caron-a5.pdf
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const site = JSON.parse(await readFile(path.join(ROOT, "data/site.json"), "utf8"));
const avis = JSON.parse(await readFile(path.join(ROOT, "data/avis.json"), "utf8"));
const url = `${site.url}/fr`;

const hex = (h) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const PAPER = hex("#F8F5F0");
const INK = hex("#1E1C1A");
const TERRA = hex("#96512F");
const MUTED = hex("#57514A");
const LINE = hex("#DDD3C5");

const pdf = await PDFDocument.create();
pdf.setTitle("L'Atelier Caron : affichette A5");
pdf.setAuthor("L'Atelier Caron");
const W = 419.53;
const H = 595.28;
const page = pdf.addPage([W, H]);
const serif = await pdf.embedFont(StandardFonts.TimesRoman);
const serifI = await pdf.embedFont(StandardFonts.TimesRomanItalic);
const sans = await pdf.embedFont(StandardFonts.Helvetica);

page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: PAPER });

// Deux photos en bandeau : balayage (Zoé) et dégradé (Quentin)
const photoH = 190;
const half = async (p, pos) => pdf.embedJpg(await sharp(path.join(ROOT, p)).resize(620, 560, { fit: "cover", position: pos }).jpeg({ quality: 88 }).toBuffer());
const a = await half("public/media/hero/balayage-blond-ondule.jpg", "north");
const b = await half("public/media/hero/degrade-texture-homme.jpg", "north");
page.drawImage(a, { x: 0, y: H - photoH, width: W / 2 - 1.5, height: photoH });
page.drawImage(b, { x: W / 2 + 1.5, y: H - photoH, width: W / 2 - 1.5, height: photoH });

const center = (text, font, size, y, color = INK) => page.drawText(text, { x: (W - font.widthOfTextAtSize(text, size)) / 2, y, size, font, color });
// Texte en capitales espacées (pdf-lib n'a pas d'interlettrage)
const spaced = (text, font, size, y, gap, color = INK) => {
  const width = [...text].reduce((s, ch) => s + font.widthOfTextAtSize(ch, size) + gap, -gap);
  let x = (W - width) / 2;
  for (const ch of text) {
    page.drawText(ch, { x, y, size, font, color });
    x += font.widthOfTextAtSize(ch, size) + gap;
  }
};

// Motif ciseaux + coupe-choux
const mark = await pdf.embedPng(await sharp(path.join(ROOT, "public/mark.svg"), { density: 900 }).resize(400).png().toBuffer());
let y = H - photoH - 22 - 30;
page.drawImage(mark, { x: (W - 30) / 2, y, width: 30, height: 30 });
y -= 26;
spaced("L’ATELIER CARON", serif, 20, y, 4.2);
y -= 15;
spaced("coiffure · barbier · Amiens", sans, 7.5, y, 1.6, MUTED);

y -= 34;
center("Prix, réservation et réalisations", serif, 19, y);
y -= 18;
center("sur notre nouveau site", serifI, 13, y, MUTED);

const qrPng = await QRCode.toBuffer(url, { margin: 0, width: 600, color: { dark: "#1E1C1A", light: "#F8F5F0" }, errorCorrectionLevel: "M" });
const qr = await pdf.embedPng(qrPng);
const qrS = 100;
y -= 16 + qrS;
page.drawImage(qr, { x: (W - qrS) / 2, y, width: qrS, height: qrS });
y -= 16;
center(url.replace(/^https?:\/\//, ""), sans, 8.5, y, TERRA);

y -= 20;
page.drawLine({ start: { x: 60, y }, end: { x: W - 60, y }, thickness: 0.5, color: LINE });
y -= 17;
center(`${avis.planity.rating.toFixed(1).replace(".", ",")}/5 sur Planity (${avis.planity.count} avis)  ·  Paiement en espèces ou par chèque`, sans, 8, y, MUTED);
y -= 15;
center(`${site.address.street}, ${site.address.postalCode} ${site.address.city}  ·  ${site.phone}`, sans, 8.5, y);
y -= 13;
center(`Quentin · Zoé  ·  @${site.instagramHandle.replace("@", "")}`, sans, 8.5, y);

await writeFile(path.join(ROOT, "public/affichette-atelier-caron-a5.pdf"), await pdf.save());
console.log("affichette prête :", url);
