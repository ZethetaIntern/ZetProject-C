import React, { useState, useEffect, useRef } from "react";
import { useDashboardStore } from "../store/dashboardStore";
import { getWidget } from "../registry/widgetRegistry";
import WidgetShell from "./WidgetShell";
export const GridManager = () => {
  const layout = useDashboardStore((state) => state.layout);
  const isEditing = useDashboardStore((state) => state.isEditing);
  const updateLayouts = useDashboardStore((state) => state.updateLayouts);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  const cols = 12;
  const colWidth = containerWidth / cols;
  const rowHeight = 110;
  const [dragId, setDragId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPos, setDragPos] = useState({ left: 0, top: 0 });
  const [placeholder, setPlaceholder] = useState(null);
  const [resizeId, setResizeId] = useState(null);
  const [resizeStartSize, setResizeStartSize] = useState({ w: 0, h: 0 });
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const handleDragStart = (id, e) => {
    if (!isEditing) return;
    const target = e.target;
    if (!target.closest(".drag-handle")) return;
    e.preventDefault();
    const container = containerRef.current;
    const card = target.closest(".grid-card");
    if (!container || !card) return;
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - cardRect.left,
      y: e.clientY - cardRect.top
    });
    setDragPos({
      left: cardRect.left - containerRect.left,
      top: cardRect.top - containerRect.top
    });
    setDragId(id);
    const originalItem = layout.find((item) => item.id === id);
    if (originalItem) {
      setPlaceholder({ ...originalItem });
    }
    card.setPointerCapture(e.pointerId);
  };
  const handleDragMove = (e) => {
    if (!dragId || !placeholder) return;
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const newLeft = e.clientX - containerRect.left - dragOffset.x;
    const newTop = e.clientY - containerRect.top - dragOffset.y;
    requestAnimationFrame(() => {
      setDragPos({ left: newLeft, top: newTop });
      const hoverX = Math.max(0, Math.min(cols - placeholder.w, Math.round(newLeft / colWidth)));
      const hoverY = Math.max(0, Math.round(newTop / rowHeight));
      setPlaceholder((prev) => prev ? { ...prev, x: hoverX, y: hoverY } : null);
    });
  };
  const handleDragEnd = (id, e) => {
    if (!dragId) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (placeholder) {
      const updated = layout.map((item) => {
        if (item.id === id) {
          return { ...item, x: placeholder.x, y: placeholder.y };
        }
        return item;
      });
      const resolved = resolveCollisions(updated, id);
      updateLayouts(resolved);
    }
    setDragId(null);
    setPlaceholder(null);
  };
  const handleResizeStart = (id, e) => {
    if (!isEditing) return;
    e.preventDefault();
    e.stopPropagation();
    const originalItem = layout.find((item) => item.id === id);
    if (!originalItem) return;
    setResizeId(id);
    setResizeStartSize({ w: originalItem.w, h: originalItem.h });
    setResizeStartPos({ x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handleResizeMove = (e) => {
    if (!resizeId) return;
    const dx = e.clientX - resizeStartPos.x;
    const dy = e.clientY - resizeStartPos.y;
    const dCols = Math.round(dx / colWidth);
    const dRows = Math.round(dy / rowHeight);
    const originalItem = layout.find((item) => item.id === resizeId);
    if (!originalItem) return;
    const nextW = Math.max(2, Math.min(cols - originalItem.x, resizeStartSize.w + dCols));
    const nextH = Math.max(2, resizeStartSize.h + dRows);
    requestAnimationFrame(() => {
      setPlaceholder({
        ...originalItem,
        w: nextW,
        h: nextH
      });
    });
  };
  const handleResizeEnd = (id, e) => {
    if (!resizeId) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (placeholder) {
      const updated = layout.map((item) => {
        if (item.id === id) {
          return { ...item, w: placeholder.w, h: placeholder.h };
        }
        return item;
      });
      const resolved = resolveCollisions(updated, id);
      updateLayouts(resolved);
    }
    setResizeId(null);
    setPlaceholder(null);
  };
  const resolveCollisions = (currentLayout, movingId) => {
    const moving = currentLayout.find((w) => w.id === movingId);
    if (!moving) return currentLayout;
    const sorted = [...currentLayout].sort((a, b) => a.y - b.y);
    let changed = true;
    while (changed) {
      changed = false;
      for (let i = 0; i < sorted.length; i++) {
        const itemA = sorted[i];
        for (let j = 0; j < sorted.length; j++) {
          if (i === j) continue;
          const itemB = sorted[j];
          const overlapX = !(itemA.x + itemA.w <= itemB.x || itemB.x + itemB.w <= itemA.x);
          const overlapY = !(itemA.y + itemA.h <= itemB.y || itemB.y + itemB.h <= itemA.y);
          if (overlapX && overlapY) {
            if (itemB.id !== movingId) {
              itemB.y = itemA.y + itemA.h;
              changed = true;
            } else if (itemA.id !== movingId) {
              itemA.y = itemB.y + itemB.h;
              changed = true;
            }
          }
        }
      }
    }
    return sorted;
  };
  const maxContainerY = layout.reduce((max, item) => {
    const actualH = item.isCollapsed ? 0.6 : item.h;
    return Math.max(max, item.y + actualH);
  }, 0);
  const containerHeight = Math.max(600, (maxContainerY + 1) * rowHeight);
  return <div
    ref={containerRef}
    className={`relative w-full overflow-y-auto overflow-x-hidden p-2 rounded-lg border border-[var(--border-color)] ${isEditing ? "bg-[var(--bg-dashboard)]/40 border-dashed border-2" : ""}`}
    style={{
      height: "100%",
      minHeight: "500px",
      maxHeight: "calc(100vh - 120px)"
    }}
  >
      <div
    className="relative w-full transition-all duration-300"
    style={{
      height: `${containerHeight}px`
    }}
  >
        {
    /* Placeholder rendering */
  }
        {placeholder && <div
    className="absolute rounded-lg border-2 border-dashed border-[var(--accent-color)] bg-[var(--accent-color)]/5 transition-all duration-75 z-0"
    style={{
      left: `${placeholder.x * colWidth}px`,
      top: `${placeholder.y * rowHeight}px`,
      width: `${placeholder.w * colWidth - 8}px`,
      height: `${(placeholder.isCollapsed ? 0.6 : placeholder.h) * rowHeight - 8}px`
    }}
  />}

        {layout.map((item) => {
    const entry = getWidget(item.type);
    if (!entry) return null;
    const isDragging = dragId === item.id;
    const isResizing = resizeId === item.id;
    const actualH = item.isCollapsed ? 0.6 : item.h;
    const style = isDragging ? {
      position: "absolute",
      left: `${dragPos.left}px`,
      top: `${dragPos.top}px`,
      width: `${item.w * colWidth - 8}px`,
      height: `${actualH * rowHeight - 8}px`,
      zIndex: 1e3,
      opacity: 0.85,
      pointerEvents: "auto"
    } : {
      position: "absolute",
      left: `${item.x * colWidth}px`,
      top: `${item.y * rowHeight}px`,
      width: `${item.w * colWidth - 8}px`,
      height: `${actualH * rowHeight - 8}px`,
      zIndex: 10,
      transition: isResizing ? "none" : "left 0.2s ease, top 0.2s ease, width 0.2s ease, height 0.2s ease"
    };
    return <div
      key={item.id}
      className={`grid-card ${isEditing ? "hover:ring-1 hover:ring-[var(--accent-color)]" : ""}`}
      style={{
        ...style,
        padding: "4px"
      }}
      onPointerDown={(e) => isEditing && handleDragStart(item.id, e)}
      onPointerMove={(e) => isDragging && handleDragMove(e)}
      onPointerUp={(e) => isDragging && handleDragEnd(item.id, e)}
    >
              <WidgetShell id={item.id} type={item.type} title={entry.name} isCollapsed={item.isCollapsed}>
                <React.Suspense
      fallback={<div className="flex flex-col gap-3 h-full justify-center">
                      <div className="shimmer-bg rounded h-6 w-3/4" />
                      <div className="shimmer-bg rounded h-20 w-full" />
                      <div className="shimmer-bg rounded h-6 w-1/2" />
                    </div>}
    >
                  <entry.component id={item.id} />
                </React.Suspense>
              </WidgetShell>

              {
      /* Resize Handle */
    }
              {isEditing && !item.isCollapsed && <div
      className="absolute bottom-1.5 right-1.5 w-4 h-4 cursor-se-resize flex items-end justify-end pointer-events-auto"
      style={{ zIndex: 100 }}
      onPointerDown={(e) => handleResizeStart(item.id, e)}
      onPointerMove={(e) => isResizing && handleResizeMove(e)}
      onPointerUp={(e) => isResizing && handleResizeEnd(item.id, e)}
    >
                  <svg style={{ width: "10px", height: "10px", color: "var(--text-muted)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 19L5 5m14 0L5 19" />
                  </svg>
                </div>}
            </div>;
  })}
      </div>
    </div>;
};
export default GridManager;
