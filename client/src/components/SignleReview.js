import { useState } from "react"

export default function SingleReview({ r, setReviews }) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let date = new Date(r.created_at)
    let day = date.getDate()
    let month = months[date.getMonth()]
    let year = date.getFullYear()
    const dateString = `${month} ${day}, ${year}`
    const [isEditing, setIsEditing] = useState(false)
    const [editedReview, setEditedReview] = useState({
        review: ''
    })
    console.log(r)


    async function handleDelete(id) {
        await fetch(`/reviews/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setReviews(data)
        })
    }
    
    async function handleEdit() {
        setIsEditing(true)
    }
    
    function handleCancelEdit() {
        setIsEditing(false)
    }

    function handleChange(e){
        setEditedReview({
            [e.target.name]: e.target.value
        })
    }
    
    async function handleSubmitEdit(e, id) {
        e.preventDefault()
        await fetch(`/reviews/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedReview)
        })
        .then(response => response.json())
        .then(data => {
            setReviews(data)
            setIsEditing(false)
        })
        setEditedReview({review: ''})
    }
    return (
        <li className="profile-game-reviews-li">
        {isEditing ? (
        <form className="login-signup-form">
        <textarea rows="5" cols="50" name="review" value={editedReview.review} onChange={handleChange} style={{ width: "250px", height: "100px" }}/><br/>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <button onClick={(e) => handleSubmitEdit(e, r.id)}>Submit Edit</button>
            <button onClick={() => handleCancelEdit()} style={{marginLeft: "10px"}} >❌</button>
        </div>
        </form>) 
        : 
        <>
        <span style={{wordWrap: "break-word", maxWidth: "60%"}}>"{r.review}" on {dateString}</span>
        <div style={{padding: "10px 0 10px 0" }}>
        <button style={{ marginRight: "15px" }} onClick={() => handleDelete(r.id)}>🗑️</button>
        <button onClick={() => handleEdit(r.id)}>✏️</button>
        </div> 
        </>
        }
        </li>
    )
}