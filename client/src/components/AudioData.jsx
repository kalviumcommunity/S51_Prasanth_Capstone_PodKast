import React from "react";

import AudioOne from "../assets/audio/audio-1.mp3";
import AudioTwo from "../assets/audio/audio-2.mp3";
import AudioThree from "../assets/audio/audio-2.mp3";

import AudioCoverPicOne from "../assets/Cover/audio-1.jpg";
import AudioCoverPicTwo from "../assets/Cover/audio-1.jpg";
import AudioCoverPicThree from "../assets/Cover/audio-1.jpg";

export const audioData = [
  {
    audioSrc: AudioOne,
    title1: "Jolly O Gymkhana",
    title2: "Anirudh Ravichander & Vijay",
    coverpic: AudioCoverPicOne,
  },
  {
    audioSrc: AudioTwo,
    title1: 'Title 1',
    title2: 'Artist 1',
    coverpic: AudioCoverPicTwo
  },
  {
    audioSrc: AudioThree,
    title1: 'Title 1',
    title2: 'Artist 1',
    coverpic: AudioCoverPicThree
  },
];

export default {audioData};
