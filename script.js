// Configuração do SweetAlert2 com tema de carnaval
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

// Criar confetes animados
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ffd93d', '#f6e58d', '#54a0ff', '#48dbfb', '#2ed573', '#7bed9f', '#26de81', '#45aaf2'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 4) + 's';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Formas variadas
        const shapes = ['10px 20px', '15px 15px', '8px 25px'];
        const borderRadius = ['0%', '50%', '30%'];
        confetti.style.width = shapes[Math.floor(Math.random() * shapes.length)].split(' ')[0];
        confetti.style.height = shapes[Math.floor(Math.random() * shapes.length)].split(' ')[1] || confetti.style.width;
        confetti.style.borderRadius = borderRadius[Math.floor(Math.random() * borderRadius.length)];
        
        container.appendChild(confetti);
    }
}

// Explosão de confetes para celebração
function confettiExplosion() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ffd93d', '#f6e58d', '#54a0ff', '#48dbfb', '#2ed573', '#7bed9f', '#26de81', '#45aaf2'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = 'none';
        
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const velocity = Math.random() * 500 + 200;
        const endX = Math.cos(angle) * velocity;
        const endY = Math.sin(angle) * velocity;
        
        confetti.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                opacity: 1 
            },
            { 
                transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1) rotate(720deg)`,
                opacity: 0 
            }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 2000);
    }
}

// Máscara de telefone
function maskPhone(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }
    
    input.value = value;
}

// Controle de música de fundo
function setupBackgroundMusic() {
    const audio = document.getElementById('background-music');
    const toggleBtn = document.getElementById('music-toggle');
    
    audio.volume = 0.5;
    toggleBtn.textContent = '🔇';
    toggleBtn.classList.add('muted');
    
    // Mostra popup para iniciar a música (navegadores bloqueiam autoplay)
    Swal.fire({
        title: '🎭 Bloquinho do Edinaldo! 🎉',
        html: '<p style="font-size: 1.2rem;">Clique para entrar na folia com música!</p><div style="font-size: 3rem; margin: 15px 0;">🎺🥁🎵🎶🎤</div>',
        confirmButtonText: '🎉 Bora lá!',
        confirmButtonColor: '#2ed573',
        allowOutsideClick: false,
        allowEscapeKey: false,
        backdrop: true,
        showClass: {
            popup: 'animate__animated animate__bounceIn'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            audio.play().then(() => {
                toggleBtn.textContent = '🔊';
                toggleBtn.classList.remove('muted');
                confettiExplosion();
            });
        }
    });
    
    // Botão de toggle
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio.paused) {
            audio.play();
            toggleBtn.textContent = '🔊';
            toggleBtn.classList.remove('muted');
        } else {
            audio.pause();
            toggleBtn.textContent = '🔇';
            toggleBtn.classList.add('muted');
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    createConfetti();
    setupBackgroundMusic();
    
    // Máscara do WhatsApp
    const whatsappInput = document.getElementById('whatsapp');
    whatsappInput.addEventListener('input', function() {
        maskPhone(this);
    });
    
    // Mostrar/ocultar campo de quantidade
    const acompanhanteSim = document.getElementById('acompanhante-sim');
    const acompanhanteNao = document.getElementById('acompanhante-nao');
    const quantidadeGroup = document.getElementById('quantidade-group');
    
    acompanhanteSim.addEventListener('change', function() {
        if (this.checked) {
            quantidadeGroup.style.display = 'block';
            quantidadeGroup.classList.add('animate__animated', 'animate__fadeInDown');
        }
    });
    
    acompanhanteNao.addEventListener('change', function() {
        if (this.checked) {
            quantidadeGroup.style.display = 'none';
        }
    });
    
    // Submissão do formulário
    const form = document.getElementById('rsvp-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const acompanhante = document.querySelector('input[name="acompanhante"]:checked').value;
        const quantidade = acompanhante === 'sim' ? document.getElementById('quantidade').value : 1;
        
        // Validações
        if (!nome) {
            Swal.fire({
                icon: 'warning',
                title: '🎭 Opa!',
                text: 'Por favor, digite seu nome completo!',
                confirmButtonText: 'Entendi! 🎉',
                background: '#fff',
                showClass: {
                    popup: 'animate__animated animate__shakeX'
                }
            });
            return;
        }
        
        if (whatsapp.length < 14) {
            Swal.fire({
                icon: 'warning',
                title: '📱 Eita!',
                text: 'Por favor, digite um WhatsApp válido!',
                confirmButtonText: 'Vou corrigir! 🎊',
                showClass: {
                    popup: 'animate__animated animate__shakeX'
                }
            });
            return;
        }
        
        if (acompanhante === 'sim' && (quantidade < 2 || quantidade > 10)) {
            Swal.fire({
                icon: 'warning',
                title: '🔢 Atenção!',
                text: 'A quantidade deve ser entre 2 e 10 pessoas!',
                confirmButtonText: 'Ok! 🎭',
                showClass: {
                    popup: 'animate__animated animate__shakeX'
                }
            });
            return;
        }
        
        // Confirmação
        let mensagemAcompanhante = '';
        if (acompanhante === 'sim') {
            mensagemAcompanhante = `<br>👫 <strong>Acompanhantes:</strong> ${quantidade - 1} pessoa(s)<br>👥 <strong>Total:</strong> ${quantidade} pessoa(s)`;
        } else {
            mensagemAcompanhante = '<br>😎 <strong>Indo sozinho(a)</strong>';
        }
        
        Swal.fire({
            title: '🎉 Confirmar Presença? 🎭',
            html: `
                <div style="text-align: left; padding: 10px;">
                    <p>👤 <strong>Nome:</strong> ${nome}</p>
                    <p>📱 <strong>WhatsApp:</strong> ${whatsapp}</p>
                    ${mensagemAcompanhante}
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '✅ Confirmar!',
            cancelButtonText: '❌ Voltar',
            confirmButtonColor: '#2ed573',
            cancelButtonColor: '#6c757d',
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOut'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Explosão de confetes
                confettiExplosion();
                
                // Sucesso!
                Swal.fire({
                    title: '🎊 CONFIRMADO! 🎊',
                    html: `
                        <div style="font-size: 3rem; margin: 20px 0;">
                            🎭🎉💃🕺🎺
                        </div>
                        <p style="font-size: 1.2rem; color: #2ed573;">
                            <strong>${nome}</strong>, sua presença está confirmada!
                        </p>
                        <p style="margin-top: 15px; color: #666;">
                            Prepare sua fantasia e venha sambar no<br>
                            <strong style="color: #54a0ff; font-size: 1.3rem;">Bloquinho do Edinaldo!</strong>
                        </p>
                        <div style="margin-top: 20px; font-size: 2rem;">
                            🥁🎺🎵🎶🥳
                        </div>
                    `,
                    confirmButtonText: '🎉 Partiu Carnaval!',
                    confirmButtonColor: '#2ed573',
                    showClass: {
                        popup: 'animate__animated animate__tada'
                    },
                    allowOutsideClick: false
                }).then(() => {
                    // Toast de boas-vindas
                    Toast.fire({
                        icon: 'success',
                        title: '🎭 Nos vemos no bloco!'
                    });
                    
                    // Limpar formulário
                    form.reset();
                    document.getElementById('quantidade-group').style.display = 'none';
                    
                    // Mais confetes!
                    setTimeout(confettiExplosion, 500);
                });
            }
        });
    });
    
});

// Easter egg: shake para confetes
let shakeCount = 0;
let lastShake = Date.now();

window.addEventListener('devicemotion', function(e) {
    const acceleration = e.accelerationIncludingGravity;
    if (acceleration) {
        const shake = Math.abs(acceleration.x) + Math.abs(acceleration.y) + Math.abs(acceleration.z);
        if (shake > 30 && Date.now() - lastShake > 1000) {
            confettiExplosion();
            lastShake = Date.now();
        }
    }
});

// Clique no título para confetes
document.querySelector('.title')?.addEventListener('click', function() {
    confettiExplosion();
    this.classList.add('animate__animated', 'animate__rubberBand');
    setTimeout(() => {
        this.classList.remove('animate__animated', 'animate__rubberBand');
    }, 1000);
});
