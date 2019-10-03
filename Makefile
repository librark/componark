# Makefile

clean:
	npm ls -gp --depth=0 | awk -F/ '/node_modules/ && !/\/npm$/ {print $NF}' | xargs npm -g rm
	npm cache clean --force
	rm -rf node_modules
	# killall -9 node

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

build:
	make clean
	npm i
	rm -rf ./dist
	npm run build
