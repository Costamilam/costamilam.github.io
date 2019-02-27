if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}

const buttonAddToHomeScreen = document.querySelector('#addToHomeScreen');

let tapInstance = M.TapTarget.init(document.querySelector('.tap-target'), {
    onClose: function() {
        buttonAddToHomeScreen.classList.remove('pulse');
    }
});

let deferredPrompt;

window.on('beforeinstallprompt', function(event) {
    event.preventDefault();

    deferredPrompt = event;

    buttonAddToHomeScreen.style.display = 'block';
    buttonAddToHomeScreen.style.opacity = '1';

    tapInstance.open();
});

buttonAddToHomeScreen.on('click', function() {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function() {
        buttonAddToHomeScreen.style.display = 'none';
        buttonAddToHomeScreen.style.opacity = '0';
    
        deferredPrompt = null;
    });
});

onEvent('.tap-target-content > i', 'click', function() {
    setTimeout(() => tapInstance.close(), 0);
});

animationDelay.execute();
setTimeout(() => {
    animationDelay.remove();
    document.querySelector('body > header > div > img').removeAttribute('fade')
}, 2500);

//Navigation element
const navigation = document.querySelector('body > header');

//Device type, by width
let isMobile;

let sidenavInstance = null;

//Change navigation element by width
function navigationVerify() {
    isMobile = window.innerWidth <= 992;

    if (isMobile) {
        //navigation.classList.add('sidenav');
        //navigation.classList.add('sidenav-fixed');

        if (sidenavInstance === null) {
            const menuIcon = document.querySelectorAll('body > div:first-child > i.fa-minus');
        
            sidenavInstance = M.Sidenav.init(navigation, {
                onOpenStart: function() {
                    menuIcon[0].style.transform = 'translateY(7px) rotateZ(-45deg)';
                    menuIcon[1].style.transform = 'scaleX(0)';
                    menuIcon[2].style.transform = 'translateY(-7px) rotateZ(45deg)';
                },
                onCloseStart: function() {
                    menuIcon[0].style.transform =  null;
                    menuIcon[1].style.transform = null;
                    menuIcon[2].style.transform = null;
                }
            });
        }
    } else {
        //navigation.classList.remove('sidenav');
        //navigation.classList.remove('sidenav-fixed');

        if (sidenavInstance !== null) {
            sidenavInstance.destroy();
            sidenavInstance = null;
        }
    }
}
navigationVerify()
window.on(['resize', 'ondeviceorientation'], navigationVerify);

document.on('DOMContentLoaded', function() {
    //Fade out aceleration button
    const acceleration = document.querySelector('#apresentation > header > button');
    function hideAceleration() {
        if (acceleration.getAttribute('fade') !== 'outRight') {
            acceleration.style.animationDelay = '0s';
            acceleration.setAttribute('fade', 'outRight');
        } else {
            acceleration.removeAttribute('fade');
        }
    
        acceleration.style.cursor = 'default';
    }
    
    //Acelerate typed
    function accelerate() {
        typed.typeSpeed = 3;
        typed.backSpeed = 1;
        hideAceleration();
    }
    acceleration.on('click', accelerate);
    
    //Initialize on element in/out events
    // const ioView = new IOView(
    //     '100px 0px',
    //     entrie => {
    //         entrie.target.setAttribute('fade', entrie.boundingClientRect.top > window.innerHeight/2 ? 'inBottom' : 'inTop');
    //     },
    //     entrie => {
    //         entrie.target.setAttribute('fade', entrie.boundingClientRect.top > window.innerHeight/2 ? 'outBottom' : 'outTop');
    //     }
    // );
    // const ioView = new IntersectionObserver(function(entries) {
    //     entries.forEach(function (entrie) {
    //         if (entrie.intersectionRatio >= 0.5) {
    //             entrie.target.style.opacity = 1;
    //             entrie.target.style.transform = 'translateY(0px)';
    //         } else {
    //             entrie.target.style.opacity = 0;
    //             entrie.target.style.transform = `translateY(${
    //                 entrie.boundingClientRect.top > window.innerHeight/2 ? '' : '-'
    //             }10vh)`;
    //         }
    //     });
    // }, {
    //     root: null,
    //     rootMargin: '10% 0px',
    //     threshold: 0.5
    // });

    //Scrollspy menu
    let scrollspy;
    scrollspy = M.ScrollSpy.init(document.querySelectorAll('.scrollspy'), {})

    //M.Dropdown.init(document.querySelector('.dropdown-trigger'), {});

    onEvent('body > div:first-child, body > header > div > p', 'click', function() {
        const modal = document.querySelector('#contact > #modal');
        if (modal) {
            modal.style.left = modal.style.left !== '75px' ? '75px' : null;
            modal.style.maxWidth = modal.style.maxWidth !== 'calc(100% - 75px)' ? 'calc(100% - 75px)' : null;
        }

        if (isMobile) {
            sidenavInstance.isOpen ? sidenavInstance.close() : sidenavInstance.open();
            return;
        }

        const header = document.querySelector('body > header');
        header.style.width = header.style.width !== '75px' ? '75px' : '300px';

        const image = document.querySelector('body > header > div > img');
        image.style.height = image.style.height !== '25px' ? '25px' : '100px';
        image.style.width = image.style.width !== '25px' ? '25px' : '100px';
        image.style.transform = image.style.transform !== 'translateX(-112.5px)' ? 'translateX(-112.5px)' : 'translateX(0px)';

        const name = document.querySelector('body > header > div > p:last-child');
        name.style.opacity = name.style.opacity !== '0' ? '0' : '1'

        const nav = document.querySelector('body > header > nav');
        nav.style.transform = nav.style.transform !== 'translateY(-60px)' ? 'translateY(-60px)' : null;

        const menuIcon = document.querySelector('body > header > div > p > i');
        menuIcon.style.transform = menuIcon.style.transform !== 'rotateZ(180deg)' ? 'rotateZ(180deg)' : null;

        const main = document.querySelector('main');
        main.style.marginLeft = main.style.marginLeft !== '75px' ? '75px' : null;

        const footer = document.querySelector('footer');
        footer.style.paddingLeft = footer.style.paddingLeft !== '75px' ? '75px' : null;
    });

    onEvent('body > header > nav > a', 'click', function() {
        if (isMobile) {
            sidenavInstance.isOpen ? sidenavInstance.close() : sidenavInstance.open();
        }
    });

    // ioView.observe(document.querySelector('#apresentation > header'));

    //Typed start article title
    let typed = new Typed('#apresentation > header > h1', {
        strings: ['^500Oi,^500 eu aiu',  'Oi,^250 eu sou o Guilherme^250!'],
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

                    document.querySelector('body > header > nav').setAttribute('animation-delay', '0;0.25');
                    animationDelay.execute();
                    setTimeout(() => animationDelay.remove(), 2500);

                    for (const element of document.querySelectorAll('body > header > nav > a:not(:first-of-type)')) {
                        element.setAttribute('fade', 'inLeft');
                        element.style.display = 'block';
                    }

                    //Smoth scroll effect (on anchor link click)
                    new SmoothScroll('a[href*="#"]');
                    //Smoth scroll effect (on scroll)
                    //smooth('main', '0.75s');

                    // for (const element of document.querySelectorAll(`
                    //     #apresentation > section > p,
                    //     #graduation > header,
                    //     #graduation > ul > li,
                    //     #stack > header,
                    //     #stack > ul > li,
                    //     #experience > header,
                    //     #experience > section > h4,
                    //     #experience > section > p,
                    //     #experience > section > ul > li,
                    //     #project > header,
                    //     #project > section > div,
                    //     #contact > header,
                    //     #contact > form > div,
                    //     #contact > form > button
                    // `)) {
                    //     ioView.observe(element);
                    // }

                    for (const element of document.querySelectorAll(`
                        #apresentation > section > p
                    `)) {
                        element.setAttribute('fade', 'inTop');
                    }

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
                            const icon = element.querySelector('.fa-plus');
                            icon.style.transition = 'transform 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19)';
                            icon.style.transform = 'rotate(135deg)';
                        },
                        onCloseStart: function(element) {
                            const icon = element.querySelector('.fa-plus');
                            icon.style.transition = 'transform 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19)';
                            icon.style.transform = 'rotate(0deg)';
                        }
                    });

                    M.CharacterCounter.init(document.querySelectorAll('[data-length]'), {});

                    const contactForm = document.querySelector('#contact > form');

                    function emailOrPhone(event) {
                        event.target.classList.add('dirty');

                        if (
                            contactForm.email.classList.contains('dirty') &&
                            contactForm.phone.classList.contains('dirty')
                        ) {
                            if (
                                (!contactForm.email.validity.valid || !contactForm.email.value) &&
                                (!contactForm.phone.validity.valid || !contactForm.phone.value)
                            ) {
                                contactForm.email.required = true;
                                contactForm.email.classList.remove('valid');
                                contactForm.email.classList.add('invalid');

                                contactForm.phone.required = true;
                                contactForm.phone.classList.remove('valid');
                                contactForm.phone.classList.add('invalid');
                            } else {
                                contactForm.email.required = false;
                                contactForm.email.classList.remove('invalid');
                                contactForm.email.classList.add('valid');

                                contactForm.phone.required = false;
                                contactForm.phone.classList.remove('invalid');
                                contactForm.phone.classList.add('valid');
                            }
                        }

                        if (!event.target.validity.valid) {
                            event.target.classList.remove('valid');
                            event.target.classList.add('invalid');
                        }
                    }

                    contactForm.email.addEventListener('input', emailOrPhone);
                    contactForm.phone.addEventListener('input', emailOrPhone);
                    contactForm.email.addEventListener('focus', emailOrPhone);
                    contactForm.phone.addEventListener('focus', emailOrPhone);

                    const modal = {
                        element: document.querySelector('#contact > #modal'),
                        title: document.querySelector('#contact > #modal > .modal-content > h4'),
                        message: document.querySelector('#contact > #modal > .modal-content > p'),
                    }                
                    modal.instace = M.Modal.init(modal.element, {});
                    //modal.element.style.left = modal.element.style.left !== '75px' ? '75px' : '300px';

                    contactForm.addEventListener('submit', function(event) {
                        event.preventDefault();

                        contactForm.send.disabled = true;

                        firebase.database().ref('/messages').push({
                            name: contactForm.name.value.trim(),
                            phone: contactForm.phone.value.trim(),
                            email: contactForm.email.value.trim(),
                            message: contactForm.message.value.trim()
                        }).then(function() {
                            contactForm.send.disabled = false;

                            modal.title.innerHTML = 'Mesagem enviada com sucesso';
                            modal.message.innerHTML = 'Sua mensagem foi enviada.<br>Retornarei o contato assim que possível, obrigado!';
                            modal.instace.open();
                        }).catch(function(error) {
                            contactForm.send.disabled = false;

                            modal.title.innerHTML = 'Falha ao enviar mesagem';
                            modal.message.innerHTML = 'Ocorreu algum erro ao enviar sua mensagem, um relatório já foi enviado.<br>Você pode entrar em contato comigo através das minhas redes sociais, telefone ou enviar uma mensagem pelo seu seu aplicativo de email preferido, links abaixo.';
                            modal.instace.open();

                            firebase.database().ref('/errors').push({
                                error: error.code,
                                values: {
                                    name: contactForm.name.value.trim(),
                                    phone: contactForm.phone.value.trim(),
                                    email: contactForm.email.value.trim(),
                                    message: contactForm.message.value.trim()
                                }
                            })
                            .then(() => console.log('Error sent successfully'))
                            .catch(() => console.log('Failed to send error'));
                        });
                    });
                }
            });
        }
    });

    firebase.initializeApp({
        apiKey: "AIzaSyBdIwRV9GYHWfxCoPKMmSzamSmRP3EpJLg",
        authDomain: "perfil-costamilam.firebaseapp.com",
        databaseURL: "https://perfil-costamilam.firebaseio.com",
        projectId: "perfil-costamilam",
        storageBucket: "perfil-costamilam.appspot.com",
        messagingSenderId: "399477884691"
    });
});

/*const theme = [
    {
        '--background-primary': '#fff',
        '--background-secondary': '#000',
        '--background-card': '#fff',
        '--color-primary': '#000',
        '--color-secondary': '#fff',
        '--color-hover': 'none'
    }, {
        '--background-primary': '#eceff1',
        '--background-secondary': '#3f51b5',
        '--background-tertiary': '#fff',
        '--color-primary': '#000',
        '--color-secondary': '#039be5',
        '--color-tertiary': '#fff'
    }, {
        '--background-primary': '#000',
        '--background-secondary': '#263238',
        '--background-tertiary': '#000',
        '--color-primary': '#fff',
        '--color-secondary': '#3f51b5',
        '--color-tertiary': '#fff'
    }, {
        '--background-primary': '#eceff1',
        '--background-secondary': '#b71c1c',
        '--background-tertiary': '#fff',
        '--color-primary': '#000',
        '--color-secondary': '#e53935',
        '--color-tertiary': '#fff'
    }, {
        '--background-primary': '#000',
        '--background-secondary': '#e53935',
        '--background-tertiary': '#000',
        '--color-primary': '#fff',
        '--color-secondary': '#b71c1c',
        '--color-tertiary': '#fff'
    }
];
themeButton = document.querySelectorAll('#dropdownTheme > li');
for (let i = 0; i < themeButton.length; i++) {
    themeButton[i].on('click', function() {
        for (const variable in theme[i]) {
            document.body.style.setProperty(variable, theme[i][variable]);
        }
    });
}*/