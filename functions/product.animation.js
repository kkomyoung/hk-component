import {scrollTrigger} from "./simple.ui";
import gsap, {Power2} from "gsap";

let strPageNames, arrPageNames;

export function productAnimationInit(seq) {
    // strPageNames = `
    //     cpdis0001_m10 cpdis0001_m11 cpdis0001_m12 cpdis0001_m13 cpdis0001_m14 cpdis0001_m15 cpdis0001_m16 cpdis0001_m17
    //     cpdis0101_m01 cpdis0102_m01 cpdis0201_m01 cpdis0202_m01 cpdis0203_m01
    //     cpdis0204_m01 cpdis0301_m01 cpdis0302_m01 cpdis0303_m01 cpdis0304_m01
    //     cpdis0305_m01 cpdis0306_m01 cpdis0307_m01 cpdis0308_m01 cpdis0309_m01
    //     cpdis0310_m01 cpdis0311_m01 cpdis0401_m01 cpdis0501_m01 cpdis0601_m01
    //     cpdis0602_m01 cpdis0603_m01 cpdis0604_m01 cpdis0605_m01 cpdis0606_m01
    //     cpdis0701_m01 cpdis0702_m01 cpdis0703_m01 cpdis0803_m01 cpdis0804_m01
    // `;

    strPageNames = `
        cpdis0001_m10_____0
        cpdis0001_m11_____0
        cpdis0001_m12_____0
        cpdis0001_m13_____0
        cpdis0001_m14_____0
        cpdis0001_m15_____0
        cpdis0001_m16_____0
        cpdis0001_m17_____0

        cpdis0101_m01_____49 cpdis0102_m01_____35 cpdis0201_m01_____39 cpdis0202_m01_____41 cpdis0203_m01_____42
        cpdis0204_m01_____43 cpdis0301_m01_____29 cpdis0302_m01_____28 cpdis0303_m01_____27 cpdis0304_m01_____24
        cpdis0305_m01_____256 cpdis0306_m01_____259 cpdis0307_m01_____58 cpdis0308_m01_____265 cpdis0309_m01_____659
        cpdis0310_m01_____276 cpdis0311_m01_____274 cpdis0401_m01_____658 cpdis0501_m01_____47 cpdis0601_m01_____30
        cpdis0602_m01_____31 cpdis0603_m01_____32 cpdis0604_m01_____37 cpdis0605_m01_____38 cpdis0606_m01_____57
        cpdis0701_m01_____44 cpdis0702_m01_____45 cpdis0703_m01_____46 cpdis0801_m01_____1456 cpdis0802_m01_____258
        cpdis0803_m01_____667 cpdis0804_m01_____470
    `;

    arrPageNames = strPageNames.trim().replace(/  /g, '').replace(/\n/g, ' ').split(' ');
    arrPageNames = arrPageNames.filter((v) => !!v);

    const beforeLength = arrPageNames.length;
    let lengthCount = 0;

    if(seq){
        arrPageNames.forEach((pageName) => {
            const _functionName = pageName.split('_____')[0];
            const _seq = pageName.split('_____')[1];

            if(+seq === +_seq){
                const functionObject = animateFunctions[_functionName];
                functionObject($('#container'), _seq);
                return;
            }

            lengthCount++;
        });
    }else{
        arrPageNames.forEach((pageName) => {
            if(!pageName){
                return;
            }

            const _functionName = pageName.split('_____')[0];
            const _seq = pageName.split('_____')[1];

            const $el = $('.' + _functionName);
            if(!$el[0]){

                return;
            }

            const functionObject = animateFunctions[_functionName];
            functionObject($el);
        });
    }

    $('.prd-detail-info dl dt, .prd-detail-info dl dd, .prd-detail-maker, .sns-share-area, .maker-info').each(function (index, obj) {
        if($(obj).find('.prd-detail-top').length){
            $(obj).closest('dl').addClass('top');
            return;
        }
        scrollTrigger(obj, {
            onEnter: function () {
                $(obj).addClass('ui-animation');
            }
        });
    });

    $('.half-svg').each((idx, obj) => {
        const $obj = $(obj);
        const $svgEl = $obj.find('.svg03 .svg-circle1');
        if ($obj.length) gsap.set($svgEl, {
            drawSVG: '0% 0%',
            opacity: 1
        });

        scrollTrigger(obj, {
            onEnter: function () {
                circlePieAnimation2($obj, $svgEl);
            }
        });

    });
}

function circlePieAnimation($el) {
    gsap.set($el, {y: 50, opacity: 0});
    gsap.set($el.find('.svg01 circle').toArray(), {drawSVG: '0% 0%', opacity: 1});
    gsap.set($el.find('.array div'), {x: -5, opacity: 0});
    gsap.set($el.find('.core'), {y: 5, opacity: 0});

    gsap.to($el, {duration: 0.3, y: 0, opacity: 1});
    gsap.to($el.find('.svg01 circle').toArray().reverse(), {
        duration: 0.5, drawSVG: (index, element, elementAll) => {
            const value = $(element).data('value');
            return `0% ${value}%`;
        }, opacity: 1, stagger: 0.1
    });
    gsap.to($el.find('.array div').toArray(), {duration: 0.5, delay: 0.1, x: 0, opacity: 1, stagger: 0.1});
    gsap.to($el.find('.core')[0], {duration: 0.4, y: 0, opacity: 1, delay: 0.6});
}

function circlePieAnimation2($el, $svgEl) {
    $el.each((idx,  obj) => {
        const $obj = $(obj);
        if ($obj.length) gsap.set($obj, {y: 50, opacity: 0});
        if ($obj.length) gsap.to($obj, {duration: 0.3, y: 0, opacity: 1});
    });

    if ($svgEl.length) gsap.set($svgEl, {
        drawSVG: '0% 0%',
        opacity: 1
    });
    if ($svgEl.length) gsap.to($svgEl.toArray().reverse(), {
        duration: 0.5, delay: 0.4, drawSVG: (index, element, elementAll) => {
            const value = $(element).data('value');
            return `0% ${value}%`;
        }, opacity: 1, stagger: 0.1
    });
}

function titleDescAnimation($el, type) {
    const $title = $('.prd-detail-top > .tit');
    const $desc = $('.prd-detail-top > .txt');

    scrollTrigger($el.find('.prd-detail-top'), {
        start: 'top+=250px bottom',
        onEnterAction: function () {
            if (type === 'type1') {
                gsap.set($title, {y: 30, opacity: 0});
                if ($desc.length) gsap.set($desc, {y: 30, opacity: 0});

                gsap.to($title, {duration: 0.5, y: 0, opacity: 1});
                if ($desc.length) gsap.to($desc, {duration: 0.5, delay: 0.1, y: 0, opacity: 1});
            }
        }
    });
}

function defaultFunction($el){
    if ($el && $el[0]) {
        titleDescAnimation($el, 'type1');
    }
}

const animateFunctions = {
    /**
     마이카 자동차보험
     http://localhost:8888/html/product/insr/cari/01/cpdis0101_m01.html
     */
    cpdis0101_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');
        }
    },


    /**
     무배당흥국화재 든든한 SMILE 운전자종합보험 (21.01)
     http://localhost:8888/html/product/insr/cari/02/cpdis0102_m01.html
     */
    cpdis0102_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            top();
        }

        function top() {
            const $bubbleGraph = $('.prd-detail-top .bubble-graph');
            const $title = $('.prd-detail-top .tit, .prd-detail-top .info');

            gsap.set($title, {y: 30, opacity: 0});
            gsap.set($bubbleGraph.find('>div').toArray(), {opacity: 0, scale: 0.3});

            gsap.to($title, {duration: 0.5, y: 0, opacity: 1, stagger: 0.1});
            gsap.to($bubbleGraph.find('>div').toArray().reverse(), {
                duration: 0.5,
                delay: 0.4,
                opacity: 1,
                scale: 1,
                ease: Power2.easeOut,
                stagger: 0.15
            });
        }
    },


    /**
     흥국화재 실속있는 재산보장보험(21.01)
     http://localhost:8888/html/product/insr/fire/01/cpdis0201_m01.html
     */
    cpdis0201_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .box:eq(0)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });

            scrollTrigger($el.find('.prd-detail-top .box:eq(1)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part2();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.detail-chart .box:eq(0)');

            circlePieAnimation($box1);
        }

        function top_part2() {
            const $box2 = $('.detail-chart .box:eq(1)');

            circlePieAnimation($box2);

            const $title = $('.prd-detail-top .info');
            gsap.set($title, {y: 30, opacity: 0});
            gsap.to($title, {duration: 0.5, y: 0, opacity: 1, stagger: 0.1});
        }
    },


    /**
     흥국화재 행복재산 종합보험(21.01)
     http://localhost:8888/html/product/insr/fire/02/cpdis0202_m01.html
     */
    cpdis0202_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .box:eq(0)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });

            scrollTrigger($el.find('.prd-detail-top .box:eq(1)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part2();
                }
            });

            scrollTrigger($el.find('.prd-detail-top .info'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    gsap.set($el.find('.prd-detail-top .info'), {opacity: 0, y: 20});
                    gsap.to($el.find('.prd-detail-top .info'), {duration: 0.3, opacity: 1, y: 0});
                }
            });
        }

        function top_part1() {
            const $box1 = $('.detail-chart .box:eq(0)');

            circlePieAnimation($box1);
        }

        function top_part2() {
            const $box2 = $('.detail-chart .box:eq(1)');

            circlePieAnimation($box2);
        }
    },


    /**
     흥국화재 행복든든 종합보험(21.01)
     http://localhost:8888/html/product/insr/fire/03/cpdis0203_m01.html
     */
    cpdis0203_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');
        }
    },


    /**
     행복누리 홈 종합보험
     http://localhost:8888/html/product/insr/fire/04/cpdis0204_m01.html
     */
    cpdis0204_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');
        }
    },


    /**
     흥국화재 파워라이프 종합보험(21.01)
     http://localhost:8888/html/product/insr/hlth/01/cpdis0301_m01.html
     */
    cpdis0301_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });

            scrollTrigger($el.find('.prd-detail-top .info'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    gsap.set($el.find('.prd-detail-top .info'), {opacity: 0, y: 20});
                    gsap.to($el.find('.prd-detail-top .info'), {duration: 0.3, opacity: 1, y: 0});
                }
            });

        }

        function top_part1() {
            const $box1 = $('.detail-chart .inner');

            circlePieAnimation2($box1, $box1.find('.svg03 .svg-circle1'));
        }
    },


    /**
     행복을 다주는 가족사랑 종합보험(21.01)
     http://localhost:8888/html/product/insr/hlth/02/cpdis0302_m01.html
     */
    cpdis0302_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.detail-chart .inner');

            circlePieAnimation2($box1, $box1.find('.svg03 .svg-circle1'));
        }
    },


    /**
     흥국화재 행복한 인생 간병보험(21.01)
     http://localhost:8888/html/product/insr/hlth/03/cpdis0303_m01.html
     */
    cpdis0303_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $beltGraph = $('.belt-graph > ul > li');
            const $beltGraphBar = $beltGraph.find('.graph-bar span');
            const $info = $('.info');

            gsap.set($beltGraph, {opacity: 0, y: 30});
            gsap.set($beltGraphBar, {width: 0});
            gsap.set($info, {opacity: 0, y: 10});

            gsap.to($beltGraph, {duration: 0.5, opacity: 1, y: 0, stagger: 0.1});
            gsap.to($beltGraphBar, {
                duration: 0.5, width: (index, element, elementAll) => {
                    const value = $(element).data('value');

                    return `${value}%`;
                }, stagger: 0.1
            });
            gsap.to($info, {duration: 0.5, delay: 0.6, opacity: 1, y: 0});
        }
    },


    /**
     흥국화재 실손의료보험(21.01)
     http://localhost:8888/html/product/insr/hlth/04/cpdis0304_m01.html
     */
    cpdis0304_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.disease-graph'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $gender = $('.detail-chart .img');

            gsap.set($gender, {opacity: 0, y: 30});

            gsap.to($gender, {duration: 0.5, delay: 0.1, opacity: 1, y: 0, stagger: 0.3});
        }
    },


    /**
     흥국화재 든든한 간편종합보험(21.01)
     http://localhost:8888/html/product/insr/hlth/05/cpdis0305_m01.html
     */
    cpdis0305_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.disease-graph'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });

            scrollTrigger($el.find('.belt-vert-graph'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part2();
                }
            });
        }

        function top_part1() {
            const $gender = $('.in-group');

            gsap.set($gender, {opacity: 0, y: 30});

            gsap.to($gender, {duration: 0.5, delay: 0.1, opacity: 1, y: 0, stagger: 0.3});
        }

        function top_part2() {
            const $belt = $('.belt .bar1 span, .belt .bar2 span');
            const $beltTxt = $('.belt .tit');
            const $sTxt = $('.s-txt');
            const $info = $('.info');

            gsap.set($belt, {opacity: 0, height: 0});
            gsap.set($beltTxt, {opacity: 0, y: 10});
            gsap.set($sTxt, {opacity: 0, y: 10});
            gsap.set($info, {opacity: 0, y: 10});

            gsap.to($belt, {
                duration: 0.5, opacity: 1, height: (index, element, elementAll) => {
                    const value = $(element).data('value');
                    return `${value}%`;
                }, stagger: 0.07
            });
            gsap.to($beltTxt, {duration: 0.5, delay: 0.4, opacity: 1, y: 0});
            gsap.to($sTxt, {duration: 0.5, delay: 0.5, opacity: 1, y: 0});
            gsap.to($info, {duration: 0.5, delay: 0.6, opacity: 1, y: 0});
        }
    },


    /**
     흥국화재 이튼튼한 치아보험(21.01)
     http://localhost:8888/html/product/insr/hlth/06/cpdis0306_m01.html
     */
    cpdis0306_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $barGraph = $('.bar-graph > ul > li');
            const $info = $('.info');
            gsap.set($barGraph, {opacity: 0, y: 30});
            gsap.set($info, {opacity: 0, y: 10});

            gsap.to($barGraph, {duration: 0.5, delay: 0.1, opacity: 1, y: 0, stagger: 0.05});
            gsap.to($info, {duration: 0.5, delay: 0.6, opacity: 1, y: 0});
        }
    },


    /**
     흥국화재 더플러스 종합보험(21.01)
     http://localhost:8888/html/product/insr/hlth/07/cpdis0307_m01.html
     */
    cpdis0307_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $boxGraph = $('.box-graph > ul > li');
            const $sTxt = $('.ss-txt');
            const $info = $('.info');

            gsap.set($boxGraph, {opacity: 0, y: 30});
            gsap.set($sTxt, {opacity: 0, y: 10});
            gsap.set($info, {opacity: 0, y: 10});

            gsap.to($boxGraph, {duration: 0.5, delay: 0.1, opacity: 1, y: 0, stagger: 0.1});
            gsap.to($sTxt, {duration: 0.5, delay: 0.5, opacity: 1, y: 0});
            gsap.to($info, {duration: 0.5, delay: 0.6, opacity: 1, y: 0});
        }
    },


    /**
     흥국화재 유병력자 실손의료보험(21.01)
     http://localhost:8888/html/product/insr/hlth/08/cpdis0308_m01.html
     */
    cpdis0308_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $circleGraph = $('.circle-graph > ul > li');
            const $p = $('.detail-chart p');

            gsap.set($circleGraph, {opacity: 0, y: 30});
            gsap.set($p, {opacity: 0, y: 10});

            gsap.to($circleGraph, {duration: 0.5, delay: 0.1, opacity: 1, y: 0, stagger: 0.1});
            gsap.to($p, {duration: 0.5, delay: 0.5, opacity: 1, y: 0, stagger: 0.1});
        }
    },


    /**
     흥국화재 간편치매보험(21.01)
     http://localhost:8888/html/product/insr/hlth/09/cpdis0309_m01.html
     */
    cpdis0309_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.detail-chart');

            circlePieAnimation($box1);
        }
    },


    /**
     흥국화재 실속플러스 암보험(21.02)
     http://localhost:8888/html/product/insr/hlth/09/cpdis0310_m01.html
     */
    cpdis0310_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .cancer-graph'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.cancer-inner:eq(0)');
            const $box2 = $('.cancer-inner:eq(1)');

            gsap.set($box1.find('dt, .count, li'), {autoAlpha: 0, y: 20});
            gsap.set($box2.find('dt, .count, li'), {autoAlpha: 0, y: 20});

            gsap.to($box1.find('dt, .count, li'), {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.05});
            gsap.to($box2.find('dt, .count, li'), {autoAlpha: 1, y: 0, delay: 0.4, stagger: 0.04});

            const $title = $('.prd-detail-top .info');
            gsap.set($title, {y: 30, opacity: 0});
            gsap.to($title, {duration: 0.5, y: 0, opacity: 1, stagger: 0.1});
        }
    },


    /**
     흥국화재 가족든든 간편정기보험(21.01)
     http://localhost:8888/html/product/insr/hlth/09/cpdis0311_m01.html
     */
    cpdis0311_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.detail-chart .inner');

            gsap.set($box1, {autoAlpha: 0, y: 50});
            gsap.to($box1, {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.1});
        }
    },


    /**
     흥국화재 맘편한 자녀사랑보험(21.01)
     http://localhost:8888/html/product/insr/chld/cpdis0401_m01.html
     */
    cpdis0401_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .box-etc:eq(0)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });

            scrollTrigger($el.find('.prd-detail-top .box-etc:eq(1)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part2();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.detail-chart .box-etc:eq(0)');

            gsap.set($box1.find('.s-txt, .child-graph li, .info'), {autoAlpha: 0, y: 50});
            gsap.to($box1.find('.s-txt, .child-graph li, .info'), {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.05});
        }

        function top_part2() {
            const $box2 = $('.detail-chart .box-etc:eq(1)');

            gsap.set($box2.find('.s-txt, .child-array, .child-graph dt, .child-graph dd, .info'), {autoAlpha: 0, y: 50});
            gsap.set($box2.find('em:eq(0)'), {width: '0%'});
            gsap.set($box2.find('em:eq(2)'), {width: '0%'});

            gsap.to($box2.find('.s-txt, .child-array, .child-graph dt, .child-graph dd, .info'), {autoAlpha: 1, y: 0, stagger: 0.05});
            gsap.to($box2.find('em:eq(0)'), {width: '50%', delay: 0.3});
            gsap.to($box2.find('em:eq(2)'), {width: '33%', delay: 0.4});
        }
    },


    /**
     흥국화재 파워단체보장보험
     http://localhost:8888/html/product/insr/grup/cpdis0501_m01.html
     */
    cpdis0501_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .effect-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.effect-chart li');

            gsap.set($box1, {autoAlpha: 0, y: 50});
            gsap.to($box1, {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.05});
        }
    },


    /**
     흥국화재 행복자산만들기 저축보험(21.01)
     http://localhost:8888/html/product/insr/pnsn/01/cpdis0601_m01.html
     */
    cpdis0601_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');
        }
    },


    /**
     연금저축손해보험 흥국화재연금보험(21.01)
     http://localhost:8888/html/product/insr/pnsn/02/cpdis0602_m01.html
     */
    cpdis0602_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');
        }
    },


    /**
     연금저축손해보험 흥국화재 행복디딤돌보험(21.01)
     http://localhost:8888/html/product/insr/pnsn/03/cpdis0603_m01.html
     */
    cpdis0603_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');
        }
    },


    /**
     흥국화재 일석이조(一石二鳥) 건강보험(21.01)
     http://localhost:8888/html/product/insr/pnsn/04/cpdis0604_m01.html
     */
    cpdis0604_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.detail-chart');

            gsap.set($box1.find('.child-array, dt, dd, .info'), {autoAlpha: 0, y: 50});
            gsap.to($box1.find('.child-array, dt, dd, .info'), {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.05});
        }
    },


    /**
     흥국화재 스페셜 저축보험(21.01)
     http://localhost:8888/html/product/insr/pnsn/05/cpdis0605_m01.html
     */
    cpdis0605_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');
        }
    },


    /**
     흥국화재 일석이조(一石二鳥) 상해보험(21.01)
     http://localhost:8888/html/product/insr/pnsn/06/cpdis0606_m01.html
     */
    cpdis0606_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.detail-chart .inner');

            gsap.set($box1, {autoAlpha: 0, y: 50});
            gsap.to($box1, {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.1});
        }
    },


    /**
     골프보험
     http://localhost:8888/html/product/insr/trip/01/cpdis0701_m01.html
     */
    cpdis0701_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');
        }
    },


    /**
     국내여행보험
     http://localhost:8888/html/product/insr/trip/02/cpdis0702_m01.html
     */
    cpdis0702_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');
        }
    },


    /**
     해외여행보험
     http://localhost:8888/html/product/insr/trip/03/cpdis0703_m01.html
     */
    cpdis0703_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');
        }
    },


    /**
     흥국화재 다이렉트 운전자보험(21.01)
     http://localhost:8888/html/product/insr/drct/01/cpdis0801_m01.html
     */
    cpdis0801_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.detail-chart li');

            gsap.set($box1, {autoAlpha: 0, y: 50});
            gsap.to($box1, {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.1});
        }
    },

    /**
     흥국화재 다이렉트 의료실비보험(21.01)
     http://localhost:8888/html/product/insr/drct/02/cpdis0802_m01.html
     */
    cpdis0802_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.detail-chart li');

            gsap.set($box1, {autoAlpha: 0, y: 50});
            gsap.to($box1, {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.1});
        }
    },


    /**
     다이렉트 건강보험
     http://localhost:8888/html/product/insr/drct/03/cpdis0803_m01.html
     */
    cpdis0803_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.detail-chart li');

            gsap.set($box1, {autoAlpha: 0, y: 50});
            gsap.to($box1, {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.1});
        }
    },


    /**
     다이렉트 안심상해보험
     http://localhost:8888/html/product/insr/drct/04/cpdis0804_m01.html
     */
    cpdis0804_m01: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-detail-top .detail-chart'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.detail-chart li, .detail-chart .s-txt, .detail-chart .info');

            gsap.set($box1, {autoAlpha: 0, y: 50});
            gsap.to($box1, {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.054});
        }
    },


    //////////////////////////////////////////////////////
    // 카테고리메인
    //////////////////////////////////////////////////////
    /**
     자동차/운전자
     http://localhost:8888/html/product/insr/cpdis0001_m10.html
     */
    cpdis0001_m10: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-main-info .gray-box:eq(0)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });

            scrollTrigger($el.find('.prd-main-info .gray-box:eq(1)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part2();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.prd-main-info .gray-box:eq(0)');

            gsap.set([$box1, $box1.find('.tit'), $box1.find('.border-box'), $box1.find('.refer-txt')], {autoAlpha: 0, y: 50});
            gsap.to([$box1, $box1.find('.tit'), $box1.find('.border-box'), $box1.find('.refer-txt')], {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.054});
        }

        function top_part2() {
            const $box2 = $('.prd-main-info .gray-box:eq(1)');

            gsap.set([$box2, $box2.find('.tit'), $box2.find('.half-area')], {autoAlpha: 0, y: 50});
            gsap.to([$box2, $box2.find('.tit'), $box2.find('.half-area')], {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.054});
        }
    },
    /**
     화재/재물
     http://localhost:8888/html/product/insr/cpdis0001_m11.html
     */
    cpdis0001_m11: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-main-info .gray-box:eq(0)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });

            scrollTrigger($el.find('.prd-main-info .gray-box:eq(1)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part2();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.prd-main-info .gray-box:eq(0)');

            gsap.set([$box1, $box1.find('.tit'), $box1.find('.info')], {autoAlpha: 0, y: 50});
            gsap.to([$box1, $box1.find('.tit'), $box1.find('.info')], {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.054});

            const $bubbleGraph = $box1.find('.bubble-graph');

            gsap.set($bubbleGraph.find('>div').toArray(), {opacity: 0, scale: 0.3});

            gsap.to($bubbleGraph.find('>div').toArray().reverse(), {
                duration: 0.5,
                delay: 0.4,
                opacity: 1,
                scale: 1,
                ease: Power2.easeOut,
                stagger: 0.15
            });
        }

        function top_part2() {
            const $box2 = $('.prd-main-info .gray-box:eq(1)');

            gsap.set([$box2, $box2.find('.info')].concat($box2.find('.child-graph li').toArray()), {autoAlpha: 0, y: 50});
            gsap.to([$box2, $box2.find('.info')].concat($box2.find('.child-graph li').toArray()), {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.054});
        }
    },
    /**
     의료/건강
     http://localhost:8888/html/product/insr/cpdis0001_m12.html
     */
    cpdis0001_m12: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-main-info .gray-box:eq(0)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });

            scrollTrigger($el.find('.prd-main-info .gray-box:eq(1)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part2();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.prd-main-info .gray-box:eq(0)');

            gsap.set([$box1, $box1.find('.info')].concat($box1.find('.child-graph li').toArray()), {autoAlpha: 0, y: 50});
            gsap.to([$box1, $box1.find('.info')].concat($box1.find('.child-graph li').toArray()), {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.054});
        }

        function top_part2() {
            const $box2 = $('.prd-main-info .gray-box:eq(1)');

            gsap.set([$box2, $box2.find('.info')].concat($box2.find('.detail-chart li').toArray()), {autoAlpha: 0, y: 50});
            gsap.to([$box2, $box2.find('.info')].concat($box2.find('.detail-chart li').toArray()), {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.054});
        }
    },
    /**
     자녀
     http://localhost:8888/html/product/insr/cpdis0001_m13.html
     */
    cpdis0001_m13: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-main-info .gray-box:eq(0)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });

            scrollTrigger($el.find('.prd-main-info .gray-box:eq(1)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part2();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.prd-main-info .gray-box:eq(0)');

            gsap.set([$box1, $box1.find('.info')].concat($box1.find('.bubble-graph02 li').toArray()), {autoAlpha: 0, y: 50});
            gsap.to([$box1, $box1.find('.info')].concat($box1.find('.bubble-graph02 li').toArray()), {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.054});
        }

        function top_part2() {
            const $box2 = $('.prd-main-info .gray-box:eq(1)');

            circlePieAnimation2($box2, $box2.find('.svg02 .svg-circle1'));
        }
    },
    /**
     단체
     http://localhost:8888/html/product/insr/cpdis0001_m14.html
     */
    cpdis0001_m14: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-main-info .gray-box:eq(0)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.prd-main-info .gray-box:eq(0)');

            gsap.set([$box1, $box1.find('.tit')].concat($box1.find('.detail-chart li').toArray()), {autoAlpha: 0, y: 50});
            gsap.to([$box1, $box1.find('.tit')].concat($box1.find('.detail-chart li').toArray()), {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.054});
        }
    },
    /**
     연금/저축/방카슈랑스
     http://localhost:8888/html/product/insr/cpdis0001_m15.html
     */
    cpdis0001_m15: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-main-info .gray-box:eq(0)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.prd-main-info .gray-box:eq(0)');

            gsap.set([$box1, $box1.find('.gray-box-inner > *')], {autoAlpha: 0, y: 50});
            gsap.to([$box1, $box1.find('.gray-box-inner > *')], {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.054});
        }
    },
    /**
     여행/레저
     http://localhost:8888/html/product/insr/cpdis0001_m16.html
     */
    cpdis0001_m16: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-main-info .gray-box:eq(0)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.prd-main-info .gray-box:eq(0)');

            gsap.set([$box1, $box1.find('.detail-chart li')], {autoAlpha: 0, y: 50});
            gsap.to([$box1, $box1.find('.detail-chart li')], {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.034});
        }
    },
    /**
     다이렉트
     http://localhost:8888/html/product/insr/cpdis0001_m17.html
     */
    cpdis0001_m17: function ($el) {
        if ($el && $el[0]) {
            titleDescAnimation($el, 'type1');

            scrollTrigger($el.find('.prd-main-info .gray-box:eq(0)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part1();
                }
            });

            scrollTrigger($el.find('.prd-main-info .gray-box:eq(1)'), {
                start: 'top+=250px bottom',
                onEnterAction: function () {
                    top_part2();
                }
            });
        }

        function top_part1() {
            const $box1 = $('.prd-main-info .gray-box:eq(0)');

            gsap.set([$box1, $box1.find('.tit')].concat($box1.find('.detail-chart li').toArray()), {autoAlpha: 0, y: 50});
            gsap.to([$box1, $box1.find('.tit')].concat($box1.find('.detail-chart li').toArray()), {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.054});
        }

        function top_part2() {
            const $box2 = $('.prd-main-info .gray-box:eq(1)');

            gsap.set([$box2, $box2.find('.tit'), $box2.find('.info')].concat($box2.find('.child-graph li').toArray()), {autoAlpha: 0, y: 50});
            gsap.to([$box2, $box2.find('.tit'), $box2.find('.info')].concat($box2.find('.child-graph li').toArray()), {autoAlpha: 1, y: 0, delay: 0.3, stagger: 0.054});
        }
    },
}
;
