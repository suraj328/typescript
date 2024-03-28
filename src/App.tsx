import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      createRandomElement();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const createRandomElement = () => {
    const body = document.body;
    const div = document.createElement("div");
    div.className = "round";
    div.style.position = "absolute";
    div.style.top = `${getRandomNumber(window.innerHeight - 100)}px`;
    div.style.left = `${getRandomNumber(window.innerWidth - 100)}px`;
    div.innerHTML =
      '<div class="animated-text"> kontra is <br/>Under Construction <br/> Available Soon!!</div>';
    body.appendChild(div);
    setTimeout(() => {
      body.removeChild(div);
    }, 4000);
  };

  const getRandomNumber = (max: any) => {
    return Math.floor(Math.random() * max);
  };

  return <div className="image"></div>;
};

export default App;
