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
      )
        .then((response) => response.json())
        .then((data) => console.log(data.items)),

    // .then((data.items.array.forEach(element => {
    //   console.log(element.name)
    // })))

    // fetchTags,
    // {staleTime:1000*10, },
  });

  return (
    <>
      <div className="app">
        placeholer{" "}
        
        {data.items.map((item) => (
          <div>
            {" "}
            <h1>Name:{item.name}</h1>
          </div>
        ))}
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
