import './DeleteModal.scss';
import closeButton from '../../assets/images/close-24px.svg'
import axios from 'axios'
import { useState } from 'react'
const API_URL = "http://localhost:8080";


function DeleteInventoryItem({inventoryItem, inventoryId, handleCloseModal}) {
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const handleDelete = (event) => {
        axios.delete(API_URL + `/inventories/inventory/${inventoryId}`).then((response) => {
            setSuccess("The Item Was Deleted Successfully!")
        }).catch((error) => {
            console.log(error)
            setError("Something Went Wrong! Please Try Again.")
        })
    }

    return (
        <div className="delete">
            <div className="delete__text">
                <img onClick={handleCloseModal} className="delete__close" src={closeButton}
                    alt='closing x' />
                <div className="delete__container">
                    <h2 className="delete__heading">Delete {inventoryItem} inventory item? </h2>
                    <p className="delete__confirmation">Please confirm that you'd like you delete {inventoryItem} from the inventory list. You won't be able to undo this action.
                    </p>
                </div>

                <div className="delete__buttons">
                    <p className="delete__message delete__message--success">{success}</p>
                    <p className="delete__message">{error}</p>
                    <button onClick={handleCloseModal} className="delete__cancel button button--cancel">Cancel</button>
                    <button onClick={handleDelete} className="delete__delete button button--delete">Delete</button>
                </div>
            </div>
        </div>



    )


}



export default DeleteInventoryItem;