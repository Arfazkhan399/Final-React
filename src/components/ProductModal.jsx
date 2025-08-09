// import React from 'react';
// import { Modal, Button } from 'bootstrap';

// const ProductModal = ({ show, handleClose, product }) => {
//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>{product.name}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p><strong>Price:</strong> ₹{product.price}</p>
//         <p><strong>Description:</strong> {product.description}</p>
//         {/* Add more product details as needed */}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ProductModal;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProductModal = ({ show, handleClose, product }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={product?.image} alt={product?.title} className="img-fluid mb-3" />
        <p><strong>Price:</strong> ₹{product?.price}</p>
        <p><strong>Description:</strong> {product?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;

