const User = require('../schemas/user.schema');

const login = async (req, res) => {
   const { email, password} = req.body

   if ( !email || !password) {
      return res.status(400).json( { error : { login: "Falta email o contraseña"}})
   }

   User.findOne({ email })
   .then ((foundUser) => {
      if (!foundUser) {
        return res.status(400).json({ error: { email: "Usuario no encontrado, por favor regístrese"}})
      }
      if (!foundUser.comparePassword(password)) {
         return res.status(400).json({error: { password: "Contraseña incorrecta"}})
      }
      return res.status(200).json({
         token: foundUser.generateJWT(),
         user: {
            email: foundUser.email,
            name: foundUser.name,
            id: foundUser._id,
            role: foundUser.role
         },
      })
   })
.catch((error) => {
   return res.status(500).json( { error: { register: "Error login in:", error }})
})
}
    
module.exports = { login }