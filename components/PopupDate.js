import {getBottomDateLayerTmpl,} from "./templates/html.template";
import Popup from "./base/Popup";

/**
 * PopupDate
 */
class PopupDate extends Popup {
    defaults = {
        type: 'date'
    };
    $datepicker;
    customDatepickerOptions = {}

    constructor(el, options) {
        super('popupDate', el);

        this.init(el, options);
    }

    init(el, options) {
        this.popupInit(el, options);

        this.detachEvents();
        this.attachEvents();
    }

    update(datepickerOptions = {}) {
        this.detachPopupEvents();
        if (!this.$popup) {
            return;
        }

        const defaultDate = this.$el.val();
        this.$datepicker = this.$popup.find('.ui-datepicker').datepicker('destroy').datepicker({
            defaultDate,
            ...this.customDatepickerOptions
        });

        this.attachPopupEvents();
    }

    setOption(datepickerOptions = {}) {
        this.customDatepickerOptions = datepickerOptions;
    }

    render() {
        if (!this.$popup) {
            const title = this.$el.data('title');

            this.$popup = $(getBottomDateLayerTmpl(this.defaults.type, title));
            this.$popupContainer.append(this.$popup);
            this.$popup.attr('data-id', this.uiId);

            this.update();
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
                    this.$el.next('button').length && this.$el.next('button').focus();
                }
            }
        );
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
        this.$el.on(`click${this.eventId}`, (e) => {
            if($(e.currentTarget).closest('.hide-btn').length === 0) {
                this.render();
            }
        });

        this.$el.next('.btn_cal').on(`click${this.eventId}`, (e) => {
            this.render();
        });
    }

    detachEvents() {
        this.$el.off(this.eventId);
        this.$el.next('.btn_cal').off(this.eventId);
    }

    attachPopupEvents() {
        this.$popup.on(`click${this.eventId}`, '.popup-footer button', (e) => {
            e.preventDefault();

            this.$el.val(this.$datepicker.val());
            this.closeMotion();
        });

        this.$popup.on(`click${this.eventId}`, (e) => {
            e.preventDefault();

            if (e.target === e.currentTarget) {
                this.closeMotion();
            }
        });

        this.$popup.on(`click${this.eventId}`, '.btn-close-popup', (e) => {
            e.preventDefault();

            this.closeMotion();
        });

        this.$dimm.on(`click${this.eventId}`, (e) => {
            e.preventDefault();

            this.closeMotion();
        });
    }

    detachPopupEvents() {
        this.$popup && this.$popup.off(this.eventId);
    }

    destroy() {
        this.detachEvents();
        this.detachPopupEvents();
    }
}

export default PopupDate;
