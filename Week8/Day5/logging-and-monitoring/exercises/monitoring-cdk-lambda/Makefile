SHELL=bash

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

default: help

up:  ## Stop the slide deck running via docker - handy for cleanup
	@{ \
		echo "Removing old docker-reveal container" ;\
		docker-compose down ;\
		docker-compose build ;\
		docker-compose up ;\
	}
