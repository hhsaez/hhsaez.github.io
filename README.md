# H. Hernan Saez — personal website

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

Each project is a page bundle in `content/projects/<slug>/`, containing `index.md` and a thumbnail named `feature.jpg` or `feature.png`. Descriptions are Markdown; project metadata is TOML front matter:

```toml
+++
title = "Project title"
date = 2020-12-01
releaseMonth = "2020-12"
summary = "A short description for the card and search results."
homeSummary = "A shorter caption for the homepage."
categories = ["comics"]
featureimage = "feature.jpg"

[[links]]
title = "Read PDF (Spanish)"
url = "/projects/example/example.pdf"
+++
```

Add the description after the front matter, then `{{< project-links >}}` to render the links. Categories are `games`, `comics`, `programming`, and `robotics`. Keep `summary` and the description consistent when editing. Optional `homeSummary` gives the homepage a shorter caption; otherwise it uses `summary`.

Homepage cards link directly to the first entry in `links` (the comic PDF, game, or project website). Set an optional top-level `primaryURL` to override that destination. Projects with multiple links also show an About this project link to the detail page. Archive and category cards continue to open the detail pages. Dates and category badges are omitted from homepage cards.

`date` uses the first day of the known release month for sorting; only the month and year are displayed. This does not assert an exact release day. `releaseMonth` records the original precision. The homepage shows up to three newest projects per group: Play (games), Read (comics), and Explore (programming and robotics). Groups with additional projects include a section-specific More link: games and comics open their respective categories, while other projects open All Projects. Edit `params.homepage.projectGroups` in `hugo.toml` to rename or regroup sections and set their `moreLabel` and `moreURL`; include any new project categories there. All Projects is a separate chronological list of every project, newest first, grouped by year.

The bio is in `content/_index.md`. Site settings, menus, and social links are in `hugo.toml`. The homepage uses Blowfish's profile layout, a grouped-projects override in `layouts/partials/recent-articles/main.html`, and simple project cards in `layouts/partials/portfolio/card.html`. Navigation contains Home, All Projects, and Blog. Featured social profiles are configured in `params.author.featuredLinks`; other profiles appear in a secondary row.

## Preserved content

`static/` is copied directly to the site root. It retains the existing image, CSS, JavaScript, font, and PDF URLs. The old JavaScript project/social renderers have been removed; legacy JavaScript remains for Le Voyage.

The Le Voyage microsite and privacy policy remain unchanged at `/projects/levoyage/index.html` and `/projects/levoyage/privacy.html`. Its new portfolio entry is at `/projects/le-voyage/` and links to the original microsite. The microsite retains its original desktop layout and third-party HTTP dependencies; modernizing it is separate work.

Comic PDFs retain their `/projects/.../*.pdf` URLs. Moving comics to `comics.hhsaez.com` or creating additional game websites is deferred. External project URLs are retained from the original portfolio; some historical services or games may no longer be available.

The migration link audit returned HTTP 200 for 22 of the 23 external project links. DogFighter's original App Store link returned HTTP 404; it is retained for now. These are HTTP availability checks, not verification that historical games still run (Revancha Zombie, for example, requires Flash).

Majestic-X's `/ld46/` URL is served by a separate GitHub Pages project and returned HTTP 200 during migration. It is intentionally excluded from local-file checks and must remain independently deployed.

The old homepage's Universal Analytics snippet is not carried forward. No analytics provider is configured.

## Deployment

`.github/workflows/hugo.yml` builds and checks pull requests. Pushes to `master` build, check, and deploy to GitHub Pages; manual runs deploy only when run against `master`. Feature branches cannot deploy.

When the migration is approved and ready to publish:

1. Set the repository's **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.
2. Keep the Pages custom domain set to `www.hhsaez.com`, retain its existing DNS configuration, and verify HTTPS is enabled.
3. Merge the reviewed migration into `master` and inspect the workflow run.

`static/CNAME` preserves the domain in the output, and `baseURL` uses `https://www.hhsaez.com/`. GitHub Pages settings and DNS have not been changed by this migration.

To update the theme, check out an explicit release in `themes/blowfish`, rebuild, verify the site, and include the updated submodule pointer with the reviewed change. Do not edit theme files directly.
