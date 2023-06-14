import React, { useState } from 'react';
import { Form, Button, ListGroup, Row, Col, Card, Alert } from 'react-bootstrap';

function ZellePage() {
  const [recipients, setRecipients] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const handleAddRecipient = (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError('Please enter a name and email.');
      return;
    }

    const newRecipient = {
      name: name,
      email: email,
      amount: '',
      memo: '',
    };
    setRecipients([...recipients, newRecipient]);
    setName('');
    setEmail('');
    setError('');
  };

  const handleAmountChange = (index, value) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index].amount = value;
    setRecipients(updatedRecipients);
  };

  const handleMemoChange = (index, value) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index].memo = value;
    setRecipients(updatedRecipients);
  };

  const handleSendMoney = (index) => {
    const recipient = recipients[index];

    if (!recipient.amount || !recipient.memo) {
      setError('Please enter the amount and memo.');
      return;
    }

    const transaction = {
      recipient: recipient,
      date: new Date().toLocaleString(),
    };
    setTransactions([...transactions, transaction]);
    setError('');
  };

  return (
    <div className="container d-flex-column min-vh-100">
      <h1>Zelle</h1>
      {error && <Alert variant="danger">{error}</Alert>}
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
              <Button variant="primary" type="submit">
                Add Recipient
              </Button>
            </Form>
          </div>
          <div className="mt-4">
            <h3>Recipient List</h3>
            <ListGroup>
              {recipients.map((recipient, index) => (
                <ListGroup.Item key={index}>
                  <div>
                    <strong>Name:</strong> {recipient.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {recipient.email}
                  </div>
                  <Row>
                    <Col>
                      <Form.Group controlId={`formAmount_${index}`}>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter amount"
                          value={recipient.amount}
                          onChange={(e) =>
                            handleAmountChange(index, e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId={`formMemo_${index}`}>
                        <Form.Label>Memo</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter memo"
                          value={recipient.memo}
                          onChange={(e) =>
                            handleMemoChange(index, e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    variant="primary"
                    onClick={() => handleSendMoney(index)}
                  >
                    Send Money
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mt-4">
            <h3>Transaction History</h3>
            <Card>
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
                      <strong>Email:</strong> {transaction.recipient.email}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ZellePage;
