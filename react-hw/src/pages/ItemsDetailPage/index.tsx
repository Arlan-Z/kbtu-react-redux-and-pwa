import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getById, type Character } from "../../services/itemsService";

import Spinner from "../../components/Spinner";
import ErrorBox from "../../components/ErrorBox";

import "./ItemDetailsPage.css";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          setError("Invalid ID");
          setLoading(false);
          return;
        }

        const data = await getById(id);
        setItem(data);
      } catch (err) {
        setError("Character not found");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;
  if (!item) return <ErrorBox message="Not found" />;

  return (
    <div className="details-wrapper">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-card">
        <img className="details-image" src={item.image} alt={item.name} />

        <div className="details-info">
          <h1>{item.name}</h1>

          <p><strong>Status:</strong> {item.status}</p>
          <p><strong>Species:</strong> {item.species}</p>
          <p><strong>Gender:</strong> {item.gender}</p>
          <p><strong>Origin:</strong> {item.origin?.name}</p>
          <p><strong>Location:</strong> {item.location?.name}</p>
          <p><strong>Episodes:</strong> {item.episode.length}</p>
        </div>
      </div>
    </div>
  );
}
