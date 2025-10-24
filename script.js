document.addEventListener('DOMContentLoaded', () => {

    const booksData = [
        // Categoria: Essenciais (Top 6)
        { id: 'cf88', title: 'Constituição Federal', category: 'essenciais', coverPath: 'cf88.jpg', pdfPath: 'cf88.pdf', description: 'A lei fundamental e suprema do Brasil, servindo de parâmetro de validade para todas as demais espécies normativas.', featured: true },
        { id: 'cc', title: 'Código Civil', category: 'essenciais', coverPath: 'cc.jpg', pdfPath: 'cc.pdf', description: 'Um dos pilares do direito privado, regula as relações jurídicas entre as pessoas, abrangendo contratos, família e sucessões.', featured: true },
        { id: 'cpc', title: 'Código de Processo Civil', category: 'essenciais', coverPath: 'cpc.jpg', pdfPath: 'cpc.pdf', description: 'Estabelece as regras e os procedimentos para a resolução de conflitos de natureza civil, desde a petição inicial até a execução.', featured: true },
        { id: 'cp', title: 'Código Penal', category: 'essenciais', coverPath: 'cp.jpg', pdfPath: 'cp.pdf', description: 'Define os crimes e estabelece as respectivas penas, sendo a principal legislação de direito penal do país.', featured: false },
        { id: 'cpp', title: 'Código de Processo Penal', category: 'essenciais', coverPath: 'cpp.jpg', pdfPath: 'cpp.pdf', description: 'Regulamenta a persecução penal, desde a fase de investigação até o julgamento, garantindo os direitos do acusado.', featured: false },
        { id: 'clt', title: 'Consolidação das Leis do Trabalho', category: 'essenciais', coverPath: 'clt.jpg', pdfPath: 'clt.pdf', description: 'Reúne as principais normas que regulam as relações individuais e coletivas de trabalho, protegendo os direitos dos trabalhadores.', featured: true },

        // Categoria: Kit Ultra Completo
        { id: 'ctn', title: 'Código Tributário Nacional', category: 'completo', coverPath: 'ctn.jpg', pdfPath: 'ctn.pdf', description: 'Fixa as normas gerais de direito tributário aplicáveis à União, aos Estados, ao Distrito Federal e aos Municípios.', featured: false },
        { id: 'cdc', title: 'Código de Defesa do Consumidor', category: 'completo', coverPath: 'cdc.jpg', pdfPath: 'cdc.pdf', description: 'Estabelece normas de proteção e defesa do consumidor, de ordem pública e interesse social.', featured: true },
        { id: 'lep', title: 'Lei de Execução Penal', category: 'completo', coverPath: 'lep.jpg', pdfPath: 'lep.pdf', description: 'Tem por objetivo efetivar as disposições de sentença ou decisão criminal e proporcionar condições para a reintegração social do condenado.', featured: false },
        { id: 'eca', title: 'Estatuto da Criança e do Adolescente', category: 'completo', coverPath: 'eca.jpg', pdfPath: 'eca.pdf', description: 'Dispõe sobre a proteção integral à criança e ao adolescente, estabelecendo seus direitos e deveres.', featured: false },
        { id: 'lia', title: 'Lei de Improbidade Administrativa', category: 'completo', coverPath: 'lia.jpg', pdfPath: 'lia.pdf', description: 'Trata das sanções aplicáveis em virtude da prática de atos de improbidade administrativa por agentes públicos.', featured: false },
        { id: 'lei14133', title: 'Nova Lei de Licitações', category: 'completo', coverPath: 'lei14133.jpg', pdfPath: 'lei14133.pdf', description: 'Estabelece normas gerais de licitação e contratação para as Administrações Públicas diretas, autárquicas e fundacionais.', featured: true },
    ];

    const mainContent = document.getElementById('main-content');
    let favorites = JSON.parse(localStorage.getItem('favoriteBooks')) || [];

    function init() {
        renderBooks();
        setupEventListeners();
        setupHeroCarousel();
    }

    // --- CORREÇÃO: Renderiza os cards com a nova estrutura de HTML ---
    function renderBooks() {
        const containers = {
            essenciais: document.getElementById('essenciais-carousel'),
            completo: document.getElementById('completo-carousel'),
        };
        Object.values(containers).forEach(c => c.innerHTML = '');

        booksData.forEach(book => {
            const isFavorited = favorites.includes(book.id);
            const card = document.createElement('div');
            card.className = `book-card ${isFavorited ? 'favorited' : ''}`;
            card.dataset.bookId = book.id;
            
            // Nova estrutura com o título visível abaixo da imagem
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${book.coverPath}" alt="Capa de ${book.title}">
                    <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" aria-label="Adicionar aos Favoritos">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                </div>
                <div class="card-title-container">
                    <h3>${book.title}</h3>
                </div>
            `;
            containers[book.category].appendChild(card);
        });
    }

    // --- CORREÇÃO: Lógica de favoritar ajustada para funcionar com classes ---
    function toggleFavorite(card) {
        const bookId = card.dataset.bookId;
        const favoriteBtn = card.querySelector('.favorite-btn');
        const isFavorited = favorites.includes(bookId);

        if (isFavorited) {
            favorites = favorites.filter(id => id !== bookId);
        } else {
            favorites.push(bookId);
        }
        
        localStorage.setItem('favoriteBooks', JSON.stringify(favorites));
        
        // Adiciona/remove a classe tanto no card quanto no botão
        card.classList.toggle('favorited', !isFavorited);
        favoriteBtn.classList.toggle('favorited', !isFavorited);
        
        // Atualiza a visibilidade se estiver na tela de favoritos
        updateBookVisibility();
    }

    function setupEventListeners() {
        // ... (O resto do JS continua o mesmo, sem alterações necessárias aqui)
        const favoritesToggleBtn = document.getElementById('favorites-toggle-btn');
        const searchBar = document.getElementById('search-bar');
        const modal = document.getElementById('book-modal');

        mainContent.addEventListener('click', (e) => {
            const card = e.target.closest('.book-card');
            if (!card) return; // Se não clicou em um card, sai da função

            if (e.target.closest('.favorite-btn')) {
                toggleFavorite(card);
            } else {
                openModal(card.dataset.bookId);
            }
        });

        favoritesToggleBtn.addEventListener('click', () => {
            mainContent.classList.toggle('favorites-view');
            favoritesToggleBtn.classList.toggle('active');
            const btnText = favoritesToggleBtn.querySelector('.btn-text');
            btnText.textContent = mainContent.classList.contains('favorites-view') ? 'Ver Todos' : 'Favoritos';
            updateBookVisibility();
        });
        
        searchBar.addEventListener('input', updateBookVisibility);
        modal.querySelector('.close-modal-btn').addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.classList.remove('active'); });
    }

    // --- Funções auxiliares (sem alterações) ---
    function setupHeroCarousel() {
        const featuredBooks = booksData.filter(book => book.featured);
        const carouselContainer = document.querySelector('.hero-carousel-container');
        const slidesContainer = document.querySelector('.hero-slides');
        const dotsContainer = document.querySelector('.hero-dots');
        if (!featuredBooks.length) return;

        slidesContainer.innerHTML = '';
        dotsContainer.innerHTML = '';

        featuredBooks.forEach((book, index) => {
            slidesContainer.innerHTML += `<div class="hero-slide" style="--bg-image: url('${book.coverPath}')"><div class="hero-content"><h2>${book.title}</h2><p>${book.description.substring(0, 150)}...</p></div></div>`;
            dotsContainer.innerHTML += `<div class="hero-dot" data-slide-index="${index}"></div>`;
        });

        // CORREÇÃO: Adiciona as setas sem quebrar as referências do JS
        carouselContainer.insertAdjacentHTML('beforeend', `
            <button class="hero-arrow prev" aria-label="Anterior">&lt;</button>
            <button class="hero-arrow next" aria-label="Próximo">&gt;</button>
        `);
        
        let currentIndex = 0;
        let autoPlayInterval = null;
        let isDragging = false, startX = 0, currentTranslate = 0;
        const slides = slidesContainer.children;
        const dots = dotsContainer.children;
        const totalSlides = slides.length;
        
        function updateCarousel(newIndex) {
            if (newIndex < 0) {
                currentIndex = totalSlides - 1;
            } else if (newIndex >= totalSlides) {
                currentIndex = 0;
            } else {
                currentIndex = newIndex;
            }

            // Garante que a transição esteja ativa para o snap
            slidesContainer.style.transition = 'transform 0.5s ease-out';
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            Array.from(dots).forEach(dot => dot.classList.remove('active'));
            if(dots[currentIndex]) {
               dots[currentIndex].classList.add('active');
            }
        }

        function nextSlide() { updateCarousel(currentIndex + 1); }
        function prevSlide() { updateCarousel(currentIndex - 1); }

        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 5000);
        }
        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        carouselContainer.querySelector('.next').addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
        carouselContainer.querySelector('.prev').addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
        dotsContainer.addEventListener('click', e => {
            if (e.target.classList.contains('hero-dot')) {
                updateCarousel(parseInt(e.target.dataset.slideIndex));
                resetAutoPlay();
            }
        });
        
        // Lógica para arrastar (swipe)
        function pointerDown(e) {
            isDragging = true;
            startX = e.clientX;
            clearInterval(autoPlayInterval);
            slidesContainer.style.transition = 'none';
        }

        function pointerMove(e) {
            if (!isDragging) return;
            const currentX = e.clientX;
            const diff = currentX - startX;
            // A posição do slide atual em % mais a diferença do arraste em px
            slidesContainer.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diff}px))`;
        }

        function pointerUp(e) {
            if (!isDragging) return;
            isDragging = false;
            const diff = e.clientX - startX;

            // Se o arraste for significativo, muda de slide
            if (Math.abs(diff) > 50) {
                if (diff < 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            } else {
                // Se não, volta para o slide atual
                slidesContainer.style.transition = 'transform 0.5s ease-out';
                slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
            startAutoPlay();
        }
        
        slidesContainer.addEventListener('pointerdown', pointerDown);
        slidesContainer.addEventListener('pointermove', pointerMove);
        slidesContainer.addEventListener('pointerup', pointerUp);
        slidesContainer.addEventListener('pointerleave', (e) => {
            if (isDragging) {
                pointerUp(e); // Finaliza o arraste se o mouse sair da área
            }
        });
        
        // Inicialização
        updateCarousel(currentIndex);
        startAutoPlay();
    }

    function updateBookVisibility() {
        const searchTerm = document.getElementById('search-bar').value.toLowerCase().trim();
        const isFavoritesView = mainContent.classList.contains('favorites-view');
        booksData.forEach(book => {
            const card = document.querySelector(`.book-card[data-book-id="${book.id}"]`);
            if (card) {
                const titleMatch = book.title.toLowerCase().includes(searchTerm);
                const isFavorited = favorites.includes(book.id);
                const shouldBeVisible = titleMatch && (!isFavoritesView || isFavorited);
                card.style.display = shouldBeVisible ? 'block' : 'none';
            }
        });
        checkEmptyCategories();
    }
    function checkEmptyCategories() {
        document.querySelectorAll('.category-row').forEach(row => {
            const visibleCards = row.querySelectorAll('.book-card[style*="display: block"]');
            row.classList.toggle('is-empty', visibleCards.length === 0);
        });
    }
    function openModal(bookId) {
        const book = booksData.find(b => b.id === bookId);
        if (!book) return;
        document.getElementById('modal-book-cover').src = book.coverPath;
        document.getElementById('modal-book-title').textContent = book.title;
        document.getElementById('modal-book-description').textContent = book.description;
        document.getElementById('modal-read-pdf-btn').href = book.pdfPath;
        document.getElementById('book-modal').classList.add('active');
    }

    init();
});