const inputs = document.querySelectorAll('.login-form input');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = '#FF6B6B';
    });
    input.addEventListener('blur', () => {
        input.style.borderColor = '#ccc';
    });
});

const form = document.querySelector('.login-form');
form.addEventListener('submit', (e) => {
    const username = form.querySelector('input[name="username"]').value;
    const password = form.querySelector('input[name="password"]').value;

    if(!username || !password) {
        e.preventDefault();
        form.classList.add('shake');
        setTimeout(() => form.classList.remove('shake'), 500);
    }
});
