import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import { MDBCardHeader } from 'mdb-react-ui-kit';

export default function App() {
  return (
      <MDBRow>
        <MDBCard>
          <MDBCardHeader>Overview | Checking Account</MDBCardHeader>
          <MDBCardBody>
            <MDBCardTitle>Available Balance</MDBCardTitle>
            <MDBCardText>$20000.00</MDBCardText>
            <MDBCardTitle>Current Balance</MDBCardTitle>
            <MDBCardText>$21500.00</MDBCardText>
            <MDBBtn href='./account'>Account Activity</MDBBtn>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardHeader>Overview | Saving Accounts</MDBCardHeader>
          <MDBCardBody>
            <MDBCardTitle>Available Balance</MDBCardTitle>
            <MDBCardText>$20000.00</MDBCardText>
            <MDBCardTitle>Current Balance</MDBCardTitle>
            <MDBCardText>$21500.00</MDBCardText>
            <MDBBtn href='./account'>Account Activity</MDBBtn>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardHeader>Overview | Credit Cards</MDBCardHeader>
          <MDBCardBody>
            <MDBCardTitle>Available Balance</MDBCardTitle>
            <MDBCardText>$20000.00</MDBCardText>
            <MDBCardTitle>Current Balance</MDBCardTitle>
            <MDBCardText>$21500.00</MDBCardText>
            <MDBBtn href='./account'>Go somewhere</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
  );
}