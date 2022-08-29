rm -rf /.next out
yarn build
firebase use default
firebase deploy -P default
# firebase deploy -P default --only hosting:main
