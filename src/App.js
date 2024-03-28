import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "./fetchTags";

//"https://jsonplaceholder.typicode.com/todos"

function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["todo"],
    queryFn: fetchTags,
  });
  if (isLoading) {
    return "Trwa ładowanie...";
  }
  if (error) {
    return `Mamy błąd:${error.message}`;
  }

  return (
    <>
      <div className="app">
        {""}
        {data.map((todo) => (
          <div>
            {""}
            <h1>ID:{todo.id}</h1>
            <h2>login:{todo.login}</h2>
          </div>
        ))}
      </div>
    </>
  );

  return null;
  //  (
  //
  // );
}

export default App;
