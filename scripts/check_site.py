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

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
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

homepage = References()
homepage.feed((PUBLIC / "index.html").read_text())
project_count = 0
project_dates = {}
project_destinations = {}
for source in (ROOT / "content/projects").glob("*/index.md"):
    metadata = tomllib.loads(source.read_text().split("+++", 2)[1])
    project_count += 1
    route = f"/projects/{source.parent.name}/"
    if not (PUBLIC / route.lstrip("/") / "index.html").is_file():
        errors.append(f"Missing project page: {route}")
    project_dates[route] = metadata["date"]
    project_destinations[route] = metadata.get("primaryURL") or metadata.get("links", [{}])[0].get("url", route)
    check_url(project_destinations[route], str(source.relative_to(ROOT)), route)
    for link in metadata.get("links", []):
        check_url(link["url"], str(source.relative_to(ROOT)), route)
    for category in metadata["categories"]:
        check_url(f"/categories/{category}/", str(source.relative_to(ROOT)), route)

expected_destinations = Counter(project_destinations.values())
actual_destinations = Counter(links[0] for links in homepage.project_cards if links)
if actual_destinations != expected_destinations:
    errors.append("Homepage mosaic must link directly to every project exactly once")

archive = References()
archive.feed((PUBLIC / "projects/index.html").read_text())
archive_projects = [url for url in archive.urls if url in project_dates]
if set(archive_projects) != set(project_dates) or len(archive_projects) != project_count:
    errors.append("All Projects must include every project exactly once")
if [project_dates[url] for url in archive_projects] != sorted(project_dates.values(), reverse=True):
    errors.append("All Projects must be ordered newest first")

legacy_paths = [
    "projects/levoyage/index.html",
    "projects/levoyage/privacy.html",
    "projects/jagerlied/jagerlied-00.pdf",
    "projects/querida_olivia/querida_olivia.pdf",
    "projects/setenta_y_siete/setenta_y_siete.pdf",
    "projects/oam_01/oam_01.pdf",
]
for path in legacy_paths:
    original = ROOT / "static" / path
    output = PUBLIC / path
    if not output.is_file() or output.read_bytes() != original.read_bytes():
        errors.append(f"Legacy content missing or altered: /{path}")

if (PUBLIC / "CNAME").read_text().strip() != "www.hhsaez.com":
    errors.append("Custom domain CNAME is incorrect")

search = json.loads((PUBLIC / "index.json").read_text())
indexed_urls = {item["permalink"] for item in search}
for source in (ROOT / "content/projects").glob("*/index.md"):
    if f"/projects/{source.parent.name}/" not in indexed_urls:
        errors.append(f"Project missing from search: {source.parent.name}")

if errors:
    sys.exit("\n".join(sorted(set(errors))))
print(f"Verified {project_count} projects in homepage mosaic and chronological archive, categories, search, local assets, and 6 legacy URLs.")
