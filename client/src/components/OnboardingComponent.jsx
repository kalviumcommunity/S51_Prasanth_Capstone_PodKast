import React, { useState, useEffect } from "react";
import AudioPlayer from "podkast-audio-player";

import AudioOne from "../assets/audio/audio-1.mp3";
import AudioTwo from "../assets/audio/audio-2.mp3";
import AudioThree from "../assets/audio/audio-2.mp3";

import AudioCoverPicOne from "../assets/Cover/audio-1.jpg";
import AudioCoverPicTwo from "../assets/Cover/audio-1.jpg";
import AudioCoverPicThree from "../assets/Cover/audio-1.jpg";

import SlideOne from "../assets/Slides/slide-1.jpg";
import SlideTwo from "../assets/Slides/slide-2.jpg";
import SlideThree from "../assets/Slides/slide-3.jpg";

function OnboardingComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAdSlide, setCurrentAdSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const onboardingInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    const adsInterval = setInterval(() => {
      setCurrentAdSlide((prevAdSlide) =>
        prevAdSlide === totalSlides - 1 ? 0 : prevAdSlide + 1
      );
    }, 5000);

    return () => {
      clearInterval(onboardingInterval);
      clearInterval(adsInterval);
    };
  }, [totalSlides]);

  const slideContent = [
    {
      heading: "Discover Podcasts",
      text: "Explore a world of diverse podcasts covering topics ranging from technology and science to arts and culture. With PodKast, you'll find something for every interest.",
      image: SlideOne,
    },
    {
      heading: "Personalized Recommendations",
      text: "Receive tailored recommendations based on your listening habits and preferences. Whether you're a seasoned podcast enthusiast or new to the medium, PodKast helps you discover content you'll love.",
      image: SlideTwo,
    },
    {
      heading: "Seamless Listening Experience",
      text: "Enjoy uninterrupted listening with our intuitive interface. Stream or download episodes to listen offline, create playlists, and sync across devices for a seamless podcasting experience. Dive into the world of audio storytelling with PodKast.",
      image: SlideThree,
    },
  ];

  const adsImages = [SlideOne, SlideTwo, SlideThree];

  const audioData = [
    {
      audioSrc: AudioOne,
      title1: "Jolly O Gymkhana",
      title2: "Anirudh Ravichander & Vijay",
      coverpic: AudioCoverPicOne,
    },
    {
      audioSrc: AudioTwo,
      title1: "Title 2",
      title2: "Artist 2",
      coverpic: AudioCoverPicTwo,
    },
    {
      audioSrc: AudioThree,
      title1: "Title 2",
      title2: "Artist 2",
      coverpic: AudioCoverPicThree,
    },
  ];

  return (
    <>
      <div className="onboarding-component-onboarding-screens-content-area">
        <div className="onboarding-component-onboarding-screens">
          <div className="onboarding-component-slider-content-area">
            {slideContent.map((slide, index) => (
              <div
                key={index}
                className={`onboarding-component-slider-slide ${
                  currentSlide === index ? "active" : ""
                }`}
              >
                <img src={slide.image} alt={slide.heading} />
                <div className="onboarding-component-slides-text-area">
                  <h1>{slide.heading}</h1>
                  <p>{slide.text}</p>
                  <div className="onboarding-component-get-started-buttons">
                    <button
                      className="onboarding-component-get-start-button"
                      onClick={() => console.log("Get Started clicked!")}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="onboarding-component-right-content-area">
          <div className="onboarding-component-demo-music-player">
            <AudioPlayer
              songs={audioData} theme="light"/>
          </div>
          <div className="onboarding-component-ads-content-area">
            {adsImages.map((image, index) => (
              <div
                key={index}
                className={`onboarding-component-ads-slide ${
                  currentAdSlide === index ? "active" : ""
                }`}
              >
                <img src={image} alt={`Ad ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OnboardingComponent;
