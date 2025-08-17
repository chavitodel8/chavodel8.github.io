document.addEventListener('DOMContentLoaded', () => {
    // Initialize Highlight.js for code syntax highlighting
    hljs.highlightAll();

    // Theme toggle
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark');
        toggleButton.textContent = body.classList.contains('dark') ? 'Tema Claro' : 'Tema Oscuro';
    });
});