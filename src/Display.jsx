import { useState, useEffect } from 'react';


export default function Display() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editID, setEditID] = useState();
    const [isModalOpen, setisModalOpen] = useState(false);

    const api_url = 'http://localhost:8080/api/product'
    useEffect(() => {
        fetch(api_url) //1. get raw json data from the server
            .then((response)=> response.json())  //2. convert it to a readable format for js
            .then((data) => {
                setProducts(data);  //3. put the data in a variable
            })
            .catch((err)=>err)
    }, []);   //to ensure that it will run at once only

    //post method
    async function formSubmit(event) {
        event.preventDefault() //prevent refresh
        console.log(name);
        try {
            const response = await fetch(api_url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    price: price
                })
            })

            const data = await response.json();
            setProducts((prod) => [...prod, data]);
        } catch (err) {
            console.log(err);
        }
        
    }

    // put method (update)
    async function handleUpdate(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${api_url}/${editID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editName,
                    price: editPrice,
                })
            })

            const data = await response.json();
            setProducts((prevProducts) =>
                prevProducts.map((p) => (p.id === Number(editID) ? data : p))
            );

            setisModalOpen(false)
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(id) {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: 'DELETE',
            })

            setProducts((prev) => {
                return prev.filter((p)=> (p.id !== Number(id)))
            })
        } catch (error) {
            console.log(error);
        }
    }

    function openEdit(productEdit) {
        setisModalOpen(true);
        setEditID(productEdit.id);
        setEditName(productEdit.name);
        setEditPrice(productEdit.price);
    }

    return (
        <div className="text-center d-flex justify-content-center flex-column" >
            <h1>Student</h1>

            <form onSubmit={formSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' placeholder='Name' onChange={(event)=> setName(event.target.value)} />

                <label htmlFor="price">Price</label>
                <input type="number" id='price' onChange={(event)=> setPrice(event.target.value)} />

                <input type="submit" value="Submit" />
            </form>

            <br />
            <br />
            <table style={{ border: '1px solid black' }}>
                <tr style={{ border: '1px solid black' }}>
                    <td>Name</td>
                    <td>Price</td>
                </tr>
                {
                    products.map((product) => (
                        <tr>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button type="button" className='btn btn-outline-primary' onClick={()=>openEdit(product)}>Edit</button>
                                <button type="button" className='btn btn-outline-danger' onClick={()=>handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </table>
            {isModalOpen && (
                
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Student</h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={()=>setisModalOpen(false)}
                            ></button>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="editName" className="form-label">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="editName"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}    
                                        required
                                        
                                        />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editPrice" className="form-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="editPrice"
                                        value={editPrice}
                                        onChange={(e) => setEditPrice(e.target.value)}    
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={()=>setisModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            )}
                
        </div>
    );
}