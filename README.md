# Focus Player

A calming web music player designed for open office environments. Combines focus/study music with ambient sounds and a relaxing background video to help you concentrate.

## Features

- **Main playlist** — choose between Study, Focus, or Relax music tracks
- **Ambient sounds** — layer Nature, Water Flow, or Rain on top
- Independent volume controls for each playlist
- Background video that syncs with audio playback
- Email domain-based login (only approved company domains can access)

## Project Structure

```
├── index.html          # Main player page
├── login.html          # Login page
├── styles.css          # All styles
├── script.js           # Player logic
├── auth.js             # Cookie-based auth check
├── login.js            # Login form logic
├── netlify/functions/
│   └── get-domains.js  # Serverless function — returns allowed email domains
├── audio/
│   ├── study.mp3
│   ├── focus.mp3
│   ├── relax.mp3
│   ├── nature.mp3
│   ├── water.mp3
│   └── rain.mp3
└── relaxing-video.mp4
```

## Deploying to Netlify

1. Push the repo to GitHub
2. Connect the repo in [Netlify](https://netlify.com) and deploy
3. In **Site settings → Environment variables**, add:

   | Key | Value |
   |-----|-------|
   | `ALLOWED_DOMAINS` | Comma-separated list of allowed email domains, e.g. `company.com,partner.com` |

4. Add your audio files to an `audio/` folder and your video as `relaxing-video.mp4` in the root — these are not committed to the repo due to file size

## Local Development

You can preview the UI locally with any static file server, for example:

```bash
npx serve .
```

Note: the login function requires Netlify's serverless environment. To test locally with the login flow, use the [Netlify CLI](https://docs.netlify.com/cli/get-started/):

```bash
npm install -g netlify-cli
netlify dev
```

## Security Note

Access control is enforced by email domain on the client side and is suitable for low-sensitivity internal tools. It is not a substitute for proper authentication if the content is confidential.
