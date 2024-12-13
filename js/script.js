
/* ------------------------------------------------------------------------------ */
/* Script for welcome screen */
/* ------------------------------------------------------------------------------ */
// whenever use press Get Started Button it Redirect to account creation page
document.getElementById("startBtn")?.addEventListener("click", function() {
    // window.location.href = "create-account.html";
    window.location.href = "login.html";
});

/* ------------------------------------------------------------------------------ */
/* Script for Create account screen */
/* ------------------------------------------------------------------------------ */

document.getElementById("createAccountForm")?.addEventListener("submit", function(event) {
    event.preventDefault(); //it is default behavior of the form, which would otherwise submit the data to a server and refresh the page.
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    alert("Account created successfully!");
    window.location.href = "login.html";
});

/* ------------------------------------------------------------------------------ */
/* Script for login form screen */
/* ------------------------------------------------------------------------------ */

document.getElementById("loginForm")?.addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword");

  if (email === storedEmail && password === storedPassword) {
      alert("Login successful!");
      window.location.href = "courses.html";
  } else {
      alert("Invalid email or password. Please create an account.");
  }
});

/* ------------------------------------------------------------------------------ */
/* Script for mobile number in home screen */
/* ------------------------------------------------------------------------------ */

function validateAndRedirect() {
    // Perform any validation if necessary
    const mobileNumber = document.getElementById('mobile-number').value;
    
    // Optionally, add validation for the mobile number here
    if (mobileNumber.length === 10) {
        // Redirect to courseslist.html
        alert('Successfully added mobile number!');
    } else {
        alert('Please enter a valid mobile number!');
    }
}


/* ------------------------------------------------------------------------------ */
/* Script for Payment Form */
/* ------------------------------------------------------------------------------ */

document.getElementById("paymentForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    const cardNumber = document.getElementById("card").value;
    const expiryDate = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    if (paymentMethod) {
        alert(`Payment successful using ${paymentMethod.value}!\nCard Number: ${cardNumber}\nExpiry Date: ${expiryDate}\nCVV: ${cvv}`);
        window.location.href = "payment-success.html";
    } else {
        alert("Please select a payment method.");
    }
});

/* ------------------------------------------------------------------------------ */
/* Script for Payment Details Form */
/* ------------------------------------------------------------------------------ */

document.getElementById("openModalBtn")?.addEventListener("click", function() {
    const paymentMethod = document.getElementById("paymentMethod").value;
    if (paymentMethod) {
        document.getElementById("paymentModal").style.display = "block";
    } else {
        alert("Please select a payment method.");
    }
});

// Close modal
document.querySelector(".close")?.addEventListener("click", function() {
    document.getElementById("paymentModal").style.display = "none";
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("paymentModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Payment form validation
document.getElementById('paymentDetailsForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const card = document.getElementById('card').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    if (card.length === 16 && expiry.match(/^\d{2}\/\d{2}$/) && cvv.length === 3) {
        alert('Payment successful!');
        document.getElementById('paymentModal').style.display = 'none';
    } else {
        alert('Invalid payment details');
    }
});


// Select all enroll buttons
document.querySelectorAll('.enroll-btn').forEach(button => {
    button.addEventListener('click', function() {
        const courseName = this.getAttribute('data-course');
        const amount = this.getAttribute('data-amount');

        // Redirect to the payment form (or show the form on the same page)
        window.location.href = `payment.html?course=${encodeURIComponent(courseName)}&amount=${encodeURIComponent(amount)}`;
    });
});




/* ------------------------------------------------------------------------------ */
/* Script for Demo Video */
/* ------------------------------------------------------------------------------ */


function openVideoPopup() {
  const videoPopup = document.getElementById("videoPopup");
  const demoVideo = document.getElementById("demoVideo");

  // Set the video source dynamically
  demoVideo.src = "video/video/final_video.mp4";

  // Show the video popup
  videoPopup.style.display = "block";
}

function closeVideoPopup() {
  const videoPopup = document.getElementById("videoPopup");
  const demoVideo = document.getElementById("demoVideo");

  // Hide the video popup
  videoPopup.style.display = "none";

  // Remove the video source to stop playback
  demoVideo.src = "";
}

// Clear the video source on page load
window.onload = function () {
  const demoVideo = document.getElementById("demoVideo");
  demoVideo.src = "";
};

// ------------------------------------ Add to cart ----------------------------------
const cart = {};

// Add hover functionality to display popup
document.querySelectorAll(".rutik").forEach((courseDiv) => {
  courseDiv.addEventListener("mouseenter", function () {
    const coursePopup = document.getElementById("coursePopup");

    // Get course details from the hovered course div
    const courseName = courseDiv.getAttribute("data-course-name");
    const courseUpdated = courseDiv.getAttribute("data-updated");
    const courseHours = courseDiv.getAttribute("data-hours");
    const courseDescription = courseDiv.getAttribute("data-description");
    const courseAmount = courseDiv.querySelector(".enroll-btn").getAttribute("data-amount");

    // Populate the popup with course details
    document.getElementById("popupCourseName").innerText = courseName;
    document.getElementById("popupUpdated").innerText = `Updated: ${courseUpdated}`;
    document.getElementById("popupHours").innerText = courseHours;
    document.getElementById("popupDescription").innerHTML = `
      <strong>Description:</strong><br>
      ${courseDescription}<br><br>
      <strong>What you'll learn:</strong><br>
      ✔️ You will gain hands-on experience with data manipulation and visualization techniques.<br>
      ✔️ You will learn to implement machine learning algorithms to solve real-world problems.<br>
      ✔️ You will develop skills in leveraging cloud technologies for deploying data-driven applications.
    `;

    // Get the bounding box for positioning the popup
    const courseRect = courseDiv.getBoundingClientRect();
    const popup = coursePopup;

    // Show the popup
    popup.style.display = 'block';
    popup.style.top = `${courseRect.top + window.scrollY}px`;

    // Check if there's space to open to the right; if not, open to the left
    const rightSpace = window.innerWidth - courseRect.right;
    if (rightSpace > popup.offsetWidth + 20) {
      // Enough space on the right, so place the popup to the right
      popup.style.left = `${courseRect.right + 10}px`;
    } else {
      // Not enough space on the right, so place the popup to the left
      popup.style.left = `${courseRect.left - popup.offsetWidth - 10}px`;
    }

    // Add event listener to "Add to Cart" button in the popup
    const addToCartBtn = document.getElementById("addToCartBtn");
    addToCartBtn.onclick = function () {
      addToCart(courseName, parseInt(courseAmount));
    };
  });

  // Hide popup when the mouse leaves the course
  courseDiv.addEventListener("mouseleave", function () {
    document.getElementById("coursePopup").style.display = "none";
  });
});

// Function to add items to the cart
function addToCart(courseName, coursePrice) {
  // Validate course details
  if (!courseName || isNaN(coursePrice)) {
    alert("Invalid course data!");
    return;
  }

  // Add or update course in cart
  if (cart[courseName]) {
    cart[courseName].quantity++;
  } else {
    cart[courseName] = { price: coursePrice, quantity: 1 };
  }

  // Update cart count
  updateCartCount();

  // Show alert
  alert(`${courseName} has been added to the cart!`);
}

// Function to update the cart count in the icon
function updateCartCount() {
  const cartCount = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
  const cartCountElement = document.querySelector(".cart-count");

  if (cartCountElement) {
    cartCountElement.innerText = cartCount;
  }
}

// Display cart content when the cart icon is clicked
document.getElementById("cartIcon").addEventListener("click", function () {
  const cartModal = document.getElementById("cartModal");
  const cartItemsList = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice");

  // Clear current cart display
  cartItemsList.innerHTML = "";

  // Populate cart items
  let totalPrice = 0;
  for (const [name, details] of Object.entries(cart)) {
    const listItem = document.createElement("li");
    listItem.innerText = `${name} - ₹${details.price} x ${details.quantity}`;
    cartItemsList.appendChild(listItem);
    totalPrice += details.price * details.quantity;
  }

  // Update total price
  totalPriceElement.innerText = `Total Price: ₹${totalPrice}`;

  // Show the cart modal
  cartModal.style.display = "block";
});

// Close cart modal
document.getElementById("closeCart").addEventListener("click", function () {
  document.getElementById("cartModal").style.display = "none";
});

// ------------------------------------------favorite icon---------------------------------------

const favorites = {};  // Store the favorite courses

// Function to add a course to favorites
function addToFavorites(courseName) {
  if (!courseName) {
    alert("Invalid course data!");
    return;
  }

  // Add course to favorites or update the quantity
  if (!favorites[courseName]) {
    favorites[courseName] = { quantity: 1 };
  } else {
    favorites[courseName].quantity += 1; // Increase quantity if already in favorites
  }

  // Update favorites count and alert
  alert(`${courseName} has been added to your favorites!`);
  updateFavoritesCount();
  updateFavoritesModal();
}

// Function to update the favorites count in the icon
function updateFavoritesCount() {
  const favoritesCount = Object.keys(favorites).length;  // Count of unique courses
  const favoritesCountElement = document.querySelector(".favorites-count");

  if (favoritesCountElement) {
    favoritesCountElement.innerText = favoritesCount;
  }
}

// Function to update the favorites list inside the modal
function updateFavoritesModal() {
  const favoritesItemsList = document.getElementById("favoritesItems");
  favoritesItemsList.innerHTML = ""; // Clear the list before updating

  // Populate the favorites modal with the current items
  for (const [name, details] of Object.entries(favorites)) {
    const listItem = document.createElement("li");
    listItem.innerText = `${name} - x ${details.quantity}`;
    favoritesItemsList.appendChild(listItem);
  }
}

// Display favorites content when the favorites icon is clicked
document.getElementById("favoritesIcon").addEventListener("click", function (event) {
  event.preventDefault();  // Prevent the default link behavior

  const favoritesModal = document.getElementById("favoritesModal");
  favoritesModal.style.display = "block"; // Show the modal

  // Update the modal with the current favorites
  updateFavoritesModal();
});

// Close favorites modal
document.getElementById("closeFavorites").addEventListener("click", function () {
  document.getElementById("favoritesModal").style.display = "none";
});

// Add hover functionality to display the popup and add to favorites
document.querySelectorAll(".rutik").forEach((courseDiv) => {
  courseDiv.addEventListener("mouseenter", function () {
    const coursePopup = document.getElementById("coursePopup");

    // Get course details from the hovered course div
    const courseName = courseDiv.getAttribute("data-course-name");

    // Display the course popup as before
    document.getElementById("popupCourseName").innerText = courseName;

    // Add event listener to "Add to Favorites" button in the popup
    const addToFavoritesBtn = document.getElementById("addToFavoritesBtn");
    addToFavoritesBtn.onclick = function () {
      addToFavorites(courseName);  // Call function to add course to favorites
    };
  });

  // Hide popup when the mouse leaves the course
  courseDiv.addEventListener("mouseleave", function () {
    document.getElementById("coursePopup").style.display = "none";
  });
});

// --------------------------------------------------------------------
// form validation
// --------------------------------------------------------------------


