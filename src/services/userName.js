const generateUsernames = (name, mobileNumber) => {
    // Sanitize the name
    const cleanName = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "") // Remove special characters
      .substring(0, 12);         // Limit to 12 characters
  
    // Extract segments of the mobile number
    const firstFour = mobileNumber.slice(0, 4);
    const middleFour = mobileNumber.slice(3, 7);
    const lastFour = mobileNumber.slice(-4);
  
    // Generate usernames
    return [
      `${cleanName}${firstFour}`,
      `${cleanName}${lastFour}`,
      `${cleanName}${middleFour}`,
    ];
  };

  module.exports = generateUsernames;