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
ZIP_FILE="cleanchat_$VERSION.zip"

# Add icons and scripts to the zip file
zip -r "$ZIP_FILE" icon*.png script.js style.css manifest.json

echo "Created $ZIP_FILE with icons and scripts"