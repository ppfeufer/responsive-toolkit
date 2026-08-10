# Responsive Bootstrap Toolkit

Responsive Bootstrap Toolkit provides an easy way of breakpoint detection in JavaScript, detecting changes in currently active breakpoint, as well as executing any breakpoint-specific JavaScript code. Despite the name, you can use it also with Foundation, or any other framework.

______________________________________________________________________

<!-- mdformat-toc start --slug=github --maxlevel=6 --minlevel=2 -->

- [Installation](#installation)
  - [Download](#download)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Execute Code on Window Resize](#execute-code-on-window-resize)
  - [Get Alias of Current Breakpoint](#get-alias-of-current-breakpoint)
  - [Using With Bootstrap 5](#using-with-bootstrap-5)
  - [Providing Your Own Breakpoints](#providing-your-own-breakpoints)
- [Examples](#examples)
- [Development](#development)

<!-- mdformat-toc end -->

______________________________________________________________________

## Installation<a name="installation"></a>

### Download<a name="download"></a>

Download the latest release from [GitHub](https://github.com/ppfeufer/responsive-toolkit/releases/download/latest/responsive-toolkit.zip).

## Usage<a name="usage"></a>

To use Responsive Toolkit, include the following CSS and JS files in your HTML document:

```html
<!-- Responsive Toolkit -->
<link rel="stylesheet" href="css/responsive-toolkit.min.css">
```

```html
<!-- Responsive Toolkit -->
<script src="js/responsive-toolkit.min.js"></script>
<!-- Your scripts using Responsive Toolkit -->
<script src="js/my-own.js"></script>
```

### Basic Usage<a name="basic-usage"></a>

```javascript
// Wrap IIFE around your code
(($, viewport) => {
    'use strict';

    $(document).ready(() => {
        // Executes only in XS breakpoint
        if (viewport.is('xs')) {
            // ...
        }

        // Executes in SM, MD and LG breakpoints
        if (viewport.is('>=sm')) {
            // ...
        }

        // Executes in XS and SM breakpoints
        if (viewport.is('<md')) {
            // ...
        }

        // Execute code each time window size changes
        $(window).resize(
            viewport.changed(() => {
                if (viewport.is('xs')) {
                    // ...
                }
            })
        );
    });
})(jQuery, ResponsiveToolkit);
```

### Execute Code on Window Resize<a name="execute-code-on-window-resize"></a>

Allows using custom debounce interval. The default one is set at 300ms.

```javascript
$(window).resize(
    viewport.changed(() => {

      // ...

    }, 150)
);
```

### Get Alias of Current Breakpoint<a name="get-alias-of-current-breakpoint"></a>

```javascript
$(window).resize(
    viewport.changed(() => {
        console.log('Current breakpoint: ', viewport.current());
    })
);
```

### Using With Bootstrap 5<a name="using-with-bootstrap-5"></a>

Instead of Bootstrap's aliases `xs`, `sm`, `md` and `lg`, Foundation uses: `small`, `medium`, `large`, and `xlarge`.

```javascript
(($, viewport) => {
    'use strict';

    viewport.use('Bootstrap5');

    if (viewport.is('sm')) {
        // ...
    }

})(jQuery, ResponsiveToolkit);
```

> [!NOTE]
>
> Bootstrap 3 and 4 are supported as well. \
> Just use `viewport.use('Bootstrap3')` or `viewport.use('Bootstrap4')`.

### Providing Your Own Breakpoints<a name="providing-your-own-breakpoints"></a>

```javascript
(($, viewport) => {

    var myBreakpoints = {
        'alias-1': $('<div class="device-alias-1 visible-custom-1"></div>'),
        'alias-2': $('<div class="device-alias-2 visible-custom-2"></div>'),
        'alias-3': $('<div class="device-alias-3 visible-custom-3"></div>')
    };

    viewport.use('MyBreakpoints', myBreakpoints);

    if(viewport.is('alias-1')) {
        // ...
    }
})(jQuery, ResponsiveToolkit);
```

> [!NOTE]
>
> It's up to you to create media queries that will toggle div's visibility across
> different screen resolutions.
>
> How? \
> [Refer to this example](https://github.com/ppfeufer/responsive-toolkit/blob/master/demos/custom/custom-breakpoints.css).

## Examples<a name="examples"></a>

Some examples of how to use Responsive Toolkit can be found in the [demos](https://github.com/ppfeufer/responsive-toolkit/tree/master/demos) folder:

- [Default breakpoints](https://github.com/ppfeufer/responsive-toolkit/tree/master/demos/default)
- [Bootstrap 3](https://github.com/ppfeufer/responsive-toolkit/tree/master/demos/bootstrap3)
- [Bootstrap 4](https://github.com/ppfeufer/responsive-toolkit/tree/master/demos/bootstrap4)
- [Bootstrap 5](https://github.com/ppfeufer/responsive-toolkit/tree/master/demos/bootstrap5)
- [Custom breakpoints](https://github.com/ppfeufer/responsive-toolkit/tree/master/demos/custom)

## Development<a name="development"></a>

To build the project, you need to have [Node.js](https://nodejs.org/) installed.
Then, run the following commands in your terminal:

```bash
# Install dependencies
npm install
```

Then, you can build the project using:

```bash
# Build the project
npm run build

# Alternatively, you can use a make command if you have make installed to build the
# project (you still need to install the dependencies with `npm install` first):
make build
```

The source files are located in the `src` folder, and the built files will be output to the `dist` folder.

The `src` folder contains the following files:

- `responsive-toolkit.css`: The default breakpoint detection CSS file, when `viewport.use` is not called.
- `responsive-toolkit.js`: The main JavaScript file for the Responsive Toolkit.

These files are development versions and not ready for production. The built files in the `dist` folder are minified and ready for production use.
