import CategoryPageHero from "@/components/category/CategoryPageHero";
import SubcategoryMenu from "@/components/category/SubcategoryMenu";

export const metadata = {
  title: "Cat Food — Wet, Dry, Premium & Veterinary Diets | PetWago",
};

const MENU_ITEMS = [
  {
    label: "Wet Food",
    type: "Entrée",
    href: "/cat/food/wet-food",
    image:
      "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=200&h=200&fit=crop",
  },
  {
    label: "Dry Food",
    type: "Entrée",
    href: "/cat/food/dry-food",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop",
  },
  {
    label: "Premium Food",
    type: "Premium",
    href: "/cat/food/premium-food",
    image:
      "https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_139/hp-shopbypet-070725-cat",
  },
  {
    label: "Veterinary Diets",
    type: "Prescription",
    href: "/cat/food/veterinary-diets",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=200&fit=crop",
  },
];

const BENEFITS = [
  {
    icon: "🐟",
    title: "Meat-First Recipes",
    desc: "High-quality animal protein — the way cats were biologically designed to eat.",
  },
  {
    icon: "✨",
    title: "All the Variety",
    desc: "Cats crave new experiences at mealtime. We have a recipe for every mood.",
  },
  {
    icon: "🔬",
    title: "Vet-Recommended",
    desc: "Includes clinically-tested formulas for urinary, digestive, and skin health.",
  },
  {
    icon: "💚",
    title: "No Artificial Additives",
    desc: "Clean ingredient lists your cat's body will actually thank you for.",
  },
];

export default function CatFoodPage() {
  return (
    <main>
      <CategoryPageHero
        title='Cat Food'
        subtitle='Delightful Recipes'
        description="At PetWago, we like to say the cats we nourish aren't picky — they're just purrfectionists. Discover our menu of recipes for discerning felines."
        image='https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop&crop=faces'
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cat Food" }]}
        ctaLabel='Explore Cat Food'
        ctaHref='/cat/food/wet-food'
      />

      <SubcategoryMenu heading='Explore the Cat Food Menu' items={MENU_ITEMS} />

      <section className='bg-white py-16 sm:py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='font-serif text-2xl font-bold text-charcoal text-center mb-10'>
            PetWago&apos;s Recipe for Purrfection
          </h2>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 text-center'>
            {BENEFITS.map((b) => (
              <div key={b.title} className='flex flex-col items-center gap-3'>
                <span className='text-4xl'>{b.icon}</span>
                <h3 className='font-serif font-bold text-charcoal text-sm'>
                  {b.title}
                </h3>
                <p className='text-muted text-xs leading-relaxed'>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
