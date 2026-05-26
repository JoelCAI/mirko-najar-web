// src/components/seo/metaGenerator.js
import { localBusiness } from "../config/localBusiness";

export const generateMeta = ({
  title,
  description,
  image,
  url
}) => {
  const seo = localBusiness.seo;

  return {
    title: title
      ? seo.titleTemplate.replace("%s", title)
      : seo.defaultTitle,

    description:
      description || seo.defaultDescription,

    image:
      image || seo.defaultOgImage,

    url:
      url || localBusiness.urls.website
  };
};