import {createSVGElement} from './icons2.js';
import {createSubmenu} from "./submenu.js";

export const menuTitles = ['Transform',
	'Selection',
	'Fix',
	'Add',
	'Adjust',
	'Process',
	'Draw',
	'Background'];

function createNavigationNode(navigationBlockID) {
	const navigationBlock = document.getElementById(`${navigationBlockID}`);
	const navigationMenu = createElement('div', 'navigation__menuContainer',
		'navigation__menuContainer', navigationBlock, null);
	const navigationBadgeContainer = createElement('div',
		'navigation__badgeContainer', 'navigation__badgeContainer',
		navigationBlock, null);
	const navigationSubMenu = createElement('div', 'navigation__submenuContainer',
		'navigation__submenuContainer', navigationBlock, null);
	let navigationMenuButtons, previousActiveIndex, previousButtonElement,
		previousSubmenuElement, previousElementArrow, previousElementBadge,
		currentActiveIndex, currentButtonElement, currentSubmenuElement,
		currentElementArrow, currentElementBadge;
	const history = Array(menuTitles.length).fill(0);
	
	function createStaticElements() {
		for (let i = 0; i < menuTitles.length; i++) {
			const buttonAttributes = [['aria-label', menuTitles[i].toLowerCase()],
				['aria-pressed', 'false'],
				['data--index', `${i}`],
				['name', `${menuTitles[i].toLowerCase()}_button`],
				['tabIndex', `${i}`],
				['title', menuTitles[i]],
				['type', 'button'],
				['value', menuTitles[i]]];
			const button = createElement('button',
				`navigation__menuContainer__button-${i}`,
				'navigation__menuContainer__button', navigationMenu, null);
			for (let j = 0; j < menuTitles.length; j++) {
				button.setAttribute(buttonAttributes[j][0], buttonAttributes[j][1]);
			}
			const svg = createSVGElement(`icon${i + 1}`);
			button.appendChild(svg);
			const text = document.createElement('span');
			text.textContent = menuTitles[i].toUpperCase();
			text.id = `navigation__menuContainer__button-${i}-text`;
			text.classList.add('navigation__menuContainer__button-text');
			button.appendChild(text);
			button.addEventListener('click',
				handleNavigationButtonClick);
			
			const badgeContainerDiv = createElement('div',
				`navigation__badgeContainer__div-${i}`,
				'navigation__badgeContainer__div', navigationBadgeContainer);
			const badge = createElement('span',
				`navigation__badgeContainer__div__badge-${i}`,
				'navigation__badgeContainer__div__badge-inactive', badgeContainerDiv);
			badge.setAttribute('data--index', `${i}`);
			createElement('span', `navigation__badgeContainer__div__arrow-${i}`,
				'navigation__badgeContainer__div__arrow', badgeContainerDiv);
		}
		navigationMenuButtons = Array.from(navigationMenu.children);
	}
	
	function manageSubmenuDisplay() {
		previousActiveIndex = null;
		currentActiveIndex = null;
	}
	
	function handleNavigationButtonClick(e) {
		previousActiveIndex = currentActiveIndex;
		previousButtonElement = currentButtonElement;
		currentButtonElement = e.currentTarget;
		currentButtonElement.classList.add('navigation__menuContainer__button-active');
		currentActiveIndex = currentButtonElement.getAttribute('data--index');
		setPrevElements();
		if (previousActiveIndex === null) {
			updatePanel(e);
		} else {
			if (previousActiveIndex !== currentActiveIndex) {
				previousButtonElement.setAttribute('aria-expanded', 'false');
				previousButtonElement.classList.remove('navigation__menuContainer__button-active');
				console.log(previousActiveIndex);
				if (previousSubmenuElement) {
					previousSubmenuElement.remove();
				}
				previousElementArrow.className = 'navigation__badgeContainer__div__arrow-inactive';
				previousElementBadge.className = 'navigation__badgeContainer__div__badge-inactive';
				previousActiveIndex = null;
				updatePanel(e);
			}
		}
	}
	
	function minimise(e) {
		console.log(e);
		previousActiveIndex = currentActiveIndex;
		setPrevElements();
		console.log(currentActiveIndex, previousButtonElement, previousElementArrow,
			previousElementBadge);
		history[previousActiveIndex] = previousSubmenuElement.cloneNode(true);
		previousButtonElement.setAttribute('aria-expanded', 'false');
		previousButtonElement.classList.remove('navigation__menuContainer__button-active');
		previousSubmenuElement.remove();
		previousElementArrow.className = 'navigation__badgeContainer__div__arrow-inactive';
		previousElementBadge.className = 'navigation__badgeContainer__div__badge-active';
		previousElementBadge.textContent = '↦.';
		previousElementBadge.addEventListener('click', maximise);
		previousActiveIndex = null;
		currentActiveIndex = null;
	}
	
	function setPrevElements() {
		previousSubmenuElement = document.getElementById(
			`navigation__submenuContainer__submenu-${previousActiveIndex}`);
		previousElementArrow = document.getElementById(
			`navigation__badgeContainer__div__arrow-${previousActiveIndex}`);
		previousElementBadge = document.getElementById(
			`navigation__badgeContainer__div__badge-${previousActiveIndex}`);
		previousButtonElement = document.getElementById(
			`navigation__menuContainer__button-${previousActiveIndex}`);
	}
	
	function maximise(e) {
		previousActiveIndex = currentActiveIndex;
		currentActiveIndex = e.currentTarget.getAttribute('data--index');
		if (previousActiveIndex !== null) {
			setPrevElements();
			console.log(currentActiveIndex, previousSubmenuElement,
				previousActiveIndex);
			previousButtonElement.setAttribute('aria-expanded', 'false');
			previousButtonElement.classList.remove('navigation__menuContainer__button-active')
			if (previousSubmenuElement) {
				previousSubmenuElement.remove();
				
				if (previousButtonElement instanceof HTMLElement && previousButtonElement.classList.contains('navigation__menuContainer__button-active')) {
					previousButtonElement.classList.remove('navigation__menuContainer__button-active');
				}
			}
			previousElementArrow.className = 'navigation__badgeContainer__div__arrow-inactive';
			previousElementBadge.className = 'navigation__badgeContainer__div__badge-inactive';
			previousActiveIndex = null;
		}
		navigationSubMenu.appendChild(history[currentActiveIndex]);
		currentSubmenuElement = document.getElementById(
			`navigation__submenuContainer__submenu-${currentActiveIndex}`);
		currentElementArrow = document.getElementById(
			`navigation__badgeContainer__div__arrow-${currentActiveIndex}`);
		currentElementBadge = document.getElementById(
			`navigation__badgeContainer__div__badge-${currentActiveIndex}`);
		currentButtonElement = document.getElementById(
			`navigation__menuContainer__button-${currentActiveIndex}`);
		currentButtonElement.setAttribute('aria-expanded', 'true');
		currentButtonElement.classList.add('navigation__menuContainer__button-active');
		currentElementArrow.className = 'navigation__badgeContainer__div__arrow-active';
		currentElementBadge.className = 'navigation__badgeContainer__div__badge-inactive';
		const currentCloseButton = document.querySelector(
			'.navigation__submenuContainer__submenu__closeButton');
		currentCloseButton.addEventListener('click', handleClear);
		const currentMinimiseButton = document.querySelector(
			'.navigation__submenuContainer__submenu__minimiseButton');
		currentMinimiseButton.addEventListener('click', minimise);
	}
	
	function createNavigationSubmenuElement(index) {
		const topContainer = document.createElement('div');
		topContainer.className = 'navigation__submenuContainer__submenu__top';
		const minimiseButton = document.createElement('button');
		minimiseButton.className = 'navigation__submenuContainer__submenu__minimiseButton';
		
		const minimiseIcon = createSVGElement('minimise', null,
			'navigation__submenu__minimiseButton__icon');
		minimiseButton.appendChild(minimiseIcon);
		minimiseButton.title = 'Minimise';
		const closeButton = document.createElement('button');
		closeButton.className = 'navigation__submenuContainer__submenu__closeButton';
		closeButton.title = 'Close';
		const closeIcon = createSVGElement('close', null,
			'navigation__submenu__closeButton__icon');
		closeButton.appendChild(closeIcon);
		const title = document.createElement('div');
		title.className = 'navigation__submenuContainer__submenu__title';
		title.id = `navigation__submenuContainer__submenu-${index}__title`;
		
		topContainer.appendChild(minimiseButton);
		topContainer.appendChild(title);
		topContainer.appendChild(closeButton);
		
		const topContentSlot = document.createElement('slot');
		topContentSlot.name = 'top-content';
		topContainer.appendChild(topContentSlot);
		
		const bottomContainer = document.createElement('div');
		bottomContainer.classList.add(
			'navigation__submenuContainer__submenu__bottom');
		
		const bottomContentSlot = createSubmenu(index);
		bottomContentSlot.name = 'bottom-content';
		bottomContainer.appendChild(bottomContentSlot);
		
		const mainContainer = document.createElement('div');
		mainContainer.className = 'navigation__submenuContainer__submenu';
		mainContainer.appendChild(topContainer);
		mainContainer.appendChild(bottomContainer);
		mainContainer.id = `navigation__submenuContainer__submenu-${index}`;
		closeButton.addEventListener('click', handleClear);
		minimiseButton.addEventListener('click', minimise);
		return mainContainer;
	}
	
	function updatePanel() {
		currentSubmenuElement = createNavigationSubmenuElement(currentActiveIndex);
		navigationSubMenu.appendChild(currentSubmenuElement);
		currentSubmenuElement.setAttribute('data--index', `${currentActiveIndex}`);
		const titleElement = document.getElementById(
			`navigation__submenuContainer__submenu-${currentActiveIndex}__title`);
		titleElement.textContent = `${menuTitles[currentActiveIndex]}`;
		
		currentElementArrow = document.getElementById(
			`navigation__badgeContainer__div__arrow-${currentActiveIndex}`);
		currentElementBadge = document.getElementById(
			`navigation__badgeContainer__div__badge-${currentActiveIndex}`);
		currentElementBadge.className = 'navigation__badgeContainer__div__badge-inactive';
		currentElementArrow.className = 'navigation__submenuContainer__div__arrow-active';
		history[currentActiveIndex] = 0;
		currentButtonElement.setAttribute('aria-expanded', 'true');
		currentButtonElement.classList.add('navigation__menuContainer__button-active');
		stylePanel([currentSubmenuElement, currentElementArrow]);
	}
	
	function handleClear() {
		history[currentActiveIndex] = 0;
		
		currentButtonElement.classList.remove('navigation__menuContainer__button-active');
		currentButtonElement.setAttribute('aria-expanded', 'false');
		currentButtonElement.classList.remove('navigation__menuContainer__button-active');
		currentElementBadge.className = 'navigation__badgeContainer__div__badge-inactive';
		currentElementArrow.className = 'navigation__submenuContainer__div__arrow-inactive';
		currentSubmenuElement.remove();
		previousActiveIndex = null;
		currentActiveIndex = null;
	}
	
	function stylePanel(dataForStyling) {
		const [submenuElement, arrowElement] = [...dataForStyling];
		submenuElement.style.width = `100%`;
		arrowElement.className = 'navigation__badgeContainer__div__arrow-active';
		if (Number(currentActiveIndex) >= menuTitles.length - 4) {
			submenuElement.style.gridRowStart = `${navigationMenuButtons.length - 3}`;
			submenuElement.style.gridRowEnd = `${navigationMenuButtons.length + 1}`;
			submenuElement.style.overflowY = 'hidden';
			arrowElement.style.clipPath = 'polygon(0% 50%, 100% 0%, 100% 50%)';
		} else {
			submenuElement.style.gridRowStart = `${Number(currentActiveIndex) + 1}`;
			submenuElement.style.gridRowEnd = `${Number(currentActiveIndex) + 5}`;
			submenuElement.style.overflowY = 'hidden';
			arrowElement.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 50%)';
		}
	}
	
	function createElement(tag, id, className, parent, textContent = null) {
		const newElement = document.createElement(tag);
		newElement.id = `${id}`;
		newElement.className = `${className}`;
		if (textContent) {
			newElement.textContent = textContent;
		}
		parent.appendChild(newElement);
		return newElement;
	}
	
	createStaticElements();
	
	manageSubmenuDisplay('navigation__menuContainer');
}

createNavigationNode('navigation');
