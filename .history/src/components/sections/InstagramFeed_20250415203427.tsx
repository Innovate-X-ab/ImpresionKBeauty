//src/components/sections/InstagramFeed.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Trash2, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AddSocialPostButton from '@/components/admin/AddSocialPostButton';
import SocialPostEdit from '@/components/admin/SocialPostEdit';



interface SocialPost {
  id: string;
  platform: string; // 'instagram' or 'tiktok'
  mediaUrl: string;
  thumbnailUrl?: string;
  mediaType: string; // 'image' or 'video'
  caption: string;
  likes: number;
  externalUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Sample Instagram posts - replace with your real content
const samplePosts: SocialPost[] = [
  {
    id: '1',
    platform: 'instagram',
    mediaUrl: '/images/instagram/vitamin-c.jpg',
    thumbnailUrl: '/images/instagram/vitamin-c.jpg',
    mediaType: 'image',
    caption: 'Morning glow with our Vitamin C serum! ✨ #kbeauty #skincareroutine',
    likes: 248,
    externalUrl: 'https://instagram.com/p/example1'
  },
  {
    id: '2',
    platform: 'instagram',
    mediaUrl: '/images/instagram/sheet-mask.jpg',
    thumbnailUrl: '/images/instagram/sheet-mask.jpg',
    mediaType: 'image',
    caption: 'Sheet mask Sunday is our favorite day of the week 💆‍♀️ #selfcaresunday',
    likes: 312,
    externalUrl: 'https://instagram.com/p/example2'
  },
  {
    id: '3',
    platform: 'tiktok',
    mediaUrl: '/videos/sample-skincare-routine.mp4',
    thumbnailUrl: '/images/instagram/hydration.jpg',
    mediaType: 'video',
    caption: 'The perfect layering technique for maximum hydration 💧 #kbeautytips',
    likes: 186,
    externalUrl: 'https://tiktok.com/@example/video/123456'
  },
  {
    id: '4',
    platform: 'instagram',
    mediaUrl: '/images/instagram/products.jpg',
    thumbnailUrl: '/images/instagram/products.jpg',
    mediaType: 'image',
    caption: 'Our new arrivals from COSRX just landed! 🛍️ #newarrivals #cosrx',
    likes: 421,
    externalUrl: 'https://instagram.com/p/example4'
  },
  {
    id: '5',
    platform: 'tiktok',
    mediaUrl: '/videos/unboxing-sample.mp4',
    thumbnailUrl: '/images/instagram/behindthescenes.jpg',
    mediaType: 'video',
    caption: 'Unboxing our latest K-beauty arrivals! ✨ #kbeauty #unboxing',
    likes: 529,
    externalUrl: 'https://tiktok.com/@example/video/567890'
  },
  {
    id: '6',
    platform: 'instagram',
    mediaUrl: '/images/instagram/behindthescenes.jpg',
    thumbnailUrl: '/images/instagram/behindthescenes.jpg',
    mediaType: 'image',
    caption: 'Customer results using our Snail Mucin essence for 4 weeks 🥰 #beforeandafter',
    likes: 529,
    externalUrl: 'https://instagram.com/p/example6'
  },
  {
    id: '7',
    platform: 'instagram',
    mediaUrl: '/images/instagram/before-after.jpg',
    thumbnailUrl: '/images/instagram/before-after.jpg',
    mediaType: 'image',
    caption: 'Quick tutorial: How to layer your serums correctly 👩‍🏫 #skincarebasics',
    likes: 193,
    externalUrl: 'https://instagram.com/p/example7'
  },
  {
    id: '8',
    platform: 'instagram',
    mediaUrl: '/images/instagram/founder.jpg',
    thumbnailUrl: '/images/instagram/founder.jpg',
    mediaType: 'image',
    caption: 'Our founder\'s current evening skincare routine 🌙 #nighttimeritual',
    likes: 307,
    externalUrl: 'https://instagram.com/p/example8'
  }
];

export default function InstagramFeed() {
  const { isAdmin } = useAuth();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    platform: 'all' // 'all', 'instagram', or 'tiktok'
  });

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/social');
      if (!response.ok) {
        throw new Error('Failed to fetch social media posts');
      }
      
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching social media posts:', err);
      setError('Failed to load social media posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this post?')) return;
    
    setDeletingPostId(postId);
    try {
      const response = await fetch(`/api/admin/social/${postId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      
      // Remove the deleted post from state
      setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setDeletingPostId(null);
    }
  };

  // If there are no posts and we're not loading, use sample posts
  const displayPosts = posts.length === 0 && !loading ? samplePosts : posts;

  // Filter posts based on active filters
  const filteredPosts = displayPosts.filter(post => {
    if (activeFilters.platform !== 'all' && post.platform !== activeFilters.platform) {
      return false;
    }
    return true;
  });

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl text-black font-light mb-3 sm:mb-4">Follow Us On Social Media</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Join our beauty community for skincare tips, tutorials, and inspiration.
          </p>
          <div className="flex justify-center items-center gap-4 mt-3 sm:mt-4">
            <a 
              href="https://instagram.com/impression_kbeauty" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-black hover:underline"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">@impressionkbeauty</span>
            </a>
            <a 
              href="https://www.tiktok.com/@impression_kbeauty" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-black hover:underline"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
              </svg>
              <span className="text-sm sm:text-base">@impressionkbeauty</span>
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setActiveFilters({ ...activeFilters, platform: 'all' })}
              className={`px-4 py-2 text-sm font-medium ${
                activeFilters.platform === 'all'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-200 rounded-l-lg`}
            >
              All Posts
            </button>
            <button
              type="button"
              onClick={() => setActiveFilters({ ...activeFilters, platform: 'instagram' })}
              className={`px-4 py-2 text-sm font-medium ${
                activeFilters.platform === 'instagram'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-200`}
            >
              Instagram
            </button>
            <button
              type="button"
              onClick={() => setActiveFilters({ ...activeFilters, platform: 'tiktok' })}
              className={`px-4 py-2 text-sm font-medium ${
                activeFilters.platform === 'tiktok'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-200 rounded-r-lg`}
            >
              TikTok
            </button>
          </div>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex justify-end mb-4">
            <AddSocialPostButton showOnList onAdd={fetchPosts} />
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
            <button 
              onClick={fetchPosts}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Social Media Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="group relative">
                <a 
                  href={post.externalUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-square overflow-hidden">
                    {post.mediaType === 'image' ? (
                      <Image 
                        src={post.mediaUrl} 
                        alt={post.caption}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <>
                        {/* Video Thumbnail */}
                        <Image 
                          src={post.thumbnailUrl || post.mediaUrl} 
                          alt={post.caption}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 border-t-4 border-t-transparent border-l-8 border-l-white border-b-4 border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 h-4 sm:h-5 sm:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          {post.likes}
                        </span>
                      </div>
                    </div>
                    {/* Platform badge */}
                    <div className="absolute top-2 left-2 bg-white bg-opacity-80 rounded-full p-1">
                      {post.platform === 'instagram' ? (
                        <Instagram className="w-4 h-4" />
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="mt-1 sm:mt-2">
                    <p className="text-xs sm:text-sm text-black line-clamp-1">{post.caption}</p>
                  </div>
                </a>

                {/* Admin Controls */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex space-x-1.5 z-10">
                    <SocialPostEdit post={post} onUpdate={fetchPosts} />
                    <button 
                      onClick={(e) => handleDeletePost(post.id, e)}
                      className="p-1.5 rounded-full bg-white shadow-md hover:bg-red-50 text-gray-500 hover:text-red-500"
                      disabled={deletingPostId === post.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {activeFilters.platform === 'instagram' ? (
                <Instagram className="w-8 h-8 text-gray-400" />
              ) : activeFilters.platform === 'tiktok' ? (
                <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                </svg>
              ) : (
                <ExternalLink className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <p className="text-gray-500">No {activeFilters.platform === 'all' ? 'social media' : activeFilters.platform} posts found</p>
            {isAdmin && (
              <button
                onClick={() => document.querySelector<HTMLButtonElement>('[data-add-social-post]')?.click()}
                className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Add Your First Post
              </button>
            )}
          </div>
        )}

        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="https://www.tiktok.com/@impression_kbeauty"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black text-black px-4 sm:px-6 py-1.5 sm:py-2 rounded-md hover:bg-black hover:text-white transition-colors inline-block text-xs sm:text-sm"
          >
            See More Posts
          </Link>
        </div>
      </div>
    </section>
  );
}