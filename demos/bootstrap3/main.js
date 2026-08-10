/* global ResponsiveToolkit */

(($, document, window, viewport) => {
    'use strict';

    viewport.use('Bootstrap3');

    const updateDemo = () => {
        const currentBreakpoint = viewport.current();

        $('.breakpoint-alias').text(currentBreakpoint.toUpperCase());
        $('.comparison-operator').each((unusedIndex, element) => {
            void unusedIndex;
            const $element = $(element);

            $element.toggleClass('active', viewport.is($element.data('expression')));
        });
    };

    $(document).ready(() => {
        updateDemo();
        console.log('Current breakpoint:', viewport.current());
    });

    $(window).resize(
        viewport.changed(() => {
            updateDemo();
            console.log('Current breakpoint:', viewport.current());
        })
    );
})(jQuery, document, window, ResponsiveToolkit);
