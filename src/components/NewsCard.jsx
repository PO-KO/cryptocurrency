import React from "react";
import { DateTime } from "luxon";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const NewsCard = ({
  item: { name, url, image, description, datePublished: date, provider },
}) => {
  const convertDate = (date) => {
    return DateTime.fromISO(date).toRelative();
  };
  return (
    <a
      href={url}
      target="_blank"
      className="group shadow-main p-4 rounded-xl  relative overflow-hidden hover:shadow-md transition-all"
    >
      <div className="absolute w-0 rounded-full h-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 group-hover:w-full group-hover:h-full group-hover:rounded-none transition-all" />
      <div className="relative flex flex-col h-full">
        <div className="flex space-x-3 items-center mb-5">
          <h3 className="text-xl font-bold line-clamp-4">{name}</h3>
          <img
            src={image?.thumbnail?.contentUrl || demoImage}
            alt={name}
            className="rounded-xl max-w-full"
          />
        </div>
        <p className="text-sm text-gray-500 line-clamp-4 mb-5">{description}</p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            {provider[0].image ? (
              <img
                src={provider[0]?.image?.thumbnail?.contentUrl}
                alt={provider[0].name}
                className="w-8 h-8 rounded-full max-w-full"
                loading="lazy"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200" />
            )}

            <span className="text-xs ml-2">{provider[0].name}</span>
          </div>
          <span className="text-xs text-primary-dark font-semibold">
            {convertDate(date)}
          </span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
