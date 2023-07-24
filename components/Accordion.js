import UI from "./base/UI";
import {scrollTo, guideOverflowTable} from "../functions/simple.ui";

/**
 * Accordion
 */
class Accordion extends UI {
    defaults = {
        type: 'single',
        state: undefined,
        no: undefined,
        scroll: false
    };

    constructor(el, options) {
        super('accordion', el);

        this.init(el, options);
    }

    init(el, options) {
        this.defaults = {...this.defaults, ...options};

        this.render();
        this.initOpenState();
    }

    update() {

    }

    render() {
        if(
            this.$el.find('.ui-accordion-btn').length > 0 &&
            this.$el.find('.ui-accordion-btn')[0].tagName.toLowerCase() === 'a' &&
            this.$el.find('.ui-accordion-btn').filter('a').length > 0 &&
            !this.$el.find('.ui-accordion-btn').attr('href')){
                this.$el.find('.ui-accordion-btn').attr('href', '#none');
        }

        if (this.$el.find('.ui-accordion-list').hasClass('open')) {
            this.$el.find('.ui-accordion-btn').attr('aria-expanded', true);
        } else {
            this.$el.find('.ui-accordion-btn').attr('aria-expanded', false);
        }

        this.detachEvents();
        this.attachEvents();
    }

    initOpenState() {
        if (this.defaults.state === 'allOpen') {
            this.open('all');
        } else {
            this.open(this.defaults.no);
        }
    }

    attachEvents() {
        this.$el.on(`click${this.eventId}`, '.ui-accordion-btn', (e) => {
            e.preventDefault();
            const $this = $(e.currentTarget);
            const index = $this.closest('.ui-accordion-list').index() + 1;

            if ($this.closest('.ui-accordion-list').hasClass('open')) {
                this.close(index);
            } else {
                this.open(index);
                this.defaults.scroll === true && this.scrollOpenPosition($this);
            }
        });
    }

    open(index) {
        this.$el.find('.ui-accordion-btn').attr('aria-expanded', false);

        if (index === 'all') {
            this.$el.find('.ui-accordion-list').addClass('open');
            this.$el.find('.ui-accordion-btn').attr('aria-expanded', true);

            return;
        }

        const openList = index === 'object' ? index : this.parseOptions(index);

        if (this.defaults.type === "single") {
            this.$el.find('.ui-accordion-list').removeClass('open');
        }

        openList.map((item) => {
            const target = this.$el.find('.ui-accordion-list').eq(item - 1);
            target.addClass('open');
            target.find('.ui-accordion-btn').attr('aria-expanded', true);
        });

        guideOverflowTable();
    }

    close(index) {
        if (index === 'all') {
            this.$el.find('.ui-accordion-list').removeClass('open');
            this.$el.find('.ui-accordion-btn').attr('aria-expanded', false);

            return;
        }

        const closeList = index === 'object' ? index : this.parseOptions(index);

        closeList.map((item) => {
            const target = this.$el.find('.ui-accordion-list').eq(item - 1);
            target.removeClass('open');
            target.find('.ui-accordion-btn').attr('aria-expanded', false);
        });
    }

    parseOptions(value) {
        let splitString;
        let numberArray = [];

        if (typeof value === 'string') {
            splitString = value.split(',');

            splitString.map((item) => {
                numberArray.push(+item);
            });

            value = numberArray;
        } else {
            value = [value];
        }

        return value;
    }

    scrollOpenPosition(target) {
        scrollTo(target);
    }

    detachEvents() {
        this.$el.off(this.eventId);
    }

    destroy() {
        this.detachEvents();
    }
}

export default Accordion;
