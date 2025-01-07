import React, { useRef, useState, useEffect } from "react";
import { IoCellular } from "react-icons/io5";
import { IoIosWifi, IoIosBatteryFull } from "react-icons/io";
import HomeScreen from "../components/HomeScreen";


const Home = () => {

    const [volume, setVolume] = useState(1);
    const [previousVolume, setPreviousVolume] = useState(1);
    const audioRef = useRef(null);
    const [isLocked, setIsLocked] = useState(true);
    const [passcodeEntered, setPasscodeEntered] = useState(false);

    const handlePasscodeSubmit = (isCorrect) => {
        if (isCorrect) {
            setPasscodeEntered(true);
            setIsLocked(false);
        }
    };

    const toggleMute = () => {
        const newVolume = volume > 0 ? 0 : previousVolume;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const adjustVolume = (amount) => {
        const newVolume = Math.max(0, Math.min(1, volume + amount));
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const handleLock = () => {
        setIsLocked((prevState) => !prevState);
    };

    return (
        <div className="h-screen w-full bg-black flex items-center justify-center">
            {/* iPhone Pro Max Design */}
            <div className="relative w-[440px] h-[844px] bg-gray-300 rounded-[60px] shadow-2xl">
                {/* Outer Frame */}
                <div className="absolute inset-0 bg-red-900 rounded-[60px]"></div>
                {/* Bezel */}
                <div className="absolute inset-[15px] bg-black rounded-[50px] overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[50px] flex items-center justify-between px-4 backdrop-blur-[2px] z-20">
                        {!isLocked && (
                            <div className="absolute top-0 left-0 w-full h-[50px] flex items-center justify-between px-4 backdrop-blur-[2px] z-20">
                                <div className="text-black font-bold text-md mt-3 ml-3 cursor-default">TM</div>
                                <div className="flex space-x-1.5 mr-3 mt-0">
                                    <IoCellular className="text-xl mt-3" />
                                    <IoIosWifi className="text-xl mt-3" />
                                    <IoIosBatteryFull className="text-2xl mt-2.5" />
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Dynamic Island */}
                    <div className="absolute top-[15px] left-1/2 transform -translate-x-1/2 w-[100px] h-[26px] bg-black rounded-[15px] flex justify-between items-center px-3 py-1 z-20">
                        <div className="w-[16px] h-[16px] bg-gray-700 rounded-full">
                            <div className="w-[8px] h-[8px] bg-sky-950 mx-auto mt-1 rounded-full"></div>
                        </div>
                        <div className="w-[7px] h-[7px] bg-red-300 rounded-full animate-pulse z-10"></div>
                        <div className="w-[9px] h-[9px] bg-gray-600 rounded-full"></div>
                        <div className="w-[12px] h-[12px] bg-gray-700 rounded-full"></div>
                    </div>
                    {/* Wallpaper */}
                    {isLocked ? (
                        <div className="w-full h-full bg-black"></div>
                    ) : (
                        <HomeScreen isLocked={isLocked} passcodeEntered={passcodeEntered}
                            onPasscodeSubmit={handlePasscodeSubmit} />
                    )}
                </div>

                {/* Mute Button */}
                <button onClick={toggleMute}><div className="absolute top-[90px] left-[-2px] w-[6px] h-[30px] bg-red-400 rounded-full"></div></button>
                {/* Volume up Button */}
                <button onClick={() => adjustVolume(0.1)}><div className="absolute top-[200px] left-[-4px] w-[6px] h-[50px] bg-slate-400 rounded-full"></div></button>
                {/* Volume down Button */}
                <button onClick={() => adjustVolume(-0.1)}><div className="absolute top-[270px] left-[-4px] w-[6px] h-[50px] bg-slate-400 rounded-full"></div></button>
                {/* Lock Button */}
                <button onClick={handleLock}><div className="absolute top-[200px] right-[-4px] w-[6px] h-[70px] bg-slate-400 rounded-full"></div></button>

                {/* Bottom Home Bar */}

                {/* Screen Reflection */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-white opacity-10 rounded-[60px] pointer-events-none"></div>
            </div>
        </div>
    );
};

export default Home;
