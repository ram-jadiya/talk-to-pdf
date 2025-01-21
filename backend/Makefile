# Default variables
ENV ?= development         # Default environment
NAME ?= migration          # Default migration name
SEED_NAME ?= seed          # Default seed name

# Colors for console output
YELLOW := \033[1;33m
GREEN := \033[1;32m
NC := \033[0m # No Color

# Help command to list all available commands
.PHONY: help
help:
	@echo "$(YELLOW)Available commands:$(NC)"
	@echo "$(GREEN)make migrate ENV=development NAME=create_users$(NC)  - Create a new migration"
	@echo "$(GREEN)make migrate-latest ENV=development$(NC)            	- Run all pending migrations"
	@echo "$(GREEN)make migrate-rollback ENV=development$(NC)         	- Rollback last migration"
	@echo "$(GREEN)make migrate-up ENV=development$(NC)         		- Rollback to last migration"
	@echo "$(GREEN)make migrate-down ENV=development$(NC)         		- go to next migration"

	@echo "\nExamples:"
	@echo "  make migrate ENV=development NAME=create_users"
	@echo "  make migrate-latest ENV=staging NAME=add_column"
	@echo "  make migrate-rollback ENV=production NAME=update_schema"

	@echo "\n$(YELLOW)Seed Commands:$(NC)"
	@echo "$(GREEN)make seed-make ENV=development NAME=users$(NC)     	- Create a new seed file"
	@echo "$(GREEN)make seed-run ENV=development$(NC)                	- Run all seed files"
	@echo "$(GREEN)make seed-specific ENV=development NAME=users$(NC) 	- Run specific seed file"

	@echo "\nExamples:"
	@echo "  make seed-make ENV=development NAME=create_users"
	@echo "  make seed-run ENV=production NAME=create_users"
	@echo "  make seed-specific ENV=stage NAME=create_users"

	@echo "\n$(YELLOW)NPM Commands:$(NC)"
	@echo "$(GREEN)make build$(NC)  	- build project"
	@echo "$(GREEN)make dev$(NC)    	- Run development server"
	@echo "$(GREEN)make stage$(NC)  	- Run staging server"
	@echo "$(GREEN)make start$(NC)  	- Run production server"
	@echo "$(GREEN)make lint$(NC)       - Check Eslint command"
	@echo "$(GREEN)make lint-fix$(NC)   - Fix Eslint rules"
	@echo "$(GREEN)make format$(NC)     - Code formate"
	@echo "$(GREEN)make test$(NC)       - Run test-cases"

# Create new migration
.PHONY: migrate
migrate:
	@echo "$(YELLOW)Creating migration for $(ENV) environment...$(NC)"
	NODE_ENV=$(ENV) knex migrate:make $(NAME) -x ts

# Run all pending migrations
.PHONY: migrate-latest
migrate-latest:
	@echo "$(YELLOW)Running migrations for $(ENV) environment...$(NC)"
	NODE_ENV=$(ENV) knex migrate:latest

# Rollback last migration
.PHONY: migrate-rollback
migrate-rollback:
	@echo "$(YELLOW)Rolling back migration in $(ENV) environment...$(NC)"
	NODE_ENV=$(ENV) knex migrate:rollback

# Run specific migration
.PHONY: migrate-up
migrate-up:
	@echo "$(YELLOW)Running up migration in $(ENV) environment...$(NC)"
	NODE_ENV=$(ENV) knex migrate:up

# Rollback specific migration
.PHONY: migrate-down
migrate-down:
	@echo "$(YELLOW)Running down migration in $(ENV) environment...$(NC)"
	NODE_ENV=$(ENV) knex migrate:down

# Make new seed file
.PHONY: seed-make
seed-make:
	@echo "$(YELLOW)Creating seed file for $(ENV) environment...$(NC)"
	NODE_ENV=$(ENV) knex seed:make $(NAME) -x ts

# Run all seed files
.PHONY: seed-run
seed-run:
	@echo "$(YELLOW)Running all seeds for $(ENV) environment...$(NC)"
	NODE_ENV=$(ENV) knex seed:run

# Run specific Seed file
.PHONY: seed-specific
seed-specific:
	@echo "$(YELLOW)Running specific seed file for $(ENV) environment...$(NC)"
	NODE_ENV=$(ENV) knex seed:run --specific=$(NAME).ts

# npm build command
.PHONY: build
build:
	@echo "$(YELLOW)Running building dist...$(NC)"
	npm run build

# Run development server
.PHONY: dev
dev:
	@echo "$(YELLOW)Starting development server...$(NC)"
	npm run dev

# Run staging server
.PHONY: stage
stage:
	@echo "$(YELLOW)Starting staging server...$(NC)"
	npm run stage

# Run production server
.PHONY: start
start:
	@echo "$(YELLOW)Starting production server...$(NC)"
	npm run start

# Check Eslint command
.PHONY: lint
lint:
	@echo "$(YELLOW)Start checking eslint rules...$(NC)"
	npm run lint

# Fix Eslint rules command
.PHONY: lint-fix
lint-fix:
	@echo "$(YELLOW)Start fixing eslint rules...$(NC)"
	npm run lint:fix

# Code formate command
.PHONY: format
format:
	@echo "$(YELLOW)start fixing formatting...$(NC)"
	npm run format

# Run test-cases command
.PHONY: test
test:
	@echo "$(YELLOW)Start test cases...$(NC)"
	npm run test