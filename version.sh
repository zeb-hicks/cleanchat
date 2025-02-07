#!/bin/bash

# Read the current version from the manifestv3.json file
current_version=$(jq -r '.version' manifestv3.json)
echo "Current version: $current_version"

# Prompt the user for the new version
read -p "New version: " new_version

# Check if the manifestv2.json file exists
if [ ! -f "manifestv2.json" ]; then
  echo "manifestv2.json file not found!"
  exit 1
fi

# Check if the manifestv3.json file exists
if [ ! -f "manifestv3.json" ]; then
  echo "manifestv3.json file not found!"
  exit 1
fi

# Update the version field in the manifestv3.json file
jq --arg new_version "$new_version" '.version = $new_version' manifestv2.json > tmp2.$$.json && mv tmp2.$$.json manifestv2.json
jq --arg new_version "$new_version" '.version = $new_version' manifestv3.json > tmp3.$$.json && mv tmp3.$$.json manifestv3.json

echo "Version updated to $new_version in manifestv2.json and manifestv3.json"