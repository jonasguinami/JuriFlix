document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DO DOM ---
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // --- CREDENCIAIS "FICTÍCIAS" ---
    // Você pode alterar o usuário e a senha aqui
    const CORRECT_USER = 'jurista';
    const CORRECT_PASS = '12345';

    // Adiciona o listener para o envio do formulário
    loginForm.addEventListener('submit', (e) => {
        // Previne o comportamento padrão de recarregar a página
        e.preventDefault();

        // Pega os valores dos inputs e remove espaços em branco
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // 1. Validação dos dados
        if (username === CORRECT_USER && password === CORRECT_PASS) {
            // Se estiverem corretos:
            handleLoginSuccess();
        } else {
            // Se estiverem incorretos:
            handleLoginFailure();
        }
    });

    /**
     * Lida com o sucesso do login.
     * Mostra um feedback e redireciona para a página principal.
     */
    function handleLoginSuccess() {
        const loginBtn = document.querySelector('.login-btn');
        
        // Remove a mensagem de erro, se houver
        errorMessage.classList.remove('visible');
        
        // Feedback visual no botão
        loginBtn.textContent = 'Entrando...';
        loginBtn.style.backgroundColor = '#28a745'; // Verde sucesso

        // Redireciona para a página principal após um pequeno delay
        setTimeout(() => {
            // MUITO IMPORTANTE: Verifique se o nome do seu arquivo principal é 'index.html'
            window.location.href = 'index.html';
        }, 1000); // Atraso de 1 segundo
    }

    /**
     * Lida com a falha do login.
     * Mostra uma mensagem de erro e uma animação.
     */
    function handleLoginFailure() {
        // Mostra a mensagem de erro
        errorMessage.textContent = 'Usuário ou senha incorretos.';
        errorMessage.classList.add('visible');

        // Adiciona uma animação de "shake" na caixa de login para feedback
        const loginBox = document.querySelector('.login-box');
        loginBox.classList.add('shake');

        // Remove a animação após ela terminar para que possa ser usada novamente
        setTimeout(() => {
            loginBox.classList.remove('shake');
        }, 300); // Duração da animação
    }

});