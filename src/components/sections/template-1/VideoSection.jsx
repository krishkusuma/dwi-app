import { getYoutubeEmbedUrl } from "../core/utils/getYoutubeEmbedUrl";

export default function VideoSection({ data }) {
  const embedUrl = getYoutubeEmbedUrl(data.videoUrl);

  return (
    <div
      id="video-section"
      className="invitation-video min-h-screen flex flex-col justify-center items-center px-5 py-10 border-t text-center"
    >
      <h3 className="invitation-video-heading font-serif text-2xl mb-6">{data.videoHeading}</h3>

      {embedUrl ? (
        <div className="invitation-video-wrapper w-full max-w-md aspect-video">
          <iframe
            src={embedUrl}
            title={data.videoHeading}
            className="invitation-video-iframe w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <p className="invitation-video-empty text-sm text-gray-400">Video belum tersedia.</p>
      )}
    </div>
  );
}
