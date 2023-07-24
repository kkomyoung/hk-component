let a11yValidateErrorTimerArr = [];

export function a11yValidateError() {
    const errorMessages = $('.input-wrap.error')
        .map((idx, obj) => $(obj).find('.message').text())
        .toArray()  // text추출
        .filter((obj, idx) => idx === 0)    // 일단 첫번째 요소만 보여줌
        .map((text) => `<span>${text}</span>`);

    // validation을 보여줄 요소가 없다면
    if ($('#a11y-notify').length <= 0) {
        $('#wrap').append(`<div id="a11y-notify" class="hide-txt" role="alert" style="display:none;"></div>`);
    }

    const $A11yNotify = $('#a11y-notify');
    // 1번 호출후 사라지기전에 재호출 할경우와 10초후 사라질경우
    const clearTimer = () => {
        a11yValidateErrorTimerArr.forEach((_timerId, index) => {
            clearTimeout(_timerId);
            // 여러번 호출했을때 처리를 하기 위해 배열로
            a11yValidateErrorTimerArr.splice(index, 1);
        });
    };
    const showMessage = () => {
        $A11yNotify.html(errorMessages).show();

        clearTimer();
        const timerId = setTimeout(() => {
            $A11yNotify.empty().hide();
            clearTimer();
        }, 10000);
        a11yValidateErrorTimerArr.push(timerId);
    };

    const isVisible = $A11yNotify.is(':visible');
    $A11yNotify.hide();
    // 재호출시(요소가 보여지고 있을시 0.3초간 없앴다가 보여준다.
    setTimeout(showMessage, isVisible && 300);
}

export function a11yHideOtherContent($content){
    $content.siblings().attr('aria-hidden', 'true');
    $content.removeAttr('aria-hidden');
}

export function a11yShowOtherContent($content){
    $content.siblings().removeAttr('aria-hidden');
}

