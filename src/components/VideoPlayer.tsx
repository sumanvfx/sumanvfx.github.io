import React from 'react';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  videoType: 'local' | 'youtube';
  videoSource: string;
  isOpen: boolean;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoType,
  videoSource,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-auto">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 focus:outline-none"
          aria-label="Close video"
        >
          <X size={24} />
        </button>
        
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
          {videoType === 'youtube' ? (
            <iframe
              src={`${videoSource}?autoplay=1`}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            ></iframe>
          ) : (
            <video
              src={videoSource}
              className="absolute top-0 left-0 w-full h-full"
              controls
              autoPlay
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;