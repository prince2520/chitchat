const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require ('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.signUp = async (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    const invalidInput = validationResult(req);

    if(!invalidInput.isEmpty()){
        console.log(invalidInput);
        return res.status(422).json({success: false, message:invalidInput})
    }else {
        const foundUser = await User.findOne({email:email});

        if(foundUser){
            return res.status(422).json({success: false, message:'Email already exit!'})
        }else {
            bcrypt
                .hash(password,12)
                .then(hashedPw => {
                    const user = new User({
                        userName: userName,
                        email: email,
                        password: hashedPw
                    });
                    return user.save();
                })
                .then(result => {
                    return res.status(201).json({success: true, message: 'User Created'})
                })
        }
    }
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const invalidInput = validationResult(req);

    if(!invalidInput.isEmpty()){
        return res.status(422).json({success: false, message: invalidInput?.errors[0].msg})
    }

    let loadedUser;

    User.findOne({email: email}).populate('joinRoom').populate('privateUser')
        .then(user => {
            loadedUser = user;
            return bcrypt.compare(password, user.password)
        })
        .then(isEqual => {
            if (!isEqual) {
                return res.status(422).json({success: false, message: 'Password Incorrect!'})
            }else {
                const token = jwt.sign(
                    {
                        email: loadedUser.email,
                        userId: loadedUser._id.toString()
                    },
                    'OnePiece',
                    {expiresIn: '1h'}
                );
                return res.status(200).json({
                    success: true,
                    token: token,
                    user: loadedUser
                });
            }
        }).catch(err=>{
         return res.status(422).json({success:false, message: 'Email not found!'})
    })
}
