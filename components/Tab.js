import UI from "./base/UI";
import {setActivePosition} from "../functions/simple.ui";

/**
 * Tab
 */
class Tab extends UI {
    defaults = {
        no: 0
    };

    constructor(el, options) {
        super('tab', el);

        this.init(el, options);
    }

    init(el, options) {
        if (options) {
            this.defaults = {...this.defaults, ...this.parseOptions(options)};
        }

        this.render();
    }

    update() {
        this.checkShowButton();
        this.setPosition();
    }

    render() {
        this.detachEvents();

        const $uiTabNav = this.$el.find('.ui-tab-nav > ul');

        $uiTabNav.attr({role: 'tablist'});
        $uiTabNav.find('li').attr({role: 'none'});
        $uiTabNav.find('li a').attr({role: 'tab'});

        this.attachCommonEvents();
        this.setPosition();
        this.$window.trigger(`resize${this.eventId}`);
        if (this.$el.find('.ui-tab-nav li').length !== this.$el.find('.ui-tab-content').length) {
            let activeIndex = this.$el.find('.ui-tab-nav li.active').index();
            activeIndex = activeIndex === -1 ? 0 : activeIndex;
            this.a11y(activeIndex);
            return;
        }

        this.attachStaticEvents();
        this.open(this.defaults.no);
    }

    setPosition() {
        if (this.$el.find('.ui-tab-nav li.active').length <= 0) {
            this.$el.find('.ui-tab-nav li').eq(this.defaults.no).addClass('active');
        }

        setActivePosition(this.$el.find('.ui-tab-nav'), this.$el.find('.ui-tab-nav li.active'));
    }

    attachStaticEvents() {
        this.$el.on(`click${this.eventId}`, '.ui-tab-nav a', (e) => {
            e.preventDefault();
            const $this = $(e.currentTarget);
            const index = $this.closest('li').index();

            this.open(index);
        });
    }

    attachCommonEvents() {
        this.$el.on(`click${this.eventId}`, '.ui-tab-btn-expand', (e) => {
            e.preventDefault();
            const $this = $(e.currentTarget);

            this.$el.toggleClass('open');
            if (this.$el.hasClass('open')) {
                $this.find('.hide-txt').text('접기');

            } else {
                $this.find('.hide-txt').text('펼치기');
                this.setPosition();
            }
        });

        this.$window.on(`resize${this.eventId}`, (e) => {
            this.checkShowButton();
        });
    }

    checkShowButton() {
        if (!this.$el.hasClass('open')) {
            if (this.$el.find('.ui-tab-nav').outerWidth() < this.$el.find('.tab-nav').width() + 50) {
                this.$el.find('.ui-tab-btn-expand').css('display', 'inline-flex');
            } else {
                this.$el.find('.ui-tab-btn-expand').css('display', 'none');
            }
        }
    }

    open(index) {
        this.$el.find('.ui-tab-nav li')
            .eq(index).addClass('active')
            .siblings().removeClass('active');
        this.$el.find('.ui-tab-content')[0] && this.$el.find('.ui-tab-content')
            .eq(index).show()
            .siblings().hide();

        this.setPosition();
        this.a11y(index);
    }

    a11y(index) {
        this.$el.find('.ui-tab-nav li a')
            .attr({'aria-selected': false})
            .eq(index)
            .attr({'aria-selected': true});
        // .find('.hide-txt').remove().end()
        // .eq(index).find('a').prepend(`<span class="hide-txt">선택됨</span>`);
    }

    detachEvents() {
        this.$el.off(this.eventId);
        this.$window.off(this.eventId);
    }

    destroy() {
        this.detachEvents();
    }
}

export default Tab;
