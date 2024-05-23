const User = require('../schemas/user.schema');

const login = async (req, res) => {
   console.log(req.body);
   res.send('pepino'); 
}
    
module.exports = { login }