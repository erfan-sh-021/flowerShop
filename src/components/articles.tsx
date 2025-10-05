import { getData } from "@/lib/getData";
import Link from "next/link";

export default async function Articles() {
  const { data: articles } = await getData("articles", 1, 3);

  return (
    <section className="py-16 px-6 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {articles.slice(0, 3).map((article: any, i: number) => (
          <Link key={i} href={`/articles/${article.id}`}>
            <div className="flex flex-col items-center text-center space-y-4 cursor-pointer group">
              {/* تصویر دایره‌ای ساده */}
              <div className="w-36 h-36 rounded-full overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105">
                <img
                  src={article.src}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* تیتر و توضیح */}
              <h3 className="font-semibold text-lg text-gray-800 group-hover:text-pink-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                {article.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* دکمه مطالب بیشتر */}
      <div className="mt-12 flex justify-center">
        <Link href="/articles">
          <button className="px-6 py-2 rounded-md text-pink-600 border border-pink-400 hover:bg-pink-50 transition-colors font-medium">
            مطالب بیشتر
          </button>
        </Link>
      </div>
    </section>
  );
}
