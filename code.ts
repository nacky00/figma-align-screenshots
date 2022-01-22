// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".

figma.showUI(__html__);

function clone(val: any) {
  return JSON.parse(JSON.stringify(val))
}

const hexToRgb = (color = "000") =>
  Object.fromEntries(
    ((color.match(/^#?[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/) ? color : "000").replace(
      /^#?(.*)$/,
      (_, hex) => (hex.length == 3) ? hex.replace(/./g, "$&$&") : hex,
    ).match(/../g)).map((c, i) => ["rgb".charAt(i), parseInt("0x" + c)]),
  );

const convertedRgb = ({ r = 1, g = 1, b = 1 }) => ({ r: r / 255, g: g / 255, b: b / 255 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'change-arrow-style') {
    for (const node of figma.currentPage.selection as any) {
      if (node.type != "VECTOR") return;
      node.cornerRadius = msg.radius;
      node.strokeWeight = msg.width;
      const clone_strokes = clone(node.strokes);
      clone_strokes[0].color = convertedRgb(hexToRgb(msg.color));
      node.strokes = clone_strokes;
      const clone_vector = clone(node.vectorNetwork);
      clone_vector.vertices[0].strokeCap = "ROUND";
      clone_vector.vertices[clone_vector.vertices.length - 1].strokeCap = "ARROW_LINES";
      node.vectorNetwork = clone_vector;
    };
  }
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};


