const lenis = new Lenis();

lenis.on('scroll', (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    const cards = [
        {id : "#card-1", endTranslateX: -1500, rotate: 45 },
        {id : "#card-2", endTranslateX: -1500, rotate: -30 } ,
        {id : "#card-3", endTranslateX: -1500, rotate: 45 },
        {id : "#card-4", endTranslateX: -1500, rotate: -30 },
    ];

    ScrollTrigger.create({
        trigger: ".wrapper-hero",
        start: "top top",
        end: "+=900vh",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
            gsap.to(".wrapper-hero", {
                x: `${-350 * self.progress}vw`,
                duration: 0.5,
                ease: "power3.out",
            });
        },
    });



    cards.forEach((card) => {
        ScrollTrigger.create({
            trigger: "card.id",
            start: "top top",
            end: "+=1200vh",
            scrub: 1,
            onUpdate: (self) => {
                gsap.to(card.id, {
                    x: `${card.endTranslateX * self.progress}px`,
                    rotate: `${card.rotate * self.progress}deg`,
                    duration: 0.5,
                    ease: "power3.out",
                });
            },
        });
    });

    const svgElement = document.querySelector('svg');

    gsap.set(svgElement, {
        scale: 1,
        y: 0,
        transformOrigin: "center center"
    });

    ScrollTrigger.create({
        trigger: svgElement,
        start: "top top",
        end: "+=1600vh",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
            const scale = 1 + self.progress * 6; 
            gsap.to(svgElement, {
                y: `${-100 * self.progress}vw`,
                scale: scale,
                duration: 0.5,
                ease: "power3.out",
            });
        },
    });
});