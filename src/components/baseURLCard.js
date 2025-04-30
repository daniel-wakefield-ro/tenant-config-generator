import React from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

const BaseURLCard = ({ 
  url, 
  setUrl, 
  baseURLs, 
  addBaseURL, 
  removeBaseURL 
}) => {
  return (
    <Card className="mt-4 mb-4">
      <Card.Header as="h5">Base URL</Card.Header>
      <Card.Body>
        <Row className="align-items-end mb-3">
          <Col>
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
            />
          </Col>
          <Col xs="auto">
            <Button variant="success" onClick={addBaseURL} className="mb-2">
              Add
            </Button>
          </Col>
        </Row>
        
        {/* Display existing base URLs */}
        {baseURLs.length > 0 && (
          <div className="mt-3">
            <h6>Base URLs:</h6>
            <ul className="list-group">
              {baseURLs.map((baseUrl, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{baseUrl}</span>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => removeBaseURL(index)}
                  >
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

export default BaseURLCard;