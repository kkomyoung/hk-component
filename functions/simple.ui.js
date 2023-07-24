import {getVideoSimpleLayerTmpl} from "../components/templates/html.template";
import gsap, {Linear, Power2, Power4} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {getjQueryEl, isAccessibleElement, pxToRem} from "../utils/util";
import commonUiList from "../common.ui.list";
import {Popup, PopupAlert} from "../components";

const $document = $(document);

export const isIOS = (/iPad|iPhone|iPod/.test(navigator.userAgent || navigator.vendor || window.opera) && !window.MSStream);
export const isMain = $('.acoma0101_m01, .acoma0101_m10, .ccoma0101_m01, .mcoma0101_m10').length > 0;
export const isGalaxyFold = !!navigator.userAgent.match(/sm-f9/ig);

export function refreshUI(force = false) {
    commonUiList.forEach((ui) => {
        $(ui.className).toArray().forEach((el) => {
            if (force || !$(el).data('ui')) {
                if($(el).hasClass('ui-alert')){
                    return;
                }
                if (!!$(el).data('ui')) {
                    $(el).data('ui').detachEvents();
                }
                const Class = ui.classObject;
                const options = {...$(el).data()};
                const uiInstance = new Class(el, options);
                $(el).data('ui', uiInstance);
            }
        });
    });
}

export function addClassGalaxyFold(){
    if(isGalaxyFold){
        $('html').addClass('galaxy-fold');
    }
}

//테스트 용
export function zoomTest() {
    $('.zoom-in').on('click', (e) => {
        hkUI.refreshUI();
        if ($('html').hasClass('zoom01')) {
            $('html').addClass('zoom02');
            $('html').removeClass('zoom01');
        } else if ($('html').hasClass('zoom02')) {
            $('html').addClass('zoom03');
            $('html').removeClass('zoom02');
        } else if ($('html').hasClass('zoom03')) {
            $('html').addClass('zoom03');
        } else {
            $('html').addClass('zoom01');
        }
    });

    $('.zoom-out').on('click', (e) => {
        hkUI.refreshUI();
        if ($('html').hasClass('zoom03')) {
            $('html').removeClass('zoom03');
            $('html').addClass('zoom02');

        } else if ($('html').hasClass('zoom02')) {
            $('html').removeClass('zoom02');
            $('html').addClass('zoom01');

        } else if ($('html').hasClass('zoom01')) {
            $('html').removeClass('zoom01');
        }
    });
}

export function hasCtaContainer() {
    const $btnsArea = $('.btns-area');
    const $container = $('#container');

    if ($btnsArea.hasClass('ui-cta')) {
        $container.addClass('has-cta');
    }

    if ($btnsArea.hasClass('ui-cta') && $btnsArea.hasClass('double')) {
        $container.removeClass('has-cta');
        $container.addClass('double-cta');
    }

    if ($btnsArea.hasClass('float')) {
        $container.addClass('double-cta');
    }

    if ($('#header').hasClass('empty')) {
        $('#content').css({paddingTop: 0});
    }
}

export function fixedHeader() {
    const $gnb = $('#gnb');
    const $header = $('#header');
    const $headTag = $('.head-tag');
    const headTagFixedPosition = $headTag.length > 0 ? $headTag.offset().top - $header.outerHeight() : '';

    function scrollHandler() {
        if (!$gnb.hasClass('open')) {
            // header
            if (scrollY === 0) {
                $header.removeClass('bg-white');
            } else {
                $header.addClass('bg-white');
            }

            // tag
            if (scrollY <= headTagFixedPosition) {
                $headTag.removeClass('fixed');
            } else {
                $headTag.addClass('fixed');
            }
        }
    }

    scrollHandler();

    $(window).on('scroll', scrollHandler);
}

export function progressStage() {
    const stepBox = $('.step-box');
    const stepToast = $('.step-toast');

    stepBox.each(function (index, item) {
        const $item = $(item);
        const stepDot = $item.find('.step-dot');
        const stepBar = $item.find('.step-bar');
        const stepLine = $item.find('.step-line');
        const dotLength = stepDot.length;
        const activeDotIndex = $item.find('.step-dot.active').index();
        const widthFullPercent = 100 / (dotLength - 1) * activeDotIndex;
        const accessText = `총 ${dotLength}단계 중 ${activeDotIndex + 1}단계 진행중`;

        stepBar.css({
            width: widthFullPercent + '%',
        });

        stepDot.each(function (index) {
            if (index < activeDotIndex) {
                stepDot.eq(index).addClass('on');
            }
        });

        stepLine.attr('aria-label', accessText);
    });

    if (stepToast.length > 0) {

        gsap.set(stepToast, {
            autoAlpha: 0, yPercent: -60
        });

        const tm = gsap.timeline();

        tm.to(stepToast, {autoAlpha: 1, yPercent: 0, delay: 0.3, duration: 0.5, ease: Power2.easeOut});
        // tm.to(stepToast, {yPercent: -18, duration: 0.16, ease: Power2.easeOut});
        // tm.to(stepToast, {yPercent: 10, duration: 0.1, ease: Power2.easeOut});
        // tm.to(stepToast, {yPercent: -8, duration: 0.1, ease: Power2.easeOut});
        // tm.to(stepToast, {yPercent: 0, duration: 0.1, ease: Power2.easeOut});
        tm.to(stepToast, {autoAlpha: 0, yPercent: -20, delay: 2.7, duration: 0.5, ease: Power2.easeOut});
    }
}

export function inputRange() {
    $document.on('change input', 'input[type=range]', function (e) {
        const $this = $(this);
        const value = $this.val();
        if ($this.closest('.input-range-wrap').length) {
            $this.css({background: `linear-gradient(to right, #f1108e 0%, #f1108e, ${value}%, rgba(0, 0, 0, 0) ${value}%, rgba(0, 0, 0, 0) 100%)`});
        }
    });
}

export function checkGroupBoxUI() {
    $document.on('change customChange', '.ui-check-el input[type=radio], .ui-check-el input[type=checkbox]', (e) => {
        const $this = $(e.currentTarget);

        if ($this.closest('.ui-check-item').length > 0) {
            $this.closest('.input-wrap-group').find('.ui-check-el input[type=radio], .ui-check-el input[type=checkbox]').each((idx, obj) => {
                if($(obj).is(':disabled')){
                    $(obj).closest('.ui-check-item').addClass('disabled');
                    return;
                }else{
                    $(obj).closest('.ui-check-item').removeClass('disabled');
                }

                if (obj.checked) {
                    $(obj).closest('.ui-check-item').addClass('checked');
                } else {
                    $(obj).closest('.ui-check-item').removeClass('checked');
                }
            });
        }
    });

    $document.on('click', '.ui-check-item', (e) => {
        const $target = $(e.target);

        if ($target.closest('.ui-check-el').length <= 0) {
            if (isAccessibleElement(e.target)) {
                const $radioOrCheck = $target
                    .closest('.ui-check-item')
                    .find('.ui-check-el input[type=radio], .ui-check-el input[type=checkbox]');

                if($radioOrCheck.is(':disabled')){
                    return;
                }

                if ($radioOrCheck.is(':radio')) {
                    if (!$radioOrCheck.prop('checked')) {
                        $radioOrCheck.prop({checked: true}).trigger('change click');
                    }
                } else {
                    if($radioOrCheck.attr('onclick')){
                        $radioOrCheck[0].click();
                    }else{
                        const checked = $radioOrCheck.is(':checked');
                        $radioOrCheck.trigger('click');
                        
                        if(checked === $radioOrCheck.is(':checked')){
                            $radioOrCheck.prop({checked: !$radioOrCheck.prop('checked')}).trigger('change');
                        }
                    }
                }
            }
        }
    });

    $document.find('input[type=radio], input[type=checkbox]').trigger('customChange');
}

export function guideOverflowTable() {
    $('.ui-overflow-scroll').each((idx, obj) => {
        if($(obj).find('table').width() > $(obj).width()){
            $(obj).find('.ico_scroll_x').show();
            $(obj).find('table').on('touchmove', (e) => {
                $(obj).find('.ico_scroll_x').fadeOut();
            });
        }
    });
}

export function scrollToSearchArea() {
    $('.search-reco').closest('.search-area').find('.in-message').on('focusin', 'input[type=text]', (e) => {
        scrollTo($(e.currentTarget).closest('.search-area'));
    });
}

export function setIframeContainer() {
    const $cpIframe = $('.cp-iframe');
    const $container = $cpIframe.closest('#container');
    const $content = $container.find('#content');
    const messageHeight = $container.find('.section .message-cp01').outerHeight(true);
    const iframeArea = `calc(100% - ${messageHeight}px)`;

    if ($cpIframe.length > 0) {
        $container.css({height: '100%'});
        $content.css({height: '100%'});
        $cpIframe.closest('.section').css({height: iframeArea});
    }
}

/**
 * scrollTo 공통 해당 위치로 스크롤
 * @param value {number | HTMLElement | selector | jQuery} scroll할 숫자 또는 htmlElement 또는 셀렉터스트링 또는 jQuery
 * @param withAnimation {boolean} 기본: true, 애니메이션 여부
 * @param withSticky {boolean} 기본: true, 해더등의 스티키 상황인지에 따라 top offset변경 됨
 *
 * @example
 * scrollTo(100);
 * scrollTo(document.getElementById('id');
 * scrollTo('.some-class');
 * scrollTo($('.some-class'));
 */
export function scrollTo(value, withAnimation = true, withSticky = true) {
    let scrollTop = value;

    if (typeof value !== 'number') {
        const $el = getjQueryEl(value);
        const header = $('#header');
        const stickyPopupHeader = $el.closest('.popup-content').siblings('.popup-header.sticky');

        scrollTop = $el.offset().top;

        if (withSticky) {
            if (stickyPopupHeader.length) {
                scrollTop -= stickyPopupHeader.outerHeight();
            } else if (header.length) {
                scrollTop -= header.outerHeight();
            }
            scrollTop -= 10;
        }
    }

    setTimeout(() => {
        $('html, body').animate({scrollTop}, withAnimation ? 500 : 0);
    }, 300);
}

export function setAccordionProduct() {
    //알아두실 사항
    const $prodcInfo = $('.ui-tab-content > .prodc_info .prodc_info');

    $prodcInfo.addClass('ui-accordion');
    $prodcInfo.attr('data-scroll', true);
    $prodcInfo.find('dl').addClass('ui-accordion-list');
    $prodcInfo.find('dt').addClass('ui-accordion-btn').attr({'aria-expanded': false, tabindex: 0, role: 'button'});

    hkUI.refreshUI();

    // 알아두실 사항 > 아코디언 내부 탭
    const $customTab = $('.custom-tab');

    $customTab.each((index, item) => {
        const $item = $(item);
        const $content = $item.find('.custom-tab-content');

        $content.eq(0).show();

        $item.find('.tab-link').on('click', (e) => {
            e.preventDefault();
            const $this = $(e.currentTarget);
            const $tabItem = $this.closest('.tab-item');
            const activeIndex = $tabItem.index();

            $item.find('.tab-item').removeClass('active');
            $tabItem.addClass('active');

            $content.hide();
            $content.eq(activeIndex).show();
            guideOverflowTable();
        });
    });

    guideOverflowTable();

}

export function setScrollbar() {
    // 스크롤바
    $('.scrollbar-outer').scrollbar();
    $('.scrollbar-inner').scrollbar();
}

export function scrollTrigger(obj, options) {
    const _options = $.extend({
        trigger: obj,
        start: 'top-=50px bottom',
        end: 'bottom top',
        onEnter: function (st) {
            const $trigger = $(st.trigger);
            if ($trigger.hasClass('ui-animation')) {
                return;
            }
            $trigger.addClass('ui-animation');

            if (options.onEnterAction && $.isFunction(options.onEnterAction)) {
                options.onEnterAction();
            }
        },
        markers: false
    }, options);

    ScrollTrigger.create(_options);
}

export function headerBackBtn() {
    const $header = $('#header');
    let btnPrevCallback;
    $header.data('ui', {
        btnPrevCallback: (callback) => {
            btnPrevCallback = callback;
        }
    }).on('click', '.prev', () => {
        if (btnPrevCallback && $.isFunction(btnPrevCallback)) {
            btnPrevCallback();
        } else {
            history.back();
        }
    });
}

export function openVideoPopup(){
    const $videoBtn = $('.video-btn');

    $videoBtn.on('click', function(){
        $('.popup-dialog[data-type="video"]').remove();

        const $this = $(this);
        const videoSrc = $this.data('src');
        $('.popup-group').append(getVideoSimpleLayerTmpl(videoSrc));

        setTimeout(function(){
            hkUI.refreshUI();
            $('.popup-dialog[data-type="video"]').data('ui').open();
        });
    });
}


export function setRoulette(){
    const $roulette = $('.ui-roulette');

    $roulette.data('ui', {
        setRotate: (index) => {
            const tm = gsap.timeline();
            tm.to('.roulette-board', {duration: 0.3, rotate: 360, repeat: 3, ease: Linear.easeNone});
            tm.to('.roulette-board', {duration: 5, rotate: 360*3+(60*index+30), ease: Power4.easeOut});
        }
    });
}

export function setActivePosition($scrollEl, $activeEl, margin = 50){
    const currentScrollLeft = $scrollEl[0].scrollLeft;
    const activeLeft = $activeEl.position().left;

    // $scrollEl[0].scroll({
    //     left: currentScrollLeft + activeLeft - margin,
    //     behavior: 'smooth'
    // });

    // $scrollEl.animate({scrollLeft: currentScrollLeft + activeLeft - margin}, 500);
    // $scrollEl[0].scrollLeft = currentScrollLeft + activeLeft - margin;

    gsap.to($scrollEl, {scrollLeft: currentScrollLeft + activeLeft - margin, duration: 0.5, ease: Power2.easeInOut});
}

export function checkAttendance(){
    const $stamp = $('.today-stamp-wrap');

    $stamp.data('ui', {
        setDefault: (index) => {
            $stamp.find('.stamp li').removeClass('on').slice(0, index).addClass('on');
        },
        setNew: () => {
            const index = $stamp.find('.stamp li.on:last').index() + 1;
            const $stampMotion = $('.stamp-motion');
            const $stampMotionImg = $stampMotion.find('img');
            const $currentObj = $stamp.find('.stamp li').eq(index);

            if(index === 4){
                $stampMotion.removeClass('complete');

                $stampMotionImg.each((idx, obj) => {
                    $(obj).attr({src: $(obj).attr('src').replace(/\d{2}/, '02')});
                });
            }else if(index === 9){
                $stampMotion.addClass('complete');

                $stampMotionImg.each((idx, obj) => {
                    $(obj).attr({src: $(obj).attr('src').replace(/\d{2}/, '03')});
                });
            }else{
                $stampMotion.removeClass('complete');

                $stampMotionImg.each((idx, obj) => {
                    $(obj).attr({src: $(obj).attr('src').replace(/\d{2}/, '01')});
                });
            }

            const left = pxToRem($currentObj.position().left);
            const top = pxToRem($currentObj.position().top);

            $stampMotion.css({left, top});
            const $motion1 = $stampMotion.find('.motion-1');
            const $motion2 = $stampMotion.find('.motion-2');

            gsap.set($motion1, {autoAlpha: 0, display: 'block', scale: 1.5});
            gsap.set($motion2, {autoAlpha: 0, display: 'block'});

            const tm = gsap.timeline();
            tm.to($motion1, {duration: 0.8, autoAlpha: 1, scale: 0.63, ease: 'Power2.easeIn', onComplete: () => {
                    $currentObj.addClass('on');
                }}, 0);
            tm.to($motion1, {duration: 0.5, autoAlpha: 0}, 0.9);
            tm.to($motion2, {duration: 0.2, autoAlpha: 1}, 0.8);
            tm.to($motion2, {duration: 0.3, autoAlpha: 0}, 1);
        }
    });
}

export function setMainSwiper(){
    if(!isMain) return;

    setMainSwiperFunction('.wrap-popular-product');
    setMainSwiperFunction('.wrap-life');

    function setMainSwiperFunction(selector){
        const $el = $(selector);

        if($el.length <= 0){
            return;
        }

        const $swiper = $el.find('.ui-swiper');
        const tagList = $swiper.find('.swiper-slide:not(.swiper-slide-duplicate)').toArray().reduce((prev, current, i) => {
            const tag = $(current).data('tag');
            if(prev.length <= 0 || prev[prev.length - 1].value !== tag){
                prev.push({index: i, value: tag});
            }

            return prev;
        }, []);

        $swiper.data('ui').swiper.on('slideChange', function(){
            const tag = $(this.slides[this.activeIndex]).data('tag');
            const $activeTag = $el.find(`button[data-tag="${tag}"]`);

            setTagActive($activeTag);
        });

        $el.on('click', '.box-tag button.tag', function(){
            const $activeTag = $(this);
            const tagName = $activeTag.data('tag');
            const foundTagName = tagList.find((o) => o.value === tagName);
            if(!foundTagName){
                alert('태그에 해당하는 슬라이드 요소는 필수입니다!');
                return;
            }
            const slideIndex = foundTagName.index;

            $swiper.data('ui').swiper.slideToLoop(slideIndex);

            setTagActive($activeTag);
        });

        function setTagActive($activeTag){
            $activeTag.addClass('active').siblings().removeClass('active');
            setActivePosition($el.find('.tag-container'), $activeTag);
        }
    }
}

export function setFixedCTA(bool = true){
    const $uiCTA = $('.ui-cta');

    $uiCTA.each((idx, obj) => {
        const $obj = $(obj);

        if(bool){
            $obj.removeClass('relative');
        }else{
            $obj.addClass('relative');
        }
    });
}

export function setToolbarByScrollUpDown(){
    let prevSt = Number.MAX_SAFE_INTEGER;
    let toolbarScrollTimer = -1;
    let st, distance;

    const $window = $(window);
    const $toolbar = $('#toolbar');
    const $toolbarHeight = pxToRem($toolbar.outerHeight());
    const $nudgeContent = $('.nudge_content');

    if($toolbar.length <= 0){
        return;
    }

    $window.on('scroll', function(e){
        st = window.scrollY;
        distance = Math.abs(prevSt - st);

        if(toolbarScrollTimer !== -1){
            return;
        }
        if(distance < 50){
            clearTimeout(toolbarScrollTimer);
            return;
        }

        toolbarScrollTimer = setTimeout(() => {
            clearTimeout(toolbarScrollTimer);
            toolbarScrollTimer = -1;

            if($toolbar.length > 0){
                if(st > prevSt){
                    gsap.to($toolbar, {duration: 0.3, y: $toolbarHeight});
                    $toolbar.attr('aria-hidden', true);
                }else{
                    gsap.to($toolbar, {duration: 0.3, y: '0rem'});
                    $toolbar.removeAttr('aria-hidden');
                }
            }

            if($nudgeContent.length > 0){
                if(st > prevSt){
                    gsap.to($nudgeContent, {duration: 0.3, y: $toolbarHeight});
                }else{
                    gsap.to($nudgeContent, {duration: 0.3, y: '0rem'});
                }
            }

            prevSt = st;
        }, 300);
    });
}



export function countUpMainLoan(){
    if(!isMain){
        return;
    }

    $('.price.loading .loading-placeholder').toArray().forEach((el) => {
        $(el).text('100,000');

        let timer = setInterval(() => {
            if(!$(el).closest('.price').hasClass('loading')){
                clearInterval(timer);
                $(el).hide().siblings('.data').show();
            }
            const rndNo = getRndNumber()+'';
            $(el).text(rndNo.substr(0, 3) + ',' + rndNo.substr(3, 3));
        }, 70);
    });
}

function getRndNumber(){
    return Math.floor(Math.random()*899999+100000);
}

export function changeIOSMetaTag(){
    if(isIOS){
        $('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no');
    }
}

// http://localhost:8888/html/mycontract/mypa/long/cmcpa0101_l13.html
export function onceUsedCardSale(){

    const $el = $('.info-list-tp01 .list-pre');
    if($el.length <= 0){
        return;
    }

    if($('.info-list-tp01').hasClass('loaded')){
        return;
    }

    let listContent = $el.text().trim();
    let html = '';

    listContent = listContent.split('\n').map((line) => line.trim()).join('\n');

    const a = listContent.split('\n\n\n').map((b) => {
        return b.split('\n\n').map((c) => c.split('\n').map((d) => d.trim()));
    });

    html = a.map((b) => {
        const bWrap = b.map((c) => {
            if(Array.isArray(c)){
                const cWrap =  c.map((d, i) => {
                    if(i === 0){
                        return `<div class="info-list-pre-title">${d}</div>`;
                    }else{
                        return `<div class="info-list-pre-desc">${d}</div>`;
                    }
                }).join('');

                return `<div class="info-list-pre-item">${cWrap}</div>`;
            }
            return `<div class="info-list-pre-item">${c}</div>`;
        }).join('');

        return `<div class="info-list-pre-list">${bWrap}</div>`;
    }).join('');

    $('.info-list-tp01').prepend(`<div>${html}</div>`);
    $('.info-list-tp01').addClass('loaded');
}

export function getActivePopup(){
    console.log(Popup.arrPopup);
}