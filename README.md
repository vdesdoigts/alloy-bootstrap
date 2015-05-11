# Alloy Bootstrap
Inspired by [JAST](https://github.com/dbankier/JAST).

This is an alloy bootstrap with
 * [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) -
   Appcelerator's own MVC Framework.
 * [Babel](https://babeljs.io/) - to give us some ES6 support.
 * [STSS](https://github.com/RonaldTreur/STSS) an Alloy tss pre-processor using SCSS (Sassy CSS) syntax.
 * [TiCons](https://github.com/fokkezb/ticons-cli) to generate icons and splash screens
 * [TiShadow](https://github.com/dbankier/TiShadow) run tests or execute code snippets live across all running iOS and Android devices
 * [TiStealth](https://github.com/fokkezb/ti-stealth), a module to replace console log calls with NOOPs which can later be restored


## Prerequisites

 * Do this:
```
 [sudo] npm install -g alloy tishadow grunt-cli
```
 * [Get started](http://tishadow.yydigital.com/getting%20started) with TiShadow


## Installation

```sh
$ git clone git@github.com:vdesdoigts/alloy-bootstrap.git alloy-bootstrap
$ cd alloy-bootstrap
$ npm install
$ grunt
$ alloy install plugin
$ tishadow config --boost
```

**Note**: Don't pay attention to `Could not find the "app"-folder in working directory` when you run npm install


## Check your configuration

 * Titanium sdk version, 3.5.1.GA at the moment
```sh
$ titanium sdk
```
If you aren't on 3.5.1.GA
```sh
$ titanium sdk install 3.5.1.GA
$ titanium sdk select 3.5.1.GA
```


 * Alloy version
```sh
$ alloy -v
```
We use the last version og Alloy at the moment, 1.7.0
```sh
[sudo] npm install -g alloy
```


## Developement compilation commands

 * `grunt` - compiles the stss and es6 files and copies all the assets from `src` to `app`
 * `grunt dev [-p <platform>]` - auto compile and pushes on TiShadow app (`p` flag is optional)
 * `grunt test [-p <plaform>]` - run specs  (`p` flag is optional)
 * `grunt clean` - deletes all generated files
 * `grunt [iphone6|iphone7|ipad6|ipad7]`

**Note**: the `grunt dev` command will launch your application in a tishadow app, you need to built it before.
All code changes will be selectively precompiled and pushed (live-reload).

Please use the TiShadowApp in the repository with according modules and config for the App.


## Default configuration
 * TiCons assets - we use xxxhdpi android resolution
 * TiCons splashes - we use a 2208x2208 pixels image
 * Android custom theme at `platform/android/res/values/customtheme.xml`
    * hide ActionBar
    * add translucent property


## TiCons 0.12.1

 * Icons

    * Custom behavior, iTunesArtwork@2x.png must be in 1024x1024 pixels.
    ```
    $ ticons icons `pwd`/src/assets/images/iTunesArtwork@2x.png
    ```


 * Splashes

    * Custom splash, you can provide a 2208x2208 pixels image to create your splashes. Be careful to center your logo. Since 0.10.0 if you give --width <width> and --height <height> then TiCons will try not to crop that area, taken from the centre of the input image.
    ```
    $ ticons -a splashes `pwd`/src/assets/images/splash2208x2208.jpg --no-nine
    ```



 * Assets

    * Custom behavior
    ```
    $ ticons -a assets --max-dpi xxxhdpi `pwd`/src/assets/images/xxxhdpi
    ```


### .gitignore config
@TODO
