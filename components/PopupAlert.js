import {
    getAlertLayerBtnCancelTmpl,
    getAlertLayerBtnConfirmTmpl,
    getAlertLayerHeaderTmpl,
    getAlertLayerTmpl,
} from "./templates/html.template";
import Popup from "./base/Popup";
import {wait} from "../utils/util";
import {isVisible} from "smooth-scrollbar/geometry";


class PopupAlert {
    popupAlert;

    async open({header, content, btnCancel, btnConfirm, closeCallback}){
        this.popupAlert = new PopupAlertImpl();
        await this.popupAlert.open({header, content, btnCancel, btnConfirm, closeCallback});
    }
    
    close(){
        this.popupAlert && this.popupAlert.close();
    }
}

/**
 * PopupAlert
 */
class PopupAlertImpl extends Popup {
    constructor(el, options) {
        super('popupAlert', el);

        this.init(el, options);
    }

    init(el, options) {
        this.popupInit(el, options);
    }

    render() {

    }

    openMotion() {
        this.openCommonMotion({
            cancelMotion: false,
            callback: () => {

            }
        });
    }

    closeMotion(cb = () => {}) {
        this.closeCommonMotion({
            cancelMotion: false,
            callback: () => {
                this.accessClose();
                this.detachEvents();

                cb();
            }
        });
    }

    /*
    hkUI.alert.open({
        header: '1',
        content: '1',
        btnCancel: {
            text: 'cancel',
            fn: function(){console.log(1);}
        },
        btnConfirm: {
            text: 'ok',
            fn: function(){console.log(2);}
        }
    })

    hkUI.alert.open({
        header: '1',
        content: '1',
        btnCancel: {
            text: 'cancel',
            fn: function(){
                hkUI.alert.close();
            }
        },
        btnConfirm: {
            text: 'ok',
            fn: function(){
                hkUI.alert.close();
            }
        },
        closeCallback: function(){
            hkUI.alert.close();
        }
    })
     */
    async open({header, content, btnCancel, btnConfirm, closeCallback}) {
        this.btnCancelFn = btnCancel && btnCancel.fn;
        this.btnConfirmFn = btnConfirm && btnConfirm.fn;
        this.closeCallback = closeCallback;

        const headerHTML = getAlertLayerHeaderTmpl(header);
        const contentHTML = content;
        const btnCancelHTML = btnCancel && getAlertLayerBtnCancelTmpl(btnCancel.text);
        const btnConfirmHTML = btnConfirm && getAlertLayerBtnConfirmTmpl(btnConfirm.text);

        if ($('.popup-group .dimm').is(':visible')) {
            await wait(250);
        }

        if (this.$popupContainer.find('.ui-alert').length > 0) {
            await wait(250);
        }

        this.$popup = $(getAlertLayerTmpl(headerHTML, contentHTML, btnCancelHTML, btnConfirmHTML));
        this.$popupContainer.append(this.$popup);
        this.$popup.attr('data-id', this.uiId);

        this.attachEvents();
        this.openMotion();

    }

    close() {
        this.closeMotion(() => {
            this.detachEvents();
        });
    }

    closeCallbackAction() {
        if (this.closeCallback && $.isFunction(this.closeCallback)) {
            this.closeCallback();
        } else {
            this.closeMotion();
        }
    }

    attachEvents() {
        this.$popup.on(`click${this.eventId}`, (e) => {
            e.preventDefault();

            if (e.target === e.currentTarget) {
                this.closeCallbackAction();
            }
        });

        if (this.btnCancelFn) {
            this.$popup.on(`click${this.eventId}`, '.ui-cancel', () => {
                if (!this.closeCallback) {
                    this.close();
                }

                this.btnCancelFn();
            });
        }

        if (this.btnConfirmFn) {
            this.$popup.on(`click${this.eventId}`, '.ui-confirm', () => {
                if (!this.closeCallback) {
                    this.close();
                }

                this.btnConfirmFn();
            });
        }
    }

    detachEvents() {
        if (this.$popup) {
            this.$popup.off(this.eventId);
            this.$popup.remove();
            this.$popup = undefined;
        }
    }

    destroy() {
        this.detachEvents();
    }
}

export default PopupAlert;
