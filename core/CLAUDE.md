# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EcoBoost Core is a TypeScript-based Node.js service framework that provides:
- **Decorator-based service definition** using `@Package` and `@Service` decorators
- **Dependency injection system** via the DI module with providers and injectors
- **Koa.js integration** for HTTP routing and middleware support
- **Reflection-based configuration** for service metadata and routing

## Development Commands

### Build and Development
- `npm start` - Start TypeScript compiler in watch mode (development)
- `npm run build` - Build production bundle using Webpack
- `npm run devserver` - Start Webpack dev server
- `npx tsc --noEmit --skipLibCheck` - Type checking without emitting files

### Package Management
- Uses `pnpm` for dependency management (pnpm-lock.yaml present)
- `npm run deploy` - Publish to npm registry with public access

## Architecture

### Core Modules
1. **Core (`src/core/`)** - Main API class and utilities for package loading
2. **Reflection (`src/reflection/`)** - Decorators, metadata, and service configuration
3. **DI (`src/di/`)** - Dependency injection with providers and injectors

### Key Components
- **API Class** (`src/core/api.ts`) - Central router that loads packages and services from directories
- **Package Decorator** - Marks classes as service packages with optional middleware and path configuration
- **Service Decorator** - Marks static functions as HTTP endpoints with routing configuration
- **Injector System** - Hierarchical dependency injection with parent-child relationships

### Special Webpack Configuration
- Uses custom webpack config with dual TypeScript parsing:
  - `src/noparse/` directory bypasses CommonJS module resolution
  - Other directories use standard CommonJS parsing
- Builds to `dist/ecoboost.js` for production
- Externally resolves all node_modules to reduce bundle size

### TypeScript Configuration
- **Base config** (`tsconfig.base.json`) - Strict mode, decorators enabled, ES2015 target
- **Development** (`tsconfig.dev.json`) - Extends base, no declaration files
- **Production** (`tsconfig.json`) - Extends base, generates declaration files
- Uses `reflect-metadata` for decorator metadata support

## Development Workflow

1. **Service Development**: Create classes with `@Package()` decorator and static methods with `@Service()` decorator
2. **Package Loading**: Use `API.load(dirPath)` to scan and register all services in a directory
3. **Dependency Injection**: Configure providers at package or root level for service dependencies
4. **Routing**: Services automatically register HTTP routes based on decorator configuration

## Important Notes

- Entry point is `src/main.ts` which exports all core modules
- Uses Koa.js middleware system throughout
- Reflection metadata is essential for decorator functionality
- Package and service discovery is file-system based via directory scanning