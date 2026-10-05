#!/bin/sh
# Builds the installable site in $OUT/ from index.html (the same file used for the preview).
set -e
cd "$(dirname "$0")"; OUT=../docs; mkdir -p $OUT
VER=$(sha1sum index.html | cut -c1-10)
{
cat <<'HEAD'
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#1d2c55">
<meta name="description" content="A large-print photo catalog for a coin collection.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="icon-192.png">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
HEAD
cat index.html
printf '\n</body>\n</html>\n'
} > $OUT/index.html
sed "s/__VERSION__/$VER/" sw.template.js > $OUT/sw.js
cp manifest.webmanifest icon-192.png icon-512.png icon-maskable-512.png $OUT/
touch $OUT/.nojekyll
echo "built version $VER"
