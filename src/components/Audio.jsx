import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { FaPlay, FaPause, FaFastForward, FaFastBackward } from "react-icons/fa";
import gif from "../assets/playing.gif";
import ProgressBar from "./ProgressBar";

import { getDatabase, ref, onValue } from "firebase/database";

const Audio = () => {
  const lastPlayedIndex = localStorage.getItem("lastPlayedIndex");
  const lastPlayedTime = localStorage.getItem("lastPlayedTime");

  const [songsArr, setSongsArr] = useState([
    {
      title: "Song 1",
      artist: "Artist 1",
      cover: "./img/6.jpg",
      song: "./songs/1.mp3",
    },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(
    lastPlayedIndex ? parseInt(lastPlayedIndex) : 0
  );
  const [currentTime, setCurrentTime] = useState(
    lastPlayedTime ? parseFloat(lastPlayedTime) : 0
  );
  const [duration, setDuration] = useState(0);

  const audioRef = useRef();

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "tracks/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      const tracks = Object.values(data);

      setSongsArr(tracks);
    });
  }, []);

  useEffect(() => {
    // Save the current playing audio file and position to localStorage
    localStorage.setItem("lastPlayedIndex", currentTrackIndex);
    localStorage.setItem("lastPlayedTime", currentTime);
  }, [currentTrackIndex, currentTime]);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current &&
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    audioRef.current &&
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioRef.current &&
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      audioRef.current &&
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const playTrack = () => {
    audioRef.current.currentTime = currentTime;

    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const playNextTrack = () => {
    const nextTrackIndex = (currentTrackIndex + 1) % songsArr.length;
    setCurrentTrackIndex(nextTrackIndex);

    if (isPlaying) {
      playTrack();
    }
  };

  const playPreviousTrack = () => {
    let prevTrackIndex = currentTrackIndex - 1;
    if (prevTrackIndex < 0) {
      prevTrackIndex = songsArr.length - 1;
    }
    setCurrentTrackIndex(prevTrackIndex);

    if (isPlaying) {
      playTrack();
    }
  };

  const handleSongSelect = (track, index) => {
    setCurrentTrackIndex(index);
    playTrack();
  };

  const handleTimeChange = (newTime) => {
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleEnded = () => {
    if (currentTrackIndex < songsArr.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0); // Loop back to the first track
    }
    playTrack();
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  return (
    <Stack direction={["column", "row"]} h={"100vh"}>
      <VStack w={"full"}>
        <Box w="100%" h="80%" p="1rem" position={"relative"}>
          <Image
            src={
              songsArr[currentTrackIndex]
                ? songsArr[currentTrackIndex].cover
                : songsArr[0].cover
            }
            alt="cover"
            boxSize="100%"
          />
          <audio
            src={
              songsArr[currentTrackIndex]
                ? songsArr[currentTrackIndex].song
                : songsArr[0].song
            }
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            autoPlay={isPlaying}
            onEnded={handleEnded}
          >
            Your browser does not support the audio element.
          </audio>

          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onTimeChange={handleTimeChange}
          />

          <HStack w="full" h="4rem" justifyContent={"center"} gap={"1rem"}>
            <FaFastBackward
              size="2rem"
              cursor="pointer"
              onClick={playPreviousTrack}
            />
            {isPlaying ? (
              <FaPause size="3rem" cursor="pointer" onClick={pauseTrack} />
            ) : (
              <FaPlay size="3rem" onClick={playTrack} cursor="pointer" />
            )}
            <FaFastForward
              size="2rem"
              cursor="pointer"
              onClick={playNextTrack}
            />
          </HStack>
          <Box position={"absolute"} top={"5rem"} left={"2rem"}>
            <Heading>
              {songsArr[currentTrackIndex]
                ? songsArr[currentTrackIndex].title
                : "Song"}
            </Heading>
            <Text>
              {songsArr[currentTrackIndex]
                ? songsArr[currentTrackIndex].artist
                : "Artist"}
            </Text>
          </Box>
        </Box>
      </VStack>

      <VStack
        w={["full", "xl"]}
        alignItems={"stretch"}
        p={8}
        spacing={8}
        overflowY={"auto"}
      >
        {songsArr.map((item, index) => (
          <Button
            key={index}
            variant={"ghost"}
            colorScheme="purple"
            onClick={() => handleSongSelect(item, index)}
          >
            {item.title}
            {currentTrackIndex === index && isPlaying ? (
              <img src={gif} alt="gif" width="50px" />
            ) : undefined}
          </Button>
        ))}
      </VStack>
    </Stack>
  );
};

export default Audio;
