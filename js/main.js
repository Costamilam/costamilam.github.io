//Navigation element
const navigation = document.querySelector('body > header');

//Device type, by width
let isMobile = window.innerWidth <= 450 ? true : false;

let sidenavInstance = null;

//Change navigation element by width
function navigationVerify() {
    isMobile = window.innerWidth <= 450 ? true : false;

    if (isMobile) {
        navigation.classList.add('sidenav');
        navigation.classList.add('sidenav-fixed');

        if (sidenavInstance === null) {
            sidenavInstance = M.Sidenav.init(navigation, {});
        }
    } else {
        navigation.classList.remove('sidenav');
        navigation.classList.remove('sidenav-fixed');

        if (sidenavInstance !== null) {
            sidenavInstance.destroy();
            sidenavInstance = null;
        }
    }
}
navigationVerify()
window.on('resize', navigationVerify);

//Fade out aceleration button
const acceleration = document.querySelector('#apresentation > section:first-of-type');
const hideAceleration = function() {
    if (!acceleration.classList.contains('fadeOutH')) {
        acceleration.style.animationDelay = '0s';
        acceleration.classList.add('fadeOutH');
    } else {
        acceleration.classList.remove('fadeOutH');
        acceleration.classList.remove('fadeInH');
    }
}

//Acelerate typed
const accelerate = function() {
    typed.typeSpeed = 3;
    typed.backSpeed = 1;
    hideAceleration();
}
acceleration.on('click', accelerate);

//Initialize on element in/out events
const onElement = new OnElement(35);
onElement.usePrototype();

//Callbacks to events in/out
const elementIn = function(element) {
    if (element.getBoundingClientRect().y <= 35) {
        element.setAttribute('fade', 'inBottom');
    } else {
        element.setAttribute('fade', 'inTop');
    }
};
const elementOut = function(element) {
    if (element.getBoundingClientRect().y <= 35) {
        element.setAttribute('fade', 'outBottom');
    } else {
        element.setAttribute('fade', 'outTop');
    }
};

//Scrollspy menu
let scrollspy;
document.on('DOMContentLoaded', function() {
    scrollspy = M.ScrollSpy.init(document.querySelectorAll('.scrollspy'), {})

    document.querySelector('body > header > p').addEventListener('click', function() {
        if (isMobile) {
            sidenavInstance.close();
            return;
        }

        const header = document.querySelector('body > header');
        header.style.width = header.style.width !== '75px' ? '75px' : '300px';

        const main = document.querySelector('main');
        main.style.marginLeft = main.style.marginLeft !== '75px' ? '75px' : null;

        const footer = document.querySelector('footer');
        footer.style.paddingLeft = footer.style.paddingLeft !== '75px' ? '75px' : null;

        header.firstElementChild.firstElementChild.style.transform = header.firstElementChild.firstElementChild.style.transform !== 'rotate(180deg)' ? 'rotate(180deg)' : null;
    });
});

//Typed start article title
let typed = new Typed('#apresentation h1', {
    strings: ['^500Oi,^1000 eu aiu',  'Oi,^500 eu sou o Guilherme^500!'],
    showCursor: false,
    contentType: 'null',
    typeSpeed: 100,
    backSpeed: 50,
    onComplete: function() {
        hideAceleration();

        ajax({
            method: 'GET',
            url: 'content.html',
            done: function(response) {
                document.querySelector('main').innerHTML += response.text;

                animationDelay.execute();

                setTimeout(() => animationDelay.remove(), 2000)

                for (const element of document.querySelectorAll('nav > a:not(:first-of-type)')) {
                    element.classList.add('fadeInH');
                }

                //Smoth scroll effect (on anchor link click)
                new SmoothScroll('a[href*="#"]');
                //Smoth scroll effect (on scroll)
                //smooth('main', '0.75s');

                //Reinitialize scrollspy
                scrollspy[0].destroy();
                M.ScrollSpy.init(document.querySelectorAll('.scrollspy'), {});

                //Initialize tooltipe
                M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
            
                //Initialize collapsible
                M.Collapsible.init(document.querySelectorAll('.collapsible'), {
                    inDuration: 400,
                    outDuration: 200,
                    onOpenStart: function(element) {
                        element.querySelector('#stack .fa-plus').style.transition = 'transform 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19)';
                        element.querySelector('#stack .fa-plus').style.transform = 'rotate(135deg)';
                    },
                    onCloseStart: function(element) {
                        element.querySelector('#stack .fa-plus').style.transition = 'transform 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19)';
                        element.querySelector('#stack .fa-plus').style.transform = 'rotate(0deg)';
                    }
                });

                for (const element of document.querySelectorAll(`
                    #apresentation > section > p,
                    #graduation > header,
                    #graduation > ul > li,
                    #stack > header,
                    #stack > ul > li,
                    #experience > header,
                    #experience > section > h4,
                    #experience > section > p,
                    #experience > section > ul > li,
                    #project > header,
                    #project > section > div
                `)) {
                    element.setAttribute('fade', 'inTop');
                    element.onElementIn(elementIn);
                    element.onElementOut(elementOut);
                }

                const titleName = document.querySelector('#apresentation > header');
                titleName.setAttribute('fade', 'inTop');
                titleName.onElementIn(elementIn);
                titleName.onElementOut(elementOut);

                onElement.execute();
            }
        });
    }
});
