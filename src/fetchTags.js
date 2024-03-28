

export const fetchTags = () =>
  fetch("https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow"
  ).then( (response) => response.json()
   )
.then (rJsn => console.log (rJsn.items) );
 


  //testowe api
  //https://api.github.com/repos/TanStack/query/contributors
  // https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow
  