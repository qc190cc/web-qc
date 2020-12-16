/**
*   MutationObserver
*   用于监控DOM节点的变化，如 属性变化、子节点增删改、子树的变化等
**/
// 1、选择需要观察变动的节点
const targetNode = document.getElementById('some-id');
// 2、观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };
// 3、当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};
// 4、创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);
// 5、以上述配置开始观察目标节点
observer.observe(targetNode, config);
// 6、之后，可停止观察
observer.disconnect();

/**
*   ResizeObserver
*   专门用来观察DOM元素的尺寸是否发生了变化，不光是窗体resize
    注意：观测的是 contentRect，只有 content 改变（margin,padding不行）才会触发回调
    用途：
        1、原生resize行为的检测，如 textarea 的拉升
        2、感知交互行为的发生（无埋点方案？）
        3、感知元素是否显示或隐藏（MutationObserver 有时做不到）
**/
const eleZxx = document.getElementById('some-id');

var ro = new ResizeObserver( entries => {
    for (let entry of entries) {
        const cr = entry.contentRect;
        console.log('Element:', entry.target);
        console.log(`Element size: ${cr.width}px x ${cr.height}px`);
        console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
    }
});

// 观察一个或多个元素
ro.observe(eleZxx);