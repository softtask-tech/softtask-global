import sharp from 'sharp';
import { mkdir, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
const source = process.argv[2];
if (!source) throw new Error('Pass the owner-supplied freeimages directory.');
await mkdir('public/images', { recursive: true });
const photos = {
  team: 'this_is_engineering-engineer-4690505_1920.jpg',
  engineering: 'this_is_engineering-engineer-4915802_1920.jpg',
  server: 'dlohner-sever-3100049_1920.jpg',
  chip: 'blickpixel-cpu-564774_1920.jpg',
  software: 'this_is_engineering-engineer-4904884_1920.jpg',
  automation: 'this_is_engineering-engineer-4915804_1920.jpg',
  data: 'geralt-data-2899901_1920.jpg',
  network: 'cookieone-internet-8097838_1920.jpg',
  tubblor: 'our product screenshot/tubblor/Screenshot 2026-09-15 000729.png',
  kytheos: 'our product screenshot/kythoes/Screenshot 2026-09-15 001243.png',
  regulix: 'our product screenshot/regulixone/Screenshot 2026-09-15 001825.png',
};
const sourceFiles = await readdir(source);
for (const [name, prefix] of Object.entries({
  facility: 'SOFTTASK_Wide-angle_symmetrical_view_down_a_long_server_rack__2e4',
  cooling: 'SOFTTASK_Industrial_cooling_units_and_power_distribution_unit_d338',
})) {
  const file = sourceFiles.find((f) => f.startsWith(prefix));
  if (!file) throw new Error(`Missing image: ${prefix}`);
  photos[name] = file;
}
const records = [];
const dimensions = {};
for (const [name, file] of Object.entries(photos)) {
  const metadata = await sharp(path.join(source, file)).metadata();
  dimensions[name] = {
    width: metadata.width,
    height: metadata.height,
    widths: [640, 1280, 1920].map((w) => Math.min(w, metadata.width)),
  };
  for (const width of [640, 1280, 1920]) {
    await sharp(path.join(source, file))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 58 })
      .toFile(`public/images/${name}-${width}.avif`);
    await sharp(path.join(source, file))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(`public/images/${name}-${width}.webp`);
  }
  records.push({
    name,
    original: file,
    generated: file.startsWith('SOFTTASK_'),
    origin: 'Owner-supplied Downloads/freeimages folder',
    use: file.includes('our product screenshot')
      ? 'Owner-supplied public product website screenshot; preserve its illustrative context'
      : file.startsWith('SOFTTASK_')
        ? 'AI-generated infrastructure illustration; not a Soft Task facility'
        : 'Illustrative technology imagery; not evidence of Soft Task people, projects or facilities',
    rights:
      'Owner collected; original licence/source URL confirmation outstanding before public launch',
    processing: 'Responsive width variants; no generative alteration',
  });
}
await sharp(path.join(source, photos.team))
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 82 })
  .toFile('public/images/social.jpg');
await writeFile('planning/image-register.json', JSON.stringify(records, null, 2));
await writeFile('src/data/image-dimensions.json', JSON.stringify(dimensions, null, 2));
console.log(`Prepared ${records.length} images and responsive variants.`);
