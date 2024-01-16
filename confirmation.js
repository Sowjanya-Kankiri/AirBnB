document.addEventListener('DOMContentLoaded', function () {
    // Function to confirm booking
    function confirmBooking() {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const mobileNumber = document.getElementById('mobileNumber').value;

        if (!fullName || !email || !mobileNumber) {
            alert('Please fill in all the required information.');
            return;
        }

        storePlaceDetails();

        // Placeholder function for booking confirmation logic
        alert('Booking confirmed! Thank you for choosing our place.');
        window.location.href = 'home.html';
    }

    function storePlaceDetails() {
        //const placeDetailsKey = 'selectedPlaceDetails';
        const userEmail = getUserEmail();
        const bookedPlacesKey = `bookedPlaces_${userEmail}`;
        const bookedPlaces = JSON.parse(localStorage.getItem(bookedPlacesKey)) || [];
        // const bookedPlacesKey = `bookedPlaces_${userEmail || ''}`;
        const placeDetails = {
            placeName: getQueryParameter('title'),
        checkInDate: getQueryParameter('checkInDate'),
        checkOutDate: getQueryParameter('checkOutDate'),
        };
        

        //let bookedPlaces = JSON.parse(localStorage.getItem(bookedPlacesKey)) || [];
        bookedPlaces.push(placeDetails);
        localStorage.setItem(bookedPlacesKey, JSON.stringify(bookedPlaces));
    }

    // Call the confirmBooking function when the confirmation button is clicked
    const confirmButton = document.getElementById('confirmButton');
    if (confirmButton) {
        confirmButton.addEventListener('click', function () {
            confirmBooking();
        });
    }

    // Call the populateDetails function when the page loads
    populateDetails();
});

// Extract query parameters from the URL
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
function getUserEmail() {
    const userEmail = localStorage.getItem('userEmail');
    return userEmail;
}

// Function to populate details on page load
function populateDetails() {
    const placeImage = document.getElementById('placeImage');
    const locationName = document.getElementById('locationName');
    const rating = document.getElementById('rating');
    const bookedDates = document.getElementById('bookedDates');
    const numOfPeople = document.getElementById('numOfPeople');
    const roomPrice = document.getElementById('roomPrice');
    const gstAmount = document.getElementById('gstAmount');
    const discountAmount = document.getElementById('discountAmount');
    const totalPrice = document.getElementById('totalPrice');

    // Extract values from query parameters
    const imageUrl = getQueryParameter('img_url1');
    const title = getQueryParameter('title');
    const ratingValue = getQueryParameter('rating');
    const checkInDate = getQueryParameter('checkInDate');
    const checkOutDate = getQueryParameter('checkOutDate');
    const numAdults = getQueryParameter('numAdults');
    const roomPriceValue = getQueryParameter('roomPrice');
    const gstAmountValue = getQueryParameter('gstAmount');
    const discountAmountValue = getQueryParameter('discountAmount');
    const totalPriceValue = getQueryParameter('totalPrice');

    // Populate HTML elements with values
    placeImage.src = decodeURIComponent(imageUrl);
    locationName.innerText = decodeURIComponent(title);
    rating.innerText = decodeURIComponent(ratingValue);
    bookedDates.innerText = `📅 ${checkInDate} to ${checkOutDate}`;
    numOfPeople.innerText = `Number of People: Adults: ${numAdults}`;
    roomPrice.innerText = `Room Price: ₹${roomPriceValue}`;
    gstAmount.innerText = `GST: ₹${gstAmountValue}`;
    discountAmount.innerText = `Discount: ₹${discountAmountValue}`;
    totalPrice.innerText = `Total Price: ₹${totalPriceValue}`;
}
