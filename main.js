(function(global) {
    const ModernUI = (() => {
        const createContainer = () => {
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '50%';
            container.style.left = '50%';
            container.style.transform = 'translate(-50%, -50%)';
            container.style.width = '350px';
            container.style.backgroundColor = '#333';
            container.style.color = '#fff';
            container.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.7)';
            container.style.zIndex = 9999;
            container.style.borderRadius = '8px';
            container.style.overflow = 'hidden';
            container.style.padding = '15px';
            document.body.appendChild(container);
            return container;
        };

        const makeDraggable = (container) => {
            let isDragging = false;
            let offsetX, offsetY;

            container.onmousedown = (e) => {
                isDragging = true;
                offsetX = e.clientX - container.getBoundingClientRect().left;
                offsetY = e.clientY - container.getBoundingClientRect().top;
                document.body.style.cursor = 'move';
            };

            document.onmouseup = () => {
                isDragging = false;
                document.body.style.cursor = 'default';
            };

            document.onmousemove = (e) => {
                if (isDragging) {
                    container.style.left = `${e.clientX - offsetX}px`;
                    container.style.top = `${e.clientY - offsetY}px`;
                }
            };
        };

        const createControlBox = (container) => {
            const controlBox = document.createElement('div');
            controlBox.style.position = 'absolute';
            controlBox.style.top = '10px';
            controlBox.style.right = '10px';
            controlBox.style.width = '30px';
            controlBox.style.height = '30px';
            controlBox.style.backgroundColor = '#555';
            controlBox.style.color = '#fff';
            controlBox.style.display = 'flex';
            controlBox.style.alignItems = 'center';
            controlBox.style.justifyContent = 'center';
            controlBox.style.cursor = 'pointer';
            controlBox.style.borderRadius = '50%';
            controlBox.innerText = 'X';
            controlBox.onclick = () => container.style.display = 'none';
            container.appendChild(controlBox);
        };

        const createTitle = (text) => {
            const title = document.createElement('h2');
            title.innerText = text;
            title.style.textAlign = 'center';
            title.style.margin = '0 0 10px 0';
            return title;
        };

        const createTabs = (tabs, container) => {
            const tabContainer = document.createElement('div');
            tabContainer.style.display = 'flex';
            tabContainer.style.marginBottom = '10px';

            const sectionContainer = document.createElement('div');
            sectionContainer.style.display = 'none';
            container.appendChild(sectionContainer);

            tabs.forEach(tab => {
                const tabButton = document.createElement('button');
                tabButton.innerText = tab.name;
                tabButton.style.marginRight = '5px';
                tabButton.style.backgroundColor = '#555';
                tabButton.style.color = '#fff';
                tabButton.style.border = 'none';
                tabButton.style.cursor = 'pointer';
                tabButton.style.padding = '10px 15px';
                tabButton.style.borderRadius = '5px';
                tabButton.onmouseover = () => (tabButton.style.backgroundColor = '#666');
                tabButton.onmouseout = () => (tabButton.style.backgroundColor = '#555');

                tabButton.onclick = () => {
                    while (sectionContainer.firstChild) {
                        sectionContainer.removeChild(sectionContainer.firstChild);
                    }
                    sectionContainer.style.display = 'block';
                    sectionContainer.appendChild(tab.content());
                };

                tabContainer.appendChild(tabButton);
            });

            container.appendChild(tabContainer);
        };

        const createStyledDiv = (element) => {
            const div = document.createElement('div');
            div.style.backgroundColor = '#444';
            div.style.padding = '10px';
            div.style.borderRadius = '5px';
            div.style.margin = '10px 0';
            div.appendChild(element);
            return div;
        };

        const createButton = (text, onClick) => {
            const button = document.createElement('button');
            button.innerText = text;
            button.style.margin = '10px 0';
            button.style.padding = '10px 15px';
            button.style.backgroundColor = '#555';
            button.style.color = '#fff';
            button.style.border = 'none';
            button.style.cursor = 'pointer';
            button.style.borderRadius = '5px';
            button.onmouseover = () => (button.style.backgroundColor = '#666');
            button.onmouseout = () => (button.style.backgroundColor = '#555');
            button.onclick = onClick;
            return createStyledDiv(button);
        };

        const createParagraph = (text) => {
            const paragraph = document.createElement('p');
            paragraph.innerText = text;
            paragraph.style.margin = '10px 0';
            return createStyledDiv(paragraph);
        };

        const createToggle = (text, onToggle) => {
            const toggle = document.createElement('label');
            toggle.style.display = 'flex';
            toggle.style.alignItems = 'center';
            toggle.style.margin = '10px 0';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.style.marginRight = '10px';
            checkbox.onchange = () => onToggle(checkbox.checked);
            
            toggle.appendChild(checkbox);
            toggle.appendChild(document.createTextNode(text));
            return createStyledDiv(toggle);
        };

        const createDropdown = (options, onSelect) => {
            const select = document.createElement('select');
            select.style.margin = '10px 0';
            select.style.padding = '5px';
            options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.innerText = option;
                select.appendChild(opt);
            });
            select.onchange = () => onSelect(select.value);
            return createStyledDiv(select);
        };

        const init = (titleText, tabs) => {
            const container = createContainer();
            makeDraggable(container);
            createControlBox(container);
            container.appendChild(createTitle(titleText));
            createTabs(tabs, container);
        };

        return {
            init,
            createButton,
            createParagraph,
            createToggle,
            createDropdown,
        };
    })();

    global.ModernUI = ModernUI;
})(window);
