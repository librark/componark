# Makefile

build:
	make install
	rm -rf ./dist
	npm run build

# ------------------------------------------------------------------------------

clean:
	npm ls -gp --depth=0 | awk -F/ '/node_modules/ && !/\/npm$/ {print $NF}' | xargs npm -g rm
	npm cache clean --force
	rm -rf node_modules
	# killall -9 node

install:
	make clean
	npm install -g browser-sync
	npm install -g http-server
	npm i

clean-git:
	git reset --hard
	git clean -xdf

update:
	make clean

	npm install -g npm
	npm install -g npm-check-updates
	ncu -u
	npm i

pull:
	make clean
	make clean-git
	git pull --all
	make build

http:
	http-server -p 8080 -c-1 dist

browser-sync:
	browser-sync start --proxy "localhost:7890" --files "*" --https
