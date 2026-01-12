import React, { useRef, useState } from "react";

const htmlResources = [
  {
    type: "video",
    title: "HTML Basics Tutorial",
    url: "https://example.com/html-basics-video.mp4",
    description: "Learn the fundamentals of HTML"
  },
  {
    type: "document",
    title: "HTML5 Specification",
    content: "The official HTML5 specification document provides detailed information about all HTML elements and their usage.",
    link: "#"
  },
  {
    type: "video",
    title: "Semantic HTML Guide",
    url: "https://example.com/semantic-html-video.mp4",
    description: "Understanding semantic HTML elements"
  },
  {
    type: "document",
    title: "HTML Accessibility Guidelines",
    content: "Best practices for making HTML accessible to all users, including ARIA attributes and keyboard navigation.",
    link: "#"
  },
  {
    type: "video",
    title: "Forms and Validation",
    url: "https://example.com/forms-validation-video.mp4",
    description: "Creating and validating HTML forms"
  },
  {
    type: "document",
    title: "HTML5 Canvas Tutorial",
    content: "Drawing graphics and animations using the HTML5 Canvas element.",
    link: "#"
  }
];

const VideoCard: React.FC<{ resource: any }> = ({ resource }) => {
  const [duration, setDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  if (resource.type === "video") {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
        <video
          width="100%"
          height="200"
          controls
          className="rounded-lg"
          ref={videoRef}
          onLoadedMetadata={handleLoadedMetadata}
        >
          <source src={resource.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="text-gray-600 mt-2">{resource.description}</p>
        {duration > 0 && (
          <p className="text-gray-500 mt-1">
            Duration: {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
          </p>
        )}
      </div>
    );
  } else {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
        <p className="text-gray-700">{resource.content}</p>
        <a href={resource.link} className="text-blue-500 underline mt-2 block">
          Read more
        </a>
      </div>
    );
  }
};

const HTMLPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">HTML Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {htmlResources.map((resource, index) => (
          <VideoCard key={index} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default HTMLPage;
