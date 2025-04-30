import React from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

const ConfigCard = ({ 
  title, 
  fieldKey, 
  fieldValue, 
  setFieldKey, 
  setFieldValue, 
  configData, 
  addConfig, 
  removeConfig 
}) => {
  return (
    <Card className="mt-4 mb-4">
      <Card.Header as="h5">{title} Configuration</Card.Header>
      <Card.Body>
        <Row className="align-items-end mb-3">
          <Col>
            <Form.Label>Key</Form.Label>
            <Form.Control
              type="text"
              value={fieldKey}
              onChange={(e) => setFieldKey(e.target.value)}
              placeholder="Enter key"
            />
          </Col>
          <Col>
            <Form.Label>Value</Form.Label>
            <Form.Control
              type="text"
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
              placeholder="Enter value"
            />
          </Col>
          <Col xs="auto">
            <Button variant="success" onClick={addConfig} className="mb-2">
              Add
            </Button>
          </Col>
        </Row>
        
        {/* Display existing configs */}
        {Object.keys(configData).length > 0 && (
          <div className="mt-3">
            <h6>{title} Configuration Items:</h6>
            <ul className="list-group">
              {Object.entries(configData).map(([key, value]) => (
                <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <strong>{key}:</strong> {value}
                  </span>
                  <Button variant="outline-danger" size="sm" onClick={() => removeConfig(key)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ConfigCard;