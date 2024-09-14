document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    console.log('Form submitted:', { name, email, message });
  
    this.reset();
  
    alert('Su mensaje ha sido enviado. Nos pondremos en contacto pronto.');
  });
  