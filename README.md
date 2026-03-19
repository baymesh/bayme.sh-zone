# bayme.sh DNS Zone

Infrastructure-as-Code for the BayMe.sh DNS Zone with integrated web flasher for MeshControl fork firmware.

## Domains

- **bayme.sh** - Main domain
- **flasher.bayme.sh** - Web flasher for MeshControl fork firmware

## Web Flasher

The web flasher is built from [baymesh/web-flasher](https://github.com/baymesh/web-flasher) and hosts fork firmware from [baymesh/bayme.sh-firmware](https://github.com/baymesh/bayme.sh-firmware).

### Firmware Features

- **MeshControl (Port 78)**: Remote configuration via signed HMAC packets
- **Relay Node**: Control which nodes rebroadcast messages
- **HOP_MAX=64**: Reduced hop limit

### Architecture

```
bayme.sh-zone/
├── .github/workflows/
│   └── jobs.yaml     # Builds firmware + web flasher
├── dnsconfig.js      # DNS configuration
└── README.md

baymesh/web-flasher/
├── types/resources.ts  # Firmware version config
├── public/data/        # Firmware artifacts
└── ... (Nuxt.js app)

baymesh/bayme.sh-firmware/
├── src/mesh/          # Firmware source
├── protobufs-fork/    # Custom protobufs
└── platformio.ini     # Build config
```

### Workflow

1. Push to `firmware/` or `web-flasher/` triggers builds
2. GitHub Actions builds RAK4631 firmware and web flasher
3. Artifacts published to GitHub Pages

### Manual Trigger

To trigger a build manually:
```bash
gh workflow run jobs.yaml
```

## DNS Records

| Record | Value | Purpose |
|--------|-------|---------|
| A @ | 185.199.108-111.153 | GitHub Pages |
| CNAME flasher | baymesh.github.io | Web flasher |
| CNAME meshyview | meshyview.pages.dev | Mesh viewer |
| A app | 34.111.179.208 | App server |
| A mqtt | 216.218.222.55-57 | MQTT brokers |

## Required Repos

1. **baymesh/bayme.sh-firmware** - Forked Meshtastic firmware
2. **baymesh/web-flasher** - Forked web flasher
3. **baymesh/bayme.sh-zone** - This repo (DNS + CI/CD)

## Setup

### Step 1: Fork Repositories

Fork these repos to your GitHub:
- https://github.com/meshtastic/firmware → baymesh/bayme.sh-firmware
- https://github.com/meshtastic/web-flasher → baymesh/web-flasher

### Step 2: Update Forked Firmware

Copy the modified files from your firmware-Fork to baymesh/bayme.sh-firmware:
- `src/mesh/MeshTypes.h` (HOP_MAX = 64)
- `src/mesh/MeshService.cpp` (relay_node support)
- `src/mesh/NextHopRouter.cpp` (relay_node logic)
- `protobufs-fork/` (custom protobufs)
- Any other modifications

### Step 3: Update Forked Web Flasher

Update `types/resources.ts` with your firmware repo URL:
```typescript
export const forkConfig = {
  enabled: true,
  firmwareRepo: 'https://raw.githubusercontent.com/baymesh/bayme.sh-zone/gh-pages',
  githubRepo: 'https://github.com/baymesh/bayme.sh-firmware',
  // ...
}
```

### Step 4: Configure GitHub Pages

In **baymesh/bayme.sh-zone**:
1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `(root)`

### Step 5: Add Secrets

In **baymesh/bayme.sh-zone** Settings → Secrets:
- `PORKBUN_API_KEY`
- `PORKBUN_SECRET_KEY`
- `DISCORD_WEBHOOK` (optional)

### Step 6: Trigger First Build

```bash
cd baymesh-zone
gh workflow run jobs.yaml
```

## Usage

1. Visit https://flasher.bayme.sh
2. Select your device (RAK4631)
3. Flash the MeshControl fork firmware

## Contributing

### Updating DNS

1. Edit `dnsconfig.js`
2. Commit and push
3. GitHub Actions will automatically update DNS

### Firmware Changes

1. Update firmware repo
2. Workflow auto-builds on push

### Web Flasher Changes

1. Update web-flasher repo
2. Workflow auto-deploys changes

## License

DNS configuration managed with [DNSControl](https://dnscontrol.org/).
