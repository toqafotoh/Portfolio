/* Extra media for the new projects. Add your files here, e.g.:
   { type:'image', src:'assets/projects/edutech/swagger.png', alt:'Swagger docs' }  */
projectMedia.furniture = [
  ['image.png','Overview'],['image(1).png','Furniture detection'],['image(2).png','Recommendations'],
  ['image(3).png','Generation'],['image(4).png','Room analysis'],['image(6).png','Result']
].map(function (f) { return { type: 'image', src: 'assets/projects/furniture/' + f[0], alt: 'Furniture project - ' + f[1] }; });
projectMedia.edutech = [
  '075000','074931','074912','074857','074825'
].map(function (n) { return { type: 'image', src: 'assets/projects/edutech/Screenshot 2026-11-19 ' + n + '.png', alt: 'Edutech API' }; })
 .concat([{ type: 'video', src: 'assets/videos/edutech/Video Project 5.mp4' }]);

(function () {
  document.querySelectorAll('.eyebrow,.heading,.sub').forEach(function (el) { el.classList.add('reveal'); });

  /* theme toggle (default: light) */
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.theme-btn')) return;
    var h = document.documentElement, next = h.dataset.theme === 'dark' ? 'light' : 'dark';
    h.classList.add('tt'); h.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (_) {}
    setTimeout(function () { h.classList.remove('tt'); }, 600);
  });

  /* name: letter-by-letter reveal */
  var n = 0;
  document.querySelectorAll('.name .line').forEach(function (l) {
    var t = l.textContent; l.textContent = '';
    l.setAttribute('aria-hidden', 'true');
    t.split('').forEach(function (c) {
      var s = document.createElement('span'); s.className = 'ch'; s.textContent = c;
      s.style.setProperty('--i', n++); l.appendChild(s);
    });
  });

  /* skills */
  var D = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/';
  var I = {
    layers: '<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
    branch: '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="8" r="2"/><path d="M6 7v10M18 10c0 5-12 2-12 7"/>',
    db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    test: '<path d="m9 11 3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    cpu: '<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"/>',
    agile: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
  };
  var G = [
    ['Backend', [['csharp','C#'],['dotnetcore','ASP.NET Core'],['java','Java'],['python','Python'],['i:layers','Clean Architecture'],['i:branch','CQRS & MediatR'],['i:shield','JWT & Identity'],['i:globe','REST APIs']]],
    ['Frontend', [['angular','Angular'],['html5','HTML5'],['css3','CSS3'],['javascript','JavaScript'],['bootstrap','Bootstrap'],['jquery','jQuery']]],
    ['Data', [['microsoftsqlserver','SQL Server'],['mysql','MySQL'],['redis','Redis'],['i:db','EF Core & ADO.NET'],['i:code','LINQ']]],
    ['Tools & Practice', [['git','Git'],['github','GitHub'],['docker','Docker'],['postman','Postman'],['swagger','Swagger'],['visualstudio','Visual Studio'],['i:test','Unit & Integration Tests'],['i:cpu','AI Model Integration'],['i:agile','Agile & Scrum']]],
    ['Languages', [['i:chat','Arabic · Native'],['i:chat','English · B2']]]
  ];
  var mount = document.getElementById('skillsMount');
  if (mount) {
    G.forEach(function (g) {
      var box = document.createElement('div'); box.className = 'sg';
      box.innerHTML = '<h3>' + g[0] + '</h3><div class="tiles"></div>';
      g[1].forEach(function (t) {
        var d = document.createElement('div'); d.className = 'tile pre';
        var ic = t[0].indexOf('i:') === 0
          ? '<svg viewBox="0 0 24 24">' + I[t[0].slice(2)] + '</svg>'
          : '<img src="' + D + t[0] + '/' + t[0] + '-original.svg" alt="" loading="lazy"' + (t[0] === 'github' ? ' data-inv' : '') + '>';
        d.innerHTML = '<div class="ti">' + ic + '</div><span>' + t[1] + '</span>';
        var img = d.querySelector('img');
        if (img) img.onerror = function () {
          if (!img.dataset.r) { img.dataset.r = 1; img.src = D + t[0] + '/' + t[0] + '-plain.svg'; }
          else img.parentNode.innerHTML = '<svg viewBox="0 0 24 24">' + I.code + '</svg>';
        };
        box.lastChild.appendChild(d);
      });
      mount.appendChild(box);
    });

    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var s = e.target, tiles = s.querySelectorAll('.tile');
        if (e.intersectionRatio === 0) {
          if (e.boundingClientRect.top > 0) { s._d = false; tiles.forEach(function (t) { t.classList.add('pre'); }); }
          return;
        }
        if (e.intersectionRatio < .25 || s._d) return;
        s._d = true;
        tiles.forEach(function (t) {
          var r = t.getBoundingClientRect(), x = (Math.random() - .5) * 560,
              y = -(r.top + 200 + Math.random() * 500), rot = (Math.random() - .5) * 320;
          t.animate([
            { transform: 'translate(' + x + 'px,' + y + 'px) rotate(' + rot + 'deg)', opacity: 0 },
            { opacity: 1, offset: .1 },
            { transform: 'translate(0,0) rotate(0)', opacity: 1 }
          ], { duration: 1100 + Math.random() * 800, delay: Math.random() * 700, easing: 'cubic-bezier(.3,1.35,.55,1)', fill: 'backwards' });
          t.classList.remove('pre');
        });
      });
    }, { threshold: [0, .25] });
    mount.querySelectorAll('.sg').forEach(function (s) { io.observe(s); });
  }
})();
