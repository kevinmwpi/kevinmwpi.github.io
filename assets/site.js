/*
  kevinmwpi.github.io: scroll behaviour.

  The page is complete without this file. It only adds motion, and every part
  of it is paired with a block in assets/style.css ("Motion" and "Pinned bar").

  1  measure the top of the page, so it can hold still while the rest slides over
  2  publish two numbers while scrolling: --cover and --progress
  3  show the pinned bar and mark the section being read
  4  let rows that start below the screen settle in as they arrive
*/
(function () {
  "use strict";

  var root = document.documentElement;
  var hero = document.querySelector(".hero");
  var bar = document.querySelector(".bar");

  // Pages without the big header (the 404 page) have nothing to do here.
  if (!hero || !bar) {
    return;
  }

  var prefersLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sections = document.querySelectorAll("main .section");
  var barList = bar.querySelector("ul");
  var barLinks = bar.querySelectorAll("li a");

  var heroHeight = hero.offsetHeight;
  var isPinned = false;
  var currentId = null;
  var frameQueued = false;

  // ---------------------------------------------------------------- 1
  // The stylesheet pins the top of the page with "position: sticky" and needs
  // to know how tall it is. Measure it now and again whenever it changes
  // (window resized, fonts loaded, phone rotated).
  function measureHero() {
    heroHeight = hero.offsetHeight;
    root.style.setProperty("--hero-h", heroHeight + "px");
    update();
  }

  if ("ResizeObserver" in window) {
    new ResizeObserver(measureHero).observe(hero);
  }

  // The links at the top can still take keyboard focus while they are covered.
  // If that happens, scroll back up so the focused link can be seen.
  hero.addEventListener("focusin", function (event) {
    if (event.target.matches(":focus-visible")) {
      window.scrollTo(0, 0);
    }
  });

  // ---------------------------------------------------------------- 2 and 3
  function update() {
    frameQueued = false;

    var scrolled = window.scrollY;
    var windowHeight = window.innerHeight;

    // --progress: 0 at the top of the page, 1 at the very bottom. Only the bar
    // uses it, so it is set on the bar and nothing else has to be restyled.
    var scrollable = Math.max(1, root.scrollHeight - windowHeight);
    var progress = Math.min(1, Math.max(0, scrolled / scrollable));
    bar.style.setProperty("--progress", progress.toFixed(4));

    // --cover: 0 while the top of the page is untouched, 1 once it is fully
    // covered. If the window is shorter than the top of the page, the top
    // scrolls for a while first, so start counting only once it holds still.
    if (!prefersLessMotion) {
      var scrollBeforeHold = Math.max(0, heroHeight - windowHeight);
      var coverDistance = Math.max(1, heroHeight - scrollBeforeHold);
      var cover = (scrolled - scrollBeforeHold) / coverDistance;
      cover = Math.min(1, Math.max(0, cover));
      hero.style.setProperty("--cover", cover.toFixed(3));
    }

    // The bar appears as the sliding page reaches the strip the bar will
    // occupy, so a jump to the first section never leaves a sliver of the
    // name showing above it.
    var shouldPin = scrolled >= heroHeight - bar.offsetHeight - 1;
    if (shouldPin !== isPinned) {
      isPinned = shouldPin;
      root.classList.toggle("is-pinned", isPinned);
      bar.inert = !isPinned;
    }

    // The section being read is the last one whose top edge has passed a line
    // 40% of the way down the window.
    var readingLine = windowHeight * 0.4;
    var readingId = null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= readingLine) {
        readingId = sections[i].id;
      }
    }
    markSection(readingId, false);
  }

  // Move the orange marker on the pinned bar to the link for this section.
  function markSection(id, force) {
    if (id === currentId && !force) {
      return;
    }
    currentId = id;

    var currentLink = null;
    for (var i = 0; i < barLinks.length; i++) {
      var link = barLinks[i];
      if (id && link.getAttribute("href") === "#" + id) {
        link.setAttribute("aria-current", "true");
        currentLink = link;
      } else {
        link.removeAttribute("aria-current");
      }
    }

    if (currentLink) {
      barList.style.setProperty("--marker-x", currentLink.offsetLeft + "px");
      barList.style.setProperty("--marker-w", currentLink.offsetWidth + "px");
    } else {
      barList.style.setProperty("--marker-w", "0px");
    }
  }

  // Scroll events can fire many times per frame. Do the work once per frame.
  window.addEventListener("scroll", function () {
    if (!frameQueued) {
      frameQueued = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });

  // After a resize the links on the bar have moved, so place the marker again.
  window.addEventListener("resize", function () {
    measureHero();
    markSection(currentId, true);
  });

  measureHero();

  // ---------------------------------------------------------------- 4
  // Sections, rows and work items that start below the bottom of the window
  // get the class "pre" (hidden, rule not yet drawn). When one scrolls into
  // view the class is removed and the stylesheet animates it into place.
  // Anything already on screen when the page loads is left alone, so nothing
  // visible ever flashes or disappears.
  if (!prefersLessMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.remove("pre");
          observer.unobserve(entries[i].target);
        }
      }
    }, { rootMargin: "0px 0px -10% 0px" });

    var pieces = document.querySelectorAll(".section, .row, .item");
    for (var j = 0; j < pieces.length; j++) {
      if (pieces[j].getBoundingClientRect().top > window.innerHeight) {
        pieces[j].classList.add("pre");
        observer.observe(pieces[j]);
      }
    }
  }
})();
