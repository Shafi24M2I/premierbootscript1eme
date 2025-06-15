

 // Animation des boutons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                if (!this.classList.contains('btn-search')) {
                    this.style.transform = 'translateY(-2px) scale(1.02)';
                }
            });
            
            btn.addEventListener('mouseleave', function() {
                if (!this.classList.contains('btn-search')) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
        });

        // Fonction de recherche
        function performSearch() {
            const searchInput = document.getElementById('searchInput');
            const query = searchInput.value.trim();
            
            if (query) {
                // Animation de recherche
                const searchBtn = document.querySelector('.btn-search');
                searchBtn.style.transform = 'rotate(360deg) scale(1.2)';
                
                // Toast Bootstrap pour confirmer la recherche
                showToast(`Recherche pour: "${query}"`);
                
                setTimeout(() => {
                    searchBtn.style.transform = 'rotate(0deg) scale(1)';
                }, 300);
            } else {
                // Animation d'erreur
                searchInput.classList.add('is-invalid');
                showToast('Veuillez saisir un terme de recherche', 'danger');
                setTimeout(() => {
                    searchInput.classList.remove('is-invalid');
                }, 2000);
            }
        }

        // Recherche avec Enter
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Animation du logo
        function animateLogo() {
            const logoIcon = document.querySelector('.logo-icon');
            logoIcon.style.transform = 'rotate(360deg) scale(1.1)';
            setTimeout(() => {
                logoIcon.style.transform = 'rotate(0deg) scale(1)';
            }, 500);
        }

        // Fonction pour afficher des toasts
        function showToast(message, type = 'success') {
            // Créer le toast dynamiquement
            const toastContainer = document.getElementById('toastContainer') || createToastContainer();
            
            const toastHtml = `
                <div class="toast align-items-center text-white bg-${type === 'danger' ? 'danger' : 'success'} border-0" role="alert">
                    <div class="d-flex">
                        <div class="toast-body">
                            ${message}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                    </div>
                </div>
            `;
            
            toastContainer.insertAdjacentHTML('beforeend', toastHtml);
            const toastElement = toastContainer.lastElementChild;
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
            
            // Nettoyer après fermeture
            toastElement.addEventListener('hidden.bs.toast', function() {
                this.remove();
            });
        }

        function createToastContainer() {
            const container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container position-fixed top-0 end-0 p-3';
            container.style.zIndex = '9999';
            document.body.appendChild(container);
            return container;
        }

        // pour page contact j'ai ajouté la formulaire du inscription


         document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const form = this;
            const isValid = validateForm(form);
            
            if (isValid) {
                // Simulation d'envoi
                submitForm(form);
            }
        });

        function validateForm(form) {
            let isValid = true;
            
            // Validation Bootstrap
            if (!form.checkValidity()) {
                isValid = false;
            }
            
            // Validation personnalisée pour le genre
            const genreInputs = document.querySelectorAll('input[name="genre"]');
            const genreSelected = Array.from(genreInputs).some(input => input.checked);
            const genreError = document.getElementById('genre-error');
            
            if (!genreSelected) {
                genreError.style.display = 'block';
                isValid = false;
            } else {
                genreError.style.display = 'none';
            }
            
            // Validation de l'âge
            const age = parseInt(document.getElementById('age').value);
            const ageInput = document.getElementById('age');
            
            if (age < 1 || age > 120) {
                ageInput.setCustomValidity('L\'âge doit être entre 1 et 120 ans');
                isValid = false;
            } else {
                ageInput.setCustomValidity('');
            }
            
            form.classList.add('was-validated');
            return isValid;
        }

        function submitForm(form) {
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Animation de chargement
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulation d'envoi (2 secondes)
            setTimeout(() => {
                // Réinitialiser le bouton
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Afficher le message de succès
                const successMessage = document.getElementById('successMessage');
                successMessage.style.display = 'block';
                
                // Scroll vers le message de succès
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Réinitialiser le formulaire après 3 secondes
                setTimeout(() => {
                    form.reset();
                    form.classList.remove('was-validated');
                    successMessage.style.display = 'none';
                }, 3000);
                
            }, 2000);
        }

        // Réinitialisation du formulaire
        document.querySelector('.btn-reset').addEventListener('click', function() {
            const form = document.getElementById('contactForm');
            form.classList.remove('was-validated');
            document.getElementById('genre-error').style.display = 'none';
            document.getElementById('successMessage').style.display = 'none';
        });

        // Animation des champs au focus
        document.querySelectorAll('.form-control, .form-select').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });

        // Validation en temps réel de l'email
        document.getElementById('email').addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.setCustomValidity('Veuillez saisir une adresse email valide');
            } else {
                this.setCustomValidity('');
            }
        });

        // Validation en temps réel du téléphone
        document.getElementById('telephone').addEventListener('input', function() {
            // Permettre seulement les chiffres, espaces, +, -, (), .
            this.value = this.value.replace(/[^\d\s\+\-\(\)\.]/g, '');
        });

        // tous les code page Accueil html //
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.6s ease-in forwards';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    
        /* Tout les code de page histoire html */
       