import {getDropDownListTmpl, getDropDownTmpl} from "./templates/html.template";
import UI from "./base/UI";
import {initData, setSelectText} from "../functions/select.common";

/**
 * dropdownSelect
 */
class DropdownSelect extends UI {
    defaults = {};

    constructor(el, options) {
        super('dropdownSelect', el);

        this.init(el, options);
    }

    init(el, options) {
        this.defaults = {...this.defaults, ...this.parseOptions(options)};

        this.render();
        setSelectText(this);

        this.detachEvents();
        this.attachEvents();
    }

    update() {
        initData(this);
        setSelectText(this);

        let list;

        this.$el.siblings('.wrap-list-dropdown').remove();
        this.$el.closest('.input-txt').append(getDropDownTmpl);

        list = this.data.list.filter((obj) => {
            return obj.value !== '';
        }).map((optionData) => getDropDownListTmpl(optionData.value, optionData.text)).join('');

        this.$el.siblings('.wrap-list-dropdown').find('ul').html(list);

        this.detachEvents();
        this.attachEvents();
    }

    render() {
        this.update();
    }

    open() {
        this.$el.siblings('.wrap-list-dropdown').addClass('active');
    }

    close() {
        this.$el.siblings('.wrap-list-dropdown').removeClass('active');
    }

    attachEvents() {
        this.$el.next('button').on(`click${this.eventId}`, (e) => {
            e.preventDefault();

            if (this.$el.siblings('.wrap-list-dropdown').hasClass('active')) {
                this.close();
            } else {
                this.open();

                $('body').off('click.body');
                setTimeout(() => {
                    $('body').on('click.body', (e) => {
                        if (!this.$el.siblings('.wrap-list-dropdown').has(e.target).length) {
                            this.close();
                        }
                    });
                });

            }
        });

        this.$el.siblings('.wrap-list-dropdown').on(`click${this.eventId}`, 'button', (e) => {
            e.preventDefault();
            const $this = $(e.currentTarget);
            let index;

            this.$el.siblings('.wrap-list-dropdown').find('button').removeClass('active');
            $this.addClass('active');

            index = $this.closest('li').index() + 1;
            this.data.selectedIndex = index;
            this.$el[0].selectedIndex = index;

            this.$el.trigger('change');
            setSelectText(this);

            this.close();
        });
    }

    detachEvents() {
        this.$el.off(this.eventId);
        this.$el.next('button').off(this.eventId);
        this.$el.siblings('.wrap-list-dropdown').off(this.eventId);
    }

    destroy() {
        this.detachEvents();
    }

    /**
     * 콜백 함수
     * @param {Function} fn 콜백 함수
     * @example
     *  var select = $('select').data('ui');
     *  select.callback(function(index){
     *      console.log('index', index);
     *  });
     */
    callback(fn) {
        this.callbackFn = fn;
    }

    get selectedIndex() {
        return this.data.selectedIndex;
    }

    get datas() {
        return this.data;
    }
}

export default DropdownSelect;
