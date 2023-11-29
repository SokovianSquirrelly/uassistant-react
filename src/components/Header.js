export default function Header() {
  return (
    <header>
      <nav>
        <a href="index.html" class="main-img">
          <img
            src="images/icon-placeholder.jpg"
            alt="click here to return to home page"
          />
        </a>
        <button id="menu-button"></button>
        <ul class="navigation">
          <li>
            <a href="client-manager.html">Manage Donors</a>
          </li>
          <li>
            <a href="ua-testing.html">UA Testing</a>
          </li>
          <li>
            <a href="#">Manage Messaging</a>
          </li>
          <li>
            <a href="substance-reference.html">Substance Reference</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
