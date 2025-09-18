'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function BlogCard({ id, title, content, imageRef, category, author, createdAt }) {
  return (
    <Link href={`/admin-dashboard/blogs/${id}`} className="block h-full">
      <Card className="pt-0 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full cursor-pointer">
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className="font-semibold text-base line-clamp-1 cursor-pointer">{title}</h3>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs break-words">
                  {title}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {category && <Badge variant="secondary">{category}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-3 cursor-pointer">{content}</p>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs break-words">
                {content}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
            {author && <span>By {author}</span>}
            {createdAt && <span>{new Date(createdAt).toLocaleDateString()}</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}