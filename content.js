function getPageContent() {
  // get all the elements with class "essay-list"
  const essayList = document.querySelectorAll(".essay-list");
  const list = Array.from(essayList);
  for (const essay of list) {
    const infos = essay.querySelectorAll(".infos span");
    const items = Array.from(infos).reverse();
    const dataEle = document.createElement("div");
    dataEle.classList.add("data-ele");
    dataEle.style.color = "green";
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
    genNumCell(nums[1] / nums[0], "阅读/展现比", dataEle);
    genNumCell(nums[2] / nums[1], "点赞/阅读比", dataEle);
    genNumCell(nums[3] / nums[1], "评论/阅读比", dataEle);
    genNumCell(nums[4] / nums[1], "收藏/阅读比", dataEle);
    essay.appendChild(dataEle);
  }
}

function genNumCell(ratio, label, parent) {
  const ratioStr = `${(ratio * 100).toFixed(6)}%`;
  const span = document.createElement("span");
  span.innerText = `${label}: ${ratioStr}`;
  span.style.marginRight = "30px";
  parent.appendChild(span);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getContent") {
    getPageContent();
  }
});
