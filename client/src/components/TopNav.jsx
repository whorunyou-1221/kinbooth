import './TopNav.css';

const TopNav = () => {

  return (
   <nav class="navbar">
  <a href="#" class="logo">
    <span>Kin</span><span class="logo-accent">Booth</span>
  </a>

  <div class="nav-links">
    <a href="#how-it-works">How it works</a>
    <a href="#filters">Our filters</a>
    <a href="#about">About</a>
  </div>

  <a href="#create" class="nav-cta">
    Create a booth <span>→</span>
  </a>

  <button class="menu-toggle" aria-label="Open menu">
    ☰
  </button>
</nav>
  )
};

export default TopNav