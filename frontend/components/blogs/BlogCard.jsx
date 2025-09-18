'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


export function BlogCard({ title, content, imageRef, category, author, createdAt }) {
  return (
    <Card className="pt-0 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      {imageRef && (
        <div className="relative h-44 w-full">
          <Image
            src={imageRef}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader className="space-y-1 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-base line-clamp-1">{title}</h3>
          {category && <Badge variant="secondary">{category}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{content}</p>
        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          {author && <span>By {author}</span>}
          {createdAt && <span>{new Date(createdAt).toLocaleDateString()}</span>}
        </div>
      </CardContent>
    </Card>
  )
}