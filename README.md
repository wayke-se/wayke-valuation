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
    <script src="https://cdn.wayke.se/public-assets/wayke.valuation.v1.0.0.js"></script>
    <!--
        A development version is available here:
        <script src="https://test-cdn.wayketech.se/public-assets/wayke.valuation.v1.0.0.js"></script>
    -->
    <script>
      new WaykeValuation.default({
        branches: [{ id: '51577a27-7c62-42da-8fda-0b158c160868', name: 'Branch 1'}],
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
    <script src="https://cdn.wayke.se/public-assets/wayke.valuation.v1.0.0.js"></script>
    <!--
      A development version is available here:
      <script src="https://test-cdn.wayketech.se/public-assets/wayke.valuation.v1.0.0.js"></script>
    -->
    <script>
      function openWaykeValuation() {
        const app = new WaykeValuation.default({
          branches: [{ id: '51577a27-7c62-42da-8fda-0b158c160868', name: 'Branch 1'}],
          conditionReduction: {
            veryGood: 0.9,
            good: 0.8,
            ok: 0.7,
          },
          manualTrigger: true,
        })
        app.render();
      }
    </script>

    <input type="button" value="click me" onClick="javascript: openWaykeValuation();" />
  </body>
</html>
```

## Models
### Valuation

| Property           | Type               | Required |
|--------------------|--------------------|----------|
| branches           | Branch[]           | true     |
| conditionReduction | ConditionReduction | true     |
| manualTrigger      | boolean            | false    |
| colorPrimary       | ColorPrimary       | false    |
| logo               | string             | false    |

* `branches` - List of `Branch`-items. Must contain at least one entry.
* `conditionReduction` - Instructions on how much valuated price should be reduces given a condition.
* `manualTrigger` - An *optional* flag. If set to true, then the default floating panel will not be attach to the DOM.
The modal is opened by calling the Valuation's instance `render`-method.
* `colorPrimary` - An *optional* flag. Add a custom color theme.
* `logo` - An *optional* flag. Add a custom logo to the valuation modal.

### Branch
| Property | Type   | Required |
|----------|--------|----------|
| id       | string | true     |
| name     | string | false    |

### ConditionReduction
| Property | Type   | Required |
|----------|--------|----------|
| veryGood | number | true     |
| good     | number | true     |
| ok       | number | true     |

### ColorPrimary
| Property   | Type   | Required |
|------------|--------|----------|
| background | string | true     |
| text       | string | true     |

## Available Sources
| Version | Environment | Url                                                                   |
|---------|-------------|-----------------------------------------------------------------------|
| 1.0.0   | Production  | https://cdn.wayke.se/public-assets/wayke.valuation.v1.0.0.js          |
| 1.0.0   | Development | https://test-cdn.wayketech.se/public-assets/wayke.valuation.v1.0.0.js |

## Develop

### Prerequisite
```bash
npm install
```

Create an `.env` file in root.
```
WAYKE_HOST=YOUR_HOST_1,YOUR_HOST_2
WAYKE_URL=https://test-ext-api.wayketech.se
WAYKE_CONDITION_REDUCTION_VERY_GOOD=0.9
WAYKE_CONDITION_REDUCTION_GOOD=0.8
WAYKE_CONDITION_REDUCTION_OK=0.7
WAYKE_BRANCHES=[{"id": "51577a27-7c62-42da-8fda-0b158c160868", "name": "Name1"}]
```

### Start

Starts a local dev-server running at http://localhost:5000/ with watch

```bash
npm start
```

## Build Production

Builds production to `./build`

```bash
npm run build
```
