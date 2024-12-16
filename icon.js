drawIcon(96, 96, 16);
drawIcon(96, 96, 0);
drawIcon(48, 48, 0);
drawIcon(32, 32, 0);
drawIcon(16, 16, 0);

function drawIcon(W, H, P) {
  let c = document.createElement("canvas");
  let g = c.getContext("2d");
  document.body.appendChild(c);
  c.style.margin = "4px";
  c.style.padding = "4px";
  c.style.borderRadius = "6px";
  c.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.33)";

  c.width = W + P * 2;
  c.height = H + P * 2;

  function roundedRect(x, y, w, h, radius) {
    let q = Math.PI / 2;
    g.beginPath();
    g.moveTo(x + radius, y);
    g.arcTo(x + w, y, x + w, y + h, radius);
    g.lineTo(x + w, y + h - radius);
    g.arcTo(x + w, y + h, x, y + h, radius);
    g.lineTo(x + radius, y + h);
    g.arcTo(x, y + h, x, y, radius);
    g.lineTo(x, y + radius);
    g.arcTo(x, y, x + w, y, radius);
    g.fill();
  }
  
  function polygon(x, y, points) {
    g.beginPath();
    g.moveTo(x + points[0][0], y + points[0][1]);
    for (let i = 1; i < points.length; i++) {
      g.lineTo(x + points[i][0], y + points[i][1]);
    }
    g.lineTo(x + points[0][0], y + points[0][1]);
    g.fill();
  }
  
  function strokePolygon(x, y, points) {
    g.beginPath();
    g.moveTo(x + points[0][0], y + points[0][1]);
    for (let i = 1; i < points.length; i++) {
      g.lineTo(x + points[i][0], y + points[i][1]);
    }
    g.closePath();
    g.stroke();
  }
  
  function normalize(v) {
    let l = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    return [v[0] / l, v[1] / l];
  }
  
  g.translate(c.width / 2, c.height / 2);
  g.scale(W / 10, H / 10);
  
  g.strokeStyle = "#222";
  g.strokeWidth = 0.1;
  g.lineCap = "round";
  g.lineJoin = "round";
  
  // Frame
  g.fillStyle = "#222";
  roundedRect(-5, -5, 10, 10, 1);
  // Message 1
  g.fillStyle = "#444";
  roundedRect(-4.5, -4.5, 9, 2, 0.5);
  // Username 1
  g.fillStyle = "#c90";
  roundedRect(-4, -3.5, 1.5, 0.5, 0.25);
  // Text 1
  g.fillStyle = "#aaa";
  roundedRect(-2, -3.5, 3, 0.5, 0.25);
  roundedRect(1.5, -3.5, 1, 0.5, 0.25);
  
  // Hover outline
  g.fillStyle = "#222";
  roundedRect(-4.25, -3.25, 4.5, 2.5, 0.5);
  // Message 2
  g.fillStyle = "#666";
  roundedRect(-4.5, -2, 9, 2, 0.5);
  roundedRect(-4, -3, 4, 2, 0.5);
  // Username 2
  g.fillStyle = "#0c6";
  roundedRect(-4, -1, 1.5, 0.5, 0.25);
  // Badge and pronoun
  g.fillStyle = "#0c0";
  roundedRect(-3.75, -3, 1, 1, 0.5);
  g.fillStyle = "#ddd";
  roundedRect(-2.5, -2.75, 2, 0.5, 0.2);
  // Text 2
  g.fillStyle = "#aaa";
  roundedRect(-2, -1, 1, 0.5, 0.25);
  roundedRect(-0.5, -1, 2, 0.5, 0.25);
  roundedRect(2, -1, 1, 0.5, 0.25);
  
  // Message 3
  g.fillStyle = "#444";
  roundedRect(-4.5, 0.5, 9, 4, 0.5);
  // Username 3
  g.fillStyle = "#c90";
  roundedRect(-4, 3, 1.5, 0.5, 0.25);
  
  g.fillStyle = "#09c";
  g.beginPath();
  let triangle_points = [
    [-1, 1],
    [1, -1],
    [1, 1]
  ];
  polygon(-0.75, 2.5, triangle_points);
  g.stroke();
  g.fill();
  
  g.fillStyle = "#c00";
  g.beginPath();
  g.arc(2.5, 2.5, 1, 0, Math.PI * 2);
  g.stroke();
  g.fill();
  
  let cursor_points = [
    [0, 0],
    [2, 2],
    [0.75, 2],
    [0, 2.66]
  ];
  g.fillStyle = "#ddd";
  strokePolygon(1, -0.5, cursor_points);
  polygon(1, -0.5, cursor_points);
}
