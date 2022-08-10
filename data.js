import tags from "html-tags";

const Elements = {
  // By using this package, I don't need to worry about editing the list for updates to html lol
  void: tags.voidHtmlTags, // Self closing
  tags: tags.htmlTags, // Not self closing
};
const Attributes = {
  id: ["*"],
};

export { Elements, Attributes };
