import React, { useState } from "react";
import axios from "axios";

const ProductViewer: React.FC = () => {
    const [id, setId] = useState("");
    const [sku, setSku] = useState("");
    const [product, setProduct] = useState<any>(null);

    const fetchProductById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error(error);
            setProduct(null);
        }
    };

    const fetchProductBySku = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/sku/${sku}`);
            setProduct(response.data);
        } catch (error) {
            console.error(error);
            setProduct(null);
        }
    };

    return (
        <div>
            <h1>Product Viewer</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter Product ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button onClick={fetchProductById}>Fetch by ID</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Enter Product SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                />
                <button onClick={fetchProductBySku}>Fetch by SKU</button>
            </div>
            {product && (
                <div>
                    <h2>Product Details</h2>
                    <pre>{JSON.stringify(product, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ProductViewer;
