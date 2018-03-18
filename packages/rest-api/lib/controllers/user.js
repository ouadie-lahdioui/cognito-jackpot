const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

module.exports = {
    create: (req, res) => {

        const CognitoUser = AmazonCognitoIdentity.CognitoUser;
        const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
        const AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;
        const CognitoUserAttribute = AmazonCognitoIdentity.CognitoUserAttribute;


        let UserPoolId = req.swagger.params.userPoolId.value;
        let ClientId = req.swagger.params.clientId.value;

        let userName = req.swagger.params.user.value;
        let password = req.swagger.params.password.value;
        let email = req.swagger.params.email.value;

        let poolData = {UserPoolId, ClientId};
        let Pool = new CognitoUserPool(poolData);

        let userData = {userName, Pool};

        let cognitoUser = new CognitoUser(userData);

        let dataEmail = { Name: 'email', Value: email };
        let attributeEmail = new CognitoUserAttribute(dataEmail);

        let attributeList = [];
        attributeList.push(attributeEmail);

        Pool.signUp(userName, password, attributeList, null, function (err, result) {
            if (err) {
                return console.error(err);
            }
            cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
        });
    }
};