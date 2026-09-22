---
title: "用自绘遮罩实现丝滑的 Dark / Light 主题切换"
urlSlug: theme-reveal-dark-light
description: "从圆形扩散的主题切换思路出发，展示 Inkstone 如何避免深浅色切换时的整屏闪烁。"
pubDate: 2026-09-19
tags: ["Astro", "CSS", "View Transition", "Dark Mode"]
draft: false
cover: "/images/posts/theme-reveal-dark-light.png"
featured: false
---

Inkstone 的主题切换不是简单地瞬间改颜色，而是让新主题从右上角按钮处像墨水一样扩散出来。这个动画的核心思路很直接：计算点击位置，再用一个足够大的圆覆盖整个视口。

## 基础思路

圆心通常取自点击事件。如果不是鼠标触发，比如键盘触发，就回退到切换按钮中心点。

~~~js
const getThemeTransitionPoint = (event, button) => {
  const rect = button?.getBoundingClientRect();
  const fallbackPoint = rect
    ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    : { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  if (event && (event.clientX || event.clientY)) {
    return { x: event.clientX, y: event.clientY };
  }

  return fallbackPoint;
};
~~~

半径用 Math.hypot() 计算。它相当于勾股定理，用触发点到四个窗口边缘的最大距离算出一个覆盖全屏的圆。

~~~js
const getClipPath = ({ x, y }) => {
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  return {
    closed: 'circle(0px at ' + x + 'px ' + y + 'px)',
    open: 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)',
  };
};
~~~

## 为什么使用自绘遮罩

View Transition API 很方便，但 dark 到 light 的方向有时会把旧的深色截图层短暂放到最上面，造成一帧明显闪黑。Inkstone 改成手动创建一个固定定位的遮罩层，并克隆当前页面内容。这样动画看到的是页面本身在过渡，而不是一整块纯色幕布。

这种实现更长一点，但在深浅色切换时更稳定，也更容易控制 prefers-reduced-motion、滚动位置和旧主题收缩方向。
