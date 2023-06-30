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
function trackReferral(referrerName, referrerEmail, referralCode, purchaseAmount) {
    // Add your logic to track and store successful referrals
    // You can use a database or an API call to store the referral information
    // For simplicity, we'll just log the referral data to the console
    console.log('Referral tracked:');
    console.log('Referrer Name:', referrerName);
    console.log('Referrer Email:', referrerEmail);
    console.log('Referral Code:', referralCode);
    console.log('Purchase Amount:', purchaseAmount);
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
  
      // Generate a unique referral code
      const referralCode = generateReferralCode();
  
      // Get the purchase amount
      const purchaseAmount = document.getElementById("purchase-amount").value;
  
      // Display the referral code to the referrer
      const referralCodeDisplay = document.getElementById("referral-code-display");
      referralCodeDisplay.innerHTML = referralCode;
  
      // Add the referral code and referrer's information to the referral tracking system
      trackReferral(referrerName, referrerEmail, referralCode, purchaseAmount);
  
      // Reset the form fields
      referralForm.reset();
    });
});
  
