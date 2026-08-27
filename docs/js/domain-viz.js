(function () {
  "use strict";
  const { evalAt, defaultRange } = window.GF;
  // ===================== domain card mini-visualizations =====================
  // A small, per-card slider + live SVG chart for applications.html's domain
  // cards — deliberately not a reuse/copy of index.html's 356-line drawPlot
  // (pan/zoom/hover/multi-series make no sense at card size). Offline-only:
  // built entirely on GF.evalAt, which is synchronous and never calls fetch.

  const NS = "http://www.w3.org/2000/svg";
  const W = 220;
  const H = 64;
  const PAD = { left: 4, right: 4, top: 6, bottom: 6 };

  function sampleMini(plot, range, steps) {
    const points = [];
    const [lo, hi] = range;
    const isStepped = plot.kind === "doubleFactorial";
    const step = isStepped ? 1 : (hi - lo) / steps;
    for (let x = lo; x <= hi; x += step) {
      const y = evalAt(plot.kind, x, plot);
      if (y !== null && Number.isFinite(y)) points.push([x, y]);
    }
    return points;
  }

  function renderMiniChart(container, plot, currentX) {
    container.innerHTML = "";
    const range = plot.range || defaultRange(plot);
    const points = sampleMini(plot, range, 60);
    if (points.length < 2) return;

    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    const xMin = Math.min(...xs);
    const xMax = Math.max(...xs);
    const yMin = Math.min(0, ...ys);
    const yMax = Math.max(...ys) * 1.08 || 1;
    const w = W - PAD.left - PAD.right;
    const h = H - PAD.top - PAD.bottom;
    const xFor = (x) => PAD.left + ((x - xMin) / (xMax - xMin || 1)) * w;
    const yFor = (y) => PAD.top + h - ((y - yMin) / (yMax - yMin || 1)) * h;

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("class", "mini-chart-svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-hidden", "true");

    const style = getComputedStyle(document.documentElement);
    const curveColor = style.getPropertyValue("--curve").trim();
    const pointColor = style.getPropertyValue("--point").trim();
    const surfaceColor = style.getPropertyValue("--surface").trim();

    const isStepped = plot.kind === "doubleFactorial";
    if (isStepped) {
      for (const [x, y] of points) {
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", xFor(x));
        c.setAttribute("cy", yFor(y));
        c.setAttribute("r", x === currentX ? 3 : 1.6);
        c.setAttribute("fill", x === currentX ? pointColor : curveColor);
        svg.appendChild(c);
      }
    } else {
      const d = points
        .map((p, i) => `${i === 0 ? "M" : "L"}${xFor(p[0]).toFixed(1)},${yFor(p[1]).toFixed(1)}`)
        .join(" ");
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", curveColor);
      path.setAttribute("stroke-width", "1.75");
      path.setAttribute("stroke-linejoin", "round");
      svg.appendChild(path);
    }

    const curY = evalAt(plot.kind, currentX, plot);
    if (curY !== null && Number.isFinite(curY)) {
      const ring = document.createElementNS(NS, "circle");
      ring.setAttribute("cx", xFor(currentX));
      ring.setAttribute("cy", yFor(curY));
      ring.setAttribute("r", "3.5");
      ring.setAttribute("fill", pointColor);
      ring.setAttribute("stroke", surfaceColor);
      ring.setAttribute("stroke-width", "1.5");
      svg.appendChild(ring);
    }

    container.appendChild(svg);
  }

  function initDomainSlider(config) {
    const { sliderEl, readoutEl, chartEl, plot, format } = config;
    function update() {
      const x = Number(sliderEl.value);
      const y = evalAt(plot.kind, x, plot);
      readoutEl.textContent = format(x, y);
      renderMiniChart(chartEl, plot, x);
    }
    sliderEl.addEventListener("input", update);
    update();
  }

  window.GF = window.GF || {};
  Object.assign(window.GF, { renderMiniChart, initDomainSlider });
})();
