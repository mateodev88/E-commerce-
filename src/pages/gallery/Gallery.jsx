import { useEffect, useMemo, useState } from "react";
import ProductGallery from "../../components/organisms/ProductGallery";
import { getProducts } from "../../services/productService";
import useProductStore from "../../store/productStore";

const ITEMS_PER_PAGE = 8;

export default function Gallery() {
  const { products, setProducts, isLoading, setLoading, setError } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (products.length === 0) {
      setLoading(true);
      getProducts()
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [products.length, setProducts, setLoading, setError]);

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return products;

    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized) ||
        product.category?.toLowerCase().includes(normalized)
      );
    });
  }, [products, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-500 animate-pulse">Cargando galería...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto p-6 lg:px-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Catálogo de Productos</h1>
          <p className="text-sm text-gray-500 mt-2">
            Mostrando <span className="font-semibold text-gray-900">{filteredProducts.length}</span> productos
          </p>
        </div>
        
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar por nombre, categoría..."
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
          />
          <div className="absolute right-3 top-3.5 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </header>

      <ProductGallery products={visibleProducts} />

      {totalPages > 1 && (
        <nav className="flex justify-center items-center gap-2 mt-12 py-4">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Página anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold border transition-all ${
                    page === currentPage
                      ? "border-primary bg-primary text-white shadow-md scale-110"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Siguiente página"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      )}
    </section>
  );
}

