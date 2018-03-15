const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();

module.exports = app; // for testing

const config = {
    appRoot: __dirname,
    swaggerFile: `${__dirname}/config/swagger.yaml`
};

SwaggerExpress.create(config, function (err, swaggerExpress) {

    if (err) {
        throw err;
    }

    swaggerExpress.register(app);

    let port = process.env.PORT || 8080;
    app.listen(port);

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
    }

});
