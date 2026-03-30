
/* ── Scroll Reveal ── */
function initScrollReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
}


/* ── Media Data ── */
var projectMedia = {

  inventory: [
    { type: 'image', src: 'assets/projects/inventory/Screenshot 2026-02-17 220243.png', alt: 'Inventory dashboard' },
    { type: 'image', src: 'assets/projects/inventory/Screenshot 2026-02-17 220939.png', alt: 'Inventory view' },
    { type: 'image', src: 'assets/projects/inventory/Screenshot 2026-02-17 221204.png', alt: 'Inventory view' },
    { type: 'image', src: 'assets/projects/inventory/Screenshot 2026-02-17 221552.png', alt: 'Inventory view' },
    { type: 'image', src: 'assets/projects/inventory/Screenshot 2026-02-17 222602.png', alt: 'Inventory view' },
    { type: 'video', src: 'assets/videos/inventory/inventory.mp4' }
  ],

  clinic: [
    { type: 'image', src: 'assets/projects/clinic/MedLink (1).png',             alt: 'Clinic homepage' },
    { type: 'image', src: 'assets/projects/clinic/Doctor Search.png',            alt: 'Doctor search' },
    { type: 'image', src: 'assets/projects/clinic/login_clinic.png',             alt: 'Login page' },
    { type: 'image', src: 'assets/projects/clinic/Clinic Dashboard.png',         alt: 'Clinic dashboard' },
    { type: 'image', src: 'assets/projects/clinic/Sign_Up.png',                  alt: 'Sign up page' },
    { type: 'video', src: 'assets/videos/clinic/ClinicManagementSystemMedLink.mp4' }
  ],

  skincare: [
    { type: 'image', src: 'assets/projects/skincare/Screenshot 2026-02-18 180005.png', alt: 'Skincare homepage' },
    { type: 'image', src: 'assets/projects/skincare/Screenshot 2026-02-18 180045.png', alt: 'Skincare view' },
    { type: 'image', src: 'assets/projects/skincare/Screenshot 2026-02-18 180107.png', alt: 'Skincare view' },
    { type: 'image', src: 'assets/projects/skincare/Screenshot 2026-02-18 180134.png', alt: 'Skincare view' },
    { type: 'image', src: 'assets/projects/skincare/Screenshot 2026-02-18 180212.png', alt: 'Skincare view' },
    { type: 'image', src: 'assets/projects/skincare/Screenshot 2026-02-18 180243.png', alt: 'Skincare view' },
    { type: 'image', src: 'assets/projects/skincare/Screenshot 2026-02-18 180303.png', alt: 'Skincare view' },
    { type: 'video', src: 'assets/videos/skincare/skincare-demo.mp4' }
  ],

  ner: [
    { type: 'image', src: 'assets/projects/ner/GuiScreeenshot.jpg', alt: 'NER interface' },
    { type: 'pdf',   src: 'assets/projects/ner/NER Arabic Model Presentation.pdf' }
  ]

};


/* ── Lightbox ── */
var lightbox = { el: null, img: null, counter: null, images: [], index: 0 };

function buildLightbox() {
  if (document.getElementById('lb-overlay')) return;

  var overlay = document.createElement('div');
  overlay.id = 'lb-overlay';
  overlay.innerHTML =
    '<button class="lb-close" aria-label="Close">&#10005;</button>'
  + '<button class="lb-arrow lb-prev" aria-label="Previous">&#8592;</button>'
  + '<div class="lb-img-wrap"><img id="lb-img" src="" alt="" /></div>'
  + '<button class="lb-arrow lb-next" aria-label="Next">&#8594;</button>'
  + '<div class="lb-counter" id="lb-counter"></div>';

  document.body.appendChild(overlay);
  lightbox.el      = overlay;
  lightbox.img     = document.getElementById('lb-img');
  lightbox.counter = document.getElementById('lb-counter');

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeLightbox();
  });
  overlay.querySelector('.lb-close').addEventListener('click', closeLightbox);
  overlay.querySelector('.lb-prev').addEventListener('click', function(e) {
    e.stopPropagation(); lightboxGo(lightbox.index - 1);
  });
  overlay.querySelector('.lb-next').addEventListener('click', function(e) {
    e.stopPropagation(); lightboxGo(lightbox.index + 1);
  });

  document.addEventListener('keydown', function(e) {
    if (!lightbox.el || !lightbox.el.classList.contains('lb-open')) return;
    if (e.key === 'ArrowLeft')  lightboxGo(lightbox.index - 1);
    if (e.key === 'ArrowRight') lightboxGo(lightbox.index + 1);
    if (e.key === 'Escape')     closeLightbox();
  });

  var touchStartX = 0;
  overlay.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  overlay.addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) lightboxGo(diff > 0 ? lightbox.index + 1 : lightbox.index - 1);
  });
}

function openLightbox(items, startIndex) {
  buildLightbox();
  lightbox.images = items;
  lightboxGo(startIndex);
  lightbox.el.classList.add('lb-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  var vid = lightbox.el.querySelector('video');
  if (vid) vid.pause();
  lightbox.el.classList.remove('lb-open');
  document.body.style.overflow = '';
}

function lightboxGo(index) {
  var total = lightbox.images.length;
  lightbox.index = (index + total) % total;

  var item = lightbox.images[lightbox.index];
  var src  = typeof item === 'string' ? item : item.src;
  var type = typeof item === 'string' ? 'image' : item.type;
  var wrap = lightbox.el.querySelector('.lb-img-wrap');

  if (type === 'video') {
    var oldVid = wrap.querySelector('video');
    if (oldVid) oldVid.pause();
    wrap.innerHTML =
      '<video controls autoplay preload="metadata" style="max-width:100%;max-height:calc(100vh - 80px);border-radius:10px;box-shadow:0 0 0 1px rgba(129,140,248,0.2),0 0 60px rgba(129,140,248,0.15);">'
    +   '<source src="' + src + '" type="video/mp4">'
    + '</video>';
    lightbox.img.style.display = 'none';
  } else {
    var oldVid2 = wrap.querySelector('video');
    if (oldVid2) { oldVid2.pause(); wrap.innerHTML = ''; wrap.appendChild(lightbox.img); }
    lightbox.img.style.display = '';
    lightbox.img.src = src;
  }

  lightbox.counter.textContent = (lightbox.index + 1) + ' / ' + total;
  lightbox.el.querySelectorAll('.lb-arrow').forEach(function(a) {
    a.style.display = total > 1 ? '' : 'none';
  });
}


/* ── Slider Builder ── */
var expandIcon =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">'
+ '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>'
+ '</svg>';

function buildSlider(card) {
  var projectKey = card.getAttribute('data-project');
  var mediaList  = projectMedia[projectKey] || [];
  var container  = card.querySelector('.project-media');
  if (!container) return;

  if (mediaList.length === 0) {
    container.innerHTML = '<div class="media-placeholder">Screenshots coming soon</div>';
    return;
  }

  var lightboxItems = mediaList
    .filter(function(item) { return item.type === 'image' || item.type === 'video'; })
    .map(function(item)    { return { src: item.src, type: item.type }; });

  var trackHTML = '<div class="media-track">';

  mediaList.forEach(function(item) {
    var lbIdx = lightboxItems.findIndex(function(x) { return x.src === item.src; });

    if (item.type === 'image') {
      trackHTML +=
        '<div class="media-slide-wrap">'
      +   '<img class="media-slide" src="' + item.src + '" alt="' + (item.alt || '') + '" loading="lazy" data-lb-index="' + lbIdx + '">'
      +   '<button class="lb-trigger" aria-label="View fullscreen" data-lb-index="' + lbIdx + '">' + expandIcon + '</button>'
      + '</div>';

    } else if (item.type === 'video') {
      trackHTML +=
        '<div class="media-slide-video" style="position:relative;">'
      +   '<video controls preload="metadata">'
      +     '<source src="' + item.src + '" type="video/mp4">'
      +   '</video>'
      +   '<button class="lb-trigger" aria-label="View fullscreen" data-lb-index="' + lbIdx + '" style="top:10px;right:10px;">' + expandIcon + '</button>'
      + '</div>';

    } else if (item.type === 'pdf') {
      trackHTML +=
        '<div class="media-slide-pdf">'
      +   '<iframe src="' + item.src + '#toolbar=0&navpanes=0" class="pdf-iframe" title="Project PDF" loading="lazy"></iframe>'
      + '</div>';
    }
  });

  trackHTML += '</div>';

  var buttonsHTML = '';
  if (mediaList.length > 1) {
    buttonsHTML =
      '<button class="media-btn media-btn-prev" aria-label="Previous">'
    +   '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>'
    + '</button>'
    + '<button class="media-btn media-btn-next" aria-label="Next">'
    +   '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>'
    + '</button>';
  }

  var dotsHTML = '<div class="media-dots">';
  mediaList.forEach(function(_, i) {
    dotsHTML += '<div class="media-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></div>';
  });
  dotsHTML += '</div>';

  container.innerHTML = trackHTML + buttonsHTML + dotsHTML;

  var currentIndex = 0;
  var total        = mediaList.length;
  var track        = container.querySelector('.media-track');
  var dots         = container.querySelectorAll('.media-dot');

  function goTo(index) {
    currentIndex = (index + total) % total;
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    dots.forEach(function(dot, i) { dot.classList.toggle('active', i === currentIndex); });
  }

  var prevBtn = container.querySelector('.media-btn-prev');
  var nextBtn = container.querySelector('.media-btn-next');
  if (prevBtn) prevBtn.addEventListener('click', function() { goTo(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function() { goTo(currentIndex + 1); });

  dots.forEach(function(dot) {
    dot.addEventListener('click', function() { goTo(parseInt(dot.getAttribute('data-index'))); });
  });

  container.addEventListener('click', function(e) {
    var trigger = e.target.closest('.lb-trigger, .media-slide');
    if (!trigger || lightboxItems.length === 0) return;
    var lbIdx = parseInt(trigger.getAttribute('data-lb-index'));
    if (!isNaN(lbIdx)) openLightbox(lightboxItems, lbIdx);
  });
}

function initSliders() {
  document.querySelectorAll('.project-card[data-project]').forEach(buildSlider);
}


/* ── Init ── */
document.addEventListener('DOMContentLoaded', function() {
  initScrollReveal();
  initSliders();
});