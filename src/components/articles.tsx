import { getData } from "@/lib/getData";
import Link from "next/link";

export default async function Articles() {
    const { data: articles } = await getData("articles", 1, 3);
  
    return (
      <section className="py-12 text-center">
        <h2 className="text-xl font-bold mb-10">مقالات</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {articles.slice(0,3).map((article:any , i:number) => (
            <Link key={i} href={`/articles/${article.id}`}>
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-3 cursor-pointer hover:shadow-lg"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden hover:shadow-lg">
                <img
                  src={article.src}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">{article.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 rtl">{article.desc}</p>
            </div>
            </Link>
          ))}
        </div>
  
        <div className="mt-10">
          <Link href="/articles">
          <button className="px-6 py-2 rounded-md bg-green-200 hover:bg-green-300 transition text-black font-medium bg-green">
            مطالب بیشتر
          </button>
          </Link>
        </div>
      </section>
    );
  }
  