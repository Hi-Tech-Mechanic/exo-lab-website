var lightbox = document.getElementById('lightbox');
var lightboxImage = document.getElementById('lightboxImage');
var lightboxClose = document.getElementById('lightboxClose');
var lightboxTag = document.getElementById('lightboxTag');
var lightboxTitle = document.getElementById('lightboxTitle');

window.openLightbox = function openLightbox(imgSrc, infoText) {
    lightboxImage.src = imgSrc;
    lightboxImage.alt = '';

    if (infoText) {
      var parts = infoText.split(' — ');
      lightboxTag.textContent = parts.length > 1 ? parts[0] : '';
      lightboxTitle.textContent = parts.length > 1 ? parts[1] : infoText;
    } else {
      lightboxTag.textContent = '';
      lightboxTitle.textContent = '';
    }

    lightbox.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  // Click on photo items
  document.querySelectorAll('[data-lightbox]').forEach(function(item) {
    item.addEventListener('click', function() {
      var img = item.querySelector('img');
      if (!img) return;
      var info = item.getAttribute('data-lightbox');
      openLightbox(img.src, info);
    });
  });

  // Close button
  lightboxClose.addEventListener('click', function(e) {
    e.stopPropagation();
    closeLightbox();
  });

  // Click backdrop
  lightbox.querySelector('.lightbox-backdrop').addEventListener('click', function() {
    closeLightbox();
  });

  // Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });