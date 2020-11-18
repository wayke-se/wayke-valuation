# Wayke Valuation

This project creates a stand alone javascript bundle with the Wayke Valuation which can be directly referenced from HTML - without manually building the component from source.




## Usage 1: Auto

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
        branches: [{ id: 'bcdd285e-0281-47e0-b016-42ec54302143', name: 'Branch 1'}],
        apiAddress: 'https://test-ext-api.wayketech.se',
        conditionReduction: {
          veryGood: 0.9,
          good: 0.8,
          ok: 0.7,
        },
      })
    </script>

  </body>
</html>

```

## Usage 2: Manual

Provide a custom button in order to start the widget

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
          branches: [{ id: 'bcdd285e-0281-47e0-b016-42ec54302143', name: 'Branch 1'}],
          apiAddress: 'https://test-ext-api.wayketech.se',
          conditionReduction: {
            veryGood: 0.9,
            good: 0.8,
            ok: 0.7,
          },
        })
        app.render();
      }
    </script>

    <input type="button" value="click me" onClick="javascript: openWaykeValuation();" />
  </body>
</html>

```

### Valuation

| Property           | Type               | Required |
|--------------------|--------------------|----------|
| apiAddress         | string             | true     |
| branches           | Branch[]           | true     |
| conditionReduction | ConditionReduction | true     |
| auto               | boolean            | false    |
| logo               | string             | false    |

### Branch
| Property | Type   | Required |
|----------|--------|----------|
| id       | string | true     |
| name     | string | false    |

### ConditionReduction
| Property | Type   | Required |
|----------|--------|----------|
| veryGood | number | true     |
| good     | number | false    |
| ok       | number | false    |

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