import Popup from "./base/Popup";
import {pxToRem} from "../utils/util";

/**
 * PopupExternal
 */
class PopupExternal extends Popup {
    constructor(el, options) {
        super('popupExternal', el);

        this.init(el, options);
    }

    init(el, options) {
        this.popupInit(el, options);

        this.render();
        this.detachEvents();
        this.attachEvents();
        this.changePaddingBottom();
    }

    update() {
        this.detachPopupEvents();
        this.attachPopupEvents();
    }

    render() {
        if (!this.$popup) {
            this.$popup = this.$el;
            this.$el = undefined;
            this.$popup.attr('data-id', this.uiId);

            this.update();
        }
    }

    changePaddingBottom() {
        const $popupFooter = this.$popup.find('.popup-footer.fixed');
        const $popupContent = this.$popup.find('.popup-content');
        const popupFooterHeight = $popupFooter.outerHeight();

        if ($popupFooter.length) {
            $popupContent.css({paddingBottom: pxToRem(popupFooterHeight)});
        }
    }

    openMotion(cancelMotion) {
        this.openCommonMotion({
            cancelMotion,
            callback: () => {
                this.changePaddingBottom();
            }
        });
    }

    closeMotion(cancelMotion) {
        this.closeCommonMotion({
            cancelMotion,
            callback: () => {

            }
        });
    }

    open(cancelMotion = false) {
        this.openMotion(cancelMotion);
    }

    close(cancelMotion = false) {
        this.closeMotion(cancelMotion);
    }

    beforeCloseCallback(callback) {
        this.closeCallback = callback;
    }

    closeCallbackAction() {
        if (this.closeCallback && $.isFunction(this.closeCallback)) {
            this.closeCallback();
        } else {
            this.closeMotion();
        }
    }

    attachPopupEvents() {
        this.$popup.on(`click${this.eventId}`, (e) => {
            if (e.target === e.currentTarget) {
                this.closeCallbackAction();
            }
        });

        this.$popup.on(`click${this.eventId}`, '.btn-close-popup', (e) => {
            e.preventDefault();

            this.closeCallbackAction();
        });

        this.$dimm.on(`click${this.eventId}`, (e) => {
            e.preventDefault();

            this.closeCallbackAction();
        });

        this.$popup.on(`scroll${this.eventId}`, (e) => {
            if (this.$popup[0].scrollTop === 0) {
                this.$popup.find('.btn-close-popup').removeClass('scroll');
            } else {
                this.$popup.find('.btn-close-popup').addClass('scroll');
            }
        });

        //ScrollTrigger;
    }

    detachPopupEvents() {
        this.$popup.off(this.eventId);
        this.swiper && this.swiper.destroy();
    }

    destroy() {
        this.detachEvents();
        this.detachPopupEvents();
        this.swiper.destroy();
    }
}

export default PopupExternal;
