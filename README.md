# Dad's Coin Catalog

A large-print photo catalog for a coin collection. It works on an Android phone and on a PC, installs from Chrome, and runs offline. Coins and photos are stored only on the device they were added on; use **Help & backup** to move them between devices.

## Making changes

1. Edit `src/index.html`.
2. Run `sh src/build.sh`. It writes the installable site to `docs/` (adds the page wrapper, offline support, app manifest and icons).
3. Commit and push. GitHub Pages serves the `docs/` folder.
