import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_USER_BY_ID } from '../utils/queries';

export function Orest() {
    const { loading, data, error } = useQuery(GET_ALL_USERS, {
    });

    if (error) console.log(error);
    const userData = data?.getAllUsers || [];

    return (
        <div>
            {console.log(userData)}
            <h2>Heres the list of all users:</h2>
            {loading
                ? (<div>Loading...</div>)
                : (
                    <ul style={{ listStyle: 'none' }}>
                        {userData.map((x) => (
                            <li key={x._id}>
                                ID: {x._id}, ssn#: {x.ssn}, {x.name}, {x.email}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
};


export function Orest2() {
    let userID;

    const [getUser, { loading, error, data }] = useLazyQuery(GET_USER_BY_ID);
    const userData = data?.userById || [];
    console.log(userData);
    
    if (error) console.log(error);

    return (
        <div>
            <div>
                <form onSubmit={e => {
                    e.preventDefault();
                    getUser({ variables: { id: userID.value } });
                    }}>
                    <label htmlFor="userID">Enter user ID:
                        <br />
                        <input ref={value => userID = value} />
                    </label>              
                    <br />
                    <button type="submit">Get User</button>
                </form>
            </div>

            {loading
                ? (<div>Loading...</div>)
                : (
                    <ul style={{ listStyle: 'none' }}>                      
                        <li>{userData._id}</li>
                        <li>{userData.name}</li>
                        <li>{userData.email}</li>
                        <li>{userData.ssn}</li>
                        
                        {userData.accounts &&
                            
                            <ul style={{ listStyle: 'none' }}>                          
                            {userData.accounts.map((x) => (
                                <li key={x._id}>
                                Type: {x.accountType}, Balance: ${x.balance}
                                </li>
                            ))
                            }
                            </ul>
                            
                        } 
                    </ul>
                )
            }
        </div>
    )
};