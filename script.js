document.getElementById('detailsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Mobile number validation (Indian format for example)
    const mobileNumber = document.getElementById('mobileNumber').value;
    const mobileNumberPattern = /^[6-9]\d{9}$/; // Regex for Indian mobile numbers (10 digits, starts with 6-9)

    if (!mobileNumberPattern.test(mobileNumber)) {
        alert('Please enter a valid mobile number.');
        return; // Exit the function if the validation fails
    }

    // If validation passes, hide user form and show car preferences form
    document.getElementById('userForm').style.display = 'none';
    document.getElementById('carForm').style.display = 'block';
});

document.getElementById('preferencesForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const carType = document.getElementById('carType').value;

    // Get user details
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const mobileNumber = document.getElementById('mobileNumber').value;

    // Show a loading spinner while waiting for results
    const carsList = document.getElementById('carsList');
    carsList.innerHTML = `<div class="loading-spinner">Loading car recommendations...</div>`;

    // Make the API request to the backend
    fetch(`http://localhost:3000/recommendcars?city=${city}&carType=${carType}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Remove the loading spinner and show recommendations
        carsList.innerHTML = '';

        document.getElementById('carForm').style.display = 'none';
        document.getElementById('carRecommendations').style.display = 'block';

        // Loop through car makes and models
        data.forEach(car => {
            const card = document.createElement('div');
            card.classList.add('car-card', 'fadeIn');

            // Prepare the model names
            const modelNames = car.models.map(model => model.Model_Name).join(", ");

            // Adding the car's image (optional, you can add URLs for each car)
            const carImage = 'https://www.shutterstock.com/shutterstock/photos/2462850863/display_1500/stock-photo-a-silver-car-standing-in-the-parking-lot-the-sun-reflects-off-the-bodywork-suv-crossover-2462850863.jpg';

            card.innerHTML = `
                <img src="${carImage}" alt="Car Image">
                <div class="car-name">${car.make}</div>
                <div class="model-names">${modelNames}</div>
            `;

            carsList.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error fetching car recommendations:', error);
        alert('There was an error fetching the recommendations. Please try again.');
    });
});
