const animationDelay = {
    attribute: 'animation-delay',
    separator: ';',
    execute: function(baseElement = document) {
        for (const element of baseElement.querySelectorAll(`[${this.attribute}]`)) {
            const times = element.getAttribute(this.attribute).split(this.separator);
            times[0] -= times[1];

            for (const child of element.children) {
                times[0] += Number(times[1]);
                child.style.animationDelay = `${times[0]}s`;
                //Number(times[1].replace(/m?s/, ''))
            }
        }
    },
    remove: function(baseElement = document) {
        for (const element of baseElement.querySelectorAll(`[${this.attribute}]`)) {
            for (const child of element.children) {
                child.style.animationDelay = null;
            }
        }
    }
}

//Event listener
const onEvent = function (element, event, callback) {
    if (Array.isArray(event)) {
        let response = [];
        for (const e of event) {
            response.push(onEvent(element, e, callback));
        }
        return response;
    }

    function addListener(element, event, callback) {
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

    if (
        element instanceof HTMLElement ||
        element instanceof Document ||
        element instanceof Window
    ) {
        return addListener(element, event, callback);
    } else if (element instanceof NodeList) {
        const response = [];
        for (const el of element) {
            response.push(addListener(el, event, callback));
        }
        return response;
    } else {
        const response = [];
        for (const el of document.querySelectorAll(element)) {
            response.push(addListener(el, event, callback));
        }
        return response;
    }
}
HTMLElement.prototype.on = function (event, callback) {
    onEvent(this, event, callback);
};
NodeList.prototype.on = function (event, callback) {
    onEvent(this, event, callback);
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
