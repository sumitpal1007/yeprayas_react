import React, { useState } from "react"
import { useHistory } from 'react-router-dom';
import PageTitle from "../PageTitle";
import ProfileLogo from "./ProfileLogo";

import './style.css';

export default function EditProfile(){
    const [name, setName] = useState(localStorage.getItem('partyName'))
    const [email, setEmail] = useState(localStorage.getItem('partyEmail'))
    const [contactNumber, setContactNumber] = useState(localStorage.getItem('contactNumber'))
    const [companyName, setCompanyName] = useState(localStorage.getItem('companyName'))

    const history = useHistory();
    const handleClick = () => {
       
        const request = {
            name : name,
            contact_number : contactNumber,
            email : email,
            company_name : companyName
        }

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }

        fetch("http://65.0.124.110:8000/yprs/party/?party_id="+localStorage.getItem('party_id'), requestOptions)
        .then(response => response.json())
        .then(response => {
            if(response.data && response.data.party_id){

            localStorage.setItem('party_id',  response.data.party_id);
            localStorage.setItem('partyName',  response.data.name);
            setName(response.data.name)
            localStorage.setItem('companyName',  response.data.company_name);
            setCompanyName(response.data.company_name)
            localStorage.setItem('contactNumber',  response.data.contact_number);
            setContactNumber(response.data.contact_number)
            localStorage.setItem('partyEmail',  response.data.email);
            setEmail(response.data.email)
            history.push('/app/profile')
            }
        });
    } 

       
    return (
<div className="container">
    <div  className="main-body">
    <ProfileLogo detail={{id:1,name:localStorage.getItem('partyName')}}/>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                   
                      <input className="col-sm-9 text-secondary" type='text' onChange={(e) => setName(e.target.value)} value={name}/>
                  
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                   
                    <input className="col-sm-9 text-secondary" type='text' onChange={(e) => setEmail(e.target.value)} value={email}/>
                  
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Company Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                   
                    <input className="col-sm-9 text-secondary" type='text' onChange={(e) => setCompanyName(e.target.value)} value={companyName}/>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Contact Number</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    <input className="col-sm-9 text-secondary" type='text' onChange={(e) => setContactNumber(e.target.value)} value={contactNumber}/>
                    </div>
                  </div>
                 
                  <hr/>
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info" target="__blank" onClick={handleClick}>Save</a>
                    </div>
                  </div>
                </div>
              </div>

           



            </div>
          </div>

        </div>
    )
}
