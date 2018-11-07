const animationDelay = {
    attribute: 'animation-delay',
    execute: function() {
        for (const element of document.querySelectorAll(`[${this.attribute}]`)) {
            const times = element.getAttribute(this.attribute).split(',');
            times[0] -= times[1];

            for (const child of element.children) {
                times[0] += Number(times[1]);
                child.style.animationDelay = `${times[0]}s`;
                //Number(times[1].replace(/m?s/, ''))
            }
        }
    },
    remove: function() {
        for (const element of document.querySelectorAll(`[${this.attribute}]`)) {
            for (const child of element.children) {
                child.style.animationDelay = null;
            }
        }
    }
}

//Event listener
const onEvent = function (element, event, callback) {
    if (event.toLocaleLowerCase().startsWith('on')) {
        event = event.toLocaleLowerCase().replace('on', '');
    }

    if (element.addEventListener) {
        return element.addEventListener(event, callback);
    } else if(element.attachEvent) {
        return element.attachEvent(event, callback);
    } else if (element['on'+event]) {
        element['on'+event] = callback;
        return element['on'+event];
    } else {
        return false;
    }
}
HTMLElement.prototype.on = function (event, callback) {
    onEvent(this, event, callback);
};
NodeList.prototype.on = function (event, callback) {
    for (const element of this) {
        onEvent(element, event, callback);
    }
};
Document.prototype.on = function (event, callback) {
    onEvent(this, event, callback);
};
Window.prototype.on = function (event, callback) {
    onEvent(this, event, callback);
};

//AJAX
const ajax = function (config) {
    const createXMLHTTPObject = function () {
        const XMLHttpFactories = [
            () => new XMLHttpRequest(),
            () => new ActiveXObject("Msxml2.XMLHTTP"),
            () => new ActiveXObject("Msxml3.XMLHTTP"),
            () => new ActiveXObject("Microsoft.XMLHTTP")
        ];
        let xmlhttp = false;

        for (var i=0;i<XMLHttpFactories.length;i++) {
            try {
                xmlhttp = XMLHttpFactories[i]();
            } catch (e) {
                continue;
            }
            break;
        }
        return xmlhttp;
    }
    const parser = function (xhr) {
        return {
            header: function(name = null) {
                return name === null ? xhr.getAllResponseHeader() : xhr.getResponseHeader(name);
            },
            status: xhr.status,
            statusText: xhr.statusText,
            response: xhr.response,
            text: xhr.responseText,
            type: xhr.responseType
        }
    }

    const errors = {
        'method': 'Undefined or invalid HTTP method',
        'url': 'Undefined or invalid URL'
    }

    for (var error in errors) {
        if (!config[error] || typeof config[error] !== 'string') {
            throw new Error(errors[error]);
        }
    }

    let req = createXMLHTTPObject();

    if (!req) {
        throw new Error('XMLHTTPRequest is not suported');
    }

    req.open(config.method, config.url, config.async || true);

    const callback = [
        'unset',
        'opened',
        'received',
        'loading'
    ]

    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            var state = req.status >= 200 && req.status < 300 ? 'done' : 'failure';

            req = parser(req);
        } else {
            var state = callback[req.readyState];
        }

        if (config[state] && typeof config[state] === "function") {
            config[state](req);
        }
    }

    req.send(config.data);

    return req;
};
