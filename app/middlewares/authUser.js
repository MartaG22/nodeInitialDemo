const basicAuth = require('express-basic-auth')

const authUser = basicAuth({
      users: {'admin': 'password1234'},
      unauthorizedResponse: {status:"not-authorized", 
      message:"401-Unauthorized Access."}
  
});

module.exports = authUser;