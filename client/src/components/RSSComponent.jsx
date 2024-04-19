import { useEffect, useState } from "react";
import AudioPlayer from "podkast-audio-player";

function RSSComponent() {
  const [rssLink, setRssLink] = useState("");
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    // Fetch RSS feed data when the component mounts or when rssLink changes
    if (rssLink) {
      fetchRssData();
    }
  }, [rssLink]);

  const handleInputChange = (e) => {
    setRssLink(e.target.value);
  };

  const fetchRssData = async () => {
    try {
      // Fetch RSS feed as text
      const response = await fetch(rssLink);
      const xmlData = await response.text();

      // Parse XML data
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, "application/xml");

      // Process and extract data as needed
      const items = xmlDoc.getElementsByTagName("item");
      const audioData = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const audioUrl = item.querySelector("enclosure").getAttribute("url");
        const title = item.querySelector("title").textContent;
        const creator =
          item.querySelector("creator")?.textContent ||
          item.querySelector("author")?.textContent;
        const thumbnailUrl =
          item.querySelector("media\\:thumbnail")?.getAttribute("url") ||
          "../assets/Cover/audio-1.jpg";

        audioData.push({
          audioSrc: audioUrl,
          title1: title,
          title2: creator,
          coverpic: thumbnailUrl,
        });
      }

      const validateData = (data) => {
        return data.map((item) => ({
          ...item,
          coverpic: "../assets/Cover/audio-1.jpg", // Provide a default image URL if coverpic is missing
        }));
      };

      setFetchedData(validateData(audioData));
    } catch (error) {
      console.error("Error fetching or parsing RSS feed:", error);
    }
  };

  return (
    <>
      <div className="rss-reader-content-area">
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
                      <option value="Audio">Audio Content</option>
                      <option value="News">News Updates</option>
                    </select>
                  </div>
                  <div className="rss-link-input">
                    <input
                      type="text"
                      name="rsslink"
                      id="rsslink"
                      placeholder="RSS Feed Link"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="rss-reader-fetch-button">
                  <button onClick={fetchRssData}>Fetch</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rss-reader-fetched-data-content-area">
          <AudioPlayer songs={fetchedData} theme="light" />
        </div>
      </div>
    </>
  );
}

export default RSSComponent;
