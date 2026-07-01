import { motion } from "framer-motion";

export default function StorySection({ data }) {
  return (
    <motion.div
      id="story-section"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4 }}
      className="invitation-story flex flex-col justify-center px-5 py-10 border-t overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <h2 className="invitation-story-title font-serif text-2xl text-center mb-8">{data.storyHeading}</h2>

      <div className="flex flex-col gap-8">
        {data.stories.map((story, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="invitation-story-item pl-4"
          >
            {story.storyImage && (
              <img
                src={story.storyImage}
                alt={story.storyTitle}
                className="invitation-story-image w-full h-40 object-cover mb-2"
              />
            )}
            <p className="invitation-story-date text-xs">{story.storyDate}</p>
            <h3 className="invitation-story-item-title font-serif text-lg mt-1 mb-1">{story.storyTitle}</h3>
            <p className="invitation-story-content text-sm leading-relaxed" style={{ whiteSpace: "pre-line" }}>{story.storyPost}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
