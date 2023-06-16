import React, { useState, useEffect } from 'react';
import { useApolloClient } from "@apollo/client";
import { ADD_WIRE_RECEPIENT, ADD_TRANSACTION, ADD_WIRE_R_TRANSACTION } from '../utils/mutations';
import { Form, Button, ListGroup, Row, Col, Card, Alert } from 'react-bootstrap';
import auth from '../utils/auth';


function Transfer() {

  const client = useApolloClient();
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [err, setErr] = useState('');
  const [wireRecipients, setWireRecipients] = useState(JSON.parse(localStorage.getItem("wire_recipients") || "[]"));
  const session = auth.getSession();
  const [showAmountMemo, setShowAmountMemo] = useState([]);
  const [amount, setAmount] = useState([]);
  const [memo, setMemo] = useState([]);
  const [transactions, setTransactions] = useState(JSON.parse(localStorage.getItem("wire_transaction_history") || "[]"));
 

  const handleAddRecipient = async (e) => {
    e.preventDefault();

    if (!name || !accountNumber) {
      setErr('Please enter a name and account number.');
      return;
    }

    const insertWireRecipient = await client.mutate({
      mutation: ADD_WIRE_RECEPIENT,
      variables: { id: session.userId, name: name, accountNumber: accountNumber }
    });
    console.log('ADD_WIRE_RECEPIENT results:', insertWireRecipient.data.createWireRecipient.wireRecipients);
    
    localStorage.setItem("wire_recipients", JSON.stringify(
      insertWireRecipient.data.createWireRecipient.wireRecipients));

    const newRecipient = {
      name: name,
      accountNumber: accountNumber,
      amount: '',
      memo: '',
    };

    setWireRecipients(JSON.parse(localStorage.getItem("wire_recipients") || "[]"));
    setShowAmountMemo([...showAmountMemo, false]);
    setAmount([...amount, '']);
    setMemo([...memo, '']);
    setName('');
    setAccountNumber('');
    setErr('');
  };

  const handleSendMoney = async (index) => {
    const updatedRecipients = wireRecipients.map((recipient, i) => {
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

    let recent = JSON.parse(localStorage.getItem("wire_transaction_history") || "[]");
    recent.push(transaction);
    localStorage.setItem("wire_transaction_history", JSON.stringify(recent));


    const senderAccount = JSON.parse(localStorage.getItem("user_accounts"));
    console.log('inside handleSendMoney function', transaction);
    try{
    const createWireTransaction = await client.mutate({
      mutation: ADD_TRANSACTION,
      variables: {
        userID: session.userId,
        accountID: senderAccount[0]._id,
        description: `Wire transfetr to ${transaction.recipient.name} (${transaction.recipient.memo})`,
        type: "WIRE",
        amount: parseFloat(transaction.recipient.amount || 0)
      }
    });
    console.log('WIRE ADD_TRANSACTION results:', createWireTransaction.data);


    const senderName = localStorage.getItem("user_name");
    console.log('sender name',senderName);
    console.log('inside handleSendMoney function', transaction);
    
    const createWireRTransaction = await client.mutate({
      mutation: ADD_WIRE_R_TRANSACTION,
      variables: {
        accountNumber: transaction.recipient.accountNumber,
        description: `Wire transfetr from ${senderName} (${transaction.recipient.memo})`,
        type: "WIRE",
        amount: parseFloat(transaction.recipient.amount || 0)
      }
    });
    console.log('WIRE R ADD_TRANSACTION results:', createWireRTransaction.data);
    }catch(ee) {
      console.log(ee);
    }

    setWireRecipients(updatedRecipients);
    setTransactions([...transactions, transaction]);
    setShowAmountMemo(showAmountMemo.map((item, i) => (i === index ? false : item)));
  };

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
              <Form.Group controlId="formAccount">
                <Form.Label>Account number</Form.Label>
                <Form.Control
                  type="accountNumber"
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </Form.Group>
              <Button variant="light" type="submit" style={{ backgroundColor: '#01796F', color: 'white' }}>
                Add Recipient
              </Button>
            </Form>
          </div>
          <div className="mt-4">
            <h3>Recipient List</h3>
            {wireRecipients.length === 0 ? (
              <p>No recipients have been added yet</p>
            ) : (
              <ListGroup>
                {wireRecipients.map((recipient, index) => (
                  <ListGroup.Item key={index}>
                    <div>
                      <strong>Name:</strong> {recipient.name}
                    </div>
                    <div>
                      <strong>Account number:</strong> {recipient.accountNumber}
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
                          onClick={() =>  handleSendMoney(index) }
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
                        <strong>Account number:</strong> {transaction.recipient.accountNumber}
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

export default Transfer;

