import "./App.css";
import { useQuery } from "@tanstack/react-query";

//"https://jsonplaceholder.typicode.com/trololos"
// const fetchTags =
// .then ((data) => return data)
// .then(function (rJsn) {
//   let xd = rJsn.items;
// });
//testowe api, z których działa -> mapuje po data
//https://api.github.com/repos/TanStack/query/contributors
//https://jsonplaceholder.typicode.com/todos

function App() {
  const {
    // isLoading, error,
    data,
  } = useQuery({
    queryKey: ["trololo"],
    queryFn: () =>
      fetch(
        "https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow"
      ).then((response) => response.json()),
    // .then((data) => console.log(data.items)),
    // .then((data.items.array.forEach(element => {
    //   console.log(element.name)
    // })))
    // fetchTags,
    // {staleTime:1000*10, },
  });

  // console.log(data.items);

  return (
    <>
      <div className="app">
        <table>
          <tr>
            <th>Name</th>
            <th>Count</th>
          </tr>
          {/* //dodatkowe */}
          <tbody>
          {data?.items.map((item) => (
            <tr key={item.name}>
            <td>{item.name}</td>
            <td>{item.count}</td>
            </tr>))}

          </tbody>
                    {/* //dodatkowe */}

        {data?.items.map((item) => (
          <div>
            {/* {" "} */}
            <h1>Name:{item.name}</h1>
            
          </div>
        ))}
        </table>
      </div>
    </>
  );

  // if (isLoading) {
  //   return "Trwa ładowanie...";
  // }
  // if (error) {
  //   return `Mamy błąd:${error.message}`;
  // }
}

export default App;
