import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  owner: string;
  likes: number;
}

export const NFTCard: FC<NFTCardProps> = ({
  id,
  name,
  image,
  price,
  owner,
  likes
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
    >
      <div className="aspect-square relative group">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="primary" size="sm">
            View Details
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center gap-1 text-white/60">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span className="text-sm">{likes}</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-white/60">
          <span>Price</span>
          <span>{price} TON</span>
        </div>
        <div className="mt-2 text-xs text-white/40">
          Owner: {owner.slice(0, 6)}...{owner.slice(-4)}
        </div>
      </div>
    </motion.div>
  );
}; 