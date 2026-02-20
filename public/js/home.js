document.addEventListener('DOMContentLoaded', () => {
    console.log('Cine Explore - Home Initialized');

    // --- Lógica del Botón ---
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            window.location.href = 'Cartelera.html';
        });
    }

    // --- Lógica del Carrusel Siniestro ---
    const carruselTrack = document.getElementById('carruselTrack');

    // Lista de imágenes (excluyendo walpaperhome)
    const images = [
        'El exorcista.jpg',
        'Scream.jpg',
        'Siniestro.jpg',
        'hallowen.jpg', // Nota: corregir si el nombre es diferente
        'rec.jpg',
        'viernes13.jpg'
    ];

    if (carruselTrack) {
        // Función para crear un item
        const createItem = (src) => {
            const div = document.createElement('div');
            div.className = 'carrusel-item';
            const img = document.createElement('img');
            img.src = `../img/${src}`;
            img.alt = src.split('.')[0];
            img.loading = 'lazy';
            div.appendChild(img);
            return div;
        };

        // Duplicar imágenes más veces para el efecto infinito con items anchos
        const allImages = [...images, ...images, ...images, ...images];

        allImages.forEach(src => {
            carruselTrack.appendChild(createItem(src));
        });
    }

    // --- Lógica del Carrusel de Banners (Promociones) ---
    const bannerTrack = document.getElementById('bannerTrack');
    const bannerPrev = document.getElementById('bannerPrev');
    const bannerNext = document.getElementById('bannerNext');
    let currentSlide = 0;
    const totalSlides = 2; // publiBanner y publiBanner2
    const slideInterval = 45000; // 45 segundos

    const updateBanner = () => {
        if (bannerTrack) {
            bannerTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateBanner();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateBanner();
    };

    if (bannerNext && bannerPrev) {
        bannerNext.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        bannerPrev.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }

    let intervalId = setInterval(nextSlide, slideInterval);

    const resetInterval = () => {
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, slideInterval);
    };

    // --- Lógica de Cartelera Semanal (Grid con flechas) ---
    const billboardGrid = document.getElementById('billboardGrid');
    const billboardPrev = document.getElementById('billboardPrev');
    const billboardNext = document.getElementById('billboardNext');

    if (billboardGrid && billboardNext && billboardPrev) {
        const scrollAmount = 300; // Desplazamiento por clic

        billboardNext.addEventListener('click', () => {
            billboardGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        billboardPrev.addEventListener('click', () => {
            billboardGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // --- Efecto de Distorsión en Scroll ---
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
    });
});
