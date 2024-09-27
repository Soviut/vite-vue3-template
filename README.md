# Vite Vue 3 Template

This template includes Vite, Vue 3, Vue Router, Pinya, TypeScript, Prettier,
ESLint and TailwindCSS.

Based on this [series of articles](https://dev.to/imomaliev/series/13845).

## Project setup

Clone project with [`degit`](https://github.com/Rich-Harris/degit)

```
npx degit soviut/vite-vue3-template project-name
npm install
```

## Development

### Install dependencies

```
npm install
```

### Start development server

```
npm run dev
```

### Compile and minify for production

```
npm run build
```

### Preview build

```
npm run preview
```

### Run unit tests

```
npm run test
```

With watching enabled

```
npm run test:watch
```

Generate a test coverage report

```
npm run test:coverage
```

### Lint

```
npm run lint
```

To fix linting errors

```
npm run lint:fix
```

### Check for type errors

```
npm run check
```

### Format with Prettier

```
npm run format
```

## Recommended IDE Setup

[Visual Studio Code](https://code.visualstudio.com/) is the recommended IDE.

When opening the project in VSCode, popups to install the following recommended
extensions should appear. These are defined in the `.vscode/extensions.json`.

- [Vue](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Additionally, key workspace settings are included in the `.vscode/settings.json`
such as "Format on Save".

## Pre-Commit

[Pre-commit](https://pre-commit.com/) is a local development tool that ensures
all linting and code style guidelines pass before committing code to a branch.

It will run every time you commit so be prepared for a commit to take a few
seconds to complete.

## Post-Install Checklist

Once you have installed the template, you should do the following

- [ ] update name in package.json
- [ ] update title in index.html
- [ ] update meta tags in index.html
- [ ] test og meta tags in https://developers.facebook.com/tools/debug/
- [ ] update createHead title in main.ts
- [ ] update title in en.yaml
- [ ] remove commented out sidebar code in App.vue
- [ ] update favicon
- [ ] update project description at top of README
- [ ] remove Project Setup section from README
- [ ] remove this Post-Install Checklist section from README
