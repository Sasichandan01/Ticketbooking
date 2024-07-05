
import React from "react";

import YoutubeEmbedVideo from "youtube-embed-video";
export default function Trailer(props){
   
   
    
    const videos=props.videos;

    return (
      <div className="plot">
        <h4>
          <strong
            style={{
              borderRadius: "10px",
              backgroundColor: "#D8D9DA",
              padding: "0 5px",
            }}
          >
            Trailers
          </strong>
        </h4>
        <div className="youtube">
          <div id="youtube">
            {videos !== null &&
              videos.map((data) => (
                <div className="video-name" key={data.key}>
                  <div>
                    <strong>{data.name}</strong>
                  </div>
                  <div>
                    <YoutubeEmbedVideo
                      className="videoplayer"
                      videoId={data.key}
                      key={data.key}
                      title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
    
    
}