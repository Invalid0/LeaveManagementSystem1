const jwt = require('jsonwebtoken');
const verfiyToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(404).json({message: 'No token provided'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (expection) {
        res.status(403).json({message: 'Invalid token'});
    }
}

module.exports = verfiyToken;