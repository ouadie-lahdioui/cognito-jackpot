const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

module.exports = {
    post_change_password: (req, res) => {

        const CognitoUser = AmazonCognitoIdentity.CognitoUser;
        const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
        const AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;

        let UserPoolId = req.swagger.params.userPoolId.value;
        let ClientId = req.swagger.params.clientId.value;

        let Username = req.swagger.params.user.value;
        let Password = req.swagger.params.oldPassword.value;
        let newPassword = req.swagger.params.newPassword.value;

        let poolData = {UserPoolId, ClientId};
        let Pool = new CognitoUserPool(poolData);

        let authenticationData = {Username, Password};
        let authenticationDetails = new AuthenticationDetails(authenticationData);

        let userData = {Username, Pool};

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log(">>> onSuccess <<<");
                cognitoUser.changePassword(Password, newPassword, function (err, result) {
                    if (err) console.log(err);
                    console.log(result);
                    res.json(`Congratulation ! You successfully changed the password for the user ${Username}`);
                });

            },
            onFailure: function (err) {
                console.log(">>> onFailure <<<");
                console.log(err);
                res.json(`Sorry ! There was an error with the user ${Username} : ${err.message}`);
            },
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                console.log(">>> NewPasswordRequired <<<");
                console.log(userAttributes);
                console.log(requiredAttributes);
                let attributesData = {};
                cognitoUser.completeNewPasswordChallenge("azerty123", attributesData, this)
            }
        });
    }
};