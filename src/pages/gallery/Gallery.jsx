import { useEffect, useMemo, useState } from "react";
import ProductGallery from "../../components/organisms/ProductGallery";
import { getProducts } from "../../services/productService";
import useProductStore from "../../store/productStore";
import Button from "../../components/atoms/Button";

const ITEMS_PER_PAGE = 8;

export default function Gallery() {
  const { products, setProducts, isLoading, setLoading, setError } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    // AUDITORÍA: Forzamos la carga siempre al montar para asegurar que conectamos con la API real
    setLoading(true);
    getProducts()
      .then((data) => {
        console.log("API Audit: Datos recibidos con éxito", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Audit: Error al conectar con FakeStore", err);
        setError(`Error de conexión: ${err.message}. Verifica tu internet.`);
        setLoading(false);
      });
  }, [setProducts, setLoading, setError]);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ["all", ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Búsqueda
    const normalized = searchTerm.trim().toLowerCase();
    if (normalized) {
      result = result.filter((p) => 
        p.title.toLowerCase().includes(normalized) || 
        p.description.toLowerCase().includes(normalized)
      );
    }

    // Filtro Categoría
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filtro Precio
    result = result.filter((p) => Number(p.price) <= maxPrice);

    // Ordenamiento
    if (sortBy === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortBy, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("default");
    setMaxPrice(1000);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
        <p className="mt-4 text-gray-500 animate-pulse font-bold">Actualizando catálogo...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
      <div className="lg:flex gap-12">
        
        {/* Sidebar: Filtros */}
        <aside className="lg:w-1/4 mb-10 lg:mb-0 space-y-10">
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-6">Búsqueda</h3>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Nombre, marca..."
                className="w-full pl-4 pr-10 py-3 rounded-2xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
              <svg className="w-5 h-5 absolute right-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-6">Categorías</h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold capitalize transition-all border ${
                    selectedCategory === cat 
                      ? "bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-200" 
                      : "bg-white text-gray-500 border-gray-100 hover:border-gray-300"
                  }`}
                >
                  {cat === "all" ? "Todos los productos" : cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-6 flex justify-between">
              Precio Máximo
              <span className="text-primary font-black">${maxPrice}</span>
            </h3>
            <input 
              type="range" 
              min="0" 
              max="1000" 
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] font-black text-gray-400 mt-2 uppercase tracking-widest">
              <span>$0</span>
              <span>$1000+</span>
            </div>
          </div>

          <Button 
            variant="secondary" 
            onClick={clearFilters}
            className="w-full py-3 text-xs font-black uppercase tracking-widest"
          >
            Limpiar Filtros
          </Button>
        </aside>

        {/* Contenido Principal */}
        <main className="lg:w-3/4">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Catálogo</h1>
              <p className="text-gray-400 font-medium">
                Viendo {filteredProducts.length} resultados
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Ordenar por:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="default">Relevancia</option>
                <option value="price-low">Menor Precio</option>
                <option value="price-high">Mayor Precio</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>
          </header>

          {visibleProducts.length > 0 ? (
            <ProductGallery products={visibleProducts} />
          ) : (
            <div className="border rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col bg-white overflow-hidden group border-gray-100 p-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Sin resultados</h3>
              <p className="text-gray-400 font-medium mb-8">No encontramos productos que coincidan con tus filtros.</p>
              <Button variant="primary" onClick={clearFilters}>Mostrar todo</Button>
            </div>
          )}

          {/* Paginación */}
          {totalPages > 1 && (
            <nav className="flex justify-center items-center gap-2 mt-20">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-400 disabled:opacity-30 hover:text-primary hover:border-primary transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-12 h-12 rounded-2xl text-sm font-black transition-all ${
                      page === currentPage
                        ? "bg-primary text-white shadow-xl shadow-primary/20 scale-110"
                        : "bg-white text-gray-400 border border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-400 disabled:opacity-30 hover:text-primary hover:border-primary transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          )}
        </main>
      </div>
    </section>
  );
}

