import './ui.css'

const widthInit = "390";
const spacingInit = "100";

const widthElement = document.getElementById('width') as HTMLInputElement;
const spacingElement = document.getElementById('spacing') as HTMLInputElement;
const ChangeBtn = document.getElementById('change') as HTMLInputElement;

let preValue = (preData) => preData.width !== "" && preData.spacing !== "" ? preData : { "width": widthInit, "spacing": spacingInit }

widthElement.onchange = () => { widthElement.value = widthElement.value == "" ? widthElement.value = widthInit : widthElement.value; }
spacingElement.onchange = () => { spacingElement.value = spacingElement.value == "" ? spacingElement.value = spacingInit : spacingElement.value; }

ChangeBtn.onclick = () => {
    const width = parseInt(widthElement.value, 10);
    const spacing = parseInt(spacingElement.value, 10);
    parent.postMessage({ pluginMessage: { type: 'alignment', width, spacing } }, '*')
}

// コードの最後に呼び出す
onmessage = (event) => {
    widthElement.value = preValue(event.data.pluginMessage.width);
    spacingElement.value = preValue(event.data.pluginMessage.spacing);
}