(function ($) {
    $('head').append('<link rel="stylesheet" href="windowfy/jquery.windowfy.css" type="text/css" />');
    $.widget('windowfy.windowfy', {
        params: {
            title: 'Window',
            minimize: true,
            close: true,
            destroyOnClose: true,
            id: ''
        },

        _create: function() {
            var body = $('<div>').css('background', 'white').append(this.element);

            var holder = $('<div/>').attr({
                class: 'windowfy',
                id: this.params.id
            }).appendTo('body');

            var header = $('<div/>').attr({
                width: '100%'
            });

            var title = $('<div/>').attr({
                class: 'windowfy-title windowfy-grab'
            }).html(this.params.title).appendTo(header);

            var options = $('<div/>').attr({
                class: 'windowfy-options'
            }).appendTo(header);

            if (this.params.minimize) {
                $('<div/>').attr({
                    class: 'windowfy-minimize'
                }).html('-').on('click', function () {
                    $(body).toggle();
                }).appendTo(options);
            }

            if (this.params.close) {
                $('<div/>').attr({
                    class: 'windowfy-exit'
                }).html('x').on('click', function () {
                    if (this.params.destroyOnClose) {
                        holder.remove();
                    }
                    else {
                        holder.hide();
                    }
                }).appendTo(options);
            }

            holder.append(header).append(body);
            if (!this.params.close && !this.params.minimize) {
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
        }
    });
})( jQuery );
