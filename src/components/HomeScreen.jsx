import React, { useState, useEffect } from "react";
import wallpaper from "../assets/wallpaper.jpg";
import { IoIosFlashlight, IoIosCamera } from "react-icons/io";
import { FaLock, FaSafari } from "react-icons/fa6";
import { SiImessage } from "react-icons/si";
import { IoCall } from "react-icons/io5";

function HomeScreen() {
  const [isLocked, setIsLocked] = useState(true);
  const password = "356472";
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [useWallpaper, setWallpaper] = useState(false);

  const handleClear = () => {
    setPasswordInput("");
    setShowPasscode(null);
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    const video = document.querySelector("video");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    const photo = canvas.toDataURL("image/png");
    console.log("Captured photo:", photo);
  };

  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  );

  const [time, setTime] = useState(() => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    hours = hours % 12 || 12;
    return `${hours}:${minutes}`;
  });

  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - Date.now();

    const timeout = setTimeout(() => {
      setDate(
        new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      hours = hours % 12 || 12;

      setTime(`${hours}:${minutes}`);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const toggleFlashlight = () => {
    setFlashlightOn((prev) => !prev);
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Camera access denied. Please enable permissions in settings.");
    }
  };

  const closeCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const closePasscode = () => {
    if (!cameraStream) {
      setShowPasscode(null);
    }
  };

  const handleWallpaperClick = () => {
    if (!cameraStream) {
      setShowPasscode(true);
    }
  };

  const handleKeyPress = (digit) => {
    if (passwordInput.length < 6) {
      const newInput = passwordInput + digit;
      setPasswordInput(newInput);

      if (newInput.length === 6) {
        handleUnlock(newInput); // Check the passcode immediately
      }
    }
  };

  const handleUnlock = (input) => {
    if (input === password) {
      setIsLocked(false);
      setWallpaper(true); // Set wallpaper to true once the correct password is entered
    } else {
      alert("Incorrect password. Try again.");
      setPasswordInput(""); // Clear input on incorrect attempt
    }
  };

  return (
    <>
      {useWallpaper ? (
        <div
          className="absolute inset-[8px] rounded-[40px] bg-cover bg-center"
          style={{ backgroundImage: `url(${wallpaper})` }}
        >
        <div className="flex-row space-y-[545px] mx-2">
            <div className=" mt-20 flex flex-col items-start justify-start h-full">
            <div className="grid grid-cols-4 gap-2 text-center text-white">
              <div className="text-sm">
                <button className="p-3 bg-transparent backdrop-blur-3xl rounded-xl">
                  <SiImessage className="text-green-500 text-4xl" />
                </button>
                Messages
              </div>
              <div className="text-sm">
                <button className="p-3 rounded-xl">
                  <IoCall className="bg-green-500 text-white text-4xl rounded-xl p-3" />
                </button>
                Phone
              </div>
              <div className="text-sm">
                <button className="p-5 bg-transparent backdrop-blur-3xl rounded-xl">
                  📸
                </button>
                Camera
              </div>
              <div className="text-sm">
                <button className="p-5 bg-transparent backdrop-blur-3xl rounded-xl">
                  📸
                </button>
                Contacts
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between h-full bg-transparent backdrop-blur-3xl rounded-[26px] border-white p-1">
            <div className="grid grid-cols-4 gap-5 text-center text-white items-center justify-between">
              <div className="">
                <button className="p-3 rounded-xl">
                  <SiImessage className="text-green-500 text-5xl" />
                </button>

              </div>
              <div className="">
                <button className="p-3 rounded-xl">
                  <IoCall className="bg-green-500 text-white text-5xl rounded-xl p-1" />
                </button>

              </div>
              <div className="">
                <button className="p-3 bg-transparent backdrop-blur-3xl text-5xl rounded-xl">
                <FaSafari className="bg-white text-blue-300 text-5xl rounded-xl p-1" />
                </button>

              </div>
              <div className="">
                <button className="p-3 bg-transparent backdrop-blur-3xl text-5xl rounded-xl">
                <IoIosCamera className="bg-slate-100 text-gray-500 text-5xl rounded-xl p-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        </div>
      ) : !cameraStream && !showPasscode ? (
        <div
          className="absolute inset-[8px] bg-cover bg-center rounded-[40px] shadow-inner z-10 opacity-75"
          style={{
            backgroundImage: flashlightOn ? "none" : `url(${wallpaper})`,
            backgroundColor: flashlightOn ? "white" : "transparent",
          }}
          onClick={handleWallpaperClick}
        >
          <div className="z-20 flex flex-col items-center justify-center mt-24 space-y-2">
            <FaLock className="text-white font-semibold text-lg" />
            <div className="text-white font-semibold text-lg">{date}</div>
            <div className="text-white font-bold text-7xl">{time}</div>
          </div>

          <div className="flex justify-between items-center space-x-8 p-4 mt-[450px]">
            <button
              aria-label="Toggle Flashlight"
              onClick={(event) => {
                event.stopPropagation();
                toggleFlashlight();
              }}
              className={`z-50 rounded-full w-14 h-14 text-white backdrop-blur-3xl p-1 text-3xl ${
                flashlightOn ? "bg-yellow-500" : "bg-opacity-0"
              }`}
            >
              <IoIosFlashlight className="mx-2 my-2.5" />
            </button>

            <button
              aria-label="Open Camera"
              onClick={(event) => {
                event.stopPropagation();
                openCamera();
              }}
              className="rounded-full w-14 h-14 text-white backdrop-blur-3xl p-1 text-3xl bg-opacity-0 z-50"
            >
              <IoIosCamera className="mx-2 my-2.5" />
            </button>
          </div>
        </div>
      ) : showPasscode ? (
        <div className="absolute bg-cover bg-center inset-[8px] flex flex-col items-center justify-center rounded-[40px] shadow-inner z-10" style={{backgroundImage: `url(${wallpaper})`}}>
          <FaLock className="text-white font-semibold text-lg" />
          <h1 className="text-xl font-medium mt-1 mb-3 text-white">Enter Passcode</h1>
          <div className="flex space-x-1">
            {passwordInput.split("").map((_, index) => (
              <div
                key={index}
                className="w-9 h-9 bg-transparent rounded-full flex items-center justify-center text-[47px] text-white font-medium mb-3"
              >
                &#9679;
              </div>
            ))}
            {[...Array(6 - passwordInput.length)].map((_, index) => (
              <div
                key={index}
                className="w-9 h-9 bg-transparent rounded-full flex items-center justify-center text-lg text-white mb-3"
              >
                &#9711;
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <button
                key={digit}
                onClick={() => handleKeyPress(digit)}
                className="py-6 px-8 bg-transparent backdrop-blur-sm rounded-full text-xl font-semibold mb-3 text-white"
              >
                {digit}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleKeyPress(0)}
            className="py-6 px-8 bg-transparent backdrop-blur-md rounded-full text-xl font-semibold mb-3 text-white"
          >
            0
          </button>
          <div className="justify-between items-center space-x-52 pt-24 font-semibold text-white">
            <button>Emergency</button>
            <button onClick={handleClear}>Cancel</button>
          </div>
          <div
            onClick={closePasscode}
            className="absolute bottom-[-1px] left-1/2 transform -translate-x-1/2 w-[130px] h-[5px] bg-white rounded-full shadow-lg mb-3 z-50 cursor-pointer"
          ></div>
        </div>
      ) : cameraStream ? (
        <div className="absolute inset-[5px] bg-black rounded-[40px] z-20 flex flex-col">
          <video
            autoPlay
            playsInline
            className="rounded-[40px] w-full h-full"
            ref={(video) => {
              if (video && cameraStream) video.srcObject = cameraStream;
            }}
          />
          <div className="absolute bottom-0 left-0 w-full flex justify-center items-center space-x-4 pb-8">
            <div className="text-yellow-500 text-sm font-semibold mb-[190px]">
              PHOTO
            </div>
          </div>
          <div className="absolute bottom-[100px] w-full flex justify-center">
            <button
              onClick={capturePhoto}
              className="w-16 h-16 bg-white rounded-full border-4 border-gray-300"
              aria-label="Take Photo"
            >
              <div className="border-2 border-black w-14 h-14 rounded-full"></div>
            </button>
          </div>
          <div
            onClick={closeCamera}
            className="absolute bottom-[-1px] left-1/2 transform -translate-x-1/2 w-[130px] h-[5px] bg-slate-100 rounded-full shadow-lg mb-3 z-50 cursor-pointer"
          ></div>
        </div>
      ) : null}
    </>
  );
}

export default HomeScreen;
