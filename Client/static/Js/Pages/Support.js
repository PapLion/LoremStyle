document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const issue = document.getElementById('issue').value;
    const message = document.getElementById('message').value;
    const formData = {
      name,
      email,
      issue,
      message
    };

    console.log('Form submitted:', { name, email, issue, message });

    try {
      const response = await fetch('https://send-mail-api-rosy.vercel.app/send_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok){
        alert('Su mensaje ha sido enviado. Nos pondremos en contacto pronto.');
      } else {
        console.log('Error al enviar formulario')
      }
    } catch (error){
      console.log('Hubo un error en la solicitud', error)
    }

    this.reset();
  
    
  });
  