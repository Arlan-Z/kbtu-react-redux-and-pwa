import { type Character } from "../../../../services/itemsService";
import { Link } from "react-router-dom";
import "./ItemCard.css";

interface Props {
  item: Character;
}

export default function ItemCard({ item }: Props) {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>

      <p>{item.species}</p>

      <Link to={`/items/${item.id}`} className="details-link">
        View Details
      </Link>
    </div>
  );
}
