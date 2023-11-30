

checkPassword = async (req, res, next) => {

    const {password} = req.body;


    // Check password length
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
  }

  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return res.status(400).json({ error: 'Password must contain at least one special character.' });
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({ error: 'Password must contain at least one uppercase letter.' });
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return res.status(400).json({ error: 'Password must contain at least one lowercase letter.' });
  }

  // If all checks pass, proceed to the next middleware or route handler
  next();
    
   
};


const passwordCheck = {
    checkPassword,

};

module.exports = passwordCheck;