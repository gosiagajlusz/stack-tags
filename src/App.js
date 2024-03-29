import "./App.css";
import { useQuery } from "@tanstack/react-query";

const baseUrl = `https://api.stackexchange.com/2.3/tags?`;
const endUrl = `&site=stackoverflow`;
const setSortUrl = `order=desc`;

function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["tags"],
    queryFn: () =>
      fetch(
        `${baseUrl}+${endUrl}`
        // "https://api.stackexchange.com/2.3/tags?&site=stackoverflow"
        //
        // "https://api.stackexchange.com/2.3/tags?order=desc&=popular&site=stackoverflow"
      ).then((response) => response.json()),
  });

  const perPage = 5;
  //zmienić, żeby było wybieralne

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
            {data?.items.slice(0, perPage).map((item) => (
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
