// import React from 'react'

export default function Guitar({ guitar, addToCart }) {
  const { id, name, image, alt, description, price } = guitar;

  // ! EVENTS
  

  return (
    <div className="guitar-card d-flex flex-column align-items-center p-4 bg-white shadow-lg rounded-lg">
      <div className="guitar-image mb-4">
        <img
          className="img-fluid rounded-3"
          src={`img/${image}.jpg`}
          alt={alt}
        />
      </div>
      <div className="guitar-info text-center">
        <h3 className="guitar-name text-dark fw-bold text-uppercase mb-2">{name}</h3>
        <p className="guitar-description text-muted">{description}</p>
        <p className="guitar-price text-primary fs-4 fw-bold">${price}</p>
        <button type="button" 
        className="btn btn-dark w-100 mt-3"
        onClick={() => addToCart(guitar)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}




// // import React from 'react'

// export default function Guitar({ guitar }) {
//   const { name, image, alt, description, price } = guitar;

//   return (
//     <>
//       <div className="col-md-6 col-lg-4 my-4 row align-items-center">
//         <div className="col-4">
//           <img
//             className="img-fluid"
//             src={`img/${image}.jpg`}
//             alt={alt}
//           />
//         </div>
//         <div className="col-8">
//           <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
//           <p>
//             {description}
//           </p>
//           <p className="fw-black text-primary fs-3">${price}</p>
//           <button type="button" className="btn btn-dark w-100">
//             Agregar al Carrito
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
