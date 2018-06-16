const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();

const config = {
    appRoot: __dirname,
    swaggerFile: `${__dirname}/config/swagger.yaml`
};

SwaggerExpress.create(config, (err, swaggerExpress) => {

    if (err) {
        throw err;
    }

    let port = process.env.PORT || 8080;
    swaggerExpress.register(app);
    app.listen(port);

    console.log('Yo! Try this: curl http://127.0.0.1:' + port + '/token/eu-central-1_xXx/4bmoep5ndc_xXx?user=ironmen&password=nemnori');

});
