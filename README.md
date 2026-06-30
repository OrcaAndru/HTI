# The Hometown Invitational Website

Static website draft for The Hometown Invitational, September 17–20, 2026 in Indianapolis, Indiana.

## Files

- `index.html` — page structure and content
- `styles.css` — visual design
- `script.js` — countdown, day tabs, and schedule filters
- `hometown-invitational.ics` — calendar file for the full weekend

## How to update content

Most public-facing copy is in `index.html`.

The day-by-day itinerary is in `script.js` inside the `dayDetails` object. Update times, locations, titles, and descriptions there as tee times and dinners are confirmed.

## How to publish on GitHub Pages

1. Create a new GitHub repository, for example `hometown-invitational-2026`.
2. Upload these files to the root of the repository.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/root`, then save.
6. GitHub will publish the site at a URL like `https://YOUR-USERNAME.github.io/hometown-invitational-2026/`.

## Notes

- Replace placeholder dinner locations once reservations are locked.
- Add exact tee times once confirmed.
- Add your final HTI logo by replacing the CSS brand mark in `index.html` with an image.
