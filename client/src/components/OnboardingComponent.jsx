import React, { useState, useEffect } from "react";

import SlideOne from "../assets/Slides/slide-1.jpg";
import SlideTwo from "../assets/Slides/slide-2.jpg";
import SlideThree from "../assets/Slides/slide-3.jpg";
import Audio from "../assets/audio/audio-1.mp3"

function OnboardingComponent() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [progress, setProgress] = useState(100 / 3); // Initialized with one slide completed
  const [showButtons, setShowButtons] = useState(false); // State to control button animation
  const totalSlides = 3;

  useEffect(() => {
    // Calculate progress based on the current slide
    const progressWidth = ((currentSlide - 1) / totalSlides) * 100;
    setProgress(progressWidth);

    // Delay showing buttons after slide transition
    const timeout = setTimeout(() => {
      setShowButtons(true);
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timeout); // Cleanup on component unmount
  }, [currentSlide, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides ? totalSlides : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 1 ? 1 : prevSlide - 1));
  };

  const slideTexts = [
    "Explore a world of diverse podcasts covering topics ranging from technology and science to arts and culture. With PodKast, you'll find something for every interest.",
    "Receive tailored recommendations based on your listening habits and preferences. Whether you're a seasoned podcast enthusiast or new to the medium, PodKast helps you discover content you'll love.",
    "Enjoy uninterrupted listening with our intuitive interface. Stream or download episodes to listen offline, create playlists, and sync across devices for a seamless podcasting experience. Dive into the world of audio storytelling with PodKast.",
  ];

  const slideHeadings = [
    "Discover Podcasts",
    "Personalized Recommendations",
    "Seamless Listening Experience",
  ];

  return (
    <>
      <div className="onboarding-component-onboarding-screens-content-area">
        <div className="onboarding-component-onboarding-screens">
          <div
            className={`oboarding-componenet-slides-slide ${
              currentSlide === 1 ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${SlideOne})`,
            }}
          ></div>
          <div
            className={`oboarding-componenet-slides-slide ${
              currentSlide === 2 ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${SlideTwo})`,
            }}
          ></div>
          <div
            className={`oboarding-componenet-slides-slide ${
              currentSlide === 3 ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${SlideThree})`,
            }}
          ></div>
          <div className="onboarding-component-progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
            <div
              className="progress-segment"
              style={{ width: `${100 / totalSlides}%` }}
            ></div>
          </div>
          <div className="onboarding-component-slides-text-area">
            <h1>{slideHeadings[currentSlide - 1]}</h1>
            <p>{slideTexts[currentSlide - 1]}</p>
          </div>
          <div className="onboarding-components-control-buttons">
            {currentSlide !== 1 && (
              <button
                className={`onboarding-component-previous-button ${
                  showButtons ? "active" : ""
                }`}
                onClick={prevSlide}
              >
                Previous
              </button>
            )}
            {currentSlide === totalSlides ? (
              <button className="onboarding-component-get-start-button">
                Get Start!
              </button>
            ) : (
              <button
                className={`onboarding-component-next-button ${
                  showButtons ? "active" : ""
                }`}
                onClick={nextSlide}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="onboarding-component-demo-music-player">
           
        </div>
      </div>
    </>
  );
}

export default OnboardingComponent;
