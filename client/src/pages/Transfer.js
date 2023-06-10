import React from 'react';
import Form from 'react-bootstrap/Form';
import { MDBTable, MDBTableBody } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <div className='transfer'>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <h1>Schedule A Transfer Payment</h1>
      </div>
      <MDBTable style={{display: 'flex', justifyContent: 'center'}}>
        <MDBTableBody>
          <tr>
            <th colSpan={2}>Step 1: Select a From Account</th>
          </tr>
          <tr>
            <td>From:</td>
            <td><Form.Select aria-label="Default select example">
              <option>Select an Account</option>
              <option value="1">Checking Account</option>
              <option value="2">Savings Account</option>
            </Form.Select></td>
          </tr>
          <tr>
            <th colSpan={2}>Step 2: Select a From To Account</th>
          </tr>
          <tr>
            <td>To:</td>
            <td><Form.Select aria-label="Default select example">
              <option>Select an Account</option>
              <option value="1">Checking Account</option>
              <option value="2">Savings Account</option>
            </Form.Select></td>
          </tr>
          <tr>
            <th colSpan={2}>Step 3: Choose Amount and Date</th>
          </tr>
          <tr>
            <td>Amount:</td>
            <td>
            <Form.Control type="text" />
            </td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>
            <Form.Control type="date" />
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}