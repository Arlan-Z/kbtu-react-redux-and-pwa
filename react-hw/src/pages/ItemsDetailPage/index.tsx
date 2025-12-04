import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ErrorBox from "../../components/ErrorBox";
import Spinner from "../../components/Spinner";
import { fetchItemById } from "../../features/items/itemsSlice";
import { type AppDispatch, type RootState } from "../../store";

import "./ItemDetailsPage.css";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { selectedItem, loadingItem, errorItem } = useSelector(
    (state: RootState) => state.items
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchItemById(id));
    }
  }, [dispatch, id]);

  if (!id) return <ErrorBox message="Invalid ID" />;
  if (loadingItem) return <Spinner />;
  if (errorItem) return <ErrorBox message={errorItem} />;
  if (!selectedItem) return <ErrorBox message="Not found" />;

  return (
    <div className="details-wrapper">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-card">
        <img className="details-image" src={selectedItem.image} alt={selectedItem.name} />

        <div className="details-info">
          <h1>{selectedItem.name}</h1>

          <p><strong>Status:</strong> {selectedItem.status}</p>
          <p><strong>Species:</strong> {selectedItem.species}</p>
          <p><strong>Gender:</strong> {selectedItem.gender}</p>
          <p><strong>Origin:</strong> {selectedItem.origin?.name}</p>
          <p><strong>Location:</strong> {selectedItem.location?.name}</p>
          <p><strong>Episodes:</strong> {selectedItem.episode.length}</p>
        </div>
      </div>
    </div>
  );
}