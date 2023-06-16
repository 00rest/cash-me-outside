import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, useApolloClient } from "@apollo/client";
import { GET_ALL_USERS, GET_USER_BY_ID } from '../utils/queries';
import { ADD_ZELLE_RECEPIENT } from '../utils/mutations';

import { Link, useLocation } from 'react-router-dom';


import { Form, Button, ListGroup, Row, Col, Card, Alert } from 'react-bootstrap';
import auth from '../utils/auth';


function ZellePage() {
const client = useApolloClient();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [err, setErr] = useState('');
const [zelleRecipients, setZelleRecipients] = useState(JSON.parse(localStorage.getItem("zelle_recipients") || "[]"));
const session = auth.getSession();

const [showAmountMemo, setShowAmountMemo] = useState([]);
const [amount, setAmount] = useState([]);
const [memo, setMemo] = useState([]);
const [transactions, setTransactions] = useState(JSON.parse(localStorage.getItem("transaction_history") || "[]"));

const handleAddRecipient = async (e) => {
  e.preventDefault();

  if (!name || !email) {
    setErr('Please enter a name and email.');
    return;
  }

  console.log('function triggered');

  const insertZelleRecipient = await client.mutate({
      mutation: ADD_ZELLE_RECEPIENT,
      variables: { id: session.userId, name: name, zelle_email: email }
  });
  console.log('ADD_ZELLE_RECEPIENT results:', insertZelleRecipient.data.createZelleRecipient.zelleRecipients);
  localStorage.setItem("zelle_recipients", JSON.stringify(
      insertZelleRecipient.data.createZelleRecipient.zelleRecipients ));

  const newRecipient = {
    name: name,
    email: email,
    amount: '',
    memo: '',
  };

  setZelleRecipients(JSON.parse(localStorage.getItem("zelle_recipients") || "[]"));
  setShowAmountMemo([...showAmountMemo, false]);
  setAmount([...amount, '']);
  setMemo([...memo, '']);
  setName('');
  setEmail('');
  setErr('');
};

const handleSendMoney = (index) => {
  const updatedRecipients = zelleRecipients.map((recipient, i) => {
    if (i === index) {
      return {
        ...recipient,
        amount: amount[index],
        memo: memo[index],
      };
    }
    return recipient;
  });

  const transaction = {
    recipient: updatedRecipients[index],
    date: new Date().toLocaleString(),
  };

  setZelleRecipients(updatedRecipients);
  setTransactions([...transactions, transaction]);
  setShowAmountMemo(showAmountMemo.map((item, i) => (i === index ? false : item)));
};

useEffect(() => {
  localStorage.setItem("transaction_history", JSON.stringify(transactions));
}, [transactions]);

return (
  <div className="container d-flex-column min-vh-100">
    <h1>Wire Transfer</h1>
    {err && <Alert variant="danger">{err}</Alert>}
    <div className="row">
      <div className="col-md-8">
        <div className="mt-4">
          <h3>Add Recipient</h3>
          <Form onSubmit={handleAddRecipient}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button variant="light" type="submit" style={{ backgroundColor: '#01796F', color: 'white' }}>
              Add Recipient
            </Button>
          </Form>
        </div>
        <div className="mt-4">
          <h3>Recipient List</h3>
          {zelleRecipients.length === 0 ? (
            <p>No recipients have been added yet</p>
          ) : (
            <ListGroup>
              {zelleRecipients.map((recipient, index) => (
                <ListGroup.Item key={index}>
                  <div>
                    <strong>Name:</strong> {recipient.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {recipient.zelle_email}
                  </div>
                  {!showAmountMemo[index] ? (
                    <Button
                      variant="light"
                      style={{ backgroundColor: '#01796F', color: 'white' }}
                      onClick={() => {
                        const updatedShowAmountMemo = [...showAmountMemo];
                        updatedShowAmountMemo[index] = true;
                        setShowAmountMemo(updatedShowAmountMemo);
                      }}
                    >
                      Send Money
                    </Button>
                  ) : (
                    <>
                      <Row>
                        <Col>
                          <Form.Group controlId={`formAmount_${index}`}>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter amount"
                              value={amount[index]}
                              onChange={(e) => {
                                const updatedAmount = [...amount];
                                updatedAmount[index] = e.target.value;
                                setAmount(updatedAmount);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId={`formMemo_${index}`}>
                            <Form.Label>Memo</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter memo"
                              value={memo[index]}
                              onChange={(e) => {
                                const updatedMemo = [...memo];
                                updatedMemo[index] = e.target.value;
                                setMemo(updatedMemo);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        variant="light"
                        style={{ backgroundColor: '#01796F', color: 'white' }}
                        onClick={() => handleSendMoney(index)}
                      >
                        Confirm Send
                      </Button>
                    </>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      </div>
      <div className="col-md-4">
        <div className="mt-4">
          <h3>Transaction History</h3>
          {transactions.length === 0 ? (
            <p>No transactions have been made yet</p>
          ) : (
            <Card style={{ backgroundColor: '#003366', color: 'white' }}>
              <ListGroup variant="flush">
                {transactions.map((transaction, index) => (
                  <ListGroup.Item key={index}>
                    <div>
                      <strong>Date:</strong> {transaction.date}
                    </div>
                    <div>
                      <strong>Name:</strong> {transaction.recipient.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {transaction.recipient.zelle_email}
                    </div>
                    <div>
                      <strong>Amount:</strong> {transaction.recipient.amount}
                    </div>
                    <div>
                      <strong>Memo:</strong> {transaction.recipient.memo}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default ZellePage;







// function ZellePage() {

//   const session = auth.getSession();
//   console.log(session);

//   const { loading, data, error } = useQuery(GET_USER_BY_ID, {
//     variables: { id: session.userId }
//   });
//   const zelleRecipients = data?.userById.zelleRecipients || [];
//   console.log("zelleRecipients", zelleRecipients );


//   const [recipients, setRecipients] = useState(zelleRecipients);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [showAmountMemo, setShowAmountMemo] = useState(false);
//   const [amount, setAmount] = useState('');
//   const [memo, setMemo] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [err, setErr] = useState('');


//   //const [zlRecipients, setZlRecipients] = useState(zelleRecipients);

//   if (error) console.log(error);


//   const handleAddRecipient = (e) => {
//     e.preventDefault();

//     if (!name || !email) {
//       setErr('Please enter a name and email.');
//       return;
//     }

//     const newRecipient = {
//       name: name,
//       email: email,
//       amount: '',
//       memo: '',
//     };
//     setRecipients([...recipients, newRecipient]);
//     setName('');
//     setEmail('');
//     setErr('');
//   };

//   const handleSendMoney = (index) => {
//     const updatedRecipients = recipients.map((recipient, i) => {
//       if (i === index) {
//         return {
//           ...recipient,
//           amount: amount,
//           memo: memo,
//         };
//       }
//       return recipient;
//     });

//     const transaction = {
//       recipient: updatedRecipients[index],
//       date: new Date().toLocaleString(),
//     };

//     setRecipients(updatedRecipients);
//     setTransactions([...transactions, transaction]);
//     setShowAmountMemo(false);
//     setErr('');
//   };

//   return (
//     <div className="container d-flex-column min-vh-100">
//       <h1>Zelle</h1>
//       {err && <Alert variant="danger">{err}</Alert>}
//       <div className="row">
//         <div className="col-md-8">
//           <div className="mt-4">
//             <h3>Add Recipient</h3>
//             <Form onSubmit={handleAddRecipient}>
//               <Form.Group controlId="formName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formEmail">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Form.Group>
//               <Button variant="light" type="submit" style={{ backgroundColor: "#01796F", color: "white" }}>
//                 Add Recipient
//               </Button>
//             </Form>
//           </div>
//           <div className="mt-4">
//             <h3>Recipient List</h3>
//             {recipients.length === 0 ? (
//               <p>No Recipient has been added yet</p>
//             ) : (
//             <ListGroup>
//               {recipients.map((recipient, index) => (
//                 <ListGroup.Item key={index}>
//                   <div>
//                     <strong>Name:</strong> {recipient.name}
//                   </div>
//                   <div>
//                     <strong>Email:</strong> {recipient.zelle_email}
//                   </div>
//                   {!showAmountMemo && (
//                     <Button
//                       variant="light" style={{ backgroundColor: "#01796F", color: "white" }}
//                       onClick={() => setShowAmountMemo(true)}
//                     >
//                       Send Money
//                     </Button>
//                   )}
//                   {showAmountMemo && (
//                     <>
//                       <Row>
//                         <Col>
//                           <Form.Group controlId={`formAmount_${index}`}>
//                             <Form.Label>Amount</Form.Label>
//                             <Form.Control
//                               type="text"
//                               placeholder="Enter amount"
//                               value={amount}
//                               onChange={(e) => setAmount(e.target.value)}
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group controlId={`formMemo_${index}`}>
//                             <Form.Label>Memo</Form.Label>
//                             <Form.Control
//                               type="text"
//                               placeholder="Enter memo"
//                               value={memo}
//                               onChange={(e) => setMemo(e.target.value)}
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <Button
//                         variant="light" style={{ backgroundColor: "#01796F", color: "white" }}
//                         onClick={() => handleSendMoney(index)}
//                       >
//                         Confirm Send
//                       </Button>
//                     </>
//                   )}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//             )}
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="mt-4">
//             <h3>Transaction History</h3>
//             {transactions.length === 0 ? (
//               <p>No transactions has been made yet yet</p>
//             ) : (
//               <Card style={{ backgroundColor: "#003366", color: "white" }}>
//                 <ListGroup variant="flush">
//                   {transactions.map((transaction, index) => (
//                     <ListGroup.Item key={index}>
//                       <div>
//                         <strong>Date:</strong> {transaction.date}
//                       </div>
//                       <div>
//                         <strong>Name:</strong> {transaction.recipient.name}
//                       </div>
//                       <div>
//                         <strong>Email:</strong> {transaction.recipient.email}
//                       </div>
//                       <div>
//                         <strong>Amount:</strong> {transaction.recipient.amount}
//                       </div>
//                       <div>
//                         <strong>Memo:</strong> {transaction.recipient.memo}
//                       </div>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               </Card>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ZellePage;