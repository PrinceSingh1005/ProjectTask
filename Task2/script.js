document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Name validation
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    
    // Email validation
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else if (!isValidEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Message validation
    if (message === '') {
        document.getElementById('messageError').textContent = 'Message is required';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }
    
    // If form is valid, submit it (in a real app, you would send to server)
    if (isValid) {
        alert('Form submitted successfully!');
        this.reset();
    }
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


// Mobile menu functionality
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});




// To-Do List Functionality
const addBtn = document.getElementById("addTodo");
    const input = document.getElementById("todoInput");
    const list = document.getElementById("todoList");

    addBtn.addEventListener("click", addTodo);
    input.addEventListener("keypress", e => {
        if (e.key === "Enter") addTodo();
    });

    function addTodo() {
        const text = input.value.trim();
        if (!text) return;

        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = text;

        const actions = document.createElement("div");
        actions.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);
        list.appendChild(li);

        input.value = "";

        // Delete
        deleteBtn.onclick = () => li.remove();

        // Edit
        editBtn.onclick = () => {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.className = "edit-input";
            editInput.value = span.textContent;

            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";

            actions.replaceChild(saveBtn, editBtn);
            li.replaceChild(editInput, span);
            editInput.focus();

            const save = () => {
                const newText = editInput.value.trim();
                if (newText) span.textContent = newText;
                li.replaceChild(span, editInput);
                actions.replaceChild(editBtn, saveBtn);
            };

            saveBtn.onclick = save;

            editInput.addEventListener("keypress", e => {
                if (e.key === "Enter") save();
            });
        };
    }