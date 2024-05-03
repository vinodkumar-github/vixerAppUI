import {icons, iconsID} from './icons2.js';

export function createSubmenu(index) {
	const subMenuBottomContainer = document.createElement("div");
	subMenuBottomContainer.style.gridTemplateRows = "repeat(6, 1fr)"; // Adjust as needed
	subMenuBottomContainer.style.gridTemplateColumns = "1fr";
	subMenuBottomContainer.classList.add("submenu-bottom-container");
	let title;
	const count = Object.keys(icons[`icon${Number(index) + 1}`]).length;
	for (let j = 0; j < count; j++) {
		const button = document.createElement("button");
		button.classList.add("submenu-button");
		button.style.display = "grid";
		button.style.width = `6svh`;
		button.style.height = `6svh`;
		button.style.border = "2px solid black";
		button.style.backgroundColor = "inherit";
		const identifier = `icon${Number(index) + 1}`;
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttributeNS(null, 'height', `80%`);
		svg.setAttributeNS(null, 'width', `100%`);
		svg.setAttribute('viewBox', `0 0 100 100`);
		const useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		useEl.setAttribute('href', `#buttonicon${Number(index) + 1}icon${j}`);
		svg.appendChild(useEl);
		button.appendChild(svg);
		title = iconsID[`${identifier}`][`${j}`];
		button.id = `${identifier}-${title}`;
		button.setAttribute("title", `${title}`);
		subMenuBottomContainer.appendChild(button);
	}
	return subMenuBottomContainer;
}

export function createSubmenuForm(){
	
}

const submenuFormObject ={
	"icon1": {
		"0": {"name": "RESIZE", "tagLayout":["form",[""]],},
		"1": {"name": "CROP", "tagLayout":["form",[""]],},
		"2": {"name": "ROTATE", "tagLayout":["form",[""]],},
		"3": {"name": "SKEW", "tagLayout":["form",[""]],},
		"4": {"name": "MIRROR", "tagLayout":["form",[""]],},
		"5": {"name": "WRAP", "tagLayout":["form",[""]],},
	},
	"icon2": {
		"0": {"name": "RECTANGULAR SELECTION", "tagLayout":["form",[""]],},
		"1": {"name": "MAGIC WAND", "tagLayout":["form",[""]],},
		"2": {"name": "CIRCULAR SELECTION", "tagLayout":["form",[""]],},
		"3": {"name": "LASSO SELECTION", "tagLayout":["form",[""]],},
		"4": {"name": "DOT SELECTION", "tagLayout":["form",[""]],},
		"5": {"name": "DROPPER SELECTION", "tagLayout":["form",[""]],},
	},
	"icon3": {
		"0": {"name": "HEAL FIX", "tagLayout":["form",[""]],},
		"1": {"name": "CLONE FIX", "tagLayout":["form",[""]],},
		"2": {"name": "MAGIC ERASER", "tagLayout":["form",[""]],},
		"3": {"name": "BLUR FIX", "tagLayout":["form",[""]],},
		"4": {"name": "PRESERVE BY COLOR", "tagLayout":["form",[""]],},
		"5": {"name": "THREE POINTS TOOL", "tagLayout":["form",[""]],},
	},
	"icon4": {
		"0": {"name": "ADD TEXT", "tagLayout":["form",[""]],},
		"1": {"name": "REPLACE COLOR", "tagLayout":["form",[""]],},
		"2": {"name": "ADD SYMBOL", "tagLayout":["form",[""]],},
		"3": {"name": "ADD PATTERN", "tagLayout":["form",[""]],},
		"4": {"name": "ADD PADDING", "tagLayout":["form",[""]],},
		"5": {"name": "ADD FRAME", "tagLayout":["form",[""]],},
	},
	"icon5": {
		"0": {"name": "BRIGHTNESS", "tagLayout":["form",[""]],},
		"1": {"name": "CONTRAST", "tagLayout":["form",[""]],},
		"2": {"name": "SHARPNESS", "tagLayout":["form",[""]],},
		"3": {"name": "ALPHA AND GAMMA", "tagLayout":["form",[""]],},
		"4": {"name": "BLUR", "tagLayout":["form",[""]],},
		"5": {"name": "HUE", "tagLayout":["form",[""]],},
	},
	"icon6": {
		"0": {"name": "GRAYSCALE", "tagLayout":["form",[""]],},
		"1": {"name": "NEGATIVE", "tagLayout":["form",[""]],},
		"2": {"name": "OUTLINE", "tagLayout":["form",[""]],},
		"3": {"name": "CONVOLUTION 3×3", "tagLayout":["form",[""]],},
		"4": {"name": "LAPLACE", "tagLayout":["form",[""]],},
		"5": {"name": "APPLY FILTER", "tagLayout":["form",[""]],},
	},
	"icon7": {
		"0": {"name": "BRUSH TOOL", "tagLayout":["form",[""]],},
		"1": {"name": "BUCKET TOOL", "tagLayout":["form",[""]],},
		"2": {"name": "PEN TOOL", "tagLayout":["form",[""]],},
		"3": {"name": "PENCIL TOOL", "tagLayout":["form",[""]],},
		"4": {"name": "ROLLER", "tagLayout":["form",[""]],},
		"5": {"name": "PATTERN BRUSH", "tagLayout":["form",[""]],},
	},
	"icon8": {
		"0": {"name": "COLLAGE", "tagLayout":["form",[""]],},
		"1": {"name": "HISTOGRAM", "tagLayout":["form",[""]],},
		"2": {"name": "ADD FRAME", "tagLayout":["form",[""]],},
		"3": {"name": "NOISE REDUCTION", "tagLayout":["form",[""]],},
		"4": {"name": "VIGNETTE", "tagLayout":["form",[""]],},
		"5": {"name": "ALIGN", "tagLayout":["form",[""]],},
		"6": {"name": "MEASURE", "tagLayout":["form",[""]],},
	},
	"close": {
		"0": {"name": "CLOSE", "tagLayout":["form",[""]],},
	},
	"minimise": {
		
		"0": {"name": "MINIMISE", "tagLayout":["form",[""]],},
	}
}