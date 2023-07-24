import {Circ, gsap, Power2} from 'gsap';
import {scrollTo} from "./simple.ui";

export function useGnb() {
    let $menuBtn, $container, $gnbDimm, $gnb, $gnbHeader, $uiTab, $gnbClose, $gnbMenu, $categoryWrap, $depth2List;

    // 스크롤 위치 저장
    let savedContainerScrollY;
    let savedGnbScrollY;
    let isFirst = true;

    function init() {
        $menuBtn = $('.ico-menu').closest('.menu');

        if($menuBtn.length <= 0 || $menuBtn.hasClass('loaded')){
            return;
        }

        $container = $('#container');
        $gnbDimm = $('.gnb_dimm');
        $gnb = $('#gnb');
        $gnbHeader = $gnb.find('.gnb-header');
        $uiTab = $gnbHeader.find('.ui-tab');
        $gnbClose = $gnb.find('.btn-close');
        $gnbMenu = $gnb.find('.gnb-menu');
        $categoryWrap = $gnb.find('.category-wrap');
        $depth2List = $gnbMenu.find('.depth02-list');

        // 접근성관련 : .depth02-btn 버튼역할에만 aria 속성 추가
        $('.depth02-btn').each(function () {
            if ($(this).attr('href') === '#none') {
                $(this).attr('role', 'button');
                $(this).attr('aria-expanded', false);
            }
        });

        $('.depth02-list.active').find('.depth03-wrap').show();
        $('.depth02-list.active').find('.depth02-btn').attr('aria-expanded', true);

        attachEvents();

        $menuBtn.addClass('loaded');

    }

    function attachEvents() {
        $menuBtn.on('click', () => {
            savedContainerScrollY = scrollY;

            openGnbMotion();
            $gnb.find('.gnb-title').focus();

            $(window).on('scroll.gnb', function () {
                if (!$gnb.hasClass('gnb-footer')) {
                    if (scrollY >= $('.gnb-service').offset().top - $('.utils-wrap').outerHeight()) {
                        $gnbHeader.addClass('fixed');
                        if (!$gnb.hasClass('gnb-footer')) {
                            $uiTab.data('ui').update();
                        }

                    } else if (scrollY < $gnbMenu.offset().top - 140) {
                        $gnbHeader.removeClass('fixed');
                    }
                }

                if ($uiTab.length > 0) {
                    setTimeout(function () {
                        tabFocus();
                    }, 100);
                }

            });

            setTimeout(function () {
                if (isFirst && $('.depth02-list.active').length > 0 ) {
                    scrollToActiveMenu();
                }
            }, 600);
        });

        $gnbClose.on('click', () => {
            closeGnbMotion();
        });

        $depth2List.on('click', '.depth02-btn', (e) => {
            const $this = $(e.currentTarget);
            const categoryIndex = $this.closest('.category-wrap').index();

            if ($this.attr('href') === '#none') {
                e.preventDefault();

                $('.depth02-btn').attr('aria-expanded', false);
                $this.attr('aria-expanded') === 'false' ? $this.attr('aria-expanded', 'true') : $this.attr('aria-expanded', 'false');
            }

            if (!$gnb.hasClass('gnb-footer')) {
                $uiTab.data('ui').open(categoryIndex);
            }


            if ($this.closest('.depth02-list').hasClass('active')) {
                closeList();
            } else {
                closeList();
                openList($this);
            }
        });

        $uiTab.on('click', '.tab-link', function (e) {
            e.preventDefault();
            const $this = $(e.currentTarget);
            const index = $this.closest('.tab-item').index();

            scrollToCategory(index);
        });
    }

    // gnb 최초 오픈 시 active 된 리스트로 스크롤 이동
    function scrollToActiveMenu() {
        const activeMenu =
            $gnb.hasClass('gnb-footer') ?
                $('.depth02-list.active').offset().top - $('.depth01').outerHeight() * 2 :
                $('.depth02-list.active').offset().top - $('.utils-wrap').outerHeight() * 2;
        const duration = (activeMenu / $gnb.outerHeight()) + 0.2;

        if ($gnb.hasClass('open')) {
            gsap.to($('html, body'), {
                scrollTop: activeMenu, duration, ease: Circ.easeInOut
            });
        }

        isFirst = false;
    }

    // tab 버튼 active
    function tabFocus() {
        let focusIndex;
        $categoryWrap.each(function (index) {
            if (scrollY >= $categoryWrap.eq(index).offset().top - $gnbHeader.outerHeight() - $depth2List.outerHeight()) {
                focusIndex = index;
            }
        });

        if (focusIndex == $uiTab.find('li.active').index()) { focusLastCategory(); return false; }

        $uiTab.data('ui').open(focusIndex);
        focusLastCategory();
    }

    // 마지막 메뉴 카테고리 tab 버튼 active
    function focusLastCategory() {
        const categoryWrapLength = $categoryWrap.length - 1;
        if (scrollY + $(window).height() === $(document).height()) {
            $uiTab.data('ui').open(categoryWrapLength);
        }
    }

    // 스크롤이동
    function scrollToCategory(index) {
        const position = $('.category-wrap').eq(index).offset().top - $gnbHeader.outerHeight();

        scrollTo(position);
    }

    // 메뉴 리스트 열고 닫기
    function openList(target) {
        target.closest('.depth02-list').addClass('active');
        target.next('.depth03-wrap').stop().slideDown(250);
    }

    function closeList() {
        $depth2List.removeClass('active');
        $gnbMenu.find('.depth03-wrap').stop().slideUp(250);
    }


    // gnb 전체 열고 닫기 모션
    function openGnbMotion() {
        const gsapTm = gsap.timeline();

        $gnb.addClass('open');
        $container.css({position: 'fixed', top: -scrollY});
        $container.attr('aria-hidden', true);

        gsap.set($gnb, {display: 'block'});

        gsapTm.fromTo($gnbDimm,
            {autoAlpha: 0},
            {
                autoAlpha: 0.7, duration: 0.3, ease: Power2.easeInOut,
                onComplete: () => {
                    setTimeout(() => {
                        $gnb.css({top: 0});
                        $(window).scrollTop(savedGnbScrollY);
                    });
                }
            }
        )
            .to($gnb,
                {
                    position: 'relative', left: 0, delay: -0.2, duration: 0.3, ease: Power2
                        .easeInOut,
                    onComplete: () => {

                        $gnbHeader.css({position: 'fixed', top: 0});
                        $gnbDimm.css({backgroundColor: '#fff', opacity: 1});
                        $('#nudge').css({opacity: 0});

                        $(window).on('scroll', function () {
                            isFirst = false;
                        });
                    }
                }
            );
    }

    function closeGnbMotion() {
        if($menuBtn.length <= 0 || !$menuBtn.hasClass('loaded')){
            return;
        }

        const gsapTm = gsap.timeline();

        savedGnbScrollY = scrollY;

        $(window).off('scroll.gnb');
        $menuBtn.focus();

        //scrollToActiveMenu 중단
        gsap.killTweensOf($('html, body'));

        $gnb.removeClass('open');
        $(window).scrollTop(savedContainerScrollY);
        $container.removeAttr('style');
        $container.attr('aria-hidden', false);
        $('#nudge').css({opacity: 1});
        $gnb.css({top: -savedGnbScrollY});
        $gnbHeader.css({position: 'absolute', top: savedGnbScrollY});
        $gnbDimm.css({backgroundColor: '#000', opacity: 0.7});

        gsapTm.to($gnb,
            {position: 'fixed', left: '100%', duration: 0.3, ease: Power2.easeInOut}
        )
            .to($gnbDimm,
                {
                    autoAlpha: 0, delay: -0.2, duration: 0.3, ease: Power2.easeInOut,
                    onComplete: () => {
                        $gnb.css({display: 'none'});

                    }
                }
            );
    }

    return {
        closeGnbMotion,
        init
    };
}