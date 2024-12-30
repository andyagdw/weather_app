// Styles
import styles from "./SearchBar.module.css";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// Context
import { AppContext } from "../../context/AppContext";
// React
import { useContext } from "react";

export default function SearchBar({ cityName, setCityName, search }) {
  const [ , errorMessage] = useContext(AppContext);

  const handleSubmit = e => {
    e.preventDefault();
    if (cityName.trim() === "") return
      search(cityName);
    }

  return (
    <div className="container-md py-5 border-bottom">
      <div className="row">
        <div className="col-lg-5 mx-auto colContainer">
          <div>
            <search>
              <form
                className="w-75 mx-auto border d-flex"
                onSubmit={handleSubmit}
                aria-label="Get weather data"
              >
                <input
                  type="search"
                  className={["w-75 p-2 ps-3", styles.input].join(" ")}
                  id="searchbar"
                  name="q"
                  value={cityName}
                  onChange={e => setCityName(e.target.value)}
                  placeholder="Enter a city name..."
                />
                <button
                  type="submit"
                  className={["w-25", styles.submitBtn].join(" ")}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>
            </search>
            {/* For any errors */}
            {errorMessage && (
              <p className="text-center text-danger">
                Error: Please check your API key, ensure the location is
                correct, or try again later.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
