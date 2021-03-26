.PHONY: all tests coverage

setup:
	npm install -g browser-sync && \
	npm install -g http-server && \
	sudo apt-get install build-essential libcairo2-dev \
	libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

install:
	npm install

coverage:
	npm run test

dev:
	npm run dev

build:
	npm run build

push:
	git push && git push --tags

reset:
	git reset --hard
	git clean -xdf

purge:
	rm -rf ./node_modules

http:
	http-server -p 8084 -c-1 dist

browser-sync:
	browser-sync start --proxy "localhost:7890" --files "*" --config "bs-config.js" 

inotifyWatchesLimit:
	sudo sysctl fs.inotify.max_user_watches=524288
	sudo sysctl -p --system
