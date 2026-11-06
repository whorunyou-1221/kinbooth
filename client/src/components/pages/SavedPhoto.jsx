import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import { FaDownload, FaShareAlt } from 'react-icons/fa';

const SavedPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3007/api/savedphoto')
      .then(res => {
        setPhotos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching saved photos:', err);
        // Fallback mock saved photos
        setPhotos([
          { id: 1, SavedAt: '2026-11-06T12:00:00.000Z', FilePath: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=500&q=80' },
          { id: 2, SavedAt: '2026-11-06T12:00:00.000Z', FilePath: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80' },
          { id: 3, SavedAt: '2026-11-06T12:00:00.000Z', FilePath: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=80' }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--primary-navy)' }}>Enterprise Gallery</h2>
          <p className="text-muted mb-0">View and archive your saved photo sessions.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-5 card-corporate p-5">
          <p className="text-muted fs-5">No saved photos found in this session repository.</p>
        </div>
      ) : (
        <Row className="g-4">
          {photos.map(photo => {
            const displayDate = new Date(photo.SavedAt || '2026-11-06T12:00:00.000Z').toLocaleDateString();
            return (
              <Col md={4} key={photo.id}>
                <Card className="h-100 card-corporate overflow-hidden">
                  <Card.Img 
                    variant="top" 
                    src={photo.FilePath || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=500&q=80'} 
                    style={{ height: '280px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=500&q=80';
                    }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="fw-bold fs-6 mb-1">Session #{photo.id}</Card.Title>
                      <Card.Text className="text-muted small">
                        Saved: {displayDate}
                      </Card.Text>
                    </div>
                    <div className="d-flex gap-2 mt-3">
                      <Button variant="outline-primary" size="sm" className="w-100 d-flex align-items-center justify-content-center gap-1">
                        <FaDownload /> Download
                      </Button>
                      <Button variant="outline-secondary" size="sm" className="w-100 d-flex align-items-center justify-content-center gap-1">
                        <FaShareAlt /> Share
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default SavedPhoto;
