import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from "../../services/services";
import Dropdown from 'react-bootstrap/Dropdown';
import ProductDetailsModal from '../product-details-model/ProductDetailsModal';
import ProductDeleteModel from '../product-delete-model/ProductDeleteModel';
import './ProductList.css';

const EmployeeList = (props) => {
    const [employees, setEmployees] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [requestComplete, setRequestComplete] = useState(false);
    const [sortBy, setSortBy] = useState(1); // Default sort value
    const [show, setShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // Initialize selectedProduct to null
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleClose = () => {
        setShow(false);
        setShowConfirmationModal(false); // Close the confirmation modal
    };

    const handleShow = (product) => {
        setSelectedProduct(product); // Set the selected product
        setShow(true);
    };

    const getData = () => {
        getEmployees(sortBy)
            .then(
                (httpResponse) => {
                    const records = httpResponse.data;
                    setEmployees(records);
                    setErrorMessage('');
                    setRequestComplete(true);
                }
            )
            .catch(
                (err) => {
                    setEmployees(undefined);
                    setErrorMessage(err.message);
                    setRequestComplete(true);
                }
            )
    }

    useEffect(() => {
        getData();
    }, [sortBy]);

    const handleAction = (action, productId) => {
        console.log(`Performing ${action} on product ${productId}`);
        if (action === 'Delete') {
            setSelectedProduct(productId);
            setShowConfirmationModal(true);
        }
    }

    const handleDeleteConfirmed = () => {
        deleteEmployee(selectedProduct)
            .then(() => {
                console.log(`Product ${selectedProduct} deleted successfully`);
                setShowConfirmationModal(false);
                getData();
            })
            .catch((err) => {
                console.error('Error deleting product:', err);
            });
    }

    let design;
    if (!requestComplete) {
        design = <span>Loading...please wait</span>;
    } else if (errorMessage !== '') {
        design = <span>{errorMessage}</span>;
    } else if (!employees || employees.length === 0) {
        design = <span>No records</span>;
    } else {
        design = (
            <>
                <h2 className='font-monospace pt-2'>Available Products</h2>
                <div className='ms-3 font-monospace' style={{ width: '75px' }}>

                    <select className='rounded shadow-sm' style={{ backgroundColor: "#EFF3FC" }} value={sortBy} onChange={(e) => setSortBy(parseInt(e.target.value))}>
                        {[
                            { value: 1, label: "Sort by ID" },
                            { value: 2, label: "Sort by Name" },
                            { value: 3, label: "Sort by Price (Low-High)" },
                            { value: 4, label: "Sort by Price (High-Low)" }
                        ].map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>




                <hr />
                <div className="row row-cols-1 row-cols-md-4 g-4 font-monospace">
                    {employees.map((e) => (
                        <div className="col" key={e.product_id}>
                            <div className="card h-100 w-100 rounded shadow mx-2" id="product-card">
                                {/* ProductName */}
                                <div style={{ height: '45px', backgroundColor: '#9CA7F9 ' }} className='row mx-auto w-100 rounded-top'>
                                    <h5 className="card-title pt-2 col-8">{e.product_name}</h5>
                                    <Dropdown className='col-4 pt-1'>
                                        <Dropdown.Toggle variant="bg-light border-0" id="dropdown-basic">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item variant="primary" onClick={() => handleShow(e)}>View</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleAction('Delete', e.product_id)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <img src={e.image_url} className="card-img-top" alt={e.product_name} />
                                </div>
                                <div id='price-tab' className="card-body d-flex align-items-end justify-content-center">
                                    <p className="card-text border-top pt-2">Price: {e.price} /RS</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </>
        );
    }
    return (
        <>
            {design}
            {/* Confirmation modal for delete action */}
            <ProductDeleteModel show={showConfirmationModal} handleClose={handleClose} handleDeleteConfirmed={handleDeleteConfirmed}
            />
           
            {/* Product details modal */}
            {selectedProduct && <ProductDetailsModal show={show} handleClose={handleClose} product={selectedProduct} />}
        </>
    );
}

export default EmployeeList;