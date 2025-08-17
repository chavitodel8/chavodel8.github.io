// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Highlight.js for code syntax highlighting
    hljs.highlightAll();
    
    // Show home by default
    showHome();
    
    // Theme toggle functionality
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

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

    // Inicializar bloques de código colapsables
    initializeCollapsibleCode();
});

// Navigation functions
function showHome() {
    // Show home section
    document.getElementById('home').style.display = 'block';
    
    // Hide exercises section
    document.getElementById('exercises-section').classList.remove('active');
    
    // Remove active from all sidebar links
    document.querySelectorAll('.exercise-list a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Hide all individual exercises
    document.querySelectorAll('.exercise').forEach(exercise => {
        exercise.classList.remove('active');
    });
}

function showExercises() {
    // Hide home section
    document.getElementById('home').style.display = 'none';
    
    // Show exercises section
    document.getElementById('exercises-section').classList.add('active');
    
    // Hide all individual exercises
    document.querySelectorAll('.exercise').forEach(exercise => {
        exercise.classList.remove('active');
    });
}

function showExercise(exerciseNumber) {
    // Hide home section
    document.getElementById('home').style.display = 'none';
    
    // Show exercises section
    document.getElementById('exercises-section').classList.add('active');
    
    // Hide all exercises first
    document.querySelectorAll('.exercise').forEach(exercise => {
        exercise.classList.remove('active');
    });
    
    // Show selected exercise
    const selectedExercise = document.getElementById(`exercise-${exerciseNumber}`);
    if (selectedExercise) {
        selectedExercise.classList.add('active');
    }
    
    // Update sidebar active state
    document.querySelectorAll('.exercise-list a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-exercise="${exerciseNumber}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Re-highlight code syntax after showing
    setTimeout(() => {
        hljs.highlightAll();
    }, 100);
    
    // Scroll to top of content
    document.querySelector('.content').scrollTop = 0;
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

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'h':
                e.preventDefault();
                showHome();
                break;
            case 'e':
                e.preventDefault();
                showExercises();
                break;
        }
    }
});

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';