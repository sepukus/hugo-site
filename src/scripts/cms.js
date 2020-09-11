window.CMS_MANUAL_INIT = true;

import React from "react";
import CMS, { init } from "netlify-cms-app";

import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
window.UIkit = UIkit;

// Import main site styles as a string to inject into the CMS preview pane
// eslint-disable-next-line import/no-unresolved
import styles from "!to-string-loader!css-loader!postcss-loader!sass-loader!../scss/main.scss";

const modules = {
  label: "Modules",
  name: "modules",
  widget: "list",
  types: [
    {
      label: "C03: Split Title with Content",
      name: "split_title_content",
      widget: "object",
      fields: [
        { label: "Title", name: "title", widget: "string", required: true },
        { label: "Image", name: "image", widget: "image", required: false },
        { label: "Lead Text", name: "leadtext", widget: "markdown", required: false },
        { label: "Content", name: "content", widget: "markdown", required: false },
      ],
    },
    {
      label: "C04: Spotlight with Image & Content",
      name: "spotlight_image_content",
      widget: "object",
      fields: [
        { label: "Image", name: "image", widget: "image" },
        { label: "Title 1", name: "title1", widget: "string", required: true },
        { label: "Content 1", name: "content1", widget: "markdown", required: true },
        { label: "Title 2", name: "title2", widget: "string" },
        { label: "Content 2", name: "content2", widget: "markdown" },
      ],
    },
  ],
};

function getField() {
  return {
    label: "Foot",
    name: "foot",
    widget: "string",
  };
}

init({
  config: {
    backend: {
      name: "git-gateway",
    },
    load_config_file: false,
    media_folder: "site/static/uploads",
    public_folder: "/uploads",
    collections: [
      /* Blog Collection */
      {
        label: "Blog",
        name: "blog",
        folder: "site/content/blog",
        create: true,
        fields: [
          { label: "Title", name: "title", widget: "string" },
          { label: "Publish Date", name: "date", widget: "datetime" },
          { label: "Featured Image", name: "thumbnail", widget: "image" },
          { label: "Body", name: "body", widget: "markdown" },
          getField(),
          modules,
        ],
      },
      /* End Blog Collection */

      /* News Collection */
      {
        label: "News",
        name: "news",
        folder: "site/content/news",
        create: true,
        fields: [{ label: "Title", name: "title", widget: "string" }, { label: "Body", name: "body", widget: "markdown" }, modules],
      },
      /* End News Collection */
    ],
  },
});
import TestPreview from "./cms-preview-templates/test";

CMS.registerPreviewStyle(styles, { raw: true });
CMS.registerPreviewTemplate("blog", TestPreview);
