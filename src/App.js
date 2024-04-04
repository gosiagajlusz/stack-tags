import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "evergreen-ui";
import { Table } from "evergreen-ui";
import { Select } from "evergreen-ui";


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
      <div className="container">
        <h1>Tags Browser</h1>
        <div className="customizing">
          <label className="label">
            How many tags per page
            <Select
              value={perPage}
              onChange={(event) => setperPage(event.target.value)}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </Select>
          </label>

          <label className="label">
            Select sort type
            <Select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value={"name"}>Name</option>
              <option value={"popular"}>popularity</option>
              <option value={"activity"}>Activity</option>
            </Select>
          </label>
          <label className="label">
            Select order type
            <Select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
            >
              <option disabled value="default">
                order
              </option>
              <option value={"asc"}>Ascending</option>
              <option value={"desc"}>Descending</option>
            </Select>
          </label>
        </div>
        <div className="app">
          <Table>
            <tr>
              <th>Name</th>
              <th>Count</th>
            </tr>
            <tbody>
              {/* //odkomentować!!! */}
              {/* {data.items.slice(0, perPage).map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.count}</td>
              </tr>
            ))} */}
            </tbody>
          </Table>
          <div className="pagination">
            <Button onClick={() => setPage(page - 1)}>previous page</Button>
            <Button onClick={() => setPage(page === 1)}>1</Button>
            <Button onClick={() => setPage(page === 2)}>2</Button>
            <Button onClick={() => setPage(page === 3)}>3</Button>
            <Button onClick={() => setPage(page + 1)}>next page</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
