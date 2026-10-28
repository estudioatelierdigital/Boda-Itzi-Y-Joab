document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Cuenta Regresiva (Countdown Timer)
     Target: 17 de enero de 2027, 16:00:00
     ========================================================================== */
  const weddingDate = new Date('2027-01-17T16:00:00').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  /* ==========================================================================
     2. Reproductor de Música Flotante (Audio Controller)
     ========================================================================== */
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  const iconPlay = musicToggle.querySelector('.icon-play');
  const iconPause = musicToggle.querySelector('.icon-pause');
  let isPlaying = false;

  if (musicToggle && bgMusic) {
    bgMusic.volume = 0.4; // Volumen ambiente moderado y agradable

    musicToggle.addEventListener('click', () => {
      if (isPlaying) {
        bgMusic.pause();
        iconPlay.classList.remove('hidden');
        iconPause.classList.add('hidden');
        isPlaying = false;
      } else {
        bgMusic.play().then(() => {
          iconPlay.classList.add('hidden');
          iconPause.classList.remove('hidden');
          isPlaying = true;
        }).catch(error => {
          console.log("Reproducción bloqueada o error en el archivo de audio:", error);
        });
      }
    });
  }


  /* ==========================================================================
     3. Animaciones al Hacer Scroll (Intersection Observer)
     ========================================================================== */
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  fadeElements.forEach(element => {
    observer.observe(element);
  });

  /* ==========================================================================
     4. Generador de Partículas Flotantes Globales
     ========================================================================== */
  const particlesContainer = document.getElementById('particlesContainer');
  
  if (particlesContainer) {
    const particleCount = 20; // Número de partículas simultáneas en pantalla

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Tamaños aleatorios sutiles (entre 4px y 9px)
      const size = Math.random() * 5 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Posición horizontal inicial aleatoria
      particle.style.left = `${Math.random() * 100}vw`;
      
      // Duración de caída aleatoria (entre 8s y 15s para que sea relajado y elegante)
      const duration = Math.random() * 7 + 8;
      particle.style.animationDuration = `${duration}s`;
      
      // Retraso aleatorio para que no aparezcan todas al mismo tiempo
      const delay = Math.random() * 10;
      particle.style.animationDelay = `${delay}s`;
      
      particlesContainer.appendChild(particle);
    }
  }

});