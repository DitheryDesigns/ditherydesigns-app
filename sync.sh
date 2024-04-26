#!/bin/bash

# Authenticate with the new GitHub account and refresh with required scope
## gh auth login
## gh auth refresh -h github.com -s delete_repo

# Loop through each folder in the portfolio directory
for dir in */; do
    # Trim trailing slash from directory name
    dir=${dir%/}

    # Check if the directory is already a git repository
    if [ -d "$dir/.git" ]; then
        # Remove the existing remote origin to disassociate from any previous repository
        git -C "$dir" remote remove origin
        # Remove the GitHub repository if it exists
        gh repo delete "$dir" --yes
        # Re-initialize a git repository in the directory
        rm -rf "$dir/.git"
        git -C "$dir" init
    else
        # Initialize a git repository in the directory
        git -C "$dir" init
    fi

    # Add all files to the repository
    git -C "$dir" add .

    # Commit the changes
    git -C "$dir" commit -m "Initial commit"

    # Create a repository on GitHub using the gh CLI tool
    gh repo create "$dir" --public --confirm

    # Set the remote URL to point to the new GitHub repository
    new_username="ditherydesigns"
    git -C "$dir" remote add origin "https://github.com/$new_username/$dir.git"

    # Push the local repository to GitHub master branch
    git -C "$dir" push origin master

done
