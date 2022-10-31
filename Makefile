.PHONY: all tests coverage

setup:
	npm install -g browser-sync && \
	npm install -g http-server && \
	sudo apt-get install build-essential libcairo2-dev \
	libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

install:
	npm install

test:
	npm run test

dev:
	npm run dev

prod:
	npm run prod

push:
	git push && git push --tags

deploy:
	sshpass -e rsync -av --delete ./dist/ \
		${RSYNC_USER}@${RSYNC_HOST}:${RSYNC_DIR}

reset:
	git reset --hard
	git clean -xdf

purge:
	rm -rf ./node_modules

http:
	http-server -p 8084 -c-1 dist

updates:
	npx npm-check-updates

browser-sync:
	browser-sync start --proxy "localhost:8084" --files "*" --https

inotifyWatchesLimit:
	sudo sysctl fs.inotify.max_user_watches=524288
	sudo sysctl -p --system
