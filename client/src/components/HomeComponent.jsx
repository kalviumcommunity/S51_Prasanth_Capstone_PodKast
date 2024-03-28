import React, { useEffect, useState } from "react";

// Components
import OnboardingComponent from "./OnboardingComponent";

function HomeComponent() {

  const [isNewVisitor, setIsNewVisitor] = useState(false);

  useEffect(() => {
    const visitedBefore = localStorage.getItem("visitedBefore");
    if (!visitedBefore) {
      setIsNewVisitor(true);
      localStorage.setItem("visitedBefore", true);
    }
  }, []);

  return (
    <>
      {isNewVisitor && <OnboardingComponent />}
      {!isNewVisitor && (
        <div>
          <h1>Welcome to the Home Page!</h1>
          <p>This is the main content of your home page.</p>
        </div>
      )}
    </>
  );
}

export default HomeComponent;
