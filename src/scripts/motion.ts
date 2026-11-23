import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function initLenis() {
  if (typeof window === 'undefined') return null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    syncTouch: false,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function initPageLoader(onComplete?: () => void) {
  if (typeof window === 'undefined') return;

  const loader = document.getElementById('loader');
  if (!loader) {
    onComplete?.();
    return;
  }

  // If user prefers reduced motion or already loaded in session
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    sessionStorage.getItem('phd_visited')
  ) {
    loader.style.display = 'none';
    onComplete?.();
    return;
  }

  sessionStorage.setItem('phd_visited', 'true');

  const chars = loader.querySelectorAll('#loader-name span');
  const bar = document.getElementById('loader-bar');
  const lpL = document.getElementById('lp-l');
  const lpR = document.getElementById('lp-r');

  const tl = gsap.timeline({
    onComplete() {
      loader.style.display = 'none';
      onComplete?.();
    },
  });

  if (chars.length) {
    tl.to(chars, {
      y: '0%',
      duration: 0.75,
      ease: 'power4.out',
      stagger: 0.04,
      delay: 0.1,
    });
  }

  if (bar) {
    tl.to(bar, { width: '100%', duration: 0.6, ease: 'power2.inOut' }, '-=0.2');
  }

  tl.to({}, { duration: 0.15 });

  if (lpL && lpR) {
    tl.to([lpL, lpR], {
      scaleY: 0,
      duration: 0.6,
      ease: 'power3.inOut',
      stagger: 0.06,
    });
  }
}

export function heroEntrance() {
  if (typeof window === 'undefined') return;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReduced) {
    gsap.set('.hero .clip-inner, #hero-eye, #hero-stats, .hero-ctas, #scroll-cue', {
      opacity: 1,
      y: 0,
    });
    document.querySelectorAll('[data-count]').forEach((el) => {
      const target = el.getAttribute('data-count') || '0';
      const prefix = el.getAttribute('data-prefix') || '';
      const suf = el.getAttribute('data-suffix') || '';
      el.textContent = `${prefix}${target}${suf}`;
    });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.to('.hero .clip-inner', { y: '0%', duration: 1.1, stagger: 0.12 }, 0.05);
  tl.to('#hero-eye', { opacity: 1, y: 0, duration: 0.6 }, 0.05);
  tl.to('#hero-stats', { opacity: 1, y: 0, duration: 0.7 }, 0.75);
  tl.to('.hero-ctas', { opacity: 1, y: 0, duration: 0.6 }, 0.9);
  tl.to('#scroll-cue', { opacity: 1, duration: 0.5 }, 1.1);

  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.getAttribute('data-count') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suf = el.getAttribute('data-suffix') || '';

    gsap.to(
      { val: 0 },
      {
        val: target,
        duration: 1.8,
        ease: 'power3.out',
        delay: 0.8,
        onUpdate() {
          const v = Math.round(this.targets()[0].val);
          el.textContent = `${prefix}${v}${suf}`;
        },
      }
    );
  });
}

export function initScrollAnimations() {
  if (typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav scrolled state + section index tracking
  const nav = document.getElementById('main-nav');
  const idx = document.getElementById('nav-index');

  if (nav && idx) {
    document.querySelectorAll('[data-section]').forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => {
          idx.textContent = sec.getAttribute('data-section') || '00';
          nav.classList.add('scrolled');
        },
        onEnterBack: () => {
          idx.textContent = sec.getAttribute('data-section') || '00';
        },
      });
    });

    ScrollTrigger.create({
      trigger: 'body',
      start: 'top -10px',
      onEnter: () => nav.classList.add('scrolled'),
      onLeaveBack: () => {
        nav.classList.remove('scrolled');
        idx.textContent = '00';
      },
    });
  }

  if (isReduced) return;

  // Section heading clip reveals
  document.querySelectorAll('.section .clip-inner, .footer-cta .clip-inner').forEach((el) => {
    gsap.to(el, {
      y: '0%',
      duration: 1.0,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el.closest('.clip-wrap') || el,
        start: 'top 88%',
      },
    });
  });

  // Projects cards stagger
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length) {
    gsap.from(projectCards, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
      },
    });
  }

  // Mouse radial glow for project cards
  projectCards.forEach((card) => {
    card.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const r = (card as HTMLElement).getBoundingClientRect();
      (card as HTMLElement).style.setProperty('--mx', `${mouseEvent.clientX - r.left}px`);
      (card as HTMLElement).style.setProperty('--my', `${mouseEvent.clientY - r.top}px`);
    });
  });

  // FOCUS Section (02 FOCUS) timeline rail and nodes
  const railFill = document.getElementById('focus-rail-fill');
  const focusItems = gsap.utils.toArray<HTMLElement>('.focus-item');

  if (railFill && focusItems.length) {
    ScrollTrigger.create({
      trigger: '#focus-timeline',
      start: 'top 60%',
      end: 'bottom 60%',
      scrub: 0.3,
      onUpdate: (self) => {
        railFill.style.height = `${self.progress * 100}%`;
      },
    });

    focusItems.forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        x: -24,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
      });

      ScrollTrigger.create({
        trigger: item,
        start: 'top 60%',
        end: 'bottom 60%',
        onEnter: () => item.classList.add('is-active'),
        onEnterBack: () => item.classList.add('is-active'),
        onLeave: () => item.classList.remove('is-active'),
        onLeaveBack: () => item.classList.remove('is-active'),
      });
    });
  }

  // STACK (04 STACK) proficiency bars
  document.querySelectorAll<HTMLElement>('.skill-bar-fill').forEach((bar) => {
    const pct = bar.dataset.pct || '0';
    gsap.to(bar, {
      width: `${pct}%`,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 90%',
      },
    });
  });

  const skillCols = document.querySelectorAll('.skill-col');
  if (skillCols.length) {
    gsap.from(skillCols, {
      opacity: 0,
      y: 30,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 82%',
      },
    });
  }

  // WORKFLOWS (05 WORKFLOWS) horizontal / pin effect
  const wfOuter = document.getElementById('wf-outer');
  const wfTrack = document.getElementById('wf-track');
  const wfProg = document.getElementById('wf-prog');

  if (wfOuter && wfTrack && wfProg) {
    const scrollDist = wfTrack.scrollWidth - (wfTrack.parentElement?.offsetWidth || window.innerWidth) + 80;
    if (scrollDist > 0 && window.innerWidth > 768) {
      wfOuter.style.height = `${window.innerHeight + scrollDist}px`;
      gsap.to(wfTrack, {
        x: -scrollDist,
        ease: 'none',
        scrollTrigger: {
          trigger: wfOuter,
          start: 'top top',
          end: () => `+=${scrollDist}`,
          scrub: 1,
          pin: '.wf-sticky',
          onUpdate: (self) => {
            wfProg.style.width = `${self.progress * 100}%`;
          },
        },
      });
    }
  }

  // WRITING / BLOG items stagger
  const blogCards = document.querySelectorAll('.writing-card');
  if (blogCards.length) {
    gsap.from(blogCards, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.writing-grid',
        start: 'top 82%',
      },
    });
  }

  // Links list stagger (07 ELSEWHERE)
  const linkRows = document.querySelectorAll('.link-row');
  if (linkRows.length) {
    gsap.from(linkRows, {
      opacity: 0,
      x: -25,
      duration: 0.75,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: '.links-list',
        start: 'top 82%',
      },
    });
  }

  // Footer CTA
  const fcta = document.querySelector('.fcta-inner');
  if (fcta) {
    gsap.from(fcta, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer-cta',
        start: 'top 85%',
      },
    });
  }

  // Hero parallax
  const heroInner = document.querySelector('.hero-inner');
  const hero = document.querySelector('.hero');
  if (heroInner && hero) {
    gsap.to(heroInner, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}

export function initMagneticButtons() {
  if (typeof window === 'undefined') return;
  if (!window.matchMedia('(hover: hover)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll<HTMLElement>('.btn-primary, .btn-ghost').forEach((btn) => {
    btn.addEventListener('mousemove', (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

export function initCodeCopy() {
  if (typeof window === 'undefined') return;
  document.querySelectorAll('pre').forEach((pre) => {
    if (pre.closest('.code-block-wrapper')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');

    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.innerText || pre.innerText;
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code: ', err);
      }
    });

    wrapper.appendChild(btn);
  });
}
