import { TrackInfo } from "../../api/MusicApi";

export const TrackItemSceleton = () => {
  return (
    <div className="track--sceleton">
      <div className="track__cover">
        <img src="" alt="" />
      </div>
      <div className="track__player">
        <div className="track__genre"></div>
      </div>
    </div>
  );
};
