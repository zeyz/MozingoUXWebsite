# Deployment record

Repository: `zeyz/MozingoUXWebsite`.
Custom domain: `mozingoux.com`, with HTTPS enforced and certificate covering `mozingoux.com` and `www.mozingoux.com`.
Source: `main`, repository root. Existing GitHub Pages setup retained; no deployment workflow or domain settings were replaced.

## Previous working version

Before the October 30, 2026 redesign, the latest successful Pages build was **1202610952**, serving commit **`9a066cc1aac5056d936f2c8de72ad89e029a1203`**. The fetched live HTML exactly matched `index.html` at that commit. The original `CNAME` bytes are `mozingoux.com` with no trailing newline; they are preserved exactly.

## Restore if necessary

Inspect the current branch, later commits, and worktree before changing anything. Prefer reverting the redesign commit(s) on `main` with a normal new commit, then push and monitor Pages. Do not force-push or change the custom-domain configuration.

To restore the full previously deployed tree when there are no later changes that need preserving, use `git restore --source=9a066cc1aac5056d936f2c8de72ad89e029a1203 --staged --worktree -- .`, review the diff, commit the restoration, and push `main`. This also removes tracked files absent from the old tree. Confirm the deployment completes and verify https://mozingoux.com/ afterward.

The redesign’s source pages are committed as static output. `npm run build` regenerates them; it is not a new hosting requirement.
