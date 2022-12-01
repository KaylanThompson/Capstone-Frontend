import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../api/books";
import { addBookToCart, saveLocalCart, updateBookQuantity } from "../api/carts";

const BookPage = ({ user, cart, setCart }) => {
    const [book, setBook] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const {itemId} = useParams()

    useEffect(() => {
        async function callGetBook() {
            const bookData = await getBook(itemId)
            setBook(bookData)
        }
        callGetBook()
    },[])

    async function handleAdd(event) {
        event.preventDefault()
        const indexInCart = cart.items.findIndex((elem) => elem.itemId === book.id)
        console.log("*", cart.userId, "**", indexInCart);
        //make the api call to add the item (either a real add or a update quanity)
        if (cart.userId) {
            if (indexInCart === -1) {
                const newCartItem = await addBookToCart({cartId: cart.id, itemId: book.id, quantity})
                const newCart = {...cart}
                newCart.items.push(newCartItem)
                setCart(newCart)
            } else {
                const newCartItem = await updateBookQuantity({cartItemId: cart.items[indexInCart].id, quantity: cart.items[indexInCart].quantity + Number(quantity)})
                const newCart = {...cart};
                newCart.items[indexInCart].quantity = newCartItem.quantity
                setCart(newCart)
            }
        } else {
            console.log("in the else");
            if (indexInCart === -1) {
                console.log("in the if");
                const newCartItem = {...book, itemId: book.id, quantity: quantity}
                delete newCartItem.id
                const newCart = {...cart}
                newCart.items.push(newCartItem)
                setCart(newCart)
                saveLocalCart(newCart)
            } else {
                console.log("in the else");
                const newCart = {...cart}
                newCart.items[indexInCart].quantity += Number(quantity)
                setCart(newCart)
                saveLocalCart(newCart)
            }
        }
    }

    return (
        <div className="book_page">
            {book ? 
                <>
                    <h1>{book.title}<small>{book.author}</small></h1>
                    <div>
                        <img src={book.imageURL} />
                        <div className="next_to_picture">
                            <p>${book.price/100}</p>
                            <input type='number' value={quantity} onChange={(elem) => setQuantity(elem.target.value)}/>
                            <button onClick={(handleAdd)}>Add to 🛒</button>
                        </div>
                    </div>
                    <p>{book.description}</p>
                </>
            : null}
        </div>
    )

}

export default BookPage