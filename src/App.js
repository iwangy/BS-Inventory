import React from 'react';
import CalendarHeatmap from './CalendarHeatmap.js';
import './App.css';

const data = {
  "2023-10-03": { encounteredNotes: [], createdNotes: [] },
  "2023-10-04": { encounteredNotes: ["Bold claims on McCarthy being ousted as speaker"], createdNotes: [] },
  "2023-10-05": { encounteredNotes: ["Clickbait 'paid partner content' articles on CNN"], createdNotes: ["Embellished personal accomplishment on a resume"] },
  "2023-10-06": { encounteredNotes: ["ChatGPT tried to convince me that Seattle had 2 'a's", "Exaggerated achievements on Linkedin"], createdNotes: ["BS'ed a discussion post for a class"] },
  "2023-10-07": { encounteredNotes: ["Weird facebook tag about a car crash", "'Fake' product review on Amazon for charger"], createdNotes: [] },
  "2023-10-08": { encounteredNotes: [], createdNotes: [] },
  "2023-10-09": { encounteredNotes: ["Professor for a class BS'ed an answer - they later got back to me",], createdNotes: [] },
  "2023-10-10": { encounteredNotes: ["Was sent a deepfake video by a relative", "Propaganda videos the Israel/Hamas conflict", "Outdated news of iPhone 15 overheating", "Celebrity gossip on Chinese TikTok"], createdNotes: [] },
  "2023-10-11": { encounteredNotes: ["Watched the highlights of the 2nd Republican debate", "Israel/Hamas conflict misinformation on TikTok"], createdNotes: [] },
  "2023-10-12": { encounteredNotes: ["Encountered someone spreading misinformation"], createdNotes: [] },
  "2023-10-13": { encounteredNotes: ["Israel/Hamas conflict misinformation on TikTok/WeChat"], createdNotes: ["BS'ed an answer to someone's question"] },
  "2023-10-14": { encounteredNotes: ["Chat GPT BS'ing answers to a math problem"], createdNotes: [] },
};



function App() {
  return (
    <div className="App">
      <h1>Bullshit Inventory Heatmap</h1>
      <CalendarHeatmap data={data} />
      <div className="footer">
        INFO 270 - Bullshit Inventory Project by Ian Wang
      </div>
    </div>
  );
}

export default App;
