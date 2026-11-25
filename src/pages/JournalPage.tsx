import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { JOURNAL_ARTICLES, PRODUCTS } from '../data/catalog';
import { RoutePath } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface JournalPageProps {
  activeSlug?: string;
  onNavigate: (route: RoutePath) => void;
}

const CATEGORIES = ['All', 'Materiality', 'Design Notes', 'Craftsmanship'];

export const JournalPage: React.FC<JournalPageProps> = ({ activeSlug, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const activeArticle = activeSlug
    ? JOURNAL_ARTICLES.find((a) => a.slug === activeSlug)
    : undefined;

  if (activeArticle) {
    const featuredProduct = PRODUCTS.find((p) => p.slug === activeArticle.featuredProductSlug);

    return (
      <article className="max-w-4xl mx-auto px-5 md:px-10 py-12 md:py-16 space-y-10">
        <button
          type="button"
          onClick={() => onNavigate({ page: 'journal' })}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#5A5E63] hover:text-[#121417] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Journal</span>
        </button>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7075]">
            <span>{activeArticle.category}</span>
            <span aria-hidden="true">·</span>
            <span>{activeArticle.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{activeArticle.readTime}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#121417] leading-tight">
            {activeArticle.title}
          </h1>
          <p className="text-sm text-[#5A5E63]">
            By {activeArticle.author}, {activeArticle.authorRole}
          </p>
        </header>

        <div className="aspect-[16/9] w-full bg-[#ECEAE3] rounded-sm overflow-hidden">
          <ResilientImage
            src={activeArticle.coverImage}
            alt={activeArticle.title}
            className="w-full h-full object-cover"
          />
        </div>

        <blockquote className="py-6 border-y border-[#121417]/10 font-serif italic text-2xl md:text-3xl text-[#14232B] leading-snug">
          “{activeArticle.pullQuote}”
        </blockquote>

        <div className="space-y-6 text-base md:text-lg text-[#2C2F33] leading-relaxed">
          {activeArticle.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {featuredProduct && (
          <div className="mt-10 p-6 bg-white border border-[#121417]/10 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[#6B7075]">{featuredProduct.series}</p>
              <p className="font-serif text-xl font-medium text-[#121417] mt-0.5">
                {featuredProduct.name}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'product', slug: featuredProduct.slug })}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium bg-[#14232B] text-[#F6F5F1] hover:bg-[#1E333E] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Inspect Vessel</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </article>
    );
  }

  const visibleArticles =
    selectedCategory === 'All'
      ? JOURNAL_ARTICLES
      : JOURNAL_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#121417]/10">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#6B7075]">
            Editorial Publications
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-[#121417]">
            The Pure Flow Journal
          </h1>
          <p className="text-sm md:text-base text-[#5A5E63] leading-relaxed">
            Essays on metallurgy, mineral chemistry, Bohemian glassblowing, and objects built for permanence.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#ECEAE3] rounded-sm self-start md:self-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-[#121417] shadow-xs'
                  : 'text-[#5A5E63] hover:text-[#121417]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
        {visibleArticles.map((article) => (
          <article
            key={article.slug}
            onClick={() => onNavigate({ page: 'journal', slug: article.slug })}
            className="group bg-white border border-[#121417]/8 rounded-sm overflow-hidden flex flex-col cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="aspect-[4/3] w-full bg-[#ECEAE3] overflow-hidden">
              <ResilientImage
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-[#6B7075]">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="font-serif text-2xl font-medium text-[#121417] leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-[#5A5E63] leading-relaxed">{article.excerpt}</p>
              </div>

              <div className="pt-3 border-t border-[#121417]/8 flex items-center justify-between text-xs font-medium text-[#14232B]">
                <span>Read Essay</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
