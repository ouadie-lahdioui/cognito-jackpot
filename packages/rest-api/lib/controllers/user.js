const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

module.exports = {
    create: (req, res) => {

        const CognitoUser = AmazonCognitoIdentity.CognitoUser;
        const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
        const AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;
        const CognitoUserAttribute = AmazonCognitoIdentity.CognitoUserAttribute;


        let UserPoolId = req.swagger.params.userPoolId.value;
        let ClientId = req.swagger.params.clientId.value;

        let Username = req.swagger.params.user.value;
        let password = req.swagger.params.password.value;
        let email = req.swagger.params.email.value;

        let poolData = {UserPoolId, ClientId};
        let Pool = new CognitoUserPool(poolData);
        let userData = {Username, Pool};

        let cognitoUser = new CognitoUser(userData);

        let dataEmail = { Name: 'email', Value: email };
        let attributeEmail = new CognitoUserAttribute(dataEmail);

        let attributeList = [];
        attributeList.push(attributeEmail);

        Pool.signUp(Username, password, attributeList, null, function (err, result) {
            if (err) {
                console.error("==> onError");
                res.json(err);
            } else {
                console.log(">>> onSuccess <<<");
                cognitoUser = result.user;
                res.json(cognitoUser.getUsername());
            }
        });
    }
};