import React from "react";

function GameComponent() {
    return(
        <>
        <div className="game-component-content-area">
            <div className="game-component-content-area-top-featured-one">
                <div className="top-featured-one-image-and-details">
                    <div className="image-and-details-area-game-image"></div>
                    <div className="top-featured-one-details">
                        <h1>Game Name</h1>
                        <p>Details of that game.</p>
                    </div>
                </div>
                <div className="top-feature-featured-tag">
                    <p>Promotion</p>
                </div>
            </div>
            <div className="game-component-content-area-main-content-part">
                <div className="main-content-part-left-side-panel">
                    <div className="left-side-panel-search-area">
                        <input type="text" placeholder="Search" className="search-input" />
                        <button>Search</button>
                    </div>
                    <div className="left-side-panel-all-games-area">
                        <p>All Games</p>
                        <ul>
                            <li>Game one</li>
                            <li>Game one</li>
                            <li>Game one</li>
                            <li>Game one</li>
                            <li>Game one</li>
                            <li>Game one</li>
                            <li>Game one</li>
                            <li>Game one</li>
                            <li>Game one</li>
                            <li>Game one</li>
                            <li>Game one</li>
                            <li>Game one</li>
                            <li>Game one</li>
                        </ul>
                    </div>
                </div>
                <div className="main-content-part-right-panel-area">
                    <div className="right-panel-area-patterns-area">
                        <h1>All Games</h1>
                    </div>
                    <div className="right-panel-area-all-games-area-list">

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default GameComponent;