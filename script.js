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

async function loadRepos() {
  const list = document.getElementById("repo-list");

  try {
    const res = await fetch("https://api.github.com/users/arusajunior7-code/repos");
    if (!res.ok) throw new Error("Bad response");

    const repos = await res.json();
    console.log("Fetched Repositories:", repos); // This prints the data to your console
    // Overwrites the "Loading..." <li> item automatically
    list.innerHTML = ""; 

    repos.forEach((r) => {
      const li = document.createElement("li");
     
        const a = document.createElement("a");
        a.href = r.html_url;
        a.textContent = r.name;
        a.target = "_blank"; 
        li.appendChild(a);
        if (list) list.appendChild(li);
    });
  } catch (e) {
    list.innerHTML = "<li>Sorry, repositories could not load right now.</li>";
  }
}

loadRepos();
