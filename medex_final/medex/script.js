// Initialize cart from localStorage or create a new array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to show medicine details
function showDetails(name, price, description) {
    localStorage.setItem('medicineName', name);
    localStorage.setItem('medicinePrice', price);
    localStorage.setItem('medicineDescription', description);
    window.location.href = 'details.html';
}

// Load order details on order-summary.html
window.onload = function() {
  if (window.location.pathname.includes('order-summary.html')) {
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      if (orders.length > 0) {
          const lastOrder = orders[orders.length - 1]; // Assuming we want the latest order
          document.getElementById('orderMedicine').textContent = lastOrder.name;
          document.getElementById('orderAmount').textContent = lastOrder.price * lastOrder.quantity; // Total amount
          document.getElementById('orderLocation').textContent = localStorage.getItem('location');
          document.getElementById('orderPhone').textContent = localStorage.getItem('phone');
      } else {
          alert('No previous orders found.');
      }
  }
};
// Add to cart function
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const name = localStorage.getItem('medicineName');
    const price = parseFloat(localStorage.getItem('medicinePrice'));

    if (quantity > 0) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} has been added to the cart.`);
        window.location.href = 'checkout.html'; // Redirect to checkout
    } else {
        alert('Please enter a valid quantity.');
    }
}

// Load cart items in checkout
function loadCartItems() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        const cartContainer = document.getElementById('cart-items');
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - ₹${item.price} x ${item.quantity}`;
            cartContainer.appendChild(itemElement);
        });
    } else {
        alert('Your cart is empty.');
    }
}

// Place order function
function placeOrder() {
    const location = document.getElementById('location').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return; // Stop the function if the phone number is invalid
    }
    if (location && phone) {
        localStorage.setItem('location', location);
        localStorage.setItem('phone', phone);
        localStorage.setItem('paymentMethod', paymentMethod);
        localStorage.setItem('orders', JSON.stringify(cart)); // Save the order

        alert(`Order placed successfully using ${paymentMethod}.`);
        if (paymentMethod === "GPay") {
            // Redirect to a dummy GPay URL (for demonstration)
            window.location.href = "https://pay.google.com/";
        } else {
            // Redirect to the order summary page
            window.location.href = 'order-summary.html';
        }
       
    } else {
        alert('Please fill out all fields.');
    }
}

// Go back function
function goBack() {
    window.history.back();
}

function viewOrder() {
      if (localStorage.getItem('orders')) {
          window.location.href = 'order-summary.html';
      } else {
          alert('No previous orders found.');
      }
  }
  

// Newsletter subscription function
function subscribe() {
    const email = document.getElementById('email').value;
    alert(`Thanks for subscribing! Offers will be sent to ${email}`);
}

// Initialize Google Map function
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 11.0168, lng: 76.9558 }, // Default center
        zoom: 12,
    });

    const marker = new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: map,
        title: "Your Delivery Location",
    });
}

// Diwali offer notification timeout
setTimeout(() => {
    document.getElementById('diwali-offer').style.display = 'none';
}, 10000); // Hide after 10 seconds

// const deleteSymbol = document.getElementById('delete-symbol');
// deleteSymbol.addEventListener('click',function () {
//     deleteSymbol.style.display = 'none';
// });
// Newsletter Pop-up Functions
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        let newsletter = document.getElementById("newsletter");
        newsletter.style.display = "block";
        document.getElementById('bg').classList.add('blur');
        setTimeout(function() {
            newsletter.classList.add("show"); // Add the class for fade-in effect
        }, 100); // Small delay to allow CSS transition
    }, 3000); // Show after 10 seconds
});


function subscribe() {
    let email = document.getElementById("email").value;
    if (email) {
        alert(`Thank you for subscribing with ${email}!`);
        document.getElementById("newsletter").style.display = "none";
        document.getElementById('bg').classList.remove('blur'); // Remove blur class
     
    } else {
        alert("Please enter a valid email address.");
    }
}
document.getElementById('delete-symbol').addEventListener('click', function() {
    document.getElementById('newsletter').classList.remove('show'); // Remove 'show' class to hide with transition
    document.getElementById('bg').classList.remove('blur'); // Remove blur class
});
function searchMedicine() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const medicines = document.querySelectorAll('.medicine1, .medicine2, .medicine3, .medicine4');
    
    medicines.forEach(medicine => {
        const medicineName = medicine.querySelector('h3').textContent.toLowerCase();
        if (medicineName.includes(searchQuery)) {
            medicine.style.display = "block";
        } else {
            medicine.style.display = "none";
        }
    });
}
