import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn
} from 'mdb-react-ui-kit';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <MDBRow>
        <MDBCol sm='8'>
          <MDBCard border='primary' background='white' shadow='9'>
            <MDBCardBody>
              <MDBCardTitle>Showing</MDBCardTitle>
              <MDBCardText>
                Checking Account
              </MDBCardText>
              <MDBBtn href='./home'>Overview</MDBBtn>
            </MDBCardBody>
          </MDBCard>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope='col'>Date</th>
                <th scope='col'>Description</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Balance</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <th scope='row'>6/7/2023</th>
                <td>Zelle Payments</td>
                <td>$300.00</td>
                <td>$15000.00</td>
              </tr>
              <tr>
                <th scope='row'>6/1/2023</th>
                <td>ShopRite</td>
                <td>$256.00</td>
                <td>$14844.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
            </MDBTableBody>
          </MDBTable>

          <MDBCard border='primary' background='white' shadow='9'>
            <MDBCardBody>
              <MDBCardTitle>Showing</MDBCardTitle>
              <MDBCardText>
                Savings Account
              </MDBCardText>
              <MDBBtn href='./home'>Overview</MDBBtn>
            </MDBCardBody>
          </MDBCard>

          <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope='col'>Date</th>
                <th scope='col'>Description</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Balance</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <th scope='row'>6/7/2023</th>
                <td>Zelle Payments</td>
                <td>$300.00</td>
                <td>$15000.00</td>
              </tr>
              <tr>
                <th scope='row'>6/1/2023</th>
                <td>ShopRite</td>
                <td>$256.00</td>
                <td>$14844.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
              <tr>
                <th scope='row'>12/7/2020</th>
                <td>LA Fitness</td>
                <td>$35.00</td>
                <td>$14800.00</td>
              </tr>
            </MDBTableBody>
          </MDBTable>

        </MDBCol>
        <MDBCol sm='4'>
          <MDBCard border='primary' background='white' shadow='9'>
            <MDBCardBody>
              <MDBCardTitle>Customer Insights</MDBCardTitle>
              <MDBCardText>
                Strategic, interactive customer insights that can help Cash Me Outside Merchants grow their business
              </MDBCardText>
              <MDBBtn href='#'>More Detail</MDBBtn>
            </MDBCardBody>
          </MDBCard>
          <MDBCard border='primary' background='white' shadow='9'>
            <MDBCardBody>
              <MDBCardTitle>Customer Insights</MDBCardTitle>
              <MDBCardText>
                Strategic, interactive customer insights that can help Cash Me Outside Merchants grow their business
              </MDBCardText>
              <MDBBtn href='#'>More Detail</MDBBtn>
            </MDBCardBody>
          </MDBCard>
          <MDBCard border='primary' background='white' shadow='9'>
            <MDBCardBody>
              <MDBCardTitle>Customer Insights</MDBCardTitle>
              <MDBCardText>
                Strategic, interactive customer insights that can help Cash Me Outside Merchants grow their business
              </MDBCardText>
              <MDBBtn href='#'>More Detail</MDBBtn>
            </MDBCardBody>
          </MDBCard>
          <MDBCard border='primary' background='white' shadow='9'>
            <MDBCardBody>
              <MDBCardTitle>Customer Insights</MDBCardTitle>
              <MDBCardText>
                Strategic, interactive customer insights that can help Cash Me Outside Merchants grow their business
              </MDBCardText>
              <MDBBtn href='#'>More Detail</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
}