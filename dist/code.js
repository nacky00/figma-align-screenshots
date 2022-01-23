/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.postMessage({
    "width": figma.root.getPluginData('width'),
    "radius": figma.root.getPluginData('radius'),
    "hex": figma.root.getPluginData('hex')
});
function clone(val) {
    return JSON.parse(JSON.stringify(val));
}
var hexToRgb = function (color) {
    var _a;
    if (color === void 0) { color = "000"; }
    return Object.fromEntries(((_a = (color.match(/^#?[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/) ? color : "000").replace(/^#?(.*)$/, function (_, hex) { return (hex.length == 3) ? hex.replace(/./g, "$&$&") : hex; }).match(/../g)) !== null && _a !== void 0 ? _a : []).map(function (c, i) { return ["rgb".charAt(i), parseInt("0x" + c)]; }));
};
var convertedRgb = function (_a) {
    var _b = _a.r, r = _b === void 0 ? 1 : _b, _c = _a.g, g = _c === void 0 ? 1 : _c, _d = _a.b, b = _d === void 0 ? 1 : _d;
    return ({ r: r / 255, g: g / 255, b: b / 255 });
};
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = function (msg) {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'change-arrow-style') {
        for (var _i = 0, _a = figma.currentPage.selection; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.type != "VECTOR")
                return;
            node.cornerRadius = msg.radius;
            node.strokeWeight = msg.width;
            var clone_strokes = clone(node.strokes);
            var color = convertedRgb(hexToRgb(msg.color));
            clone_strokes[0].color = color;
            node.strokes = clone_strokes;
            var clone_vector = clone(node.vectorNetwork);
            clone_vector.vertices[0].strokeCap = "ROUND";
            clone_vector.vertices[clone_vector.vertices.length - 1].strokeCap = "ARROW_LINES";
            node.vectorNetwork = clone_vector;
            figma.root.setPluginData('hex', msg.color);
            figma.root.setPluginData('width', String(msg.width));
            figma.root.setPluginData('radius', String(msg.radius));
        }
        ;
    }
    if (msg.type === 'create-rectangles') {
        var nodes = [];
        for (var i = 0; i < msg.count; i++) {
            var rect = figma.createRectangle();
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QixrRUFBa0UsRUFBRSxhQUFhLEVBQUUsK0RBQStELDZEQUE2RCwyRUFBMkUsK0NBQStDO0FBQ3pVO0FBQ0E7QUFDQTtBQUNBLGNBQWMsb0NBQW9DO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsZ0JBQWdCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQSw0QkFBNEIsd0JBQXdCLHNCQUFzQjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0Fycm93LVN0eWxlLUNoYW5nZXIvLi9zcmMvY29kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIHBsdWdpbiB3aWxsIG9wZW4gYSB3aW5kb3cgdG8gcHJvbXB0IHRoZSB1c2VyIHRvIGVudGVyIGEgbnVtYmVyLCBhbmRcbi8vIGl0IHdpbGwgdGhlbiBjcmVhdGUgdGhhdCBtYW55IHJlY3RhbmdsZXMgb24gdGhlIHNjcmVlbi5cbi8vIFRoaXMgZmlsZSBob2xkcyB0aGUgbWFpbiBjb2RlIGZvciB0aGUgcGx1Z2lucy4gSXQgaGFzIGFjY2VzcyB0byB0aGUgKmRvY3VtZW50Ki5cbi8vIFlvdSBjYW4gYWNjZXNzIGJyb3dzZXIgQVBJcyBpbiB0aGUgPHNjcmlwdD4gdGFnIGluc2lkZSBcInVpLmh0bWxcIiB3aGljaCBoYXMgYVxuLy8gZnVsbCBicm93c2VyIGVudmlyb25tZW50IChzZWUgZG9jdW1lbnRhdGlvbikuXG4vLyBUaGlzIHNob3dzIHRoZSBIVE1MIHBhZ2UgaW4gXCJ1aS5odG1sXCIuXG5maWdtYS5zaG93VUkoX19odG1sX18pO1xuZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgIFwid2lkdGhcIjogZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKCd3aWR0aCcpLFxuICAgIFwicmFkaXVzXCI6IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YSgncmFkaXVzJyksXG4gICAgXCJoZXhcIjogZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKCdoZXgnKVxufSk7XG5mdW5jdGlvbiBjbG9uZSh2YWwpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2YWwpKTtcbn1cbnZhciBoZXhUb1JnYiA9IGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHZhciBfYTtcbiAgICBpZiAoY29sb3IgPT09IHZvaWQgMCkgeyBjb2xvciA9IFwiMDAwXCI7IH1cbiAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKCgoX2EgPSAoY29sb3IubWF0Y2goL14jP1swLTlBLUZhLWZdezN9KFswLTlBLUZhLWZdezN9KT8kLykgPyBjb2xvciA6IFwiMDAwXCIpLnJlcGxhY2UoL14jPyguKikkLywgZnVuY3Rpb24gKF8sIGhleCkgeyByZXR1cm4gKGhleC5sZW5ndGggPT0gMykgPyBoZXgucmVwbGFjZSgvLi9nLCBcIiQmJCZcIikgOiBoZXg7IH0pLm1hdGNoKC8uLi9nKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW10pLm1hcChmdW5jdGlvbiAoYywgaSkgeyByZXR1cm4gW1wicmdiXCIuY2hhckF0KGkpLCBwYXJzZUludChcIjB4XCIgKyBjKV07IH0pKTtcbn07XG52YXIgY29udmVydGVkUmdiID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIF9iID0gX2EuciwgciA9IF9iID09PSB2b2lkIDAgPyAxIDogX2IsIF9jID0gX2EuZywgZyA9IF9jID09PSB2b2lkIDAgPyAxIDogX2MsIF9kID0gX2EuYiwgYiA9IF9kID09PSB2b2lkIDAgPyAxIDogX2Q7XG4gICAgcmV0dXJuICh7IHI6IHIgLyAyNTUsIGc6IGcgLyAyNTUsIGI6IGIgLyAyNTUgfSk7XG59O1xuLy8gQ2FsbHMgdG8gXCJwYXJlbnQucG9zdE1lc3NhZ2VcIiBmcm9tIHdpdGhpbiB0aGUgSFRNTCBwYWdlIHdpbGwgdHJpZ2dlciB0aGlzXG4vLyBjYWxsYmFjay4gVGhlIGNhbGxiYWNrIHdpbGwgYmUgcGFzc2VkIHRoZSBcInBsdWdpbk1lc3NhZ2VcIiBwcm9wZXJ0eSBvZiB0aGVcbi8vIHBvc3RlZCBtZXNzYWdlLlxuZmlnbWEudWkub25tZXNzYWdlID0gZnVuY3Rpb24gKG1zZykge1xuICAgIC8vIE9uZSB3YXkgb2YgZGlzdGluZ3Vpc2hpbmcgYmV0d2VlbiBkaWZmZXJlbnQgdHlwZXMgb2YgbWVzc2FnZXMgc2VudCBmcm9tXG4gICAgLy8geW91ciBIVE1MIHBhZ2UgaXMgdG8gdXNlIGFuIG9iamVjdCB3aXRoIGEgXCJ0eXBlXCIgcHJvcGVydHkgbGlrZSB0aGlzLlxuICAgIGlmIChtc2cudHlwZSA9PT0gJ2NoYW5nZS1hcnJvdy1zdHlsZScpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gX2FbX2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUudHlwZSAhPSBcIlZFQ1RPUlwiKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIG5vZGUuY29ybmVyUmFkaXVzID0gbXNnLnJhZGl1cztcbiAgICAgICAgICAgIG5vZGUuc3Ryb2tlV2VpZ2h0ID0gbXNnLndpZHRoO1xuICAgICAgICAgICAgdmFyIGNsb25lX3N0cm9rZXMgPSBjbG9uZShub2RlLnN0cm9rZXMpO1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29udmVydGVkUmdiKGhleFRvUmdiKG1zZy5jb2xvcikpO1xuICAgICAgICAgICAgY2xvbmVfc3Ryb2tlc1swXS5jb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgbm9kZS5zdHJva2VzID0gY2xvbmVfc3Ryb2tlcztcbiAgICAgICAgICAgIHZhciBjbG9uZV92ZWN0b3IgPSBjbG9uZShub2RlLnZlY3Rvck5ldHdvcmspO1xuICAgICAgICAgICAgY2xvbmVfdmVjdG9yLnZlcnRpY2VzWzBdLnN0cm9rZUNhcCA9IFwiUk9VTkRcIjtcbiAgICAgICAgICAgIGNsb25lX3ZlY3Rvci52ZXJ0aWNlc1tjbG9uZV92ZWN0b3IudmVydGljZXMubGVuZ3RoIC0gMV0uc3Ryb2tlQ2FwID0gXCJBUlJPV19MSU5FU1wiO1xuICAgICAgICAgICAgbm9kZS52ZWN0b3JOZXR3b3JrID0gY2xvbmVfdmVjdG9yO1xuICAgICAgICAgICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKCdoZXgnLCBtc2cuY29sb3IpO1xuICAgICAgICAgICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKCd3aWR0aCcsIFN0cmluZyhtc2cud2lkdGgpKTtcbiAgICAgICAgICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YSgncmFkaXVzJywgU3RyaW5nKG1zZy5yYWRpdXMpKTtcbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gJ2NyZWF0ZS1yZWN0YW5nbGVzJykge1xuICAgICAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtc2cuY291bnQ7IGkrKykge1xuICAgICAgICAgICAgdmFyIHJlY3QgPSBmaWdtYS5jcmVhdGVSZWN0YW5nbGUoKTtcbiAgICAgICAgICAgIHJlY3QueCA9IGkgKiAxNTA7XG4gICAgICAgICAgICByZWN0LmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IHsgcjogMSwgZzogMC41LCBiOiAwIH0gfV07XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChyZWN0KTtcbiAgICAgICAgICAgIG5vZGVzLnB1c2gocmVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcyk7XG4gICAgfVxuICAgIC8vIE1ha2Ugc3VyZSB0byBjbG9zZSB0aGUgcGx1Z2luIHdoZW4geW91J3JlIGRvbmUuIE90aGVyd2lzZSB0aGUgcGx1Z2luIHdpbGxcbiAgICAvLyBrZWVwIHJ1bm5pbmcsIHdoaWNoIHNob3dzIHRoZSBjYW5jZWwgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbi5cbiAgICAvLyBmaWdtYS5jbG9zZVBsdWdpbigpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==