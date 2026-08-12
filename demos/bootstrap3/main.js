/* global ResponsiveToolkit */

(($, viewport) => {
    'use strict';

    // Use Bootstrap 3 (This needs to be done before the document ready event)
    viewport.use('Bootstrap3');

    $(document).ready(() => {
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
