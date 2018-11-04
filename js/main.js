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
const acceleration = document.querySelector('#apresentation > header > button');
const hideAceleration = function() {
    if (!acceleration.classList.contains('fadeOutRight')) {
        acceleration.style.animationDelay = '0s';
        acceleration.classList.add('fadeOutRight');
    } else {
        acceleration.classList.remove('fadeOutRight');
        acceleration.classList.remove('fadeInRight');
    }

    document.querySelector('#apresentation > header > button').style.cursor = 'default';
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
];*/

//Scrollspy menu
let scrollspy;
document.on('DOMContentLoaded', function() {
    scrollspy = M.ScrollSpy.init(document.querySelectorAll('.scrollspy'), {})

    //M.Dropdown.init(document.querySelector('.dropdown-trigger'), {});

    document.querySelector('body > header > div > p').addEventListener('click', function() {
        if (isMobile) {
            sidenavInstance.close();
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

        const menuIcon = document.querySelector('body > header > div > p > i');
        menuIcon.style.transform = menuIcon.style.transform !== 'rotate(180deg)' ? 'rotate(180deg)' : null;

        const main = document.querySelector('main');
        main.style.marginLeft = main.style.marginLeft !== '75px' ? '75px' : null;

        const footer = document.querySelector('footer');
        footer.style.paddingLeft = footer.style.paddingLeft !== '75px' ? '75px' : null;

        const modal = document.querySelector('#contact > #modal');
        if (modal) {
            modal.style.left = modal.style.left !== '75px' ? '75px' : null;
            modal.style.maxWidth = modal.style.maxWidth !== 'calc(100% - 75px)' ? 'calc(100% - 75px)' : null;
        }
    });

    /*themeButton = document.querySelectorAll('#dropdownTheme > li');
    for (let i = 0; i < themeButton.length; i++) {
        themeButton[i].on('click', function() {
            for (const variable in theme[i]) {
                document.body.style.setProperty(variable, theme[i][variable]);
            }
        });
    }*/
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
                    element.classList.add('fadeInRight');
                }

                //Smoth scroll effect (on anchor link click)
                new SmoothScroll('a[href*="#"]');
                //Smoth scroll effect (on scroll)
                //smooth('main', '0.75s');

                const titleName = document.querySelector('#apresentation > header');
                titleName.onElementIn(elementIn);
                titleName.onElementOut(elementOut);

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

                onElement.execute();

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

                document.querySelector('#contact > form').addEventListener('submit', function(event) {
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
