import styles from './SearchBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState } from "react";

export default function SearchBar({ cityName, search, setCityName, errorMessage }) {

    const [noInput, setNoInput] = useState(false)  // A boolean that represents whether a city name was given

    const handleSubmit = (e, city) => {
        e.preventDefault();
        if (city) {  // Check if the input is not empty
            if (noInput) {
                setNoInput(false)
            }
            search(city);
        } else {
            setNoInput(true)
            // return
        }
    }

  return (
    <div className="container-md py-5 border-bottom">
        <div className="row">
            <div className="col-lg-5 mx-auto colContainer">
                <div>
                    <form 
                          className="w-75 mx-auto border d-flex"
                          onSubmit={e => handleSubmit(e, cityName)}>
                        <input 
                            type="text"
                            className={["w-75 p-2 ps-3", styles.input].join(" ")}
                            id="searchbar" 
                            name="searchbar" 
                            value={cityName} 
                            onChange={e => setCityName(e.target.value)} 
                            placeholder="Enter a city..."  />
                        <button type="submit" className={["w-25", styles.submitBtn].join(" ")}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                    {/* Display the below only if no city name was given */}
                    {noInput && !errorMessage && <p className="text-center text-danger">Please enter a valid city name</p>}
                    {/* For any errors */}
                    {errorMessage && <p className="text-center text-danger">
                        Error: Please check your API key, ensure the location is correct, or try again later.
                        </p>}
                </div>
            </div>
        </div>
    </div>
  )
}