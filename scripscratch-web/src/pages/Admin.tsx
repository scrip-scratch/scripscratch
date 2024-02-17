import { useState } from "react";
import { Layout } from "../components/Layout";

export const Admin = () => {
  const [name, setName] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [track, setTrack] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const handleSubmit = () => {};

  return (
    <Layout>
      <div className="upload-track">
        <h1>Upload track</h1>
        <form>
          <div>
            <label htmlFor="name">Track Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Genres (split by comma)</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="file"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};
