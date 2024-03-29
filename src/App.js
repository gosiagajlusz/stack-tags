import "./App.css";
import { useQuery } from "@tanstack/react-query";
// import { fetchTags } from "./fetchTags";

//"https://jsonplaceholder.typicode.com/trololos"

const fetchTags = () =>
  fetch("https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow"
  ).then( (response) => response.json()
   )
.then (rJsn => console.log (rJsn.items) );
 
  //testowe api, z których działa -> mapuje po data
  //https://api.github.com/repos/TanStack/query/contributors
  //https://jsonplaceholder.typicode.com/todos

  


function App() {
  const { isLoading, error, rJsn } = useQuery({
    queryKey: ["trololo"],
    queryFn: fetchTags,
    // {staleTime:1000*10, },
  });

  return (
    <>
      <div className="app">
        placeholer
        {" "}
        
{/* //trzeba się dokopać do arraya, żeby można było mapować */}
{/* //ale nie działa tą metodą  */}
      {rJsn.items.map((trololo) => (
          <div>
            {" "}
            <h1>Name:{trololo.count}</h1>
            <h2>Count:{trololo.name}</h2>
          </div>
        ))} 
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
