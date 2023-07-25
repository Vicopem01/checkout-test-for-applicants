import styles from "./Checkout.module.css";
import { LoadingIcon } from "./Icons";
import { getProducts } from "./dataService";
import { useEffect, useState } from "react";

const Product = ({ id, name, availableCount, price, orderedQuantity }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>${price}</td>
      <td>{orderedQuantity}</td>
      <td>$0</td>
      <td>
        <button className={styles.actionButton}>+</button>
        <button className={styles.actionButton}>-</button>
      </td>
    </tr>
  );
};

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      const products = response.map((item) => {
        return {
          ...item,
          orderedQuantity: 0,
        };
      });
      setProducts(products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <h1>Electro World</h1>
      </header>
      <main>
        {loading && <LoadingIcon />}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th># Available</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <Product key={`products-${index}`} {...product} />
            ))}
          </tbody>
        </table>
        <h2>Order summary</h2>
        <p>Discount: $ </p>
        <p>Total: $ </p>
      </main>
    </div>
  );
};

export default Checkout;
