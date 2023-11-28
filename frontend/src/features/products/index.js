import { getProductsAsync, getProductsByFiltersAsync } from "./ProductSlice";
import ColorSelector from "./components/ColorSelector";
import { ProductCard } from "./components/ProductCard";
import { ProductDetails } from "./components/ProductDetails";
import { ProductFilter } from "./components/ProductFilter";
import { ProductList } from "./components/ProductList";
import { ProductPagination } from "./components/ProductPagination";
import { SortDropdown } from "./components/SortDropDown";


export {
    ProductDetails,
    ProductList,
    ProductCard,
    ProductFilter,
    ColorSelector,
    SortDropdown,
    ProductPagination,
    getProductsAsync,
    getProductsByFiltersAsync,
}