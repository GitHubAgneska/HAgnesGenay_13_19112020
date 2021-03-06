#### => Prerequisites
---

- [Node.js v12](https://nodejs.org/en/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

Please make sure you have the right versions and download both packages. You can verify this by using the following commands in your terminal:

```bash
# Check Node.js version
node --version

# Check Mongo version
mongo --version
```
- if you don't have MongoDB installed, please refer to instructions (MacOs only) => [MONGO_INSTALL-MACOS](MONGO_INSTALL-MACOS.md)

---

### => Run
---
- run the app locally: `npm run start-app`

- after you stop the app, run : `npm run db-stop` to close the db
--- 

#### More info on DB 
after running `npm run populate-db`: 

your server should now be running at http://locahost:3001 and you will now have two users in your MongoDB database!


#####  PROD MODE => personal MONGODB

```bash
Mongo Connect to Cluster0 >
$ mongosh "mongodb+srv://cluster0.o1p30.mongodb.net/argentbankDB” --username agneska

$ ARGENTBANKDB  > show collections > users
					> db.users.insertOne({ —})
					> db.users.insertMany([ { — }, {—} ])
		

DB add user:
db.users.insertOne({ 
...     firstName: 'Bojack',
...     lastName: 'Horseman',
...     email: 'bj@horseman.com',
...     password: 'password789'
...   })




DATA API  URL Endpoint
https://data.mongodb-api.com/app/data-alrkq/endpoint/data/beta


EXPRESS/APP CONNECTION STRING:
mongodb+srv://agneska:<PASSWORD>@cluster0.o1p30.mongodb.net/<DBNAME>?retryWrites=true&w=majority
(To use here => server.js >  mongoose.connect(<——>, {}) )

DB API KEY access to the Data API
Key name: argentbankapikey
Key:  Ybn4LykuCFMzwYXJ0HjNz3hCiBvjm4QNqGN05kVzs6Ga6ICJJCbLMk9ywDlwjWhA


```


#####  IF USING API FROM OC ( ONLY DEV MODE !)
run the `populate-db` => you should have two users in your database:

##### Tony Stark
- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

##### Steve Rogers
- First Name: `Steve`,
- Last Name: `Rogers`,
- Email: `steve@rogers.com`,
- Password: `password456`
----








#### API Documentation

To learn more about how the API works, once you have started your local environment, you can visit: http://localhost:3001/api-docs

---








### EXPORTS 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

There are two types of exports:

- Named Exports (Zero or more exports per module)
- Default Exports (One per module)

----

### <s>DEPLOY DIST TO GITHUBPAGES
#### REACT WAY => https://create-react-app.dev/docs/deployment/#github-pages
-----------
if error 'fatal: A branch named 'gh-pages' already exists' 
-> manually delete node_modules/.cache/gh-pages

-----------
` git subtree push --prefix dist origin gh-pages `

[ git see current state: ` git log --graph --decorate --oneline ` ]


---
### CHROME FETCH CORS - iSSUE (to launch ghpages deploy)

- Launch 'chrome://flags/#temporary-unexpire-flags-m87' from address bar.
- Set to Enabled.
- Restart Chrome.
- Launch 'chrome://flags/#allow-insecure-localhost'
- It will be visible now, so simply enable it.
- Restart Chrome again.
</s>

#### ===> (USELESS as project has a backend)
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

>  CHECKOUT TO COMMIT AND BACK
`git checkout <commit>`
`git checkout master`

> REVERT TO COMMIT WITHOUT KEEPING CHANGES
`git reset --hard <commit>`

> REVERT TO COMMIT AND KEEP CHANGES
`git reset --soft <commit>`


```bash 
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



