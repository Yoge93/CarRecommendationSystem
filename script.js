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
    
    // Simulate fetching recommendations
    setTimeout(function() {
        const recommendations = {
            "urban": {
                "sedan": [
                    "Honda City",
                    "Maruti Suzuki Dzire",
                    "Hyundai Verna"
                ],
                "suv": [
                    "Tata Nexon",
                    "Hyundai Creta",
                    "Mahindra XUV300"
                ],
                "hatchback": [
                    "Maruti Suzuki Swift",
                    "Hyundai Grand i10",
                    "Tata Tiago"
                ]
            },
            "semi-urban": {
                "sedan": [
                    "Maruti Suzuki Swift",
                    "Honda Amaze",
                    "Toyota Yaris"
                ],
                "suv": [
                    "Mahindra Thar",
                    "Tata Harrier",
                    "Ford Ecosport"
                ],
                "hatchback": [
                    "Maruti Suzuki Alto",
                    "Honda Brio",
                    "Renault Kwid"
                ]
            },
            "tier-2": {
                "sedan": [
                    "Honda City",
                    "Maruti Suzuki Dzire",
                    "Hyundai Verna"
                ],
                "suv": [
                    "Mahindra XUV500",
                    "Tata Nexon",
                    "Hyundai Creta"
                ],
                "hatchback": [
                    "Maruti Suzuki Swift",
                    "Hyundai i20",
                    "Ford Figo"
                ]
            },
            "metropolitan": {
                "sedan": [
                    "BMW 3 Series",
                    "Audi A4",
                    "Mercedes-Benz C-Class"
                ],
                "suv": [
                    "BMW X5",
                    "Mercedes-Benz GLC",
                    "Audi Q5"
                ],
                "hatchback": [
                    "Volkswagen Polo",
                    "Hyundai i10",
                    "Honda Jazz"
                ]
            }
        };

        // Hide loading animation and show results
        document.getElementById('loading').style.display = 'none';
        const resultDiv = document.getElementById('result');
        const carList = document.getElementById('carList');
        carList.innerHTML = ''; // Clear previous results
        const carRecommendations = recommendations[city][carType];

        if (carRecommendations) {
            resultDiv.style.display = 'block';
            carRecommendations.forEach(car => {
                const li = document.createElement('li');
                li.textContent = car;
                carList.appendChild(li);
            });
        }

        // Update progress bar to 100%
        updateProgressBar(100);
    }, 1500); // Simulated loading delay
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
