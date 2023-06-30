// Referral program script

// Function to generate a unique referral code
function generateReferralCode() {
    // Generate a random alphanumeric code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 8;
    let referralCode = '';
    
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      referralCode += characters.charAt(randomIndex);
    }
    
    return referralCode;
  }
  
  // Function to track successful referrals
  function trackReferral(referrer, referredCustomer, purchaseAmount) {
    // Simulated implementation for tracking successful referrals
    console.log(`Referrer: ${referrer}`);
    console.log(`Referred Customer: ${referredCustomer}`);
    console.log(`Purchase Amount: $${purchaseAmount}`);
    
    // Add your logic to store the referral information in a database or make an API call
  }
  
  // Event listener for referral code generation
  document.addEventListener("DOMContentLoaded", function() {
    // Get the referral code generator form
    const referralForm = document.getElementById("referral-form");
  
    // Handle form submission
    referralForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      // Get the referrer's information
      const referrerName = document.getElementById("referrer-name").value;
      const referrerEmail = document.getElementById("referrer-email").value;
      const purchaseAmount = parseFloat(document.getElementById("purchase-amount").value);
  
      // Generate a unique referral code
      const referralCode = generateReferralCode();
  
      // Display the referral code to the referrer
      const referralCodeDisplay = document.getElementById("referral-code-display");
      referralCodeDisplay.innerHTML = referralCode;
  
      // Track the referral with the actual purchase amount
      trackReferral(referrerName, referrerEmail, purchaseAmount);
  
      // Reset the form fields
      referralForm.reset();
    });
  });
  