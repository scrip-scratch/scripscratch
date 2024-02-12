import axios from "axios";

export type TrackInfo = {
  name: string;
  genre: string[];
  year: string;
  fileLink: string;
  coverLink: string;
};

class MusicApi {
  public async getAllMusic() {
    const endpoint = import.meta.env.VITE_SERVER_URL + "/music";

    try {
      const response = await axios.get(endpoint);
      const musicItems: TrackInfo[] = [];
      const responseData: any[] = response.data;
      responseData.forEach((dataItem: any) => {
        const musicItem: TrackInfo = {
          name: dataItem.acf.name,
          genre: dataItem.acf.genre.split(", "),
          year: "",
          fileLink: dataItem.acf.track_file.link,
          coverLink: dataItem.acf.cover.link,
        };
        musicItems.push(musicItem);
      });
      return musicItems;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export const musicApi = new MusicApi();
