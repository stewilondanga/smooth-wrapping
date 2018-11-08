var navigate = (function() {
  $('.dd').toggle();
  $('.dd_btn').click(function() {
    var dataName = $(this).attr('data-name');
    $('.dd').hide();
    $('.' + dataName).toggle();
  });
})();

const nodes = document.querySelectorAll(".item-node"),
  totalNodes = nodes.length,
  boxes = [];

let nodeCnt = 0, // Node count: Loop through nodes[]
  resizeWaitID = 0, // setTimeout ID for window.resize()
  node = {},
  dupe = {};

for (nodeCnt = 0; nodeCnt < totalNodes; nodeCnt++) {
  node = nodes[nodeCnt];

  dupe = node.cloneNode(true); // We'll clone each node so it can "follow" its sibling `node` element around the UI.
  dupe.classList.remove("item-node"); // .item-node | visibility: hidden - Will move natively with Flex wrapping (snappy!).
  dupe.classList.add("item-dupe"); // .item-dupe | visibility: visible - Will smoothly follow sibling .item-node around.

  node.parentNode.appendChild(dupe); // Position: `absolute` - Each clone stays relative to their shared parent container.

  dupe.style.top = node.offsetTop + 'px'; // Establish each dupe's `absolute` position.
  dupe.style.left = node.offsetLeft + 'px'; // <--^

  boxes[nodeCnt] = {
    node,
    dupe
  };
}

function moveNodes() {
  clearTimeout(resizeWaitID);
  resizeWaitID = setTimeout(() => {
    for (nodeCnt = 0; nodeCnt < totalNodes; nodeCnt++) {
      boxes[nodeCnt].dupe.style.left = boxes[nodeCnt].node.offsetLeft + 'px';
      boxes[nodeCnt].dupe.style.top = boxes[nodeCnt].node.offsetTop + 'px';
    }
  }, 101);
}

window.addEventListener("resize", moveNodes);

const divSwitch = document.querySelector('.container');

document.querySelector('.button').addEventListener('click', e => {
  moveNodes();
  divSwitch.classList.toggle('switch');
});
