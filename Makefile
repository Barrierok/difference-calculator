install:
	npm install

publish:
	npx publish --dry -run

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .

start:
	make build
	make lint
	npm link

test:
	npm test
	
test-coverage:
	npm test -- --coverage