document.addEventListener('DOMContentLoaded', () => {
    
    // Config
    const API_URL = 'http://localhost:5000/api/auth';

    // Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Form Helper
    const setLoading = (button, isLoading) => {
        const text = button.querySelector('#btn-text');
        const spinner = button.querySelector('#btn-spinner');
        if (isLoading) {
            text.classList.add('opacity-50');
            spinner.classList.remove('hidden');
            button.disabled = true;
        } else {
            text.classList.remove('opacity-50');
            spinner.classList.add('hidden');
            button.disabled = false;
        }
    };

    const showError = (messageDiv, msg) => {
        messageDiv.textContent = msg;
        messageDiv.classList.remove('hidden');
        setTimeout(() => { messageDiv.classList.add('hidden'); }, 5000);
    };

    // --- REGISTER LOGIC ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = registerForm.querySelector('button[type="submit"]');
            const errorDiv = document.getElementById('error-message');
            const successDiv = document.getElementById('success-message');
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            setLoading(btn, true);

            try {
                const response = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Registration failed');
                }

                // Success
                successDiv.classList.remove('hidden');
                registerForm.reset();
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);

            } catch (err) {
                showError(errorDiv, err.message);
            } finally {
                setLoading(btn, false);
            }
        });
    }

    // --- LOGIN LOGIC ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('button[type="submit"]');
            const errorDiv = document.getElementById('error-message');
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            setLoading(btn, true);

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Invalid credentials');
                }

                // Store token and redirect
                localStorage.setItem('adviseAiToken', data.token);
                localStorage.setItem('adviseAiUser', JSON.stringify(data.user));
                window.location.href = 'dashboard.html';

            } catch (err) {
                showError(errorDiv, err.message);
            } finally {
                setLoading(btn, false);
            }
        });
    }

});
