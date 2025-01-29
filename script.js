document.getElementById('detailsForm').addEventListener('submit', function(event) {
    event.preventDefault();
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

    // Make the API request to the backend
    fetch('https://your-backend-url.railway.app/recommend-cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city, carType })
    })
    .then(response => response.json())
    .then(data => {
        // Display the car recommendations
        document.getElementById('carForm').style.display = 'none';
        document.getElementById('carRecommendations').style.display = 'block';
        
        const carsList = document.getElementById('carsList');
        carsList.innerHTML = ''; // Clear previous results

        data.forEach(car => {
            const li = document.createElement('li');
            li.textContent = `${car.title} (${car.category})`;
            carsList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error fetching car recommendations:', error);
        alert('There was an error fetching the recommendations. Please try again.');
    });
});
