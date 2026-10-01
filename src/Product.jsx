import { onLog } from "firebase/app";
import {useState, useEffect} from 'react'


export default function Student() {
    const [ product, setProduct ] = useState([]);
    const [ name, setName ] = useState('');
    const [price, setPrice] = useState('');

    //container ng mga ieedit na data
    const [ editID, seteditID ] = useState('');
    const [ editname, seteditName ] = useState('');
    const [editprice, seteditPrice] = useState('');
    const [ isModalOpen, setisModalOpen ] = useState(false);
    const product_url = 'http://localhost:8080/api/product';

    useEffect(() => {
        fetch(product_url)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                console.log(data)   
            })
            .catch((err)=> console.log('Error in', err))
    }, []);
    
    async function submitName(e) {
        e.preventDefault();
        try {
            const response = await fetch(product_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                price: price
            })
            })

            const data = await response.json();

            setProduct((prod)=> [...prod, data])
        }
        catch (err) {
            console.log(err);
        }
        
    }

    async function handleUpdate(e) {
        e.preventDefault();
        const response = await fetch(`${product_url}/${editID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: editname,
                price: editprice,
            })
        })

        const data = await response.json();
        setProduct((prev) => 
           prev.map((p) => (p.id === Number(editID) ? data : p))
        )
        
        setisModalOpen(false)
    }

    async function handleDelete(id) {
        await fetch(`${product_url}/${id}`, {
            method: 'DELETE'
        })

        setProduct((prev) => {
            return prev.filter((p)=> (p.id !== Number(id)))
        })
    }
    function openEditModal(product) {
        setisModalOpen(true);
        seteditID(product.id);
        seteditName(product.name);
        seteditPrice(product.price);
    }
    return (
        <>
            <h1>Student Portal</h1>
            <form onSubmit={submitName}>
                <label htmlFor="productName">Product Name</label>
                <input type="text" name="productName" id="productName" onChange={(e)=> setName(e.target.value)} />

                <label htmlFor="price">Price</label>
                <input type="number" name="price" id="price" onChange={(e)=> setPrice(e.target.value)}/>

                <input type="submit" className="btn btn-primary"/>

            </form>
            <br />
            <table className="table ">
                <thead className="thead-dark">
                    
                    <tr>
                        <td scope="col">Product Name</td>
                        <td>Product Price</td>
                    </tr>
                </thead>
                <tbody>
                   {
                        product.map((products) => (
                            <tr>
                                <td scope="row">{ products.name }</td>
                                <td>{products.price}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-primary" onClick={()=>openEditModal(products)}>Edit</button>
                                    <button type="button" className="btn btn-outline-danger" onClick={()=>handleDelete(products.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    } 
                </tbody>
                
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
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                            id="editName"
                                            value={editname}
                                            onChange={(e) => seteditName(e.target.value) }
                                        required
                                        
                                        />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editPrice" className="form-label">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="editPrice"
                                            value={editprice}
                                            onChange={(e) => seteditPrice(e.target.value) }
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
        </>
    );
}