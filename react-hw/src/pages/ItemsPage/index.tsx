import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchItems, type Character } from "../../services/itemsService";

import Spinner from "../../components/Spinner";
import ErrorBox from "../../components/ErrorBox";
import ItemCard from "./components/ItemCard";

import "./ItemsPage.css";

export default function ItemsPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";

  const [items, setItems] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const data = await searchItems(q);
        setItems(data);
      } catch (err) {
        setError("Nothing found or API error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [q]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setParams({ q: e.target.value });
  }

  return (
    <div className="items-wrapper">
      <h1 className="items-title">Characters</h1>

      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={q}
        onChange={handleSearchChange}
      />

      {loading && <Spinner />}
      {error && <ErrorBox message={error} />}

      {!loading && !error && (
        <div className="items-grid">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
