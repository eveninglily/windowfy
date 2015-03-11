(function ($) {
    $('head').append('<link rel="stylesheet" href="windowfy/jquery.windowfy.css" type="text/css" />');
    $.fn.windowfy = function (params) {
        params = this.extend({
            title: 'Window',
            minimize: true,
            close: true,
            destroyOnClose: true,
            id: ''
        }, params);
        return this.each(function () {
            var body = this;

            var holder = $('<div/>').attr({
                class: 'windowfy',
                id: params.id
            }).appendTo('body');

            var header = $('<div/>').attr({
                width: '100%'
            });

            var title = $('<div/>').attr({
                class: 'windowfy-title windowfy-grab'
            }).html(params.title).appendTo(header);

            var options = $('<div/>').attr({
                class: 'windowfy-options'
            }).appendTo(header);

            if (params.minimize) {
                $('<div/>').attr({
                    class: 'windowfy-minimize'
                }).html('-').on('click', function () {
                    $(body).toggle();
                }).appendTo(options);
            }

            if (params.close) {
                $('<div/>').attr({
                    class: 'windowfy-exit'
                }).html('x').on('click', function () {
                    if (params.destroyOnClose) {
                        holder.remove();
                    }
                    else {
                        holder.hide();
                    }
                }).appendTo(options);
            }

            holder.append(header).append(body);
            if (!params.close && !params.minimize) {
                title.css('width', '100%');
            }
            var offsetX = 0;
            var offsetY = 0;

            $(document).on('mousedown', '.windowfy-title', function (evt) {
                $(this).removeClass('windowfy-grab');
                $(this).addClass('windowfy-grabbing');
                offsetX = evt.pageX - holder.offset().left;
                offsetY = evt.pageY - holder.offset().top;
            }).on('mouseup', function () {
                title.addClass('windowfy-grab');
                title.removeClass('windowfy-grabbing');
            }).on('mousemove', function (evt) {
                if (title.hasClass('windowfy-grabbing')) {
                    evt.preventDefault();
                    document.getSelection().removeAllRanges();
                    holder.css({ left: (evt.pageX - offsetX) + 'px' });
                    holder.css({ top: (evt.pageY - offsetY) + 'px' });
                }
            });
            return this;
        });
    };
})( jQuery );
