import './ui.css'

const widthInit = "5";
const radiusInit = "12";
const hexInit = '000000';

const widthElement = document.getElementById('width') as HTMLInputElement;
const radiusElement = document.getElementById('radius') as HTMLInputElement;
const colorElement = document.getElementById('color') as HTMLInputElement;

let preValue = (preData) => preData ? preData : { "width": widthInit, "radius": radiusInit, "hex": hexInit }

onmessage = (event) => {
    widthElement.value = preValue(event.data.pluginMessage).width as string;
    radiusElement.value = preValue(event.data.pluginMessage).radius as string;
    colorElement.value = preValue(event.data.pluginMessage).hex as string;
}

widthElement.onchange = () => { widthElement.value = widthElement.value == "" ? widthElement.value = widthInit : widthElement.value; }
radiusElement.onchange = () => { radiusElement.value = radiusElement.value == "" ? radiusElement.value = radiusInit : radiusElement.value; }
colorElement.onchange = () => { colorElement.value = colorElement.value == "" ? colorElement.value = hexInit : colorElement.value; }

document.getElementById('change').onclick = () => {
    const width = parseInt(widthElement.value, 10);
    const radius = parseInt(radiusElement.value, 10);
    const color = colorElement.value;
    parent.postMessage({ pluginMessage: { type: 'change-arrow-style', width, radius, color } }, '*')
}