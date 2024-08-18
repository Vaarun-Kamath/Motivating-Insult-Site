import "./App.css";
import { useEffect, useState } from "react";
import Quote from "./components/Quote";
import { GoogleGenerativeAI } from "@google/generative-ai";
import bg from "./assets/default.jpg";

function App() {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [backgroundUrl, setBackgroundUrl] = useState(bg);

  useEffect(() => {
    async function fetchWallpaper() {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?client_id=${
          import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }&orientation=landscape`
      );
      const data = await response.json();
      setBackgroundUrl(data.urls.full);
    }

    fetchWallpaper();
  }, []);

  return (
    <div className="max-h-screen flex justify-center items-center w-screen">
      <div
        className="flex justify-center items-center w-full"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          // width: "100%",
          filter: "blur(3px)",
        }}
      ></div>
      <div className="absolute z-10">
        {model !== undefined ? <Quote model={model} /> : <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
