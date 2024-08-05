import React, { useEffect, useState } from "react";

import GameOne from "../assets/games/gameone.png";
import GameTwo from "../assets/games/gametwo.png";
import GameThree from "../assets/games/gamethree.png";
import GameFoue from "../assets/games/gamefour.png";
import GameFive from "../assets/games/gamefive.png";

const gamesList = [
  {
    id: 1,
    name: "Sushi Party",
    details:
      "Sushi Party is a snake game in Kawaii-style. You are in an arena with other snakes and the goal is to make them bump into you. The more sushi your snake eats, the larger it grows. Sushi Snake is based on Kawaii, which is the Japanese culture of cuteness. These snakes might be among the cutest snakes you will ever see!",
    image: GameOne,
    playUrl: "https://poki.com/en/g/sushi-party-io",
  },
  {
    id: 2,
    name: "Idle Ants",
    details:
      "Idle Ants is a simulation game where you command an army of hungry ants collect food. Help them break apart and carry various snacks, fruits, vegetables, meat, and even inedible objects back into the burrow underground. Click, tap or repeatedly press space to make your ants work more efficiently. Upgrade your colony using the three buttons at the bottom of the screen.",
    image: GameTwo,
    playUrl: "https://poki.com/en/g/idle-ants",
  },
  {
    id: 3,
    name: "Roller Coaster Builder 2",
    details:
      "Roller Coaster Builder 2 is a game where you build your own roller coasters and share them with others! Roller Coaster Builder 2 was created by Rabbit Mountain, and is the second installment of the Roller Coaster Builder series. ",
    image: GameThree,
    playUrl: "https://poki.com/en/g/roller-coaster-builder-2",
  },
  {
    id: 4,
    name: "Game of Farmers",
    details:
      "Game of Farmers is a casual idle farming game created by AppyApp. Leave the chaotic city life behind and start building your dream farm. Unlock various types of plants, vegetables, fruits, and animals and make money with their help even when you're offline.",
    image: GameFoue,
    playUrl: "https://poki.com/en/g/game-of-farmers",
  },
  {
    id: 5,
    name: "Royal Card Clash",
    details:
      "Royal Card Clash is an exhilarating card game where you have to strategically play numbered cards in order to beat the royal cards. Each turn, you have a choice to play three cards in three different lanes.",
    image: GameFive,
    playUrl: "https://poki.com/en/g/royal-card-clash",
  },
];

function GameComponent() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredGame, setFeaturedGame] = useState(null);

  useEffect(() => {
    const randomGame = gamesList[Math.floor(Math.random() * gamesList.length)];
    setFeaturedGame(randomGame);
  }, []);

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const filteredGames = gamesList.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="game-component-content-area">
        {featuredGame && (
          <div className="game-component-content-area-top-featured-one">
            <div className="top-featured-one-image-and-details">
              <div
                className="image-and-details-area-game-image"
                style={{ backgroundImage: `url(${featuredGame.image})` }}
              ></div>
              <div className="top-featured-one-details">
                <h1>{featuredGame.name}</h1>
                <p>{featuredGame.details}</p>
              </div>
            </div>
            <div className="top-feature-featured-tag">
              <p>Promotion</p>
            </div>
          </div>
        )}
        <div className="game-component-content-area-main-content-part">
          <div className="main-content-part-left-side-panel">
            <div className="left-side-panel-search-area">
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>Search</button>
            </div>
            <div className="left-side-panel-all-games-area">
              <p>All Games</p>
              <ul>
                {filteredGames.map((game) => (
                  <li key={game.id} onClick={() => handleGameClick(game)}>
                    {game.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="main-content-part-right-panel-area">
            <div className="right-panel-area-patterns-area">
              <h1>{selectedGame ? selectedGame.name : "All Games"}</h1>
            </div>
            <div className="right-panel-area-all-games-area-list">
              {selectedGame ? (
                <div className="game-details">
                  <img src={selectedGame.image} alt={selectedGame.name} />
                  <h2>{selectedGame.name}</h2>
                  <p>{selectedGame.details}</p>
                  <a
                    href={selectedGame.playUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="play-now-game-details-button">
                      Play Now
                    </button>
                  </a>
                </div>
              ) : (
                <div className="right-panel-no-game-selected-area">
                  <img src={GameOne} alt="" />
                  <p>Please select a game to see the details.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameComponent;
