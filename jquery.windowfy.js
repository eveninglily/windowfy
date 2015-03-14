(function ($) {
    $('head').append('<link rel="stylesheet" href="windowfy/jquery.windowfy.css" type="text/css" />');
    $.widget('windowfy.windowfy', {
        options: {
            title: 'Window',
            minimize: true,
            close: true,
            id: '',
            onClose: function () {
                this.window.remove();
            },
            onMinimize: function () {
                this.body.toggle();
            }
        },

        _create: function () {
            var _this = this;
            this.window = $('<div/>').attr({
                class: 'windowfy',
                id: this.options.id
            }).appendTo('body');

            var body = $('<div>').attr('class','windowfy-body').append(this.element);
            this.body = body;
            var header = $('<div/>').attr({
                width: '100%'
            });

            var title = $('<div/>').attr({
                class: 'windowfy-title windowfy-grab'
            }).html(this.options.title).appendTo(header);

            var options = $('<div/>').attr({
                class: 'windowfy-option'
            }).appendTo(header);

            console.log(this.options.close)
            if (this.options.minimize) {
                $('<div/>').attr({
                    class: 'windowfy-minimize'
                }).html('-').on('click', function () {
                    _this.options.onMinimize.call(_this);
                }).appendTo(options);
            }

            if (this.options.close) {
                $('<div/>').attr({
                    class: 'windowfy-exit'
                }).html('x').on('click', function () {
                    _this.options.onClose.call(_this);
                }).appendTo(options);
            }

            this.window.append(header).append(body);
            if (!this.options.close && !this.options.minimize) {
                title.css('width', '100%');
            }
            var offsetX = 0;
            var offsetY = 0;
            $(document).on('mousedown', '.windowfy-title', function (evt) {
                $(this).removeClass('windowfy-grab');
                $(this).addClass('windowfy-grabbing');
                offsetX = evt.pageX - _this.window.offset().left;
                offsetY = evt.pageY - _this.window.offset().top;
            }).on('mouseup', function () {
                title.addClass('windowfy-grab');
                title.removeClass('windowfy-grabbing');
            }).on('mousemove', function (evt) {
                if (title.hasClass('windowfy-grabbing')) {
                    evt.preventDefault();
                    document.getSelection().removeAllRanges();
                    _this.window.css({ left: (evt.pageX - offsetX) + 'px' });
                    _this.window.css({ top: (evt.pageY - offsetY) + 'px' });
                }
            });
        }
    });
})( jQuery );
