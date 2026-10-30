# MozingoUX

Independent small-business web design in Eastern North Carolina. Live website: https://mozingoux.com/

## Stack and deployment

Plain HTML, CSS, and a small JavaScript enhancement for mobile navigation and portfolio filters. No runtime packages, embedded websites, third-party font requests, or framework router. GitHub Pages continues to publish the committed root of `main` using the repository’s existing deployment setup. **Preserve `CNAME` (`mozingoux.com`) and HTTPS settings.** `.nojekyll` ensures the generated static files are served directly.

## Update the website

```sh
npm run build
npm run check
npm run preview
```

No dependency installation is needed. Preview at http://localhost:8002/.

- `scripts/build.mjs` contains shared page templates and the homepage/About copy.
- `data/projects.json` is the single source of truth for portfolio names, descriptions, categories, screenshot paths, demo URLs, and homepage selections. Set `url` to `null` for an unavailable website; the build renders a non-clickable availability label.
- `assets/site.css` contains the design and responsive styles.
- `assets/site.js` progressively enhances navigation and filtering; content, links, and the contact form work without it.
- Run the build after editing the project data or templates, then commit the generated HTML, sitemap, and source together.

## Pages

`/`, `/work/`, `/about/`, `/thanks/`, and a custom `404.html`. Work and About are real directories with `index.html`, so direct visits and refreshes work on GitHub Pages. Navigation uses canonical trailing-slash URLs. The old homepage `#about` link redirects to the standalone About page.

## Portfolio and imagery

Central Heating & Air Conditioning is listed first and uses a fresh browser screenshot of https://central-hac.com/. JKM Drafting & Design was found in the existing repository’s portfolio history; its domain did not resolve during the redesign, so its original screenshot is retained as archived work without a broken link. The ten business concepts, two passion projects, and personal arcade use verified published demo URLs and local screenshot assets. They are quietly identified by project type. Concept and interactive examples do not define the scope of the $500 starting price.

Project images are optimized WebP previews, not live embeds. The About portrait is Austin’s supplied image, cropped slightly to 4:5 and resized to 320px and 560px WebP variants with a JPEG fallback. No generative retouching, color treatment, or substitute portrait was used. The original download is unchanged.

## Contact

Direct email links target `mozingoux@gmail.com`. The existing native POST form and FormSubmit recipient, subject, template, and captcha configuration are preserved. An optional form remains under the direct email contact; a honeypot reduces simple automated spam, and successful provider submissions return to `/thanks/`.

Native required/email validation and form configuration were checked without sending a real inquiry. End-to-end inbox delivery and the provider’s recipient-activation state cannot be verified without a real submission or inbox access. The direct email link remains available independently of the form provider.

## Previous deployment / rollback

The previous deployed commit was **`9a066cc1aac5056d936f2c8de72ad89e029a1203`**, confirmed by GitHub Pages build 1202610952 and an exact match between the live HTML and that source. See `DEPLOYMENT.md` for restoration guidance.

## Verification

See [QA.md](QA.md) for responsive, keyboard, contrast, portfolio, contact, and image checks.
