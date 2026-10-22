# bayme.sh DNS Zone

Infrastructure-as-Code for the BayMe.sh DNS zone, managed with [DNSControl](https://dnscontrol.org/).

This repo holds DNS only. The sites it points at live in their own repos and deploy themselves.

## Sites

| Hostname | Repo | Hosting |
|----------|------|---------|
| bayme.sh, www.bayme.sh | [baymesh/baymesh-static-website](https://github.com/baymesh/baymesh-static-website) (Hugo) | Cloudflare Worker `baymesh-website`, built and deployed by Workers Builds on push to `main` |
| flasher.bayme.sh | [baymesh/web-flasher](https://github.com/baymesh/web-flasher) (Nuxt) | Cloudflare Worker `baymesh-flasher`, built and deployed by Workers Builds on push to `main` |
| firmware.bayme.sh | [baymesh/bayme.sh-firmware-pages](https://github.com/baymesh/bayme.sh-firmware-pages) | GitHub Pages |

`bayme.sh`, `www` and `flasher` are Workers custom domains (declared in each repo's `wrangler.jsonc`). Cloudflare creates their proxied `AAAA 100::` placeholder records when the Worker deploys, and `dnsconfig.js` mirrors them so DNSControl doesn't delete them.

The site Worker also proxies Plausible events at `/m/e` so ad blockers don't drop them.

The flasher bundles the newest `firmware-*.json` from `bayme.sh-firmware-pages` at build time (`scripts/cf-build.sh` in `web-flasher`). Re-run its build to pick up a newer manifest.

## Updating DNS

1. Edit `dnsconfig.js`.
2. Push to `main`.
3. Run the **DNS** workflow (`gh workflow run zone-deploy.yaml`), which runs `dnscontrol push`.

Required secrets: `CLOUDFLARE_API_TOKEN` (Zone:DNS:Edit + Zone:Zone:Read on bayme.sh) and optionally `DISCORD_WEBHOOK`.
