import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";

const registrar = async (req, res) => {
    //Evitar registros duplicados

    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({email});

    if(existeUsuario){
        const error = new Error("Usuario ya Registrado");
        return res.status(400).json({ msg: error.message});
    }

    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const autenticar = async (req, res) => {
    const {email, password} = req.body;
    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({email});

    if(!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message});
    }
    //Compribar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message});
    }
};

const confirmar = async (req, res) =>{
    const { token } = req.params;
    console.log(token)
    const usuarioConfirmar = await Usuario.findOne({ token });
    if(!usuarioConfirmar){
        const error = new Error("Token no valido");
        return res.status(402).json({ msg: error.message}); 
    }
    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = ""
        await usuarioConfirmar.save();
        res.json({msg: "Usuario Confirmado Correctamente"});
    } catch (error) {
        console.log(error);
    }
}

const olvidePassword= async (req, res) =>{
    const {email} = req.body;
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message}); 
    }
    try {
        usuario.token=generarId();
        await usuario.save();
        res.json({msg:"Hemos enviado un email con las instrucciones"})
    } catch (error) {
        console.log(error);
    }
    
}

const comprobarToken = async (req,res) =>{
    const { token } = req.params;

    const tokenValido = await Usuario.findOne({token}); 
    
    if(tokenValido){
        res.json({msg:"Token Valido"})
    }else{
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message}); 
    }
}

const nuevoPassword = async  (req,res) =>{
    const {token} = req.params;
    const { password } =req.body;
    
    const usuario = await Usuario.findOne({token});
    if(usuario){
        usuario.password = password;
        usuario.token="";
        try {
            await usuario.save();
            res.json({msg: "Password Modificado Correctamente"})
        } catch (error) {
            console.log(error);
        }
    }else{
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message}); 

    }
}

export {registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword}