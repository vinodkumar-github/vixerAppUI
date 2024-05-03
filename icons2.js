export function createSVGElement(iconIdentifier, selectedPathIndex = null, id = null) {
	const svgIcons = icons[iconIdentifier]; // Use `svgIcons` for clarity
	const pathNames = Object.keys(svgIcons); // Use `pathNames` for consistency
	const pathCount = pathNames.length;
	const dimensions = selectedPathIndex === null ? calculateGridDimensions(pathCount) : [1, 1];
	const documentFragment = document.createDocumentFragment();
	const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	documentFragment.appendChild(svgElement);
	svgElement.setAttributeNS(null, 'height', `80%`);
	svgElement.setAttributeNS(null, 'width', `100%`);
	svgElement.setAttribute('viewBox', `0 0 ${dimensions[1] * 100 / 0.8} ${dimensions[0] * 1 * 100}`);
	if (id) {
		svgElement.setAttribute("id", `${id}`);
	}
	if (selectedPathIndex === null && pathCount > 1) {
		const viewBoxCoordinates = calculateViewBoxValues(dimensions);
		for (let i = 0; i < pathCount; i++) {
			const tempGroup = createSvgIcon(viewBoxCoordinates[i], svgIcons[i], `button${iconIdentifier}icon${i}`);
			svgElement.append(tempGroup);
		}
		return svgElement
	} else {
		svgElement.setAttribute("viewBox", "0 0 100 100");
		const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
		pathElement.setAttributeNS(null, "d", icons[`${iconIdentifier}`][selectedPathIndex || 0]);
		pathElement.setAttributeNS(null, "id", iconsID[`${iconIdentifier}`][selectedPathIndex || 0])
		svgElement.append(pathElement);
		return documentFragment
	}
	
	function calculateGridDimensions(numberOfPaths) {
		const squareRoot = Math.sqrt(numberOfPaths);
		const flooredRoot = Math.floor(squareRoot);
		if (numberOfPaths === 1) {
			return [1, 1];
		}
		for (let i = flooredRoot; i >= 1; i--) {
			if (numberOfPaths % i === 0) {
				return [i, numberOfPaths / i];
			}
		}
		return [1, numberOfPaths];
	}
	
	function calculateViewBoxValues([rows, columns]) {
		const viewBoxData = [];
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				const x = j * 100 / 0.8;
				const y = i * 100;
				const width = x + 100;
				const height = y + 100;
				viewBoxData.push([x, y, width, height]);
			}
		}
		return viewBoxData;
	}
	
	function createSvgIcon([x, y, width, height], pathData, id) {
		const iconGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
		iconGroup.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
		iconGroup.setAttributeNS(null, 'preserveAspectRatio', `xMidYMid slice`);
		iconGroup.setAttribute("transform", `translate(${x}, ${y})`); // Add padding to the translation
		const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
		iconPath.setAttributeNS(null, "d", pathData);
		iconPath.setAttributeNS(null, 'fill', 'inherit');
		iconPath.setAttributeNS(null, 'preserveAspectRatio', `xMidYMid slice`);
		iconPath.setAttribute('id', `${id}`);
		iconGroup.appendChild(iconPath);
		return iconGroup;
	}
}

export const icons = {
	"icon1": {
		"0": "m 95,45 v 50 h -90 v -90 h 50 v 5 h -46 v 80 h 82 v -45 z m -6,-19 -6,-6 -10,10 6,6 -14,-2 -3,-14 6,6 10,-10 -5,-6 14,3 z m -22,60 h -54 v -52 h 30 v 8 h -22 v 35 h 38 v -21 h 8 z",
		"1": "m 90,5 v 0 l -23,23 h -22 v 7 h 15 l -32,32 v -39 0 0 h -23 v 0 0 7 h 15 v 45 0 0 0 0 0 0 h 45 v 15 h 8 v 0 0 -23 0 0 h -40 l 32,-32 v 15 h 8 v -22 l 23,-23 v 0 z m -70,0 v 0 0 15 h 8 v 0 0 -15 z m 60,67 v 8 h 15 v -8 z",
		"2": "m 68,5 -5,5 5,5 h 4 l -4,-4 h 24 v 17 h 4 v -16 c 0,-2 -1,-4 -4,-4 h -24 l 3,-3 z m -43,13 c -4,0 -7,3 -7,7 v 54 c 0,4 3,7 7,7 h 54 c 4,0 7,-3 7,-7 v -54 c 0,-4 -3,-7 -7,-7 z m 0,7 h 54 v 54 h -54 z m -15,38 -5,5 v 3 l 3,-3 v 24 c 0,2 2,3 4,3 h 17 v -3 h -17 v -24 l 4,3 v -3 z",
		"3": "m 10,13 c -3,0 -5,3 -4,6 1,3 4,6 8,6 l 13,49 c -3,0 -5,3 -4,6 1,3 4,6 8,6 3,0 5,-3 4,-6 h 49 c 1,3 4,6 8,6 3,0 5,-3 4,-6 -1,-3 -4,-6 -8,-6 l -13,-49 c 3,0 5,-3 4,-6 -1,-3 -4,-6 -8,-6 -3,0 -5,3 -4,6 h -49 c -1,-3 -4,-6 -8,-6 z m 1,3 a 4,3 41 0 1 4,3 4,3 41 0 1 -2,3 4,3 41 0 1 -4,-3 4,3 41 0 1 2,-3 z m 61,0 a 4,3 41 0 1 4,3 4,3 41 0 1 -2,3 4,3 41 0 1 -4,-3 4,3 41 0 1 2,-3 z m -52,9 h 49 l 13,49 h -49 z m 8,52 a 4,3 41 0 1 4,3 4,3 41 0 1 -2,3 4,3 41 0 1 -4,-3 4,3 41 0 1 2,-3 z m 61,0 a 4,3 41 0 1 4,3 4,3 41 0 1 -2,3 4,3 41 0 1 -4,-3 4,3 41 0 1 2,-3 z",
		"4": "m 47,5 -22,42 h 22 z m 2,0 v 5 h 1 v -5 z m 3,0 v 42 h 22 z m 1,3 19,38 h -19 z m -4,3 v 5 h 1 v -5 z m 0,6 v 5 h 1 v -5 z m 0,6 v 5 h 1 v -5 z m 0,6 v 5 h 1 v -5 z m 0,6 v 5 h 1 v -5 z m 0,6 v 5 h 1 v -5 z m 0,6 v 3 h -6 v 1 h 7 v -1 -3 z m -24,3 v 1 h 5 v -1 z m 6,0 v 1 h 5 v -1 z m 6,0 v 1 h 5 v -1 z m -12,3 22,42 v -1 l 1,-41 z m 2,1 h 20 l -0.5,39 z",
		"5": "m 5,5 v 13 h 89 v -13 z m 0,78 h 16 v -12 h -16 z m 0,-45 v 13 h 64 c 10,4 10,15 0,19 h -19 v -10 l -21,17 21,18 v -12 h 19 c 15,0 26,-10 26,-23 0,-13 -11,-23 -26,-23 z",
	},
	"icon2": {
		"0": "m 5,5 v 16 h 8 v -8 h 6 v -8 z m 22,0 v 8 h 12 v -8 z m 20,0 v 8 h 12 v -8 z m 20,0 v 8 h 8 v 8 h 8 v -16 z m -62,23 v 13 h 8 v -13 z m 70,0 v 13 h 8 v -13 z m -70,20 v 13 h 8 v -13 z m 70,0 v 13 h 8 v -13 z m -70,19 v 16 h 14 v -8 h -6 v -8 z m 70,0 v 8 h -8 v 8 h 8 v 12 h 8 v -12 h 12 v -8 h -12 v -8 z m -48,8 v 8 h 12 v -8 z m 20,0 v 8 h 12 v -8 z",
		"1": "m 23,5 c 1,7 2,14 3,22 -7,0 -14,0 -21,0 6,3 13,6 19,8 -4,6 -7,13 -10,19 6,-4 11,-9 17,-13 4,6 7,13 11,19 -1,-6 -2,-12 -3,-19 18,18 36,36 53,54 1,-1 4,-3 2,-4 -18,-18 -35,-35 -53,-53 6,0 12,0 19,0 -6,-3 -13,-6 -19,-8 4,-6 7,-13 10,-19 -6,4 -11,9 -17,13 -4,-6 -7,-13 -10,-19 z",
		"2": "m 58,14 c 4,2 8,3 12,5 2,-2 4,-4 6,-6 -6,-3 -12,-5 -18,-8 0,3 0,6 0,9 z m -34,-2 c 2,2 4,4 6,6 4,-1 8,-3 12,-5 0,-3 0,-6 0,-9 -6,2 -12,5 -18,8 z m 57,18 c 2,4 3,8 5,12 3,0 6,0 9,0 -2,-6 -5,-12 -8,-18 -2,2 -4,4 -6,6 z m -76,12 c 3,0 6,0 9,0 1,-4 3,-8 5,-12 -2,-2 -4,-4 -6,-6 -3,6 -5,12 -8,18 z m 8,34 c 2,-2 4,-4 6,-6 -1,-4 -3,-8 -5,-12 -3,0 -6,0 -9,0 2,6 5,12 8,18 z m 68,-6 c 2,2 4,4 6,6 2,-6 5,-12 8,-18 -3,0 -6,0 -9,0 -1,4 -3,8 -5,12 z m -57,18 c 6,2 12,5 18,8 0,-3 0,-6 0,-9 -4,-1 -8,-3 -12,-5 -2,2 -4,4 -6,6 z m 34,-2 c 0,3 0,6 0,9 6,-2 12,-5 18,-8 -2,-2 -4,-4 -6,-6 -4,1 -8,3 -12,5 z",
		"3": "m 16,57 c 6,16 -1,29 -11,32 26,9 12,-21 16,-27 5,-5 10,5 30,5 l -2,-6 c -28,-2 -38,-19 -31,-28 43,-47 79,9 74,-5 -12,-29 -93.6,-23 -76.6,28 z m 45,-4 10,36 9,-16 16,-9 z",
		"4": "m 5,5 v 90 h 90 v -90 z m 5,5 h 80 v 80 h -80 z m 30,7 c -1.7,0 -3,1.3 -3,3 0,0.4 0.1,0.7 0.2,1 l -9.2,7.3 -0,-0 c -0.6,-0.8 -1.5,-1.2 -2.4,-1.2 -1.7,0 -3,1.3 -3,3 0,1.7 1.3,3 3,3 0.5,-0 1,-0.1 1.5,-0.4 l 6.2,18.8 c -0.7,0.6 -1.2,1.4 -1.2,2.4 0,1.7 1.3,3 3,3 0.3,-0 0.6,-0.1 0.9,-0.1 l 12.1,19.9 c -0.7,0.6 -1,1.4 -1,2.3 0,1.7 1.3,3 3,3 1.7,0 3,-1.3 3,-3 -0,-0.1 -0,-0.2 -0,-0.3 l 18,-0.6 c 0,1.6 1.4,2.9 3,2.9 1.7,0 3,-1.3 3,-3 -0,-1.5 -1.1,-2.8 -2.6,-3 l -0.2,-14 c 1.6,-0.1 2.8,-1.4 2.8,-3 0,-1.7 -1.3,-3 -3,-3 -0.2,0 -0.4,0 -0.6,0.1 l -7,-25.5 c 1,-0.5 1.6,-1.5 1.6,-2.6 0,-1.7 -1.3,-3 -3,-3 -1,0 -1.9,0.5 -2.5,1.3 l -19.6,-5.2 c 0,-0 0,-0 0,-0.1 0,-1.7 -1.3,-3 -3,-3 z m 2.8,4.1 19.3,5.1 c -0.1,0.3 -0.1,0.5 -0.1,0.8 0,1.7 1.3,3 3,3 0.2,-0 0.3,-0 0.5,-0 l 7,25.5 c -0.9,0.5 -1.4,1.5 -1.5,2.6 0,1.3 0.9,2.5 2.2,2.9 0.1,4.7 0.2,9.4 0.3,14.2 -1.1,0.2 -1.9,1 -2.3,2 l -18.5,0.6 c -0.5,-1 -1.5,-1.7 -2.7,-1.7 -0.4,0 -0.8,0.1 -1.1,0.2 l -12.1,-19.8 c 0.8,-0.6 1.2,-1.5 1.2,-2.4 0,-1.7 -1.3,-3 -3,-3 -0.3,0 -0.6,0.1 -0.9,0.1 -2.3,-6.5 -4,-12.5 -6.3,-19 0.5,-0.5 0.7,-1.2 0.7,-1.9 -0,-0.3 -0,-0.6 -0.1,-0.9 l 9.3,-7.4 c 0.6,0.7 1.4,1.1 2.3,1.1 1.2,-0 2.4,-0.8 2.8,-1.9 z",
		"5": "m 54,62 v 8 c 0,0 11,14 21,5 10,-10 -5,-21 -5,-21 h -8 l -33.6,-26.4 c -0.5,-0.1 -0.5,-0.5 -1,0 -0.5,0.5 -0.1,0.5 0,1 z m 7,-4 -3,3 -29.8,-32.6 z m -32.6,-30.4 c 0.1,0.5 -0.5,1.1 -1,1 -0.5,-0.1 -0.1,-0.9 0,-1 0.1,-0.1 0.9,-0.5 1,0 z",
	},
	"icon3": {
		"0": "m 7,56 c -8,5 8,32 16,27 l 70,-40 c 8,-5 -8,-32 -16,-27 z m 79,-15 -62,36 c -8,5 -20,-15 -11,-20 l 62,-36 c 8,-5 19,15 11,20 z m -31,-4 -19,11 c -4,3 3,15 7,13 l 19,-11 c 4,-3 -3,-15 -7,-13 z",
		"1": "m 20,6 c -8,0 -15,6 -15,14 0,6 4,12 10,14 v 32 c -6,2 -10,8 -10,14 0,8 7,15 15,15 8,0 15,-7 15,-15 0,-7 -4,-13 -11,-14 v -16 l 15,7 v -3 h 37 v 11 0 c -6,2 -11,8 -11,14 0,8 7,15 15,15 8,0 15,-7 15,-15 0,-7 -4,-13 -11,-14 v 0 -20 h -46 v -3 l -15,8 v -15 c 7,-2 11,-8 11,-14 0,-8 -7,-15 -15,-15 z m 60,65 c 5,0 9,4 9,9 0,5 -4,9 -9,9 -5,0 -9,-4 -9,-9 0,-5 4,-9 9,-9 z m -60,1 c 5,0 9,4 9,9 0,5 -4,9 -9,9 -5,0 -9,-4 -9,-9 0,-5 4,-9 9,-9 z",
		"2": "m 45,5 -6,9 -5,-9 4,9 -9,1 h 9 l -4,9 5,-8 5,8 -4,-8 9,-1 h -9 z m 27,21 2,7 h -7 l 7,1 -4,6 5,-5 3,6 -2,-7 h 7 l -7,-1 4,-6 -5,6 z m -42,1 2,7 -7,-1 7,2 -4,6 5,-5 2,7 -1,-7 7,1 -7,-2 4,-5 -5,4 z m 26,1 -39,38 c 0,11 13,20 24,22 4,0 17,-13 39,-37 z m 0,7 17,16 -11,12 -18,-17 z m -16,15 18,17 -14,15 c -3,3 -19,-4 -21,-14 z m 20,39 c -9,3 -7,8 2,5 9,-3 7,-8 -2,-5 z",
		"3": "m 50,5 c -38,35 -40,80 -8,89 37,10 60,-44 8,-89 z m 0,5 c 33,35 30,64 19,73 -32,30 -70,-22 -19,-73 z m 11,28 c -3,20 21,22 -5,39 -5,2 0,8 4,4 14,-6 15,-29 1,-43 z",
		"4": "m 12,10 c -7,0 -8,44 -7,45 l 23,16 c 4,2 -5,8 -4,18 11,-1 22,6 26,-4 3,10 15,3 26,4 0,-10 -8,-16 -4,-18 l 23,-16 c 2,-1 -1,-45 -8,-45 -5,0 -6,28 -8,29 -18,14 -26,16 -28,28 -3,-12 -11,-13 -29,-26 -5,-4 -4,-31 -10,-31 z m 0,1 c 4,0 6,28 6,28 -16,8 8,20 7,16 -1,-2 -17,-8 -8,-12 7,-3 56,36 12,27 l -23,-16 c 0,-15 0,-29 6,-43 z m 75,0 c 6,0 8,39 6,42 l -23,17 c -41,6 6,-31 12,-28 9,5 -7,11 -8,13 -1,5 23,-7 7,-16 0,0 5,-28 6,-28 z m -46,2 c -3,0 -6,1 -7,2 -2,2 -3,21 0,32 4,3 12,3 14,0 5,-8 1,-31 0,-32 -1,-1 -4,-2 -7,-2 z m 15,2 c -1,0 -3,1 -5,2 v 26 c 5,-5 14,-12 16,-18 -1,-3 -8,-10 -11,-10 z m 11,19 -16,13 h 16 c 1,-2 1,-11 0,-13 z m -25,9 a 2,2 0 0 1 2,2 2,2 0 0 1 -2,2 2,2 0 0 1 -2,-2 2,2 0 0 1 2,-2 z m 16,29 c 8,0 16,4 15,15 0,-3 -27,14 -21,-14 2,-1 4,-1 6,-1 z m -13,1 c 1,0 3,0 4,0 6,28 -24,11 -23,14 -1,-12 10,-15 19,-14 z",
		"5": "m 50,10 -4,37 -17,-11 21,23 20,-23 -17,11 z m -24,65 14,7 c 2,7 12,9 17,4 h 20 c 10,10 25,-6 14,-15 -10,-5 -18,2 -16,11 l -16,-2 c 2,-12 -17,-17 -20,-5 l -10,-4 c -41,-13 -14,37 -3,4 z",
		
	},
	"icon4": {
		"0": "m 14,5 c -7,-1 -10,10 -4,15 v 58 c -5,3 -7,10 -2,14 4,4 10,3 13,-2 h 57 c 2,4 9,6 13,2 5,-5 2,-11 -2,-15 v -55 c 7,-3 4,-17 -3,-17 -4,0 -4,0 -9,5 -16,0 -38,0 -55,0 -3,-1 -4,-6 -8,-5 z m 69,13 v 63 h -64 v -63 z m -45,14 v 8 h 10 v 24 h 7 v -24 h 10 v -8 c -6,0 -22,0 -28,0 z",
		"1": "m 78,11 v 11 c -22,0 -22,6 -34,17 -17,0 -39,-6 -39,11 0,17 22,11 39,11 17,17 17,17 34,17 v 11 l 17,-17 -17,-17 v 11 c -22,0 -17,0 -34,-17 17,-17 11,-17 34,-17 v 11 l 17,-17 z",
		"2": "m 25,5 c -11,0 -20,9 -20,20 0,11 9,21 20,21 11,0 21,-10 21,-21 0,-11 -10,-20 -21,-20 z m 42,0 c -24,0 -5,39 7,40 14,-1 33,-40 8,-40 -2,0 -5,1 -7,3 -2,-2 -5,-3 -8,-3 z m -33,10 c 5,5 5,11 3,17 l -19,-18 c 5,-3 11,-2 16,1 z m 33,-3 c 4,0 6,4 8,7 2,-3 4,-6 8,-7 3,0 6,3 6,7 -2,8 -8,14 -14,20 -6,-6 -13,-12 -14,-20 0,-4 3,-7 6,-7 z m -53,7 18,18 c -6,3 -13,2 -17,-3 -4,-4 -4,-11 -1,-15 z m 45,50 c 6,4 7,-16 25,-3 l -5,5 16,-1 -4,-16 -3,5 c -19,-13 -34,6 -29,9 z m -34,-15 c -6,2 -3,13 -3,17 -5,1 -17,-3 -17,4 2,6 12,3 17,3 1,4 -3,16 3,17 6,-2 4,-12 4,-17 5,-1 13,3 17,-3 -2,-6 -13,-4 -17,-4 -1,-5 2,-13 -4,-17 z m 33,24 3,17 4,-7 c 20,12 31,-2 28,-7 -7,-1 -8,14 -25,3 l 6,-5 z",
		"3": "m 83,85 c -2,2 -5,2 -6,0 -2,-2 -2,-5 0,-6 2,-2 5,-2 6,0 2,2 2,5 0,6 m -30,-31 c -2,2 -5,2 -6,0 -2,-2 -2,-5 0,-6 2,-2 5,-2 6,0 2,2 2,5 0,6 m -31,31 c -2,2 -5,2 -6,0 -2,-2 -2,-5 0,-6 2,-2 5,-2 6,0 2,2 2,5 0,6 m 1,-62 c -2,2 -5,2 -6,0 -2,-2 -2,-5 0,-6 2,-2 5,-2 6,0 2,2 2,5 0,6 m 56,-7 c 2,-2 5,-2 6,0 2,2 2,5 0,6 -2,2 -5,2 -6,0 -2,-2 -2,-5 0,-6 m -4,52 -13,-13 c -3,-3 -3,-9 0,-12 l 14,-14 c 4,-4 11,2 15,-3 5,-5 5,-14 0,-19 -5,-5 -14,-5 -19,0 -4,4 1,11 -3,15 l -14,14 c -3,3 -8,4 -12,0 l -13,-13 c -3,-3 2,-11 -3,-15 -5,-5 -14,-5 -19,0 -5,5 -5,14 0,19 4,4 12,0 15,3 l 13,13 c 3,3 3,9 0,12 l -14,14 c -4,4 -11,-2 -15,3 -5,5 -5,14 0,19 5,5 14,5 19,0 4,-4 -1,-11 3,-15 l 14,-14 c 3,-3 8,-4 12,0 l 13,13 c 3,3 -2,11 3,15 5,5 14,5 19,0 5,-5 5,-14 0,-19 -4,-4 -11,-4 -15,-3",
		"4": "m 80,4 c -2,0 -5,0 -9,1 -20,1 -41,0 -62,0 -9,18 -1,38 -4,57 -4,16 -1,40 21,33 22,-1 44,0 65,0 9,-16 1,-35 3,-52 4,-16 4,-39 -14,-39 z m -67,9 h 75 v 75 h -75 z m 35,5 c -6,0 -11,1 -15,4 h 33 c 4,0 -7,-4 -18,-4 z m -30,15 v 33 c 0,6 9,-20 0,-33 z m 64,0 c -9,13 0,39 0,33 z m -16,45 h -33 c 13,9 39,0 33,0 z",
		"5": "m 88,5 c -4,2 -9,6 -12,1 -4,1 -9,5 -13,0 -4,0 -9,5 -13,0 -4,-1 -8,5 -11,1 -4,-2 -9,5 -13,0 -4,-3 -8,5 -12,0 -5,-3 -12,4 -8,8 3,3 2,6 -1,8 -1,4 6,8 1,11 -3,4 5,8 1,11 -3,3 -1,7 2,9 0,4 -6,8 -1,11 2,4 -6,8 0,12 3,4 -3,7 -1,10 2,5 9,4 11,1 4,-1 5,6 9,2 2,-3 5,-2 7,1 5,2 8,-5 12,0 3,2 6,-1 8,-2 3,1 8,6 11,1 4,-2 8,6 12,0 4,-3 6,5 11,2 6,-2 4,-8 2,-12 2,-3 5,-8 1,-11 -3,-3 7,-7 1,-11 -4,-4 3,-7 2,-10 -2,-2 -4,-5 0,-7 3,-4 -7,-8 -1,-12 4,-3 1,-6 -1,-9 -3,-4 2,-10 -4,-13 -1,-1 -4,-2 0,-2 z m -69,15 c 20,0 41,0 61,0 0,20 0,41 0,61 -20,0 -41,0 -61,0 0,-20 0,-41 0,-61 z",
		
	},
	"icon5": {
		"0": "m 46,5 v 13 h 6 v -13 z m -22,7 -4,3 7,11 4,-3 z m 50,0 -7,11 4,4 8,-11 z m -25,12 c -14,0 -27,12 -27,26 0,14 12,27 27,27 14,0 28,-12 28,-27 0,-14 -12,-26 -28,-26 z m 1,5 c 6,0 11,3 14,6 4,4 6,9 6,14 0,6 -3,11 -6,15 -4,4 -9,5 -14,6 z m -43,4 -2,5 12,4 2,-5 z m 86,0 -12,4 2,5 12,-4 z m -76,24 -12,4 2,5 13,-4 z m 64,0 -2,5 12,4 2,-5 z m -54,17 -7,11 4,3 7,-10 z m 43,0 -4,4 7,10 4,-3 z m -25,8 v 13 h 6 v -13 z",
		"1": "m 5,5 v 90 h 45 45 v -90 h -45 z m 45,2 h 2 38 4 v 86 h -4 -38 -2 v -9 a 34,34 0 0 1 -34,-34 34,34 0 0 1 34,-34 z m 0,9 v 68 a 34,34 0 0 0 34,-34 34,34 0 0 0 -34,-34 z",
		"2": "m 49,5 h -1 l -43,57 43,33 47,-32 c -16,-19 -31,-40 -46,-58 z m 1,13 32,45 -32,24 z",
		"3": "m 95,5 h -45 v 35 h 5 v -30 h 33 v 47 h -28 v 6 h 34 z m -34,12 v 31 h -8 c -2,3 -4,8 -7,14 -2,-8 -4,-14 -14,-14 -30,0 -34,45 -13,45 9,0 17,-3 22,-9 2,9 6,15 20,5 -9,0 -12,-6 -14,-13 4,-7 9,-16 14,-27 v 4 h 23 v -36 z m -30,38 v 0 c 4,0 6,9 7,20 -4,7 -11,12 -16,12 -12,0 -9,-32 9,-32 z",
		"4": "m 50,5 c -6,6 -11,14 -14,23 -1,3 -5,3 -7,3 -4,6 -9,12 -14,18 l 35,46 35,-46 c -4,-6 -9,-12 -14,-18 -3,0 -6,0 -7,-3 -3,-9 -8,-16 -14,-23 z m 0,2 c 12,14 19,35 0,37 -11,1 -19,-16 0,-37 z m 4,12 c 8,11 -2,21 -2,22 9,0 9,-17 2,-22 z m -25,19 6,12 h -14 z m 41,0 8,12 h -14 z m -48,16 h 14 l 9,32 z m 19,0 h 16 l -8,32 z m 22,0 h 14 l -22,32 z",
		"5": "m 35,5 c -10,0 -20,5 -25,14 -7,10 -7,25 1,34 2,3 6,6 9,8 -2,14 7,29 21,33 11,3 23,0 31,-8 6,-6 9,-16 8,-25 9,-5 15,-15 15,-25 0,-12 -6,-24 -17,-28 -9,-4 -20,-4 -28,1 -5,-3 -10,-4 -15,-4 z m 10,8 c -7,6 -11,16 -9,26 -6,4 -11,9 -14,16 -7,-4 -11,-12 -11,-20 1,-12 10,-22 21,-24 4,-1 8,0 12,2 z m 34,42 c -2,-7 -7,-12 -14,-16 1,-10 -2,-19 -9,-26 8,-4 17,-2 23,3 8,6 13,18 9,28 -2,5 -5,9 -10,12 z m -28,-39 c 6,5 10,12 9,20 -6,-2 -12,-2 -18,0 -1,-8 3,-15 9,-20 z m 8,26 c -1,4 -4,8 -8,11 -4,-3 -6,-7 -8,-11 5,-2 11,-2 16,0 z m -21,3 c 2,5 4,9 8,12 -6,2 -12,3 -18,1 2,-5 5,-10 10,-13 z m 27,0 c 4,3 8,8 10,13 -6,2 -12,2 -18,-1 4,-3 6,-7 8,-12 z m -13,16 c 7,4 16,5 24,3 1,11 -8,23 -19,25 -9,2 -18,-1 -24,-8 -4,-5 -6,-11 -6,-17 8,3 17,2 24,-3 z",
	},
	"icon6": {
		"0": "m 5,5 v 90 h 90 v -90 z m 2,2 h 86 l -86,86 z",
		"1": "m 50,5 -15,10 15,10 v -8 c 19,4 31,16 32,32 h -8 l 10,15 10,-15 h -8 c 0,0 0,-36 -38,-38 z m -45,25 v 40 h 20 v -20 h 20 v -20 z m 25,25 v 40 h 40 v -40 z m 5,5 h 30 v 30 h -30 z",
		"2": "m 10,10 v 50 h 30 v -15 h -15 v -20 h 20 v 15 h 15 v -30 z m 50,30 v 1.2 h 28.8 v 47.5 h -47.6 v -28.7 h -1.2 v 30 h 50 v -50 z m -18.8,20 h 13.8 v -5 h 5 v -13.8 h -15 v 3.8 h -3.8 z m 0,-15 v -3.8 h 3.8 v -1.2 h -5 v 5 z m 18.8,10 v 0.5 h 14.5 v 19 h -19 v -14.5 h -0.5 v 15 h 20 v -20 z m -4.5,5 4.5,0.1 v -4.6 h -4.5 z m 4.5,0.1 v 10 h 8.8 v -2.6 h -6.1 v -1.4 h 4.8 v -2.5 h -4.8 v -0.9 h 6.1 v -2.6 z m -30,-30.1 v 10 h 2.5 6.2 v -2.5 h -6.2 v -1.5 h 5 v -2.5 h -5 v -1 h 6.2 v -2.5 h -6.2 z m 13.7,11.5 v 1.7 l -1.6,-1.6 -0.6,0.6 1.6,1.6 h -1.6 l 0.8,0.7 h 2.2 v -2.2 z m 16.5,18.8 h 8.3 v 2.2 h -6.1 v 1.4 h 4.8 v 2 h -4.8 v 1.9 h 6.1 l 0.1,2 h -8.4 z",
		"3": "m 5,22 v 16 39 h 61 v -56 z m 5,5 h 51 v 46 h -51 z m 14,6 c -3,0 -5,2 -5,5 0,3 2,5 5,5 3,0 5,-2 5,-5 0,-3 -2,-5 -5,-5 z m 24,8 c -4,0 -10,9 -12,14 -4,2 -9,-6 -13,-4 -6,4 -8,10 -10,16 v 0 3 h 40 v -3 0 c 0,-8 -1,-12 -2,-21 0,-2 -2,-4 -3,-5 z m 41,16 c 2,0 4,20 0,20 8,0 -1,-8 5,-10 -6,-3 2,-10 -5,-10 z m -12,0 c -6,0 1,9 -5,10 6,1 -2,11 5,10 -3,-1 -2,-6 -2,-9 0,-4 0,-8 2,-11 z m 1,5 c -1,0 -1,0 -1,1 0,1 0,1 1,1 1,0 1,0 1,-1 0,-1 0,-1 -1,-1 z m 5,0 c -1,0 -1,0 -1,1 0,1 0,1 1,1 1,0 1,0 1,-1 0,-1 0,-1 -1,-1 z m 5,0 c -1,0 -1,0 -1,1 0,1 0,1 1,1 1,0 1,0 1,-1 0,-1 0,-1 -1,-1 z m -18,5 h -1 v 1 l -1,1 v 0 h -1 v 1 h 1 l 1,1 v 0 1 h 1 v -1 l 1,-1 v 0 h 1 v -1 h -1 l -1,-1 v 0 z m 8,0 c -1,0 -1,0 -1,1 0,1 0,1 1,1 1,0 1,0 1,-1 0,-1 0,-1 -1,-1 z m 5,0 c -1,0 -1,0 -1,1 0,1 0,1 1,1 1,0 1,0 1,-1 0,-1 0,-1 -1,-1 z m 5,0 c -1,0 -1,0 -1,1 0,1 0,1 1,1 1,0 1,0 1,-1 0,-1 0,-1 -1,-1 z m -10,5 c -1,0 -1,0 -1,1 0,1 0,1 1,1 1,0 1,0 1,-1 0,-1 0,-1 -1,-1 z m 5,0 c -1,0 -1,0 -1,1 0,1 0,1 1,1 1,0 1,0 1,-1 0,-1 0,-1 -1,-1 z m 5,0 c -1,0 -1,0 -1,1 0,1 0,1 1,1 1,0 1,0 1,-1 0,-1 0,-1 -1,-1 z",
		"4": "m 28,55 c -22,-11 2,-32 18,-30 0,-1 -35,0 -29,22 2,6 8,8 14,9 1,0 -4,14 -7,13 -23,-10 -23,8 -9,7 5,0 12,-2 14,-2 6,2 11,5 17,0 2,-2 6,-9 6,-8 -9,16 -23,8 -21,6 14,-13 6,-14 11,-17 25,-13 25,-30 17,-31 -16,-3 -23,34 -31,31 z m 13,-2 c 2,-11 5,-24 16,-29 12,-1 -10,31 -16,29 z m 29,-11 c -10,2 -1,15 -9,18 8,0 -2,17 10,16 -7,-3 2,-13 -5,-16 5,-5 0,-12 4,-17 z m 16,0 c 4,5 0,12 4,17 -7,3 2,13 -5,16 12,1 2,-15 10,-16 -8,-3 1,-16 -9,-18 z m 1,10 c -2,0 0,0 -16,0 v 16 c 4,0 12,1 16,0 z m -2,13 c -2,3 -13,-7 -10,-10 10,-3 10,3 10,10 z m -10,-4 c 4,4 8,7 2,6 -6,1 -5,-4 -2,-6 z m -52,9 c 2,3 -13,8 -16,1 -3,-6 11,-7 16,-1 z",
		"5": "m 50,5 a 45,45 0 0 0 -45,45 45,45 0 0 0 45,45 45,45 0 0 0 45,-45 45,45 0 0 0 -45,-45 z m 0,5 a 40,40 0 0 1 40,40 40,40 0 0 1 -40,40 40,40 0 0 1 -40,-40 40,40 0 0 1 40,-40 z m 2,1 -2,1 32,56 2,-1 z m -11,1 -2,1 38,65 2,-1 z m 24,1 -2,1 25,43 2,-1 z m -33,3 -2,1 39,68 2,-1 z m -9,7 -2,1 38,65 2,-1 z m -5,9 -2,1 32,56 2,-1 z m -5,11 -2,1 25,43 2,-1 z",
	},
	"icon7": {
		"0": "m 76,3 -18,27 c -6,9 12,22 18,12 l 18,-26 z m -25,36 -18,25 c -4,6 14,19 18,12 l 18,-25 z m -17,35 c 0,0 -15,12 -28,18 0,0 26,19 37,-12 z",
		"1": "m 46,13 -4,4 c -55,-9 -40,20 12,21 0,0 -3,-4 -5,-7 0,-3 16,-1 10,8 -4,8 -41,-3 -41,-3 l -16,16 34,34 41,-41 z m 8,8 c 0,0 2,2 6,4 z m 6,4 18,20 c 0,0 12,3 12,7 0,3 4,3 7,0 3,-4 0,-10 -16,-13 0,0 9,-3 9,1 0,3 7,-4 0,-7 -7,-3 -12,1 -14,1 -2,-1 -10,-6 -15,-10 z m -23,-2 -8,7 c 0,0 -12,-3 -12,-5 0,-2 8,-5 20,-1 z",
		"2": "m 34,21 c 0,0 21,21 13,27 -9,3 -16,-22 -17,-25 l 2,42 26,17 12,-7 -2,-32 -35,-23 c 0,0 0,0 0,0 z m -4,3 z m 27,62 1,2 17,-10 -1,-2 z",
		"3": "m 70,2 -11,15 17,12 11,-14 z m -12,17 -40,53 3,2 40,-53 z m 6,4 -40,52 4,3 40,-52 z m 6,5 -40,52 4,2 40,-51 z m -53,47 v 17 l 17,-5 -11,-8 z",
		"4": "m 23,10 c -9,5 -8,27 5,26 h 40 c 5,-3 4,-16 7,-3 1,4 2,13 -5,10 -1,0 -21,-6 -26,8 l -5,14 c -11,32 19,34 13,0 l -4,-16 c 0,-5 32,7 34,-7 0,-8 3,-22 -10,-22 0,-5 -1,-10 -4,-10 z m 0,0 h 44 l -3,4 -44,-1 c 0,-1 2,-2 3,-3 z",
		"5": "m 45,5 c 15,6 9,20 20,29 2,2 8,5 3,8 -10,11 -20,22 -31,32 -5,0 -8,-5 -10,-9 -6,-11 -21,-18 -18,-24 2,-12 16,4 24,4 0,-5 -14,-13 -8,-21 7,-6 12,-14 20,-19 z m 27,58 c -1,6 22,9 20,21 -2,5 -7,10 -12,11 -10,0 -14,-22 -20,-20 -4,12 -22,13 -22,0 1,-2 25,-26 34,-34 22,8 3,17 0,23 z m 8,16 c -5,0 -6,8 0,6 3,1 3,-7 0,-6 z",
	},
	"icon8": {
		"0": "m 6,5 c -1,0 -1,1 -1,1 v 88 c 0,0 1,1 1,1 h 88 c 0,0 1,-1 1,-1 v -88 c 0,0 -1,-1 -1,-1 z m 2,3 h 40 v 51 h -40 z m 44,0 h 40 v 30 h -40 z m 20,10 c -1,0 -1,1 -1,1 v 2 h -2 c -1,0 -1,1 -1,1 0,1 1,1 1,1 h 2 v 2 c 0,1 1,1 1,1 1,0 1,-1 1,-1 v -2 h 2 c 1,0 1,-1 1,-1 0,-1 -1,-1 -1,-1 h -2 v -2 c 0,-1 -1,-1 -1,-1 z m -44,11 c -1,0 -1,1 -1,1 v 2 h -2 c -1,0 -1,1 -1,1 0,1 1,1 1,1 h 2 v 2 c 0,1 1,1 1,1 1,0 1,-1 1,-1 v -2 h 2 c 1,0 1,-1 1,-1 0,-1 -1,-1 -1,-1 h -2 v -2 c 0,-1 -1,-1 -1,-1 z m 24,12 h 40 v 51 h -40 z m 20,21 c -1,0 -1,1 -1,1 v 2 h -2 c -1,0 -1,1 -1,1 0,1 1,1 1,1 h 2 v 2 c 0,1 1,1 1,1 1,0 1,-1 1,-1 v -2 h 2 c 1,0 1,-1 1,-1 0,-1 -1,-1 -1,-1 h -2 v -2 c 0,-1 -1,-1 -1,-1 z m -64,1 h 19 v 29 h -19 z m 22,0 h 18 v 29 h -18 z m -12,10 c -1,0 -1,1 -1,1 v 2 h -2 c -1,0 -1,1 -1,1 0,1 1,1 1,1 h 2 v 2 c 0,1 1,1 1,1 1,0 1,-1 1,-1 v -2 h 2 c 1,0 1,-1 1,-1 0,-1 -1,-1 -1,-1 h -2 v -2 c 0,-1 -1,-1 -1,-1 z m 22,0 c -1,0 -1,1 -1,1 v 2 h -2 c -1,0 -1,1 -1,1 0,1 1,1 1,1 h 2 v 2 c 0,1 1,1 1,1 1,0 1,-1 1,-1 v -2 h 2 c 1,0 1,-1 1,-1 0,-1 -1,-1 -1,-1 h -3 v -2 c 0,-1 -1,-1 -1,-1 z",
		"1": "m 5,5 v 90 h 90 v -5 h -10 v -15 h -10 v 15 h -10 v -35 h -10 v 35 h -10 v -45 h -10 v 45 h -10 v -25 h -10 v 25 h -5 v -85 z m 35,10 c -15,-1 -8,18 -30,20 -3,0 -3,10 0,10 22,0 20,-20 30,-20 10,0 37,43 55,25 v -10 c -18,17 -40,-24 -55,-25 z",
		"2": "m 5,5 v 9 9 h 9 v -9 h 9 v -9 z m 72,0 v 9 h 9 v 9 h 9 v -9 -9 z m -33,7 v 32 h -32 v 12 h 32 v 32 h 12 v -32 h 32 v -12 h -32 v -32 z m 6,32 a 6,6 0 0 1 6,6 6,6 0 0 1 -6,6 6,6 0 0 1 -6,-6 6,6 0 0 1 6,-6 z m 0,4 a 2,2 0 0 0 -2,2 2,2 0 0 0 2,2 2,2 0 0 0 2,-2 2,2 0 0 0 -2,-2 z m -45,28 v 9 9 h 18 v -9 h -9 v -9 z m 81,0 v 9 h -9 v 9 h 18 v -9 -9 z",
		"3": "m 5,5 v 0 90 h 90 v -90 z m 8,17 h 74 v 57 h -74 z m 55,50 c 54,-27 -44,-73 -50,-21 -1,17 30,31 50,21 z m -5,-6 c -10,5 -39,-1 -37,-16 3,-31 79,-8 37,16 z",
		"4": "m 56,30 v 7 h 41 v -7 z m -50,2 c -2,0 -3,0 -3,2 0,2 2,2 3,3 2,2 3,3 9,3 5,0 5,-5 9,-5 3,0 5,5 10,5 5,0 10,-2 10,-5 0,-3 -10,0 -10,0 -3,0 -5,-3 -10,-3 -5,0 -5,3 -9,3 -3,0 -3,-2 -7,-3 z m 39,13 v 10 h 10 v -10 z m -22,0 c -5,0 -5,5 -9,5 -3,0 -3,-2 -7,-3 -3,-2 -5,-2 -5,0 0,2 2,3 3,3 2,0 3,5 9,5 5,0 5,-5 9,-5 3,0 5,3 10,3 5,0 10,2 10,-3 0,-5 -3,-3 -10,-2 -3,0 -5,-3 -10,-3 z m 26,2 h 2 l 2,3 -2,3 h -2 l 2,-2 h -4 v -2 h 4 z m 7,-2 v 7 h 41 v -7 z m -33,12 c -5,0 -5,5 -9,5 -3,0 -3,-2 -7,-3 -3,-2 -5,-2 -5,0 0,2 2,3 3,3 2,0 3,3 9,3 5,0 5,-3 9,-3 3,0 5,3 10,3 5,0 9,-3 10,-3 2,0 3,-5 0,-5 -3,0 -7,5 -10,5 -3,0 -5,-5 -10,-5 z m 33,5 v 7 h 41 v -7 z",
		"5": "m 15,5 v 9 h -10 v 81 h 31 v -62 h 59 v -28 z m 5,5 h 17 v 5 h 5 v -5 h 5 v 5 h 5 v -5 h 5 v 5 h 5 v -5 h 5 v 5 h 5 v -5 h 5 v 5 h 5 v -5 h 8 v 18 h -56 z m 0,9 11,15 v 56 h -22 v -71 z m -5,20 1,36 h 9 z m 2,12 5,21 h -4 z",
		
	},
	"close": {
		"0": "m 0 0 L 0 100 L 100 100 L 100 0 L 0 0 z M 37 28 L 50 41 L 63 28 L 72 37 L 59 50 L 72 63 L 63 72 L 50 59 L 37 72 L 28 63 L 41 50 L 28 37 L 37 28 z",
	},
	"minimise": {
		
		"0": "m 0,100 V 0 H 100 V 100 M 42.5,77.5 50,70 47.5,52.5 30,50 22.5,57.5 h 15 L 15,77.5 22.5,85 42.5,62.5 M 85,22.5 77.5,15 57.5,37.5 v -15 L 50,30 52.5,47.5 70,50 77.5,42.5 h -15 z m -70,5 2.5,5 15,-15 -5,-2.5 z m 52.5,55 5,2.5 12.5,-12.5 -2.5,-5 z",
	}
}

export const iconsID = {
	"icon1": {
		"0": "RESIZE",
		"1": "CROP",
		"2": "ROTATE",
		"3": "SKEW",
		"4": "MIRROR",
		"5": "WRAP",
	},
	"icon2": {
		"0": "RECTANGULAR SELECTION",
		"1": "MAGIC WAND",
		"2": "CIRCULAR SELECTION",
		"3": "LASSO SELECTION",
		"4": "DOT SELECTION",
		"5": "DROPPER SELECTION",
	},
	"icon3": {
		"0": "HEAL FIX",
		"1": "CLONE FIX",
		"2": "MAGIC ERASER",
		"3": "BLUR FIX",
		"4": "PRESERVE BY COLOR",
		"5": "THREE POINTS TOOL",
	},
	"icon4": {
		"0": "ADD TEXT",
		"1": "REPLACE COLOR",
		"2": "ADD SYMBOL",
		"3": "ADD PATTERN",
		"4": "ADD PADDING",
		"5": "ADD FRAME",
	},
	"icon5": {
		"0": "BRIGHTNESS",
		"1": "CONTRAST",
		"2": "SHARPNESS",
		"3": "ALPHA AND GAMMA",
		"4": "BLUR",
		"5": "HUE",
	},
	"icon6": {
		"0": "GRAYSCALE",
		"1": "NEGATIVE",
		"2": "OUTLINE",
		"3": "CONVOLUTION 3×3",
		"4": "LAPLACE",
		"5": "APPLY FILTER",
	},
	"icon7": {
		"0": "BRUSH TOOL",
		"1": "BUCKET TOOL",
		"2": "PEN TOOL",
		"3": "PENCIL TOOL",
		"4": "ROLLER",
		"5": "PATTERN BRUSH",
	},
	"icon8": {
		"0": "COLLAGE",
		"1": "HISTOGRAM",
		"2": "ADD FRAME",
		"3": "NOISE REDUCTION",
		"4": "VIGNETTE",
		"5": "ALIGN",
		"6": "MEASURE",
	},
	"close": {
		"0": "CLOSE",
	},
	"minimise": {
		
		"0": "MINIMISE",
	}
}