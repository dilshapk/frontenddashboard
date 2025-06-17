import React from 'react';
import CommentSection from '../components/CommentSection';

function ProductsList() {
  return (
    <div className="container mt-4">
      <h3>Products List Page</h3>
      <CommentSection pageName="products" />
    </div>
  );
}

export default ProductsList;
