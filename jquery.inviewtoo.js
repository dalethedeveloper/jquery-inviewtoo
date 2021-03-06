/*!
 * InViewToo - jQuery Plugin to add triggers for element visibility in the browser viewport
 *
 * Plugin:   inviewtoo
 * Version:  0.2
 * Released: 2011-11-14
 * URL:      https://github.com/dalethedeveloper/jquery-inviewtoo
 * Author:   Dale the Developer
 * License:  MIT
 *
 */
(function($) {
    var timer, $context, onetime = true,
        watchme = [],
        settings = {
            context: null,
            debounce: 250,
            edge_threshold: 250
        };
    var methods = {
        init: function() {
            return this.each(function() {
                if (typeof $(this).data('inview-status') === 'undefined') {
                    watchme.push(this);
                    $(this).data('inview-status', 'watched');
                }
            });
        },
        refresh: function() {
            if (timer) clearTimeout(timer);

            timer = setTimeout(function() {
                var viewport = {
                    x2: $context.width() + $context.scrollLeft(),
                    y2: $context.height() + $context.scrollTop()
                };
                viewport.x1 = viewport.x2 - $context.width();
                viewport.y1 = viewport.y2 - $context.height();

                if( settings.edge_threshold ) {
                    viewport.x1 -= settings.edge_threshold;
                    viewport.y1 -= settings.edge_threshold;
                    viewport.x2 += settings.edge_threshold;
                    viewport.y2 += settings.edge_threshold;
                }

                $(watchme).each(function() {
                    var $this = $(this),
                        pos = $this.offset(),
                        me = {
                            x1: pos.left,
                            y1: pos.top,
                            x2: $this.width() + pos.left,
                            y2: $this.height() + pos.top
                        };
                    if (
                        ( // Top Left In View
                          (me.x1 >= viewport.x1 && me.x1 <= viewport.x2) &&
                          (me.y1 >= viewport.y1 && me.y1 <= viewport.y2)
                        )
                        || // && would mean entire object in view
                        ( // Bottom Right In View
                          (me.x2 >= viewport.x1 && me.x2 <= viewport.x2) &&
                          (me.y2 >= viewport.y1 && me.y2 <= viewport.y2)
                        )
                    ) {
                        $this.trigger('inview');
                        $this.data('inview-status', 'in');
                    } else {
                        if( $this.data('inview-status') == 'in' )
                            $this.trigger('leftview');
                        $this.data('inview-status', 'out');
                    }
                });
            }, settings.debounce);
        }
    };

    $.fn.inviewtoo = function(params) {
        if( params )
            settings = $.extend(settings, params);

        if (onetime)
            $context = $context || $(settings.context === null ? window : settings.context);

        if (typeof this === 'object') methods.init.apply(this);

        if (onetime) {
            $context.bind('scroll resize touchend', methods.refresh);
            onetime = false;
            methods.refresh();
        }
        return this;
    };

})(jQuery);