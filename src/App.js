import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
  const [perPage, setperPage] = useState("5");

  // const perPage = 5;
  //zmienić, żeby było wybieralne

  if (isLoading) {
    return "Trwa ładowanie...";
  }
  if (error) {
    return `Mamy błąd:${error.message}`;
  }

  return (
    <>
      <form>
        {/* <InputLabel id="per-page-label">Per Page</InputLabel> */}
        <select
          labelId="per-page-label"
          value={perPage}
          id="per-page-select"
          // onChange={handlePerPageChange}>
          onChange={(event) => setperPage(event.target.value)}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </form>
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
