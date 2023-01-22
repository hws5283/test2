const HttpError = require("../models/http-error");

const testUsers = [
    {
        uname:'Shadeck123',
        password: 'Expanse442!'
    }
];

const login = (req,res,next) =>{

    const {userName,password} = req.body;

    //find username match
    const idAdmin = testUsers.find(u=>u.userName === userName);
    
    if(!idAdmin || idAdmin.password !== password){
        throw new HttpError('User not identified', 401);
    }

    res.json({message:'logged in !!'});
}

exports.login = login;