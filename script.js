let firstName = ''; // Store First Name
let lastName = ''; // Store Last Name
let mobile = ''; // Store Mobile Number
let city = ''; // Store City Selection
let carType = ''; // Store Car Type Selection

// Update progress bar function
function updateProgressBar(percentage) {
    document.getElementById('progress-bar').style.width = `${percentage}%`;
}

// Regex Validation Functions
function validateName(name) {
    const regex = /^[A-Za-z\s]+$/; // Name can only contain letters and spaces
    return regex.test(name);
}

function validateMobile(mobile) {
    const regex = /^[789]\d{9}$/; // Valid Indian mobile number format
    return regex.test(mobile);
}

// Handle moving to the next step after collecting name and mobile
function nextStep() {
    firstName = document.getElementById('firstName').value;
    lastName = document.getElementById('lastName').value;
    mobile = document.getElementById('mobile').value;

    // Validate inputs
    if (!firstName || !lastName || !mobile) {
        alert("Please fill in all fields.");
        return;
    }

    // Validate Name fields
    if (!validateName(firstName)) {
        alert("Please enter a valid first name (letters and spaces only).");
        return;
    }

    if (!validateName(lastName)) {
        alert("Please enter a valid last name (letters and spaces only).");
        return;
    }

    // Validate Mobile Number
    if (!validateMobile(mobile)) {
        alert("Please enter a valid mobile number (starting with 7, 8, or 9 and 10 digits long).");
        return;
    }

    // Hide first step and show the next step
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';

    // Update progress bar to 33%
    updateProgressBar(33);
}

// Handle city selection
function selectCity(selectedCity) {
    city = selectedCity;
    // Hide current step and show next step
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
    
    // Update progress bar to 66%
    updateProgressBar(66);
}

// Handle car type selection
function selectCarType(selectedCarType) {
    carType = selectedCarType;
    // Show loading animation
    document.getElementById('loading').style.display = 'block';
    // Update progress bar to 85%
    updateProgressBar(85);

    // Send the user data to the backend
    fetch('http://localhost:8080/recommend-cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city, carType })
    })
    .then(response => response.json())
    .then(data => {
        // Hide loading animation and show results
        document.getElementById('loading').style.display = 'none';
        const resultDiv = document.getElementById('result');
        const carList = document.getElementById('carList');
        carList.innerHTML = ''; // Clear previous results

        if (data.error) {
            alert(data.error);
            return;
        }

        if (data.length > 0) {
            resultDiv.style.display = 'block';
            data.forEach(car => {
                const li = document.createElement('li');
                li.textContent = `${car.make} ${car.model}`;
                carList.appendChild(li);
            });
        } else {
            resultDiv.style.display = 'block';
            const li = document.createElement('li');
            li.textContent = 'No car recommendations found for this selection.';
            carList.appendChild(li);
        }

        // Update progress bar to 100%
        updateProgressBar(100);
    })
    .catch(error => {
        console.error('Error fetching car recommendations:', error);
        alert('Something went wrong while fetching the car recommendations.');
        document.getElementById('loading').style.display = 'none';
    });
}

// Reset the form for new selection
function resetForm() {
    firstName = '';
    lastName = '';
    mobile = '';
    city = '';
    carType = '';
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    updateProgressBar(0);
}
