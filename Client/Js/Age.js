let selectedAge = null;

function selectAge(age) {
  document.querySelectorAll('.age-card').forEach(card => {
    card.classList.remove('active');
  });

  const selectedCard = document.getElementById(age);
  selectedCard.classList.add('active');

  selectedAge = age;
  const continueButton = document.getElementById('continue-button');
  continueButton.href = `genero.html?edad=${selectedAge}`;
  continueButton.classList.remove('disabled');
}
