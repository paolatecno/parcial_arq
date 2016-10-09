#!/bin/bash -e
#
#Auth0 Pay With a Tweet release script

# Export RELEASE env var
export RELEASE=1

# Verifies that is running from the right directory
if ! [ -e tools/release.sh ]; then
  echo >&2 "Please run tools/release.sh from the repo root"
  exit 1
fi

# Func to update or create json fields
update_json() {
  echo "$(node -p "p=require('./${1}');p['${2}']='${3}';JSON.stringify(p,null,2)")" > $1
  echo "Updated ${1} ${2} to ${3}"
}

# Func to delete json fields
delete_json() {
  echo "$(node -p "p=require('./${1}');delete p['${2}'];JSON.stringify(p,null,2)")" > $1
  echo "Deleted ${2} from ${1}"
}

# Func to validate semver
validate_semver() {
  if ! [[ $1 =~ ^[0-9]\.[0-9]+\.[0-9](-.+)? ]]; then
    echo >&2 "Version $1 is not valid! It must be a valid semver string like 1.0.2 or 2.3.0-beta.1"
    exit 1
  fi
}

# Save last commit name
LAST_COMMIT=$(git log -1 --pretty=%B)


# Bump package.json version
## Get actual version
CURRENT_VERSION=$(node -p "require('./package').version")

## Ask for the new version
printf "Next version (current is $CURRENT_VERSION)? "
read NEXT_VERSION

if [ "$NEXT_VERSION" == "$CURRENT_VERSION" ]; then
  echo "There is already a version $NEXT_VERSION. Skipping release"
  exit 1
else
  echo "Deploying $NEXT_VERSION package.json version"

  ## Validate it
  validate_semver $NEXT_VERSION

  ## Update package.json with the new version
  update_json 'package.json' 'version' $NEXT_VERSION

  ## Commit and push version change
  git add package.json
  git commit -m "Version $NEXT_VERSION"
  git push origin master
fi


# Add changelog entry
CHANGELOG_ENTRY="## $NEXT_VERSION ("
CHANGELOG_EXISTS=$(cat CHANGELOG.md | grep "$CHANGELOG_ENTRY")

if [ ! -z "$CHANGELOG_EXISTS" ]; then
  echo "There is already a changelog entry $CHANGELOG_EXISTS in CHANGELOG.md. Skiping changelog entry publish."
else
  echo "Deploying $NEXT_VERSION changelog entry to CHANGELOG.md"

  ## Update CHANGELOG.md
  $(npm bin)/conventional-changelog -i CHANGELOG.md -s

  ## Commit and push version change
  git add CHANGELOG.md
  git commit -m "Add $NEXT_VERSION to changelog"
  git push origin master
fi


# Create and push normal git tag
NEXT_TAG_NAME="v$NEXT_VERSION"
NEXT_TAG_NAME_EXISTS=$(git tag -l "$NEXT_TAG_NAME")

if [ ! -z "$NEXT_TAG_NAME_EXISTS" ]; then
  echo "There is already a tag $NEXT_TAG_NAME_EXISTS in git. Skiping git deploy."
else
  echo "Deploying $NEXT_TAG_NAME git tag"

  ## Name of the transitory branch for the npm package
  TEMP_TAG_BRANCH="lib"

  ## Change to the transitory branch
  git branch -D "$TEMP_TAG_BRANCH"
  git checkout -b "$TEMP_TAG_BRANCH"

  ## Build university as a node module
  PWT_BASE_URI=/e-books npm run build -- --release
  cp -r build lib

  ## Add `main: 'lib/index.js'` to the package.json
  update_json 'package.json' 'main' 'lib/index.js'

  ## Add extra files to `files` on package.json
  echo "$(node -p "p=require('./package.json');p['files']=['lib'];JSON.stringify(p,null,2)")" > package.json

  ## Add changes to stage and commit
  git add lib/ package.json && git commit -m "Build $NEXT_TAG_NAME"

  ## Create git tag and push it
  git tag $NEXT_TAG_NAME -m "Last commit: $LAST_COMMIT"
  git tag latest -m "Last commit: $LAST_COMMIT" -f
  git push origin $NEXT_TAG_NAME
  git push origin latest -f

  ## Change to branch master and remove temp branch
  git checkout master
  git branch -D "$TEMP_TAG_BRANCH"
fi

echo "Release: SUCCESS!"
