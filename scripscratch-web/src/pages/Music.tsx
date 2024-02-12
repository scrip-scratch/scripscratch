import { useEffect, useState } from "react";
import { TrackInfo, musicApi } from "../api/MusicApi";
import { Layout } from "../components/Layout";
import { TrackItem } from "../components/Music/TrackItem";

export const Music = () => {
  const [tracks, setTracks] = useState<TrackInfo[]>([]);

  const getMusic = async () => {
    const response = await musicApi.getAllMusic();

    if (response) {
      setTracks(response);
    }
  };

  useEffect(() => {
    getMusic();
  }, []);

  return (
    <Layout>
      <div className="container">
        {tracks.map((track, index) => {
          return <TrackItem track={track} key={`track_${index}`} />;
        })}
      </div>
    </Layout>
  );
};
