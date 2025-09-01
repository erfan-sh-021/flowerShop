import { getData } from "@/lib/getData";

interface ArticlePageProps {
  params: { id: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // گرفتن دیتای همه مقالات
  const { data: articles } = await getData("articles");

  // پیدا کردن مقاله‌ای که آی‌دی‌اش با params.id یکی باشد
  const article = articles.find((a: any) => String(a.id) === params.id);

  if (!article) {
    return <div className="text-center py-20">مقاله پیدا نشد ❌</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="w-full h-80 rounded-lg overflow-hidden mb-6">
        <img
          src={article.src}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-2xl font-bold mb-6 text-center">{article.title}</h1>
      <p className="text-gray-700 leading-relaxed text-justify">{article.desc}</p>
    </div>
  );
}
