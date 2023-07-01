$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });
 
 $(document).ready(function() {
    // Handle register form submission
    $('#register-form').submit(function(e) {
      e.preventDefault(); // Prevent the form from submitting normally
  
      // Perform AJAX request to the backend for user registration
      // Replace the URL with the actual backend endpoint for user registration
      $.ajax({
        url: '/register', // Example endpoint for user registration
        type: 'POST',
        data: $(this).serialize(),
        success: function(response) {
          // Redirect to another page upon successful registration
          window.location.href = '/dashboard.html'; // Replace with your desired page URL
        },
        error: function(error) {
          // Handle error response from the backend
          console.log(error);
          alert('Registration failed. Please try again.');
        }
      });
    });
  
    // Handle login form submission
    $('#login-form').submit(function(e) {
      e.preventDefault(); // Prevent the form from submitting normally
  
      // Perform AJAX request to the backend for user login
      // Replace the URL with the actual backend endpoint for user login
      $.ajax({
        url: '/login', // Example endpoint for user login
        type: 'POST',
        data: $(this).serialize(),
        success: function(response) {
          // Redirect to another page upon successful login
          window.location.href = 'signup.html'; // Replace with your desired page URL
        },
        error: function(error) {
          // Handle error response from the backend
          console.log(error);
          alert('Login failed. Please check your credentials and try again.');
        }
      });
    });
  
    // Handle toggle between login and register forms
    $('#login-link').click(function() {
      $('#register-form').hide();
      $('#login-form').fadeIn();
    });
  
    $('#register-link').click(function() {
      $('#login-form').hide();
      $('#register-form').fadeIn();
    });
  });
  