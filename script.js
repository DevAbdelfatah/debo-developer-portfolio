"use strict";


/* =====================================
   DOM
   ===================================== */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    [...document.querySelectorAll(selector)];


/* =====================================
   CURSOR
   ===================================== */

const cursor = $("#cursor");
const cursorDot = $("#cursorDot");

if (window.innerWidth > 800) {

    window.addEventListener(
        "mousemove",
        event => {

            cursor.style.left =
                `${event.clientX}px`;

            cursor.style.top =
                `${event.clientY}px`;

            cursorDot.style.left =
                `${event.clientX}px`;

            cursorDot.style.top =
                `${event.clientY}px`;

        },
        { passive: true }
    );


    $$("a, button").forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursor.style.width = "46px";
                cursor.style.height = "46px";

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursor.style.width = "32px";
                cursor.style.height = "32px";

            }
        );

    });

}


/* =====================================
   MOBILE MENU
   ===================================== */

const menuButton = $("#menuButton");
const mobileNav = $("#mobileNav");

menuButton.addEventListener(
    "click",
    () => {

        mobileNav.classList.toggle("open");

    }
);


$$(".mobile-nav a").forEach(link => {

    link.addEventListener(
        "click",
        () => {

            mobileNav.classList.remove(
                "open"
            );

        }
    );

});


/* =====================================
   ACTIVE NAV
   ===================================== */

const pageSections =
    $$("main section[id]");

const navigationLinks =
    $$(".desktop-nav a");


function updateNavigation() {

    const position =
        window.scrollY + 170;

    let current = "home";


    pageSections.forEach(section => {

        if (
            position >= section.offsetTop
        ) {

            current =
                section.id;

        }

    });


    navigationLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") ===
                `#${current}`
        );

    });

}


window.addEventListener(
    "scroll",
    updateNavigation,
    { passive: true }
);

updateNavigation();


/* =====================================
   THEME
   ===================================== */

const themeToggle = $("#themeToggle");

const storedTheme =
    localStorage.getItem(
        "debo-portfolio-theme"
    );


if (storedTheme === "light") {

    document.body.classList.add("light");

}


themeToggle.addEventListener(
    "click",
    () => {

        const light =
            document.body.classList.toggle(
                "light"
            );

        localStorage.setItem(
            "debo-portfolio-theme",
            light ? "light" : "dark"
        );

    }
);


/* =====================================
   REVEAL
   ===================================== */

const revealItems =
    $$(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealItems.forEach(
    element =>
        revealObserver.observe(element)
);


/* =====================================
   PROJECT FILTER
   ===================================== */

const projectFilters =
    $$(".project-filter");

const projectCards =
    $$(".project-card");


projectFilters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            projectFilters.forEach(
                button =>
                    button.classList.remove(
                        "active"
                    )
            );

            filter.classList.add("active");

            const category =
                filter.dataset.filter;


            projectCards.forEach(card => {

                const matches =
                    category === "all" ||
                    card.dataset.category ===
                        category;


                if (matches) {

                    card.style.display =
                        "";

                    requestAnimationFrame(
                        () => {

                            card.animate(
                                [
                                    {
                                        opacity: 0,
                                        transform:
                                            "translateY(10px)"
                                    },
                                    {
                                        opacity: 1,
                                        transform:
                                            "translateY(0)"
                                    }
                                ],
                                {
                                    duration: 260,
                                    easing:
                                        "ease-out"
                                }
                            );

                        }
                    );

                } else {

                    card.style.display =
                        "none";

                }

            });

        }
    );

});


/* =====================================
   CONTACT FORM
   ===================================== */

const contactForm =
    $("#contactForm");

const formStatus =
    $("#formStatus");


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            $("#contactName")
                .value.trim();

        const email =
            $("#contactEmail")
                .value.trim();

        const message =
            $("#contactMessage")
                .value.trim();


        const validEmail =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(email);


        formStatus.style.color =
            "";


        if (name.length < 2) {

            formStatus.style.color =
                "#ff7f7f";

            formStatus.textContent =
                "اكتب الاسم بشكل صحيح.";

            $("#contactName").focus();

            return;

        }


        if (!validEmail) {

            formStatus.style.color =
                "#ff7f7f";

            formStatus.textContent =
                "اكتب بريدًا إلكترونيًا صحيحًا.";

            $("#contactEmail").focus();

            return;

        }


        if (message.length < 10) {

            formStatus.style.color =
                "#ff7f7f";

            formStatus.textContent =
                "اكتب تفاصيل أكثر عن المشروع.";

            $("#contactMessage").focus();

            return;

        }


        formStatus.style.color =
            "var(--green)";

        formStatus.textContent =
            `تم تسجيل الرسالة يا ${name}. الواجهة جاهزة للربط مع Backend أو API.`;


        contactForm.reset();

    }
);


/* =====================================
   COMMAND MENU
   ===================================== */

const commandOverlay =
    $("#commandOverlay");

const commandOpen =
    $("#commandOpen");

const commandInput =
    $("#commandInput");

const commandButtons =
    $$("#commandList button");


function openCommandMenu() {

    commandOverlay.classList.add(
        "open"
    );

    document.body.style.overflow =
        "hidden";

    setTimeout(
        () =>
            commandInput.focus(),
        150
    );

}


function closeCommandMenu() {

    commandOverlay.classList.remove(
        "open"
    );

    document.body.style.overflow =
        "";

    commandInput.value = "";

    filterCommands("");

}


commandOpen.addEventListener(
    "click",
    openCommandMenu
);


commandOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            commandOverlay
        ) {

            closeCommandMenu();

        }

    }
);


commandButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const destination =
                button.dataset.command;

            closeCommandMenu();

            const target =
                $(destination);

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});


function filterCommands(query) {

    const text =
        query
            .trim()
            .toLowerCase();


    commandButtons.forEach(button => {

        const label =
            button.textContent
                .toLowerCase();

        button.style.display =
            label.includes(text)
                ? ""
                : "none";

    });

}


commandInput.addEventListener(
    "input",
    () => {

        filterCommands(
            commandInput.value
        );

    }
);


/* =====================================
   KEYBOARD SHORTCUTS
   ===================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openCommandMenu();

        }


        if (event.key === "Escape") {

            closeCommandMenu();

            mobileNav.classList.remove(
                "open"
            );

        }

    }
);


/* =====================================
   YEAR
   ===================================== */

$("#year").textContent =
    new Date().getFullYear();


/* =====================================
   HERO TILT
   ===================================== */

const terminal =
    $(".hero-terminal");

const hero =
    $(".hero");


if (window.innerWidth > 900) {

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;


            const rotateY =
                -4 + (x * 8);

            const rotateX =
                2 - (y * 5);


            terminal.style.transform =
                `
                rotateY(${rotateY}deg)
                rotateX(${rotateX}deg)
                translateY(-2px)
                `;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            terminal.style.transform =
                "rotateY(-4deg) rotateX(2deg)";

        }
    );

}
