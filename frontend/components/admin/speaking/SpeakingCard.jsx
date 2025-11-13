

function getYouTubeEmbedUrl(url) {
  // Support both youtu.be and youtube.com URLs
  if (!url) return '';
  const ytMatch = url.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  return ytMatch ? `https://www.youtube.com/embed/${ytMatch[1]}` : '';
}

export function SpeakingCard({ id, title, videoRef, description, author, createdAt }) {
  const isYouTube = videoRef && (videoRef.includes('youtu.be') || videoRef.includes('youtube.com'));
  const embedUrl = isYouTube ? getYouTubeEmbedUrl(videoRef) : videoRef;
  return (
    <div className="bg-background rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full cursor-pointer border border-border">
      <div className="relative w-full h-48 bg-black">
        {videoRef ? (
          isYouTube ? (
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover border-0"
            />
          ) : (
            <video
              src={videoRef}
              controls={true}
              className="w-full h-full object-cover"
              poster={videoRef + '?poster'}
              preload="metadata"
              muted
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Video</div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-base line-clamp-2 mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{description}</p>
        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          {author && <span>By {author.name}</span>}
          {createdAt && <span>{new Date(createdAt).toLocaleDateString()}</span>}
        </div>
      </div>
    </div>
  );
}
