import { TrackInfo } from "../../api/MusicApi";
import { PlayIcon } from "../Icons/PlayIcon";

export const TrackItem = (props: { track: TrackInfo }) => {
  return (
    <div className="track">
      <img
        className="track__cover"
        src={props.track.coverLink}
        alt={`Track ${props.track.name} cover`}
      />
      <div className="track__player">
        <div className="track__genre">{props.track.genre}</div>
        <PlayIcon />
        <figure>
          <figcaption>{props.track.name}</figcaption>
          <audio controls src={`${props.track.fileLink}`}></audio>
          <a href={`${props.track.fileLink}`}> Download audio </a>
        </figure>
      </div>
    </div>
  );
};
