#!/bin/bash

# Your GitHub username
USERNAME="CodingExplored"

# Temporary file to store repository names
REPO_LIST_FILE="repo_list.txt"

# Get list of repository names
curl -s "https://api.github.com/users/$USERNAME/repos" | grep -o '"full_name": "[^"]*' | cut -d'"' -f4 > $REPO_LIST_FILE

# Loop through the repositories and clone them
while IFS= read -r repo; do
    gh repo clone "$repo"
done < $REPO_LIST_FILE

# Remove temporary file
rm $REPO_LIST_FILE
