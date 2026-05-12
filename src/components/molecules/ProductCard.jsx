import ProductImage from "../atoms/product/ProductImage";
import ProductTitle from "../atoms/product/ProductTitle";
import ProductRate from "../atoms/product/ProductRate";
import ProductPrice from "../atoms/product/ProductPrice";
import Button from "../atoms/Button";
import { imageMap } from "../../assets/imageMap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const resolvedImage = imageMap[product.image] ?? product.image;

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
                    <Button className="w-full mt-3 text-sm" variant="primary">
                        Ver Detalles
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default ProductCard;

