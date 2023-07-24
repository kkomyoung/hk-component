/**
 * 모든 UI는 UI클래스를 상속받는다.
 */
class UI {
    name = 'ui';
    el;
    $el;
    $wrap;
    $window;
    $document;
    $html;
    $body;
    $container;
    uiId;
    eventId;

    /**
     * UI클래스를 상속받은 UI는 super(name, el)을 해줘야한다.
     * @param name {string} UI이름을 정의한다(example: tooltip)
     * @param el {HTMLElement} UI요소 한개에 해당하는 요소를 넣는다.(ui-xxxx클래스가 붙는 ui요소)
     */
    constructor(name, el) {
        this.name = name;

        this.$window = $(window);
        this.$document = $(document);
        this.$html = $('html');
        this.$body = $('body');
        this.$wrap = $('#wrap');
        this.$container = $('#container');

        this.el = el;
        this.$el = $(el);

        this.setEventId();
    }

    init() {
    }

    update() {
    }

    render() {
    }

    attachEvents() {
    }

    detachEvents() {
    }

    destroy() {
    }

    /**
     * ui의 이벤트ID 생성 ex) uiName-0000
     */
    setEventId() {
        this.uiId = `${this.name}-${this.getRandomStr()}`;
        this.eventId = `.${this.uiId}`;
    }

    /**
     * 최대 6자리 랜덤 숫자
     * @returns {number}
     */
    getRandomStr() {
        return Math.round(Math.random() * 100000);
    }

    /**
     * 옵션은 모두 data-xxx 형태로 넘어오게 되고 해당 값의 유형에 맞게 변환해준다.
     * $('selector').data() 하게되면 해당 data-요소가 모두 들어오게 된다.
     * @returns {object} -
     * @param options {} 예: data-no="1" data-type="type1" { no: 1, type: 'type1' }
     */
    parseOptions(options) {
        let splitString;
        let numberArray = [];

        if (typeof options.no == 'string') {
            splitString = options.no.split(',');

            splitString.map((item) => {
                numberArray.push(+item);
            });

            options.no = numberArray;
        }

        return options;
    }
}

export default UI;
