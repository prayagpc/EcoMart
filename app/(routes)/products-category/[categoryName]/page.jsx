{
  /* //Whatever the name of square folder its our field name */
}
import CategoryList from "@/app/_components/CategoryList";
import GlobalApi from "@/app/_utilis/GlobalApi";
import React from "react";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

async function ProductCategory({ params }) {
  const productList = await GlobalApi.getProductsByCategory(
    params?.categoryName
  );
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      <h2 className="bg-primary p-4 text-white font-bold text-3xl text-center mb-5">
        {decodeURIComponent(params.categoryName)}
      </h2>
      <TopCategoryList
        selectedCategory={decodeURIComponent(params.categoryName)}
        categoryList={categoryList}
      />
      <div className=" p-5 md:p-10">
        <ProductList productList={productList} />
      </div>
    </div>
  );
}

export default ProductCategory;
