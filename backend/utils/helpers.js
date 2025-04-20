const jwt = require("jsonwebtoken");

exports = {};

exports.getToken = async( email, user ) => {

    const token = jwt.sign(
        { id : user._id },
        "supposedtobe"
    );
    return token;
};

module.exports = exports;