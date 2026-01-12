'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, Eye, Calendar, User, Edit, ArrowLeft, Share2, Code, FileText, Layers, Palette, Zap, TrendingUp } from 'lucide-react';
import { CheatSheet } from '@/types/cheatsheet';
import { CheatSheetService } from '@/services/cheatsheetService';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const CheatSheetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [cheatSheet, setCheatSheet] = useState<CheatSheet | null>(null);
  const [loading, setLoading] = useState(true);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    if (id) {
      loadCheatSheet();
    }
  }, [id]);

  const loadCheatSheet = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const sheet = await CheatSheetService.getCheatSheetById(id);
      if (sheet) {
        setCheatSheet(sheet);
        // Increment view count
        await CheatSheetService.incrementViews(id);
      }
    } catch (error) {
      console.error('Error loading cheat sheet:', error);
      toast({
        title: "Error",
        description: "Failed to load cheat sheet",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!cheatSheet || liking) return;

    try {
      setLiking(true);
      await CheatSheetService.toggleLike(cheatSheet.id, user.uid);
      // Refresh the cheat sheet data
      await loadCheatSheet();
      toast({
        title: "Success",
        description: "Like updated successfully",
      });
    } catch (error) {
      console.error('Error liking cheat sheet:', error);
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive",
      });
    } finally {
      setLiking(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: cheatSheet?.title,
          text: `Check out this cheat sheet: ${cheatSheet?.title}`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Cheat sheet link copied to clipboard",
      });
    }
  };

  const handleEdit = () => {
    if (cheatSheet && user && user.uid === cheatSheet.authorId) {
      navigate(`/cheatsheets/${cheatSheet.id}/edit`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-muted rounded mb-6"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!cheatSheet) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cheat Sheet Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The cheat sheet you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/cheatsheets')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cheat Sheets
          </Button>
        </div>
      </div>
    );
  }

  const canEdit = user && user.uid === cheatSheet.authorId;

  // BentoGrid Item Component
  const BentoGridItem = ({
    title,
    description,
    icon,
    className,
    size = 'small',
    children,
  }: {
    title: string;
    description?: string;
    icon: React.ReactNode;
    className?: string;
    size?: 'small' | 'medium' | 'large';
    children?: React.ReactNode;
  }) => {
    const variants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring' as const, damping: 25 },
      },
    };

    return (
      <motion.div
        variants={variants}
        className={cn(
          'group border-teal-200 dark:border-teal-800   to-teal-50 dark:from-gray-900 dark:to-teal-950/20 hover:border-teal-400 dark:hover:border-teal-600 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border px-6 pt-6 pb-10 shadow-lg hover:shadow-teal-100 dark:hover:shadow-teal-900/30 transition-all duration-500 hover:scale-[1.02]',
          className,
        )}
      >
        <div className="absolute top-0 -right-1/2 z-0 size-full cursor-pointer bg-[linear-gradient(to_right,#e0ffff1a_1px,transparent_1px),linear-gradient(to_bottom,#e0ffff1a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]"></div>

        <div className="text-teal-100/20 group-hover:text-teal-200/40 absolute right-1 bottom-3 scale-[6] transition-all duration-700 group-hover:scale-[6.2]">
          {icon}
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <div className="bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-700 text-teal-700 dark:text-teal-100 shadow-teal-200/50 dark:shadow-teal-900/50 group-hover:from-teal-200 group-hover:to-teal-300 dark:group-hover:from-teal-700 dark:group-hover:to-teal-600 mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:shadow-teal-300/60 dark:group-hover:shadow-teal-800/60">
              {icon}
            </div>
            <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-800 dark:text-white">{title}</h3>
            {description && (
              <p className="text-teal-600 dark:text-teal-300 text-sm">{description}</p>
            )}
            {children}
          </div>
          <div className="from-teal-400 to-teal-600 dark:from-teal-500 dark:to-teal-400 absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r blur-2xl transition-all duration-500 group-hover:blur-lg" />
        </div>
      </motion.div>
    );
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="h-full w-full bg-teal-200   to-teal-900/10 z-20">
      <div className="max-w-9xl  mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/cheatsheets')}
            className="mb-6 hover:bg-teal-100/50 hover:text-teal-700 dark:hover:bg-teal-900/20 transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cheat Sheets
          </Button>

          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-800 via-teal-600 to-teal-400 bg-clip-text text-transparent mb-4 drop-shadow-sm"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {cheatSheet.title}
            </motion.h1>
            <motion.div
              className="flex items-center justify-center gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Badge variant="secondary" className="text-base px-3 py-1 bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-100 border-teal-200 dark:border-teal-700">
                {cheatSheet.category}
              </Badge>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{cheatSheet.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{cheatSheet.createdAt.toLocaleDateString()}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* BentoGrid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Stats Card */}
          <BentoGridItem
            title="Engagement"
            description="Community interaction metrics"
            icon={<TrendingUp className="size-6" />}
            size="medium"
            className="col-span-2"
          >
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Views</span>
                <span className="font-semibold">{cheatSheet.views}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Likes</span>
                <span className="font-semibold">{cheatSheet.likes}</span>
              </div>
            </div>
          </BentoGridItem>

          {/* Author Card */}
          <BentoGridItem
            title="Author"
            description="Content creator"
            icon={<User className="size-6" />}
            size="small"
            className="col-span-2"
          >
            <div className="mt-4">
              <p className="font-medium">{cheatSheet.authorName}</p>
              <p className="text-sm text-muted-foreground">Published {cheatSheet.createdAt.toLocaleDateString()}</p>
            </div>
          </BentoGridItem>

          {/* Actions Card */}
          <BentoGridItem
            title="Actions"
            description="Interact with this cheatsheet"
            icon={<Zap className="size-6" />}
            size="small"
            className="col-span-2"
          >
            <div className="mt-4 space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                disabled={liking}
                className="w-full border-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:border-teal-400 text-teal-700 dark:text-teal-100"
              >
                <Heart className={`h-4 w-4 mr-2 ${liking ? 'animate-pulse' : ''}`} />
                {cheatSheet.likes} Likes
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="w-full border-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:border-teal-400 text-teal-700 dark:text-teal-100">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              {canEdit && (
                <Button variant="outline" size="sm" onClick={handleEdit} className="w-full border-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:border-teal-400 text-teal-700 dark:text-teal-100">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </BentoGridItem>

          {/* Tags Card */}
          {cheatSheet.tags.length > 0 && (
            <BentoGridItem
              title="Tags"
              description="Related topics"
              icon={<Layers className="size-6" />}
              size="medium"
              className="col-span-3"
            >
              <div className="mt-4 flex flex-wrap gap-2">
                {cheatSheet.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs border-teal-300 text-teal-700 dark:text-teal-100 bg-teal-50 dark:bg-teal-900/20">
                    {tag}
                  </Badge>
                ))}
              </div>
            </BentoGridItem>
          )}

          {/* Content Preview Card */}
          <BentoGridItem
            title="Content"
            description="Cheatsheet content"
            icon={<FileText className="size-6" />}
            size="large"
            className="col-span-3"
          >
            <div className="mt-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <MarkdownRenderer content={cheatSheet.content.substring(0, 500) + (cheatSheet.content.length > 500 ? '...' : '')} />
              </div>
              {cheatSheet.content.length > 500 && (
                <Button variant="ghost" className="mt-4 p-0 h-auto text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300">
                  Read full content →
                </Button>
              )}
            </div>
          </BentoGridItem>
        </motion.div>

        {/* Full Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="backdrop-blur-sm bg-background/80 border-teal-300 dark:border-teal-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Full Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <MarkdownRenderer content={cheatSheet.content} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CheatSheetDetailPage;
