'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { NFTCard } from '@/components/NFTCard';
import { SearchFilters } from '@/components/SearchFilters';

// Моковые данные для демонстрации
const mockNFTs = [
  {
    id: '1',
    name: 'Digital Art #1',
    image: '/nft-1.jpg',
    price: 0.5,
    owner: '0x1234...5678',
    likes: 42,
    category: 'art'
  },
  {
    id: '2',
    name: 'Gaming NFT #2',
    image: '/nft-2.jpg',
    price: 1.2,
    owner: '0x8765...4321',
    likes: 128,
    category: 'gaming'
  },
  {
    id: '3',
    name: 'Music NFT #3',
    image: '/nft-1.jpg',
    price: 2.5,
    owner: '0x9876...1234',
    likes: 256,
    category: 'music'
  },
  {
    id: '4',
    name: 'Collectible #4',
    image: '/nft-2.jpg',
    price: 0.8,
    owner: '0x5432...8765',
    likes: 64,
    category: 'collectibles'
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [chatId, setChatId] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (category: string, sort: string) => {
    if (category) setSelectedCategory(category);
    if (sort) setSortBy(sort);
  };

  const handleSubscribe = async () => {
    if (!chatId) {
      alert('Please enter your Telegram chat ID');
      return;
    }

    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nft: mockNFTs[0], // Отправляем первый NFT как тестовое уведомление
          chatId: parseInt(chatId),
        }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        alert('Successfully subscribed to notifications!');
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Failed to subscribe. Please try again.');
    }
  };

  const filteredNFTs = useMemo(() => {
    let filtered = [...mockNFTs];

    // Фильтрация по поиску
    if (searchQuery) {
      filtered = filtered.filter(nft => 
        nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nft.owner.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтрация по категории
    if (selectedCategory) {
      filtered = filtered.filter(nft => nft.category === selectedCategory);
    }

    // Сортировка
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'popular':
            return b.likes - a.likes;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-[#0A0A0A]/80 backdrop-blur-md z-50 border-b border-white/10"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Image
              src="/logo.svg"
              alt="Tonnel Market"
              width={120}
              height={32}
              className="dark:invert"
            />
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-white/80 hover:text-white transition-colors">Market</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Collections</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Activity</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {!isSubscribed ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter Telegram Chat ID"
                  value={chatId}
                  onChange={(e) => setChatId(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-white/20 text-sm"
                />
                <Button variant="primary" size="sm" onClick={handleSubscribe}>
                  Subscribe
                </Button>
              </div>
            ) : (
              <Button variant="secondary" size="sm" disabled>
                Subscribed
              </Button>
            )}
            <Button variant="primary">Connect Wallet</Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <SearchFilters
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />

          {/* NFT Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredNFTs.map((nft) => (
              <NFTCard key={nft.id} {...nft} />
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © 2024 Tonnel Market. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Terms</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
