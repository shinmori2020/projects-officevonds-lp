'use strict';

(function () {
  /* ============================================================
     ハンバーガーメニュー
     ============================================================ */
  var hamburger = document.getElementById('js-hamburger');
  var nav = document.getElementById('js-nav');
  var overlay = null;

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.classList.add('header__overlay');
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeMenu);
  }

  function openMenu() {
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'メニューを閉じる');
    nav.classList.add('is-open');
    if (overlay) overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'メニューを開く');
    nav.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  if (hamburger && nav) {
    createOverlay();

    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.contains('is-active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // ナビリンクをクリックしたらメニューを閉じる
    var navLinks = nav.querySelectorAll('.header__nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ============================================================
     スクロールアニメーション（Intersection Observer）
     ============================================================ */
  var fadeInElements = document.querySelectorAll('.js-fade-in');

  if (fadeInElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeInElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Intersection Observer非対応の場合はすべて表示
    fadeInElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ============================================================
     ヘッダーの固定バナー表示制御（SP用）
     ============================================================ */
  var fixedBanner = document.getElementById('js-fixed-banner');
  var header = document.getElementById('header');

  if (fixedBanner && header) {
    var lastScrollY = 0;

    window.addEventListener(
      'scroll',
      function () {
        var currentScrollY = window.scrollY;

        // ヘッダーの高さ分以上スクロールしたら表示
        if (currentScrollY > header.offsetHeight) {
          fixedBanner.style.transform = 'translateY(0)';
        } else {
          fixedBanner.style.transform = 'translateY(100%)';
        }

        lastScrollY = currentScrollY;
      },
      { passive: true }
    );

    // 初期状態：非表示
    fixedBanner.style.transform = 'translateY(100%)';
    fixedBanner.style.transition = 'transform 0.3s ease';
  }

  /* ============================================================
     スムーススクロール（アンカーリンク）
     ============================================================ */
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition =
          target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
})();
