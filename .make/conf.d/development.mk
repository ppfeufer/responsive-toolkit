.PHONY: lint-css
lint-css:
	@echo "Linting CSS files …"
	@npm run lint:css

.PHONY: lint-js
lint-js:
	@echo "Linting JavaScript files …"
	@npm run lint:js

.PHONE: lint
lint: lint-css lint-js

.PHONY: build
build:
	@echo "Building distribution files …"
	@npm run build

help::
	@echo "  $(TEXT_UNDERLINE)Development:$(TEXT_UNDERLINE_END)"
	@echo "    build                     Build distribution files"
	@echo "    lint                      Lint JavaScript files"
	@echo ""
