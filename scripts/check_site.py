#!/usr/bin/env python3
"""Check a Hugo build using only the Python standard library."""

import json
import re
import sys
import tomllib
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / "public"
ORIGIN = "https://www.hhsaez.com"
# A separate GitHub Pages project serves this route on the same domain.
# Verified against production; it is not part of this repository's output.
EXTERNAL_PROJECT_PATHS = {"/ld46/"}
errors = []


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []
        self.project_cards = []
        self.current_project_links = None
        self.language = None
        self.language_links = set()
        self.image_count = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.language = attrs.get("lang")
        if tag == "img":
            self.image_count += 1
        if tag == "a" and attrs.get("hreflang"):
            self.language_links.add((attrs["hreflang"], attrs.get("href")))
        if tag == "article" and "portfolio-project" in attrs.get("class", "").split():
            self.current_project_links = []
        if tag == "a" and self.current_project_links is not None:
            self.current_project_links.append(attrs.get("href", ""))
        for key in ("href", "src", "poster"):
            if attrs.get(key):
                self.urls.append(attrs[key])
        if attrs.get("srcset"):
            self.urls.extend(item.strip().split()[0] for item in attrs["srcset"].split(",") if item.strip())

    def handle_endtag(self, tag):
        if tag == "article" and self.current_project_links is not None:
            self.project_cards.append(self.current_project_links)
            self.current_project_links = None


def check_url(url, source, page_url):
    if not url or url.startswith(("#", "data:", "mailto:", "tel:", "javascript:")):
        return
    resolved = urlsplit(urljoin(ORIGIN + page_url, url))
    if resolved.netloc != urlsplit(ORIGIN).netloc:
        return
    if urlsplit(url).netloc and resolved.path in EXTERNAL_PROJECT_PATHS:
        return
    path = unquote(resolved.path).lstrip("/")
    destination = PUBLIC / path
    if not destination.is_file() and not (destination / "index.html").is_file():
        errors.append(f"{source}: missing local target {url}")


if not (PUBLIC / "index.html").is_file():
    sys.exit("No Hugo build found. Run hugo --gc --minify --panicOnWarning first.")

for page in PUBLIC.rglob("*.html"):
    parser = References()
    parser.feed(page.read_text())
    relative = page.relative_to(PUBLIC).as_posix()
    for url in parser.urls:
        check_url(url, relative, "/" + relative)

for css in PUBLIC.rglob("*.css"):
    # Ignore comments, including sourcemap references.
    text = re.sub(r"/\*.*?\*/", "", css.read_text(), flags=re.S)
    relative = css.relative_to(PUBLIC).as_posix()
    for url in re.findall(r"url\(\s*['\"]?([^)'\"\s]+)", text):
        check_url(url, relative, "/" + relative)

LANGUAGES = {"en": "", "es": "/es"}


def read_page(route):
    path = PUBLIC / route.lstrip("/") / "index.html"
    if not path.is_file():
        errors.append(f"Missing page: {route}")
        return References()
    parsed = References()
    parsed.feed(path.read_text())
    return parsed


# Each translated content page must have a reciprocal switcher, not just a
# link to the other language's homepage.
for english in (ROOT / "content").rglob("*.en.md"):
    spanish = english.with_name(english.name.replace(".en.md", ".es.md"))
    if not spanish.is_file():
        errors.append(f"Missing Spanish translation: {spanish.relative_to(ROOT)}")
    parent = english.relative_to(ROOT / "content").parent.as_posix()
    route = "/" if parent == "." else f"/{parent}/"
    counterparts = {(language, prefix + route) for language, prefix in LANGUAGES.items()}
    for language, prefix in LANGUAGES.items():
        page = read_page(prefix + route)
        if page.language != language:
            errors.append(f"Incorrect HTML language: {prefix + route}")
        if not counterparts.issubset(page.language_links):
            errors.append(f"Missing equivalent-page language switch: {prefix + route}")

project_count = 0
mosaic_order = None
for language, prefix in LANGUAGES.items():
    homepage = read_page(prefix + "/")
    project_dates = {}
    project_destinations = {}
    for source in (ROOT / "content/projects").glob(f"*/index.{language}.md"):
        metadata = tomllib.loads(source.read_text().split("+++", 2)[1])
        route = f"{prefix}/projects/{source.parent.name}/"
        project_dates[route] = metadata["date"]
        destination = metadata.get("primaryURL") or metadata.get("links", [{}])[0].get("url", route)
        project_destinations[route] = destination
        check_url(destination, str(source.relative_to(ROOT)), route)
        for link in metadata.get("links", []):
            check_url(link["url"], str(source.relative_to(ROOT)), route)
        for category in metadata["categories"]:
            check_url(f"{prefix}/categories/{category}/", str(source.relative_to(ROOT)), route)
        if language == "es":
            original = tomllib.loads(source.with_name("index.en.md").read_text().split("+++", 2)[1])
            for key in ("date", "releaseMonth", "categories", "featureimage", "mosaicLarge"):
                if metadata.get(key) != original.get(key):
                    errors.append(f"Shared metadata differs for {key}: {source.parent.name}")
            if [link["url"] for link in metadata["links"]] != [link["url"] for link in original["links"]]:
                errors.append(f"Project destinations differ across languages: {source.parent.name}")

    if language == "en":
        project_count = len(project_dates)
    elif len(project_dates) != project_count:
        errors.append("English and Spanish project counts differ")
    if project_count == 0:
        errors.append("No project content found")
    destinations = [links[0] for links in homepage.project_cards if links]
    if Counter(destinations) != Counter(project_destinations.values()):
        errors.append(f"{language}: Homepage mosaic must link to every project exactly once")
    if homepage.image_count != len(project_dates) + 1:
        errors.append(f"{language}: Missing profile or mosaic images")
    if mosaic_order is None:
        mosaic_order = destinations
    elif destinations != mosaic_order:
        errors.append("Mosaic order differs across languages")

    archive = read_page(prefix + "/projects/")
    archive_projects = [url for url in archive.urls if url in project_dates]
    if set(archive_projects) != set(project_dates) or len(archive_projects) != len(project_dates):
        errors.append(f"{language}: All Projects must include every project exactly once")
    if [project_dates[url] for url in archive_projects] != sorted(project_dates.values(), reverse=True):
        errors.append(f"{language}: All Projects must be ordered newest first")

    search = json.loads((PUBLIC / prefix.lstrip("/") / "index.json").read_text())
    indexed_urls = {item["permalink"] for item in search}
    for route in project_dates:
        if route not in indexed_urls:
            errors.append(f"Project missing from {language} search: {route}")

legacy_paths = [
    "projects/levoyage/index.html",
    "projects/levoyage/privacy.html",
]
for path in legacy_paths:
    original = ROOT / "static" / path
    output = PUBLIC / path
    if not output.is_file() or output.read_bytes() != original.read_bytes():
        errors.append(f"Legacy content missing or altered: /{path}")

if (PUBLIC / "CNAME").read_text().strip() != "www.hhsaez.com":
    errors.append("Custom domain CNAME is incorrect")

removed_comic_pdfs = [
    "projects/jagerlied/jagerlied-00.pdf",
    "projects/querida_olivia/querida_olivia.pdf",
    "projects/setenta_y_siete/setenta_y_siete.pdf",
    "projects/oam_01/oam_01.pdf",
]
for path in removed_comic_pdfs:
    if (ROOT / "static" / path).exists() or (PUBLIC / path).exists():
        errors.append(f"Removed comic PDF still present: {path}")

if errors:
    sys.exit("\n".join(sorted(set(errors))))
print(f"Verified {project_count} projects in both languages, mosaics, archives, search, reciprocal switchers, local assets, and 2 legacy URLs.")
