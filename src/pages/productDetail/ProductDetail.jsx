import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, getProducts } from '../../services/productService';
import { imageMap } from '../../assets/imageMap';
import useCartStore from '../../store/cartStore';
import useProductStore from '../../store/productStore';
import Button from '../../components/atoms/Button';
import ProductRate from '../../components/atoms/product/ProductRate';
import ProductCard from '../../components/molecules/ProductCard';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, setProducts } = useProductStore();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        getProductById(id)
            .then((data) => {
                if (data) {
                    setProduct(data);
                } else {
                    console.error("API Audit: El producto no existe en la API");
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("API Audit: Error en detalle", err);
                setLoading(false);
            });

        // Aseguramos que la lista global esté cargada para productos relacionados
        // Si hay menos de 5, probablemente tenemos datos viejos/mock, así que refrescamos.
        if (products.length < 5) {
            getProducts().then(setProducts).catch(e => console.error("Error global refresh", e));
        }
    }, [id, products.length, setProducts]);

    const relatedProducts = useMemo(() => {
        if (!product || products.length === 0) return [];
        return products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4);
    }, [product, products]);

    const handleAddToCart = () => {
        addItem(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
                <p className="mt-4 text-gray-500 animate-pulse font-bold">Cargando producto...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-6">
                <div className="text-6xl text-gray-200 font-black">404</div>
                <p className="text-xl text-gray-500">Lo sentimos, el producto no existe.</p>
                <Link to="/gallery">
                    <Button variant="primary">Volver al catálogo</Button>
                </Link>
            </div>
        );
    }

    const resolvedImage = imageMap[product.image] ?? product.image;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumbs */}
            <nav className="flex mb-8 text-sm font-medium text-gray-500 items-center gap-2">
                <Link to="/gallery" className="hover:text-primary transition-colors">Catálogo</Link>
                <span>/</span>
                <span className="text-gray-400 capitalize">{product.category}</span>
                <span>/</span>
                <span className="text-gray-900 truncate max-w-[200px]">{product.title}</span>
            </nav>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-100 overflow-hidden mb-20">
                <div className="lg:flex">
                    {/* Image Section */}
                    <div className="lg:w-1/2 relative bg-gray-50 p-12 flex items-center justify-center overflow-hidden group">
                        <img
                            src={resolvedImage}
                            alt={product.title}
                            className="w-full max-w-md h-auto object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-8 left-8">
                            <span className="bg-white/80 backdrop-blur-md border border-white px-4 py-1 rounded-full text-xs font-black tracking-widest text-primary shadow-sm">
                                CATEGORÍA: {product.category.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col">
                        <div className="flex-1">
                            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="bg-yellow-50 px-3 py-1 rounded-lg">
                                    <ProductRate rate={product.rate} />
                                </div>
                                <span className="text-gray-400 font-medium">|</span>
                                <span className="text-gray-500 text-sm font-semibold tracking-wide uppercase">Envío prioritario disponible</span>
                            </div>

                            <p className="text-5xl font-black text-primary mb-10 tracking-tighter">
                                ${Number(product.price).toFixed(2)}
                            </p>

                            <div className="space-y-4 mb-12">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Descripción</h3>
                                <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center bg-gray-100 p-1 rounded-2xl border border-gray-200">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-primary transition-colors font-black text-xl"
                                    >
                                        −
                                    </button>
                                    <span className="w-14 text-center font-black text-gray-900 text-xl">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-primary transition-colors font-black text-xl"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="text-gray-400 text-sm font-medium">
                                    Stock disponible para <br/> envío inmediato
                                </div>
                            </div>

                            <Button
                                onClick={handleAddToCart}
                                variant="primary"
                                className={`w-full py-5 text-xl font-black shadow-2xl transition-all duration-500 ${
                                    added ? 'bg-green-600 shadow-green-200 scale-[0.98]' : 'shadow-primary/30'
                                }`}
                                disabled={added}
                            >
                                {added ? '✓ ¡AÑADIDO AL CARRITO!' : 'AGREGAR A LA BOLSA'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <section>
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Productos Relacionados</h2>
                        <Link to="/gallery" className="text-primary font-bold hover:underline">Ver todo</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

