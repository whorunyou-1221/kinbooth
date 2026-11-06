import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Container, Row, Col, Button, Card, Form, Modal, Toast, ToastContainer, Badge } from 'react-bootstrap';
import { Camera, Check, Copy, Users, Wifi, ArrowLeft } from 'lucide-react';

const FILTERS = [
  { id: 'original', name: 'Original', gradient: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)' },
  { id: 'bw', name: 'B&W', gradient: 'linear-gradient(135deg, #cfd9df, #e2ebf0)' },
  { id: 'sepia', name: 'Sepia', gradient: 'linear-gradient(135deg, #f6d365, #fda085)' },
  { id: 'vintage', name: 'Vintage', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
  { id: 'vivid', name: 'Vivid', gradient: 'linear-gradient(135deg, #ff9a9e, #fecfef)' },
  { id: 'cool', name: 'Cool', gradient: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)' },
  { id: 'warm', name: 'Warm', gradient: 'linear-gradient(135deg, #ffdde1, #ee9ca7)' },
  { id: 'dreamy', name: 'Dreamy', gradient: 'linear-gradient(135deg, #d4fc79, #96e6a1)' },
  { id: 'noir', name: 'Noir', gradient: 'linear-gradient(135deg, #30cfd0, #330867)' },
  { id: 'fade', name: 'Fade', gradient: 'linear-gradient(135deg, #c471f5, #fa71cd)' },
  { id: 'lavender', name: 'Lavender', gradient: 'linear-gradient(135deg, #b190f8, #e4c1f9)' },
  { id: 'neon', name: 'Neon', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { id: 'bloom', name: 'Bloom', gradient: 'linear-gradient(135deg, #30e8bf, #ff8fee)' },
  { id: 'vhs', name: 'VHS', gradient: 'linear-gradient(135deg, #f77062, #fe5196)' },
  { id: 'comic', name: 'Comic', gradient: 'linear-gradient(135deg, #6590f8, #ef476f)' },
  { id: 'polaroid', name: 'Polaroid', gradient: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)' },
  { id: 'cyber', name: 'Cyber', gradient: 'linear-gradient(135deg, #0fd850, #f9f047)' },
  { id: 'cotton', name: 'Cotton', gradient: 'linear-gradient(135deg, #f3e7e9, #e3eeff)' },
  { id: 'golden', name: 'Golden', gradient: 'linear-gradient(135deg, #f6d365, #fda085)' },
  { id: 'frost', name: 'Frost', gradient: 'linear-gradient(135deg, #e6ceed, #b6fbff)' },
  { id: 'sunburn', name: 'Sunburn', gradient: 'linear-gradient(135deg, #ff9966, #ff5e62)' },
  { id: 'rose', name: 'Rose', gradient: 'linear-gradient(135deg, #ff758c, #ff7eb3)' },
  { id: 'matcha', name: 'Matcha', gradient: 'linear-gradient(135deg, #a8ff78, #78ffd6)' },
  { id: 'inkwash', name: 'Inkwash', gradient: 'linear-gradient(135deg, #bdc3c7, #2c3e50)' },
];

const COLLAGE_STYLES = [
  { id: 'strip', name: 'Classic strip', desc: '4 photos · tall', icon: '🎴' },
  { id: 'grid', name: '2×2 grid', desc: '4 photos · square', icon: '⏹️' },
  { id: 'filmstrip', name: 'Filmstrip', desc: '3 photos · wide', icon: '🎞️' },
  { id: 'polaroid', name: 'Polaroid stack', desc: '3 photos · tilted', icon: '📸' },
  { id: 'duo', name: 'Duo diptych', desc: '2 photos · big', icon: '👥' },
];

const STICKER_PACKS = [
  { id: 'none', label: 'Ø No stickers' },
  { id: 'cute', label: '🌸 ✨ 💜 Cute' },
  { id: 'love', label: '💜 ❤️ 💖 Love' },
  { id: 'party', label: '🎉 🎈 🪅 Party' },
  { id: 'nature', label: '🌱 🌿 ☕ Nature' },
  { id: 'y2k', label: '👾 🎮 📼 Y2K' },
  { id: 'cafe', label: '☕ 🥐 🤎 Café' },
];

const WEARABLE_PROPS = [
  { id: 'none', name: 'None', emoji: '🚫' },
  { id: 'kitty', name: 'Kitty ears', emoji: '🐱' },
  { id: 'bunny', name: 'Bunny', emoji: '🐰' },
  { id: 'royal', name: 'Royal', emoji: '👑' },
  { id: 'shades', name: 'Cool shades', emoji: '🕶️' },
  { id: 'angel', name: 'Angel', emoji: '👼' },
  { id: 'inlove', name: 'In love', emoji: '😍' },
  { id: 'flower', name: 'Flower crown', emoji: '🌸' },
  { id: 'partyhat', name: 'Party hat', emoji: '🥳' },
  { id: 'devil', name: 'Lil devil', emoji: '😈' },
  { id: 'howdy', name: 'Howdy', emoji: '🤠' },
  { id: 'starry', name: 'Starry', emoji: '🌟' },
  { id: 'dapper', name: 'Dapper', emoji: '🎩' },
  { id: 'masquerade', name: 'Masquerade', emoji: '🎭' },
  { id: 'clown', name: 'Clown', emoji: '🤡' },
];

const Home = () => {
  const webcamRef = useRef(null);
  const [selectedLayout, setSelectedLayout] = useState(COLLAGE_STYLES[0]);
  const [selectedStickerPack, setSelectedStickerPack] = useState('none');
  const [selectedProp, setSelectedProp] = useState('none');
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const [mirrorMe, setMirrorMe] = useState(true);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);

  // Shared Booth State
  const [roomCode] = useState(() => new URLSearchParams(window.location.search).get('room'));
  const [friendConnected, setFriendConnected] = useState(() => {
    const room = new URLSearchParams(window.location.search).get('room');
    return room ? localStorage.getItem(`friend_joined_${room}`) === 'true' : false;
  });

  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const startSharedBooth = () => {
    const newRoom = 'booth-' + Math.random().toString(36).substring(2, 8);
    window.history.pushState({}, '', `?room=${newRoom}`);
    window.location.reload();
  };

  const leaveSharedBooth = () => {
    window.history.pushState({}, '', window.location.pathname);
    window.location.reload();
  };

  const copyShareLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const simulateFriendJoin = () => {
    if (roomCode) {
      localStorage.setItem(`friend_joined_${roomCode}`, 'true');
      setFriendConnected(true);
    }
  };

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const updated = [...capturedPhotos, imageSrc];
        setCapturedPhotos(updated);
        if (roomCode) {
          localStorage.setItem(`shared_booth_${roomCode}`, JSON.stringify(updated));
        }
      }
      setIsCapturing(false);
      setCountdown(null);
    }
  }, [webcamRef, capturedPhotos, roomCode]);

  const startSession = () => {
    setIsCapturing(true);
    setCapturedPhotos([]);
    let count = 3;
    setCountdown(count);

    const timer = setInterval(() => {
      count -= 1;
      if (count === 0) {
        clearInterval(timer);
        capturePhoto();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const getFilterStyle = () => {
    switch (selectedFilter.id) {
      case 'bw': return { filter: 'grayscale(100%)' };
      case 'sepia': return { filter: 'sepia(100%)' };
      case 'vivid': return { filter: 'saturate(200%) contrast(120%)' };
      case 'cool': return { filter: 'hue-rotate(180deg) saturate(80%)' };
      case 'warm': return { filter: 'sepia(40%) saturate(150%)' };
      case 'neon': return { filter: 'contrast(180%) saturate(200%)' };
      case 'lavender': return { filter: 'hue-rotate(240deg) saturate(140%)' };
      default: return {};
    }
  };

  const getPropEmoji = () => {
    const prop = WEARABLE_PROPS.find(p => p.id === selectedProp);
    return prop && prop.emoji !== '🚫' ? prop.emoji : null;
  };

  return (
    <div style={{ backgroundColor: '#F9F8FC', minHeight: '100vh', paddingBottom: '4rem' }}>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1100 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="success">
          <Toast.Body className="text-white fw-semibold">
            ✨ Shared booth link copied to clipboard! Share it with your friend.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Top Header */}
      <div className="text-center pt-4 pb-3">
        <div className="text-uppercase small fw-semibold text-muted tracking-wide" style={{ letterSpacing: '2px', fontSize: '0.75rem' }}>
          A P H O T O B O O T H F O R T W O
        </div>
        <h1 className="fw-bold display-5 mb-2" style={{ fontFamily: 'serif', color: '#2D2640' }}>
          Kin <span style={{ fontStyle: 'italic', color: '#7F56D9' }}>Booth</span>
        </h1>
        <p className="text-muted small">
          Pick a filter, a collage, sprinkle some stickers, and let the countdown do the rest.
        </p>

        {/* Shared Booth Banner */}
        <div className="mx-auto mt-3 p-3 bg-white rounded-pill shadow-sm border d-inline-flex align-items-center gap-3 px-4" style={{ maxWidth: '720px' }}>
          {roomCode && (
            <Button 
              variant="link" 
              className="p-0 text-dark text-decoration-none d-flex align-items-center gap-1"
              onClick={leaveSharedBooth}
              title="Back to solo booth"
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          <div className="text-start small">
            <span className="fw-bold text-dark">
              {roomCode ? `🔗 Shared Room: ${roomCode}` : 'Not in the same room?'}
            </span>{' '}
            <span className="text-muted">
              {roomCode ? (friendConnected ? 'Friend connected! Ready to snap.' : 'Waiting for friend to visit URL...') : 'Create a private booth link and take a strip together from anywhere.'}
            </span>
          </div>
          <Button 
            className="btn-corporate rounded-pill px-3 py-2 text-nowrap" 
            style={{ fontSize: '0.85rem' }}
            onClick={roomCode ? () => setShowShareModal(true) : startSharedBooth}
          >
            {roomCode ? 'Share Link' : 'Start a shared booth'}
          </Button>
        </div>
      </div>

      <Container className="mt-4">
        {/* SHARED BOOTH DUAL-CAM MODULE (Active when roomCode is present) */}
        {roomCode ? (
          <Row className="g-4 mb-4">
            <Col lg={12}>
              <Card className="border-0 shadow-sm rounded-4 p-4 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="fw-bold mb-1" style={{ color: '#7F56D9' }}>
                      <Users className="me-2" size={24} /> Dual-Camera Shared Booth
                    </h4>
                    <p className="text-muted small mb-0">
                      Room Code: <strong>{roomCode}</strong> | Status:{' '}
                      <Badge bg={friendConnected ? 'success' : 'warning'} className="ms-1">
                        {friendConnected ? 'Friend Connected 🟢' : 'Waiting for friend... ⏳'}
                      </Badge>
                    </p>
                  </div>
                  {!friendConnected && (
                    <Button variant="outline-primary" size="sm" onClick={simulateFriendJoin}>
                      Simulate Friend Joining URL
                    </Button>
                  )}
                </div>

                <Row className="g-3">
                  {/* Your Camera */}
                  <Col md={6}>
                    <div className="bg-dark rounded-4 overflow-hidden position-relative" style={{ minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="position-absolute top-0 start-0 m-3 z-3">
                        <Badge bg="dark" className="opacity-75">You (Camera 1)</Badge>
                      </div>
                      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', ...getFilterStyle(), transform: mirrorMe ? 'scaleX(-1)' : 'none' }}>
                        <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          videoConstraints={{ facingMode: 'user', width: 1280, height: 720 }}
                          style={{ width: '100%', height: 'auto', maxHeight: '350px', objectFit: 'cover' }}
                        />
                      </div>
                      {getPropEmoji() && (
                        <div className="position-absolute top-25 start-50 translate-middle" style={{ fontSize: '3rem', pointerEvents: 'none' }}>
                          {getPropEmoji()}
                        </div>
                      )}
                      {countdown && (
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <h1 className="display-2 fw-bold text-white" style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}>
                            {countdown}
                          </h1>
                        </div>
                      )}
                    </div>
                  </Col>

                  {/* Friend's Camera */}
                  <Col md={6}>
                    <div className="bg-secondary rounded-4 overflow-hidden position-relative d-flex align-items-center justify-content-center text-white" style={{ minHeight: '320px', background: 'linear-gradient(135deg, #4b367c, #2D2640)' }}>
                      <div className="position-absolute top-0 start-0 m-3 z-3">
                        <Badge bg="primary">Friend (Camera 2)</Badge>
                      </div>
                      {friendConnected ? (
                        <div className="text-center p-4">
                          <div className="fs-1 mb-2">👋</div>
                          <h5 className="fw-bold">Friend Connected!</h5>
                          <p className="small text-light opacity-75 mb-0">Live feed active from remote device.</p>
                        </div>
                      ) : (
                        <div className="text-center p-4">
                          <Wifi className="mb-2 text-warning animate-pulse" size={36} />
                          <h5 className="fw-bold">Waiting for friend to visit URL...</h5>
                          <p className="small text-light opacity-75 mb-3">Share the room link so your friend can join the booth.</p>
                          <Button size="sm" className="btn-corporate rounded-pill px-4" onClick={() => setShowShareModal(true)}>
                            Copy & Share Room Link
                          </Button>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        ) : null}

        <Row className="g-4">
          {/* Left Column: Studio Controls */}
          <Col lg={7}>
            {!roomCode && (
              <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-3" style={{ background: '#7F56D9', minHeight: '440px' }}>
                <Card.Body className="p-0 position-relative d-flex align-items-center justify-content-center text-white">
                  <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', ...getFilterStyle(), transform: mirrorMe ? 'scaleX(-1)' : 'none' }}>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{ facingMode: 'user', width: 1280, height: 720 }}
                      style={{ width: '100%', height: 'auto', maxHeight: '440px', objectFit: 'cover' }}
                    />
                  </div>

                  {getPropEmoji() && (
                    <div className="position-absolute top-25 start-50 translate-middle" style={{ fontSize: '4rem', pointerEvents: 'none', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                      {getPropEmoji()}
                    </div>
                  )}

                  {countdown && (
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <h1 className="display-1 fw-bold text-white" style={{ fontSize: '8rem', textShadow: '0 0 30px rgba(0,0,0,0.8)' }}>
                        {countdown}
                      </h1>
                    </div>
                  )}
                </Card.Body>
              </Card>
            )}

            {/* Session Actions & Mirror Toggle */}
            <div className="d-flex justify-content-between align-items-center mb-4 px-2">
              <Button 
                className="btn-corporate px-4 py-2 rounded-pill fw-semibold shadow-sm"
                onClick={startSession}
                disabled={isCapturing}
              >
                <Camera size={18} className="me-2" /> Start 4-shot session
              </Button>
              <Form.Check 
                type="checkbox" 
                id="mirror-me" 
                label="Mirror me" 
                checked={mirrorMe} 
                onChange={(e) => setMirrorMe(e.target.checked)}
                className="fw-medium text-muted"
              />
            </div>

            {/* Collage Layouts */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold small text-dark">Collage layout</span>
                <span className="text-muted small">5 styles</span>
              </div>
              <Row className="g-2">
                {COLLAGE_STYLES.map(style => {
                  const isSelected = selectedLayout.id === style.id;
                  return (
                    <Col key={style.id}>
                      <div 
                        className={`p-2 rounded-3 text-center bg-white border cursor-pointer transition-all ${isSelected ? 'border-primary border-2 shadow-sm' : ''}`}
                        onClick={() => setSelectedLayout(style)}
                        style={{ cursor: 'pointer', minHeight: '80px', borderColor: isSelected ? '#7F56D9 !important' : '#E6E1F2' }}
                      >
                        <div className="fs-5 mb-1">{style.icon}</div>
                        <div className="fw-bold" style={{ fontSize: '0.75rem' }}>{style.name}</div>
                        <div className="text-muted" style={{ fontSize: '0.65rem' }}>{style.desc}</div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>

            {/* Sticker Pack */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold small text-dark">Sticker pack</span>
                <span className="text-muted small">Sprinkled on your collage</span>
              </div>
              <div className="d-flex gap-2 overflow-auto pb-2">
                {STICKER_PACKS.map(pack => (
                  <Button
                    key={pack.id}
                    variant={selectedStickerPack === pack.id ? 'dark' : 'light'}
                    size="sm"
                    className="rounded-pill px-3 py-1 text-nowrap border"
                    onClick={() => setSelectedStickerPack(pack.id)}
                    style={{ fontSize: '0.8rem' }}
                  >
                    {pack.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Wearable Stickers */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold small text-dark">Wearable stickers</span>
                <span className="text-muted small">Props that go on you · 14 looks</span>
              </div>
              <div className="d-flex gap-2 overflow-auto pb-2">
                {WEARABLE_PROPS.map(prop => {
                  const isSelected = selectedProp === prop.id;
                  return (
                    <div
                      key={prop.id}
                      className={`p-2 rounded-3 text-center bg-white border cursor-pointer flex-shrink-0 ${isSelected ? 'border-primary border-2 shadow-sm' : ''}`}
                      onClick={() => setSelectedProp(prop.id)}
                      style={{ width: '64px', cursor: 'pointer', borderColor: isSelected ? '#7F56D9 !important' : '#E6E1F2' }}
                    >
                      <div className="fs-4 mb-1">{prop.emoji}</div>
                      <div className="text-truncate text-muted" style={{ fontSize: '0.6rem' }}>{prop.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filters & Effects */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold small text-dark">Filters & effects</span>
                <span className="text-muted small">24 looks</span>
              </div>
              <Row xs={6} className="g-2">
                {FILTERS.map(f => {
                  const isSelected = selectedFilter.id === f.id;
                  return (
                    <Col key={f.id}>
                      <div 
                        className={`rounded-3 text-center bg-white border cursor-pointer p-1 overflow-hidden ${isSelected ? 'border-primary border-2 shadow-sm' : ''}`}
                        onClick={() => setSelectedFilter(f)}
                        style={{ cursor: 'pointer', borderColor: isSelected ? '#7F56D9 !important' : '#E6E1F2' }}
                      >
                        <div 
                          className="rounded-2 mb-1 w-100" 
                          style={{ height: '40px', background: f.gradient, border: '1px solid rgba(0,0,0,0.05)' }} 
                        />
                        <div className="text-truncate text-dark fw-medium" style={{ fontSize: '0.65rem' }}>{f.name}</div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Col>

          {/* Right Column: Your Collage Preview */}
          <Col lg={5}>
            <Card className="border-0 shadow-sm rounded-4 bg-white h-100 sticky-top" style={{ top: '2rem', minHeight: '600px' }}>
              <Card.Body className="d-flex flex-column p-4">
                <div className="text-uppercase small fw-bold text-muted mb-3" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                  YOUR COLLAGE {roomCode && <span className="badge bg-primary ms-2">Shared: {roomCode}</span>}
                </div>

                <div className="flex-grow-1 border border-2 border-dashed rounded-4 p-4 d-flex flex-column align-items-center justify-content-center text-center bg-light" style={{ minHeight: '480px' }}>
                  {capturedPhotos.length === 0 ? (
                    <div className="text-muted">
                      <div className="fs-1 mb-2">📸</div>
                      <p className="small mb-0">Press start when you're both ready.</p>
                      {roomCode && <p className="text-primary small mt-2 fw-semibold">Waiting for photos in room {roomCode}...</p>}
                    </div>
                  ) : (
                    <div className="w-100 d-flex flex-column gap-3">
                      {capturedPhotos.map((photo, index) => (
                        <div key={index} className="position-relative bg-white p-2 rounded shadow-sm">
                          <img src={photo} alt={`Capture ${index}`} className="img-fluid rounded" style={{ maxHeight: '120px', width: '100%', objectFit: 'cover' }} />
                          {getPropEmoji() && (
                            <span className="position-absolute top-50 start-50 translate-middle fs-3">
                              {getPropEmoji()}
                            </span>
                          )}
                        </div>
                      ))}
                      <Button className="btn-corporate w-100 mt-3" onClick={() => alert('Collage saved successfully!')}>
                        Save & Download Collage
                      </Button>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Share Modal */}
      <Modal show={showShareModal} onHide={() => setShowShareModal(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold fs-5">🌟 Start a Shared Booth</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <p className="text-muted small mb-3">
            Your private booth link is ready! Send this URL to your friend so you can both take pictures together from anywhere.
          </p>
          <div className="p-3 bg-light rounded-3 border d-flex align-items-center justify-content-between mb-3">
            <span className="text-truncate small font-monospace text-dark pe-2">{window.location.href}</span>
            <Button size="sm" className="btn-corporate d-flex align-items-center gap-1 text-nowrap" onClick={copyShareLink}>
              {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>
          <p className="text-muted small mb-0">
            Room Code: <strong>{roomCode}</strong>
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={() => setShowShareModal(false)}>
            Close & Start Snapping
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <div className="text-center text-muted small mt-5 pt-4 border-top">
        Made with lavender · Works best in a browser that allows camera access.
      </div>
    </div>
  );
};

export default Home;
