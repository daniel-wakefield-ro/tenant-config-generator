import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ResultCard = ({ generatedConfig, downloadConfig }) => {
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Generated Configuration</h5>
        <Button variant="success" onClick={downloadConfig}>
          Download JSON
        </Button>
      </Card.Header>
      <Card.Body>
        <pre className="bg-light p-3 border rounded">
          {JSON.stringify(generatedConfig, null, 2)}
        </pre>
      </Card.Body>
    </Card>
  );
};

export default ResultCard;