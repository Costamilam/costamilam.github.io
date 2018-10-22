function OnElement(scrollOffset = 35) {
    this.log = function() { console.log(customListener); };

    const self = this;

    let scrollPosition = window.scrollY;

    const customListener = [];

    this.scrollOffset = scrollOffset;

    function save(type, callback) {
        customListener.push({
            element: this,
            callback: callback,
            type: type
        });
    }

    this.in = function(element, callback) { save.call(element, 'in', callback); };
    this.out = function(element, callback) { save.call(element, 'out', callback); };

    this.usePrototype = function() {
        HTMLElement.prototype.onElementIn = function(callback) { save.call(this, 'in', callback); };
        HTMLElement.prototype.onElementOut = function(callback) { save.call(this, 'out', callback); };
    };

    this.execute = function() {
        for (const listener of customListener) {
            const boundingClientRect = listener.element.getBoundingClientRect();
            const positionY = boundingClientRect.y;
            const height = boundingClientRect.height > scrollOffset ? scrollOffset : boundingClientRect.height;

            if (listener.type === 'out' && (scrollPosition < window.scrollY && positionY + boundingClientRect.height - height < self.scrollOffset && positionY + boundingClientRect.height - height > 0 || scrollPosition > window.scrollY && positionY > window.innerHeight - self.scrollOffset - height && positionY < window.innerHeight)) {
                listener.callback(listener.element);
            }

            if (listener.type === 'in' && (scrollPosition > window.scrollY && positionY + boundingClientRect.height - height < self.scrollOffset && positionY + boundingClientRect.height - height > 0 || scrollPosition < window.scrollY && positionY > window.innerHeight - self.scrollOffset - height && positionY < window.innerHeight)) {
                listener.callback(listener.element);
            }
        }

        scrollPosition = window.scrollY;
    };

    if (window.addEventListener) {
        window.addEventListener('scroll', this.execute);
    } else if(window.attachEvent) {
        window.attachEvent('scroll', this.execute);
    } else if (window['onscroll']) {
        window['onscroll'] = this.execute;
    }
};
