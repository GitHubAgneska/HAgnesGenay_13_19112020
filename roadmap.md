##  Argent Bank app : development Roadmap
---

---
### 1 - API
---
 > https://github.com/GitHubAgneska/Project-10-Bank-API/tree/master
- get API up and running (see README.md and README-appendix.md of api repository)

---
### 2 - APP
---
1. List all functionalities (see api features folder)
2. Map out app logic / anatomy (uml diagram)
   + Place Redux within this logic
3. Design a model for user object
4. Design app architecture ( components hierarchy )
5. Create app : 
    - import existing static code from api 
    - implement all above
6. Create api models using Swagger

---
1. FEATURES LIST
    - Homepage
        > - navigate to homepage ('/')
        > - see all placeholder data from mockup
    - Login page
        > - Navigate to login page (/login)
        > - Fill out credentials
        > - Login to back-end API with JWT tokens for authentication
        > - Successfully navigate to a profile page (`/profile`)
    - Logout
        > - See logout button when logged in
        > - Click logout button
        > - Be sent back to home page (`/`)
    - Profile page
        > - See logged in user profile page
        > - See logged in user first name
        > - See logged in user placeholder bank account information
        > - Edit logged in user informations (backend persistent)
    - Redux state manager
        > - a store to manage all of the data
        > - action(s) for sending information
        > - reducer(s) for handling application state changes
---

2. APP DIAGRAM with REDUX
```
                ┼


                                            ┌─────┐
                                ┌───────────► DB  ├──USERS
                                │           └─────┘
                                │
                        ┌───────▼──────┐
                        │   API        │
                        └───────┬──────┘
                                │                ┌──────────────┐
                                ├────────────────┤     SIGNUP   ├──────Form: POST create user
               ┌─────────────┐  │                └──────────────┘
               │┼┼┼┼┼┼┼┼┼┼┼┼┼│  │
               │┼┼┼──────────┴──┴─────────────┐
               │┼┼│                           │
               │┼┼│    ┌───────────────┐      │
         ┌─────┼┼┼│    │    LOGIN      ├──────┼───────────Form : POST => response= token
         │┼┼┼┼┼┼┼┼│    └───────┬───────┘      │
   ┌─────┼┼┼┼┼┼┼┼┼│            │              │
┌──┴──────────┼┼┼┼│            │              │
│*** REDUX ***│┼┼┼│            │              │
│             │┼┼┼│    ┌───────▼───────┐      │
│Keep user    │┼┼┼│    │  PROFILE PAGE ├──────┼───────────GET (3 endpoints)
│connected    │┼┼┼│    └───────┬───────┘      │           edit profile: PUT
│             │┼┼┼│            │              │
│Handle user  │┼┼┼│            │              │
│data         │┼┼┼│            │              │
│             │┼┼┼│    ┌───────▼─────────┐    │
│             │┼┼┼│    │TRANSACTIONS PAGE├────┼───────────GET  (1 enpoint)
└───┬─────────┼┼┼┼│    └───────┬─────────┘    │           edit category/notes: PUT
    └──────────┼┼┼│            │              │
               │┼┼│            │              │
               │┼┼│            │              │
               │┼┼│    ┌───────▼───────┐      │
               │┼┼│    │ SIGN OUT      ├──────┼───────────destroy token
               │┼┼│    └───────────────┘      │
               │┼┼│                           │
               │┼┼│                           │
               │┼┼│                           │
               │┼┼┼──────────────┬────────────┘
               │┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼│
               └─────────────────┘




# diagram created using asciiflow
```

3. USER OBJECT MODEL

````
user personal infos
{
    id : String,
    email: String,
    password: String,
    firstName: String,
    lastName: String
}

user accounts infos
{
    id : String,
    accounts: [
        account1: {
            type : checking,
            balance: int,
            transactions: [
                {   id : int,
                    date: dateString,
                    transactionType : String ( select in transaction Types array )
                    category: String ( select in categories array ),
                    description: String,
                    amount: int,
                    notes: String
                }
            ]
        },
        account2: {
            type : savings,
            balance: int,
            transactions: [
                {   id : int,
                    date: dateString,
                    transactionType : String ( select in transaction Types array )
                    category: String ( select in categories array ),
                    description: String,
                    amount: int,
                    notes: String
                }
            ]
        },
        account3: {
            type : creditCard,
            balance: int,
            transactions: [
                {   id : int,
                    date: dateString,
                    transactionType : String ( select in transaction Types array )
                    category: String ( select in categories array ),
                    description: String,
                    amount: int,
                    notes: String
                }
            ]
        }
    ]
}


````





