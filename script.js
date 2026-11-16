
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwWlRXBVD5tAANUIoQ-ILlrEDVxHvPIhRHRLXsUlTfkVejzMoOYkjKusJuCqvwyNyXH/exec";

// ==================================
// BOLHAS SUBINDO PELO OCEANO
// ==================================

const bubbleContainer = document.getElementById("bubbles");

if (bubbleContainer) {
    for (let i = 0; i < 45; i++) {
        const bubble = document.createElement("span");
        bubble.className = "bubble";

        const size = Math.random() * 13 + 3;

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 15 + 10}s`;
        bubble.style.animationDelay = `${Math.random() * 15}s`;

        bubbleContainer.appendChild(bubble);
    }
}

// ==================================
// PEQUENOS BRILHOS
// ==================================

const sparkleContainer = document.getElementById("sparkles");

if (sparkleContainer) {
    for (let i = 0; i < 35; i++) {
        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";
        sparkle.textContent = Math.random() > 0.5 ? "✧" : "·";

        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.fontSize = `${Math.random() * 15 + 7}px`;
        sparkle.style.animationDelay = `${Math.random() * 4}s`;
        sparkle.style.animationDuration = `${Math.random() * 3 + 2}s`;

        sparkleContainer.appendChild(sparkle);
    }
}

// ==================================
// BOTÃO DA ABERTURA
// ==================================

const openButton = document.getElementById("openInvitation");

if (openButton) {
    openButton.addEventListener("click", () => {
        document.getElementById("welcome").scrollIntoView({
            behavior: "smooth"
        });
    });
}

// ==================================
// APARECIMENTO DAS SEÇÕES
// ==================================

const sections = document.querySelectorAll(".section-reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.12
    });

    sections.forEach((section) => {
        observer.observe(section);
    });
} else {
    sections.forEach((section) => {
        section.classList.add("visible");
    });
}

// ==================================
// PÉROLAS COM MENSAGENS
// ==================================

const pearlButtons = document.querySelectorAll(".pearl-button");
const pearlMessage = document.getElementById("pearlMessage");

pearlButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (pearlMessage) {
            pearlMessage.textContent = button.dataset.message;
        }

        pearlButtons.forEach((pearl) => {
            pearl.style.transform = "";
        });

        button.style.transform = "translateY(-12px) scale(1.15)";
    });
});

// ==================================
// CONFIRMAÇÃO DE PRESENÇA
// ==================================

const rsvpForm = document.getElementById("rsvpForm");
const thankYou = document.getElementById("thankYou");
const thankYouMessage = document.getElementById("thankYouMessage");

if (rsvpForm) {
    rsvpForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const guestName = document.getElementById("guestName").value.trim();

        const attendance = document.querySelector(
            'input[name="attendance"]:checked'
        );

        if (!guestName || !attendance) {
            alert("Preencha seu nome e escolha uma opção!");
            return;
        }

        const submitButton = rsvpForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Enviando resposta...";
        }

        const hiddenFrame = document.createElement("iframe");
        hiddenFrame.name = "rsvpHiddenFrame";
        hiddenFrame.style.display = "none";

        const hiddenForm = document.createElement("form");
        hiddenForm.method = "POST";
        hiddenForm.action = GOOGLE_SCRIPT_URL;
        hiddenForm.target = "rsvpHiddenFrame";
        hiddenForm.style.display = "none";

        const nameInput = document.createElement("input");
        nameInput.type = "hidden";
        nameInput.name = "nome";
        nameInput.value = guestName;

        const attendanceInput = document.createElement("input");
        attendanceInput.type = "hidden";
        attendanceInput.name = "confirmacao";
        attendanceInput.value = attendance.value;

        hiddenForm.appendChild(nameInput);
        hiddenForm.appendChild(attendanceInput);

        document.body.appendChild(hiddenFrame);
        document.body.appendChild(hiddenForm);

        hiddenForm.submit();

        setTimeout(() => {
            if (thankYouMessage) {
                thankYouMessage.textContent =
                    `${guestName}, sua resposta foi encaminhada! 💙`;
            }

            rsvpForm.classList.add("hidden");

            if (thankYou) {
                thankYou.classList.remove("hidden");

                thankYou.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            hiddenForm.remove();
            hiddenFrame.remove();

        }, 2000);
    });
}
