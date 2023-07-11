'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../component/Post";

export default function Home() {
  const [title, setTitle] = useState('')
  const [posts, setPosts] = useState([] as any)

  useEffect(() => {
    getPosts()
  }, [])

  function getPosts() {
    axios.get('http://127.0.0.1:4000/posts').then(function (response: any) {

      setPosts(response.data);
    }).catch(function (error: Error) {
      console.log(error);
    });
  }

  function onSubmit() {
    console.log('Fez request !!');

    axios.post('http://127.0.0.1:4000/posts', {
      title,
    }).then(function (response: any) {
      setPosts([
        ...posts,
        response.data
      ])
      setTitle('')
      console.log(response);
    }).catch(function (error: Error) {
      console.log(error);
    });
  }
  return (
    <main className="h-screen">
      <div className="flex h-full bg-red-100 content-center justify-center flex-1">
        <div className="w-[1000px] mt-8">
          <h1 className="font-bold text-2xl text-gray-700">Blog Application</h1>
          <div className="rounded-md mt-4 p-5 gap-4 bg-white h-[400px] flex justify-between">
            <div className="flex-1">
              <h2 className="text-orange-500 text-lg mb-4">Create Post</h2>
              <form>
                <input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border mb-2 border-orange-400 block placeholder:text-gray-200 text-orange-300 rounded-md" type="text" placeholder="Title" name="title" />
                <button className="ml-auto px-4 py-2 bg-green-400 block text-white rounded-md" type="button" onClick={() => {
                  onSubmit()
                }}>Criar</button>
              </form>
            </div>
            <div className="flex-1 flex flex-col">
              <h2 className="text-orange-500 text-lg mb-4">Posts</h2>
              <div className="border border-cyan-300 p-1 flex-1 rounded-md">
                {posts.map((post: any) => (
                  <Post id={post.id} title={post.title} key={post.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
