import React from "react"
import { useHistory } from 'react-router-dom';
import PageTitle from "../PageTitle";
import ProfileLogo from "./ProfileLogo";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import './style.css';

export default function Profile() {
  const history = useHistory();
  const handleClick = () => history.push('/app/editProfile');
  return (
    <div className="container">

      <div className="main-body">
{/*
        <Box
          display="flex"
          flexWrap="nowrap"
          p={1}
          m={1}
          bgcolor="background.paper"

        >
          <Box p={1} bgcolor="grey.150">

            Name : {localStorage.getItem('partyName')}

          </Box>
          <Divider orientation="vertical" flexItem />
          <Box p={1} bgcolor="grey.150">

            Email : {localStorage.getItem('partyEmail')}

          </Box>
          <Divider orientation="vertical" flexItem />
          <Box p={1} bgcolor="grey.150">

            Company Name : {localStorage.getItem('companyName')}

          </Box>
          <Divider orientation="vertical" flexItem />
          <Box p={1} bgcolor="grey.150">

            Contact Number : {localStorage.getItem('contactNumber')}

          </Box>
          <Divider orientation="vertical" flexItem />
          <Box p={1} bgcolor="grey.150">

            <Button variant="outlined" onClick={handleClick}>Edit</Button>

          </Box>
        </Box>
        */}

        
      <ProfileLogo detail={{id:1,name:localStorage.getItem('partyName')}}/>
        
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {localStorage.getItem('partyName')}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {localStorage.getItem('partyEmail')}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Company Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {localStorage.getItem('companyName')}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Contact Number</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                   {localStorage.getItem('contactNumber')}
                    </div>
                  </div>
                 
                  <hr/>
                  <div className="row">
                    <div className="col-sm-12">
                   
                    <a className="btn btn-info" target="__blank" onClick={handleClick}>Edit</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
      </div>

    </div>
  )
}
