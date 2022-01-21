# readme appendix

### Prerequisites and install MongoDB Community under MacOS Catalina = with Xcode & Homebrew
---
- #### XCode install
---

```bash
xcode-select --install

# IF error 'command line tools are already installed
# try:
xcode-select softwareupdate

# else
sudo rm -rf /Library/Developer/CommandLineTools

xcode-select --install
```
---
- #### Use Homebrew to install MongoDB Community
---

```bash
# check homebrew is uptodate
brew update

# then
brew tap mongodb/brew

brew install mongodb-community@5.0
```

---
---

### Run DB ( where `npm run dev:server` alone won't work ) && Populate db

```bash
# start db
brew services start mongodb-community

# then
npm run dev:server

# Populate database with users from 'populateDatabase.js'
npm run populate-db

# stop db
brew services stop mongodb-community

``` 

### Check DB was successfully populated


```bash
# Open new command line window

# launch mongodb
mongo

# select argentBankDB
use argentBankDB

# see collections
show collections

# show 'users' collection
db.users.find()

# close db
quit()

```

### Swagger api doc
http://localhost:3001/api-docs












