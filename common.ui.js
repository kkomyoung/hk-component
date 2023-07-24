import './libs/jquery.scrollbar.min';
import './libs/jquery-ui.min';
import './libs/datepicker-ko';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SwiperCore, {Navigation, Pagination, Scrollbar, HashNavigation, A11y} from 'swiper/core';

import commonUiList from "./common.ui.list";
import {
    Popup,
    PopupAlert
} from "./components";

import {
    zoomTest,
    scrollTo,
    setAccordionProduct,
    setScrollbar,
    checkGroupBoxUI,
    guideOverflowTable,
    setIframeContainer,
    hasCtaContainer,
    fixedHeader,
    inputRange,
    progressStage,
    openVideoPopup,
    scrollToSearchArea,
    refreshUI,
    headerBackBtn,
    setRoulette,
    checkAttendance,
    setMain,
    setMainPopularProduct,
    setMainSwiper,
    setToolbarByScrollUpDown,
    setFixedCTA, countUpMainLoan, changeIOSMetaTag, onceUsedCardSale, addClassGalaxyFold
} from "./functions/simple.ui";
import {useGnb} from "./functions/gnb.ui";
import {showNudge} from "./functions/nudge.ui";
import './utils/jquery.hook';
import DrawSVGPlugin from "./libs/gsap/DrawSVGPlugin";
import dev from './utils/test.dev';
import {a11yValidateError} from "./functions/a11y.ui";
import {productAnimationInit} from "./functions/product.animation";
import headerInit from "./functions/header.ui";

// swiper lib init
SwiperCore.use([Navigation, Pagination, Scrollbar, HashNavigation, A11y]);

// gsap init
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(ScrollTrigger);

window.gsap = gsap;
let hkUI = {};

const gnb = useGnb();

const alert = new PopupAlert();
hkUI = {
    alert,
    Popup,
    // refresh ui
    refreshUI,
    // simple ui
    // 단독으로도 쓰이고 재사용도 되는 함수
    scrollTo,
    a11yValidateError,
    setFixedCTA,
    fixedHeader,
    guideOverflowTable,
    hasCtaContainer,
    productAnimationInit,
    showGnb: gnb.init,
    hideGnb: gnb.closeGnbMotion,
    showNudge,
    setAccordionProduct
};

window.hkUI = hkUI;

function init(){
    Popup.loadInit();

    refreshUI();

    // 페이지 초기에 init 되는 함수
    zoomTest();
    checkAttendance();
    checkGroupBoxUI();
    fixedHeader();
    guideOverflowTable();
    setIframeContainer();
    headerBackBtn();
    hasCtaContainer();
    headerInit();
    inputRange();
    productAnimationInit();
    progressStage();
    setAccordionProduct();
    setScrollbar();
    setRoulette();
    gnb.init();
    showNudge();
    openVideoPopup();
    scrollToSearchArea();

    countUpMainLoan();

    setMainSwiper();
    setToolbarByScrollUpDown();

    changeIOSMetaTag();
    onceUsedCardSale();

    addClassGalaxyFold();
}

init();


location.href.indexOf('check-ui') > -1 || location.href.indexOf('localhost') > -1 || location.href.indexOf(':8888') > -1 ? dev() : function(){};
