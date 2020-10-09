# Makefile

update:
	git pull --all
	git reset --hard

build:
	rm -rf ./dist
	npm run build

# ------------------------------------------------------------------------------

install:
	npm install -g browser-sync
	npm install -g http-server
	npm i

clean-git:
	git reset --hard
	git clean -xdf

npm-clean:
	npm ls -gp --depth=0 | awk -F/ '/node_modules/ && !/\/npm$/ {print $NF}' | xargs npm -g rm
	npm cache clean --force
	rm -rf node_modules
	# killall -9 node

npm-update:
	npm i -g npm
	npm i -g npm-check-updates
	ncu -u --timeout 600000 --target minor
	npm i
	npm audit fix

pull:
	make clean
	make clean-git
	git pull --all
	make build

http:
	http-server -p 8080 -c-1 dist

browser-sync:
	browser-sync start --proxy "localhost:7890" --files "*" --https
