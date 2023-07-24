import UI from "./base/UI";
import {getInputButtonClose} from "./templates/html.template";
import {setFixedCTA} from "../functions/simple.ui";

/**
 * Input
 */
class Input extends UI {
    defaults = {};

    constructor(el, options) {
        super('input', el);

        this.init(el, options);
    }

    init(el, options) {
        if (options) {
            this.defaults = {...this.defaults, ...this.parseOptions(options)};
        }

        this.render();
    }

    update() {
        this.$el.find('input, select, textarea').each((idx, obj) => {
            this.changeHandler($(obj));
        });
    }

    render() {
        this.detachEvents();
        this.attachEvents();
    }

    changeHandler($this){
        const valueOn = this.$el.find('input, textarea, select').toArray().some(this.isNotEmpty);

        if (valueOn) {
            this.$el.addClass('done');
        } else {
            this.$el.removeClass('done');
        }

        if ($this.hasClass('ui-text-del')) {
            if ($this.val().length > 0) {
                if ($this.next('.ico-del').length <= 0) {
                    $this.after(getInputButtonClose());
                }

                $this.next('.ico-del').on('click', () => {
                    $this.next('.ico-del').off('click').remove();
                    $this[0].value = '';
                    $this.focus();
                });
            } else {
                $this.next('.ico-del').off('click').remove();
            }
        }
    }

    attachEvents() {
        let fixedCTATimer = -1;

        const inputList = [
            'input[type=email]',
            'input[type=text]',
            'input[type=number]',
            'input[type=password]',
            'input[type=search]',
            'input[type=tel]',
            'input[type=url]',
            'textarea'
        ];

        this.$el.on(`input${this.eventId} change${this.eventId} propertychange${this.eventId} paste${this.eventId} customChange${this.eventId}`,
            [
                ...inputList,
                'input[type=checkbox]',
                'input[type=radio]',
                'select'
            ].join(','),
            (e) => {
                const $this = $(e.currentTarget);
                this.changeHandler($this);
        }).on(`focusin${this.eventId}`, inputList.join(','), (e) => {
            window.globalFixedCTATimer && window.globalFixedCTATimer.forEach((_timerId, index) => {
                clearTimeout(_timerId);
                window.globalFixedCTATimer.splice(index, 1);
            });

            setFixedCTA(false);
        }).on(`focusout${this.eventId}`, inputList.join(','), (e) => {
            fixedCTATimer = setTimeout(() => {
                setFixedCTA(true);
            }, 10);

            if(!window.globalFixedCTATimer){
                window.globalFixedCTATimer = [];
            }

            window.globalFixedCTATimer.push(fixedCTATimer);
        });

        this.update();
    }

    isNotEmpty(obj) {
        if (obj.tagName.toLowerCase() === 'input') {
            if (obj.type === 'radio' || obj.type === 'checkbox') {
                const name = $(obj).attr('name');
                const checked = $(obj).closest('.input-wrap').find(`[name=${name}]:checked`);

                if (checked.length > 0) {
                    return true;
                }
            } else {
                if ($(obj).val().trim() !== '') {
                    return true;
                }
            }
        } else if (obj.tagName.toLowerCase() === 'select') {
            if ($(obj).val().trim() !== '') {
                return true;
            }
        } else if (obj.tagName.toLowerCase() === 'textarea') {
            if ($(obj).val().trim() !== '') {
                return true;
            }
        }

        return false;
    }

    detachEvents() {
        this.$el.off(this.eventId);
    }

    destroy() {
        this.detachEvents();
    }
}

export default Input;
