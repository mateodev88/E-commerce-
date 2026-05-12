import { useState } from "react";
import ProductImage from "../atoms/product/ProductImage";
import ProductTitle from "../atoms/product/ProductTitle";
import ProductRate from "../atoms/product/ProductRate";
import ProductPrice from "../atoms/product/ProductPrice";
import Button from "../atoms/Button";
import { imageMap } from "../../assets/imageMap";
import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore";

function ProductCard({ product }) {
    const resolvedImage = imageMap[product.image] ?? product.image;
    const addItem = useCartStore((state) => state.addItem);
    const [added, setAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="border rounded-lg shadow-md w-[200px] m-2 hover:shadow-xl transition-all duration-300 flex flex-col bg-white overflow-hidden group">
            <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
                <ProductImage src={resolvedImage} alt={product.title} />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <div className="p-4 flex flex-col flex-grow">
                <Link to={`/product/${product.id}`}>
                    <ProductTitle title={product.title} />
                </Link>
                <div className="mt-auto">
                    <ProductRate rate={product.rate} />
                    <div className="flex items-center justify-between mt-2">
                        <ProductPrice price={product.price} />
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                        <Button 
                            className={`w-full text-xs py-1.5 transition-all ${added ? 'bg-green-600 hover:bg-green-700' : ''}`} 
                            variant="primary"
                            onClick={handleAddToCart}
                            disabled={added}
                        >
                            {added ? '¡Añadido!' : 'Añadir al Carrito'}
                        </Button>
                        <Link to={`/product/${product.id}`} className="w-full">
                            <Button className="w-full text-xs py-1.5" variant="outline">
                                Ver Detalles
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductCard;

