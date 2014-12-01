# Alloy Bootstrap


This is an alloy bootstrap with
 * [CoffeeScript](http://coffeescript.org/) is an attempt to expose the good parts of JavaScript in a simple way
 * [STSS](https://github.com/RonaldTreur/STSS) an Alloy tss pre-processor using SCSS (Sassy CSS) syntax.
 * [TiCons](https://github.com/fokkezb/ticons-cli) to generate icons and splash screens
 * [TiShadow](https://github.com/dbankier/TiShadow) run tests or execute code snippets live across all running iOS and Android devices
 * [TiStealth](https://github.com/fokkezb/ti-stealth), a module to replace console log calls with NOOPs which can later be restored


## Prerequisites

 * Do this:
```
 [sudo] npm install alloy tishadow grunt-cli
```
 * [Get started](http://tishadow.yydigital.com/getting%20started) with TiShadow
```
 [sudo] npm install -g ticons
```
 * [Get started](https://github.com/fokkezb/ticons-cli) with TiCons


## Installation

```sh
$ git clone git@github.com:vdesdoigts/alloy-bootstrap.git alloy-bootstrap
$ cd alloy-bootstrap
$ npm install
$ alloy install plugin
```

## Check your configuration

 * Titanium sdk version, 3.4.1.GA at the moment
```sh
$ titanium sdk
```
If you aren't on 3.4.1.GA
```sh
$ titanium sdk install 3.4.1.GA
$ titanium sdk select 3.4.1.GA
```

 * Alloy version
```sh
$ alloy -v
```
We use the last version og Alloy at the moment, 1.5.1
```sh
[sudo] npm install -g alloy
```


## Developement compilation commands

 * `grunt` - compiles the coffee and stss files
 * `grunt ticons` - compiles icons, splashes and assets
 * `grunt dev_all` - compiles everything and cross-pushes to TiShadow android and iOS
 * `grunt [dev_android|dev_ios]` - auto compile and pushes with TiShadow
 * `grunt clean` - deletes all generated files

## Run on specifics devices

 * `grunt shell:iphone6`
 * `grunt shell:iphone7`
 * `grunt shell:ipad6`
 * `grunt shell:ipad7`


## Default configuration
 * TiCons assets - we use iOS 3@x high resolution intead of xxxhdpi android resolution
 * TiCons splashes - we use a 2024x2024 pixels image
 * Android custom theme at `platform/android/res/values/customtheme.xml`
    * hide ActionBar
    * add translucent property

## TiCons 0.11.0

 * Icons

    * Default behavior
    $ ticons icons
    `pwd`/app/assets/iphone/iTunesArtwork@2x
    iTunesArtwork@2x is a png image without ".png" extension. It must be in 2024x2024 pixels.

    * Generate specify icons for iOS
    $ ticons -a -p ios icons `pwd`/app/assets/iphone/iTunesArtwork@2x

    * Generate specify icons for Android
    $ ticons -a -p android icons `pwd`/app/assets/android/icon.png


 * Splashes

    * Default behavior
    $ ticons splashes
    /Users/vdesdoigts/Workspace/titanium/Alloy-Bootstrap/app/assets/iphone/Default-Portrait-736h@3x.png

    * Custom splash
    $ ticons -a splashes `pwd`/app/assets/splash-2024x2024.jpg --no-nine
    You can provide a 2024x2024 pixels image to create your splashes. Be careful to center your logo. Since 0.10.0 if you give --width <width> and --height <height> then TiCons will try not to crop that area, taken from the centre of the input image.


 * Assets

    * Default behavior
    $ ticons assets
    By default, TiCons will look for the best current resolution, at the moment is 'xxxhdpi' on `app/assets/android/images/`.
    If you dont't have or need this resolution, TiCons will automatically `Skipped higher dpi: android-res-xxxhdpi` and take the images at `app/assets/iphone/images/`.

    * Custom path example
    $ ticons -a assets `pwd`/app/assets/iphone/images/
    Sometimes we don't need the best resolution or we don't have the images.

### grunt clean task

 * If you use iOS 3@x high resolution, add this lines (by default):

    ```
    "!app/assets/iphone/images/*@3x.png",
    "!app/assets/iphone/images/*@3x.jpg",
    ```
 * If you use xxxhdpi default high resolution, add this lines instead:

    ```
    "!app/assets/android/images/xxxhdpi/*.png",
    "!app/assets/android/images/xxxhdpi/*.jpg",
    ```


### .gitignore config
@TODO
