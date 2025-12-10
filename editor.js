(function() {
    console.log("Letterblack Custom Builder v1.1 Initializing...");

    if (document.getElementById('lb-builder-ui')) return;

    // --- history System ---
    const history = {
        undoStack: [],
        redoStack: [],
        push(action) {
            this.undoStack.push(action);
            this.redoStack = []; // Clear redo on new action
            console.log("Action recorded:", action.type);
        },
        undo() {
            const action = this.undoStack.pop();
            if (!action) return;
            this.redoStack.push(action); // simple redo might need more logic
            this.apply(action, true);
        },
        redo() {
            const action = this.redoStack.pop();
            if (!action) return;
            this.undoStack.push(action);
            this.apply(action, false);
        },
        apply(action, isUndo) {
            switch(action.type) {
                case 'transform':
                    const tf = isUndo ? action.oldTransform : action.newTransform;
                    action.el.style.transform = `translate(${tf.x}px, ${tf.y}px) rotate(${tf.rot}deg) scale(${tf.scale})`;
                    // Also update internal state if this is currently selected
                    if (selectedEl === action.el) {
                        currentTransform = {...tf};
                        updateSelectionBox();
                    }
                    break;
                case 'text':
                    action.el.innerHTML = isUndo ? action.oldText : action.newText;
                    break;
                case 'delete':
                    if (isUndo) {
                        action.parent.insertBefore(action.el, action.nextSibling);
                    } else {
                        action.el.remove();
                    }
                    break;
                case 'add':
                    if (isUndo) {
                        action.el.remove();
                    } else {
                        action.parent.appendChild(action.el);
                    }
                    break;
            }
        }
    };

    // --- 1. Inject UI ---
    const uiHTML = `
        <div id="lb-builder-ui">
            <!-- Left Toolbar -->
            <div id="lb-toolbar">
                <button class="lb-tool-btn active" id="tool-select" title="Select / Move (V)">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>
                </button>
                <button class="lb-tool-btn" id="tool-text" title="Edit Text (T)">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
                </button>
                <div class="lb-divider"></div>
                
                <button class="lb-tool-btn" id="tool-undo" title="Undo (Ctrl+Z)">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
                </button>
                <button class="lb-tool-btn" id="tool-redo" title="Redo (Ctrl+Y)">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
                </button>
                
                <div class="lb-divider"></div>
                <button class="lb-tool-btn" id="tool-rect" title="Rectangle (R)">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
                </button>
                <button class="lb-tool-btn" id="tool-circle" title="Circle (C)">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
                </button>
                <button class="lb-tool-btn" id="tool-embed" title="Embed Video">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </button>
                <div class="lb-divider"></div>
                <button class="lb-tool-btn" id="tool-delete" title="Delete Selected (Del)">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
                <button class="lb-tool-btn" id="tool-save" title="Save HTML">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                </button>
            </div>

            <!-- Selection Overlay -->
            <div id="lb-selection-box">
                <div class="lb-handle lb-handle-tl" data-dir="nw"></div>
                <div class="lb-handle lb-handle-tr" data-dir="ne"></div>
                <div class="lb-handle lb-handle-bl" data-dir="sw"></div>
                <div class="lb-handle lb-handle-br" data-dir="se"></div>
                <div class="lb-handle lb-handle-rot"></div>
            </div>

            <!-- Modal -->
            <div id="lb-modal">
                <h3 id="lb-modal-title">Embed Video</h3>
                <input type="text" id="lb-embed-url" placeholder="Video URL / YouTube Link">
                <select id="lb-embed-type">
                    <option value="hover">Hover to Play</option>
                    <option value="click">Click to Play</option>
                    <option value="autoplay">Autoplay Loop</option>
                </select>
                <button id="lb-embed-btn">Add Embed</button>
                <button onclick="document.getElementById('lb-modal').style.display='none'" style="background:transparent; border:1px solid #555; margin-top:5px;">Cancel</button>
            </div>
        </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = uiHTML;
    document.body.appendChild(container);

    // --- 2. State & Variables ---
    let activeTool = 'select';
    let selectedEl = null;
    let isDragging = false;
    let startX, startY;
    let initialTransform = { x: 0, y: 0, rot: 0, scale: 1 };
    let currentTransform = { x: 0, y: 0, rot: 0, scale: 1 };

    // --- 3. Tool Switching ---
    document.querySelectorAll('.lb-tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.id === 'tool-undo') { history.undo(); return; }
            if (btn.id === 'tool-redo') { history.redo(); return; }
            if (btn.id === 'tool-delete') { deleteSelected(); return; }
            if (btn.id === 'tool-save') { saveHTML(); return; }
            if (btn.id === 'tool-rect') { addShape('rect'); return; }
            if (btn.id === 'tool-circle') { addShape('circle'); return; }
            if (btn.id === 'tool-embed') { showEmbedModal(); return; }

            document.querySelectorAll('.lb-tool-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeTool = btn.id.replace('tool-', '');
            
            // Text Mode UI
            if (activeTool === 'text') {
                document.body.classList.add('lb-text-mode');
                deselect();
            } else {
                document.body.classList.remove('lb-text-mode');
                // Remove contentEditable from potentially active element
                if (document.activeElement && document.activeElement.contentEditable === 'true') {
                    document.activeElement.blur();
                }
            }
        });
    });

    // --- 4. Selection & Text Logic ---
    const selectionBox = document.getElementById('lb-selection-box');
    const selectableSelector = 'section, div, img, video, h1, h2, h3, p, span, a, .lb-shape';

    document.addEventListener('mousedown', (e) => {
        if (e.target.closest('#lb-builder-ui')) return;

        // -- Text Tool Logic --
        if (activeTool === 'text') {
            const target = e.target.closest('h1, h2, h3, p, span, a, li, .btn');
            if (target) {
                if (target.contentEditable !== 'true') {
                    e.preventDefault(); // Prevent default to set caret manually? No, let default happen but enable editing first
                    makeEditable(target);
                    // Manually focus to be sure
                    setTimeout(() => target.focus(), 0); 
                }
                return;
            }
        }

        // -- Select / Move Logic --
        if (activeTool === 'select') {
            // Handle Handles first (Rotation/Scale) - To Be Implemented for Scale
            // For now, assume Selection
            const target = e.target.closest(selectableSelector);
            if (target && target !== document.body) {
                // If clicking an existing selection, allow drag immediately
                if (target !== selectedEl) {
                    selectElement(target);
                }
                
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                
                // Snapshot for Undo
                const style = window.getComputedStyle(selectedEl);
                const matrix = new WebKitCSSMatrix(style.transform);
                initialTransform = { x: matrix.m41, y: matrix.m42, rot: 0, scale: 1 }; // Simplifying rotation parse for now
                currentTransform = {...initialTransform};
            } else {
                deselect();
            }
        }
    });

    // Make text editable helper
    function makeEditable(el) {
        // Save old text for undo
        const oldText = el.innerHTML;
        
        el.contentEditable = true;
        el.focus();
        
        // On blur, disable and save history
        const onBlur = () => {
            el.contentEditable = false;
            if (el.innerHTML !== oldText) {
                history.push({
                    type: 'text',
                    el: el,
                    oldText: oldText,
                    newText: el.innerHTML
                });
            }
            el.removeEventListener('blur', onBlur);
        };
        el.addEventListener('blur', onBlur);
    }

    // --- 5. Move Logic ---
    document.addEventListener('mousemove', (e) => {
        if (activeTool === 'select' && isDragging && selectedEl) {
            e.preventDefault();
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            currentTransform.x = initialTransform.x + dx;
            currentTransform.y = initialTransform.y + dy;
            
            updateTransform();
            updateSelectionBox();
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging && selectedEl) {
            // Check if moved significantly to record history
            if (currentTransform.x !== initialTransform.x || currentTransform.y !== initialTransform.y) {
                history.push({
                    type: 'transform',
                    el: selectedEl,
                    oldTransform: {...initialTransform},
                    newTransform: {...currentTransform}
                });
            }
        }
        isDragging = false;
    });

    function selectElement(el) {
        if (selectedEl) selectedEl.style.outline = '';
        selectedEl = el;
        updateSelectionBox();
        selectionBox.style.display = 'block';
    }

    function deselect() {
        if (selectedEl) selectedEl.style.outline = '';
        selectedEl = null;
        selectionBox.style.display = 'none';
        isDragging = false;
    }

    function updateSelectionBox() {
        if (!selectedEl) return;
        const rect = selectedEl.getBoundingClientRect();
        selectionBox.style.width = rect.width + 'px';
        selectionBox.style.height = rect.height + 'px';
        selectionBox.style.left = (rect.left + window.scrollX) + 'px';
        selectionBox.style.top = (rect.top + window.scrollY) + 'px';
    }

    function updateTransform() {
        if (!selectedEl) return;
        const style = window.getComputedStyle(selectedEl);
        if (style.position === 'static') selectedEl.style.position = 'relative';
        selectedEl.style.transform = `translate(${currentTransform.x}px, ${currentTransform.y}px) rotate(${currentTransform.rot}deg) scale(${currentTransform.scale})`;
    }

    // --- 6. Actions ---
    function deleteSelected() {
        if (selectedEl) {
            const el = selectedEl;
            const parent = el.parentNode;
            const nextSibling = el.nextSibling;
            
            history.push({
                type: 'delete',
                el: el,
                parent: parent,
                nextSibling: nextSibling
            });
            
            el.remove();
            deselect();
        } else {
            alert('Select an element first.');
        }
    }

    function addShape(type) {
        const div = document.createElement('div');
        div.className = 'lb-shape';
        div.style.width = '100px';
        div.style.height = '100px';
        div.style.background = '#333';
        div.style.border = '2px solid #fff';
        div.style.position = 'relative';
        div.style.margin = '20px auto';
        if (type === 'circle') div.style.borderRadius = '50%';
        
        const container = document.querySelector('.container') || document.body;
        container.appendChild(div);
        
        history.push({ type: 'add', el: div, parent: container });
        selectElement(div);
        div.scrollIntoView({behavior:'smooth', block:'center'});
    }

    // --- 7. Embed System ---
    function showEmbedModal() { document.getElementById('lb-modal').style.display = 'block'; }
    document.getElementById('lb-embed-btn').addEventListener('click', () => {
        const url = document.getElementById('lb-embed-url').value;
        const type = document.getElementById('lb-embed-type').value;
        if (!url) return;
        
        const container = document.createElement('div');
        container.className = 'lb-embed-wrapper lb-shape';
        container.style.width = '100%';
        container.style.maxWidth = '600px';
        container.style.aspectRatio = '16/9';
        container.style.background = '#000';
        container.style.margin = '20px auto';
        container.style.position = 'relative';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';

        if (type === 'hover') {
            const video = document.createElement('video');
            video.src = url;
            video.muted = true;
            video.loop = true;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.addEventListener('mouseenter', () => video.play());
            video.addEventListener('mouseleave', () => video.pause());
            container.appendChild(video);
        } else if (type === 'click') {
            container.innerHTML = `<button style="background:var(--color-red); border:none; color:white; padding:10px 20px; border-radius:30px; cursor:pointer;">▶ Play Video</button>`;
            container.style.cursor = 'pointer';
            container.onclick = function() {
                this.innerHTML = `<video src="${url}" controls autoplay style="width:100%;height:100%"></video>`;
                this.onclick = null;
            };
        } else {
            const video = document.createElement('video');
            video.src = url;
            video.muted = true;
            video.autoplay = true;
            video.loop = true;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            container.appendChild(video);
        }

        const target = document.querySelector('.container') || document.body;
        target.appendChild(container);
        
        history.push({ type: 'add', el: container, parent: target });
        document.getElementById('lb-modal').style.display = 'none';
        selectElement(container);
    });

    // --- 8. Save HTML ---
    function saveHTML() {
        if (!confirm('Download updated HTML?')) return;
        deselect();
        const docClone = document.documentElement.cloneNode(true);
        const ui = docClone.querySelector('#lb-builder-ui');
        if (ui) ui.remove();
        
        // Remove helper classes
        docClone.querySelectorAll('.lb-text-mode').forEach(el => el.classList.remove('lb-text-mode'));
        docClone.body.classList.remove('lb-text-mode');
        
        const html = `<!DOCTYPE html>\n` + docClone.outerHTML;
        const blob = new Blob([html], {type:'text/html'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Key Shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Delete') deleteSelected();
        if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); history.undo(); }
        if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); history.redo(); }
        if (e.key === 'v') document.getElementById('tool-select').click();
        if (e.key === 't') document.getElementById('tool-text').click();
    });

})();
