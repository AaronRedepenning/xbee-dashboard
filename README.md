# xbee-dasboard — A Dashboard for the Team 6 Senior Design Project

This project is an application for a senior design project at the University of St. Thomas, for
the company Design Ready Controls. The application is for a Project Down-select demo that displays
information gathered from a Xbee wireless sensor network.

This project uses [AngularJS](http://angularjs.org/) as it web framework. Other web technologies used
by this project are listed, with links to documentation, in the very last section of this README (see
useful resources section).

### Prerequisites

Git is used for version control, it is not needed to set up this project but it may be helpful.
You can get git from
[http://git-scm.com/](http://git-scm.com/).

This project also uses a number of node.js tools to initialize and test xbee-dasboard.
You must have node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

This project also uses bower as its front end package manager. It is automatically installed by
npm (the node.js package manager). More information about Bower can be found at:
[http://bower.io/](http://bower.io/).

## Getting Started

You have two options for getting started with xbee-dasboard:

1. Download .zip file from github - Quicker and Easier option.

2. Clone on computer using git. - Better option, allows you to easily update the project to newer versions,
contribute to the code, see version control history, and everything else that git allows you to do.

### Download zip

Press Download ZIP button on github. The button is located on the right of the page above
the listing of project files.

### Clone Using git

To get stated simply clone this repository onto your local computer. To do this run the following
command from a terminal:

```
git clone https://github.com/AaronRedepenning/xbee-dashboard.git
```

*Note: You may need to enter your github credentials.*


### Install Dependencies

Project dependencies are installed from either npm or bower.

* The tools this application depends on are installed from `npm`, the [node package manager][npm].
* The angular code and other front end software is installed from `bower`, a
[client-side code package manager][bower].

To make things easier `npm`  has been preconfigured to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  After running `npm install` you should find
two new folders within the project

* `node_modules` - contains the npm packages for the tools needed
* `app/bower_components` - contains the angular framework files, bootstrap files, etc.

*Note that the `bower_components` folder would normally be installed in the root folder but
xbee-dashboard changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

The project has been preconfigured with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.



## Directory Layout

```
app/                    --> all of the source files for the application
  theme.css              --> default stylesheet
  common/                --> reusable components to be used across the application
    directives/              --> reusable angular directives
      sidebar/                 --> side navigation bar directive
        sidebar.css                 --> styles for the side navigation bar
        sidebar.html                --> html template for side navigation bar
        sidebar.js                  --> javascript file that creates sidebar directive
      topbar/                  --> top navigation bar directive
        topbar.css                 --> styles for the top navigation bar
        topbar.html                --> html template for top navigation bar
        topbar.js                  --> javascript file that creates topbar directive
  main/                 --> The default view for the Dashboard
    directives/           --> reusable directives for the main module
      realtime-chart/     --> contains .js file for creating a real time char using Flot.js
    main.html             --> the partial template
    main.js               --> the controller logic
    main.css              --> styles
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
```


## Updating xbee-dasboard

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular, bootstrap, and other front end dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.



### Running the App during Development

The xbee-dasboard has a local development webserver.  It is a node.js
tool called [http-server][http-server].  You can start this webserver with `npm start` but you may choose to
install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by
running:

```
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own webserver, such as apache or nginx. Just
configure your server to serve the files under the `app/` directory.


## Useful Resources

For more information on AngularJS check out http://angularjs.org/

Other resources:
* Git - http://git-scm.com/
* Bower - http://bower.io
* NPM - https://www.npmjs.org/
* Node - http://nodejs.org
* Flot Charts - http://www.flotcharts.org/
* Font-Awesome https://fortawesome.github.io/Font-Awesome/
* Bootstrap - http://getbootstrap.com/
* Http-server - https://github.com/nodeapps/http-server

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[flot]: http://www.flotcharts.org/
[font awesome]: https://fortawesome.github.io/Font-Awesome/
[bootstrap]: http://getbootstrap.com/
[http-server]: https://github.com/nodeapps/http-server

Any questions, ask Aaron Redepenning: rede3704@stthomas.edu
