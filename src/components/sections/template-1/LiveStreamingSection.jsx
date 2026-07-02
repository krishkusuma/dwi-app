export default function LiveStreamingSection({ data }) {
    const showInstagram = data.lsChannels?.instagram && data.instagramUrl;
    const showYoutube = data.lsChannels?.youtube && data.youtubeUrl;
  
    return (
      <div
        id="livestreaming-section"
        className="invitation-livestreaming min-h-screen flex flex-col justify-center items-center px-5 py-10 border-t text-center"
      >
        <h3 className="invitation-ls-heading font-serif text-2xl mb-3">{data.lsHeading}</h3>
        <p className="invitation-ls-content text-sm mb-6 max-w-md">{data.lsContent}</p>
  
        <div className="invitation-ls-buttons flex flex-col gap-3 w-full max-w-sm">
          {showInstagram && (
            <a
              href={data.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="invitation-ls-button invitation-ls-button-ig px-5 py-2.5 text-sm rounded-full"
            >
              📷 Tonton di Instagram
            </a>
          )}
          {showYoutube && (
            <a
              href={data.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="invitation-ls-button invitation-ls-button-yt px-5 py-2.5 text-sm rounded-full"
            >
              ▶️ Tonton di YouTube
            </a>
          )}
        </div>
      </div>
    );
  }
  