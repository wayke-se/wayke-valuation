# Wayke Valuation

This project creates a stand alone javascript bundle with the Wayke Valuation which can be directly referenced from HTML - without manually building the component from source.

## Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
  </head>
  <body>
    <script src="https://test-cdn.wayketech.se/public-assets/wayke.valuation.v0.0.1.js"></script>
    <script>
      function openWaykeValuation() {
        const app = new Wayke.Valuation({
          branchId: 'bcdd285e-0281-47e0-b016-42ec54302143',
          valuationAddress: 'https://test-ext-api.wayketech.se',
          conditionReduction: {
            VeryGood: 0.9,
            Good: 0.8,
            Ok: 0.7,
          },
        })
        app.render();
      }
    </script>

    <input type="button" value="click me" onClick="javascript: openWaykeValuation();" />
  </body>
</html>

```

## Auto

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
  </head>
  <body>
    <script src="https://test-cdn.wayketech.se/public-assets/wayke.valuation.v0.0.1.js"></script>
    <script>
      new Wayke.Valuation({
        auto,
        branchId: 'bcdd285e-0281-47e0-b016-42ec54302143',
        valuationAddress: 'https://test-ext-api.wayketech.se',
        conditionReduction: {
          VeryGood: 0.9,
          Good: 0.8,
          Ok: 0.7,
        },
      })
    </script>

  </body>
</html>

```

## Prerequisite
```bash
npm install
```

## Develop

Starts a local dev-server running at http://localhost:5000/ with watch

```bash
npm start
```

## Build Production

Builds production to `./build`

```bash
npm run build
```