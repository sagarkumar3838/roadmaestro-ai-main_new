import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Eye, Calendar, User } from 'lucide-react';
import { CheatSheet } from '@/types/cheatsheet';
import { useNavigate } from 'react-router-dom';

interface CheatSheetCardProps {
  cheatSheet: CheatSheet;
  onLike?: (id: string) => void;
}

const CheatSheetCard: React.FC<CheatSheetCardProps> = ({ cheatSheet, onLike }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/cheatsheets/${cheatSheet.id}`);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(cheatSheet.id);
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {cheatSheet.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLikeClick}
            className="ml-2 flex-shrink-0"
          >
            <Heart className="h-4 w-4" />
            <span className="ml-1 text-sm">{cheatSheet.likes}</span>
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary">{cheatSheet.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {cheatSheet.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {cheatSheet.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{cheatSheet.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{cheatSheet.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{cheatSheet.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="truncate max-w-20">{cheatSheet.authorName}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheatSheetCard;
