/* =========================================
   PROJECT FILTER
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");


filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove active class from all buttons
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        // Get selected category
        const selectedCategory = button.dataset.filter;


        // Show/hide projects
        projectCards.forEach(function(card) {

            const projectCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                projectCategory === selectedCategory
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* =========================================
   CONTACT FORM VALIDATION
========================================= */

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const successMessage = document.getElementById("successMessage");


contactForm.addEventListener("submit", function(event) {

    // Prevent actual form submission
    event.preventDefault();


    // Clear previous messages
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    successMessage.textContent = "";


    // Remove previous error classes
    nameInput.classList.remove("error");
    emailInput.classList.remove("error");
    messageInput.classList.remove("error");


    let valid = true;


    /* -------- NAME VALIDATION -------- */

    const name = nameInput.value.trim();

    if (name === "") {

        nameError.textContent = "Name is required.";

        nameInput.classList.add("error");

        valid = false;

    }


    /* -------- EMAIL VALIDATION -------- */

    const email = emailInput.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        emailError.textContent = "Email is required.";

        emailInput.classList.add("error");

        valid = false;

    }

    else if (!emailPattern.test(email)) {

        emailError.textContent =
            "Please enter a valid email address.";

        emailInput.classList.add("error");

        valid = false;

    }


    /* -------- MESSAGE VALIDATION -------- */

    const message = messageInput.value.trim();

    if (message === "") {

        messageError.textContent =
            "Message is required.";

        messageInput.classList.add("error");

        valid = false;

    }


    /* -------- SUCCESS -------- */

    if (valid) {

        successMessage.textContent =
            "Your message has been validated successfully!";

        contactForm.reset();

    }

});