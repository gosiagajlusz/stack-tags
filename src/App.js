import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "./fetchTags";

//"https://jsonplaceholder.typicode.com/trololos"

function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["trololo"],
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
      {/* <div className="app">
        {""}
        {data.map((trololo) => (
          <div>
            {""}
            <h1>ID:{trololo.id}</h1>
            <h2>login:{trololo.login}</h2>
          </div>
        ))}
      </div> */}
      <h1>Współautorzy Tanstack Query</h1>
      <table>
        <thead>
          <tr>
            <th>Login</th>
            <th>Wkład</th>
            </tr>
            <tbody>
              {data.map((trololo) => (
                <tr key={trololo.id}>
                  <td>{trololo.login}</td>
                  <td>{trololo.contributions}</td>
                </tr>
              ))}
            </tbody>
          
        </thead>
      </table>
    </>
  );

  //  (
  //
  // );
}

export default App;
