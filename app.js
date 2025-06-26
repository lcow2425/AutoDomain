// Function to dynamically load the SVG city graphic
function loadSVG () {
    fetch("city.svg")
    .then((response) => { return response.text();})
    .then((svg) => {
        // Inject the SVG into the bg_city container
        document.getElementById('bg_city').innerHTML = svg;

        // Adjust viewBox scaling
        document.querySelector('#bg_city svg').setAttribute("preserveAspectRatio", "xMidYMid slice");

        // Run scroll animation after SVG is loaded
        setAnimationScroll();
    })
}

// Call the function on page load
loadSVG();

// GSAP animation using ScrollTrigger for scroll-based effects
function setAnimationScroll () {
    gsap.registerPlugin(ScrollTrigger);

    // Create a GSAP timeline that triggers on scroll
    let runAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#bg_city",
            start: "top top",
            end: "+=1000",
            scrub: true,
            pin: true
        }
    });

    // First animation: Zoom the whole SVG
    runAnimation.add([
        gsap.to("#bg_city svg", 2, {
            scale: 1.5
        }),
        gsap.to("#full_city", 2, {
            opacity: 0
        })
    ])

    // Animate building layers
    .add([
        gsap.to("#building_top", 2, {
            y: -200,
            opacity: 0
        }),
        gsap.to("#wall_side", 2, {
            x: -200,
            opacity: 0
        }),
        gsap.to("#wall_front", 2, {
            x: 200, y: 200,
            opacity: 0
        })
    ])

    // Animate interior building parts
    .add([
        gsap.to("#interior_wall_side", 2, {
            x: -200,
            opacity: 0
        }),
        gsap.to("#interior_wall_top", 2, {
            y: -200,
            opacity: 0
        }),
        gsap.to("#interior_wall_side_2", 2, {
            opacity: 0
        }),
        gsap.to("#interior_wall_front", 2, {
            opacity: 0
        })
    ]);
}