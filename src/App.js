import "./App.css";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["tags"],
    queryFn: () =>
      fetch(
        "https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow"
      ).then((response) => response.json()),
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
        <table>
          <tr>
            <th>Name</th>
            <th>Count</th>
          </tr>
          <tbody>
            {data?.items.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
