// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Highlight.js for code syntax highlighting if it exists
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
    
    // Theme toggle functionality
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            body.classList.toggle('dark');
            toggleButton.textContent = body.classList.contains('dark') ? 'Tema Claro' : 'Tema Oscuro';
            
            // Save theme preference
            const isDark = body.classList.contains('dark');
            localStorage.setItem('darkTheme', isDark);
        });
        
        // Load saved theme preference
        const savedTheme = localStorage.getItem('darkTheme');
        if (savedTheme === 'true') {
            body.classList.add('dark');
            toggleButton.textContent = 'Tema Claro';
        }
    }

    // Inicializar bloques de código colapsables
    initializeCollapsibleCode();
    
    // Initialize exercise navigation if we're on the exercises page
    if (window.location.pathname.includes('ejercicios.html')) {
        initializeExerciseNavigation();
    }
});

// Initialize exercise navigation for exercises page
function initializeExerciseNavigation() {
    // Show all exercises by default
    showAllExercises();
    
    // Add click event listeners to sidebar links for smooth scrolling
    document.querySelectorAll('.exercise-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const exerciseNumber = link.getAttribute('data-exercise');
            scrollToExercise(exerciseNumber);
        });
    });
}

function showAllExercises() {
    // Show all exercises
    document.querySelectorAll('.exercise-item').forEach(exercise => {
        exercise.style.display = 'block';
    });
    
    // Highlight code syntax for all exercises
    if (typeof hljs !== 'undefined') {
        setTimeout(() => {
            hljs.highlightAll();
        }, 100);
    }
}

function scrollToExercise(exerciseNumber) {
    // Update sidebar active state
    document.querySelectorAll('.exercise-list a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-exercise="${exerciseNumber}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Scroll to the selected exercise
    const selectedExercise = document.getElementById(`exercise-${exerciseNumber}`);
    if (selectedExercise) {
        selectedExercise.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Copy code to clipboard function
async function copyCode(codeId) {
    const codeElement = document.getElementById(codeId);
    if (!codeElement) {
        console.error('Code element not found:', codeId);
        return;
    }
    
    const text = codeElement.textContent;
    
    try {
        await navigator.clipboard.writeText(text);
        
        // Visual feedback for successful copy
        const btn = event.target;
        const originalText = btn.textContent;
        const originalBg = btn.style.background;
        
        btn.textContent = '¡Copiado!';
        btn.style.background = '#48bb78';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = originalBg || '#667eea';
        }, 2000);
        
    } catch (err) {
        console.error('Error al copiar código:', err);
        
        // Fallback for older browsers
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Visual feedback for fallback method
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = '¡Copiado!';
            btn.style.background = '#48bb78';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '#667eea';
            }, 2000);
            
        } catch (fallbackErr) {
            console.error('Fallback copy failed:', fallbackErr);
            alert('No se pudo copiar el código. Por favor, selecciona y copia manualmente.');
        }
    }
}

// Función para manejar bloques de código colapsables
function initializeCollapsibleCode() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(codeBlock => {
        const preElement = codeBlock.parentElement;
        
        // Agregar clase collapsed por defecto
        preElement.classList.add('collapsed');
        
        // Agregar evento de clic
        preElement.addEventListener('click', function() {
            if (this.classList.contains('collapsed')) {
                this.classList.remove('collapsed');
                this.classList.add('expanded');
            } else {
                this.classList.remove('expanded');
                this.classList.add('collapsed');
            }
        });
    });
}

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';
