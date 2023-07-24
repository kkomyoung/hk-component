export function initData(object) {
    object.data = {
        selectedIndex: -1,
        list: []
    };

    if (!object.$el.next('button').data('text')) {
        object.$el.next('button').data('text', object.$el.next('button').text().trim());
    }

    object.data.selectedIndex = object.$el[0].selectedIndex;
    object.data.list = object.$el.find('option').toArray().map((option, index) => {
        const $option = $(option);

        return {
            index,
            value: $option.val(),
            text: $option.text(),
            img: $option.data('img'),
            // selected: this.data.selectedIndex === index,
            el: $option[0]
        };
    });
};

export function setSelectText(object) {
    object.$el.attr({tabindex: -1});

    if (object.data.selectedIndex > 0) {
        const text = object.data.list[object.data.selectedIndex].text;
        object.$el.next('button').find('span').text(text);
    } else {
        const text = object.$el.next('button').data('text');
        object.$el.next('button').find('span').text(text);
    }
};
