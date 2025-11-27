const inputs = document.querySelectorAll('.signup-form input');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = '#6B73FF';
    });
    input.addEventListener('blur', () => {
        input.style.borderColor = '#ccc';
    });
});

const form = document.querySelector('.signup-form');
form.addEventListener('submit', (e) => {
    const password = form.querySelector('input[name="password"]').value;
    const password2 = form.querySelector('input[name="password2"]').value;
    if(password !== password2) {
        e.preventDefault();
        form.classList.add('shake');
        setTimeout(() => form.classList.remove('shake'), 500);
    }
});
