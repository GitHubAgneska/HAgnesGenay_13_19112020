
### EXPORTS 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

There are two types of exports:

- Named Exports (Zero or more exports per module)
- Default Exports (One per module)

----

### DEPLOY REACT APP (WITH CLIENT-SIDE ROUTING) TO GITHUBPAGES

1. `yarn add gh-pages`
2. add two keys to scripts value in the package.json file: 
        ` "predeploy": "npm run build", `
        ` "deploy": "gh-pages -d build" `

3. add to package.json file (as second entry) : 
  try : ` "homepage": "." `
  or : project repo url ( ex: `"https://github.com/GitHubAgneska/HAgnesGenay_11_19112020"`)
4. Because GitHub Pages does not support browser history like a browser does, 
in App.jsx => replace:
    `import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'`
    with:
    `import {HashRouter as Router, Route, Switch} from 'react-router-dom'`

5. make sure 'assets' has a copy in 'public'

6. deploy : `npm run deploy`

---



### CHROME FETCH CORS - iSSUE (to launch ghpages deploy)

- Launch 'chrome://flags/#temporary-unexpire-flags-m87' from address bar.
- Set to Enabled.
- Restart Chrome.
- Launch 'chrome://flags/#allow-insecure-localhost'
- It will be visible now, so simply enable it.
- Restart Chrome again.

----

### GIT 
---
> show remote branches that exist in your LOCAL repository
`git branch -a`

> show remote branches that exist in your REMOTE repository
`git branch -r` 

>  UPDATE the list of REMOTE branches
`git fetch`

> get rid of remote branches that no longer exist on the remote
`git fetch --prune` 

> DELETE REMOTE branch
`git push origin --delete test`

> DELETE LOCAL branch
`git branch -D myBranch` 

```bash 
# GIT CHECKOUT TO COMMIT AND BACK
git checkout <commit n>
git checkout master

# .gitignore universal setup one-liner
touch .gitignore && echo "node_modules/" >> .gitignore && git rm -r --cached node_modules ; git status

```

----


### NPM COMMANDS
```bash
#check npm installed globally
npm list -g --depth 0

#-> Uninstalling npm packages

npm uninstall <package-name>
npm uninstall -S <package-name> npm uninstall -D <package-name>
    
#If the package is installed globally, add the -g / --global flag:
npm uninstall -g <package-name>

#-> Uninstalling ALL npm packages  + re-install
rm -rf node_modules/
npm install

#-> Uninstalling ALL npm packages  + re-install

rm -rf node_modules/
rm -rf yarn.lock
rm -rf package-lock.json
yarn test --clearCache

npm i --package-lock-only
npm i
yarn


```


----



### JSDOCS syntax
https://jsdoc.app/about-getting-started.html

```bash
#example
    /**
    * Represents a book.
    * @constructor
    * @param {string} title - The title of the book.
    * @param {string} author - The author of the book.
    */


/**  */

@author
@async
#intended to be called with the "new" keyword
@class 

@constant
@default 
@example
@function 
@param
@property 
@returns

@see

#shorter version of the full description
@summary

#type of an object
@type

@todo

#What does the 'this' keyword refer to here
@this

#Link to another item in the documentation
{@link}

#Link to a tutorial
{@tutorial}


```


Running the documentation generator on the command line
 creates a directory named out/
 where generated HTML pages live 

``` jsdoc <book.js> ```

---
### NPM react-scripts issue
76 vulnerabilities (2 critical) with base react npm install + redux / react-redux

Workaround:
using package.json from `npx create-react-app <xxx> --template redux` (producing a 0 vulnerability audit), use all npm verions needed from there,

+ use `react-scripts@5.0.0-next.47` (latest)
+ `yarn add @babel/runtime`

---
### REACT REDUX  (official doc recommendations)

- Evaluate Where Each Piece of State Should Live (global => store ≠ local)

- Prefer using the React-Redux hooks API (useSelector and useDispatch) as the default way to interact with a Redux store from your React components ( ≠ connect api ) <==> + mapStateToProp 

- Prefer having more UI components subscribed to the Redux store and reading data  (performances)

- Prefer calling useSelector many times and retrieving smaller amounts of data, instead of having a single larger useSelector call that returns multiple results in an object

- Prefer dispatching a single "event"-type action that results in all of the appropriate state updates at once, or consider use of action batching addons to dispatch multiple actions with only a single UI update at the end ( ≠ dispatching many actions in a row to accomplish a larger conceptual "transaction")

- Allow Many Reducers to Respond to the Same Action: have many reducer functions all handle the same action separately
meaning  => each action is being dispatched to all the reducers, the reducers may decide whether they wish to use the action to update something or not - ?



