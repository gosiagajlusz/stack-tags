import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "./fetchTags";

//"https://jsonplaceholder.typicode.com/trololos"

function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["trololo"],
    queryFn: fetchTags,
    // {staleTime:1000*10, },
  });

  return (
    <>
      <div className="app">
        placeholer
        {/* {" "}
        {data.items.map((trololo) => (
          <div>
            {" "}
            <h1>Name:{trololo.count}</h1>
            <h2>Count:{trololo.name}</h2>
          </div>
        ))} */}
      </div>
    </>
  );

  if (isLoading) {
    return "Trwa ładowanie...";
  }
  if (error) {
    return `Mamy błąd:${error.message}`;
  }
}

export default App;
