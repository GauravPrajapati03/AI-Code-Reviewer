import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "react-simple-code-editor";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState(``);
  const [isloading, setIsLoading] = useState(false);

  async function getReview() {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/ai/get-review`,
        { code }
      );
      setReview(response.data);
      // console.log(response.data)
    } catch (error) {
      console.log("Error in fetching data", error);
    } finally {
      setIsLoading(false);
    }
  }

  const placeholderStyle = {
    position: "absolute",
    top: "10px",
    left: "10px",
    color: "#999",
    pointerEvents: "none",
    display: code ? "none" : "block",
  };

  useEffect(() => {
    prism.highlightAll();
  });

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <div style={placeholderStyle}>Enter You Code</div>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira Mono", "Fira code", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            ></Editor>
          </div>
          <div onClick={getReview} className="review">
            Review
          </div>
        </div>
        <div className="right">
          {isloading ? (
            <div className="loader"></div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
