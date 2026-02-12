(function () {
  var sections = document.querySelectorAll('.section');
  var navLinks = document.querySelectorAll('.nav-link');

  function navigate(hash) {
    var target = hash.replace('#', '') || 'home';

    sections.forEach(function (section) {
      if (section.id === target) {
        section.classList.add('active');
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            section.classList.add('visible');
          });
        });
      } else {
        section.classList.remove('visible');
        section.classList.remove('active');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.dataset.section === target);
    });

    if (location.hash !== '#' + target) {
      history.replaceState(null, '', '#' + target);
    }
  }

  window.addEventListener('hashchange', function () {
    navigate(location.hash);
  });

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (link) {
      e.preventDefault();
      var hash = link.getAttribute('href');
      history.pushState(null, '', hash);
      navigate(hash);
    }
  });

  // Initial route
  navigate(location.hash || '#home');

  // ── Contact form validation ──
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var fields = [
        { el: document.getElementById('name'), msg: 'Bitte gib deinen Namen ein.' },
        { el: document.getElementById('email'), msg: 'Bitte gib eine gültige E-Mail ein.' },
        { el: document.getElementById('message'), msg: 'Bitte gib eine Nachricht ein.' }
      ];

      fields.forEach(function (field) {
        var errorSpan = field.el.parentElement.querySelector('.error-msg');
        var value = field.el.value.trim();
        var isInvalid = !value;

        if (field.el.type === 'email' && value) {
          isInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        field.el.classList.toggle('invalid', isInvalid);
        errorSpan.textContent = isInvalid ? field.msg : '';

        if (isInvalid) valid = false;
      });

      if (valid) {
        var feedback = document.getElementById('form-feedback');
        feedback.textContent = 'Nachricht erfolgreich gesendet!';
        feedback.className = 'form-feedback success';
        form.reset();

        setTimeout(function () {
          feedback.className = 'form-feedback';
        }, 4000);
      }
    });

    form.querySelectorAll('input, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        el.classList.remove('invalid');
        el.parentElement.querySelector('.error-msg').textContent = '';
      });
    });
  }
})();
