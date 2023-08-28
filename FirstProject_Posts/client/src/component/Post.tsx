import axios from "axios"
import { useState } from "react"

type IPost = {
    id: number
    title: string
    comments: string[]
    onComment: (newComment: string) => void
}

export default function Post({ title, id, comments, onComment }: IPost) {
    const [newComment, setNewComment] = useState('')

    function handleComment() {
        axios.post('http://posts.com/posts/' + id + '/comments', {
            content: newComment,
        }).then(function (response: any) {
            onComment(newComment)
            setNewComment('')
            console.log(response);
        }).catch(function (error: Error) {
            console.log(error);
        });
    }

    function renderCommentContent(comment: any) {
        console.log('Comment: ', comment);

        if (comment.status === 'approved') return comment.content
        else if (comment.status === 'rejected') return "This comment has been rejected!"
        else return "This comment is awaiting moderation"
    }

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
                    <p id={comment.id} className="text-pink-300">{renderCommentContent(comment)}</p>
                ))}
            </div>
        </div>
    )
}