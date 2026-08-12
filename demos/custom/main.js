/* global ResponsiveToolkit */

(($, viewport) => {
    'use strict';

    const myBreakpoints = {
        'alias-1': $('<div class="device-alias-1 visible-custom-1"></div>'),
        'alias-2': $('<div class="device-alias-2 visible-custom-2"></div>'),
        'alias-3': $('<div class="device-alias-3 visible-custom-3"></div>')
    };

    // Set viewports to custom breakpoints (This needs to be done before the document ready event)
    viewport.use('MyBreakpoints', myBreakpoints);

    $(document).ready(() => {
        /**
         * Update the demo to reflect the current breakpoint and the state of the comparison operators.
         */
        const updateDemo = () => {
            const currentBreakpoint = viewport.current();

            $('.breakpoint-alias').text(currentBreakpoint.toUpperCase());
            $('.comparison-operator').each((unusedIndex, element) => {
                void unusedIndex;
                const $element = $(element);

                $element.toggleClass('active', viewport.is($element.data('expression')));
            });
        };

        updateDemo();

        if (viewport.is('alias-1')) {
            console.log('Matching: alias-1');
        }

        if (viewport.is('>=alias-2')) {
            console.log('Matching: >=alias-2');
        }

        console.log('Current breakpoint:', viewport.current());

        $(window).resize(
            viewport.changed(() => {
                updateDemo();

                console.log('Current breakpoint:', viewport.current());
            })
        );

        if (window.hljs && typeof window.hljs.highlightAll === 'function') {
            window.hljs.highlightAll();
        }
    });
})(jQuery, ResponsiveToolkit);
