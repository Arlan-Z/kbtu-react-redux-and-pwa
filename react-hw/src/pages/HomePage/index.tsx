import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page-wrapper">
      <div className="home-content">
        <h1 className="home-title">Welcome to Rick and Morty Wiki</h1>
        <p className="home-text">
          Discover characters, episodes and locations from the multiverse of
          Rick and Morty. Use the navigation above to explore the data from the official API.
        </p>
      </div>
    </div>
  );
}
