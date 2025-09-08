
/*-- Header --*/
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenu) {
        mobileMenu.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }
});

/*-- Cursor --*/
document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector(".cursor");

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener("mouseover", (e) => {
        let color = window.getComputedStyle(e.target).color || "rgba(0, 0, 0, 0.6)";
        cursor.style.backgroundColor = color;
    });

    document.addEventListener("mouseout", () => {
        cursor.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".service-cardtwo");
    const serviceSection = document.querySelector(".servicestwo");

    // Enhanced Intersection Observer for cards with improved animations
    const cardObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("animate", "fade-in", "visible");
                        entry.target.style.animation = `floatIn 0.8s ease-out ${index * 0.2}s forwards`;
                        
                        // Enhanced hover effects
                        entry.target.addEventListener("mouseenter", () => {
                            const icon = entry.target.querySelector("i");
                            if (icon) {
                                icon.style.transform = "scale(1.3) rotate(720deg)";
                                icon.style.transition = "transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                            }
                            entry.target.style.transform = "translateY(-15px) scale(1.03)";
                            entry.target.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)";
                        });
                        
                        entry.target.addEventListener("mouseleave", () => {
                            const icon = entry.target.querySelector("i");
                            if (icon) {
                                icon.style.transform = "scale(1) rotate(0deg)";
                            }
                            entry.target.style.transform = "translateY(0) scale(1)";
                            entry.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
                        });
                        
                        observer.unobserve(entry.target);
                    }, index * 150);
                }
            });
        },
        { 
            threshold: 0.3,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    // Observe each card with enhanced effects
    cards.forEach((card) => {
        cardObserver.observe(card);
        
        // Improved click animation with ripple effect
        card.addEventListener("click", function(e) {
            let ripple = document.createElement("div");
            ripple.classList.add("ripple");
            this.appendChild(ripple);
            
            let rect = this.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.style.transform = "scale(0.98) translateY(5px)";
            setTimeout(() => {
                this.style.transform = "";
                ripple.remove();
            }, 300);
        });
    });

    // Enhanced parallax effect with smooth acceleration
    let lastScrollTop = 0;
    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (serviceSection) {
                    const scrolled = window.pageYOffset;
                    const scrollDelta = scrolled - lastScrollTop;
                    const acceleration = Math.min(Math.abs(scrollDelta) * 0.05, 1);
                    
                    cards.forEach((card, index) => {
                        const cardTop = card.getBoundingClientRect().top;
                        if (cardTop < window.innerHeight && cardTop > -card.offsetHeight) {
                            const parallaxRate = (scrolled * 0.3 * (index + 1) * 0.1) * acceleration;
                            const rotateRate = scrollDelta * 0.02;
                            card.style.transform = `translateY(${parallaxRate}px) rotateX(${rotateRate}deg)`;
                            card.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
                        }
                    });
                    
                    lastScrollTop = scrolled;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Enhanced touch device handling
    if ('ontouchstart' in window) {
        cards.forEach(card => {
            card.classList.add('touch-device');
            
            let touchStartY;
            
            card.addEventListener('touchstart', function(e) {
                touchStartY = e.touches[0].clientY;
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.2s ease-out';
            });
            
            card.addEventListener('touchmove', function(e) {
                const touchY = e.touches[0].clientY;
                const deltaY = touchY - touchStartY;
                const normalizedDelta = deltaY / window.innerHeight;
                this.style.transform = `scale(0.98) translateY(${normalizedDelta * 30}px)`;
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
                this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }
});


/*-- Preloader --*/
window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    const loaderContent = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-progress">Loading...</div>
        </div>
    `;

    if (preloader && !sessionStorage.getItem('preloaderShown')) {
        preloader.innerHTML = loaderContent;

        let progress = 0;
        const progressText = preloader.querySelector('.loader-progress');

        const updateProgress = () => {
            if (progress < 100) {
                progress += Math.random() * 10 + 5; // More gradual progress
                if (progress > 100) progress = 100;
                progressText.textContent = `${Math.floor(progress)}%`;
            } else {
                clearInterval(progressInterval);
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    sessionStorage.setItem('preloaderShown', 'true');
                }, 600);
            }
        };

        const progressInterval = setInterval(updateProgress, 100); // Faster updates

        // Ensure preloader is hidden after a maximum time
        setTimeout(() => {
            clearInterval(progressInterval);
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
                sessionStorage.setItem('preloaderShown', 'true');
            }, 600);
        }, 10000); // 10 seconds max
    } else {
        preloader.style.display = 'none';
    }
});

// Logo Slider (if present)
const logoSlider = document.getElementById('logoSlider');
if (logoSlider) {
  // Clone slider content for infinite scroll
  logoSlider.innerHTML += logoSlider.innerHTML;
    
  // Add smooth scrolling animation
  let scrollPos = 0;
  const scrollSpeed = 1;
    
  function autoScroll() {
      scrollPos += scrollSpeed;
      if (scrollPos >= logoSlider.scrollWidth / 2) {
          scrollPos = 0;
      }
      logoSlider.scrollLeft = scrollPos;
      requestAnimationFrame(autoScroll);
  }
    
  // Pause on hover
  logoSlider.addEventListener('mouseenter', () => {
      cancelAnimationFrame(autoScroll);
  });
    
  logoSlider.addEventListener('mouseleave', () => {
      requestAnimationFrame(autoScroll);
  });
    
  // Start the animation
  requestAnimationFrame(autoScroll);
}

// Service Section Each 

// Counter Animation
document.addEventListener("DOMContentLoaded", function() {
    let counters = document.querySelectorAll(".count-number");
    let speed = 100;

    counters.forEach(counter => {
        let updateCount = () => {
            let target = +counter.getAttribute("data-target");
            let count = +counter.innerText;
            let increment = target / speed;

            if(count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
});

// About Section
const slides = document.querySelectorAll('.slide');
const tabs = document.querySelectorAll('.tab');
const progressBar = document.querySelector('.progress');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const slideNumber = document.getElementById('slide-number');

let currentIndex = 0;

function updateSlider() {
    if (slides && slides.length && tabs && tabs.length && progressBar && slideNumber) {
        slides.forEach(slide => slide.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));

        slides[currentIndex].classList.add('active');
        tabs[currentIndex].classList.add('active');
        progressBar.style.width = `${(currentIndex / (slides.length - 1)) * 100}%`;
        slideNumber.textContent = `${currentIndex + 1} / ${slides.length}`;
    }
}
if (prevButton) {
    prevButton.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
        updateSlider();
    });
}
if (nextButton) {
    nextButton.addEventListener('click', () => {
        currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
        updateSlider();
    });
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        currentIndex = parseInt(tab.getAttribute('data-index'));
        updateSlider();
    });
});

updateSlider();


// Animation on Scroll for Tech Cards
const techCards = document.querySelectorAll('.tech-card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.2 });

techCards.forEach(card => observer.observe(card));


// Terms and Conditions
document.addEventListener("DOMContentLoaded", function() {
    // Toggle Terms Sections
    const headers = document.querySelectorAll(".terms-header");

    headers.forEach(header => {
        header.addEventListener("click", function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector("i");

            // Close all other sections
            document.querySelectorAll(".terms-content").forEach(section => {
                if (section !== content) {
                    section.style.display = "none";
                    const otherIcon = section.previousElementSibling.querySelector("i");
                    if (otherIcon) {
                        otherIcon.style.transform = "rotate(0deg)";
                    }
                }
            });

            // Toggle current section
            content.style.display = content.style.display === "block" ? "none" : "block";

            // Rotate icon
            icon.style.transform = content.style.display === "block" ? "rotate(180deg)" : "rotate(0deg)";
        });
    });
});

// Privacy Policy
document.addEventListener("DOMContentLoaded", function() {
    // Toggle Privacy Policy Sections
    const headers = document.querySelectorAll(".privacy-header");

    headers.forEach(header => {
        header.addEventListener("click", function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector("i");

            // Close all other sections
            document.querySelectorAll(".privacy-content").forEach(section => {
                if (section !== content) section.style.display = "none";
            });

            // Toggle current section
            content.style.display = content.style.display === "block" ? "none" : "block";

            // Rotate icon
            icon.style.transform = content.style.display === "block" ? "rotate(180deg)" : "rotate(0deg)";
        });
    });
});
  
  