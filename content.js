function analyzeArticle() {
  // get all the elements with class "essay-list"
  const essayList = document.querySelectorAll(".essay-list");
  const list = Array.from(essayList);
  for (const essay of list) {
    const infos = essay.querySelectorAll(".infos span");
    const items = Array.from(infos).reverse();
    const dataEle = document.createElement("div");
    dataEle.classList.add("data-ele");
    dataEle.style.color = "green";
    dataEle.style.fontSize = "14px";
    dataEle.style.display = "flex";
    // handle the data of every essay
    const nums = [];
    for (const item of items) {
      if (item.classList.contains("dot")) continue;
      if (item.classList.contains("split-line")) break;
      
      const text = item.innerText;
      // extract the number from the text
      const num = parseInt(text);
      nums.push(num);
    }
    nums.reverse();
    genDataEle(nums[1] / nums[0], "阅读/展现比", dataEle);
    genDataEle(nums[2] / nums[1], "点赞/阅读比", dataEle);
    genDataEle(nums[3] / nums[1], "评论/阅读比", dataEle);
    genDataEle(nums[4] / nums[1], "收藏/阅读比", dataEle);
    essay.appendChild(dataEle);
  }
}

function genDataEle(ratio, label, parent) {
  const ratioStr = `${(ratio * 100).toFixed(6)}`;
  const cell = document.createElement("div");
  cell.style.marginRight = "30px";
  cell.style.display = "flex";
  cell.style.alignItems = "center";
  const labelEle = document.createElement("div");
  labelEle.innerText = `${label}:`;
  labelEle.style.opacity = "0.7";
  labelEle.style.marginRight = "5px";

  const ratioEle = document.createElement("div");
  ratioEle.innerText = ratioStr;
  ratioEle.style.fontWeight = "bold";

  const unitEle = document.createElement("div");
  unitEle.innerText = "%";
  unitEle.style.opacity = "0.7";
  unitEle.style.marginLeft = "3px";

  cell.appendChild(labelEle);
  cell.appendChild(ratioEle);
  cell.appendChild(unitEle);
  parent.appendChild(cell);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyzeArticle") {
    analyzeArticle();
  }
});
