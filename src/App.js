import { useState } from "react";
import { musics } from "./musics";
import Footer from "./components/Footer/index";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [play, setPlay] = useState(false);
  const [music, setMusic] = useState({
    id: 0,
    title: "",
    author: "",
    url: "",
  });

  const handleAddMusic = ({ id, title, artist, url }) => {
    setPlay(false);
    setMusic({
      id,
      title,
      artist,
      url,
    });
  };

  return (
    <div className="container">
      <Header />
      <main className="main">
        <section className="main__top">
          <h2 className="main__title">The best play list</h2>
        </section>
        <section className="main__cards">
          {musics.map((music) => {
            return (
              <div
                key={music.id}
                className="card"
                onClick={() => handleAddMusic(music)}
              >
                <img
                  className="card__img"
                  src={music.cover}
                  alt="Capa da música"
                />
                <h1 className="card__title">{music.title}</h1>
                <p className="card__description">{music.description}</p>
              </div>
            );
          })}
        </section>
      </main>
      <Footer
        music={music}
        setMusic={setMusic}
        arrMusics={musics}
        play={play}
        setPlay={setPlay}
      />
    </div>
  );
}

export default App;
