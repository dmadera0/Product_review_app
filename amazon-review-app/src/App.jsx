// App.js
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    product: "",
    useCase: "",
    experience: "",
    issues: "",
    recommend: "Yes",
    toneExample: "",
    tone: "friendly",
  });

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await axios.post("http://localhost:5000/generate-review", form);
    setReview(res.data.review);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "auto" }}>
      <h2>Amazon Review Generator</h2>

      {["product", "useCase", "experience", "issues", "toneExample"].map((key) => (
        <div key={key}>
          <label>{key.replace(/([A-Z])/g, " $1")}:</label><br />
          <textarea name={key} value={form[key]} onChange={handleChange} rows={key === "experience" ? 4 : 2} style={{ width: "100%", marginBottom: "1rem" }} />
        </div>
      ))}

      <label>Recommend?</label>
      <select name="recommend" value={form.recommend} onChange={handleChange}>
        <option>Yes</option>
        <option>No</option>
      </select>

      <br /><br />

      <label>Tone</label>
      <select name="tone" value={form.tone} onChange={handleChange}>
        <option>friendly</option>
        <option>professional</option>
        <option>casual</option>
        <option>enthusiastic</option>
      </select>

      <br /><br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Generating..." : "Generate Review"}
      </button>

      {review && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Your Review:</h3>
          <pre style={{ background: "#f4f4f4", padding: "1rem" }}>{review}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
