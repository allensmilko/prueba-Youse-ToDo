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
                <h1>{name} ({username})</h1>
                <Panel.Body>
                    <p><b><i className="fas fa-envelope-square"></i></b> {email}</p>
                    <a href={website} target="_blank"><b><i className="fas fa-globe"></i></b> {website}</a>
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
