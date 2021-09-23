
### EXPORTS 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

There are two types of exports:

- Named Exports (Zero or more exports per module)
- Default Exports (One per module)

----

### DEPLOY DIST TO GITHUBPAGES
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

```

----

