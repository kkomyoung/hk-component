import {pxToRem} from "../utils/util";
import {scrollTo} from "./simple.ui";
import {gsap, Power2} from "gsap";
import {a11yHideOtherContent, a11yShowOtherContent} from "./a11y.ui";

export function showNudge() {
    const $nudge = $('#nudge');
    const $quickNudge = $nudge.find('.quick-nudge');
    const $nudgeContent = $nudge.find('.nudge_content');
    const $btnPlus = $nudge.find('.btn-plus');
    const $btnTop = $('.btn-top');
    const $popupToast = $nudge.find('.popup-toast');
    const $nudgeList = $nudge.find('.list');
    const $nudgeListItems = $nudgeList.find('>li');
    const $nudgeDimm = $nudge.find('.dimm');
    const nudgePosition = $('#container .btns-area.ui-cta').height();
    $nudgeContent.css({bottom: pxToRem(nudgePosition + 20)});

    if($nudgeContent.length <= 0){
        return;
    }

    if($nudgeContent.hasClass('loaded')){
        return;
    }

    $nudgeContent.addClass('loaded');

    if ($popupToast.length > 0) {
        /*
         접근성: 버튼과 토스트 팝업 메시지를 WAI-ARIA 속성으로 연결하여
            버튼에 접근시, 버튼 명과 토스트 메시지 내용을 함께 읽을 수 있도록 함
         */
        $btnPlus.attr({'aria-describedby': 'ui-toast-pop'});
        $popupToast.attr({'id': 'ui-toast-pop'});

        gsap.set($popupToast, {display: 'flex', autoAlpha: 0});
        // const textWidth = $popupToast.find('.txt-help').width();
        const beforeHeight = $popupToast.height();
        // $popupToast.find('.txt-help').css({width: textWidth});
        gsap.set($popupToast, {xPercent: 40, autoAlpha: 0, overflow: 'hidden'});
        gsap.set($btnPlus, {display: 'inline-block', autoAlpha: 0});

        const tm = gsap.timeline();
        // tm.timeScale(0.2);
        tm.to($popupToast, {delay: 0.2, duration: 0.8, xPercent: 0, autoAlpha: 1, ease: Power2.easeOut});
        tm.to($popupToast, {delay: 3, duration: 0.8, xPercent: 0, width: beforeHeight, ease: Power2.easeOut});
        tm.to($popupToast, {delay: -0.4, duration: 0.2, autoAlpha: 0});

        tm.to($btnPlus, {delay: -0.8, duration: 0.3, autoAlpha: 1, ease: Power2.easeOut});

        $popupToast.on('click', function(e){
            tm.timeScale(100);
            $popupToast.off('click');
        });
    } else {
        $btnPlus[0] && gsap.set($btnPlus, {display: 'inline-block', autoAlpha: 1});
    }

    $btnPlus.on('click', (e) => {
        if (gsap.isTweening($nudgeDimm)) {
            return;
        }

        $btnTop.hide();

        const $this = $(e.currentTarget);

        if ($this.hasClass('active')) {
            a11yShowOtherContent($nudge);

            gsap.to($btnTop, {duration: 0.3, autoAlpha: 1, display: 'block'});
            if (scrollY > 300) {
                gsap.to($quickNudge, {duration: 0.3, bottom: $btnTop.outerHeight() + $btnTop.outerHeight() / 5});
            }

            gsap.to($nudgeListItems.toArray().reverse(), {
                duration: 0.3,
                stagger: 0.05,
                autoAlpha: 0,
                y: 20,
                ease: Power2.easeOut
            });
            gsap.to($this.find('.ico-bar'), {duration: 0.3, rotate: 0});
            gsap.to($nudgeDimm, {
                duration: 0.3, autoAlpha: 0, onComplete: () => {
                    $nudgeDimm.hide();
                    $nudgeList.hide();
                }
            });
            $this.removeClass('active');
        } else {
            a11yHideOtherContent($nudge);

            $nudgeList.show();

            gsap.set($nudgeListItems, {autoAlpha: 0, y: 20});
            gsap.to($nudgeListItems, {duration: 0.3, stagger: 0.05, autoAlpha: 1, y: 0, ease: Power2.easeOut});
            gsap.to($this.find('.ico-bar'), {duration: 0.3, rotate: 135});
            gsap.to($nudgeDimm, {duration: 0.3, autoAlpha: 0.6, display: 'block', onComplete: () => {
                    $nudgeList.find('button:eq(0)').focus();
                }});
            $this.addClass('active');
        }
    });

    $nudgeDimm.on('click', (e) => {
        $btnPlus.trigger('click');
    });

    $btnTop.on('click', (e) => {
        scrollTo(0);
    });

    $(window).on('scroll', (e) => {

        if (!$('#gnb').hasClass('open') && $btnTop.length > 0) {
            if (scrollY <= 300) {
                gsap.to($btnTop, {
                    duration: 0.3, autoAlpha: 0, onComplete: () => {
                        $btnTop.hide();
                    }
                });
            } else {
                if($btnPlus.hasClass('active')) {
                    return;
                }
                gsap.to($btnTop, {duration: 0.3, autoAlpha: 1, display: 'block'});
            }
        }

        if (!$('#gnb').hasClass('open') && $quickNudge.length > 0) {
            if (scrollY <= 300) {
                gsap.to($quickNudge, {duration: 0.3, bottom: 0});
            } else {
                gsap.to($quickNudge, {duration: 0.3, bottom: $btnTop.outerHeight() + $btnTop.outerHeight()/5});
            }
        }
    });
}