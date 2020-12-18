window.injectCustomTheme = function () {
    const { layoutName } = window.vPortal || {};

    if (layoutName) {
        document.body.classList.add("jfan-layout", layoutName);
    }
};
