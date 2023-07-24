import UI from "./UI";
import {gsap, Power0} from 'gsap';
import {onceUsedCardSale, scrollTo} from "../../functions/simple.ui";
import {a11yHideOtherContent, a11yShowOtherContent} from "../../functions/a11y.ui";

/**
 * 팝업류의 추상클래스이다. PopupAlert, PopupExternal, PopupSelect의 공통이 정의되어있다.
 */
class Popup extends UI {
    static zIndex = 150;    // 팝업의 기본 z-index
    static arrPopup = [];   // 다중팝업일 경우 순서대로 배열로 쌓인다.
    $popupContainer;        // popup의 컨테이너(.popup-group)
    $dimm;                  // 팝업에서만 쓰는 딤드
    $popup;

    static loadInit(){
        // .popup-group이 없을 경우 생성해준다.
        if (!$('#wrap').find('.popup-group')[0]) {
            $('#wrap').append(`<div class="popup-group"></div>`);
        }
    }

    /**
     * 팝업의 초기화시(init) popupInit을 호출하여 기본 골격을 구성하게 된다.
     * @param el        {HTMLElement}   html element
     * @param options   {object}        옵션
     */
    popupInit(el, options) {
        this.$popupContainer = this.$wrap.find('.popup-group');

        // .dimm이 없을 경우 생성해준다.
        if (!this.$popupContainer.find('.dimm')[0]) {
            this.$popupContainer.append(`<div class="dimm"></div>`);
        }
        this.$dimm = this.$popupContainer.find('.dimm');

        if (options) {
            this.defaults = {...this.defaults, ...this.parseOptions(options)};
        }
    }

    /**
     *
     * @param cancelMotion  {boolean}   true일 경우 팝업 애니메이션의 시간을 0초로 한다.
     * @param callback      {function}  팝업 애니메이션이 끝난 후의 콜백함수
     */
    openCommonMotion({cancelMotion, callback}) {
        // 팝업을 열기 전의 스크롤 값을 저장해놓는다.
        this.savedScrollY = scrollY;
        // 팝업이 열릴 경우 #container의 position를 fixed로 변경하여 내부스크롤을 쓰지 않고 문서의 스크롤을 쓴다.
        // this.$container.css({position: 'fixed', top: -scrollY});
        this.$body.css({overflow: 'hidden'});

        this.removeDuplicateDimm();

        const gsapTm = gsap.timeline();
        if (cancelMotion) {
            gsapTm.timeScale(100);
        }

        const dimmZindex = this.dimmZIndex;
        const popupZIndex = this.popupZIndex;

        gsap.killTweensOf(this.$dimm);
        // 열려있는 팝업이 없을 경우엔 dimm을 애니메이션 시키고 아닐경우 z-index만 조정해준다.
        if (this.popupLength === 0) {
            gsapTm.fromTo(this.$dimm,
                {display: 'block', autoAlpha: 0, zIndex: dimmZindex},
                {duration: 0.2, autoAlpha: 0.7},
                0);
        } else {
            this.$dimm.css({zIndex: popupZIndex - 1});
        }

        if ($('.popup-group').attr('aria-hidden') === 'true') {
            $('.popup-group').removeAttr('aria-hidden');
        }

        gsapTm.fromTo(this.$popup,
            {display: 'flex', autoAlpha: 0, yPercent: 3, zIndex: popupZIndex},
            {
                duration: 0.2, autoAlpha: 1, yPercent: 0, ease: Power0.easeOut,
                onStart: () => {
                    this.$popup.scrollTop(0);
                },
                onComplete: () => {
                    this.$popup.css({transform: 'none'});

                    callback && callback();
                    this.openCommonAction();
                }
            },
            0);

        // this.$window.scrollTop(0);
        if (this.popupLength === 0) {
            this.accessOpen();
        }
    };

    closeCommonMotion({cancelMotion, callback}) {
        this.closeCommonAction();
        if (!this.$popup) {
            return;
        }

        const gsapTm = gsap.timeline();

        if (cancelMotion) {
            gsapTm.timeScale(100);
        }

        gsap.killTweensOf(this.$dimm);
        if (this.popupLength === 0) {
            gsapTm.to(this.$dimm, {delay: 0, duration: 0.2, autoAlpha: 0}, 0);
        } else {
            const lastPopupZIndex = Popup.arrPopup[Popup.arrPopup.length - 1].css('z-index');
            this.$dimm.css({zIndex: lastPopupZIndex - 1});
        }

        gsapTm.to(this.$popup, {
            duration: 0.1, autoAlpha: 0, yPercent: 1, ease: Power0.easeOut, onComplete: () => {
                gsap.set(this.$popup, {display: 'none'});

                if (this.popupLength === 0) {
                    this.$body.removeAttr('style');
                }

                // this.$window.scrollTop(this.savedScrollY);
                //scrollTo(this.savedScrollY);

                callback && callback();
            }
        }, 0);

        if (this.popupLength === 0) {
            this.accessClose();
        }
    };

    openCommonAction() {
        Popup.arrPopup.push(this.$popup);

        // http://localhost:8888/html/mycontract/mypa/long/cmcpa0101_l13.html
        onceUsedCardSale();

        hkUI.refreshUI();
        // 팝업 접근성: 팝업 내의 h1요소에 role=text tabindex=0속성 추가 후 초첨 이동 제공
        if (this.$popup.find('.popup-container>.ui-popup-pointer').length <= 0) {
            let headerText = '팝업 시작';
            if (this.$popup.find('h1').length > 0) {
                headerText = this.$popup.find('h1').text();
            }

            this.$popup.find('.popup-container').prepend(`<div class="ui-popup-pointer hide-txt" role="text" tabindex="0">${headerText}</div>`);
        }
        this.$popup.find('.ui-popup-pointer').focus();
    }

    closeCommonAction() {
        const index = Popup.arrPopup.findIndex((popup) => {
            return popup.data('id') === this.$popup.data('id');
        });

        if(index >= 0){
            Popup.arrPopup.splice(index, 1);
        }

    }

    removeDuplicateDimm(){
        const $dimm = this.$popupContainer.find('.dimm');
        if($dimm.length > 1){
            $dimm.slice(1, $dimm.length).remove();
        }
    }

    accessOpen() {
        a11yHideOtherContent(this.$popupContainer);
    }

    accessClose() {
        if (this.popupLength === 0) {
            if ( $('.nudge_content .list').is(':visible') ) {
                a11yHideOtherContent($('#nudge'));
            } else {
                a11yShowOtherContent(this.$popupContainer);
            }
        }
    }

    get dimmZIndex() {
        return this.popupZIndex - 1;
    }

    get popupZIndex() {
        Popup.zIndex += 5;

        return Popup.zIndex;
    }

    get popupLength() {
        return Popup.arrPopup.length;
    }
}

export default Popup;
