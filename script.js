// Smooth scrolling to section
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.navbar-nav a');
  
    for (const link of links) {
      link.addEventListener('click', scrollToSection);
    }
  
    function scrollToSection(e) {
      e.preventDefault();
  
      const target = document.querySelector(e.target.getAttribute('href'));
      const offset = 70;
  
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  });
// Pricing section
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.pricing .card');
  
    for (const card of cards) {
      card.addEventListener('click', selectPlan);
    }
  
    function selectPlan(e) {
      const selectedCard = e.currentTarget;
      const price = selectedCard.querySelector('.price').textContent;
      const planName = selectedCard.querySelector('h3').textContent;
  
      // Display confirmation message
      const confirmationMessage = `You have selected the ${planName} plan for ${price}. Proceed to payment?`;
      if (confirm(confirmationMessage)) {
        // Redirect to payment page
        window.location.href = 'payment.html';
      }
    }
  });
  // Payment processing with PaymentGateway
document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
  
    paymentForm.addEventListener('submit', processPayment);
  
    function processPayment(e) {
      e.preventDefault();
  
      const cardNumber = document.getElementById('cardNumber').value;
      const expiryDate = document.getElementById('expiryDate').value;
      const cvv = document.getElementById('cvv').value;
      const cardHolderName = document.getElementById('cardHolderName').value;
  
      // Call the PaymentGateway API to process the payment
      PaymentGateway.processPayment({
        cardNumber,
        expiryDate,
        cvv,
        cardHolderName
      }).then(function(response) {
        // Handle the payment response from the PaymentGateway
        if (response.success) {
          // Payment was successful
          displayPaymentSuccess();
        } else {
          // Payment failed
          displayPaymentError(response.errorMessage);
        }
      }).catch(function(error) {
        // Handle any errors during the payment processing
        displayPaymentError('An error occurred during payment processing. Please try again later.');
      });
    }
  
    function displayPaymentSuccess() {
      // Display a success message to the user
      alert('Payment successful! Thank you for your purchase.');
  
      // Redirect the user to a success/thank you page
      window.location.href = 'success.html';
    }
  
    function displayPaymentError(errorMessage) {
      // Display an error message to the user
      alert(`Payment failed: ${errorMessage}`);
    }
  });

// Get the tracking form and tracking info section elements
const trackingForm = document.getElementById('trackingForm');
const trackingInfoSection = document.getElementById('trackingInfoSection');

// Predefined array of locations
const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];

// Add event listener to the tracking form
trackingForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  const trackingNumber = document.getElementById('trackingNumber').value;

  // Check if tracking number is not empty
  if (trackingNumber.trim() !== '') {
    // Generate a random index to select a location from the array
    const randomIndex = Math.floor(Math.random() * locations.length);
    const randomLocation = locations[randomIndex];

    // Generate a random number of days between 1 and 10
    const randomDays = Math.floor(Math.random() * 10) + 1;
    
    // Create a new Date object with the current date
    const currentDate = new Date();
    
    // Add the random number of days to the current date
    currentDate.setDate(currentDate.getDate() + randomDays);
    
    // Format the delivery date as "Month Day, Year"
    const formattedDeliveryDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Update the tracking info section with the random location and estimated delivery date
    const trackingInfoList = document.getElementById('trackingInfoList');
    trackingInfoList.innerHTML = `
      <li class="list-group-item">
        <span class="fw-bold">Status:</span> In Transit
      </li>
      <li class="list-group-item">
        <span class="fw-bold">Location:</span> ${randomLocation}
      </li>
      <li class="list-group-item">
        <span class="fw-bold">Estimated Delivery:</span> ${formattedDeliveryDate}
      </li>
    `;

    // Show the tracking info section
    trackingInfoSection.style.display = 'block';
  }
});
