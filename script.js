document.addEventListener('DOMContentLoaded', () => {
  const makeSelect = document.getElementById('make');
  const modelSelect = document.getElementById('model');
  const yearSelect = document.getElementById('year');
  const emailInput = document.getElementById('email');
  const recommendationButton = document.getElementById('getRecommendationsButton');
  const recommendationsList = document.getElementById('recommendationsList');

  // Fetch available makes when the page loads
  fetchMakes();

  recommendationButton.addEventListener('click', () => {
    if (validateForm()) {
      handleRecommendation();
    }
  });

  // Form validation for email
  function validateForm() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value) {
      alert('Email is required.');
      return false;
    }
    if (!emailRegex.test(emailInput.value)) {
      alert('Invalid email format.');
      return false;
    }
    return true;
  }

  // Fetch available car makes from Car Query API
  async function fetchMakes() {
    try {
      const response = await fetch('https://www.carqueryapi.com/api/0.3/?cmd=getMakes');
      const data = await response.json();
      populateMakes(data.Makes);
    } catch (error) {
      console.error('Error fetching makes:', error);
    }
  }

  // Populate make select dropdown
  function populateMakes(makes) {
    makes.forEach(make => {
      const option = document.createElement('option');
      option.value = make.make_id;
      option.textContent = make.make_display;
      makeSelect.appendChild(option);
    });
  }

  // Handle car recommendation fetch from API
  async function handleRecommendation() {
    const make = makeSelect.value;
    const model = modelSelect.value;
    const year = yearSelect.value;

    if (!make || !model || !year) {
      alert('Please select make, model, and year.');
      return;
    }

    try {
      const response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make_id=${make}`);
      const data = await response.json();
      const models = data.Models.filter(item => item.model_name.toLowerCase() === model.toLowerCase());
      
      if (models.length === 0) {
        recommendationsList.innerHTML = '<p>No recommendations found.</p>';
        return;
      }

      displayRecommendations(models);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  }

  // Display recommended cars
  function displayRecommendations(cars) {
    recommendationsList.innerHTML = ''; // Clear existing recommendations
    cars.forEach(car => {
      const listItem = document.createElement('li');
      listItem.textContent = `${car.model_name} (${car.model_year})`;
      recommendationsList.appendChild(listItem);
    });
  }
});
