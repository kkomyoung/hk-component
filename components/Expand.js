import UI from "./base/UI";
import {scrollTo} from "../functions/simple.ui";

/**
 * Expand
 */
class Expand extends UI {
    defaults = {
        scroll: false
    };

    constructor(el, options) {
        super('expand', el);

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
        this.$el.on(`click${this.eventId}`, '.ui-expand-btn', (e) => {
            e.preventDefault();
            const $this = $(e.currentTarget);

            if ($this.parents('.ui-expand').hasClass('open')) {
                this.close($this);
                $this.attr('aria-expanded', 'false');
            } else {
                this.open($this);
                $this.attr('aria-expanded', 'true');
            }

        });
    }

    open(target) {
        target.parents('.ui-expand').addClass('open');
        this.scrollToExpandEl();
    }

    close(target) {
        target.parents('.ui-expand').removeClass('open');
    }

    scrollToExpandEl() {
        if (this.defaults.scroll === true) {
            scrollTo(this.$el);
        }
    }

    detachEvents() {
        this.$el.off(this.eventId);
    }

    destroy() {
        this.detachEvents();
    }
}

export default Expand;
