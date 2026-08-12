/* global ResponsiveToolkit */

(($, viewport) => {
    'use strict';

    $(document).ready(() => {
        // Intentionally do not call viewport.use(...): this demo shows default toolkit behavior.
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
