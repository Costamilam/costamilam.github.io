/**
 * @name smooth
 * @description Apply the smooth effect on window scroll. Does not apply when clicking the anchor link
 * @param {string} selector Selector of the element in which the effect will be applied 
 * @param {string} velocity Effect speed, in 's' or 'ms', for example, '0.75s' and '1500ms'. The higher the faster
 * @returns {object} Instance of Smooth
 */
function smooth(selector, velocity = '0.5s') {
    let _container = document.querySelector(selector);

    if (_container instanceof HTMLElement === false || _container === document.body) {
        throw new Error('Invalid container element. The container must be an HTML element and can not be the body of the document.');
    }

    let _placeholder = document.createElement('div');

    let _handleScroll = function() {
        _container.style.transform = 'translateZ(0) translateY(' + (window.scrollY * (- 1)) + 'px)';
    }

    _container.style.position = 'absolute';
    //_container.style.width = '100%';
    _container.style.top = '0';
    //_container.style.left = '0';
    _container.style.transition = velocity+' ease-out';

    _placeholder.style.height = _container.offsetHeight + 'px';

    _container.parentElement.insertBefore(_placeholder, _container);

    if (window.addEventListener) {
        window.addEventListener('scroll', _handleScroll.bind(this), false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', _handleScroll.bind(this));
    } else if(window.onscroll) {
        window.onscroll = _handleScroll.bind(this);
    } else {
        throw new Error('Scroll event does not exist.');
    }
}