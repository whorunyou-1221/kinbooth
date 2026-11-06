import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaThLarge, FaColumns, FaSquare, FaHeart, FaPalette } from 'react-icons/fa';

const Collage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [photoCount, setPhotoCount] = useState(4);
  const [collageTheme, setCollageTheme] = useState('lavender');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3007/api/template')
      .then(res => {
        setTemplates(res.data);
        if (res.data.length > 0) setSelectedTemplate(res.data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching templates:', err);
        const mockTemplates = [
          { id: 1, TemplateName: 'Classic 2x2 Grid', Description: 'Standard 4-photo balanced grid layout.', TemplatePath: 'grid-4', icon: <FaThLarge size={28} /> },
          { id: 2, TemplateName: 'Vertical Photo Strip', Description: 'Traditional 3-photo photo booth strip.', TemplatePath: 'strip-3', icon: <FaColumns size={28} /> },
          { id: 3, TemplateName: 'Polaroid Style', Description: 'Single framed portrait with bottom caption space.', TemplatePath: 'polaroid-1', icon: <FaSquare size={28} /> },
          { id: 4, TemplateName: 'Duo Romance', Description: 'Elegant 2-photo side-by-side arrangement.', TemplatePath: 'duo-2', icon: <FaHeart size={28} /> }
        ];
        setTemplates(mockTemplates);
        setSelectedTemplate(mockTemplates[0]);
        setLoading(false);
      });
  }, []);

  const handleStartCapture = () => {
    if (!selectedTemplate) return;
    const queryParams = new URLSearchParams({
      templateId: selectedTemplate.id,
      templateName: selectedTemplate.TemplateName,
      photoCount: photoCount,
      theme: collageTheme
    });
    navigate(`/capture?${queryParams.toString()}`);
  };

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-2" style={{ color: 'var(--primary-lavender)' }}>Collage Studio & Layouts</h2>
      <p className="text-muted mb-4">Design your photo session by choosing a layout style, photo count, and theme.</p>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <h5 className="fw-bold mb-3 text-secondary">1. Choose Layout Template</h5>
          <Row className="g-4 mb-4">
            {templates.map((tmpl, idx) => {
              const isSelected = selectedTemplate?.id === tmpl.id;
              const icons = [<FaThLarge size={28} />, <FaColumns size={28} />, <FaSquare size={28} />, <FaHeart size={28} />];
              return (
                <Col md={3} key={tmpl.id}>
                  <Card 
                    className={`h-100 card-corporate p-3 text-center ${isSelected ? 'border-primary border-2 shadow' : ''}`}
                    onClick={() => setSelectedTemplate(tmpl)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                      <div className="mb-3 text-purple" style={{ color: 'var(--primary-lavender)' }}>
                        {tmpl.icon || icons[idx % icons.length]}
                      </div>
                      <Card.Title className="fw-bold fs-6">{tmpl.TemplateName}</Card.Title>
                      <Card.Text className="text-muted small mb-3">{tmpl.Description || 'Professional layout option.'}</Card.Text>
                      <span className={`badge ${isSelected ? 'bg-primary' : 'bg-light text-dark border'}`}>
                        {isSelected ? 'Selected' : 'Select'}
                      </span>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>

          <Row className="g-4 mb-4">
            <Col md={6}>
              <Card className="card-corporate p-4 h-100">
                <h5 className="fw-bold mb-3 text-secondary">2. Number of Photos</h5>
                <div className="d-flex gap-3">
                  {[1, 2, 3, 4].map(num => (
                    <Button 
                      key={num}
                      variant={photoCount === num ? 'primary' : 'outline-secondary'}
                      className={`flex-grow-1 py-2 fw-bold ${photoCount === num ? 'btn-corporate' : ''}`}
                      onClick={() => setPhotoCount(num)}
                    >
                      {num} {num === 1 ? 'Shot' : 'Shots'}
                    </Button>
                  ))}
                </div>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="card-corporate p-4 h-100">
                <h5 className="fw-bold mb-3 text-secondary d-flex align-items-center gap-2">
                  <FaPalette size={18} /> Collage Theme / Border
                </h5>
                <Form.Select 
                  value={collageTheme} 
                  onChange={(e) => setCollageTheme(e.target.value)}
                  className="py-2"
                >
                  <option value="lavender">Soft Lavender Dream</option>
                  <option value="blush">Blush Pink Rose</option>
                  <option value="midnight">Midnight Purple</option>
                  <option value="classic">Classic White & Clean</option>
                </Form.Select>
              </Card>
            </Col>
          </Row>

          <div className="d-flex justify-content-between align-items-center card-corporate p-4 bg-white">
            <div>
              <span className="text-muted">Active Setup: </span>
              <strong className="text-dark">{selectedTemplate?.TemplateName}</strong> ({photoCount} shots, {collageTheme} theme)
            </div>
            <Button 
              className="btn-corporate btn-lg px-5"
              disabled={!selectedTemplate}
              onClick={handleStartCapture}
            >
              Start Camera Studio
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Collage;
