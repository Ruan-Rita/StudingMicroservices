import axios from "axios"
import { useEffect, useState } from "react"

type IPost = {
    id: number
    title: string
}

type IComment = {
    id: number
    content: string

}
export default function Post({ title, id }: IPost) {
    const [comments, setComments] = useState([] as any)
    const [newComment, setNewComment] = useState('')

    async function getComments() {
        await axios.get('http://127.0.0.1:4001/posts/' + id + '/comments').then(function (response: any) {
            console.log('O que temos no comment');
            setComments(response.data);
        }).catch(function (error: Error) {
            console.log(error);
        });
    }

    function handleComment() {
        axios.post('http://127.0.0.1:4001/posts/' + id + '/comments', {
            content: newComment,
        }).then(function (response: any) {
            setComments([
                ...comments,
                response.data
            ])
            setNewComment('')
            console.log(response);
        }).catch(function (error: Error) {
            console.log(error);
        });
    }

    useEffect(() => {
        console.log(comments);
        getComments()
    }, [])

    return (
        <div className="bg-orange-100 px-2 mt-2 rounded-lg py-1 text-gray-600 font-semibold">
            <h1>{title}</h1>
            <div className="flex gap-2">
                <p className="text-gray-400">Comentar</p>
                <input value={newComment} onChange={e => setNewComment(e.target.value)} className="w-full px-4 py-0 border mb-2 border-orange-400 block placeholder:text-gray-200 text-orange-300 rounded-md" type="text" />
                <button type="button" onClick={handleComment}>Enviar</button>
            </div>
            <div className="text-right">
                {comments.map((comment: any) => (
                    <p id={comment.id} className="text-pink-300">{comment.content}</p>
                ))}
            </div>
        </div>
    )
}