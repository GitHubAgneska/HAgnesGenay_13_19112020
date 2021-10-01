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
    - static code : adapt/implement html/css code from api 
    - add props and event handlers
    - add form logic (signIn)
    - implement CRUD with api calls via services
    - implement authentication
    - implement state with Redux
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
                                              ┌─────┐
                                  ┌───────────► DB  ├──USERS
                                  │           └─────┘
                                  │
                          ┌───────▼──────┐
                          │     API      ◄────────────────────────┐
                          └───────┬──────┘                        │
                                  │        ┌────────────┐         │
                                  ├────────┤   SIGNUP   ├─────────┼───────►  form : POST request (create user)
                                  │        └────────────┘         │
                                  │                               │
                                  │                               │
┌─────────────────────────────────▼───────────────────────────────┼───────────────────┐
│                                                                 │                   │
│                                                  ┌──────────────▼───────────────┐   ├─────────────────────┐
│    ┌─────────────────┐                           │                              │   │                     │
│    │     LOGIN       │ Form : triggers ──────────┼─►  POST(=> response= token)  │   │                     │
│    └────────┬────────┘ Triggers request          │                              │   │    REDUX STORE      │
│             │          for all user data: ───────┼─►  GET user data             │   │    ***********      │
│             │                                    │                              │   │    Keep user        │
│             │                                    │                              │   │    connected        │
│    ┌────────▼────────┐                           │                              │   │                     │
│    │  PROFILE PAGE   │ Edit profile──────────────┼─►  PUT                       │   │    Handle user      │
│    └────────┬────────┘                           │                              │   │    data             │
│             │                                    │                              │   │                     │
│             │                                    │                              │   │                     │
│             │                                    │                              │   │                     │
│    ┌────────▼────────┐                           │                              │   │                     │
│    │TRANSACTIONS PAGE│ Edit category/notes───────┼─►  PUT                       │   │                     │
│    └────────┬────────┘                           │                              │   ├─────────────────────┘
│             │                                    │                              │   │
│             │                                    │                              │   │
│             │                                    │                              │   │
│    ┌────────▼────────┐                           │                              │   │
│    │    SIGN OUT     ├───────────────────────────┼─►  Destroy token             │   │
│    └─────────────────┘                           │                              │   │
│                                                  │                              │   │
│                                                  │                              │   │
│                                                  └──────────────────────────────┘   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘


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





