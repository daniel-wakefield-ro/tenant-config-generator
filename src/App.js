import './App.css';
import { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import BaseURLCard from './components/baseURLCard';
import ConfigCard from './components/configCardSection';
import TenantNameCard from './components/tenantNameCard';
import ResultCard from './components/resultCard';

function App() {
  // State to hold form data
  const [formData, setFormData] = useState({
    tenantName: '',
    baseURL: [],
    private: {},
    public: {}
  });

  // For the Generated Config
  const [generatedConfig, setGeneratedConfig] = useState(null);
  const [showConfig, setShowConfig] = useState(false);

  // For Base URL
  const [url, setUrl] = useState('');
  const addBaseURL = () => {
    if (url.trim() === '') return;
    
    setFormData({
      ...formData,
      baseURL: [...formData.baseURL, url]
    });
    setUrl('');
  }

  // Remove Base URL
  const removeBaseURL = (index) => {
    const updatedBaseURLs = [...formData.baseURL];
    updatedBaseURLs.splice(index, 1);
    setFormData({
      ...formData,
      baseURL: updatedBaseURLs
    });
  };

  // For Private Config
  const [newPrivateField, setNewPrivateField] = useState('');
  const [newPrivateValue, setNewPrivateValue] = useState('');
  const addPrivateConfig = () => {
    if (newPrivateField.trim() === '') return;
    
    setFormData({
      ...formData,
      private: {
        ...formData.private,
        [newPrivateField]: newPrivateValue
      }
    });
    
    // Reset input fields
    setNewPrivateField('');
    setNewPrivateValue('');
  };

  // For Public Config
  const [newPublicField, setNewPublicField] = useState('');
  const [newPublicValue, setNewPublicValue] = useState('');
  const addPublicConfig = () => {
    if (newPublicField.trim() === '') return;
    
    setFormData({
      ...formData,
      public: {
        ...formData.public,
        [newPublicField]: newPublicValue
      }
    });
    
    // Reset input fields
    setNewPublicField('');
    setNewPublicValue('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties (e.g. features.authentication)
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  // Remove a key-value pair from private config
  const removePrivateConfig = (keyToRemove) => {
    const updatedConfig = { ...formData.private };
    delete updatedConfig[keyToRemove];
    
    setFormData({
      ...formData,
      private: updatedConfig
    });
  };

  // Remove a key-value pair from public config
  const removePublicConfig = (keyToRemove) => {
    const updatedConfig = { ...formData.public };
    delete updatedConfig[keyToRemove];
    
    setFormData({
      ...formData,
      public: updatedConfig
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { tenantName, ...configData } = formData;

    if (!tenantName.trim()) {
      alert('Please enter a tenant name');
      return;
    }

    const processedConfig = {
      [tenantName]: {
        ...configData,
      }
    };
    
    setGeneratedConfig(processedConfig);
    setShowConfig(true);
    console.log('Generated tenant configuration:', processedConfig);
  };

  const downloadConfig = () => {
    if (!generatedConfig) return;
    
    const dataStr = JSON.stringify(generatedConfig, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const tenantName = Object.keys(generatedConfig)[0];

    const a = document.createElement('a');
    a.href = url;
    a.download = `${tenantName || 'tenant'}-config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Tenant Configuration Generator</h1>
      
      <Card className="mb-4">
        <Card.Header as="h5">Tenant Config Details</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Tenant Name Component */}
            <TenantNameCard 
              tenantName={formData.tenantName} 
              handleChange={handleChange} 
            />
            
            {/* Base URL Component */}
            <BaseURLCard
              url={url}
              setUrl={setUrl}
              baseURLs={formData.baseURL}
              addBaseURL={addBaseURL}
              removeBaseURL={removeBaseURL}
            />

            {/* Private Config Component */}
            <ConfigCard
              title="Private"
              fieldKey={newPrivateField}
              fieldValue={newPrivateValue}
              setFieldKey={setNewPrivateField}
              setFieldValue={setNewPrivateValue}
              configData={formData.private}
              addConfig={addPrivateConfig}
              removeConfig={removePrivateConfig}
            />
            
            {/* Public Config Component */}
            <ConfigCard
              title="Public"
              fieldKey={newPublicField}
              fieldValue={newPublicValue}
              setFieldKey={setNewPublicField}
              setFieldValue={setNewPublicValue}
              configData={formData.public}
              addConfig={addPublicConfig}
              removeConfig={removePublicConfig}
            />

            <div className="d-grid gap-2 mt-4">
              <Button variant="primary" type="submit" size="lg">
                Generate Configuration
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {showConfig && generatedConfig && (
        <ResultCard 
          generatedConfig={generatedConfig}
          downloadConfig={downloadConfig}
        />
      )}
    </Container>
  );
}

export default App;
