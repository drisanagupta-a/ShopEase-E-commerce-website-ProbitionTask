import ProductRail from "./ProductRail";

const BestSellerSection = ({category, index}) => {
  return (
    <section className={`bestSellerSection ${category.color}`}>
      <div className="bestSellerHeader">
        <div>
          <span className="sectionNumber">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="sectionLabel">
            {category.label}
          </span>
        </div>

        <h2>{category.name}</h2>
      </div>

      <ProductRail category={category.name} />
    </section>
  );
};

export default BestSellerSection;