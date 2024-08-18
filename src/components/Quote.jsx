import { useState, useEffect } from "react";
import { getQuote } from "../functions";

function Quote(model) {
  const [quote, setQuote] = useState("");
  useEffect(() => {
    const fetchQuote = async () => {
      const result = await getQuote(model.model);
      if (quote === "" && result !== undefined) {
        let res = result.substr(1, result.length - 4);
        setQuote(res);
      }
    };
    if (quote === "") fetchQuote();
  }, [model.model, quote]);

  if (quote === "") return null;

  return (
    <p className="text-3xl font-semibold bg-slate-950 bg-opacity-50 p-10">
      {quote}
    </p>
  );
}

export default Quote;
