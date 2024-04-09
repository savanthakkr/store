const bcrypt = require('bcrypt');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');




const generateToken = (user) => {
  const payload =  { id: user.id,
    email: user.email,
    name: user.name,
    userrole: user.userRole,
  };
  return jwt.sign(payload, 'crud',{expiresIn: '24h'});
};

// Function to register a new user
const registerUser = async (req, res) => {
  try {

    const { firstName, lastName, email, password, gender, hobbies } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(req.body);

    
    const result = await sequelize.query(
      'INSERT INTO users (firstName, lastName, email, password, gender, hobbies) VALUES (?, ?, ?, ?, ?, ?)',
      {
        replacements: [firstName, lastName, email, hashedPassword, gender, hobbies ],
        type: QueryTypes.INSERT
      }
    );
    res.json({ message: `User created!` });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to login
const loginUser = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const { email, password } = req.body;

    console.log('Email:', email);
    console.log('Password:', password);
    

    const [existingUser] = await sequelize.query(
      'SELECT * FROM users WHERE email =?', { replacements: [email], type: QueryTypes.SELECT }
    );

    if (existingUser) {
      const user = existingUser;
      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (passwordMatch) {
        const token = generateToken(user);
        
        return res.status(200).send({ message: 'Login success!', token: token });
      } else {
        return res.status(401).send({ message: 'Incorrect password!' });
      }
    } else {
      return res.status(404).send({ message: 'Email not found! Sign up!' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// when user login success then genrate a token and this token is store peticuler user all detail 




// Function to get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id; 
    console.log(`userId: ${userId}`); 
    const user = await sequelize.query(
      'SELECT * FROM users WHERE id = ?',  { 
      replacements: [userId],
      type: sequelize.QueryTypes.SELECT})

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user[0]);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getImage = async (req, res) => {
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getImage
};
