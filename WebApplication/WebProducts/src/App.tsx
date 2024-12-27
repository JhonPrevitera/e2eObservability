import React, { useState } from "react";
import axios from "axios";
import  TraceProvider  from "./tracing.tsx";

interface Product {
    name: string;
    sku: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: string;
    isActive: boolean;
}

const ProductCreator: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        name: "",
        sku: "",
        description: "",
        price: 0,
        stockQuantity: 0,
        category: "",
        isActive: true,
    });
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]:
                name === "price" || name === "stockQuantity" ? Number(value) : value,
        });
    };

    const createProduct = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/ControllerProduct/produto",
                product
            );
            setMessage("Product created successfully!");
            console.log("Response:", response.data);

            // Ativa a animação
            setIsSubmitted(true);

            // Limpa os campos após a animação
            setTimeout(() => {
                setIsSubmitted(false);
                setProduct({
                    name: "",
                    sku: "",
                    description: "",
                    price: 0,
                    stockQuantity: 0,
                    category: "",
                    isActive: true,
                });
                setMessage("");
            }, 1000); // Tempo da animação em milissegundos
        } catch (error) {
            console.error("Error creating product:", error);
            setMessage("Failed to create product.");
        }
    };

    return (
        <TraceProvider>
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center p-4">
                <div
                    className={`bg-white shadow-lg rounded-lg p-8 max-w-md w-full transition-all duration-300 ease-in-out ${
                        isSubmitted ? "animate-fade-out" : "animate-fade-in"
                    }`}
                >
                    <h1 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
                        Product Creator
                    </h1>
                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            createProduct();
                        }}
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={product.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="text"
                            name="sku"
                            placeholder="Product SKU"
                            value={product.sku}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <textarea
                            name="description"
                            placeholder="Product Description"
                            value={product.description}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="number"
                            name="stockQuantity"
                            placeholder="Stock Quantity"
                            value={product.stockQuantity}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={product.category}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <label className="flex items-center space-x-2 text-gray-700">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={product.isActive}
                                onChange={(e) =>
                                    setProduct({ ...product, isActive: e.target.checked })
                                }
                                className="rounded focus:ring-2 focus:ring-blue-400"
                            />
                            <span>Active</span>
                        </label>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition-all duration-300 ease-in-out"
                        >
                            Create Product
                        </button>
                    </form>
                    {message && (
                        <p className="mt-4 text-center text-sm text-green-600">
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </TraceProvider>
    );
};

export default ProductCreator;
