import { useEffect, useState } from "react";
import AudioPlayer from "podkast-audio-player";
import InsideNavbar from "./InsideNavbar"
import axios from "axios";

function RSSComponent() {

  const [rssLink, setRssLink] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (rssLink) {
      fetchPodcastData(rssLink);
    }
  }, [rssLink]);

  const fetchPodcastData = async (link) => {
    try {
      const response = await axios.get(link);
      const podcastData = response.data; // Assuming response contains the podcast data
      
      // Convert podcast data to an array of songs for AudioPlayer
      const songs = podcastData.map((podcast) => ({
        audioSrc: podcast.audioSrc,
        title: podcast.title,
        artist: podcast.artist,
        coverPic: podcast.coverPic,
      }));

      // Update fetched data state
      setFetchedData(songs);
    } catch (error) {
      console.error("Error fetching podcast data:", error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <>
      <div className="rss-reader-content-area">
        <InsideNavbar/>
        <div className="rss-reader-input-content-area">
          <div className="rss-reader-user-inputs">
            <h1>
              RSS Reader <span id="announcement">Podkast</span>
            </h1>
            <p>
              Enhance your listening experience with our RSS reader feature.
              With this feature, you can easily access and enjoy a wide range of
              audio content, including podcasts, news updates, and more, all in
              one place. Simply input the RSS feed URL of your favorite audio
              sources, and our application will automatically fetch and organize
              the latest episodes or updates for you. Whether you're a podcast
              enthusiast, news junkie, or simply enjoy listening to audio
              content on the go, our RSS reader feature provides a convenient
              and streamlined way to stay informed and entertained. Customize
              your personal audio player with the content that matters most to
              you, and never miss out on the latest episodes or updates again.
            </p>
          </div>
          <div className="rss-reader-poster-style-input-bar">
            <div className="rss-reader-link-area">
              <label htmlFor="rsslink">RSS Feed</label>
              <div className="rss-reader-audio-or-news-selector">
                <div className="rss-reader-rows-area">
                  <div className="rss-selector">
                    <select name="options" id="options">
                      <option value="Audio">PodKast Feed</option>
                      {/* <option value="News">News Updates</option> */}
                    </select>
                  </div>
                  <div className="rss-link-input">
                    <input
                      type="text"
                      name="rsslink"
                      id="rsslink"
                      placeholder="RSS Feed Link"
                      onChange={(e) => setRssLink(e.target.value)}
                    />
                  </div>
                </div>
                <div className="rss-reader-fetch-button">
                  <button onClick={() => fetchPodcastData(rssLink)}>Fetch</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rss-reader-fetched-data-content-area">
        {fetchedData.length > 0 && (
            <AudioPlayer songs={fetchedData} theme={theme} />
          )}
        </div>
      </div>
    </>
  );
}

export default RSSComponent;
