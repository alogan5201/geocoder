import  { useState, useEffect } from "react";

const WeatherImage = ({ src, alt,  }) => {
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    // Function to check if the image exists
    const checkImage = async (url) => {
      try {
        const response = await fetch(url, {
          method: "HEAD", // Use HEAD to retrieve headers without downloading the body
        });

        // If response status is 200, the image exists
        setImageExists(response.status === 200);
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    };

    // Check if the image exists
    checkImage(src);
  }, [src]);

  return <>{imageExists && <img src={src} alt={alt} loading="lazy"  />}</>;
};

export default WeatherImage;
