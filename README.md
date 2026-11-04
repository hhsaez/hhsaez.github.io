# H. Hernán Saez — personal website

A Hugo site using [Blowfish](https://blowfish.page/). The theme is a Git submodule pinned to **v3.9.0** (`ebe683e9c2668972b71bc011e61e0004ff8e7689`). Hugo Extended **0.165.0** is pinned in `.hugo-version` for CI.

## Local development

Install the pinned Hugo Extended release and Python 3.11 or newer, then run:

```sh
git submodule update --init --recursive
hugo server
```

Open <http://localhost:1313>. To build and check the production output:

```sh
hugo --gc --minify --panicOnWarning
python3 scripts/check_site.py
```

The generated `public/` directory, Hugo build lock, and generated image cache are ignored by Git.

## Editing projects

Each project is a page bundle in `content/projects/<slug>/`, containing `index.en.md`, `index.es.md`, and a shared thumbnail named `feature.jpg` or `feature.png`. Descriptions are Markdown; project metadata is TOML front matter:

```toml
+++
title = "Project title"
date = 2020-12-01
releaseMonth = "2020-12"
summary = "A short description for the card and search results."
categories = ["comics"]
featureimage = "feature.jpg"

[[links]]
title = "Read"
url = "https://comics.hhsaez.com/#/reader/example/1"
+++
```

Add the description after the front matter, then `{{< project-links >}}` to render the links. Categories are `games`, `comics`, `programming`, and `robotics`. Keep `summary` and the description consistent when editing.

Homepage images link directly to the first entry in `links` (the comics reader, game, or project website). Set an optional top-level `primaryURL` to override that destination. The homepage presents all projects in one image-only mosaic, with accessible project labels and title tooltips. Set `mosaicLarge = true` to give a project a larger tile; Jägerlied: Sombras Sobre Nhil, Crimild, and Le Voyage use this setting. The large images appear at varied positions among games, comics, and experiments. The final four small tiles form two balanced rows on desktop; the final tile fills the last phone row. Archive and category cards continue to open the detail pages and retain their titles and metadata.

`date` uses the first day of the known release month for sorting; only the month and year are displayed. This does not assert an exact release day. `releaseMonth` records the original precision. Every project appears on the homepage, without category sections or More links. `params.homepage.mosaicOrder` in `hugo.toml` sets a deliberately mixed, stable order using project slugs. Projects not listed there are appended newest first, so new work is never omitted. CSS fills gaps between differently sized tiles. Projects is a separate chronological list of every project, newest first, grouped by year.

The bios are in `content/_index.en.md` and `content/_index.es.md`. Site settings, menus, and social links are in `hugo.toml`. The homepage uses Blowfish's profile layout, a mosaic override in `layouts/partials/recent-articles/main.html`, and image tiles in `layouts/partials/portfolio/card.html`. Navigation contains Home, Projects, and Blog (Inicio, Proyectos, and Blog in Spanish). Featured social profiles are configured in `params.author.featuredLinks`; other profiles appear in a secondary row.

## English and Spanish

English remains at `/`, and Spanish is under `/es/`. Project slugs and category identifiers stay the same in both languages; display names, descriptions, link labels, navigation, dates, search, and accessibility labels are localized. Proper project names and the tagline "Fly me to the Moon" remain unchanged.

Keep matching `.en.md` and `.es.md` filenames together so Hugo connects equivalent pages. Translate prose, summaries, and link labels in both files. Keep dates, release months, category identifiers, image filenames, mosaic sizes, and project destinations consistent. Images are shared between translations. Both languages link to the same comics reader destinations. The Le Voyage microsite remains at its original URLs and is not translated.

The header's 🇬🇧 / 🇪🇸 switcher links equivalent pages, indicates the current language, and retains English / Español tooltips and screen-reader labels. It uses `layouts/partials/header/components/translations.html`; language flags are configured in `hugo.toml`. Untranslated system pages fall back to the language homepages. There is no automatic language redirection. Custom interface translations live in `i18n/en.toml` and `i18n/es.toml`; Blowfish supplies its own English and Spanish interface strings.

The site check verifies translation pairs, reciprocal switcher links, HTML language attributes, complete mosaics with the same order and images, archives, and search indexes in both languages.

`assets/js/appearance-labels.js` keeps the theme toggle's dynamic labels localized. It is built at a separate URL per language through `layouts/partials/extend-head-uncached.html`, avoiding Blowfish's shared appearance-script cache.

## Preserved content

`static/` is copied directly to the site root. It retains the existing image, CSS, JavaScript, and font URLs. The old JavaScript project/social renderers have been removed; legacy JavaScript remains for Le Voyage.

The Le Voyage microsite and privacy policy remain unchanged at `/projects/levoyage/index.html` and `/projects/levoyage/privacy.html`. Its new portfolio entry is at `/projects/le-voyage/` and links to the original microsite. The microsite retains its original desktop layout and third-party HTTP dependencies; modernizing it is separate work.

The four comics open directly in `comics.hhsaez.com`: Jägerlied: Sombras Sobre Nhil uses `#/reader/jagerlied-shadows/1`, Querida Olivia uses `#/reader/querida_olivia/1`, Setenta y Siete uses `#/reader/setenta_y_siete/1`, and Offices and Managers uses `#/reader/offices_and_managers/1`. Project links are labeled Read / Leer. Local comic PDFs have been removed, and their former download URLs are no longer served. Build into a fresh directory or use `hugo --cleanDestinationDir` when reusing an existing output directory to remove stale PDF copies. Creating additional game websites is deferred. Other external project URLs are retained from the original portfolio; some historical services or games may no longer be available.

The migration link audit returned HTTP 200 for 22 of the 23 external project links. DogFighter's original App Store link returned HTTP 404; it is retained for now. These are HTTP availability checks, not verification that historical games still run (Revancha Zombie, for example, requires Flash).

Majestic-X's homepage tile and Play / ¡Jugar! link open `https://hhsaez.itch.io/majestic-x`.

The old homepage's Universal Analytics snippet is not carried forward. No analytics provider is configured.

## Deployment

`.github/workflows/hugo.yml` builds and checks pull requests. Pushes to `master` build, check, and deploy to GitHub Pages; manual runs deploy only when run against `master`. Feature branches cannot deploy.

When the migration is approved and ready to publish:

1. Set the repository's **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.
2. Keep the Pages custom domain set to `www.hhsaez.com`, retain its existing DNS configuration, and verify HTTPS is enabled.
3. Merge the reviewed migration into `master` and inspect the workflow run.

`static/CNAME` preserves the domain in the output, and `baseURL` uses `https://www.hhsaez.com/`. GitHub Pages settings and DNS have not been changed by this migration.

To update the theme, check out an explicit release in `themes/blowfish`, rebuild, verify the site, and include the updated submodule pointer with the reviewed change. Do not edit theme files directly.
