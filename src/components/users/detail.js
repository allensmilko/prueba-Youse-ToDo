// CORE COMPONENTS
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// DOM COMPONENTS
import { Panel } from 'react-bootstrap';


const UserData = ({name,username,email,website}) => {
    return (
      <div className="UsersList container">
        <div className="row">
            <div className="col-12">
            <Panel>
                <Panel.Heading>{name} ({username})</Panel.Heading>
                <Panel.Body>
                    <p><b>Email:</b> {email}</p>
                    <p><b>Web site:</b> {website}</p>
                </Panel.Body>
            </Panel>
            </div>
        </div>       
      </div>
    );
};
UserData.propTypes = {
    name: PropTypes.string,
    username:PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string
}

export default UserData;
