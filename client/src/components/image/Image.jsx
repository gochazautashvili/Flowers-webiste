import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dxesljzkl",
  },
});

function Image({ mainImg, title, width, height }) {
  return (
    <img
      loading="lazy"
      src={cld
        .image(mainImg)
        .resize(Resize.scale().width(width).height(height))
        .quality("auto")
        .format("auto")
        .toURL()}
      alt={title}
    />
  );
}

export default Image;
