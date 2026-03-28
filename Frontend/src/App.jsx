import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(``)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll()
  }, [])

 async function reviewCode() {
  if (loading) return; // prevent multiple clicks

  setLoading(true);

  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const response = await axios.post(`${apiUrl}/ai/get-review`, { code });

    if (!response.data.success) {
      alert(response.data.error);
      return;
    }

    setReview(response.data.data);

  } catch (error) {
    console.error("Frontend error:", error);

    if (error.response && error.response.status === 429) {
      alert("API limit exceeded. Please try again later.");
    } else {
      alert("Something went wrong. Try again.");
    }
  } finally {
    setLoading(false);
  }
}

 return (
  <>
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              overflow: "auto",
              whiteSpace: "pre"
            }}
          />
        </div>

        
        <div
          onClick={reviewCode}
          className="review"
          style={{
            opacity: loading ? 0.6 : 1,
            pointerEvents: loading ? "none" : "auto"
          }}
        >
          {loading ? "Loading..." : "Review"}
        </div>

      </div>

      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {review}
        </Markdown>
      </div>
    </main>
  </>
);
}



export default App