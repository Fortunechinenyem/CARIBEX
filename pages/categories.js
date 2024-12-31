import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps() {
  try {
    const response = await fetch("https://carapi.app/api/trims/");
    if (!response.ok) throw new Error("Failed to fetch categories.");
    const categories = await response.json();

    return { props: { categories: categories.data || [] } };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { props: { categories: [] } };
  }
}

const CategoryPage = ({ categories }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Explore by Category
        </h2>
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.name.toLowerCase()}`}
                className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={64}
                  height={64}
                  className="mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No categories available.</p>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
