/* data refs : Nordigen api  https://nordigen.com/en/docs/account-information/output/accounts/ */

const users = [{
        personalInfos: {
            id: "698674563",
            userName: "tonyJarvis",
            email: "tony.jarvis@bca.com",
            password: "8HSGUDZB%-:",
            firstName: "Tony",
            lastName: "Jarvis"
        },
        accountsInfos: {
            totalAccounts: 3,
            accounts: [
                {
                    name: "account1",
                    displayName: "account1",
                    iban: "XXXWWWWZZZ999",
                    bic:"LLLMMMOOPPP555",
                    product: "",
                    currency: "USD",
                    status:"enabled", // to select in 'status' array : ['enabled', 'disabled', 'blocked' ]
                    ownerName: "Tony Jarvis",
                    type: "checking",
                    linkedAccounts: "",
                    usage: "PRIV", // to select in 'usage' array : [ 'PRIV', 'ORGA']
                    details: "",
                    balance: "2,082.79",
                    balances: ["2,082.79", "2,087.79", "2,097.79"], // default = last 10
                    transactionsHistory: "last 10 days", // to select in 'transactionsHistory range' (up to 24 months)
                    transactions: [ // default = last 10 days
                        {
                            transactionId: "678678",
                            date: "2020-06-20",
                            transactionType: "Electronic", // to select in 'transaction Types' array 
                            category: "Food", // to select in 'categories' array
                            description: "Golden Sun Bakery",
                            creditorName: "Golden Sun SA",
                            transactionAmount: "5.00",
                            balanceAfterTransaction: "2,082.79",
                            bankTransactionCode: null,
                            notes: ""
                        },
                        {
                            transactionId: "678679",
                            date: "2020-06-20",
                            transactionType: "Electronic", // to select in 'transaction Types' array
                            category: "Food", // to select in 'categories' array
                            description: "Golden Sun Bakery",
                            creditorName: "Golden Sun SA",
                            transactionAmount: "10.00",
                            balanceAfterTransaction: "2,087.79",
                            bankTransactionCode: null,
                            notes: ""
                        },
                        {
                            transactionId: "678680",
                            date: "2020-06-20",
                            transactionType: "Electronic", // to select in 'transaction Types' array
                            category: "Food", // to select in 'categories' array
                            description: "Golden Sun Bakery",
                            creditorName: "Golden Sun SA",
                            transactionAmount: "12.00",
                            balanceAfterTransaction: "2,097.79",
                            bankTransactionCode: null,
                            notes: ""
                        }
                    ]
                }, 
                {
                    name: "account2",
                    displayName: "account2",
                    iban: "XXXWWWWZZZ8888",
                    bic:"LLLMMMOOPPP6666",
                    product: "",
                    currency: "USD",
                    status:"enabled", // to select in 'status' array : ['enabled', 'disabled', 'blocked' ]
                    ownerName: "Tony Jarvis",
                    type: "savings",
                    linkedAccounts: "",
                    usage: "PRIV", // to select in 'usage' array : [ 'PRIV', 'ORGA']
                    details: "account1",
                    balance: "10,928.42",
                    balances: ["10,000.42", "9,050.42", "8,928.20"], // default = last 10
                    transactionsHistory: "last 10 days", // to select in 'transactionsHistory range' (up to 24 months)
                    transactions: [
                        {
                            transactionId: "9876578",
                            entryReference:"",
                            date: "2020-06-20",
                            transactionType: "SEPA", // to select in 'transaction Types' array
                            creditorName:"",
                            debtorName:"account1",
                            category: "", // to select in 'categories' array
                            balanceAfterTransaction: "10,928.42",
                            description: "monthly saving",
                            transactionAmount: "950.00",
                            bankTransactionCode: "TYUI876555",
                            notes: ""
                        }
                    ]
                },
                {
                    name: "account3",
                    displayName: "account2",
                    iban: "XXXWWWWZZZ8888",
                    bic:"LLLMMMOOPPP6666",
                    product: "",
                    currency: "USD",
                    status:"enabled", // to select in 'status' array : ['enabled', 'disabled', 'blocked' ]
                    ownerName: "Tony Jarvis",
                    type: "creditCard",
                    linkedAccounts: "",
                    usage: "PRIV", // to select in 'usage' array : [ 'PRIV', 'ORGA']
                    details: "",
                    balance: "184.30",
                    balances: ["100.30", "9,050.42", "8,928.20"], // default = last 10
                    transactionsHistory: "last 10 days", // to select in 'transactionsHistory range' (up to 24 months)
                    transactions: [
                        {
                            transactionId: "90878567",
                            entryReference:"",
                            date: "2020-06-20",
                            transactionType: "Electronic", // to select in 'transaction Types' array
                            creditorName:"Furnitures SA",
                            debtorName:"",
                            category: "Housing", // to select in 'categories' array
                            balanceAfterTransaction: "184.30",
                            description: "",
                            transactionAmount: "84.30",
                            bankTransactionCode: "",
                            notes: ""
                        }
                    ]
                }
            ]
        }
    }
];

export default users;
