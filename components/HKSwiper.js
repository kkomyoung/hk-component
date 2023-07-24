import UI from "./base/UI";
import {Swiper} from "swiper";
import {SWIPER_GLOBAL_COMMON} from "../utils/constants";
import {scrollTo} from "../functions/simple.ui";

/**
 * HKSwiper
 */
class HKSwiper extends UI {
    defaults = {
        no: 0,
        nav: false,
        paging: false,
        pagingType: undefined,
        pagingTitle: undefined,
        slidesPerView: 'auto',
        spaceBetween: 20
    };

    constructor(el, options) {
        super('hkSwiper', el);

        this.init(el, options);
    }

    init(el, options) {
        this.defaults = {...this.defaults, ...this.parseOptions(options)};

        this.render();
    }

    render() {
        this.detachEvents();
        this.attachEvents();
    }

    attachEvents() {
        let options = {
            ...SWIPER_GLOBAL_COMMON,

            ...this.defaults,
            initialSlide: this.defaults.no,
        };

        if (this.defaults.nav) {
            this.$el.append(`<div class="swiper-button-prev"></div><div class="swiper-button-next"></div>`);

            options = {
                ...options, ...{
                    navigation: {
                        prevEl: this.$el.find('.swiper-button-prev')[0],
                        nextEl: this.$el.find('.swiper-button-next')[0],
                    },
                }
            };
        }

        if (this.defaults.paging) {

            this.$el.append(`<div class="swiper-pagination"></div>`);

            options = {
                ...options, ...{
                    pagination: {
                        el: this.$el.find('.swiper-pagination')[0],
                        clickable: true,
                    },
                }
            };

            if (this.defaults.pagingType) {
                options = {
                    ...options, ...{
                        pagination: {
                            el: this.$el.find('.swiper-pagination')[0],
                            type: this.defaults.pagingType
                        },
                    }
                };
            }

            if (this.defaults.pagingTitle) {
                setTimeout(() => {
                    this.$el.find('.swiper-pagination').attr('data-paging-title', this.defaults.pagingTitle);
                });
            }
        }



        if($('.gallery-swiper-area').length > 0 && this.$el.hasClass('thumb')){
            options = {
                ...options,
                // loop: true,
                // centeredSlides: true,
                slidesPerView: 'auto',
                spaceBetween: 10,
            };

            this.$el.on('click', '.swiper-slide a', (e) => {
                e.preventDefault();

                const $this = $(e.currentTarget);
                const index = $this.closest('.swiper-slide').index();
                $this.closest('.swiper-slide').addClass('on').siblings().removeClass('on');

                $('.gallery').data('ui').swiper.slideTo(index);
                $('.info').data('ui').swiper.slideTo(index);
            });
        }

        if($('.gallery-swiper-area').length > 0 && this.$el.hasClass('info')){
            options = {
                ...options,
                autoHeight: true
            };

            this.swiper = new Swiper(this.$el.find('.swiper-container')[0], options);
            this.swiper.on('slideChange', (e) => {
                const index = this.swiper.realIndex;

                $('.ui-swiper.thumb .swiper-slide').removeClass('on').eq(index).addClass('on');

                $$('.ui-swiper.gallery').swiper.slideTo(index);
                $$('.ui-swiper.thumb').swiper.slideTo(index);

                scrollTo(0, false);
            });
            return;
        }

        this.swiper = new Swiper(this.$el.find('.swiper-container')[0], options);
    }

    open() {

    }

    close() {

    }

    detachEvents() {
        this.$el.off(this.eventId);
    }

    destroy() {
        this.detachEvents();
        this.swiper.destroy();
    }
}

export default HKSwiper;
