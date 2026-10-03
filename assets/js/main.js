/* JJT 介绍站 · 交互脚本（导航折叠 / 浮动按钮 / 链接绑定） */
(function () {
  'use strict';

  /* ---------- 网盘按钮：统一读 links.js ---------- */
  var links = window.SITE_LINKS || {};
  document.querySelectorAll('[data-link="download"]').forEach(function (el) {
    if (el.tagName === 'A' && links.download) {
      el.setAttribute('href', links.download);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    } else if (el.tagName === 'BUTTON' && links.download) {
      el.addEventListener('click', function () {
        window.open(links.download, '_blank', 'noopener');
      });
    }
  });

  /* ---------- 移动端折叠导航 ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var header = document.querySelector('.site-header');
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    /* 点完链接自动收起 */
    document.querySelectorAll('.site-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 右下角浮动按钮：返回顶部 + 下载 ---------- */
  var toTop = document.querySelector('.fab-top');
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 420) {
        toTop.classList.add('is-shown');
      } else {
        toTop.classList.remove('is-shown');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 细节：页面内锚点平滑滚动 ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
})();
