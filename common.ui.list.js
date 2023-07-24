import {
    Accordion,
    DropdownSelect,
    Expand,
    HKSwiper,
    Input,
    PopupDate,
    PopupExternal,
    PopupSelect,
    Tab, Tooltip
} from "./components";

const commonUiList = [
    {
        className: '.ui-accordion',
        classObject: Accordion
    },
    {
        className: '.input-wrap select[data-type="dropdown"]',
        classObject: DropdownSelect
    },
    {
        className: '.ui-expand',
        classObject: Expand,
    },
    {
        className: '.ui-swiper',
        classObject: HKSwiper
    },
    {
        className: '.input-wrap',
        classObject: Input
    },
    {
        className: '.ui-date',
        classObject: PopupDate
    },
    {
        className: '.ui-popup',
        classObject: PopupExternal
    },
    {
        className: '.input-wrap select:not([data-type="dropdown"])',
        classObject: PopupSelect
    },
    {
        className: '.ui-tab',
        classObject: Tab
    },
    {
        className: '.ui-tooltip',
        classObject: Tooltip,
    },
];

export default commonUiList;