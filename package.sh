#!/bin/bash

# Navigate to the script's directory
cd "$(dirname "$0")"

# Extract the version from manifest.json
VERSION=$(grep -oP '"version":\s*"\K[0-9.]+' manifest.json)

# Check if the version was found
if [ -z "$VERSION" ]; then
  echo "Version not found in manifest.json"
  exit 1
fi

# Create a zip file with the version number
ZIP_FILE="cleanchat_$VERSION"

# Add icons and scripts to the zip file
cp -y manifestv3.json manifest.json
zip -r "$ZIP_FILE.v3.zip" icon*.png script.js style.css manifest.json
cp -y manifestv2.json manifest.json
zip -r "$ZIP_FILE.v2.zip" icon*.png script.js style.css manifest.json
rm manifest.json

echo "Created $ZIP_FILE with icons and scripts"