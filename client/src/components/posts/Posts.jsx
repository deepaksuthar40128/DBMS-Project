import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

import { useEffect } from "react";

const Posts = ({ url }) => {
  console.log(url)
  const { isLoading, error, data, refetch } = useQuery(["posts"], () =>
    makeRequest.get(url).then((res) => res.data)
  );

  useEffect(() => {
    refetch();
  }, [url, refetch]);

  return (
    <div className="posts">
      {error ? (
        "Something went wrong!"
      ) : isLoading ? (
        "Loading"
      ) : (
        data.map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
};


export default Posts;
