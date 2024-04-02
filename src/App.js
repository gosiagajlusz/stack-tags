import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";

const baseUrl = `https://api.stackexchange.com/2.3/tags?`;
const endUrl = `&site=stackoverflow`;
const setSortOrderDescending = `order=desc`;
const setSortUrlOrderAscending = `order=asc`;
const setSortNameDescending = `name=desc`;
const setSortNameAscending = `name=asc`;
const setSortActivityDescending = `order=asc&sort=activity`;
const setSortActivityAscending = `order=desc&sort=activity&site=stackoverflow`;

// const fetchTags = async (Order, Sort, stackoverflow) => {
//   const params = new URLSearchParams({
//     order: Order,
//     sort: Sort,
//     site: stackoverflow,
//   });
//   const response = await fetch(
//     `https://api.stackexchange.com/2.3/tags?${params}`
//   );
//   return response.json();
// };

function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: [
      "tags",
      // { order: Order },
      // { sort: Sort },
      // { site: stackoverflow },
    ],
    queryFn: async () =>
      // Order, Sort, stackoverflow
      {
        // const Sort = `popular`;
        // const Order = `desc`;
        // const stackoverflow = `stackoverflow`;
        // const params = new URLSearchParams({
        //   order: Order,
        //   sort: Sort,
        //   site: stackoverflow,
        // });
        const response = await fetch(
          `https://api.stackexchange.com/2.3/tags?&site=stackoverflow`
        );
        return response.json();
      },
  });
  const [perPage, setperPage] = useState("5");
  const { order, setOrder } = useState("");
  const nameAscending = `nameAscending`;
  const nameDescending = `nameDescending`;

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
            id="per-page-select"
            // onChange={handlePerPageChange}>
            onChange={(event) => setperPage(event.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
        </label>
      </form>
      <form>
        <label>
          Select order
          <select
            value={order}
            id="order-select"
            // onChange={handlePerPageChange}>
            onChange={(event) => setOrder(event.target.value)}
          >
            const SortPopularityDescending = `order=desc`; const
            setSortUrlOrderAscending = `order=asc`; const setSortNameDescending
            = `name=desc`; const setSortNameAscending = `name=asc`; const
            setSortActivityDescending = `order=asc&sort=activity`; const
            setSortActivityAscending =
            `order=desc&sort=activity&site=stackoverflow`; */}
            <option value={nameDescending}>NameDescending</option>
            <option value={nameAscending}>NameAscending</option>
            {/* <option value={`PopularityDescending`}>PopularityDescending</option>
            <option value={`PopularityAscending`}>PopularityAscending</option>
            <option value={`ActivityDescending`}>ActivityDescending</option>
            <option value={`ActivityAscending`}>ActivityAscending</option> */}
          </select>
        </label>
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
