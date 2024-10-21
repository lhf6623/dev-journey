export const home = "./src/pages/leetcode.html";

export const loading = () => {
  return `<div style="display:flex;justify-content:center;align-items:center;">
    Loading
  </div>`;
};

export const fail = ({ src, error }) => {
  return `<div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;word-break:break-all;" data-testid="error-container">
    <div style="padding:20px;text-align:center;">
      <h3>load fail</h3>
      <p>${error.stack.split(/\n/g)[0]}</p>
      ${src}
      <div>
        <button on:click="back()">Back</button>
      </div>
    </div>
  </div>`;
};

export const pageAnime = {
  current: {
    opacity: 1,
    transform: "translate(0, 0)",
  },
  next: {
    opacity: 0,
    transform: "translate(30px, 0)",
  },
  previous: {
    opacity: 0,
    transform: "translate(-30px, 0)",
  },
};
