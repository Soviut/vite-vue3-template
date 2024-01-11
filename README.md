# Vite Vue 3 Template

This template includes Vite, Vue 3, Vue Router, Pinya, TypeScript, Prettier,
ESLint and TailwindCSS.

Based on this [series of articles](https://dev.to/imomaliev/series/13845).

## Project setup

Clone project with [`degit`](https://github.com/Rich-Harris/degit)

```
npx degit soviut/vite-vue3-template project-name
```

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

### Lint

```
npm run lint
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

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](dbaeumer.vscode-eslint)

Additionally, key workspace settings are included in the `.vscode/settings.json`
such as "Format on Save".

## Pre-Commit

[Pre-commit](https://pre-commit.com/) is a local development tool that ensures
all linting and code style guidelines pass before committing code to a branch.

It will run every time you commit so be prepared for a commit to take a few
seconds to complete.

## Post-Install Checklist

Once you have installed the template, you should do the following

[ ] update name in package.json
[ ] update title in index.html
[ ] update createHead title in main.ts
[ ] update title in en.yaml
[ ] remove commented out sidebar code in App.vue
[ ] update meta tags in index.html
[ ] update favicon
[ ] update project description at top of README
[ ] remove Project Setup section from README
[ ] remove this Post-Install Checklist section from README
