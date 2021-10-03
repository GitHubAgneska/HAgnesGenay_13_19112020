import Account from "./Account"

const mockAccountsData = [
    { 
        type: "Checking",
        balance: "2,082.79"
    },
    { 
        type: "Savings",
        balance: "10,928.42",
    },
    { 
        type: "CreditCard",
        balance: "184.30",
    }
];

const Accounts = () => { 

    return (

        mockAccountsData.map(account => (
            <Account key={Math.random()} type={account.type} balance={account.balance} />
        ))
    )
}
Accounts.propTypes = { 

}
export default Accounts