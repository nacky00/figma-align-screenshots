figma.showUI(__html__, { themeColors: true, height: 300 });

figma.ui.postMessage({
  "width": figma.root.getPluginData('width'),
  "spacing": figma.root.getPluginData('spacing'),
});


figma.root.getPluginData('width');
figma.root.getPluginData('spacing');

function clone(val: any) {
  return JSON.parse(JSON.stringify(val))
}

let width_value = 390;
let spacing_value = 50;

function resizeHeightProportionally(currentWidth, newWidth, currentHeight) {
  const newHeight = (newWidth / currentWidth) * currentHeight;
  return newHeight;
}
figma.ui.onmessage = msg => {
  if (msg.type === 'alignment') {
    // ページ上の選択したフレーム（画像）のリストを取得します
    const selection = figma.currentPage.selection;

    // 選択された要素があるか確認します
    if (selection.length > 0) {
      // 最も左上の要素のX座標を取得します
      let minX = selection[0].x;
      const y = selection[0].y;
      const newWidth = msg.width ? msg.width : width_value;
      const spacing = msg.spacing ? msg.spacing : spacing_value;
      
      // 選択されたすべての要素に対して処理を行います
      for (const node of selection) {
        if (node.type === "RECTANGLE") {
        const newHeight = resizeHeightProportionally(node.width, newWidth, node.height);
        // 幅を変更します
        node.resize(newWidth, newHeight);
        // X座標を設定して要素を横一列に並べます
        node.x = minX;
        node.y = y;
        // 次の要素のX座標を計算します（余白を考慮）
        minX += newWidth + spacing;
      }
      // プラグインパネルにメッセージを表示します
      figma.root.setPluginData('width', String(newWidth));
      figma.root.setPluginData('spacing', String(spacing));
    }
  } else {
    figma.notify('画像を選択してから実行してください')
  }
}};