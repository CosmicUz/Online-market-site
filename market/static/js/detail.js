const features = document.querySelectorAll('.features-list li');

features.forEach((item) => {
    item.addEventListener('mouseenter', () => {
        item.style.background = 'rgba(37, 99, 235, 0.1)';
        item.style.padding = '5px';
        item.style.borderRadius = '5px';
        item.style.transition = '0.3s';
    });
    item.addEventListener('mouseleave', () => {
        item.style.background = 'transparent';
        item.style.padding = '0';
    });
});
