function OnElement(scrollOffset = 35) {
    const self = this;

    let scrollPosition = window.scrollY;

    const customListener = [];

    this.scrollOffset = scrollOffset;

    function save(element, type, callback) {
        customListener.push({
            element: element,
            callback: callback,
            type: type
        });
    }

    this.in = function(element, callback) { save(element, 'in', callback); };
    this.out = function(element, callback) { save(element, 'out', callback); };

    this.usePrototype = function() {
        HTMLElement.prototype.onElementIn = function(callback) { save(this, 'in', callback); };
        HTMLElement.prototype.onElementOut = function(callback) { save(this, 'out', callback); };
    };

    this.execute = function() {
        for (const listener of customListener) {
            const boundingClientRect = listener.element.getBoundingClientRect();
            const positionY = boundingClientRect.y;
            const height = boundingClientRect.height > scrollOffset ? scrollOffset : boundingClientRect.height;

            if (listener.type === 'out' && (scrollPosition < window.scrollY && positionY + boundingClientRect.height - height < self.scrollOffset && positionY + boundingClientRect.height - height > 0 || scrollPosition > window.scrollY && positionY > window.innerHeight - self.scrollOffset - height && positionY < window.innerHeight)) {
                listener.callback(listener.element);
                continue;
            }

            if (listener.type === 'in' && (scrollPosition > window.scrollY && positionY + boundingClientRect.height - height < self.scrollOffset && positionY + boundingClientRect.height - height > 0 || scrollPosition < window.scrollY && positionY > window.innerHeight - self.scrollOffset - height && positionY < window.innerHeight)) {
                listener.callback(listener.element);
                continue;
            }

            /*if (boundingClientRect.top > 0 && boundingClientRect.bottom > 0 && getComputedStyle(listener.element).opacity === '0') {
                console.log(listener)
                console.log(boundingClientRect)
                console.log(positionY)
                console.log(height)
            }*/
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

/*function OnElement(scrollOffset = '35px') {
    const observer = new IntersectionObserver(
        function(event) {
            event = event[0];

            if (event.boundingClientRect.top > 0 && event.boundingClientRect.bottom > 0) {
                for (lisetner of customListener.in) {
                    if (lisetner.element === event.target) {
                        lisetner.callback(event);
                    }
                }
            } else {
                for (lisetner of customListener.out) {
                    if (lisetner.element === event.target) {
                        lisetner.callback(event);
                    }
                }
            }
        },
        {
            root: null,
            rootMargin: scrollOffset,
            threshold: 1.0
        }
    );

    const customListener = {
        in: [],
        out: []
    };

    this.scrollOffset = scrollOffset;

    function save(type, element, callback) {
        customListener[type].push({
            element: element,
            callback: callback
        });

        observer.observe(element);
    }

    this.in = function(element, callback) { save('in', element, callback); };
    this.out = function(element, callback) { save('out', element, callback); };

    this.usePrototype = function() {
        HTMLElement.prototype.onElementIn = function(callback) { save('in', this, callback); };
        HTMLElement.prototype.onElementOut = function(callback) { save('out', this, callback); };
    };
}*/
