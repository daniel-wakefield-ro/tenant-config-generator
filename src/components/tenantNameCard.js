import React from 'react';
import { Form } from 'react-bootstrap';

const TenantNameCard = ({ tenantName, handleChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Tenant Name</Form.Label>
      <Form.Control
        type="text"
        name="tenantName"
        value={tenantName}
        onChange={handleChange}
        placeholder="Enter tenant name"
      />
    </Form.Group>
  );
};

export default TenantNameCard;