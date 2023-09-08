import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GoForItBtn from "../../Components/GoForItBtn";

export default function HomePage() {
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <div className="homepage disable-scroll">
      <div className="home-text">
        <h1 className="home-title">
          Level Up Your Fun! Unleash Gaming Adventures at Game Store
        </h1>
      </div>
      <div className="home-btn">
        <Link to={`/games`}>
          <GoForItBtn/>
        </Link>
      </div>
    </div>
  );
}
