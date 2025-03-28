require("./main.css");
var $dSH8u$reactjsxruntime = require("react/jsx-runtime");
var $dSH8u$react = require("react");
var $dSH8u$reacthooksize = require("@react-hook/size");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "SelectionWindow", () => $0d16028b28e5283f$export$c2644827bcb91f96);



var $5d4abfe7f70a3dcc$exports = {};

$parcel$export($5d4abfe7f70a3dcc$exports, "component", () => $5d4abfe7f70a3dcc$export$d8556a2a8f973135, (v) => $5d4abfe7f70a3dcc$export$d8556a2a8f973135 = v);
$parcel$export($5d4abfe7f70a3dcc$exports, "selection", () => $5d4abfe7f70a3dcc$export$7c69810f7b8835c9, (v) => $5d4abfe7f70a3dcc$export$7c69810f7b8835c9 = v);
var $5d4abfe7f70a3dcc$export$d8556a2a8f973135;
var $5d4abfe7f70a3dcc$export$7c69810f7b8835c9;
$5d4abfe7f70a3dcc$export$d8556a2a8f973135 = `wAMUBW_component`;
$5d4abfe7f70a3dcc$export$7c69810f7b8835c9 = `wAMUBW_selection`;


function $0d16028b28e5283f$export$c2644827bcb91f96({ children: children , onCropChange: onCropChange , className: className , width: width , height: height , mouseThreshold: mouseThreshold = 30 , touchThreshold: touchThreshold = 60  }) {
    const [node, setNode] = (0, ($parcel$interopDefault($dSH8u$react))).useState(null);
    const selectionRef = (0, ($parcel$interopDefault($dSH8u$react))).useRef(null);
    const stateRef = (0, ($parcel$interopDefault($dSH8u$react))).useRef({
        crop: null,
        dragging: false,
        pointers: new Map(),
        edges: []
    });
    const [containerWidth, containerHeight] = (0, ($parcel$interopDefault($dSH8u$reacthooksize)))(node);
    (0, ($parcel$interopDefault($dSH8u$react))).useEffect(()=>{
        if (!crop && containerWidth && containerHeight) handleCropChange({
            left: containerWidth * 0.25,
            top: containerHeight * 0.25,
            right: containerWidth * 0.75,
            bottom: containerHeight * 0.75
        });
    }, [
        containerWidth,
        containerHeight
    ]);
    const touchMoveEvent = $0d16028b28e5283f$var$useEvent(handleTouchMove);
    const dragStartEvent = $0d16028b28e5283f$var$useEvent(handleDragStart);
    const dragEvent = $0d16028b28e5283f$var$useEvent(handleDrag);
    const dragEndEvent = $0d16028b28e5283f$var$useEvent(handleDragEnd);
    (0, ($parcel$interopDefault($dSH8u$react))).useEffect(()=>{
        if (!node) return;
        node.addEventListener("touchmove", touchMoveEvent);
        node.addEventListener("pointerdown", dragStartEvent);
        return ()=>{
            node.removeEventListener("touchmove", touchMoveEvent);
            node.removeEventListener("pointerdown", dragStartEvent);
        };
    }, [
        node
    ]);
    const crop = stateRef.current.crop;
    return /*#__PURE__*/ (0, $dSH8u$reactjsxruntime.jsx)("div", {
        ref: setNode,
        className: $0d16028b28e5283f$var$cx(className, (0, (/*@__PURE__*/$parcel$interopDefault($5d4abfe7f70a3dcc$exports))).component),
        style: {
            width: $0d16028b28e5283f$var$px(width),
            height: $0d16028b28e5283f$var$px(height)
        },
        children: /*#__PURE__*/ (0, $dSH8u$reactjsxruntime.jsx)("div", {
            ref: selectionRef,
            className: (0, (/*@__PURE__*/$parcel$interopDefault($5d4abfe7f70a3dcc$exports))).selection,
            style: {
                position: "absolute",
                left: $0d16028b28e5283f$var$px(crop?.left ?? 0),
                top: $0d16028b28e5283f$var$px(crop?.top ?? 0),
                width: $0d16028b28e5283f$var$px((crop?.right ?? 0) - (crop?.left ?? 0)),
                height: $0d16028b28e5283f$var$px((crop?.bottom ?? 0) - (crop?.top ?? 0))
            },
            children: children
        })
    });
    function handleCropChange(crop) {
        stateRef.current.crop = updateSizes(crop);
        onCropChange(stateRef.current.crop);
        Object.assign(selectionRef.current.style, {
            left: $0d16028b28e5283f$var$px(crop?.left ?? 0),
            top: $0d16028b28e5283f$var$px(crop?.top ?? 0),
            width: $0d16028b28e5283f$var$px((crop?.right ?? 0) - (crop?.left ?? 0)),
            height: $0d16028b28e5283f$var$px((crop?.bottom ?? 0) - (crop?.top ?? 0))
        });
    }
    function handleDragStart(e) {
        e.preventDefault();
        const { x: x , y: y  } = getXY(e);
        const threshold = e.pointerType === "mouse" ? mouseThreshold : touchThreshold;
        const pointerState = getPointerState({
            x: x,
            y: y,
            threshold: threshold
        });
        stateRef.current.dragging = true;
        stateRef.current.pointers.set(e.pointerId, pointerState);
        stateRef.current.edges = stateRef.current.edges.concat(pointerState.edges);
        window.addEventListener("pointermove", dragEvent, {
            passive: true
        });
        window.addEventListener("pointerup", dragEndEvent);
        window.addEventListener("pointercancel", dragEndEvent);
    }
    function handleTouchMove(e) {
        if (!stateRef.current.dragging) return;
        e.preventDefault();
    }
    function handleDrag(e) {
        if (!stateRef.current.dragging) return;
        const pointerState = stateRef.current.pointers.get(e.pointerId);
        const { x: x , y: y  } = getXY(e);
        const threshold = e.pointerType === "mouse" ? mouseThreshold : touchThreshold;
        if (pointerState.edges.length) {
            transformSelection({
                pointerState: pointerState,
                x: x - pointerState.dx,
                y: y - pointerState.dy,
                threshold: threshold
            });
        } else if (!pointerState.edges.length && stateRef.current.pointers.size > 1) {
            scaleSelection({
                dx: e.movementX,
                dy: e.movementY
            });
        } else if (stateRef.current.pointers.size === 1) {
            moveSelection({
                dx: e.movementX,
                dy: e.movementY
            });
        }
    }
    function handleDragEnd(e) {
        if (!stateRef.current.pointers.has(e.pointerId)) return; // Drag already ended, multiple events can end dragging
        const { edges: edges  } = stateRef.current.pointers.get(e.pointerId);
        stateRef.current.edges = stateRef.current.edges.filter((x)=>!edges.includes(x));
        stateRef.current.pointers.delete(e.pointerId);
        stateRef.current.dragging = Boolean(stateRef.current.edges.length);
        if (!stateRef.current.dragging) {
            window.removeEventListener("pointermove", dragEvent, {
                passive: true
            });
            window.removeEventListener("pointerup", dragEndEvent);
            window.removeEventListener("pointercancel", dragEndEvent);
        }
    }
    function getXY(e) {
        const { clientX: clientX , clientY: clientY  } = e;
        const rect = node.getBoundingClientRect();
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }
    function getPointerState({ x: x , y: y , threshold: threshold  }) {
        const crop = stateRef.current.crop;
        const edges = [];
        const dl = x - crop.left;
        const dr = x - crop.right;
        const dt = y - crop.top;
        const db = y - crop.bottom;
        const adl = Math.abs(dl);
        const adr = Math.abs(dr);
        const adt = Math.abs(dt);
        const adb = Math.abs(db);
        if (adl <= adr && adl < threshold) edges.push("left");
        else if (adr <= adl && adr < threshold) edges.push("right");
        if (adt <= adb && adt < threshold) edges.push("top");
        else if (adb <= adt && adb < threshold) edges.push("bottom");
        return {
            dx: edges.includes("left") ? dl : edges.includes("right") ? dr : 0,
            dy: edges.includes("top") ? dt : edges.includes("bottom") ? db : 0,
            edges: edges.filter((x)=>!stateRef.current.edges.includes(x))
        };
    }
    function transformSelection({ pointerState: pointerState , x: x , y: y , threshold: threshold  }) {
        const crop = stateRef.current.crop;
        const newCrop = {
            ...crop
        };
        if (pointerState.edges.includes("left")) {
            newCrop.left = Math.max(0, x);
            newCrop.right = Math.min(containerWidth, Math.max(crop.right, x + threshold));
        } else if (pointerState.edges.includes("right")) {
            newCrop.right = Math.min(containerWidth, x);
            newCrop.left = Math.max(0, Math.min(crop.left, x - threshold));
        }
        if (pointerState.edges.includes("top")) {
            newCrop.top = Math.max(0, y);
            newCrop.bottom = Math.min(containerHeight, Math.max(newCrop.bottom, y + threshold));
        } else if (pointerState.edges.includes("bottom")) {
            newCrop.bottom = Math.min(containerHeight, y);
            newCrop.top = Math.max(0, Math.min(crop.top, y - threshold));
        }
        handleCropChange(newCrop);
    }
    function moveSelection({ dx: dx , dy: dy  }) {
        const crop = stateRef.current.crop;
        const newCrop = {
            ...crop
        };
        const clampedDx = $0d16028b28e5283f$var$clamp(-crop.left, containerWidth - crop.right, dx);
        const clampedDy = $0d16028b28e5283f$var$clamp(-crop.top, containerHeight - crop.bottom, dy);
        newCrop.left = stateRef.current.edges.includes("left") ? crop.left : newCrop.left + clampedDx;
        newCrop.right = stateRef.current.edges.includes("right") ? crop.right : newCrop.right + clampedDx;
        newCrop.top = stateRef.current.edges.includes("top") ? crop.top : newCrop.top + clampedDy;
        newCrop.bottom = stateRef.current.edges.includes("bottom") ? crop.bottom : newCrop.bottom + clampedDy;
        handleCropChange(newCrop);
    }
    function scaleSelection({ dx: dx , dy: dy  }) {
        const crop = stateRef.current.crop;
        const newCrop = {
            ...crop
        };
        const clampedDx = $0d16028b28e5283f$var$clamp(-crop.left, containerWidth - crop.right, dx);
        const clampedDy = $0d16028b28e5283f$var$clamp(-crop.top, containerHeight - crop.bottom, dy);
        newCrop.left += clampedDx;
        newCrop.right += clampedDx;
        newCrop.top += clampedDy;
        newCrop.bottom += clampedDy;
        handleCropChange(newCrop);
    }
    function updateSizes({ left: left , right: right , top: top , bottom: bottom  }) {
        return {
            left: left,
            right: right,
            top: top,
            bottom: bottom,
            width: Math.min(right - left, containerWidth),
            height: Math.min(bottom - top, containerHeight),
            container: {
                width: containerWidth,
                height: containerHeight
            }
        };
    }
}
function $0d16028b28e5283f$var$px(n) {
    return typeof n === "number" || typeof n === "string" ? n + "px" : n;
}
function $0d16028b28e5283f$var$clamp(left, right, value) {
    const [min, max] = left < right ? [
        left,
        right
    ] : [
        right,
        left
    ];
    return Math.max(min, Math.min(max, value));
}
function $0d16028b28e5283f$var$cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function $0d16028b28e5283f$var$useEvent(fn) {
    const fnRef = (0, ($parcel$interopDefault($dSH8u$react))).useRef(null);
    fnRef.current = fn;
    return (0, ($parcel$interopDefault($dSH8u$react))).useCallback((...args)=>fnRef.current(...args), []);
}


//# sourceMappingURL=main.js.map
