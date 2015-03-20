(function ($) {
    $.fn.windowfy = function(params) {
        return this.each(function() {
            var options = $.extend({
                title: 'Window',
                minimize: true,
                close: true,
                id: '',
                onClose: function () {
                    $(this).remove();
                },
                onMinimize: function () {
                    body.toggle();
                }
            }, params);

            var element = $(this);

            var outer = $('<div/>').attr({
                'class': 'windowfy',
                'id': options.id
            }).appendTo(element.parent());

            var body = $('<div>').attr('class','windowfy-body').append(this);

            var header = $('<div/>').attr({
                width: '100%'
            });

            var title = $('<div/>').attr({
                'class': 'windowfy-title windowfy-grab'
            }).html(options.title).appendTo(header);

            var opts = $('<div/>').attr({
                'class': 'windowfy-option'
            }).appendTo(header);

            if (options.minimize) {
                $('<div/>').attr({
                    'class': 'windowfy-minimize'
                }).html('-').on('click', function () {
                    options.onMinimize.call(outer);
                }).appendTo(opts);
            }

            if (options.close) {
                $('<div/>').attr({
                    'class': 'windowfy-exit'
                }).html('x').on('click', function () {
                    options.onClose.call(outer);
                }).appendTo(opts);
            }

            outer.append(header).append(body);
            if (!options.close && !options.minimize) {
                title.css('width', '100%');
            }
            var offsetX = 0;
            var offsetY = 0;
            $(document).on('mousedown', '.windowfy-title', function (evt) {
                $(this).removeClass('windowfy-grab');
                $(this).addClass('windowfy-grabbing');
                offsetX = evt.pageX - outer.offset().left;
                offsetY = evt.pageY - outer.offset().top;
            }).on('mouseup', function () {
                title.addClass('windowfy-grab');
                title.removeClass('windowfy-grabbing');
            }).on('mousemove', function (evt) {
                if (title.hasClass('windowfy-grabbing')) {
                    evt.preventDefault();
                    document.getSelection().removeAllRanges();
                    outer.css({ left: (evt.pageX - offsetX) + 'px' });
                    outer.css({ top: (evt.pageY - offsetY) + 'px' });
                }
            });
            return this;
        });
    }
})( jQuery );
