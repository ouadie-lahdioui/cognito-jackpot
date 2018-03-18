const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

module.exports = {
    get_id_token: (req, res) => {

        const CognitoUser = AmazonCognitoIdentity.CognitoUser;
        const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
        const AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;

        let UserPoolId = req.swagger.params.userPoolId.value;
        let ClientId = req.swagger.params.clientId.value;

        let Username = req.swagger.params.user.value;
        let Password = req.swagger.params.password.value;

        let poolData = {UserPoolId, ClientId};
        let Pool = new CognitoUserPool(poolData);

        let authenticationData = {Username, Password};
        let authenticationDetails = new AuthenticationDetails(authenticationData);

        let userData = {Username, Pool};

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log(">>> onSuccess <<<");
                res.json(`Congratulation ! The id token for the user ${Username} is : ${result.idToken.jwtToken}`);
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