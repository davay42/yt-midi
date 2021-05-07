cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:davay42/yt-midi.git master:gh-pages

cd -