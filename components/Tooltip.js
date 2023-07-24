import UI from "./base/UI";

/**
 * Tooltip
 */
class Tooltip extends UI {
    defaults = {};

    constructor(el, options) {
        super('tooltip', el);

        this.init(el, options);
    }

    init(el, options) {
        this.defaults = {...this.defaults, ...this.parseOptions(options)};

        this.render();
    }

    update() {

    }

    render() {
        this.detachEvents();
        this.attachEvents();
    }

    attachEvents() {
        this.$el.on(`click${this.eventId}`, '.tooltip-btn', (e) => {
            e.preventDefault();
            const $this = $(e.currentTarget);

            if ($this.attr('aria-expanded') === 'false') {
                this.removeTitleZIndex();
                this.open();

                $('body').off('click.bodyClick');
                setTimeout(() => {
                    $('body').on('click.bodyClick', (e) => {
                        if (!this.$el.find('.tooltip-page').has(e.target).length) {
                            this.close();
                        }
                    });
                });
            } else {
                this.close();
            }
        });

        this.$el.on(`click${this.eventId}`, '.tooltip-close', (e) => {
            e.preventDefault();

            this.close();
            this.$el.find('.tooltip-btn').focus();
        });
    }

    open() {
        this.$el.find('.tooltip-btn').attr('aria-expanded', true);
        this.upTitleZIndex();
    }

    close() {
        this.$el.find('.tooltip-btn').attr('aria-expanded', false);
    }

    upTitleZIndex() {
        this.$el.parents('.tit').css({
            zIndex: 2
        });
    }

    removeTitleZIndex() {
        this.$document.find('.tit').removeAttr('style');
    }

    detachEvents() {
        this.$el.off(this.eventId);
    }

    destroy() {
        this.detachEvents();
    }
}

export default Tooltip;
