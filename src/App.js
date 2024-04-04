import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// const baseUrl = `https://api.stackexchange.com/2.3/tags?`;
// const endUrl = `&site=stackoverflow`;
// const setSortOrderDescending = `order=desc`;
// const setSortUrlOrderAscending = `order=asc`;
// const setSortNameDescending = `name=desc`;
// const setSortNameAscending = `name=asc`;
// const setSortActivityDescending = `order=asc&sort=activity`;
// const setSortActivityAscending = `order=desc&sort=activity&site=stackoverflow`;

export const fetchTags = async (orderType, sortType, page) => {
  const params = new URLSearchParams({
    page: page,
    order: orderType,
    sort: sortType,
  });

  const response = await fetch(
    `https://api.stackexchange.com/2.3/tags?${params}&site=stackoverflow`
  );
  return response.json();
};

function App() {
  const [perPage, setperPage] = useState("5");
  const [sortType, setSortType] = useState("popular");
  const [orderType, setOrderType] = useState("desc");
  const [page, setPage] = useState(1);  

  const { isLoading, error, data } = useQuery({
    queryKey: ["tags", { order: orderType, sort: sortType, page: page }],
    queryFn: () => fetchTags(orderType, sortType, page),
  });

  if (isLoading) {
    return "Trwa ładowanie...";
  }
  if (error) {
    return `Mamy błąd:${error.message}`;
  }

  return (
    <>
      <form>
        <label>
          How many tags per Page
          <select
            value={perPage}
            onChange={(event) => setperPage(event.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </label>
      </form>
      <form>
        <label>
          Select sort type
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >            
            <option value={"name"}>Name</option>
            <option value={"popular"}>popularity</option>
            <option value={"activity"}>Activity</option>
          </select>
          <p>${sortType}</p>
        </label>
        <label>
          Select order type
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option disabled value="default">
              order
            </option>
            <option value={"asc"}>Ascending</option>
            <option value={"desc"}>Descending</option>
          </select>
          <p>${orderType}</p>
        </label>
      </form>
      <div className="app">
        <table>
          <tr>
            <th>Name</th>
            <th>Count</th>
          </tr>
          <tbody>
            {data.items.slice(0, perPage).map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>${page}</p>
      </div>
    </>
  );
}

export default App;
