document.addEventListener('DOMContentLoaded', () => {
    // Initialize text elements
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    const message = document.querySelector('.message');
    const wish = document.querySelector('.wish');
    const finalWords = document.querySelector('.final-words');
    const replayBtn = document.querySelector('.replay-btn');
    const allTextElements = [title, subtitle, message, wish, finalWords];

    // Gallery elements
    const photoGallery = document.querySelector('.photo-gallery');
    const galleryTitle = document.querySelector('.gallery-title');

    // Timer elements
    const timerContainer = document.querySelector('.timer-container');
    const daysElement = document.querySelector('.days');
    const hoursElement = document.querySelector('.hours');
    const minutesElement = document.querySelector('.minutes');
    const secondsElement = document.querySelector('.seconds');
    const birthdayMusic = document.getElementById('birthdayMusic');
    const soundControlBtn = document.querySelector('.sound-control-btn');
    const soundOnIcon = document.querySelector('.sound-on');
    const soundOffIcon = document.querySelector('.sound-off');
    let isMusicPlaying = false;


    // Timer variables
    let countdownDate = new Date();
    countdownDate.setSeconds(countdownDate.getSeconds()); // Default 5 seconds
    let countdownInterval;

    // Animation state
    let mainTimeline;
    let animationStarted = false;

    // Gallery configuration
    const galleryConfig = {
        rows: 3,      // Number of rows for wave effect
        columns: 4,   // Number of columns for wave effect
    };

    // Create gradient divs for the gallery
    function createImageGridItems() {
        // Clear existing items
        const existingItems = document.querySelectorAll('.photo-item');
        existingItems.forEach(item => item.remove());

        // Set up grid configuration
        const rows = galleryConfig.rows;
        const columns = galleryConfig.columns;
        photoGallery.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        photoGallery.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        const imageUrl = 'static/images/pexels-photo-954975.jpeg';

        // Create each grid piece
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const item = document.createElement('div');
                item.classList.add('photo-item');

                // Set row and column for wave animations
                item.dataset.row = row;
                item.dataset.col = col;

                // Calculate background position for this grid piece
                const backgroundPositionX = (col / (columns - 1)) * 100;
                const backgroundPositionY = (row / (rows - 1)) * 100;

                // Apply image as background with correct positioning
                item.style.backgroundImage = `url(${imageUrl})`;
                item.style.backgroundSize = `${columns * 100}% ${rows * 100}%`;
                item.style.backgroundPosition = `${backgroundPositionX}% ${backgroundPositionY}%`;

                // Add to gallery
                photoGallery.appendChild(item);
            }
        }

        return document.querySelectorAll('.photo-item');
    }

    // Timer function
    function startCountdown(targetDate) {
        clearInterval(countdownInterval);

        // Show the timer at start
        gsap.to(timerContainer, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
            onStart: () => {
                gsap.set(timerContainer, {
                    y: -20,
                    opacity: 0
                });
            }
        });

        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                clearInterval(countdownInterval);

                // Completely hide the timer
                gsap.to(timerContainer, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                        // Start the birthday animation when timer reaches zero
                        if (!animationStarted) {

                            // Play music when animation starts
                            birthdayMusic.play().catch(error => {
                                console.log('Autoplay prevented by browser:', error);
                            });
                            isMusicPlaying = true;
                            soundOnIcon.style.display = 'inline';
                            soundOffIcon.style.display = 'none';
                            mainTimeline.play();
                            animationStarted = true;
                        }
                    }
                });
                return;
            }

            // Calculate time units
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update display
            daysElement.textContent = days < 10 ? `0${days}` : days;
            hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
            minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
            secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;

            // Animate the seconds element
            gsap.fromTo(secondsElement,
                { scale: 1.1, color: '#f472b6' },
                { scale: 1, color: '#f8fafc', duration: 0.5, ease: 'power2.out' }
            );
        }, 1000);
    }

    // Create confetti
    function createConfetti() {
        const container = document.querySelector('.container');
        const colors = ['#38bdf8', '#f472b6', '#4ade80', '#fb923c', '#a855f7', '#facc15'];
        const confettiCount = Math.min(100, Math.floor(window.innerWidth / 10)); // Responsive confetti count

        // Clear existing confetti
        document.querySelectorAll('.confetti').forEach(el => el.remove());

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = -20 + 'px';
            container.appendChild(confetti);
        }

        return document.querySelectorAll('.confetti');
    }

    // Animation for confetti
    function animateConfetti(confetti) {
        gsap.to(confetti, {
            y: '120vh',
            x: i => (Math.random() - 0.5) * (window.innerWidth / 2),
            rotation: i => Math.random() * 360,
            duration: i => 3 + Math.random() * 2,
            opacity: 1,
            stagger: 0.02,
            ease: "power1.out",
            onComplete: () => {
                // Remove confetti after animation
                confetti.forEach(el => el.remove());
            }
        });
    }

    // Improved SplitText function that respects word boundaries
    function splitTextIntoWords(element) {
        const text = element.textContent;
        element.innerHTML = '';

        const words = text.split(' ');
        const wordSpans = [];

        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.classList.add('word');
            wordSpan.style.display = 'inline-block';

            // Add each character to the word span
            for (let i = 0; i < word.length; i++) {
                const charSpan = document.createElement('span');
                charSpan.classList.add('char');
                charSpan.textContent = word[i];
                wordSpan.appendChild(charSpan);
            }

            element.appendChild(wordSpan);
            wordSpans.push(wordSpan);

            // Add a space after each word (except the last word)
            if (index < words.length - 1) {
                const space = document.createElement('span');
                space.innerHTML = '&nbsp;';
                space.style.display = 'inline-block';
                element.appendChild(space);
            }
        });

        return element.querySelectorAll('.char');
    }

    // Function to create the gallery animation with random reveals
    function setupGalleryAnimation() {
        // Create gallery items
        const photoItems = createImageGridItems();

        // Create and animate confetti when gallery appears
        const confetti = createConfetti();

        // Gallery reveal animation
        const galleryTimeline = gsap.timeline();
        galleryTimeline
            .set(photoGallery, {
                display: "grid",
                opacity: 0
            })
            .to(photoGallery, {
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            })
            .to(galleryTitle, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
                onStart: () => {
                    gsap.set(galleryTitle, {
                        opacity: 0,
                        y: -30
                    });

                    // Animate confetti when gallery title appears
                    animateConfetti(confetti);
                }
            });

        // Prepare item positions for random animation
        gsap.set(photoItems, {
            scale: 0,
            opacity: 0,
            rotation: () => Math.random() * 20 - 10 // Random slight rotation
        });

        // Create a shuffled array for random order animation
        const indices = Array.from({ length: photoItems.length }, (_, i) => i);
        const shuffledIndices = [...indices].sort(() => Math.random() - 0.5);

        // Animate each item with varying effects
        shuffledIndices.forEach((index, i) => {
            // Choose a random animation effect for each item
            const effects = [
                {
                    from: { y: -50, rotation: -10, scale: 0 },
                    to: { y: 0, rotation: 0, scale: 1, opacity: 1, ease: "elastic.out(1, 0.5)" }
                },
                {
                    from: { y: 50, rotation: 10, scale: 0 },
                    to: { y: 0, rotation: 0, scale: 1, opacity: 1, ease: "back.out(1.7)" }
                },
                {
                    from: { x: -50, rotation: -5, scale: 0 },
                    to: { x: 0, rotation: 0, scale: 1, opacity: 1, ease: "power2.out" }
                },
                {
                    from: { x: 50, rotation: 5, scale: 0 },
                    to: { x: 0, rotation: 0, scale: 1, opacity: 1, ease: "circ.out" }
                }
            ];
            const effect = effects[Math.floor(Math.random() * effects.length)];

            // Apply starting position
            gsap.set(photoItems[index], effect.from);

            // Animate with a delay based on the shuffled index
            galleryTimeline.to(
                photoItems[index],
                {
                    ...effect.to,
                    duration: 0.7 + Math.random() * 0.5, // Slightly varying duration
                    delay: i * 0.1, // Staggered delay
                },
                "-=0.4" // Overlap animations
            );
        });

        // Add wave animation with gradient background after all pieces have settled
        galleryTimeline.add(() => {
            // Apply gradient overlay to all photo items just before wave animation
            photoItems.forEach(item => {
                // Create or use existing overlay
                let overlay = item.querySelector('.gradient-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'gradient-overlay';
                    overlay.style.position = 'absolute';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.width = '100%';
                    overlay.style.height = '100%';
                    overlay.style.opacity = '0';
                    overlay.style.pointerEvents = 'none';
                    item.style.position = 'relative';
                    item.appendChild(overlay);
                }
            });

            // Animate gradient overlays to appear
            gsap.to('.gradient-overlay', {
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.6), rgba(244, 114, 182, 0.6), rgba(168, 85, 247, 0.6))',
                opacity: 0.7,
                duration: 0.5,
                ease: "power2.inOut"
            });

            // Wave animation
            const waveTimeline = gsap.timeline();

            // Create wave effect by row
            for (let row = 0; row < galleryConfig.rows; row++) {
                const rowItems = Array.from(photoItems).filter(item =>
                    parseInt(item.dataset.row) === row
                );

                waveTimeline.to(rowItems, {
                    y: -15,
                    duration: 0.4,
                    ease: "sine.inOut",
                    stagger: {
                        each: 0.05,
                        from: "start"
                    }
                }, row * 0.1);

                waveTimeline.to(rowItems, {
                    y: 0,
                    duration: 0.4,
                    ease: "sine.inOut",
                    stagger: {
                        each: 0.05,
                        from: "start"
                    }
                }, `>-0.2`);
            }

            // Add a second wave in the other direction
            for (let col = 0; col < galleryConfig.columns; col++) {
                const colItems = Array.from(photoItems).filter(item =>
                    parseInt(item.dataset.col) === col
                );

                waveTimeline.to(colItems, {
                    y: -10,
                    duration: 0.3,
                    ease: "sine.inOut",
                    stagger: {
                        each: 0.04,
                        from: "end"
                    }
                }, 1.2 + col * 0.08);

                waveTimeline.to(colItems, {
                    y: 0,
                    duration: 0.3,
                    ease: "sine.inOut",
                    stagger: {
                        each: 0.04,
                        from: "end"
                    }
                }, `>-0.15`);
            }

            // Fade out gradient overlays after wave animation
            waveTimeline.to('.gradient-overlay', {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                delay: 0.5
            });

            return waveTimeline;
        }, "+=0.5");

        // Show replay button after gallery is revealed
        galleryTimeline.to(replayBtn, {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: "power1.in",
            onStart: () => {
                gsap.set(replayBtn, { opacity: 0, y: 20 });
            }
        });

        return galleryTimeline;
    }

    // Function to create the main timeline
    function createMainTimeline() {
        // Kill any existing timeline to prevent memory leaks
        if (mainTimeline) {
            mainTimeline.kill();
        }

        // Create a new timeline
        const timeline = gsap.timeline({ paused: true });

        // Split text into words, then characters
        const titleChars = splitTextIntoWords(title);
        const subtitleChars = splitTextIntoWords(subtitle);
        const messageChars = splitTextIntoWords(message);
        const wishChars = splitTextIntoWords(wish);
        const finalChars = splitTextIntoWords(finalWords);

        // Make elements visible for character manipulation
        gsap.set(allTextElements, { opacity: 1 });

        // 1. Title animation - character by character
        timeline
            .to(titleChars, {
                duration: 0.05,
                opacity: 1,
                y: 0,
                stagger: 0.08,
                ease: "power2.out",
                onStart: () => {
                    gsap.set(titleChars, {
                        y: -50,
                        opacity: 0
                    });
                }
            })
            .to(titleChars, {
                duration: 0.05,
                opacity: 0,
                y: 50,
                stagger: 0.05,
                ease: "power2.in",
                delay: 1
            });

        // 2. Subtitle animation
        timeline
            .to(subtitleChars, {
                duration: 0.05,
                opacity: 1,
                x: 0,
                stagger: 0.06,
                ease: "back.out(1.7)",
                onStart: () => {
                    gsap.set(subtitleChars, {
                        x: index => index % 2 === 0 ? -30 : 30,
                        opacity: 0
                    });
                }
            })
            .to(subtitleChars, {
                duration: 0.04,
                opacity: 0,
                x: index => index % 2 === 0 ? -30 : 30,
                stagger: 0.04,
                ease: "power2.in",
                delay: 1
            });

        // 3. Message animation
        timeline
            .to(messageChars, {
                duration: 0.04,
                opacity: 1,
                scale: 1,
                rotation: 0,
                stagger: 0.05,
                ease: "elastic.out(1, 0.3)",
                onStart: () => {
                    gsap.set(messageChars, {
                        scale: 0,
                        rotation: 15,
                        opacity: 0
                    });
                }
            })
            .to(messageChars, {
                duration: 0.03,
                opacity: 0,
                scale: 0.5,
                stagger: 0.02,
                ease: "power2.in",
                delay: 1.2
            });

        // 4. Wish animation
        timeline
            .to(wishChars, {
                duration: 0.03,
                opacity: 1,
                y: 0,
                stagger: 0.02,
                ease: "power1.out",
                onStart: () => {
                    gsap.set(wishChars, {
                        y: 20,
                        opacity: 0
                    });
                }
            })
            .to(wishChars, {
                duration: 0.03,
                opacity: 0,
                y: -20,
                stagger: 0.01,
                ease: "power1.in",
                delay: 2.5 // Longer time to read the wish
            });

        // 5. Add photo gallery reveal after the wishes animation
        timeline.add(setupGalleryAnimation());

        return timeline;
    }

    // Handle window resize
    function handleResize() {
        // Update animations based on window size if needed
        const confettiElements = document.querySelectorAll('.confetti');
        if (confettiElements.length > 0) {
            gsap.to(confettiElements, {
                x: i => (Math.random() - 0.5) * (window.innerWidth / 2)
            });
        }
    }

    // Function to reset and restart all animations
    function resetAndRestart() {
        // Kill all active GSAP animations
        gsap.killTweensOf("*");

        if (isMusicPlaying) {
            birthdayMusic.currentTime = 0;
        }

        // Clean up existing elements
        document.querySelectorAll('.photo-item').forEach(item => item.remove());
        document.querySelectorAll('.gradient-overlay').forEach(overlay => overlay.remove());
        document.querySelectorAll('.confetti').forEach(el => el.remove());

        // Reset animation state
        animationStarted = false;

        // Reset all text elements
        allTextElements.forEach(el => {
            gsap.set(el, { opacity: 0, clearProps: "opacity" });
        });

        // Hide gallery and reset its properties
        gsap.set(photoGallery, { display: "none", opacity: 0 });

        // Hide replay button
        gsap.set(replayBtn, { opacity: 0 });

        // Reset container visibility
        gsap.set('.container', { opacity: 1 });

        // Create a new main timeline
        mainTimeline = createMainTimeline();

        // Reset countdown and start animation
        countdownDate = new Date();
        countdownDate.setSeconds(countdownDate.getSeconds()); // Reset to 5 seconds
        startCountdown(countdownDate);
    }

    // Toggle sound function
    function toggleSound() {
        if (isMusicPlaying) {
            birthdayMusic.pause();
            soundOnIcon.style.display = 'none';
            soundOffIcon.style.display = 'inline';
        } else {
            birthdayMusic.play().catch(error => {
                console.log('Play prevented by browser:', error);
            });
            soundOnIcon.style.display = 'inline';
            soundOffIcon.style.display = 'none';
        }
        isMusicPlaying = !isMusicPlaying;
    }
    // Replay animation on button click
    replayBtn.addEventListener('click', resetAndRestart);

    // Initialize the page
    window.addEventListener('resize', handleResize);

    // Add click event listener to sound control button
    soundControlBtn.addEventListener('click', toggleSound);

    // Create the initial timeline and start the animation
    mainTimeline = createMainTimeline();
    startCountdown(countdownDate);
});