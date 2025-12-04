import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import ErrorBox from "../../components/ErrorBox";
import Spinner from "../../components/Spinner";
import { fetchItems } from "../../features/items/itemsSlice";
import { type AppDispatch, type RootState } from "../../store";
import ItemCard from "./components/ItemCard";

import "./ItemsPage.css";

export default function ItemsPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";

  const dispatch = useDispatch<AppDispatch>();
  const { list, loadingList, errorList, query } = useSelector(
    (state: RootState) => state.items
  );

  useEffect(() => {
    dispatch(fetchItems(q));
  }, [dispatch, q]);

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
        value={query}
        onChange={handleSearchChange}
      />

      {loadingList && <Spinner />}
      {errorList && <ErrorBox message={errorList} />}

      {!loadingList && !errorList && (
        <div className="items-grid">
          {list.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}