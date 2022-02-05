#  ABank
## Banking application
---

<p align="center">
    <img width="800px" src="./client/src/assets/screens/argentBank_user.png">
</p>

---

### Stack
- client
    - React/Redux
- API
    - ExpressJs
    - MongoDb
---

### Tools
- Swagger

--- 
### Project requirements & Development roadmap
- Please visit [roadmap](roadmap.md)

---
---
### INSTALL & RUN
---
```bash
# clone repo
git clone https://github.com/GitHubAgneska/HAgnesGenay_13_19112020.git
#install api dependencies
npm i
#install client dependencies
npm run install-client
```
---
### Run
---
 `npm run start-app`

--- 
--- 

```
+----------------------------+
| ARGENT BANK DATA FLOW      |
+----------------------------+

    +----------------------------------------------------------------------+
    |                           MONGODB                                    |
    |                                                                      |
    +-------------------------------+--------------------------------------+
    |  DB (MONGO) OC : DEV          |   DB (MONGO) PRIVATE : PROD          |
    +-------------------------------+--------------------------------------+
    | add user: 'populate-db'script |   add user: $db > insertOne(---)     |
    |                               |                                      |
    |                               |                                      |
    +----------------^--------------+----------------^---------------------+
                     |                               |
                 +---+-------------------------------+---+
                 |          (MONGOOSE ORM)               |
                 +---+-------------------------------+---+
                     |                               |
                 +---+-------------------------------+---+
                 | ---------- EXPRESS  --------          |
                 +---+-------------------------------+---+
                     |                               |
 +-------------------v-------------------------------v-----------------------+
 |                            API                                            |
 +---------------------------------------------------------------------------+
 |  Base-URL: localhost:3001/api/v1/user                                     |
 |                                                                           |
 |            ---------------------/login                                    |
 |            ---------------------/signup                                   |
 |            ---------------------/profile/:id                              |
 |        + not yet implemented:                                             |
 |            ---------------------/profile/:id/account/:id                  |
 |            ---------------------/profile/:id/account/:id/transaction/:id  |
 |                                                                           |
 +------------------------------^--------------------------------------------+
                                |
                                |
 +------------------------------v---------------------------------------------+
 |  CLIENT (REACT)                                                            |
 +----------------------------------------------------------------------------+
 |                                                                            |
 |  Base-URL -----------------                                                |
 |           -----------------/home                                           |
 |           -----------------/signin                                         |
 |           -----------------/signup                                         |
 |           -----------------/user/:id  --->FETCH USERDATA : POST request    |
 |           -----------------/user/:id  --->EDIT  USERDATA : PUT  request    |
 |        + not yet implemented:                                              |
 |           ----------------/user/:id/account/:id                            |
 |                        |--->FETCH USER_ACCOUNT : POST request              |
 |                                                                            |
 |                        |--->FETCH USER_ACCOUNT_TRANSACTION : POST request  |
 |           ----------------/user/:id/account/:id/transaction/:id            |
 +----------------------------------------------------------------------------+
```