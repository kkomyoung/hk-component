import {
    getBottomLayerCardItemTmpl,
    getBottomLayerCardListTmpl,
    getBottomLayerListTmpl,
    getBottomLayerTmpl,
} from "./templates/html.template";
import {Swiper} from 'swiper';
import {chunk} from "../utils/util";
import Popup from "./base/Popup";
import {SWIPER_GLOBAL_COMMON} from "../utils/constants";
import {initData, setSelectText} from "../functions/select.common";

/**
 * PopupSelect
 */
class PopupSelect extends Popup {
    defaults = {
        type: 'select',
        optional: false
    };
    accessScreenReader = false;

    constructor(el, options) {
        super('popupSelect', el);

        this.init(el, options);
    }

    init(el, options) {
        this.popupInit(el, options);

        initData(this);
        setSelectText(this);

        this.detachEvents();
        this.attachEvents();
    }

    update() {
        this.detachPopupEvents();
        initData(this);
        setSelectText(this);

        if (!this.$popup) {
            return;
        }
        let list, initialSlide;

        if (this.defaults.type.match(/bank|card|license/g)) {

            list = this.data.list.filter((obj) => {
                return obj.value !== '';
            });

            const chunkLength = this.defaults.type === 'license' ? 4 : 3;
            const cardListData = chunk(list, chunkLength);

            list = cardListData.map((cardList) => {
                const cardListHTML = cardList.map((cardData) => {
                    return getBottomLayerCardItemTmpl(cardData.value, cardData.text, cardData.img);
                }).join('');

                return getBottomLayerCardListTmpl(cardListHTML);
            }).join('');

            const row = Math.floor(this.data.selectedIndex / chunkLength);
            const column = this.data.selectedIndex % chunkLength;
            initialSlide = row;
            this.$popup.find('.swiper-wrapper').html(list);
            this.$popup.find('.swiper-slide').eq(row).find('button').eq(column).addClass('active');
        } else {
            list = this.data.list.filter((obj) => {
                if(this.defaults.optional){
                    return true;
                }else{
                    return obj.value !== '';
                }
            }).map((optionData) => getBottomLayerListTmpl(optionData.value, optionData.text)).join('');

            initialSlide = this.data.selectedIndex;
            this.$popup.find('.swiper-wrapper').html(list);

            if(!this.defaults.optional && this.data.selectedIndex > 0){
                initialSlide = this.data.selectedIndex-1;
                this.$popup.find('.swiper-slide').eq(initialSlide).addClass('active');
            }else{
                initialSlide = this.data.selectedIndex;
                this.$popup.find('.swiper-slide').eq(initialSlide).addClass('active');
            }
        }

        /*
            접근성: 스크린 리더로 열 경우 event.offsetX, event.offsetY가 0이므로(kb손해보험에서 접근성마크 획득할때 적용됨)
            해당 슬라이드로 초기화시 앞으로는 이동가능하지만 뒤로는 이동이 불가하여 슬라이드의 초기값을 0으로 설정한다.
         */
        if (this.accessScreenReader) {
            initialSlide = 0;
        }

        let scrollbar = {};
        if (this.defaults.type === 'select' && this.$popup.find('.swiper-slide').length > 5) {
            scrollbar = {
                scrollbar: {
                    el: '.swiper-scrollbar'
                }
            };
        } else {
            this.$popup.find('.swiper-scrollbar').hide();
        }


        this.swiper = new Swiper(this.$popup.find('.swiper-container')[0], {
            ...SWIPER_GLOBAL_COMMON,

            initialSlide,
            slidesPerView: 'auto',
            spaceBetween: 0,
            direction: 'vertical',
            ...scrollbar
        });

        setTimeout(() => {
            this.swiper.update();
        });
        this.attachPopupEvents();
    }

    render() {
        if (!this.$popup) {
            const selectTitle = this.$el.next('button').data('title');

            this.$popup = $(getBottomLayerTmpl(this.defaults.type, selectTitle));
            this.$popupContainer.append(this.$popup);
            this.$popup.attr('data-id', this.uiId);

            this.update();
        }

        if(this.datas.list.length <= 1 && this.datas.list[0].value === ''){
            return;
        }

        this.openMotion();
    }

    openMotion() {
        this.openCommonMotion({
            cancelMotion: false,
            callback: () => {
            }
        });
    }

    closeMotion() {
        this.closeCommonMotion({
                cancelMotion: false,
                callback: () => {
                }
            }
        );
    }

    accessOpen() {
        this.$popupContainer.siblings().attr('aria-hidden', 'true');
    }

    accessClose() {
        super.accessClose();
    }

    open(fn = () => {
    }) {
        fn();

        setTimeout(() => {
            this.render();
        }, 0);
    }

    close(fn = () => {
    }) {
        fn();

        this.closeMotion();
    }

    attachEvents() {
        this.$el.next('button').on(`click${this.eventId}`, (e) => {
            e.preventDefault();
            this.render();

            this.accessScreenReader = e.offsetX === 0 && e.offsetY === 0;
        });
    }

    detachEvents() {
        this.$el.off(this.eventId);
        this.$el.next('button').off(this.eventId);
    }

    attachPopupEvents() {
        this.$popup.on(`click${this.eventId}`, (e) => {
            e.preventDefault();

            if (e.target === e.currentTarget) {
                this.closeMotion();
            }
        });

        this.$popup.on(`click${this.eventId}`, '.swiper-slide button', (e) => {
            e.preventDefault();
            const $this = $(e.currentTarget);

            let index;
            const row = $this.closest('li').index();
            const column = $this.index();
            const chunkLength = this.defaults.type === 'license' ? 4 : 3;


            if (this.defaults.type.match(/bank|card|license/g)) {
                index = row * chunkLength + column + 1;

                this.$popup.find('.swiper-slide button').removeClass('active');
                this.$popup.find('.swiper-slide').eq(row).find('button').eq(column).addClass('active');
            } else {
                if(this.defaults.optional){
                    index = row;
                }else{
                    index = row + 1;
                }

                $this.closest('.swiper-slide').addClass('active').siblings().removeClass('active');
            }

            this.data.selectedIndex = index;
            this.swiper.initialSlide = index;
            this.$el[0].selectedIndex = index;
            this.$el.trigger('change');

            setSelectText(this);

            if (this.callbackFn && $.isFunction(this.callbackFn)) {
                setTimeout(() => this.callbackFn(this.datas.list[index]));
            }

            this.closeMotion();
            this.$el.next('button').focus();
        });

        this.$popup.on(`click${this.eventId}`, '.btn-close-popup', (e) => {
            e.preventDefault();

            this.closeMotion();
            this.$el.next('button').focus();
        });

        this.$dimm.on(`click${this.eventId}`, (e) => {
            e.preventDefault();

            this.closeMotion();

        });
    }

    detachPopupEvents() {
        this.$popup && this.$popup.off(this.eventId);
        this.swiper && this.swiper.destroy();
    }

    destroy() {
        this.detachEvents();
        this.detachPopupEvents();
        this.swiper.destroy();
    }

    /**
     * 콜백 함수
     * @param {Function} fn 콜백 함수
     * @example
     *  var select = $('select').data('ui');
     *  select.callback(function(index){
     *      console.log('index', index);
     *  });
     */
    callback(fn) {
        this.callbackFn = fn;
    }

    get selectedIndex() {
        return this.data.selectedIndex;
    }

    get datas() {
        return this.data;
    }
}

export default PopupSelect;
