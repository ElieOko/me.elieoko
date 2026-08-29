# seflme

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

## Sentry observability

The portal reads production metrics with this flow:

```text
Frontend Vue -> Backend Node (/api/sentry/*) -> Sentry API
```

Keep the Sentry auth token only on the backend. Configure these environment variables on the
server or hosting platform:

```sh
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT_SLUG=your-sentry-project-slug
SENTRY_AUTH_TOKEN=your-backend-only-sentry-token
SENTRY_API_BASE_URL=https://sentry.io/api/0
SENTRY_DSN=https://public-key@o0000000000000000.ingest.sentry.io/0000000000000000
PORT=3000
```

For Sentry organizations hosted in the EU region, set:

```sh
SENTRY_API_BASE_URL=https://de.sentry.io/api/0
```

`SENTRY_PROJECT_SLUG` is optional. If it is omitted, the backend exposes every project returned
by the configured Sentry organization.
`SENTRY_DSN` is optional for API reads; it only helps the backend infer the EU API host when
`SENTRY_API_BASE_URL` is omitted. The backend also accepts `SENTRY_DNS` for compatibility with
existing deployments that use that variable name.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

Run the frontend with the backend proxy during development:

```sh
npm run dev:api
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

Serve the production build and the Sentry API backend:

```sh
npm run start
```
