Standalone UI for Guardian comments

# Install

- clone the repository
- `npm install`


# Usage

## Standalone

`npm start`

Starts a local server on port 4000 (change this with `export PORT=4001`).

`http://localhost:4000/`

The page served is `example/index.html`. You can change the framework by configuring the included script file:

```html
<script src="example.js?framework=react&production=false" defer async></script>
```

* `framework` can be either `react` or `preact`
* `production` turns minification on or off. If `production=true` the files are not minified and the development version of the chosen framework is served

## As a module

To include Discussion Frontend in your application, install directly from Github by adding the URL to your package.json.

## Frontend

`npm start`

The local server can be used by your local instance of [guardian frontend](https://github.com/guardian/frontend) by updating your `frontend.conf`.

```
devOverrides {
    discussion.frontend.assetsMap="http://localhost:4000/assets-{VERSION}.json"
}
```

This serves the production version of discussion assets.

You can target the development version changing the path to `assets-v1.0.0.dev.json`


# Versioning

The assets map is versioned because the contract with frontend might change with time. Discussion frontend can only be deployed independently as long as this contract doesn't change.

If an update in this project requires a change in frontend, release a new version of discussion frontend (updating `package.json`), deploy it and then update frontend to use the new asset map.

Being versioned you can have multiple `assets.json` without having to synchronize your deploys with your users.
