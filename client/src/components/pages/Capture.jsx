import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Container, Row, Col, Button, Card, Form, Alert, Badge } from 'react-bootstrap';
import { Camera, RefreshCw, Save, Sparkles } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Capture = () => {
  const webcamRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const templateName = searchParams.get('templateName') || 'Classic 2x2 Grid';
  const templateId = searchParams.get('templateId') || 1;
  const theme = searchParams.get('theme') || 'lavender';

  const [imgSrc, setImgSrc] = useState(null);
  const [filter, setFilter] = useState('none');
  const [stickers, setStickers] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      setIsCapturing(false);
      setCountdown(null);
    }
  }, [webcamRef]);

  const startCountdown = () => {
    setIsCapturing(true);
    setErrorMsg('');
    let count = 3;
    setCountdown(count);
    
    const timer = setInterval(() => {
      count -= 1;
      if (count === 0) {
        clearInterval(timer);
        capture();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const retake = () => {
    setImgSrc(null);
    setCountdown(null);
    setIsCapturing(false);
    setStickers([]);
  };

  const addSticker = (emoji, name) => {
    const newSticker = {
      id: Date.now(),
      emoji,
      name,
      x: Math.floor(Math.random() * 60) + 20, // percentage
      y: Math.floor(Math.random() * 60) + 20
    };
    setStickers([...stickers, newSticker]);
  };

  const removeSticker = (id) => {
    setStickers(stickers.filter(s => s.id !== id));
  };

  const handleSavePhoto = async () => {
    if (!imgSrc) return;
    setSaving(true);
    setErrorMsg('');

    try {
      await axios.post('http://localhost:3007/api/savedphoto/new', {
        FilePath: imgSrc,
        SavedAt: new Date().toISOString(),
        UserId: 1,
        TemplateId: Number(templateId)
      });
      navigate('/savedphoto');
    } catch (err) {
      console.error('Error saving photo:', err);
      navigate('/savedphoto');
    } finally {
      setSaving(false);
    }
  };

  const getFilterStyle = () => {
    switch (filter) {
      case 'grayscale': return { filter: 'grayscale(100%)' };
      case 'sepia': return { filter: 'sepia(100%)' };
      case 'contrast': return { filter: 'contrast(150%) brightness(110%)' };
      case 'purple': return { filter: 'hue-rotate(240deg) saturate(150%)' };
      default: return {};
    }
  };

  const getThemeBorder = () => {
    switch (theme) {
      case 'blush': return 'p-3 bg-pink-subtle border border-3 rounded-4 shadow-sm';
      case 'midnight': return 'p-3 bg-dark text-white rounded-4 shadow-sm';
      case 'classic': return 'p-3 bg-white border border-2 rounded-2 shadow-sm';
      default: return 'p-3 rounded-4 shadow-sm';
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--primary-lavender)' }}>Live Photo Studio & Decorator</h2>
          <p className="text-muted mb-0">Template: <span className="fw-semibold text-dark">{templateName}</span> | Theme: <span className="text-capitalize">{theme}</span></p>
        </div>
      </div>

      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow-lg overflow-hidden">
            <Card.Body className="p-0 bg-dark position-relative d-flex align-items-center justify-content-center" style={{ minHeight: '480px' }}>
              {!imgSrc ? (
                <>
                  <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', ...getFilterStyle() }}>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{ facingMode: 'user', width: 1280, height: 720 }}
                      style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }}
                    />
                  </div>
                  {countdown && (
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <h1 className="display-1 fw-bold text-white" style={{ fontSize: '7rem', textShadow: '0 0 25px rgba(0,0,0,0.8)' }}>
                        {countdown}
                      </h1>
                    </div>
                  )}
                </>
              ) : (
                <div className={`position-relative w-100 d-flex justify-content-center ${getThemeBorder()}`}>
                  <div style={{ ...getFilterStyle(), display: 'inline-block', position: 'relative' }}>
                    <img src={imgSrc} alt="Captured Session" className="img-fluid rounded" style={{ maxHeight: '460px', objectFit: 'contain' }} />
                    {stickers.map(s => (
                      <div 
                        key={s.id}
                        className="position-absolute cursor-pointer user-select-none"
                        style={{ top: `${s.y}%`, left: `${s.x}%`, fontSize: '2.5rem', cursor: 'pointer', transform: 'translate(-50%, -50%)' }}
                        onClick={() => removeSticker(s.id)}
                        title="Click to remove sticker"
                      >
                        {s.emoji}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card.Body>
            
            {imgSrc && (
              <Card.Header className="bg-light py-2 px-3 border-bottom">
                <div className="d-flex align-items-center gap-2 overflow-auto">
                  <span className="small fw-bold text-muted me-2"><Sparkles size={16} /> Add Stickers:</span>
                  <Button size="sm" variant="outline-primary" onClick={() => addSticker('💖', 'Heart')}>💖 Heart</Button>
                  <Button size="sm" variant="outline-primary" onClick={() => addSticker('🌟', 'Star')}>🌟 Star</Button>
                  <Button size="sm" variant="outline-primary" onClick={() => addSticker('👑', 'Crown')}>👑 Crown</Button>
                  <Button size="sm" variant="outline-primary" onClick={() => addSticker('🎉', 'Party')}>🎉 Party</Button>
                  <Button size="sm" variant="outline-primary" onClick={() => addSticker('🌸', 'Flower')}>🌸 Flower</Button>
                  <Button size="sm" variant="outline-primary" onClick={() => addSticker('😎', 'Cool')}>😎 Cool</Button>
                  {stickers.length > 0 && <Badge bg="secondary" className="ms-auto">{stickers.length} stickers added (click to remove)</Badge>}
                </div>
              </Card.Header>
            )}

            <Card.Footer className="bg-white p-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <Form.Label className="small fw-semibold mb-0 text-muted">Filter Effect:</Form.Label>
                  <Form.Select 
                    size="sm" 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ width: '150px' }}
                  >
                    <option value="none">Normal Studio</option>
                    <option value="grayscale">Vintage B&W</option>
                    <option value="sepia">Warm Sepia</option>
                    <option value="contrast">High Contrast</option>
                    <option value="purple">Lavender Glow</option>
                  </Form.Select>
                </div>

                <div className="d-flex gap-2">
                  {!imgSrc ? (
                    <Button 
                      className="btn-corporate d-flex align-items-center gap-2" 
                      onClick={startCountdown}
                      disabled={isCapturing}
                    >
                      <Camera size={18} />
                      {isCapturing ? 'Capturing...' : 'Take Photo'}
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline-secondary" className="d-flex align-items-center gap-2" onClick={retake} disabled={saving}>
                        <RefreshCw size={18} />
                        Retake
                      </Button>
                      <Button 
                        className="btn-corporate d-flex align-items-center gap-2" 
                        onClick={handleSavePhoto}
                        disabled={saving}
                      >
                        <Save size={18} />
                        {saving ? 'Saving...' : 'Save & Finish'}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        
        <Col lg={4} className="mt-4 mt-lg-0">
          <div className="p-4 card-corporate h-100">
            <h5 className="fw-bold mb-3" style={{ color: 'var(--primary-lavender)' }}>Studio & Decorator Guide</h5>
            <ul className="text-muted small ps-3">
              <li className="mb-2">Choose your preferred filter (including <strong>Lavender Glow</strong>).</li>
              <li className="mb-2">Click <strong>Take Photo</strong> and pose during the 3-second countdown.</li>
              <li className="mb-2">Once captured, click any sticker button above (Hearts, Stars, Crowns) to overlay it onto your photo.</li>
              <li className="mb-2">Click any placed sticker to remove it, then click <strong>Save & Finish</strong>.</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Capture;
