// account.js
document.addEventListener('DOMContentLoaded', function () {
    displayUserData();
    displayBookedPlaces();
    displayFavoritePlaces();

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            logoutUser();
        });
    }
});

function getUserEmail() {
    try {
        const userData = getUserData();
        if (userData) {
            return userData.email;
        } else {
            console.error('No user email found.');
            return null;
        }
    } catch (error) {
        console.error('Error getting user email:', error);
        return null;
    }
}




function logoutUser() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('signin');
    localStorage.removeItem('favorites');
    window.location.href = 'home.html';
}

function displayUserData() {
    const userNameElement = document.getElementById('userName');
    const userEmailElement = document.getElementById('userEmail');
    const userData=getUserData();
    if (userNameElement && userEmailElement && userData) {
        userNameElement.textContent = userData.name;  
        userEmailElement.textContent = userData.email;
    }
    
}


function getUserData() {
    try {
        const userJson = localStorage.getItem('signin');
        if (userJson) {
            return JSON.parse(userJson);
        } else {
            console.error('No user data found.');
            return null;
        }
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
}


function displayBookedPlaces() {
    const userEmail = getUserEmail();
    const bookedPlacesKey = `bookedPlaces_${userEmail}`;
    const bookedPlaces = JSON.parse(localStorage.getItem(bookedPlacesKey)) || [];
    const bookedPlacesList = document.getElementById('bookedPlacesList');

    if (!bookedPlacesList) {
        console.error("Element with ID 'bookedPlacesList' not found.");
        return;
    }

   
    bookedPlacesList.innerHTML = '';

    if (bookedPlaces.length > 0) {
        bookedPlaces.forEach(place => {
            const listItem = document.createElement('li');
            listItem.textContent = `${place.placeName} - ${place.checkInDate} to ${place.checkOutDate}`;
            bookedPlacesList.appendChild(listItem);
        });
    } else {
        const noBookedPlacesMessage = document.createElement('p');
        noBookedPlacesMessage.textContent = 'No booked places yet. Explore now!';
        bookedPlacesList.appendChild(noBookedPlacesMessage);
    }
}
function displayFavoritePlaces() {
    try {
        const favorites = getUserFavorites();
        const favoritePlacesList = document.getElementById('favoritePlacesList');

        if (favoritePlacesList && favorites) {
            favoritePlacesList.innerHTML = '';

            if (favorites.length > 0) {
                favorites.forEach(place => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${place.location} - ★${place.rating}`;  
                    favoritePlacesList.appendChild(listItem);
                });
            } else {
                const noFavoritePlacesMessage = document.createElement('p');
                noFavoritePlacesMessage.textContent = 'No favorite places yet.';
                favoritePlacesList.appendChild(noFavoritePlacesMessage);
            }
        }
    } catch (error) {
        console.error('Error displaying favorite places:', error);
    }
}

function getUserFavorites() {
    try {
        const favoritesJson = localStorage.getItem('favorites');
        if (favoritesJson) {
            return JSON.parse(favoritesJson);
        } else {
            console.error('No favorites found.');
            return null;
        }
    } catch (error) {
        console.error('Error getting favorites:', error);
        return null;
    }
}
