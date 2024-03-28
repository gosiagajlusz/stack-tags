export const fetchTags = () =>
  fetch("https://api.github.com/repos/TanStack/query/contributors").then(
    (response) => response.json()
  );
