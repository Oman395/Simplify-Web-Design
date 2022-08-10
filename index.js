// Visual web editor designed to be simple and easy, while allowing *everything* to be controlled by the user.
//
// Written functionally, because I do OOP way too often and I want to try something else.

import fs from "fs";
import jsdom from "jsdom";
import { Elements, Attributes } from "./data.js";

const { document } = new jsdom.JSDOM().window;
let structure = {
  body: {},
  head: {},
  footer: {},
}; // Ignore <!DOCTYPE html> and <html> cause they will always be there

function createElement(type, parent, path, position) {
  let node = document.createElement(type);
  if (typeof position != "number") {
    // me when 0 == false
    parent.appendChild(node);
  } else {
    if (!parent.children[position]) {
      throw new Error(
        `Invalid position! Expected: ${0}-${
          list.children.length - 1
        }, got ${position}`
      );
    }
    parent.insertBefore(node, parent.children[position]);
  }
  let pos = structure[path[0]];
  for (let i = 1; i < path.length; i++) {
    pos = structure[path[i]];
  }
  if (pos[type]) {
    let count = 0;
    for (let i = 0; i < Object.keys(pos).length; i++) {
      if (Object.keys(pos)[i].includes(type)) {
        // If I don't make this a fucking regex later it *will* cause massive issues
        // Seriously, there *will* be an a tag that we are adding, and there will be words including the letter a
        // Or some other bullshit like that
        count++;
      }
    }
    pos[`${type}${count}`] = {};
  } else pos[type] = {};
  return node;
}

function setContent(parent, position, content) {
  parent.children[position].innerHTML = content;
}

function setAttribute(parent, position, type, value) {
  if (
    !Attributes[type].includes(parent.children[position].tagName) &&
    Attributes[type][0] != "*"
  ) {
    throw new Error(
      `${parent.children[position].tagName} does not have the attribute ${type}`
    );
  }
  parent.children[position][type] = value;
}

// testing, remember to remove before I actually start using this shit

createElement("p", document.body, ["body"]);
setContent(document.body, 0, "Test");
createElement("p", document.body, ["body"], 0);
setAttribute(document.body, 0, "id", "test");
console.log(structure);
console.log(document.documentElement.outerHTML);
