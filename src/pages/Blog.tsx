import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { blogPosts } from '../data';
import { BlogPost } from '../types';
import { Search, BookOpen, Clock, Calendar, ArrowRight, User, Tag, Sparkles, X } from 'lucide-react';

export default function Blog() {
  const { navigateTo } = useApp();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filterTag, setFilterTag] = useState<string>('all');

  const allTags = ['all', 'acrylic', 'watercolor', 'paper', 'resin', 'tutorials', 'guides'];

  const filteredPosts = filterTag === 'all'
    ? blogPosts
    : blogPosts.filter((post) => post.tags.includes(filterTag));

  return (
    <div id="blog-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-left space-y-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-violet-600 font-mono tracking-widest uppercase block mb-1">
            Studio Knowledge Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Artify Tutorials & Technique Guides
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Build your skill grade. Discover professional acrylic glazings, watercolor pan selections, and resin geodes bubble removal routines.
          </p>
        </div>

        {/* Filter tags drawer list */}
        <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-mono transition-all cursor-pointer ${
                filterTag === tag
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'bg-white border border-slate-100 text-slate-500 hover:border-slate-300'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog list Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            id={`blog-post-${post.id}`}
            key={post.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-violet-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full group text-left"
          >
            {/* Header image cover */}
            <div className="aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={post.image}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Body Info */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-orange-600 font-mono uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>{post.category}</span>
                </div>
                
                <h3 className="font-sans font-bold text-slate-950 text-base sm:text-lg hover:text-violet-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {post.snippet}
                </p>
              </div>

              {/* Sub-footer details and reader trigger */}
              <div className="pt-6 mt-6 border-t border-slate-50 space-y-4">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>

                <button
                  id={`read-post-${post.id}`}
                  onClick={() => setSelectedPost(post)}
                  className="w-full bg-slate-50 hover:bg-violet-600 hover:text-white text-slate-700 font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Read Full Masterclass <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </article>
        ))}
      </div>

      {/* Dynamic Detail Modal to read article */}
      {selectedPost && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative text-left">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cover and header */}
            <div className="space-y-4 pt-2">
              <span className="text-xs font-extrabold uppercase font-mono tracking-wider text-violet-600">
                {selectedPost.category} | Tutorial
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {selectedPost.title}
              </h2>
              
              <div className="flex items-center space-x-4 text-xs font-mono text-slate-400 pb-4 border-b border-slate-100">
                <span>By {selectedPost.author}</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>
            </div>

            {/* Image */}
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 my-6">
              <img src={selectedPost.image} alt={selectedPost.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>

            {/* Content paragraph with list parsing */}
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
              {selectedPost.content}
            </div>

            {/* Keyword tags list */}
            <div className="flex flex-wrap gap-1.5 pt-6 mt-6 border-t border-slate-100">
              {selectedPost.tags.map((tg) => (
                <span key={tg} className="bg-slate-50 text-slate-400 text-[10px] font-bold font-mono uppercase tracking-wide px-2.5 py-1 rounded">
                  #{tg}
                </span>
              ))}
            </div>

            {/* CTA to get paint sets */}
            <div className="bg-orange-50 rounded-2xl border border-orange-100 p-4 sm:p-5 text-center mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-left font-sans">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                  ⭐ Inspired to start? <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                </h4>
                <p className="text-[11px] text-slate-500">Pick up these specific mediums instantly at checkout!</p>
              </div>
              <button
                onClick={() => { setSelectedPost(null); navigateTo('shop'); }}
                className="bg-slate-950 hover:bg-violet-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer"
              >
                Go to Art supplies shop
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
