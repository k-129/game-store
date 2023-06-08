import React, { useEffect } from "react";
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
    <div className='homepage disable-scroll'>
    </div>
  )
}
