# Amazon Cognito Jackpot 

![cognitojackpot](https://user-images.githubusercontent.com/2996203/41569481-a7798df6-736b-11e8-85fd-a71fc2aab65c.jpg)


# Packages 

This repository is a monorepo managed using Lerna. This means that we publish [many packages](/packages) to NPM from the same codebase.

To learn more about Lerna and their concepts, see the documentation [here](https://github.com/lerna/lerna)

# Project structure :


````
cognito-jackpot
|- lerna.json _______________________________ # learna config file
|- package.json _____________________________ # NPM config file
|- packages _________________________________ # Application packages
|  |- bot/  _________________________________ # The chat bot version
|  |- intellij-extension/ ___________________ # The intellij IDEA extension
|  |- rest-api/______________________________ # The REST API
|  |- visual-code-extension/ ________________ # The VS Code editor extension
|  |- web-app/_______________________________ # The web app
|    |- views/ 
|       |- index.ejs ________________________ # The main template      
````

# Installation :

1- Fork and clone the repo : ```git clone git@github.com:ouadie-lahdioui/cognito-jackpot.git```

2- Install npm packages : ```npm install```

3- Start the rest-api server using npm start :
```
cd packages/rest-api
npm install
npm start
```

4- Build and start the web-app :
```
cd packages/web-app
npm install
npm run build
npm start
```

This will be start a web server on port 8080 : http://localhost:8080


# Contributing :

If you are interested in fixing issues and contributing directly to the code base, take a look at the [issue list](https://github.com/ouadie-lahdioui/cognito-jackpot/issues).
 
Feel free to create new ones or help project grow by sending your Pull Requests.

# License

cognito-jackpot is a pet projecte licensed under the MIT license.
