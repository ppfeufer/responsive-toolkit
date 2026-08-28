/*!
 * Responsive Toolkit for jQuery (modernized fork by Peter Pfeufer)
 *
 * @version 0.0.3
 * @author Peter Pfeufer
 * @license GPL-3.0 or later
 * @link https://github.com/ppfeufer/responsive-toolkit
 *
 * Description: Allows for easy breakpoint detection in JavaScript.
 *
 * Original Plugin:
 * Responsive Bootstrap Toolkit
 * Author:    Maciej Gurban
 * Origin:    https://github.com/maciej-gurban/responsive-bootstrap-toolkit
 */

/**
 * Responsive Toolkit for jQuery
 *
 * @type {{interval: number, framework: null, breakpoints: null, is: function((type|string)): Boolean, use: function(string, Object=): void, current: function(): string, changed: function(*, *): function(): void}}
 */
const ResponsiveToolkit = (($) => {
    'use strict';

    /**
     * Public methods
     */
    const self = {
        /**
         * Determines default debouncing interval of 'changed' method
         */
        interval: 300,

        /**
         * The framework currently in use
         * Used to determine which breakpoint detection divs to use
         */
        framework: null,

        /**
         * Breakpoint aliases, listed from smallest to biggest
         */
        breakpoints: null,

        /**
         * Returns true if current breakpoint matches passed alias
         *
         * @param {type|string} str
         * @returns {Boolean}
         */
        is: (str) => {
            if (internal.isAnExpression(str)) {
                return internal.isMatchingExpression(str);
            }

            return self.breakpoints[str] && self.breakpoints[str].is(':visible');
        },

        /**
         * Determines which framework-specific breakpoint detection divs to use
         *
         * @param {string} frameworkName The name of the framework to use
         * @param {Object} breakpoints An object containing breakpoint aliases and their corresponding detection divs
         * @returns {void}
         */
        use: (frameworkName, breakpoints = {}) => {
            self.framework = frameworkName.toLowerCase();

            if (self.framework in internal.detectionDivs) {
                self.breakpoints = internal.detectionDivs[self.framework];
            } else {
                self.breakpoints = breakpoints;
            }

            internal.applyDetectionDivs();
        },

        /**
         * Returns current breakpoint alias
         *
         * @returns {string}
         */
        current: () => {
            let name = 'unrecognized';

            $.each(self.breakpoints, (alias) => {
                if (self.is(alias)) {
                    name = alias;
                }
            });

            return name;
        },

        /*
         * Waits specified number of milliseconds before executing a callback
         *
         * @param {function} fn Callback function to execute
         * @param {number} ms Number of milliseconds to wait before executing the callback
         * @returns {function(): void} A function that can be called to trigger the debounced callback
         */
        changed: (fn, ms) => {
            let timer;

            return () => {
                clearTimeout(timer);

                timer = setTimeout(() => {
                    fn();
                }, ms || self.interval);
            };
        }
    };

    /**
     * Internal methods
     *
     * @type {{detectionDivs: Object, isAnExpression: function(*): Boolean, isMatchingExpression: function(*): Boolean, applyDetectionDivs: function(): void, splitExpression: function(*): {operator: *, orEqual: Boolean, breakpointName: *}, isAnyActive: function(*): Boolean}}
     */
    const internal = { // jshint ignore:line
        /**
         * Breakpoint detection divs for each framework version
         */
        detectionDivs: {
            // Default breakpoints, the same breakpoints as Bootstrap 5
            default: {
                'xs': $('<div class="device-xs responsive-toolkit-xs"></div>'), // Extra small devices (portrait phones, less than 576px)
                'sm': $('<div class="device-sm responsive-toolkit-sm"></div>'), // Small devices (landscape phones, 576px and up)
                'md': $('<div class="device-md responsive-toolkit-md"></div>'), // Medium devices (tablets, 768px and up)
                'lg': $('<div class="device-lg responsive-toolkit-lg"></div>'), // Large devices (desktops, 992px and up)
                'xl': $('<div class="device-xl responsive-toolkit-xl"></div>'), // Extra large devices (large desktops, 1200px and up)
                'xxl': $('<div class="device-xxl responsive-toolkit-xxl"></div>') // Extra, extra large devices (larger desktops, 1400px and up)
            },
            // Breakpoints for Bootstrap 5
            bootstrap5: {
                'xs': $('<div class="device-xs d-xs-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none"></div>'),
                'sm': $('<div class="device-sm d-none d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none"></div>'),
                'md': $('<div class="device-md d-none d-md-block d-sm-none d-lg-none d-xl-none d-xxl-none"></div>'),
                'lg': $('<div class="device-lg d-none d-lg-block d-sm-none d-md-none d-xl-none d-xxl-none"></div>'),
                'xl': $('<div class="device-xl d-none d-xl-block d-sm-none d-md-none d-lg-none d-xxl-none"></div>'),
                'xxl': $('<div class="device-xxl d-none d-xxl-block d-sm-none d-md-none d-lg-none d-xl-none"></div>')
            },
            // Breakpoints for Bootstrap 4
            bootstrap4: {
                'xs': $('<div class="device-xs d-xs-block d-sm-none d-md-none d-lg-none d-xl-none"></div>'),
                'sm': $('<div class="device-sm d-none d-sm-block d-md-none d-lg-none d-xl-none"></div>'),
                'md': $('<div class="device-md d-none d-md-block d-sm-none d-lg-none d-xl-none"></div>'),
                'lg': $('<div class="device-lg d-none d-lg-block d-sm-none d-md-none d-xl-none"></div>'),
                'xl': $('<div class="device-xl d-none d-xl-block d-sm-none d-md-none d-lg-none"></div>'),
            },
            // Breakpoints for Bootstrap 3
            bootstrap3: {
                'xs': $('<div class="device-xs visible-xs visible-xs-block"></div>'),
                'sm': $('<div class="device-sm visible-sm visible-sm-block"></div>'),
                'md': $('<div class="device-md visible-md visible-md-block"></div>'),
                'lg': $('<div class="device-lg visible-lg visible-lg-block"></div>')
            }
        },

        /**
         * Append visibility divs after DOM loaded
         *
         * @returns {void}
         */
        applyDetectionDivs: () => {
            $(document).ready(() => {
                $.each(self.breakpoints, (alias) => {
                    self.breakpoints[alias].appendTo('.responsive-toolkit');
                });
            });
        },

        /**
         * Determines whether passed string is a parsable expression
         *
         * @param {type|string} str The string to evaluate
         * @returns {Boolean} True if the string is a parsable expression, false otherwise
         */
        isAnExpression: (str) => {
            return (str.charAt(0) === '<' || str.charAt(0) === '>');
        },

        /**
         * Splits the expression in into <|> [=] alias
         *
         * @param {string} str The expression to split
         * @returns {Object} Object with operator, orEqual and breakpointName properties
         */
        splitExpression: (str) => {
            // Used operator
            const operator = str.charAt(0);
            // Include breakpoint equal to alias?
            const orEqual = (str.charAt(1) === '=');

            /**
             * Index at which breakpoint name starts.
             *
             * For:  >sm, index = 1
             * For: >=sm, index = 2
             */
            const index = 1 + (orEqual ? 1 : 0);

            /**
             * The remaining part of the expression, after the operator, will be treated as the
             * breakpoint name to compare with
             */
            const breakpointName = str.slice(index);

            return {
                operator: operator,
                orEqual: orEqual,
                breakpointName: breakpointName
            };
        },

        /**
         * Returns true if currently active breakpoint matches the expression
         *
         * @param {string[]} breakpoints Array of breakpoint aliases to check
         * @returns {Boolean} True if any of the breakpoints are currently active, false otherwise
         */
        isAnyActive: (breakpoints) => {
            let found = false;

            $.each(breakpoints, (index, alias) => { // jshint ignore:line
                // Once first breakpoint matches, return true and break out of the loop
                if (self.breakpoints[alias].is(':visible')) {
                    found = true;

                    return false;
                }
            });

            return found;
        },

        /**
         * Determines whether current breakpoint matches the expression given
         *
         * @param {type|string} str The expression to evaluate
         * @returns {Boolean} True if the current breakpoint matches the expression, false otherwise
         */
        isMatchingExpression: (str) => {
            const expression = internal.splitExpression(str);

            // Get names of all breakpoints
            const breakpointList = Object.keys(self.breakpoints);

            // Get index of sought breakpoint in the list
            let pos = breakpointList.indexOf(expression.breakpointName);

            // Breakpoint found
            if (pos !== -1) {
                let start = 0;
                let end = 0;

                /**
                 * Parsing viewport.is('<=md') we interate from smallest breakpoint ('xs') and end
                 * at 'md' breakpoint, indicated in the expression,
                 * That makes: start = 0, end = 2 (index of 'md' breakpoint)
                 *
                 * Parsing viewport.is('<md') we start at index 'xs' breakpoint, and end at
                 * 'sm' breakpoint, one before 'md'.
                 * Which makes: start = 0, end = 1
                 */
                if (expression.operator === '<') {
                    start = 0;
                    end = expression.orEqual ? ++pos : pos;
                }

                /**
                 * Parsing viewport.is('>=sm') we interate from breakpoint 'sm' and end at the end
                 * of breakpoint list.
                 * That makes: start = 1, end = undefined
                 *
                 * Parsing viewport.is('>sm') we start at breakpoint 'md' and end at the end of
                 * breakpoint list.
                 * Which makes: start = 2, end = undefined
                 */
                if (expression.operator === '>') {
                    start = expression.orEqual ? pos : ++pos; // eslint-disable-line no-useless-assignment
                    end = undefined;
                }

                const acceptedBreakpoints = breakpointList.slice(start, end);

                return internal.isAnyActive(acceptedBreakpoints);
            }
        }
    };

    // Create a placeholder
    $(document).ready(() => {
        $('<div class="responsive-toolkit"></div>').appendTo('body');
    });

    if (self.framework === null) {
        self.use('default');
    }

    return self;
})(jQuery);

if(typeof module !== 'undefined' && module.exports) { // jshint ignore:line
    module.exports = ResponsiveToolkit; // jshint ignore:line
}
