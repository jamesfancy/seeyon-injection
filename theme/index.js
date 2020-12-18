console.log("inject themejs for oa.kiloway.cn, by James");

(() => {
    const { layoutName } = window.vPortal || {};

    if (layoutName) {
        document.body.classList.add("jfan-layout", layoutName);
    }
})();