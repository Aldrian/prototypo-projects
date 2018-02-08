Allows you to retrieve your Prototypo project infos.
Can be used with the library to create a dynamic version of a prototypo variant.

Retrieves:
* All the families, their name and the template they use.
* Each family variants with their name and values

# Usage

## Legacy
* Import lib/prototypo-projects.js into your webpage
* Fetch your projects:
```js
window['prototypo-projects'].getProjects('myemail', 'mypassword').then(function(fonts) {
    // Do something with the font array
});
```

## As an import
```js
import prototypoProjects from 'prototypo-projects';
prototypoProjects.getProjects('myemail', 'mypassword').then((fonts) => {
  // Do something with the font array
});
```
