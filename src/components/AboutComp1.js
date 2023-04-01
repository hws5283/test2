import profile from "../navImages/lee-shadeck.jpg"
import map from "../navImages/leeWall.jpg"
import "../styles/aboutcomp1.css"
import {Link} from "react-router-dom";

function AboutComp1() {
  return (
    
      <section className="about">
        <div className="content">
            <img src={profile} alt = "Lee Shadeck"/> 
            <div className="text">
                <h1>About <span className="spanClass">Lee's Map</span></h1>
                <h5>Interactive Map</h5>
                <p>Welcome to Lee Shadeck's interactive map! We believe that everyone has a story to tell, and we want to help you explore those stories. This website provides an interactive map experience that allows users to explore the history of Lee Shadeck's friends and family through different landmarks. With this, you are able to explore the relationships, places, and events that make up Lee Shadeck's life through various pop-ups. We invite you to explore the map and learn about the people and places that make up this incredible story.</p>
                <Link to="https://www.airbnb.com/rooms/565043333963667558?guests=1&adults=1&s=67&unique_share_id=08556878-92d6-4818-bc98-d853303b1eb7&source_impression_id=p3_1676477888_COX3kcVRMcsRmjs8" target="_blank">
                    <button type="button" className="aboutBtn">Airbnb Page</button>
                </Link>
                <Link to="https://sites.google.com/view/l-lucian-art/about-the-artist" target="_blank">
                    <button type="button" className="aboutBtn">More About Lee</button>
                </Link>
            </div>
            </div>

        <div className="content2">
            <div className="text">
                <h1>How it <span className="spanClass">started</span></h1>
                <h5>Placeholder subtitle</h5>
                <p>Placeholder for a paragraph for future iterations. Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph.</p>
            </div>
            <img src={map} alt = "Map"/>
        </div>
      </section>
    
  );
}

export default AboutComp1;