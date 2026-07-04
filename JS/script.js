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
    const meuNumero = "5581997087849"; 

    // 3. Monta o texto formatado (usando %0A para quebrar linhas)
    const textoFormatado = `Olá! Vi seu portfólio e gostaria de fazer um orçamento:%0A%0A` +
                           `👤 *Nome:* ${nome}%0A` +
                           `✉️ *E-mail:* ${email}%0A` +
                           `📝 *Mensagem:* ${mensagem}`;

    // 4. Cria a URL final do WhatsApp
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${meuNumero}&text=${textoFormatado}`;

    // 5. Abre em uma nova aba
    window.open(urlWhatsApp, '_blank');
});