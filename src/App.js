import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { suggestions } from "./components/SearchBar/suggestions";

import AccordionPanel from "./components/AccordionPanel/AccordionPanel";
import Carousel from "./components/Carousel/Carousel";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import SearchBar from "./components/SearchBar/SearchBar";
import Tooltip from "./components/Tooltip/Tooltip";
import Stepper from "./components/Stepper/Stepper";
import SortableTable from "./components/SortableTable/SortableTable";

function App() {
  const [carouselContent, setCarouselContent] = useState([]);
  const [progressBarProgress, setProgressBarProgress] = useState(0);

  //setup Carousel
  const content = useMemo(
    () => [
      <img src="https://picsum.photos/200/300" alt="Item 1" />,
      <img src="https://picsum.photos/200" alt="Item 2" />,
      <img src="https://picsum.photos/250/300" alt="Item 3" />,
      <img src="https://picsum.photos/200/250" alt="Item 4" />,
    ],
    []
  );

  useEffect(() => {
    function preloadImagesAndSetContent(content) {
      return Promise.all(
        content.map(
          (imgElement) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = imgElement.props.src;
              img.onload = resolve;
            })
        )
      );
    }

    preloadImagesAndSetContent(content).then(() => {
      setCarouselContent(content);
    });
  }, [content]);

  //setup ProgressBar
  useEffect(() => {
    const timer = setInterval(() => {
      setProgressBarProgress((progress) =>
        progress + 1 <= 100 ? progress + 1 : 0
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  //setup Stepper
  const stepperComponents = [
    <div className="userInfodiv-container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
    </div>,
    <div className="addressdiv-container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" required />

        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" required />

        <label htmlFor="zip">Zip Code:</label>
        <input type="text" id="zip" name="zip" required />
      </div>
    </div>,
    <div className="paymentdiv-container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" name="cardNumber" required />

        <label htmlFor="expDate">Expiration Date:</label>
        <input type="text" id="expDate" name="expDate" required />

        <label htmlFor="cvv">CVV:</label>
        <input type="text" id="cvv" name="cvv" required />
      </div>
    </div>,
  ];

  //setup SortableTable
  const sortableTableData = [
    { name: "John", age: 28, city: "New York", state: "NY" },
    { name: "Jane", age: 24, city: "Los Angeles", state: "CA" },
    { name: "Doe", age: 22, city: "Chicago", state: "IL" },
    { name: "Alice", age: 30, city: "Houston", state: "TX" },
    { name: "Bob", age: 26, city: "Phoenix", state: "AZ" },
    { name: "Charlie", age: 32, city: "Philadelphia", state: "PA" },
    { name: "Diana", age: 21, city: "San Antonio", state: "TX" },
    { name: "Evan", age: 34, city: "San Diego", state: "CA" },
    { name: "Fiona", age: 29, city: "Dallas", state: "TX" },
    { name: "George", age: 27, city: "San Jose", state: "CA" },
  ];

  const sortableTableColumns = [
    { key: "name", name: "Name" },
    { key: "age", name: "Age" },
    { key: "city", name: "City" },
    { key: "state", name: "State" },
  ];

  return (
    <div className="App">
      <div className="main-content">
        <div style={{ padding: "10px" }}>
          <div className="flex-grid">
            {/* AccodionPanel (no video) */}
            <div className="grid-item">
              <AccordionPanel title={"AccordionPanel"}>
                <ul onClick={() => (window.location = "https://www.test.com")}>
                  <li>Click the title bar to minimize</li>
                  <li>
                    Remove the prop "<code>expanded</code>" or set to "
                    <code>false</code>" to load in collapsed state
                  </li>
                </ul>
              </AccordionPanel>
            </div>
            {/* Carousel */}
            <div className="grid-item">
              <AccordionPanel title={"Carousel"}>
                <div>
                  <Carousel
                    content={carouselContent}
                    itemsPerSlide={1}
                    title={"Optional Title"}
                    autoSlideTimer={5000}
                    maxHeight={200}
                  ></Carousel>
                  <ul>
                    <li>
                      Includes swiping functionality for mobile devices and
                      touchscreens
                    </li>
                    <li>Option to have multiple items per slide</li>
                    <li>
                      Optional "<code>autoSlideTimer</code>" prop to slide
                      through photos on a timer
                    </li>
                  </ul>
                  <div className="grid-item--link">
                    <a href="https://www.youtube.com/watch?v=CuTy-CrIguQ">
                      View Tutorial on YouTube
                    </a>
                  </div>
                </div>
              </AccordionPanel>
            </div>
            {/* ProgressBar */}
            <div className="grid-item">
              <AccordionPanel title={"ProgressBar"}>
                <div>
                  <ProgressBar progress={progressBarProgress} />
                  <div className="grid-item--link">
                    <a href="https://www.youtube.com/watch?v=q6yip5ujGMk">
                      View Tutorial on YouTube
                    </a>
                  </div>
                </div>
              </AccordionPanel>
            </div>
            {/* SearchBar */}
            <div className="grid-item">
              <AccordionPanel title={"SearchBar"} maxHeight={"500px"}>
                <div>
                  <p>Fuzzy Search Enabled: </p>
                  <SearchBar
                    suggestions={suggestions}
                    onChange={() => {}}
                    fuzzySearch={true}
                  />
                  <p>Fuzzy Search Disabled: </p>
                  <div style={{ position: "relative", zIndex: 9 }}>
                    <SearchBar suggestions={suggestions} onChange={() => {}} />
                  </div>
                  <ul>
                    <li>Accepts suggestions as an array of strings</li>
                    <li>
                      Option to perdiv fuzzy or strict search on suggestions
                      with "<code>fuzzySearch</code>" prop
                    </li>
                    <li>
                      Handles input field state change internally with support
                      for passing back to parent onChange
                    </li>
                  </ul>
                  <div className="grid-item--link">
                    <a href="https://www.youtube.com/watch?v=R090JocSekQ">
                      View Tutorial on YouTube
                    </a>
                  </div>
                </div>
              </AccordionPanel>
            </div>
            {/* Tooltip */}
            <div className="grid-item">
              <AccordionPanel title={"Tooltip"} maxHeight={"500px"}>
                <div>
                  <Tooltip text="This is a tooltip">
                    <span
                      style={{
                        textAlign: "center",
                        border: "1px solid #000",
                        padding: "5px",
                      }}
                    >
                      Hover
                    </span>
                  </Tooltip>

                  <div className="grid-item--link">
                    <a href="https://www.youtube.com/watch?v=EyJ8xdGR-X0">
                      View Tutorial on YouTube
                    </a>
                  </div>
                </div>
              </AccordionPanel>
            </div>
            {/* Stepper (no video) */}
            <div className="grid-item">
              <AccordionPanel title={"Stepper"} maxHeight={"500px"}>
                <div style={{ justifySelf: "center" }}>
                  <Stepper steps={stepperComponents} />
                  <ul>
                    <li>
                      Used to step through an array of provided components.
                    </li>
                  </ul>
                </div>
              </AccordionPanel>
            </div>
            {/* SortableTable (no video) */}
            <div className="grid-item">
              <AccordionPanel title={"SortableTable"} maxHeight={"500px"}>
                <div>
                  <SortableTable
                    data={sortableTableData}
                    columns={sortableTableColumns}
                    rowsPerPage={5}
                  />
                  <ul></ul>
                </div>
              </AccordionPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
