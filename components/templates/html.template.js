/**
 * bottom layer template
 */
export const getBottomLayerTmpl = (type, title) => `
  <div class="popup-dialog ui-popup ui-bottom" data-type="${type}" style="display: none">
    <div class="popup-container">
      ${!!title ? getBottomLayerHeaderTmpl(title) : ''}
      <div class="popup-content">
        <div class="swiper-container">
          <ul class="swiper-wrapper">
          </ul>
          <div class="swiper-scrollbar"></div>
        </div>
      </div>
      <button class="ico-area-tp02 btn-close-popup" type="button">
        <span class="hide-txt">팝업 닫기</span>
        <i class="ico-style close" aria-hidden="true"></i>
      </button>
    </div>
  </div>
`;

export const getBottomDateLayerTmpl = (type, title) => `
  <div class="popup-dialog ui-popup ui-bottom" data-type="${type}" style="display: none">
    <div class="popup-container">
      ${!!title ? getBottomLayerHeaderTmpl(title) : ''}
      <div class="popup-content">
        <div class="inner">
          <div class="ui-datepicker"></div>
        </div>
      </div>
      <div class="popup-footer">
        <div class="btns-area flex">
          <button type="button" class="btn-lv03 pink btn-item">
            <span class="txt">확인</span>
          </button>
        </div>
      </div>
      <button class="ico-area-tp02 btn-close-popup" type="button">
        <span class="hide-txt">팝업 닫기</span>
        <i class="ico-style close" aria-hidden="true"></i>
      </button>
    </div>
  </div>
`;

export const getBottomLayerHeaderTmpl = (msg = '') => `
  <div class="popup-header">
    <h1 class="title">${msg}</h1>
  </div>
`;

export const getBottomLayerListTmpl = (value = 'value', text = 'item') => `
  <li class="swiper-slide">
    <button class="txt" type="button" data-val="${value}">${text}</button>
  </li>
`;

export const getBottomLayerCardListTmpl = (content = '') => `
  <li class="swiper-slide">${content}</li>
`;

export const getBottomLayerCardItemTmpl = (value = '', text = '', className = '') => `
  <button class="box" type="button" data-val="${value}"><span class="${className}">${text}</span></button>
`;

/**
 * video layer template
 */
export const getVideoSimpleLayerTmpl = (src) => `
  <div class="popup-dialog ui-popup ui-simple" data-type="video" style="display: none">
    <div class="popup-wrap">
      <div class="popup-container">
        <div class="popup-content">
          <div class="video-wrap">
            <iframe width="100%" height="100%" src="${src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
          </div>
        </div>
        <button class="ico-area-tp01 btn-close-popup" type="button">
          <span class="hide-txt">팝업 닫기</span>
          <i class="ico-style close" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
`;

/**
 * dropdown layer template
 */
export const getDropDownTmpl = () => `
  <div class="wrap-list-dropdown">
    <ul>
    </ul>
  </div>
`;

export const getDropDownListTmpl = (value = 'value', text = 'item') => `
  <li>
    <button type="button" data-val="${value}">${text}</span>
  </li>
`;

/**
 * alert layer template
 */
export const getAlertLayerTmpl = (header = '', content = '', btnCancel = '', btnConfirm = '') => `
  <div class="popup-dialog ui-popup ui-alert" style="display: flex">
    <div class="popup-wrap">
      <div class="popup-container">
        ${header}
        <div class="popup-content">
          <p>${content}</p>
        </div>
        <div class="popup-footer">
          ${btnCancel}
          ${btnConfirm}
        </div>
      </div>
    </div>
  </div>
`;

export const getAlertLayerHeaderTmpl = (msg = '') => `
  <div class="popup-header">
    <h1 class="head-cp01">${msg}</h1>
  </div>
`;

export const getAlertLayerBtnCancelTmpl = (text = '취소') => `
  <button class="btn ui-cancel" type="button">
    <span>${text}</span>
  </button>
`;

export const getAlertLayerBtnConfirmTmpl = (text = '확인') => `
  <button class="btn pink ui-confirm" type="button">
    <span>${text}</span>
  </button>
`;

/**
 * input close btn template
 */
export const getInputButtonClose = () => `
    <button class="ico-del" type="button">
        <span class="hide-txt">삭제</span>
        <i class="ico-style del" aria-hidden="true"></i>
    </button>
`;
