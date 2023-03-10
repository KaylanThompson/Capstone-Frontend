import React from "react";
import { deleteBook } from "../api/books";
import { useNavigate } from "react-router-dom";
import { updateBookQuantity } from "../api/carts";

//Deleting book from book list, only available for admin
const DeleteBookButton = ({book, bookList, setBookList}) => {

    //This button/component is available via the AdminBooksList page to delete any book in the database.

    async function handleDelete(event){
        event.preventDefault()
        const removedBook = await deleteBook(book.id)
        
        if (removedBook){
            const updatedBooks = bookList.filter((book) =>{
                if (book.id == removedBook.id){
                    return false
                }
                return true
            })
            setBookList(updatedBooks)
        }
    }

    return (
        <button onClick={handleDelete}>Delete Book</button>
    )

}

export default DeleteBookButton