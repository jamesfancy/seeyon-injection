console.log("Inject script by James Fan.");

function waitFor(predicate, timeout = 5000, interval = 500) {
    return new Promise((resolve, reject) => {
        const expired = Date.now() + timeout;
        const timer = setInterval(() => {
            if (predicate()) {
                clearInterval(timer);
                resolve();
            }
            if (Date.now() > expired) {
                clearInterval(timer);
                reject();
            }
        }, interval);
    });
}

const adjustTableColumns = (() => {

    const calcMaxWidth = (() => {
        const span = $("<span>")
            .addClass("v-easy-table-class")
            .css({
                visibility: "hidden",
                position: "fixed",
                left: 0,
                top: -100,
            })
            .appendTo($("body"));

        return (sList) => {
            return sList
                .map(s => span.text(s || "").width())
                .reduce((max, w) => Math.max(max, w), 0);
        };
    })();

    return function adjustTableColumns($) {
        const hTable = $("table.v-easy-table-htable");
        const headers = hTable.find("tr:first td");
        const colCount = headers.length;

        const bTable = $("table.v-easy-table-btable");
        if (!(hTable.length && bTable.length)) { return; }

        const rows = $("tr", $.merge($.merge([], hTable), bTable));

        const colIndexStart = (start => {
            let i = start || 0;

            if ($(headers.get(i)).find(".v-easy-table-checkbox").length) {
                rows.find("td:first > div:first").css({ width: "32px" });
                i++;
            }

            if ($(headers.get(i)).find("i.cap-icon-suoding").length) {
                rows.find("td:eq(1) > div:first").css({ width: "32px" });
                i++
            }

            return i;
        })();

        const maxWidth = window.innerWidth / 3;
        for (let i = colIndexStart; i < colCount; i++) {
            const cols = rows.find(`td:eq(${i}) > div:first`);
            const width = Math.min(
                maxWidth,
                calcMaxWidth(cols.map((_, v) => $(v).text()).toArray()) + 24
                // ⇑ 24 = 左右各 10 padding + 2 边框 + 2 保险
            );
            cols.css({ width: `${width}px` });
        }
    }
});

(async () => {
    try {
        await waitFor(() => cap4UnflowList.contentWindow.$);
    } catch (err) {
        console.log("直到超时也没找到 cap4UnflowList.contentWindow.$");
        return;
    }

    $(() => {
        ($ => {
            $("<button type='button'>")
                .text("调整列宽")
                .css({
                    background: "#1f85ec",
                    color: "white",
                    fontSize: "14px",
                    marginLeft: "3em",
                    padding: "0.5em 1.5em",
                    borderRadius: "3em",
                    verticalAlign: "middle",
                    cursor: "pointer",
                })
                .appendTo(".cap4-title__title-wrapper")
                .on("click", () => adjustTableColumns($));

            adjustTableColumns($)
        })(cap4UnflowList.contentWindow.$);
    });
})();
