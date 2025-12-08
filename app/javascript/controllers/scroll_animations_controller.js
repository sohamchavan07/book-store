import { Controller } from "@hotwired/stimulus"

// Enhanced Stimulus controller for professional scroll-based animations
export default class extends Controller {
  connect() {
    this.setupIntersectionObserver()
    this.addParallaxEffect()
    this.initializeCounters()
    this.setupMouseFollowEffect()
    this.setupScrollAnimations()
    this.setupHoverEffects()
  }

  // Advanced Intersection Observer for fade-in animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: [0.1, 0.5],
      rootMargin: "0px 0px -100px 0px"
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view")
          // Animate children with stagger
          const children = entry.target.querySelectorAll(".animate-fade-in-up, .animate-fade-in-up-delay-1, .animate-fade-in-up-delay-2, .animate-fade-in-up-delay-3, .animate-fade-in-up-delay-4, .animate-fade-in-up-delay-5")
          children.forEach((child, index) => {
            child.style.animationDelay = `${index * 100}ms`
          })
        }
      })
    }, observerOptions)

    // Observe all elements with animation classes
    document.querySelectorAll("[class*='animate-']").forEach(el => {
      observer.observe(el)
    })

    // Observe scroll-animate elements
    document.querySelectorAll(".scroll-animate").forEach(el => {
      observer.observe(el)
    })
  }

  // Enhanced parallax effect for background elements
  addParallaxEffect() {
    const parallaxElements = document.querySelectorAll(".animate-blob, .animate-float, [data-parallax]")
    
    if (parallaxElements.length === 0) return

    let ticking = false
    
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY

          parallaxElements.forEach((element, index) => {
            const offset = scrollY * (0.5 - index * 0.1)
            element.style.transform = `translateY(${offset}px)`
          })
          ticking = false
        })
        ticking = true
      }
    }, { passive: true })
  }

  // Animate numbers counting up with easing
  initializeCounters() {
    const counterElements = document.querySelectorAll(".counter, [data-counter]")
    
    if (counterElements.length === 0) return

    const observerOptions = {
      threshold: 0.5
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute("data-counted")) {
          this.animateCounter(entry.target)
          entry.target.setAttribute("data-counted", "true")
        }
      })
    }, observerOptions)

    counterElements.forEach(el => {
      counterObserver.observe(el)
    })
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target") || element.textContent, 10)
    const duration = 2000
    const startTime = performance.now()
    
    const easeOutQuad = (t) => t * (2 - t)

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = easeOutQuad(progress)
      
      element.textContent = Math.floor(target * easeProgress)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  // Enhanced mouse follow effect for interactive cards
  setupMouseFollowEffect() {
    const cards = document.querySelectorAll(".card-premium, .group")
    
    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) * 0.03
        const rotateY = (centerX - x) * 0.03

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`
      }, { passive: true })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)"
      })
    })
  }

  // Setup scroll-triggered animations
  setupScrollAnimations() {
    const scrollElements = document.querySelectorAll(".scroll-animate, .stagger-item")
    
    if (scrollElements.length === 0) return

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view")
          entry.target.classList.add("animate-fade-in-up")
          
          // Add stagger animation if it's a stagger-item
          if (entry.target.classList.contains("stagger-item")) {
            entry.target.classList.add("visible")
          }
          
          scrollObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    scrollElements.forEach(el => {
      scrollObserver.observe(el)
    })
  }

  // Hover effects for enhanced interactivity
  setupHoverEffects() {
    const interactiveElements = document.querySelectorAll(".interactive-element, a[class*='link']")
    
    interactiveElements.forEach(element => {
      element.addEventListener("mouseenter", () => {
        element.style.transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      })
      
      element.addEventListener("mouseleave", () => {
        element.style.transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      })
    })
  }

  // Trigger animation on element
  triggerAnimation(element, animationClass) {
    element.classList.add(animationClass)
    element.addEventListener("animationend", () => {
      element.classList.remove(animationClass)
    }, { once: true })
  }

  // Reveal text character by character
  revealText(element) {
    const text = element.textContent
    element.innerHTML = ""

    Array.from(text).forEach((char, index) => {
      const span = document.createElement("span")
      span.textContent = char
      span.style.opacity = "0"
      span.style.animation = `fadeIn 0.6s ease-out forwards`
      span.style.animationDelay = `${index * 30}ms`
      element.appendChild(span)
    })
  }

  // Setup glow pulse effects
  setupGlowEffects() {
    const glowElements = document.querySelectorAll("[data-glow]")
    
    glowElements.forEach(element => {
      element.classList.add("animate-glow-pulse")
    })
  }

  // Initialize on page load
  initialize() {
    this.setupGlowEffects()
    
    // Add entrance animation to hero section
    const heroSection = document.querySelector("[data-hero]")
    if (heroSection) {
      heroSection.classList.add("animate-fade-in-up")
    }
  }
}
