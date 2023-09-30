import React, { useState, useRef, useEffect, useCallback } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const reference = useRef(null);

  const onIntersection = useCallback(async (entries) => {
    const firstItem = entries[0];
    if (firstItem.isIntersecting && hasMore) {
      await fetchMoreProducts();
    }
  }, [products, hasMore]);

  const fetchMoreProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=5&skip=${(pageNumber + 1) * 5}`
    );
    const { products: newProducts } = await response.json();
    if (newProducts.length === 0) {
      setHasMore(false);
    } else {
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && reference.current) {
      observer.observe(reference.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [products, onIntersection]);

  console.log(products);
  return (
    <>
      {products.map((product, index) => (
        <div key={index} className="flex justify-center items-center mt-2  scroll-smooth scrollbar-default">
          <div className="flex flex-col w-96 h-auto px-2 py-2 shadow-md border m-3">
            <img src={product?.thumbnail} className=" " alt="" />
            <h3 className="text-lg text-black font-semibold">{product?.title}</h3>
            <p className="product-description">{product?.description}</p>
            <p className="product-price">{product?.price}</p>
          </div>
        </div>
      ))}
      {hasMore && (
        <div ref={reference} className="flex justify-center items-center">
          <div className="text-lg text-blue-600">Loading...</div>
        </div>
      )}
    </>
  );
};

export default App;
