function ProgressBar({ currentTime, duration, onTimeChange }) {
  const handleTimeChange = (e) => {
    onTimeChange(e.target.value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div
      style={{ width: "100%", marginTop: "1rem", backgroundColor: "#121212" }}
    >
      <input
        style={{ width: "100%" }}
        type="range"
        value={currentTime}
        max={duration}
        onChange={handleTimeChange}
      />
      <span>{formatTime(currentTime)}</span> /{" "}
      <span>{formatTime(duration)}</span>
    </div>
  );
}

export default ProgressBar;
