const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden-element');
hiddenElements.forEach((el) => observer.observe(el));

document.getElementById('form-whatsapp').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar

    // 1. Captura os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    // 2. Define o SEU número de WhatsApp (com DDD, apenas números)
    const meuNumero = "5500000000000"; 

    // 3. Monta o texto formatado
    const textoFormatado = `Olá! Vi seu portfólio e gostaria de fazer um orçamento:\n\n` +
                           `👤 *Nome:* ${nome}\n` +
                           `✉️ *E-mail:* ${email}\n` +
                           `📝 *Mensagem:* ${mensagem}`;

    // 4. Cria a URL final do WhatsApp com encode para evitar erros nos caracteres
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${meuNumero}&text=${encodeURIComponent(textoFormatado)}`;

    // 5. Abre em uma nova aba
    window.open(urlWhatsApp, '_blank');
});

// 1. Defina as imagens de cada projeto aqui
const projectImages = {
    case1: [
        'img/img1.png', 
        'img/img2.png',  
        'img/img3.png',  
        'img/img4.png',  
        'img/img5.png'  
    ],
    case2: [
        'img/mockup-loja.jpg'
    ]
};

let currentImages = [];
let currentIndex = 0;

// Mapeando elementos do DOM
const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const btnClose = document.getElementById('modal-close');
const btnPrev = document.getElementById('modal-prev');
const btnNext = document.getElementById('modal-next');
const galleryButtons = document.querySelectorAll('.btn-open-gallery');

// Função para abrir a modal
galleryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectKey = button.getAttribute('data-case');
        currentImages = projectImages[projectKey] || [];
        
        if (currentImages.length > 0) {
            currentIndex = 0;
            updateModalImage();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
        }
    });
});

// Atualizar imagem atual
function updateModalImage() {
    modalImg.src = currentImages[currentIndex];
    
    // Oculta setas se houver apenas uma imagem
    if(currentImages.length <= 1) {
        btnPrev.style.display = 'none';
        btnNext.style.display = 'none';
    } else {
        btnPrev.style.display = 'block';
        btnNext.style.display = 'block';
    }
}

// Navegar para trás
btnPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex === 0) ? currentImages.length - 1 : currentIndex - 1;
    updateModalImage();
});

// Navegar para frente
btnNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex === currentImages.length - 1) ? 0 : currentIndex + 1;
    updateModalImage();
});

// Fechar modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Libera o scroll
}

btnClose.addEventListener('click', closeModal);
modal.addEventListener('click', closeModal); // Fecha ao clicar fora da imagem

// Evita fechar ao clicar na própria imagem
modalImg.addEventListener('click', (e) => e.stopPropagation());

// Fechar ou navegar por teclado
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight' && currentImages.length > 1) btnNext.click();
    if (e.key === 'ArrowLeft' && currentImages.length > 1) btnPrev.click();
});