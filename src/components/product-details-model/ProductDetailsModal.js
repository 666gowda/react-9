import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ProductDetailsModal = ({ show, handleClose, product }) => {
    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{product.product_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={product.image_url} style={{width:'400px', height:'auto'}}></img>
                <p><strong>Id:</strong> {product.product_id}</p>
                <p><strong>Code:</strong> {product.product_code}</p>
                <p><strong>Name:</strong> {product.product_name}</p>
                <p><strong>Price:</strong> {product.price}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Realease Date:</strong> {product.release_date}</p>
                <p><strong>Ratings:</strong> {product.star_rating}</p>
            </Modal.Body>
        </Modal>
    );
}

export default ProductDetailsModal;