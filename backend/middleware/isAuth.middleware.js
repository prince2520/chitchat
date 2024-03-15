const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");

module.exports = (req ,res ,next ) =>{
    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error = new Error('Not authenticated.');
        error.statusCode = StatusCodes.UNAUTHORIZED;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    }catch (err){
        err.statusCode = StatusCodes.NOT_FOUND;
        throw err;
    }

    if (!decodedToken){
        const error = new Error('Not authenticated.');
        error.statusCode = StatusCodes.UNAUTHORIZED;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
}
