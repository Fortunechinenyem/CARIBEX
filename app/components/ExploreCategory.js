import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "SUVs",
    icon: "/images//images/hero.png",
    models: ["CX-5", "X5", "Outback", "RX 350", "Grand Cherokee", "XC90"],
  },
  {
    name: "Sedans",
    icon: "/images//images/pix1.jpg",
    models: ["Camry", "Civic", "A4", "Model 3", "Altima", "Elantra"],
  },
  {
    name: "Trucks",
    icon: "/images//images/hero.png",
    models: ["Silverado", "Sierra", "1500", "F-150", "Tacoma", "Ranger"],
  },
];

const ExploreCategories = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Explore by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.name.toLowerCase()}`}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <Image
                src={category.icon}
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
      </div>
    </section>
  );
};

export default ExploreCategories;
