'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Badge, Button, Card } from '@photomagic/ui';
import { supabaseClient } from '@photomagic/auth';
import {
  Camera,
  Image as ImageIcon,
  Heart,
  Star,
  CheckCircle2,
  Filter,
  Sparkles,
  Share2,
  Download,
  Eye,
  SlidersHorizontal,
  Lock,
  Search,
  Maximize2,
  Columns,
  Layers,
  MessageSquarePlus,
  Send,
  UserCheck,
  Users,
  Radio,
  BellRing,
  Pin,
  Check,
} from 'lucide-react';

interface CommentItem {
  id: string;
  author: string;
  role: 'bride' | 'groom' | 'studio';
  text: string;
  timestamp: string;
}

interface PhotoItem {
  id: string;
  url: string;
  category: 'muhurtham' | 'reception' | 'haldi' | 'portraits';
  title: string;
  faceTags: string[];
  stars: number;
  isFavorite: boolean;
  notes?: string;
  dimensions: string;
  comments?: CommentItem[];
}

const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'ph-1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    category: 'portraits',
    title: 'Royal Bridal Portrait in Kanchipuram Silk',
    faceTags: ['Arifa (Bride)'],
    stars: 5,
    isFavorite: true,
    dimensions: '6000 x 4000 (24 MP)',
    comments: [
      {
        id: 'c-1',
        author: 'Arifa (Bride)',
        role: 'bride',
        text: 'Master shot for the 12x18 front cover!',
        timestamp: '5 mins ago',
      },
    ],
  },
  {
    id: 'ph-2',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    category: 'muhurtham',
    title: 'Sacred Talambralu Ceremony Moment',
    faceTags: ['Arifa (Bride)', 'Julian (Groom)'],
    stars: 5,
    isFavorite: true,
    dimensions: '6000 x 4000 (24 MP)',
  },
  {
    id: 'ph-3',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    category: 'reception',
    title: 'Grand Ballroom Entrance Walkway',
    faceTags: ['Julian (Groom)', 'Arifa (Bride)'],
    stars: 4,
    isFavorite: true,
    dimensions: '6000 x 4000 (24 MP)',
  },
  {
    id: 'ph-4',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
    category: 'portraits',
    title: 'Bride Close-Up Iris & Jewelry Detail',
    faceTags: ['Arifa (Bride)'],
    stars: 5,
    isFavorite: false,
    dimensions: '6000 x 4000 (24 MP)',
  },
  {
    id: 'ph-5',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
    category: 'haldi',
    title: 'Groom Haldi Marigold Splash',
    faceTags: ['Julian (Groom)'],
    stars: 4,
    isFavorite: true,
    dimensions: '6000 x 4000 (24 MP)',
  },
  {
    id: 'ph-6',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80',
    category: 'haldi',
    title: 'Family Laughter & Turmeric Blessings',
    faceTags: ['Family VIPs', 'Arifa (Bride)'],
    stars: 4,
    isFavorite: false,
    dimensions: '6000 x 4000 (24 MP)',
  },
  {
    id: 'ph-7',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
    category: 'reception',
    title: 'Father of the Bride Toast Speech',
    faceTags: ['Family VIPs'],
    stars: 5,
    isFavorite: true,
    dimensions: '6000 x 4000 (24 MP)',
  },
  {
    id: 'ph-8',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
    category: 'muhurtham',
    title: 'Mangalsutra Sacred Knot Moment',
    faceTags: ['Arifa (Bride)', 'Julian (Groom)'],
    stars: 5,
    isFavorite: true,
    dimensions: '6000 x 4000 (24 MP)',
  },
];

export default function GalleryManagementPage() {
  const [photos, setPhotos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFaceTag, setSelectedFaceTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [comparePhotos, setComparePhotos] = useState<PhotoItem[]>([]);
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<PhotoItem | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  // Realtime Live Collaboration & Presence State
  const [onlineCollaborators, setOnlineCollaborators] = useState([
    { id: '1', name: 'Arifa (Bride)', role: 'Client VIP', avatar: '👰' },
    { id: '2', name: 'Julian (Groom)', role: 'Client VIP', avatar: '🤵' },
    { id: '3', name: 'RK Studio Lead', role: 'Colorist', avatar: '📸' },
  ]);
  const [liveToast, setLiveToast] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const realtimeChannelRef = useRef<any>(null);

  const packageQuota = 60;
  const selectedCount = photos.filter((p) => p.isFavorite).length;

  // Initialize Supabase Realtime Channel for Live Multi-User Sync
  useEffect(() => {
    try {
      const channel = supabaseClient.channel('proofing-gallery-live', {
        config: { broadcast: { self: false } },
      });

      channel
        .on('broadcast', { event: 'photo-favorite-toggled' }, ({ payload }) => {
          setPhotos((prev) =>
            prev.map((p) => (p.id === payload.id ? { ...p, isFavorite: payload.isFavorite } : p)),
          );
          setLiveToast(
            `${payload.author || 'Collaborator'} ${payload.isFavorite ? 'shortlisted' : 'unselected'} photo #${payload.id.split('-')[1]}`,
          );
        })
        .on('broadcast', { event: 'photo-rated' }, ({ payload }) => {
          setPhotos((prev) =>
            prev.map((p) => (p.id === payload.id ? { ...p, stars: payload.stars } : p)),
          );
          setLiveToast(
            `${payload.author || 'Collaborator'} rated photo #${payload.id.split('-')[1]} with ${payload.stars} stars`,
          );
        })
        .on('broadcast', { event: 'comment-added' }, ({ payload }) => {
          setPhotos((prev) =>
            prev.map((p) => {
              if (p.id === payload.photoId) {
                return {
                  ...p,
                  comments: [...(p.comments || []), payload.comment],
                };
              }
              return p;
            }),
          );
          setLiveToast(
            `${payload.comment.author} added a retouch note on photo #${payload.photoId.split('-')[1]}`,
          );
        })
        .on('broadcast', { event: 'selections-locked' }, ({ payload }) => {
          setIsApproved(true);
          setLiveToast(`🎉 Selections locked and submitted by ${payload.author}!`);
        })
        .subscribe();

      realtimeChannelRef.current = channel;

      return () => {
        supabaseClient.removeChannel(channel);
      };
    } catch {
      // Local graceful fallback when realtime server is offline
    }
  }, []);

  // Clear live toast after 4 seconds
  useEffect(() => {
    if (liveToast) {
      const timer = setTimeout(() => setLiveToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [liveToast]);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPhotos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextFav = !p.isFavorite;
          // Broadcast to connected clients
          realtimeChannelRef.current?.send({
            type: 'broadcast',
            event: 'photo-favorite-toggled',
            payload: { id, isFavorite: nextFav, author: 'You' },
          });
          return { ...p, isFavorite: nextFav };
        }
        return p;
      }),
    );
  };

  const setRating = (id: string, stars: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPhotos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          realtimeChannelRef.current?.send({
            type: 'broadcast',
            event: 'photo-rated',
            payload: { id, stars, author: 'You' },
          });
          return { ...p, stars };
        }
        return p;
      }),
    );
  };

  const handleAddComment = (photoId: string) => {
    if (!newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      author: 'You (Reviewer)',
      role: 'studio',
      text: newCommentText.trim(),
      timestamp: 'Just now',
    };

    setPhotos((prev) =>
      prev.map((p) => {
        if (p.id === photoId) {
          return {
            ...p,
            comments: [...(p.comments || []), newComment],
          };
        }
        return p;
      }),
    );

    realtimeChannelRef.current?.send({
      type: 'broadcast',
      event: 'comment-added',
      payload: { photoId, comment: newComment },
    });

    setNewCommentText('');
  };

  const toggleCompare = (photo: PhotoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (comparePhotos.find((p) => p.id === photo.id)) {
      setComparePhotos((prev) => prev.filter((p) => p.id !== photo.id));
    } else {
      if (comparePhotos.length >= 2) {
        setComparePhotos([comparePhotos[1], photo]);
      } else {
        setComparePhotos((prev) => [...prev, photo]);
      }
    }
  };

  const filteredPhotos = photos.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedFaceTag !== 'all' && !p.faceTags.includes(selectedFaceTag)) return false;
    if (favoritesOnly && !p.isFavorite) return false;
    if (
      searchQuery &&
      !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.faceTags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24 text-ivory">
      {/* Live Sync Broadcast Toast */}
      {liveToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#1A1A1A] border border-gold-500/50 shadow-2xl rounded-2xl p-4 flex items-center gap-3 animate-slideUp">
          <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center animate-pulse">
            <Radio size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gold-400 font-bold">
              Supabase Realtime Sync
            </span>
            <span className="text-xs text-ivory font-medium">{liveToast}</span>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold">Phase 3.4 Live Collaborative Proofing</Badge>
            <Badge variant="success" className="flex items-center gap-1">
              <Radio size={12} className="text-emerald-400 animate-pulse" /> Realtime WebSockets
              Active
            </Badge>
          </div>
          <h1 className="font-heading text-3xl font-bold text-ivory mt-1">
            Photo Proofing & Selection Vault
          </h1>
          <p className="text-xs text-silver font-light">
            Multi-device synchronized proofing: bride, groom, and colorists rate and annotate takes
            simultaneously.
          </p>
        </div>

        {/* Live Collaborators Presence Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-[#141414] border border-white/10 px-3 py-1.5 rounded-xl text-xs">
            <Users size={14} className="text-gold-400" />
            <span className="text-silver text-[11px]">Active Viewers:</span>
            <div className="flex -space-x-1.5 items-center">
              {onlineCollaborators.map((c) => (
                <div
                  key={c.id}
                  title={`${c.name} (${c.role})`}
                  className="w-6 h-6 rounded-full bg-surface-elevated border border-gold-500/40 flex items-center justify-center text-xs cursor-pointer hover:scale-110 transition-transform"
                >
                  {c.avatar}
                </div>
              ))}
            </div>
          </div>

          {comparePhotos.length === 2 && (
            <Button
              variant="primary"
              onClick={() => setActiveLightboxPhoto(comparePhotos[0])}
              className="flex items-center gap-1.5 text-xs font-bold animate-pulse"
            >
              <Columns size={14} /> Compare 2 Selected
            </Button>
          )}

          <Button
            variant={isApproved ? 'secondary' : 'primary'}
            onClick={() => setIsApprovalModalOpen(true)}
            className="flex items-center gap-2 font-bold"
          >
            {isApproved ? (
              <CheckCircle2 size={16} className="text-emerald-400" />
            ) : (
              <Lock size={16} />
            )}
            {isApproved ? 'Selections Locked & Approved' : 'Lock & Submit Selections'}
          </Button>
        </div>
      </div>

      {/* Client Selection Quota Status Bar */}
      <Card
        variant="glass"
        className="p-5 flex flex-col md:flex-row items-center justify-between gap-4 border-gold-500/30 shadow-kodakGlow"
      >
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 flex-shrink-0">
            <Heart size={22} className="fill-gold-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-ivory">Client Selection Quota Progress</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-mono text-xl font-bold text-gold-400">{selectedCount}</span>
              <span className="text-xs text-silver">
                / {packageQuota} Photos Included in Royal Heirloom Package
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-64 flex flex-col gap-1.5">
          <div className="w-full bg-[#1D1D1D] h-2.5 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-gold-500 h-full rounded-full transition-all duration-300 shadow-kodakGlow"
              style={{ width: `${Math.min(100, (selectedCount / packageQuota) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-silver font-mono">
            <span>{Math.round((selectedCount / packageQuota) * 100)}% Fulfilled</span>
            <span>{Math.max(0, packageQuota - selectedCount)} remaining</span>
          </div>
        </div>
      </Card>

      {/* Filter Toolbar: Categories, Face Recognition, Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Moments' },
            { id: 'portraits', label: 'Bridal Portraits' },
            { id: 'muhurtham', label: 'Muhurtham' },
            { id: 'haldi', label: 'Haldi & Sangeet' },
            { id: 'reception', label: 'Grand Reception' },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={selectedCategory === tab.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(tab.id)}
              className="text-xs font-semibold whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* AI Face Tags & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-[#141414] px-3 py-1.5 rounded-lg border border-white/10 text-xs">
            <UserCheck size={14} className="text-gold-400" />
            <span className="text-silver text-[11px] mr-1">Face Tag:</span>
            <select
              value={selectedFaceTag}
              onChange={(e) => setSelectedFaceTag(e.target.value)}
              className="bg-transparent text-ivory text-xs focus:outline-none font-medium cursor-pointer"
            >
              <option value="all" className="bg-[#141414]">
                All Faces
              </option>
              <option value="Arifa (Bride)" className="bg-[#141414]">
                Arifa (Bride)
              </option>
              <option value="Julian (Groom)" className="bg-[#141414]">
                Julian (Groom)
              </option>
              <option value="Family VIPs" className="bg-[#141414]">
                Family VIPs
              </option>
            </select>
          </div>

          <Button
            variant={favoritesOnly ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className="flex items-center gap-1.5 text-xs"
          >
            <Heart size={13} className={favoritesOnly ? 'fill-black' : 'text-gold-400'} />
            Favorites ({selectedCount})
          </Button>
        </div>
      </div>

      {/* Masonry Proofing Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => {
          const isComparing = Boolean(comparePhotos.find((p) => p.id === photo.id));

          return (
            <div
              key={photo.id}
              onClick={() => setActiveLightboxPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden bg-[#141414] border border-white/10 hover:border-gold-500/50 transition-all duration-300 shadow-xl cursor-pointer flex flex-col"
            >
              {/* Photo Image Aspect */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Top Action Overlay Badges */}
                <div className="absolute top-3 inset-x-3 flex justify-between items-center z-10">
                  <span className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-ivory border border-white/10">
                    {photo.category.toUpperCase()}
                  </span>

                  <button
                    onClick={(e) => toggleFavorite(photo.id, e)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md ${
                      photo.isFavorite
                        ? 'bg-gold-500 text-black shadow-kodakGlow'
                        : 'bg-black/60 text-white/80 hover:text-white hover:bg-black/80'
                    }`}
                  >
                    <Heart size={16} className={photo.isFavorite ? 'fill-black' : ''} />
                  </button>
                </div>

                {/* Compare Checkbox Button */}
                <button
                  onClick={(e) => toggleCompare(photo, e)}
                  className={`absolute top-14 right-3 px-2 py-1 rounded-md text-[10px] font-mono font-bold transition-all backdrop-blur-md z-10 ${
                    isComparing
                      ? 'bg-emerald-500 text-black shadow-lg'
                      : 'bg-black/60 text-white/70 hover:text-white hover:bg-black/80 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {isComparing ? '✓ Comparing' : '+ Compare'}
                </button>

                {/* Comment Pin Counter */}
                {photo.comments && photo.comments.length > 0 && (
                  <div className="absolute top-14 left-3 px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-gold-500 text-black shadow-md flex items-center gap-1 z-10">
                    <Pin size={11} /> {photo.comments.length}
                  </div>
                )}

                {/* Face Tag Badges */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1 z-10">
                  {photo.faceTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-gold-500/20 text-gold-300 backdrop-blur-md border border-gold-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Photo Metadata & Star Rating Footer */}
              <div className="p-4 flex flex-col gap-2 bg-[#171717] border-t border-white/5">
                <span className="font-heading font-semibold text-xs text-ivory truncate">
                  {photo.title}
                </span>

                <div className="flex justify-between items-center pt-1 border-t border-white/5 text-xs">
                  {/* 1-5 Star Selector */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        onClick={(e) => setRating(photo.id, s, e)}
                        className="text-gold-400 hover:scale-125 transition-transform"
                      >
                        <Star
                          size={13}
                          className={
                            s <= photo.stars ? 'fill-gold-400 text-gold-400' : 'text-silver/30'
                          }
                        />
                      </button>
                    ))}
                  </div>

                  <span className="font-mono text-[10px] text-silver/60">
                    {photo.dimensions.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Compare & Annotation Modal */}
      {activeLightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 animate-fadeIn">
          {/* Lightbox Top Header */}
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="font-heading text-base font-bold text-ivory">
                {activeLightboxPhoto.title}
              </span>
              <Badge variant="gold">{activeLightboxPhoto.dimensions}</Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={activeLightboxPhoto.isFavorite ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => toggleFavorite(activeLightboxPhoto.id)}
                className="flex items-center gap-1.5"
              >
                <Heart size={14} className={activeLightboxPhoto.isFavorite ? 'fill-black' : ''} />
                {activeLightboxPhoto.isFavorite ? 'Shortlisted' : 'Add to Shortlist'}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setActiveLightboxPhoto(null)}>
                Close (Esc)
              </Button>
            </div>
          </div>

          {/* Lightbox Main Stage & Side Retouch Notes Drawer */}
          <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 my-4 overflow-hidden">
            {/* Image Canvas View (3 Cols) */}
            <div className="lg:col-span-3 flex items-center justify-center bg-black/60 rounded-2xl border border-white/10 p-2 overflow-hidden">
              {comparePhotos.length === 2 ? (
                <div className="grid grid-cols-2 gap-4 w-full h-full max-h-[70vh]">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-gold-500/40 bg-black flex items-center justify-center">
                    <img
                      src={comparePhotos[0].url}
                      alt={comparePhotos[0].title}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 px-2.5 py-1 rounded-md text-xs font-mono text-gold-400 font-bold">
                      Take A: {comparePhotos[0].title}
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-black flex items-center justify-center">
                    <img
                      src={comparePhotos[1].url}
                      alt={comparePhotos[1].title}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 px-2.5 py-1 rounded-md text-xs font-mono text-emerald-400 font-bold">
                      Take B: {comparePhotos[1].title}
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={activeLightboxPhoto.url}
                  alt={activeLightboxPhoto.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              )}
            </div>

            {/* Live Retouch Notes Drawer (1 Col) */}
            <Card variant="glass" className="p-4 flex flex-col justify-between h-full max-h-[70vh]">
              <div className="flex flex-col gap-3 overflow-y-auto pr-1">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <Pin size={16} className="text-gold-400" />
                  <span className="text-xs font-bold text-ivory">Live Retouch Annotations</span>
                </div>

                {/* Comment Feed */}
                <div className="flex flex-col gap-2.5">
                  {(!activeLightboxPhoto.comments || activeLightboxPhoto.comments.length === 0) && (
                    <span className="text-xs text-silver/60 italic py-4 text-center">
                      No retouch notes pinned yet. Add instructions for the colorist below.
                    </span>
                  )}
                  {activeLightboxPhoto.comments?.map((c) => (
                    <div
                      key={c.id}
                      className="p-2.5 rounded-xl bg-[#141414] border border-white/10 flex flex-col gap-1 text-xs"
                    >
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-gold-400">{c.author}</span>
                        <span className="text-silver/60 font-mono">{c.timestamp}</span>
                      </div>
                      <p className="text-ivory leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input for New Comment */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Pin retouch note (e.g. skin tone, flare)..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(activeLightboxPhoto.id);
                    }}
                    className="flex-1 bg-[#141414] border border-white/10 rounded-xl px-3 py-2 text-xs text-ivory placeholder:text-silver/40 focus:outline-none focus:border-gold-500"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAddComment(activeLightboxPhoto.id)}
                    className="px-3"
                  >
                    <Send size={14} />
                  </Button>
                </div>
                <span className="text-[10px] text-silver/60">
                  Broadcasts live across all open sessions
                </span>
              </div>
            </Card>
          </div>

          {/* Lightbox Footer Navigation */}
          <div className="flex justify-between items-center pt-4 border-t border-white/10 text-xs text-silver">
            <span>Use arrow keys to navigate takes • Press Esc to exit</span>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const idx = photos.findIndex((p) => p.id === activeLightboxPhoto.id);
                  if (idx > 0) setActiveLightboxPhoto(photos[idx - 1]);
                }}
              >
                Previous Take
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const idx = photos.findIndex((p) => p.id === activeLightboxPhoto.id);
                  if (idx < photos.length - 1) setActiveLightboxPhoto(photos[idx + 1]);
                }}
              >
                Next Take
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Approval Confirmation Modal */}
      {isApprovalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card
            variant="glass"
            className="max-w-md w-full p-6 flex flex-col gap-5 border-gold-500/40 shadow-2xl"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center">
                <Lock size={20} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-ivory">Lock & Approve Selections</h3>
                <span className="text-xs text-silver font-mono">12x18 Archival Book Dispatch</span>
              </div>
            </div>

            <p className="text-xs text-silver leading-relaxed">
              You are locking{' '}
              <strong className="text-gold-400">{selectedCount} shortlisted photos</strong> for
              final retouching and 12x18 album layout generation. Once locked, your selections are
              dispatched directly to our lead colorists and print labs.
            </p>

            <div className="p-3 rounded-xl bg-[#141414] border border-white/10 text-xs font-mono flex justify-between text-silver">
              <span>Client Signature:</span>
              <span className="text-ivory font-bold">Arifa Bivi & Julian</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setIsApprovalModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsApproved(true);
                  setIsApprovalModalOpen(false);
                  realtimeChannelRef.current?.send({
                    type: 'broadcast',
                    event: 'selections-locked',
                    payload: { author: 'Arifa Bivi & Julian' },
                  });
                }}
                className="font-bold flex items-center gap-1.5"
              >
                <CheckCircle2 size={15} /> Confirm & Dispatch
              </Button>
            </div>
          </Card>
        </div>
      )}
    </main>
  );
}
