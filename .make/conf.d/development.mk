.PHONY: lint
lint:
	@echo "Linting JavaScript files …"
	@npm run lint

.PHONY: minify
minify:
	@echo "Minifying JavaScript files …"
	@npm run minify

.PHONY: build
build:
	@echo "Building JavaScript files …"
	@npm run build

help::
	@echo "  $(TEXT_UNDERLINE)Development:$(TEXT_UNDERLINE_END)"
	@echo "    build                     Build JavaScript files"
	@echo "    lint                      Lint JavaScript files"
	@echo "    minify                    Minify JavaScript files"
	@echo ""
