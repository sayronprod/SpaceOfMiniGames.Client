import "./App.css";

function App() {
  return (
    <div className="grid-container">
      <div className="header">
        <h2>Header</h2>
      </div>

      <div className="left" style={{ backgroundColor: "lightblue" }}>
        Column
      </div>
      <div className="middle" style={{ backgroundColor: "red" }}>
        Column
      </div>

      <div className="footer">
        <p>Footer</p>
      </div>
    </div>
  );
}

export default App;
