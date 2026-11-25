import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { NEWS_ARTICLES } from '../data/puraflowData';
import { NewsArticle, PageRoute } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface NewsEventsPageProps {
  activeSlug?: string;
  onNavigate: (route: PageRoute) => void;
}

const NEWS_CATEGORIES: ('All' | NewsArticle['category'])[] = [
  'All',
  'Collaborations',
  'Sports',
  'Fine Dining',
  'Sustainability',
];

export const NewsEventsPage: React.FC<NewsEventsPageProps> = ({
  activeSlug,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'All' | NewsArticle['category']>('All');

  const activeArticle = activeSlug
    ? NEWS_ARTICLES.find((a) => a.slug === activeSlug)
    : undefined;

  if (activeArticle) {
    return (
      <article className="bg-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-5 md:px-10 space-y-8">
          <button
            type="button"
            onClick={() => onNavigate({ page: 'news' })}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B1F3A] hover:text-[#E41B5B] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to News & Events</span>
          </button>

          <header className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-[#E41B5B]">{activeArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activeArticle.date}</span>
              <span aria-hidden="true">·</span>
              <span>{activeArticle.readTime}</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-semibold text-[#0B1F3A] leading-tight">
              {activeArticle.title}
            </h1>
          </header>

          <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-slate-100">
            <ResilientImage
              src={activeArticle.image}
              alt={activeArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-5 text-base md:text-lg text-[#334155] leading-relaxed">
            {activeArticle.body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </article>
    );
  }

  const visibleArticles =
    filter === 'All'
      ? NEWS_ARTICLES
      : NEWS_ARTICLES.filter((a) => a.category === filter);

  return (
    <div className="bg-white">
      <section className="bg-[#F4F8FC] border-b border-slate-200/80 py-16 md:py-20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E41B5B]">
              Press & Stories
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#0B1F3A]">
              News & Global Events
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-full border border-slate-200">
            {NEWS_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                  filter === cat
                    ? 'bg-[#0B1F3A] text-white'
                    : 'text-[#4A5568] hover:text-[#0B1F3A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleArticles.map((article) => (
            <article
              key={article.slug}
              onClick={() => onNavigate({ page: 'news', slug: article.slug })}
              className="group bg-[#F4F8FC] rounded-3xl overflow-hidden border border-slate-200/70 flex flex-col cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-200">
                <ResilientImage
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 p-7 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-[#E41B5B]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-[#0B1F3A] leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-sm text-[#4A5568] leading-relaxed">{article.excerpt}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A] group-hover:text-[#E41B5B]">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
