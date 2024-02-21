import { Button, Container, HStack, Input, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiUpload } from "react-icons/bi";
import storage from "../firebaseConfig.js";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Upload = () => {
  const [songFile, setSongFile] = useState("");
  const [cover, setCover] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [songPercent, setSongPercent] = useState(0);
  const [coverPercent, setCoverPercent] = useState(0);
  const [songURL, setSongURL] = useState("");
  const [coverURL, setCoverURL] = useState("");

  const coverRef = useRef();
  const songRef = useRef();

  const handleSongChange = (event) => {
    setSongFile(event.target.files[0]);
  };

  const handleCoverChange = (event) => {
    setCover(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !artist || !cover || !songFile) {
      alert("Please fill in all fields");
      return;
    }

    uploadFile("song");
    uploadFile("cover");
  };

  const uploadFile = async (file) => {
    let storageRef = ref(storage, `/covers/${cover.name}`);
    let uploadTask = uploadBytesResumable(storageRef, cover);

    if (file === "song") {
      storageRef = ref(storage, `/songs/${songFile.name}`);
      uploadTask = uploadBytesResumable(storageRef, songFile);
    }

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        if (file === "song") {
          setSongPercent(percent);
        } else {
          setCoverPercent(percent);
        }
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          if (file === "song") {
            setSongURL(url);
          } else {
            setCoverURL(url);
          }
        });
      }
    );
  };

  // Push Function
  const push = useCallback(async () => {
    await fetch(
      "https://music-player-7e9fc-default-rtdb.firebaseio.com/tracks.json",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          artist,
          cover: coverURL,
          song: songURL,
        }),
      }
    );

    alert("files saved successfully");
    // Clear form after successful upload
    setTitle("");
    setArtist("");
    setCover("");
    setSongFile("");
    setSongURL("");
    setCoverURL("");
    setCoverPercent(0);
    setSongPercent(0);
    songRef.current.value = "";
    coverRef.current.value = "";
  }, [artist, title, songURL, coverURL]);

  useEffect(() => {
    if (songURL && coverURL) {
      push();
    }
  }, [push, songURL, coverURL]);

  return (
    <Container maxW={"container.xl"} h={"100vh"} p={16}>
      <VStack color={"purple.500"} h={"full"} justifyContent={"center"}>
        <BiUpload size={"20vmax"} />

        <form>
          <VStack>
            <Input
              required
              type={"text"}
              name="title"
              value={title}
              placeholder="Song name"
              onChange={handleTitleChange}
            />
            <Input
              required
              type={"text"}
              name="artist"
              value={artist}
              placeholder="Artist"
              onChange={handleArtistChange}
            />

            <HStack mt={"1rem"}>
              <Input
                required
                type={"file"}
                accept="image/*"
                onChange={handleCoverChange}
                ref={coverRef}
              />
              <input type="text" readOnly placeholder="Select Cover Photo" />
            </HStack>

            <HStack>
              <Input
                required
                type={"file"}
                accept="audio/*"
                onChange={handleSongChange}
                ref={songRef}
              />
              <input type="text" readOnly placeholder="Select Song File" />
            </HStack>

            <Button
              colorScheme={"purple"}
              type={"submit"}
              onClick={handleUpload}
            >
              Upload
            </Button>
            <p>Cover upload {coverPercent} % done</p>
            <p>Song upload {songPercent} % done</p>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default Upload;
