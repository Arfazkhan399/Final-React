// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/actions/cartActions';
// import ProductModal from './ProductModal'; // adjust path as needed

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     fetch('http://localhost:8080/products')
//       .then(res => res.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const handleMoreDetails = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedProduct(null);
//   };

//   return (
//     <div className="container my-4">
//       <h2 className='text-primary text-center'>Buy Cars Online – Fast, Easy, Reliable</h2>
//       <div className="row">
//         {products.map((product) => (
//           <div key={product.id} className="col-md-4 mb-4">
//             <div className="card shadow-sm h-100">
//               <div className="card-img-top" style={{ height: '200px', overflow: 'hidden' }}>
//                 <img src={product.image} alt={product.title} className="w-100 h-100" style={{ objectFit: 'contain', padding: '10px' }} />
//               </div>
//               <div className="card-body d-flex flex-column">
//                 <h6 className="card-title text-primary">{product.title}</h6>
//                 <p className="card-text text-danger fw-bold mb-2">₹{product.price}</p>
//                 <div className="card-footer mt-auto">
//                   <div className="d-flex justify-content-between">
//                     <button
//                       className="btn btn-outline-primary btn-sm"
//                       onClick={() => dispatch(addToCart(product))}
//                     >
//                       Add to Cart
//                     </button>
//                     <button className="btn btn-primary btn-sm" onClick={() => handleMoreDetails(product)}>
//                       More Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal Component */}
//       {selectedProduct && (
//         <ProductModal
//           show={showModal}
//           handleClose={handleCloseModal}
//           product={selectedProduct}
//         />
//       )}
//     </div>
//   );
// }

// export default Products;


import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import ProductModal from './ProductModal';
import { Toast, ToastContainer } from 'react-bootstrap';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleMoreDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // auto-hide after 2 seconds
  };

  return (
    <div className="container my-4">
      <h2 className='text-primary text-center'>Buy Cars Online – Fast, Easy, Reliable</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-img-top" style={{ height: '200px', overflow: 'hidden' }}>
                <img src={product.image} alt={product.title} className="w-100 h-100" style={{ objectFit: 'contain', padding: '10px' }} />
              </div>
              <div className="card-body d-flex flex-column">
                <h6 className="card-title text-primary">{product.title}</h6>
                <p className="card-text text-danger fw-bold mb-2">₹{product.price}</p>
                <div className="card-footer mt-auto">
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={() => handleMoreDetails(product)}>
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      {selectedProduct && (
        <ProductModal
          show={showModal}
          handleClose={handleCloseModal}
          product={selectedProduct}
        />
      )}

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="success" delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Cart</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Added to cart!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Products;
