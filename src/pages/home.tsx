import ThreeModel from "@/components/ThreeModel";
import React, { useEffect, useState } from "react";

type Props = {};

function Home({}: Props) {
  const [mousePos, setMousePos] = useState({});

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


  console.log(mousePos)
  return (
    <div className="h-screen">
      <ThreeModel />
    </div>
  );
}

export default Home;
