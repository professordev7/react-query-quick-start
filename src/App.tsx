import { useMutation, useQuery } from "@tanstack/react-query";
import "./App.css";

function App() {
  const userData = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return fetch("https://jsonplaceholder.typicode.com/users").then(
        (response) => response.json()
      );
    },
  });

  const mutatePost = useMutation({
    mutationKey: ["posts"],
    mutationFn: (newPost: any) => {
      return fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
    },
  });

  return (
    <>
      <div>
        <button onClick={() => userData.refetch()}>Get Users</button>
        <div>
          {userData.isFetching && <div>Fetching user data...</div>}
          {userData.isError && <div>{`Error get data!!!`}</div>}
          {userData.data &&
            userData.data.length > 0 &&
            userData.data.map((user: any) => <div>{user.name}</div>)}
        </div>
        <hr />
        <div>
          <button
            onClick={() =>
              mutatePost.mutate({
                title: "First Post",
                body: "First Post Body",
                userId: 1,
              })
            }
          >
            Add New Post
          </button>
          <div>
            {mutatePost.isPending && <div>Adding new post...</div>}
            {mutatePost.isError && <div>{`Error add new post!!!`}</div>}
            {mutatePost.data && (
              <div>{`Success add new post with title : '${mutatePost.data.title}'`}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
